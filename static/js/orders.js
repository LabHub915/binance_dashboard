// Order history page

async function loadOrders() {
    const tbody = document.getElementById('orders-table');
    tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>Loading...</td></tr>';

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
        const res = await API.get(`/api/orders?${params.toString()}`);
        if (!res.success) {
            statusErr(res.error);
            tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-500">Error: ${res.error}</td></tr>`;
            return;
        }

        document.getElementById('order-count').textContent = `(${res.count} records)`;

        if (res.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-slate-500">No orders found</td></tr>';
        } else {
            tbody.innerHTML = res.data.map(o => {
                const statusColors = {
                    'FILLED': 'text-green-400',
                    'CANCELED': 'text-red-400',
                    'NEW': 'text-blue-400',
                    'PARTIALLY_FILLED': 'text-yellow-400',
                    'EXPIRED': 'text-slate-500',
                    'REJECTED': 'text-red-500',
                };
                const statusCls = statusColors[o.status] || 'text-slate-400';
                return `
                    <tr>
                        <td class="py-3 text-xs">${formatTime(o.time)}</td>
                        <td class="py-3 text-xs text-slate-400">${o.orderId}</td>
                        <td class="py-3 font-medium">${o.symbol}</td>
                        <td class="py-3"><span class="px-2 py-1 rounded text-xs bg-slate-700">${o.type}</span></td>
                        <td class="py-3"><span class="${o.side === 'BUY' ? 'text-green-400' : 'text-red-400'}">${o.side}</span></td>
                        <td class="py-3">${o.price ? '$' + o.price.toFixed(4) : 'Market'}</td>
                        <td class="py-3">${o.executedQty} / ${o.origQty}</td>
                        <td class="py-3">${o.avgPrice ? '$' + o.avgPrice.toFixed(4) : '--'}</td>
                        <td class="py-3"><span class="${statusCls} font-medium">${o.status}</span></td>
                    </tr>
                `;
            }).join('');
        }
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

document.addEventListener('DOMContentLoaded', loadOrders);
