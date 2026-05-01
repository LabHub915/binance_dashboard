// Income history page

async function loadIncome() {
    const tbody = document.getElementById('income-table');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-500"><div class="spinner mx-auto mb-3"></div>Loading...</td></tr>';

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

        document.getElementById('income-count').textContent = `(${res.count} records)`;

        const total = res.data.reduce((sum, item) => sum + item.income, 0);
        document.getElementById('income-total').innerHTML = `Total: ${formatUSD(total)}`;

        if (res.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-500">No income records found</td></tr>';
        } else {
            const typeLabels = {
                'REALIZED_PNL': 'Realized PNL',
                'FUNDING_FEE': 'Funding Fee',
                'COMMISSION': 'Commission',
            };
            tbody.innerHTML = res.data.map(inc => `
                <tr>
                    <td class="py-3 text-xs">${formatTime(inc.time)}</td>
                    <td class="py-3 font-medium">${inc.symbol}</td>
                    <td class="py-3">
                        <span class="px-2 py-1 rounded text-xs ${inc.incomeType === 'REALIZED_PNL' ? 'bg-blue-500/20 text-blue-400' : inc.incomeType === 'FUNDING_FEE' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-slate-400'}">
                            ${typeLabels[inc.incomeType] || inc.incomeType}
                        </span>
                    </td>
                    <td class="py-3">${formatUSD(inc.income)}</td>
                    <td class="py-3 text-slate-400">${inc.asset}</td>
                </tr>
            `).join('');
        }
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

document.addEventListener('DOMContentLoaded', loadIncome);
