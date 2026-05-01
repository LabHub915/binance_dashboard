// Positions page

let lastPositionData = null;

async function loadPositions() {
    const tbody = document.getElementById('positions-table');
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>${t('loading')}</td></tr>`;

    try {
        const res = await API.get('/api/positions');
        if (!res.success) {
            statusErr(res.error);
            tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-500">Error: ${res.error}</td></tr>`;
            return;
        }

        lastPositionData = res.data;
        renderPositions();
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderPositions() {
    const tbody = document.getElementById('positions-table');
    const positions = lastPositionData;

    if (!positions || positions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center py-8 text-slate-500">${t('no_open_positions')}</td></tr>`;
        return;
    }

    tbody.innerHTML = positions.map(p => {
        const isLong = p.positionAmt > 0;
        const side = isLong ? t('long') : t('short');
        const pnl = p.unRealizedProfit;
        const pnlPct = p.entryPrice > 0 ? ((p.markPrice - p.entryPrice) / p.entryPrice * 100 * (isLong ? 1 : -1)) : 0;
        return `
            <tr>
                <td class="py-3 font-medium">${p.symbol}</td>
                <td class="py-3"><span class="px-2 py-1 rounded text-xs font-semibold ${isLong ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">${side}</span></td>
                <td class="py-3">${Math.abs(p.positionAmt)}</td>
                <td class="py-3">$${p.entryPrice.toFixed(4)}</td>
                <td class="py-3">$${p.markPrice.toFixed(4)}</td>
                <td class="py-3">$${p.liquidationPrice.toFixed(4)}</td>
                <td class="py-3"><span class="px-2 py-1 rounded text-xs bg-slate-700">${p.leverage}x</span></td>
                <td class="py-3 text-slate-400 capitalize">${p.marginType}</td>
                <td class="py-3">
                    ${formatUSD(pnl)}
                    <span class="text-xs ${pnlPct >= 0 ? 'profit' : 'loss'} ml-1">(${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)</span>
                </td>
            </tr>
        `;
    }).join('');
}

window.addEventListener('langchange', () => {
    if (lastPositionData !== null) renderPositions();
    setLang(currentLang);
});

document.addEventListener('DOMContentLoaded', loadPositions);
