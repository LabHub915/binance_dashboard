// Dashboard page - overview with charts

let assetChart = null;
let pnlTrendChart = null;

async function loadDashboard() {
    try {
        const [acctRes, posRes, calRes, tradesRes] = await Promise.all([
            API.get('/api/account'),
            API.get('/api/positions'),
            API.get('/api/calendar?limit=365'),
            API.get('/api/trades?limit=10'),
        ]);

        if (acctRes.success) {
            renderStats(acctRes.data);
            renderAssetChart(acctRes.data.assets || []);
        } else {
            statusErr('Account API failed');
        }

        if (posRes.success) {
            const n = posRes.data.length;
            document.getElementById('stat-positions').textContent = n;
            renderPositionsTable(posRes.data);
        }

        if (calRes.success && calRes.data.length > 0) {
            renderPnlTrend(calRes.data.slice(-30));
        }

        if (tradesRes.success) {
            renderRecentTrades(tradesRes.data);
        }

        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderStats(data) {
    document.getElementById('stat-margin').textContent = formatUSDPlain(data.totalMarginBalance);
    document.getElementById('stat-available').textContent = formatUSDPlain(data.availableBalance);
    const upnl = data.totalUnrealizedProfit;
    const el = document.getElementById('stat-unrealized');
    el.innerHTML = formatUSD(upnl);
}

function renderAssetChart(assets) {
    if (!assetChart) {
        assetChart = initChart('chart-assets');
    }
    if (!assetChart) return;

    const filtered = assets.filter(a => a.walletBalance > 0);
    const pieData = filtered.map(a => ({
        name: a.asset,
        value: a.marginBalance,
    }));

    assetChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: (p) => `${p.name}: $${p.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        },
        series: [{
            type: 'pie',
            radius: ['45%', '75%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 8,
                borderColor: 'rgba(30, 41, 59, 0.8)',
                borderWidth: 3,
            },
            label: {
                show: true,
                position: 'outside',
                color: '#94a3b8',
                fontSize: 11,
            },
            data: pieData,
        }],
    });
}

function renderPnlTrend(data) {
    if (!pnlTrendChart) {
        pnlTrendChart = initChart('chart-pnl-trend');
    }
    if (!pnlTrendChart) return;

    const dates = data.map(d => d.date);
    const values = data.map(d => d.pnl);
    let cumulative = 0;
    const cumValues = values.map(v => { cumulative += v; return +cumulative.toFixed(2); });

    pnlTrendChart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const daily = params[0].value;
                const cum = params[1].value;
                return `${params[0].axisValue}<br/>Daily: ${daily >= 0 ? '+' : ''}$${daily.toFixed(2)}<br/>Cumulative: $${cum.toFixed(2)}`;
            },
        },
        legend: {
            data: ['Daily PNL', 'Cumulative'],
            textStyle: { color: '#94a3b8' },
            bottom: 0,
        },
        grid: { left: 60, right: 30, top: 20, bottom: 40 },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: '#334155' } },
            axisLabel: { color: '#64748b', fontSize: 10, rotate: 45 },
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: '#64748b', formatter: (v) => '$' + v },
            splitLine: { lineStyle: { color: '#1e293b' } },
        },
        series: [
            {
                name: 'Daily PNL',
                type: 'bar',
                data: values,
                itemStyle: {
                    color: (params) => params.value >= 0 ? '#10b981' : '#ef4444',
                    borderRadius: [4, 4, 0, 0],
                },
            },
            {
                name: 'Cumulative',
                type: 'line',
                data: cumValues,
                smooth: true,
                lineStyle: { color: '#8b5cf6', width: 2 },
                itemStyle: { color: '#8b5cf6' },
                symbol: 'none',
            },
        ],
    });
}

function renderRecentTrades(trades) {
    const tbody = document.getElementById('recent-trades');
    if (trades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-slate-500">No trades found</td></tr>';
        return;
    }
    tbody.innerHTML = trades.map(t => `
        <tr>
            <td class="py-2 font-medium">${t.symbol}</td>
            <td class="py-2"><span class="${t.side === 'BUY' ? 'text-green-400' : 'text-red-400'}">${t.side}</span></td>
            <td class="py-2">$${t.price.toFixed(t.price < 1 ? 6 : 2)}</td>
            <td class="py-2">${t.qty}</td>
            <td class="py-2">${formatUSD(t.realizedPnl)}</td>
        </tr>
    `).join('');
}

function renderPositionsTable(positions) {
    const tbody = document.getElementById('recent-positions');
    if (positions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-slate-500">No open positions</td></tr>';
        return;
    }
    tbody.innerHTML = positions.map(p => {
        const side = p.positionAmt > 0 ? 'LONG' : 'SHORT';
        return `
            <tr>
                <td class="py-2 font-medium">${p.symbol}</td>
                <td class="py-2"><span class="${side === 'LONG' ? 'text-green-400' : 'text-red-400'}">${side}</span></td>
                <td class="py-2">${Math.abs(p.positionAmt)}</td>
                <td class="py-2">$${p.entryPrice.toFixed(4)}</td>
                <td class="py-2">$${p.markPrice.toFixed(4)}</td>
                <td class="py-2">${formatUSD(p.unRealizedProfit)}</td>
            </tr>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', loadDashboard);
