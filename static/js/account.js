// Account page

async function loadAccount() {
    try {
        const res = await API.get('/api/account');
        if (!res.success) {
            statusErr(res.error);
            return;
        }

        const data = res.data;
        renderSummary(data);
        renderAssetsTable(data.assets || []);
        statusOk();
    } catch (e) {
        statusErr(e.message);
    }
}

function renderSummary(data) {
    const container = document.getElementById('account-summary');
    const cards = [
        { label: 'Total Wallet Balance', value: formatUSDPlain(data.totalWalletBalance), cls: '' },
        { label: 'Total Margin Balance', value: formatUSDPlain(data.totalMarginBalance), cls: '' },
        { label: 'Available Balance', value: formatUSDPlain(data.availableBalance), cls: '' },
        { label: 'Unrealized PNL', value: data.totalUnrealizedProfit, cls: '', isPnl: true },
    ];

    container.innerHTML = cards.map(c => `
        <div class="glass-card p-6">
            <p class="text-slate-400 text-sm mb-2">${c.label}</p>
            <p class="text-2xl font-bold">${c.isPnl ? formatUSD(c.value) : c.value}</p>
        </div>
    `).join('');
}

function renderAssetsTable(assets) {
    const tbody = document.getElementById('assets-table');
    if (assets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-slate-500">No assets with balance</td></tr>';
        return;
    }

    tbody.innerHTML = assets.map(a => `
        <tr>
            <td class="py-3 font-medium">${a.asset}</td>
            <td class="py-3">${a.walletBalance.toFixed(6)}</td>
            <td class="py-3">${a.availableBalance.toFixed(6)}</td>
            <td class="py-3">${formatUSD(a.unrealizedProfit)}</td>
            <td class="py-3">${formatUSDPlain(a.marginBalance)}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadAccount);
