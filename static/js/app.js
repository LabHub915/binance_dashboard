// Common utility functions for all pages

const API = {
    async get(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!data.success) {
                showToast(data.error || 'Request failed', 'error');
            }
            return data;
        } catch (err) {
            showToast('Network error: ' + err.message, 'error');
            return { success: false, error: err.message };
        }
    }
};

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const colors = {
        error: 'bg-red-500/90 border-red-400',
        success: 'bg-green-500/90 border-green-400',
        info: 'bg-blue-500/90 border-blue-400',
    };
    const toast = document.createElement('div');
    toast.className = `${colors[type]} border text-white px-5 py-3 rounded-xl shadow-lg mb-2 backdrop-blur`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleString('zh-TW', { hour12: false });
}

function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('zh-TW');
}

function formatUSD(val) {
    if (val == null || isNaN(val)) return '--';
    const num = Number(val);
    const cls = num >= 0 ? 'profit' : 'loss';
    const sign = num >= 0 ? '+' : '';
    return `<span class="${cls}">${sign}$${Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
}

function formatUSDPlain(val) {
    if (val == null || isNaN(val)) return '--';
    const num = Number(val);
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function statusOk() {
    const el = document.getElementById('status-indicator');
    if (el) el.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span><span data-i18n="connected">${t('connected')}</span>`;
}

function statusErr(msg) {
    const el = document.getElementById('status-indicator');
    if (el) el.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span>${msg || t('error')}`;
}

// Initialize charts with dark theme
function initChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return null;
    const chart = echarts.init(dom, null, {
        renderer: 'canvas',
    });
    chart.setOption({
        backgroundColor: 'transparent',
    });
    return chart;
}

// Responsive resize
window.addEventListener('resize', () => {
    // Charts will auto-resize if we track them
});
