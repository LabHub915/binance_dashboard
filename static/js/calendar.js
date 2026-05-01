// PNL Calendar page with ECharts calendar heatmap

let calendarChart = null;

async function loadCalendar() {
    const params = new URLSearchParams();
    const start = document.getElementById('filter-start').value;
    const end = document.getElementById('filter-end').value;
    if (start) params.set('start', start);
    if (end) params.set('end', end);

    try {
        const res = await API.get(`/api/calendar?${params.toString()}`);
        if (!res.success) {
            statusErr(res.error);
            return;
        }

        const data = res.data;
        renderStats(data);
        renderCalendarChart(data);
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderStats(data) {
    if (data.length === 0) {
        document.getElementById('stat-total-pnl').textContent = '--';
        document.getElementById('stat-best-day').textContent = '--';
        document.getElementById('stat-worst-day').textContent = '--';
        return;
    }

    const total = data.reduce((sum, d) => sum + d.pnl, 0);
    document.getElementById('stat-total-pnl').innerHTML = formatUSD(total);

    let best = data[0];
    let worst = data[0];
    data.forEach(d => {
        if (d.pnl > best.pnl) best = d;
        if (d.pnl < worst.pnl) worst = d;
    });

    document.getElementById('stat-best-day').innerHTML = `+$${best.pnl.toFixed(2)}<span class="text-sm text-slate-400 block">${best.date}</span>`;
    document.getElementById('stat-worst-day').innerHTML = `-$${Math.abs(worst.pnl).toFixed(2)}<span class="text-sm text-slate-400 block">${worst.date}</span>`;
}

function renderCalendarChart(data) {
    if (!calendarChart) {
        calendarChart = initChart('calendar-chart');
    }
    if (!calendarChart) return;

    if (data.length === 0) {
        calendarChart.setOption({
            title: { text: 'No PNL data available', left: 'center', top: 'center', textStyle: { color: '#64748b', fontSize: 14 } },
        });
        return;
    }

    // Find max absolute value for symmetric color scale
    let maxAbs = 0;
    data.forEach(d => { const a = Math.abs(d.pnl); if (a > maxAbs) maxAbs = a; });
    maxAbs = Math.max(maxAbs, 1);

    const chartData = data.map(d => [d.date, d.pnl]);

    calendarChart.setOption({
        tooltip: {
            position: 'top',
            formatter: (p) => {
                const val = p.value[1];
                return `${p.value[0]} <br/> PNL: ${val >= 0 ? '+' : ''}$${val.toFixed(2)}`;
            },
        },
        visualMap: {
            min: -maxAbs,
            max: maxAbs,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            inRange: {
                color: ['#dc2626', '#991b1b', '#1e293b', '#065f46', '#059669', '#10b981'],
            },
            text: ['Profit', 'Loss'],
            textStyle: { color: '#94a3b8' },
        },
        calendar: {
            top: 20,
            left: 30,
            right: 30,
            cellSize: ['auto', 18],
            range: data.length > 0 ? [data[0].date, data[data.length - 1].date] : undefined,
            itemStyle: {
                color: '#1e293b',
                borderColor: 'rgba(15, 23, 42, 0.8)',
                borderWidth: 3,
                borderRadius: 3,
            },
            yearLabel: { show: true, color: '#64748b' },
            monthLabel: { color: '#94a3b8' },
            dayLabel: { color: '#64748b', fontSize: 10, firstDay: 1 },
            splitLine: { show: false },
        },
        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: chartData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.5)',
                },
            },
        }],
    });
}

document.addEventListener('DOMContentLoaded', loadCalendar);
