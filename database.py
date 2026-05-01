import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.db")


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_conn()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS daily_pnl (
            date TEXT PRIMARY KEY,
            pnl REAL NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS income_history (
            tran_id TEXT PRIMARY KEY,
            symbol TEXT NOT NULL,
            income_type TEXT NOT NULL,
            income REAL NOT NULL,
            asset TEXT NOT NULL,
            time INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS transactions (
            tran_id TEXT PRIMARY KEY,
            asset TEXT NOT NULL,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            status TEXT NOT NULL,
            time INTEGER NOT NULL
        );
    """)
    conn.commit()
    conn.close()


# ---- daily_pnl ----

def upsert_daily_pnl(date: str, pnl: float):
    conn = get_conn()
    conn.execute(
        "INSERT INTO daily_pnl (date, pnl, updated_at) VALUES (?, ?, ?) "
        "ON CONFLICT(date) DO UPDATE SET pnl=excluded.pnl, updated_at=excluded.updated_at",
        (date, pnl, datetime.now().isoformat()),
    )
    conn.commit()
    conn.close()


def get_daily_pnl_range(start_date: str = None, end_date: str = None) -> list:
    conn = get_conn()
    query = "SELECT date, pnl FROM daily_pnl WHERE 1=1"
    params = []
    if start_date:
        query += " AND date >= ?"
        params.append(start_date)
    if end_date:
        query += " AND date <= ?"
        params.append(end_date)
    query += " ORDER BY date ASC"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [{"date": r["date"], "pnl": r["pnl"]} for r in rows]


# ---- income_history ----

def upsert_income_batch(records: list):
    """records: list of dicts with tranId, symbol, incomeType, income, asset, time"""
    conn = get_conn()
    conn.executemany(
        "INSERT OR IGNORE INTO income_history (tran_id, symbol, income_type, income, asset, time) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        [
            (r["tranId"], r["symbol"], r["incomeType"], r["income"], r["asset"], r["time"])
            for r in records
        ],
    )
    conn.commit()
    conn.close()


def get_income_history_range(start_time: int = None, end_time: int = None, income_type: str = None, limit: int = 100) -> list:
    conn = get_conn()
    query = "SELECT * FROM income_history WHERE 1=1"
    params = []
    if start_time:
        query += " AND time >= ?"
        params.append(start_time)
    if end_time:
        query += " AND time <= ?"
        params.append(end_time)
    if income_type:
        query += " AND income_type = ?"
        params.append(income_type)
    query += " ORDER BY time DESC LIMIT ?"
    params.append(limit)
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_income_max_time() -> int:
    conn = get_conn()
    row = conn.execute("SELECT MAX(time) as max_time FROM income_history").fetchone()
    conn.close()
    return row["max_time"] or 0


# ---- transactions ----

def upsert_transaction_batch(records: list):
    """records: list of dicts with tranId, asset, amount, type, status, time"""
    conn = get_conn()
    conn.executemany(
        "INSERT OR IGNORE INTO transactions (tran_id, asset, amount, type, status, time) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        [
            (r["tranId"], r["asset"], r["amount"], r["type"], r["status"], r["time"])
            for r in records
        ],
    )
    conn.commit()
    conn.close()


def get_transactions_range(start_time: int = None, end_time: int = None, limit: int = 100) -> list:
    conn = get_conn()
    query = "SELECT * FROM transactions WHERE 1=1"
    params = []
    if start_time:
        query += " AND time >= ?"
        params.append(start_time)
    if end_time:
        query += " AND time <= ?"
        params.append(end_time)
    query += " ORDER BY time DESC LIMIT ?"
    params.append(limit)
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_transactions_max_time() -> int:
    conn = get_conn()
    row = conn.execute("SELECT MAX(time) as max_time FROM transactions").fetchone()
    conn.close()
    return row["max_time"] or 0
