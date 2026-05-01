import os
import traceback
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

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


def get_client():
    return create_client()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/account")
def account_page():
    return render_template("account.html")


@app.route("/positions")
def positions_page():
    return render_template("positions.html")


@app.route("/trades")
def trades_page():
    return render_template("trades.html")


@app.route("/orders")
def orders_page():
    return render_template("orders.html")


@app.route("/income")
def income_page():
    return render_template("income.html")


@app.route("/calendar")
def calendar_page():
    return render_template("calendar.html")


# ---- API Routes ----

@app.route("/api/account")
def api_account():
    try:
        client = get_client()
        data = get_futures_account(client)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/positions")
def api_positions():
    try:
        client = get_client()
        data = get_position_information(client)
        return jsonify({"success": True, "data": data})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/trades")
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
