import os
import traceback
from datetime import datetime
from functools import wraps

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, render_template, request

from binance_client import (
    create_client,
    get_daily_pnl,
    get_futures_account,
    get_income_history,
    get_order_history,
    get_position_information,
    get_trade_history,
)

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

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
        if not BASIC_AUTH_USER:
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
        income_type = request.args.get("type")
        start = request.args.get("start")
        end = request.args.get("end")
        limit = int(request.args.get("limit", 100))

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = get_income_history(
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

        start_time = None
        end_time = None
        if start:
            start_time = int(datetime.fromisoformat(start).timestamp() * 1000)
        if end:
            end_time = int(datetime.fromisoformat(end).timestamp() * 1000)

        data = get_daily_pnl(client, start_time=start_time, end_time=end_time)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
