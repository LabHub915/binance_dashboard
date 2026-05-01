"""Sync module: pull fresh data from Binance API and persist to SQLite.

On each request, we fetch the latest 90 days from the API and merge into
the local DB. For queries that need data older than 90 days, we supplement
from SQLite.
"""

import time
from datetime import datetime

import database as db
from binance_client import (
    get_all_income_by_day,
    get_daily_pnl,
    get_futures_transactions,
)


def sync_daily_pnl(client):
    """Fetch last 90 days of daily PNL from Binance and upsert into SQLite."""
    try:
        fresh = get_daily_pnl(client, limit=1000)
        for row in fresh:
            db.upsert_daily_pnl(row["date"], row["pnl"])
        return fresh
    except Exception:
        return []


def sync_income(client):
    """Fetch income records newer than our DB's latest, upsert them."""
    try:
        max_ts = db.get_income_max_time()
        start_ts = max_ts + 1 if max_ts else int((time.time() - 90 * 24 * 3600) * 1000)

        from binance_client import get_income_history

        records = get_income_history(client, start_time=start_ts, limit=1000)
        if records:
            db.upsert_income_batch(records)
        return records
    except Exception:
        return []


def sync_transactions(client):
    """Fetch transaction records newer than our DB's latest, upsert them."""
    try:
        max_ts = db.get_transactions_max_time()
        start_ts = max_ts + 1 if max_ts else int((time.time() - 90 * 24 * 3600) * 1000)

        records = get_futures_transactions(client, start_time=start_ts, limit=1000)
        if records:
            db.upsert_transaction_batch(records)
        return records
    except Exception:
        return []


def get_merged_daily_pnl(client, start_date: str = None, end_date: str = None) -> list:
    """Return daily PNL merged from SQLite cache + fresh Binance data."""
    sync_daily_pnl(client)

    rows = db.get_daily_pnl_range(start_date, end_date)
    return rows


def get_merged_income(client, start_time: int = None, end_time: int = None, income_type: str = None, limit: int = 100) -> list:
    """Return income records merged from SQLite cache + fresh Binance data."""
    sync_income(client)

    rows = db.get_income_history_range(start_time, end_time, income_type, limit)
    return [
        {
            "symbol": r["symbol"],
            "incomeType": r["income_type"],
            "income": r["income"],
            "asset": r["asset"],
            "time": r["time"],
            "tranId": r["tran_id"],
        }
        for r in rows
    ]


def get_merged_transactions(client, start_time: int = None, end_time: int = None, limit: int = 100) -> list:
    """Return transactions merged from SQLite cache + fresh Binance data."""
    sync_transactions(client)

    rows = db.get_transactions_range(start_time, end_time, limit)
    return [
        {
            "asset": r["asset"],
            "amount": r["amount"],
            "type": r["type"],
            "status": r["status"],
            "time": r["time"],
            "tranId": r["tran_id"],
        }
        for r in rows
    ]


def get_merged_all_income_by_day(client, start_time: int = None, end_time: int = None) -> list:
    """Aggregate all income (from SQLite cache) by day for performance/equity curve."""
    sync_income(client)

    rows = db.get_income_history_range(start_time, end_time, limit=10000)
    daily = {}
    for r in rows:
        dt = datetime.fromtimestamp(r["time"] / 1000)
        date_str = dt.strftime("%Y-%m-%d")
        daily[date_str] = daily.get(date_str, 0) + r["income"]

    return [
        {"date": date, "pnl": round(pnl, 2)}
        for date, pnl in sorted(daily.items())
    ]


def get_merged_transactions_for_performance(client) -> list:
    """Return all cached transactions for performance calculation."""
    sync_transactions(client)
    rows = db.get_transactions_range(limit=10000)
    return [
        {
            "asset": r["asset"],
            "amount": r["amount"],
            "type": r["type"],
            "status": r["status"],
            "time": r["time"],
            "tranId": r["tran_id"],
        }
        for r in rows
    ]
