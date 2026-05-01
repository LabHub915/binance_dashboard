import os
from binance.client import Client
from binance.exceptions import BinanceAPIException


def create_client() -> Client:
    api_key = os.getenv("BINANCE_API_KEY")
    api_secret = os.getenv("BINANCE_API_SECRET")
    testnet = os.getenv("BINANCE_TESTNET", "true").lower() == "true"

    if not api_key or not api_secret:
        raise ValueError("BINANCE_API_KEY and BINANCE_API_SECRET must be set")

    client = Client(api_key, api_secret, testnet=testnet)
    return client


def get_futures_account(client: Client) -> dict:
    try:
        info = client.futures_account()
        assets = []
        for asset in info.get("assets", []):
            balance = float(asset.get("walletBalance", 0))
            if balance > 0:
                assets.append(
                    {
                        "asset": asset["asset"],
                        "walletBalance": balance,
                        "unrealizedProfit": float(asset.get("unrealizedProfit", 0)),
                        "marginBalance": float(asset.get("marginBalance", 0)),
                        "availableBalance": float(asset.get("availableBalance", 0)),
                    }
                )

        return {
            "totalWalletBalance": float(info.get("totalWalletBalance", 0)),
            "totalUnrealizedProfit": float(info.get("totalUnrealizedProfit", 0)),
            "totalMarginBalance": float(info.get("totalMarginBalance", 0)),
            "availableBalance": float(info.get("availableBalance", 0)),
            "assets": assets,
        }
    except BinanceAPIException as e:
        raise e


def get_position_information(client: Client) -> list:
    try:
        positions = client.futures_position_information()
        result = []
        for pos in positions:
            amt = float(pos.get("positionAmt", 0))
            if amt != 0:
                result.append(
                    {
                        "symbol": pos["symbol"],
                        "positionAmt": amt,
                        "entryPrice": float(pos.get("entryPrice", 0)),
                        "markPrice": float(pos.get("markPrice", 0)),
                        "unRealizedProfit": float(pos.get("unRealizedProfit", 0)),
                        "liquidationPrice": float(pos.get("liquidationPrice", 0)),
                        "leverage": int(pos.get("leverage", 1)),
                        "marginType": pos.get("marginType", "isolated"),
                        "positionSide": pos.get("positionSide", "BOTH"),
                    }
                )
        return result
    except BinanceAPIException as e:
        raise e


def get_trade_history(
    client: Client,
    symbol: str = None,
    start_time: int = None,
    end_time: int = None,
    limit: int = 50,
) -> list:
    try:
        trades = client.futures_account_trades(
            symbol=symbol, startTime=start_time, endTime=end_time, limit=limit
        )
        result = []
        for t in trades:
            result.append(
                {
                    "id": t["id"],
                    "symbol": t["symbol"],
                    "price": float(t["price"]),
                    "qty": float(t["qty"]),
                    "quoteQty": float(t["quoteQty"]),
                    "commission": float(t.get("commission", 0)),
                    "commissionAsset": t.get("commissionAsset", ""),
                    "time": t["time"],
                    "side": "BUY" if t.get("buyer", False) else "SELL",
                    "realizedPnl": float(t.get("realizedPnl", 0)),
                }
            )
        return result
    except BinanceAPIException as e:
        raise e


def get_order_history(
    client: Client,
    symbol: str = None,
    start_time: int = None,
    end_time: int = None,
    limit: int = 50,
) -> list:
    try:
        orders = client.futures_get_all_orders(
            symbol=symbol, startTime=start_time, endTime=end_time, limit=limit
        )
        result = []
        for o in orders:
            result.append(
                {
                    "orderId": o["orderId"],
                    "symbol": o["symbol"],
                    "type": o["type"],
                    "side": o["side"],
                    "price": float(o.get("price", 0)),
                    "origQty": float(o["origQty"]),
                    "executedQty": float(o["executedQty"]),
                    "avgPrice": float(o.get("avgPrice", 0)),
                    "status": o["status"],
                    "time": o["time"],
                    "updateTime": o.get("updateTime", 0),
                }
            )
        return result
    except BinanceAPIException as e:
        raise e


def get_income_history(
    client: Client,
    income_type: str = None,
    start_time: int = None,
    end_time: int = None,
    limit: int = 100,
) -> list:
    try:
        incomes = client.futures_income_history(
            incomeType=income_type,
            startTime=start_time,
            endTime=end_time,
            limit=limit,
        )
        result = []
        for inc in incomes:
            result.append(
                {
                    "symbol": inc["symbol"],
                    "incomeType": inc["incomeType"],
                    "income": float(inc["income"]),
                    "asset": inc["asset"],
                    "time": inc["time"],
                    "tranId": inc.get("tranId", ""),
                }
            )
        return result
    except BinanceAPIException as e:
        raise e


def get_daily_pnl(
    client: Client,
    start_time: int = None,
    end_time: int = None,
    limit: int = 365,
) -> list:
    """Aggregate realized PNL by day for the calendar view."""
    try:
        incomes = client.futures_income_history(
            incomeType="REALIZED_PNL",
            startTime=start_time,
            endTime=end_time,
            limit=limit,
        )
        daily = {}
        for inc in incomes:
            # Binance time is in ms
            date_str = inc.get("date_str")
            if not date_str:
                from datetime import datetime

                dt = datetime.fromtimestamp(inc["time"] / 1000)
                date_str = dt.strftime("%Y-%m-%d")

            pnl = float(inc["income"])
            daily[date_str] = daily.get(date_str, 0) + pnl

        result = [
            {"date": date, "pnl": round(pnl, 2)}
            for date, pnl in sorted(daily.items())
        ]
        return result
    except BinanceAPIException as e:
        raise e
