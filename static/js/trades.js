// Trade history page

async function loadTrades() {
    const tbody = document.getElementById('trades-table');
    tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>Loading...</td></tr>';

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

        document.getElementById('trade-count').textContent = `(${res.count} records)`;

        if (res.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-slate-500">No trades found</td></tr>';
        } else {
            tbody.innerHTML = res.data.map(t => `
                <tr>
                    <td class="py-3 text-xs">${formatTime(t.time)}</td>
                    <td class="py-3 font-medium">${t.symbol}</td>
                    <td class="py-3"><span class="${t.side === 'BUY' ? 'text-green-400' : 'text-red-400'}">${t.side}</span></td>
                    <td class="py-3">$${t.price.toFixed(t.price < 1 ? 6 : 2)}</td>
                    <td class="py-3">${t.qty}</td>
                    <td class="py-3">$${t.quoteQty.toFixed(2)}</td>
                    <td class="py-3 text-slate-400">${t.commission} ${t.commissionAsset}</td>
                    <td class="py-3">${formatUSD(t.realizedPnl)}</td>
                </tr>
            `).join('');
        }
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

document.addEventListener('DOMContentLoaded', loadTrades);
