// i18n translation system
const LANG_KEY = 'binance_dashboard_lang';

const messages = {
    'zh-TW': {
        // base.html - sidebar
        dashboard_title: 'Binance Dashboard',
        dashboard_subtitle: 'Futures Trading Monitor',
        nav_dashboard: 'Dashboard',
        nav_account: 'Account',
        nav_positions: 'Positions',
        nav_trades: 'Trades',
        nav_orders: 'Orders',
        nav_income: 'Income',
        nav_calendar: 'PNL Calendar',
        connecting: 'Connecting...',
        connected: 'Connected',
        error: 'Error',

        // index.html - dashboard
        overview_title: 'Dashboard',
        overview_desc: 'Overview of your Binance Futures account',
        perf_net_deposited: 'Net Deposited',
        perf_total_pnl: 'Total PNL',
        perf_roi: 'ROI',
        perf_max_dd: 'Max Drawdown',
        chart_equity: 'Equity Curve',
        stats_margin: 'Total Margin',
        stats_available: 'Available Balance',
        stats_unrealized: 'Unrealized PNL',
        stats_positions: 'Open Positions',
        chart_assets: 'Asset Allocation',
        chart_daily_pnl: 'Daily PNL',
        recent_trades: 'Recent Trades',
        current_positions: 'Current Positions',
        no_trades: 'No trades found',
        no_positions: 'No open positions',
        table_symbol: 'Symbol',
        table_side: 'Side',
        table_price: 'Price',
        table_qty: 'Qty',
        table_pnl: 'PNL',
        table_size: 'Size',
        table_entry: 'Entry',
        table_mark: 'Mark',
        buy: 'BUY',
        sell: 'SELL',
        long: 'LONG',
        short: 'SHORT',

        // account.html
        account_title: 'Account',
        account_desc: 'Real-time account balance and information',
        account_assets: 'Asset Details',
        account_asset: 'Asset',
        account_wallet_balance: 'Wallet Balance',
        account_available: 'Available',
        account_unrealized_pnl: 'Unrealized PNL',
        account_margin_balance: 'Margin Balance',
        account_total_wallet: 'Total Wallet Balance',
        account_total_margin: 'Total Margin Balance',
        account_no_assets: 'No assets with balance',

        // positions.html
        positions_title: 'Positions',
        positions_desc: 'Current open positions',
        positions_open: 'Open Positions',
        pos_liquidation: 'Liquidation',
        pos_leverage: 'Leverage',
        pos_margin_type: 'Margin Type',
        pos_unrealized_pnl: 'Unrealized PNL',
        no_open_positions: 'No open positions',
        refresh: 'Refresh',

        // trades.html
        trades_title: 'Trade History',
        trades_desc: 'Historical trade records with filtering',
        trades_filter_symbol: 'Symbol',
        trades_filter_start: 'Start Date',
        trades_filter_end: 'End Date',
        trades_filter_limit: 'Limit',
        trades_apply: 'Apply',
        trades_records: 'records',
        trades_time: 'Time',
        trades_quote_qty: 'Quote Qty',
        trades_commission: 'Commission',
        trades_realized_pnl: 'Realized PNL',
        no_trade_records: 'No trades found',

        // orders.html
        orders_title: 'Order History',
        orders_desc: 'All order records with filtering',
        orders_filter_symbol: 'Symbol',
        orders_filter_start: 'Start Date',
        orders_filter_end: 'End Date',
        orders_filter_limit: 'Limit',
        orders_apply: 'Apply',
        orders_records: 'records',
        orders_time: 'Time',
        orders_id: 'Order ID',
        orders_type: 'Type',
        orders_side: 'Side',
        orders_price: 'Price',
        orders_qty_exec: 'Qty / Executed',
        orders_avg_price: 'Avg Price',
        orders_status: 'Status',
        orders_market: 'Market',
        no_order_records: 'No orders found',

        // income.html
        income_title: 'Income History',
        income_desc: 'Historical income records (realized PNL, funding fees, commissions)',
        income_filter_type: 'Income Type',
        income_all_types: 'All Types',
        income_realized_pnl: 'Realized PNL',
        income_funding_fee: 'Funding Fee',
        income_commission: 'Commission',
        income_filter_start: 'Start Date',
        income_filter_end: 'End Date',
        income_filter_limit: 'Limit',
        income_apply: 'Apply',
        income_records: 'Income Records',
        income_total: 'Total:',
        income_time: 'Time',
        income_symbol: 'Symbol',
        income_type: 'Type',
        income_amount: 'Amount',
        income_asset: 'Asset',
        no_income_records: 'No income records found',

        // calendar.html
        calendar_title: 'PNL Calendar',
        calendar_desc: 'Visual calendar showing daily profit and loss',
        calendar_total_pnl: 'Total PNL (Period)',
        calendar_best_day: 'Best Day',
        calendar_worst_day: 'Worst Day',
        calendar_filter_start: 'Start Date',
        calendar_filter_end: 'End Date',
        calendar_apply: 'Apply',

        // JS dynamic strings
        loading: 'Loading...',
        network_error: 'Network error',
        toast_failed: 'Request failed',
        chart_daily: 'Daily PNL',
        chart_cumulative: 'Cumulative',
        chart_equity_series: 'Equity',
        chart_peak_series: 'Peak',
        chart_net_invested: 'Net Invested',

        // Language selector
        lang_label: 'Language',
    },
    'en': {
        // base.html - sidebar
        dashboard_title: 'Binance Dashboard',
        dashboard_subtitle: 'Futures Trading Monitor',
        nav_dashboard: 'Dashboard',
        nav_account: 'Account',
        nav_positions: 'Positions',
        nav_trades: 'Trades',
        nav_orders: 'Orders',
        nav_income: 'Income',
        nav_calendar: 'PNL Calendar',
        connecting: 'Connecting...',
        connected: 'Connected',
        error: 'Error',

        // index.html - dashboard
        overview_title: 'Dashboard',
        overview_desc: 'Overview of your Binance Futures account',
        perf_net_deposited: 'Net Deposited',
        perf_total_pnl: 'Total PNL',
        perf_roi: 'ROI',
        perf_max_dd: 'Max Drawdown',
        chart_equity: 'Equity Curve',
        stats_margin: 'Total Margin',
        stats_available: 'Available Balance',
        stats_unrealized: 'Unrealized PNL',
        stats_positions: 'Open Positions',
        chart_assets: 'Asset Allocation',
        chart_daily_pnl: 'Daily PNL',
        recent_trades: 'Recent Trades',
        current_positions: 'Current Positions',
        no_trades: 'No trades found',
        no_positions: 'No open positions',
        table_symbol: 'Symbol',
        table_side: 'Side',
        table_price: 'Price',
        table_qty: 'Qty',
        table_pnl: 'PNL',
        table_size: 'Size',
        table_entry: 'Entry',
        table_mark: 'Mark',
        buy: 'BUY',
        sell: 'SELL',
        long: 'LONG',
        short: 'SHORT',

        // account.html
        account_title: 'Account',
        account_desc: 'Real-time account balance and information',
        account_assets: 'Asset Details',
        account_asset: 'Asset',
        account_wallet_balance: 'Wallet Balance',
        account_available: 'Available',
        account_unrealized_pnl: 'Unrealized PNL',
        account_margin_balance: 'Margin Balance',
        account_total_wallet: 'Total Wallet Balance',
        account_total_margin: 'Total Margin Balance',
        account_no_assets: 'No assets with balance',

        // positions.html
        positions_title: 'Positions',
        positions_desc: 'Current open positions',
        positions_open: 'Open Positions',
        pos_liquidation: 'Liquidation',
        pos_leverage: 'Leverage',
        pos_margin_type: 'Margin Type',
        pos_unrealized_pnl: 'Unrealized PNL',
        no_open_positions: 'No open positions',
        refresh: 'Refresh',

        // trades.html
        trades_title: 'Trade History',
        trades_desc: 'Historical trade records with filtering',
        trades_filter_symbol: 'Symbol',
        trades_filter_start: 'Start Date',
        trades_filter_end: 'End Date',
        trades_filter_limit: 'Limit',
        trades_apply: 'Apply',
        trades_records: 'records',
        trades_time: 'Time',
        trades_quote_qty: 'Quote Qty',
        trades_commission: 'Commission',
        trades_realized_pnl: 'Realized PNL',
        no_trade_records: 'No trades found',

        // orders.html
        orders_title: 'Order History',
        orders_desc: 'All order records with filtering',
        orders_filter_symbol: 'Symbol',
        orders_filter_start: 'Start Date',
        orders_filter_end: 'End Date',
        orders_filter_limit: 'Limit',
        orders_apply: 'Apply',
        orders_records: 'records',
        orders_time: 'Time',
        orders_id: 'Order ID',
        orders_type: 'Type',
        orders_side: 'Side',
        orders_price: 'Price',
        orders_qty_exec: 'Qty / Executed',
        orders_avg_price: 'Avg Price',
        orders_status: 'Status',
        orders_market: 'Market',
        no_order_records: 'No orders found',

        // income.html
        income_title: 'Income History',
        income_desc: 'Historical income records (realized PNL, funding fees, commissions)',
        income_filter_type: 'Income Type',
        income_all_types: 'All Types',
        income_realized_pnl: 'Realized PNL',
        income_funding_fee: 'Funding Fee',
        income_commission: 'Commission',
        income_filter_start: 'Start Date',
        income_filter_end: 'End Date',
        income_filter_limit: 'Limit',
        income_apply: 'Apply',
        income_records: 'Income Records',
        income_total: 'Total:',
        income_time: 'Time',
        income_symbol: 'Symbol',
        income_type: 'Type',
        income_amount: 'Amount',
        income_asset: 'Asset',
        no_income_records: 'No income records found',

        // calendar.html
        calendar_title: 'PNL Calendar',
        calendar_desc: 'Visual calendar showing daily profit and loss',
        calendar_total_pnl: 'Total PNL (Period)',
        calendar_best_day: 'Best Day',
        calendar_worst_day: 'Worst Day',
        calendar_filter_start: 'Start Date',
        calendar_filter_end: 'End Date',
        calendar_apply: 'Apply',

        // JS dynamic strings
        loading: 'Loading...',
        network_error: 'Network error',
        toast_failed: 'Request failed',
        chart_daily: 'Daily PNL',
        chart_cumulative: 'Cumulative',
        chart_equity_series: 'Equity',
        chart_peak_series: 'Peak',
        chart_net_invested: 'Net Invested',

        // Language selector
        lang_label: 'Language',
    }
};

let currentLang = localStorage.getItem(LANG_KEY) || 'zh-TW';

function t(key) {
    return (messages[currentLang] && messages[currentLang][key]) || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    // Update static text with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (messages[lang] && messages[lang][key]) {
            el.textContent = messages[lang][key];
        }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (messages[lang] && messages[lang][key]) {
            el.placeholder = messages[lang][key];
        }
    });

    // Update language button active states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Dispatch event so page scripts can re-render
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = currentLang;
    setLang(currentLang);
});
