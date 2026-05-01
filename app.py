import os
import traceback
from datetime import datetime
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, render_template, request

from binance_client import (
    create_client,
    get_futures_account,
    get_order_history,
    get_position_information,
    get_trade_history,
)
import database as db
import sync as data_sync

load_dotenv()

db.init_db()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

BASIC_AUTH_ENABLED = os.getenv("BASIC_AUTH_ENABLED", "false").lower() == "true"
BASIC_AUTH_USER = os.getenv("BASIC_AUTH_USERNAME", "")
BASIC_AUTH_PASS = os.getenv("BASIC_AUTH_PASSWORD", "")


def check_auth(username, password):
    return username == BASIC_AUTH_USER and password == BASIC_AUTH_PASS


def authenticate():
    return Response(
        "Authentication required", 401,
        {"WWW-Authenticate": 'Basic realm="Binance Dashboard"'},
    )


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not BASIC_AUTH_ENABLED:
            return f(*args, **kwargs)
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated


def get_client():
    return create_client()


@app.route("/")
@require_auth
def index():
    return render_template("index.html")


@app.route("/account")
@require_auth
def account_page():
    return render_template("account.html")


@app.route("/positions")
@require_auth
def positions_page():
    return render_template("positions.html")


@app.route("/trades")
@require_auth
def trades_page():
    return render_template("trades.html")


@app.route("/orders")
@require_auth
def orders_page():
    return render_template("orders.html")


@app.route("/income")
@require_auth
def income_page():
    return render_template("income.html")


@app.route("/calendar")
@require_auth
def calendar_page():
    return render_template("calendar.html")


# ---- API Routes ----

@app.route("/api/account")
@require_auth
def api_account():
    try:
        client = get_client()
        data = get_futures_account(client)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/positions")
@require_auth
def api_positions():
    try:
        client = get_client()
        data = get_position_information(client)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/trades")
@require_auth
def api_trades():
    try:
        client = get_client()
        symbol = request.args.get("symbol")
        start = request.args.get("start")
        end = request.args.get("end")
        limit = int(request.args.get("limit", 50))

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = get_trade_history(
            client, symbol=symbol, start_time=start_time, end_time=end_time, limit=limit
        )
        return jsonify({"success": True, "data": data, "count": len(data)})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/orders")
@require_auth
def api_orders():
    try:
        client = get_client()
        symbol = request.args.get("symbol")
        start = request.args.get("start")
        end = request.args.get("end")
        limit = int(request.args.get("limit", 50))

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = get_order_history(
            client, symbol=symbol, start_time=start_time, end_time=end_time, limit=limit
        )
        return jsonify({"success": True, "data": data, "count": len(data)})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/income")
@require_auth
def api_income():
    try:
        client = get_client()
        income_type = request.args.get("type") or None
        start = request.args.get("start")
        end = request.args.get("end")
        limit = int(request.args.get("limit", 100))

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = data_sync.get_merged_income(
            client,
            income_type=income_type,
            start_time=start_time,
            end_time=end_time,
            limit=limit,
        )
        return jsonify({"success": True, "data": data, "count": len(data)})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/calendar")
@require_auth
def api_calendar():
    try:
        client = get_client()
        start = request.args.get("start")
        end = request.args.get("end")

        data = data_sync.get_merged_daily_pnl(client, start_date=start, end_date=end)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/transactions")
@require_auth
def api_transactions():
    try:
        client = get_client()
        start = request.args.get("start")
        end = request.args.get("end")
        limit = int(request.args.get("limit", 100))

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = data_sync.get_merged_transactions(
            client, start_time=start_time, end_time=end_time, limit=limit
        )
        return jsonify({"success": True, "data": data, "count": len(data)})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/performance")
@require_auth
def api_performance():
    try:
        client = get_client()

        # Get current account balance
        account = get_futures_account(client)
        current_balance = account["totalWalletBalance"]

        # Get all transactions from SQLite cache (synced fresh first)
        txs = data_sync.get_merged_transactions_for_performance(client)
        total_deposited = sum(tx["amount"] for tx in txs if tx["type"] == "IN" and tx["status"] == "CONFIRMED")
        total_withdrawn = sum(tx["amount"] for tx in txs if tx["type"] == "OUT" and tx["status"] == "CONFIRMED")
        net_deposited = total_deposited - total_withdrawn

        # Get daily income from SQLite cache (synced fresh first)
        daily_income = data_sync.get_merged_all_income_by_day(client)

        # Reconstruct equity curve
        tx_by_day = {}
        for tx in txs:
            if tx["status"] != "CONFIRMED":
                continue
            day = datetime.fromtimestamp(tx["time"] / 1000).strftime("%Y-%m-%d")
            if tx["type"] == "IN":
                tx_by_day[day] = tx_by_day.get(day, 0) + tx["amount"]
            else:
                tx_by_day[day] = tx_by_day.get(day, 0) - tx["amount"]

        all_days = set()
        day_income = {}
        for item in daily_income:
            all_days.add(item["date"])
            day_income[item["date"]] = item["pnl"]
        for day in tx_by_day:
            all_days.add(day)

        sorted_days = sorted(all_days)
        if not sorted_days:
            return jsonify(
                {
                    "success": True,
                    "data": {
                        "currentBalance": current_balance,
                        "totalDeposited": total_deposited,
                        "totalWithdrawn": total_withdrawn,
                        "netDeposited": net_deposited,
                        "totalPnl": current_balance - net_deposited,
                        "roi": 0,
                        "maxDrawdown": 0,
                        "equityCurve": [],
                    },
                }
            )

        running_balance = 0
        equity_curve = []
        peak = 0
        max_drawdown = 0

        for day in sorted_days:
            if day in tx_by_day:
                running_balance += tx_by_day[day]
            if day in day_income:
                running_balance += day_income[day]

            if running_balance > peak:
                peak = running_balance

            dd = (peak - running_balance) / peak * 100 if peak > 0 else 0
            if dd > max_drawdown:
                max_drawdown = dd

            equity_curve.append(
                {"date": day, "balance": round(running_balance, 2), "peak": round(peak, 2)}
            )

        total_pnl = current_balance - net_deposited
        roi = (total_pnl / net_deposited * 100) if net_deposited > 0 else 0

        return jsonify(
            {
                "success": True,
                "data": {
                    "currentBalance": round(current_balance, 2),
                    "totalDeposited": round(total_deposited, 2),
                    "totalWithdrawn": round(total_withdrawn, 2),
                    "netDeposited": round(net_deposited, 2),
                    "totalPnl": round(total_pnl, 2),
                    "roi": round(roi, 2),
                    "maxDrawdown": round(max_drawdown, 2),
                    "equityCurve": equity_curve,
                },
            }
        )
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
