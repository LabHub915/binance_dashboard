// Trade history page

let lastTradeData = null;

async function loadTrades() {
    const tbody = document.getElementById('trades-table');
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>${t('loading')}</td></tr>`;

    const params = new URLSearchParams();
    const symbol = document.getElementById('filter-symbol').value.trim();
    const start = document.getElementById('filter-start').value;
    const end = document.getElementById('filter-end').value;
    const limit = document.getElementById('filter-limit').value;

    if (symbol) params.set('symbol', symbol);
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    params.set('limit', limit);

    try {
        const res = await API.get(`/api/trades?${params.toString()}`);
        if (!res.success) {
            statusErr(res.error);
            tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500">Error: ${res.error}</td></tr>`;
            return;
        }

        lastTradeData = res;
        renderTrades();
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderTrades() {
    const res = lastTradeData;
    if (!res) return;
    const tbody = document.getElementById('trades-table');

    document.getElementById('trade-count').textContent = `(${res.count} ${t('trades_records')})`;

    if (res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500">${t('no_trade_records')}</td></tr>`;
        return;
    }

    tbody.innerHTML = res.data.map(trade => `
        <tr>
            <td class="py-3 text-xs">${formatTime(trade.time)}</td>
            <td class="py-3 font-medium">${trade.symbol}</td>
            <td class="py-3"><span class="${trade.side === 'BUY' ? 'text-green-400' : 'text-red-400'}">${trade.side === 'BUY' ? t('buy') : t('sell')}</span></td>
            <td class="py-3">$${trade.price.toFixed(trade.price < 1 ? 6 : 2)}</td>
            <td class="py-3">${trade.qty}</td>
            <td class="py-3">$${trade.quoteQty.toFixed(2)}</td>
            <td class="py-3 text-slate-400">${trade.commission} ${trade.commissionAsset}</td>
            <td class="py-3">${formatUSD(trade.realizedPnl)}</td>
        </tr>
    `).join('');
}

window.addEventListener('langchange', () => {
    if (lastTradeData) renderTrades();
    setLang(currentLang);
});

document.addEventListener('DOMContentLoaded', loadTrades);
