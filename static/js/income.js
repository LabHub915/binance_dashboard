// Income history page

let lastIncomeData = null;

async function loadIncome() {
    const tbody = document.getElementById('income-table');
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>${t('loading')}</td></tr>`;

    const params = new URLSearchParams();
    const type = document.getElementById('filter-type').value;
    const start = document.getElementById('filter-start').value;
    const end = document.getElementById('filter-end').value;
    const limit = document.getElementById('filter-limit').value;

    if (type) params.set('type', type);
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    params.set('limit', limit);

    try {
        const res = await API.get(`/api/income?${params.toString()}`);
        if (!res.success) {
            statusErr(res.error);
            tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-500">Error: ${res.error}</td></tr>`;
            return;
        }

        lastIncomeData = res;
        renderIncome();
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderIncome() {
    const res = lastIncomeData;
    if (!res) return;
    const tbody = document.getElementById('income-table');

    document.getElementById('income-count').textContent = `(${res.count} ${t('income_records').toLowerCase()})`;

    const total = res.data.reduce((sum, item) => sum + item.income, 0);
    document.getElementById('income-total').innerHTML = `${t('income_total')} ${formatUSD(total)}`;

    if (res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-500">${t('no_income_records')}</td></tr>`;
        return;
    }

    tbody.innerHTML = res.data.map(inc => {
        const typeKey = inc.incomeType === 'REALIZED_PNL' ? 'income_realized_pnl' :
                        inc.incomeType === 'FUNDING_FEE' ? 'income_funding_fee' :
                        inc.incomeType === 'COMMISSION' ? 'income_commission' : '';
        const typeLabel = typeKey ? t(typeKey) : inc.incomeType;
        const typeCls = inc.incomeType === 'REALIZED_PNL' ? 'bg-blue-500/20 text-blue-400' :
                        inc.incomeType === 'FUNDING_FEE' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-slate-700 text-slate-400';
        return `
            <tr>
                <td class="py-3 text-xs">${formatTime(inc.time)}</td>
                <td class="py-3 font-medium">${inc.symbol}</td>
                <td class="py-3">
                    <span class="px-2 py-1 rounded text-xs ${typeCls}">${typeLabel}</span>
                </td>
                <td class="py-3">${formatUSD(inc.income)}</td>
                <td class="py-3 text-slate-400">${inc.asset}</td>
            </tr>
        `;
    }).join('');
}

window.addEventListener('langchange', () => {
    if (lastIncomeData) renderIncome();
    setLang(currentLang);
});

document.addEventListener('DOMContentLoaded', loadIncome);
