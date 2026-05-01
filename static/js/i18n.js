// i18n translation system
const LANG_KEY = 'binance_dashboard_lang';

const messages = {
    'zh-TW': {
        // base.html - sidebar
        dashboard_title: 'Binance 儀表板',
        dashboard_subtitle: '合約交易監控',
        nav_dashboard: '儀表板',
        nav_account: '帳戶',
        nav_positions: '持倉',
        nav_trades: '交易',
        nav_orders: '訂單',
        nav_income: '收益',
        nav_calendar: '盈虧日曆',
        connecting: '連線中...',
        connected: '已連線',
        error: '錯誤',

        // index.html - dashboard
        overview_title: '儀表板',
        overview_desc: 'Binance 合約帳戶總覽',
        perf_net_deposited: '淨投入',
        perf_total_pnl: '總盈虧',
        perf_roi: '投資報酬率',
        perf_max_dd: '最大回撤',
        chart_equity: '資產淨值曲線',
        stats_margin: '總保證金',
        stats_available: '可用餘額',
        stats_unrealized: '未實現盈虧',
        stats_positions: '持倉數量',
        chart_assets: '資產分配',
        chart_daily_pnl: '每日盈虧',
        recent_trades: '近期交易',
        current_positions: '當前持倉',
        no_trades: '尚無交易記錄',
        no_positions: '尚無持倉',
        table_symbol: '交易對',
        table_side: '方向',
        table_price: '價格',
        table_qty: '數量',
        table_pnl: '盈虧',
        table_size: '持倉量',
        table_entry: '開倉價',
        table_mark: '標記價',
        buy: '買入',
        sell: '賣出',
        long: '做多',
        short: '做空',

        // account.html
        account_title: '帳戶',
        account_desc: '即時帳戶餘額與資訊',
        account_assets: '資產明細',
        account_asset: '資產',
        account_wallet_balance: '錢包餘額',
        account_available: '可用',
        account_unrealized_pnl: '未實現盈虧',
        account_margin_balance: '保證金餘額',
        account_total_wallet: '總錢包餘額',
        account_total_margin: '總保證金餘額',
        account_no_assets: '尚無資產',

        // positions.html
        positions_title: '持倉',
        positions_desc: '當前持倉狀況',
        positions_open: '持倉列表',
        pos_liquidation: '強平價格',
        pos_leverage: '槓桿',
        pos_margin_type: '保證金模式',
        pos_unrealized_pnl: '未實現盈虧',
        no_open_positions: '尚無持倉',
        refresh: '重新整理',

        // trades.html
        trades_title: '交易歷史',
        trades_desc: '歷史交易記錄，支援篩選',
        trades_filter_symbol: '交易對',
        trades_filter_start: '開始日期',
        trades_filter_end: '結束日期',
        trades_filter_limit: '筆數',
        trades_apply: '查詢',
        trades_records: '筆',
        trades_time: '時間',
        trades_quote_qty: '成交金額',
        trades_commission: '手續費',
        trades_realized_pnl: '已實現盈虧',
        no_trade_records: '尚無交易記錄',

        // orders.html
        orders_title: '訂單歷史',
        orders_desc: '所有訂單記錄，支援篩選',
        orders_filter_symbol: '交易對',
        orders_filter_start: '開始日期',
        orders_filter_end: '結束日期',
        orders_filter_limit: '筆數',
        orders_apply: '查詢',
        orders_records: '筆',
        orders_time: '時間',
        orders_id: '訂單編號',
        orders_type: '類型',
        orders_side: '方向',
        orders_price: '價格',
        orders_qty_exec: '數量／已成交',
        orders_avg_price: '均價',
        orders_status: '狀態',
        orders_market: '市價',
        no_order_records: '尚無訂單記錄',

        // income.html
        income_title: '收益記錄',
        income_desc: '歷史收益記錄（已實現盈虧、資金費率、手續費）',
        income_filter_type: '收益類型',
        income_all_types: '全部類型',
        income_realized_pnl: '已實現盈虧',
        income_funding_fee: '資金費率',
        income_commission: '手續費',
        income_filter_start: '開始日期',
        income_filter_end: '結束日期',
        income_filter_limit: '筆數',
        income_apply: '查詢',
        income_records: '收益記錄',
        income_total: '合計：',
        income_time: '時間',
        income_symbol: '交易對',
        income_type: '類型',
        income_amount: '金額',
        income_asset: '幣種',
        no_income_records: '尚無收益記錄',

        // calendar.html
        calendar_title: '盈虧日曆',
        calendar_desc: '每日盈虧視覺化日曆',
        calendar_total_pnl: '期間總盈虧',
        calendar_best_day: '最佳交易日',
        calendar_worst_day: '最差交易日',
        calendar_filter_start: '開始日期',
        calendar_filter_end: '結束日期',
        calendar_apply: '查詢',

        // JS dynamic strings
        loading: '載入中...',
        network_error: '網路錯誤',
        toast_failed: '請求失敗',
        chart_daily: '每日盈虧',
        chart_cumulative: '累計',
        chart_equity_series: '資產淨值',
        chart_peak_series: '歷史高點',
        chart_net_invested: '淨投入',

        // Language selector
        lang_label: '語言',
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
