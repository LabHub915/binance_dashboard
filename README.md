# Binance Futures Dashboard

A modern web dashboard for monitoring Binance Futures accounts, built with Flask, Tailwind CSS, and ECharts.

## Features

- **Real-time Account Info** — wallet balance, available balance, unrealized PNL
- **Position Management** — view all open positions with entry/mark/liquidation prices
- **Trade History** — historical trade records with symbol and date filtering
- **Order History** — all order records with status tracking
- **Income Records** — realized PNL, funding fees, and commission history
- **PNL Calendar** — ECharts calendar heatmap showing daily profit/loss

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.10+ / Flask |
| API Client | python-binance |
| Frontend | HTML5 / Tailwind CSS / ECharts |
| Deployment | Docker / Docker Compose |

## Quick Start

### 1. Get API Keys

Register on [Binance](https://www.binance.com) and create API keys, or use the [Binance Testnet](https://testnet.binancefuture.com) for development.

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
BINANCE_TESTNET=true
FLASK_SECRET_KEY=change-this-in-production
```

### 3. Run Locally

```bash
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000

### 4. Run with Docker

```bash
docker compose up -d
```

## Project Structure

```
├── app.py                     # Flask application (pages + API routes)
├── binance_client/
│   └── __init__.py            # Binance API wrapper
├── templates/                 # Jinja2 HTML templates
│   ├── base.html              # Layout with sidebar navigation
│   ├── index.html             # Dashboard overview
│   ├── account.html           # Account balances
│   ├── positions.html         # Open positions
│   ├── trades.html            # Trade history
│   ├── orders.html            # Order history
│   ├── income.html            # Income records
│   └── calendar.html          # PNL calendar view
├── static/
│   ├── css/style.css
│   └── js/
│       ├── app.js             # Shared utilities (API client, toasts, formatters)
│       ├── dashboard.js       # Dashboard charts
│       ├── account.js         # Account page logic
│       ├── positions.js       # Positions page logic
│       ├── trades.js          # Trades page logic
│       ├── orders.js          # Orders page logic
│       ├── income.js          # Income page logic
│       └── calendar.js        # Calendar page logic
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/account` | GET | Account balances and unrealized PNL |
| `/api/positions` | GET | Open positions |
| `/api/trades` | GET | Trade history (supports `symbol`, `start`, `end`, `limit`) |
| `/api/orders` | GET | Order history (supports `symbol`, `start`, `end`, `limit`) |
| `/api/income` | GET | Income history (supports `type`, `start`, `end`, `limit`) |
| `/api/calendar` | GET | Daily PNL aggregated for calendar view |

Date parameters use ISO format (`YYYY-MM-DD`). Time-range queries accept `start` and `end` query params.
