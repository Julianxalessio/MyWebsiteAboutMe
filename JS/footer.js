async function getFooter() {
    const response = await fetch("HTML/footer.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".footer").innerHTML = `
        ${data}
    `;
}

async function getFooter_IPAD() {
    const response = await fetch("HTML/footer_ipad.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".footer").innerHTML = `
        ${data}
    `;
}

async function getFooterPhone() {
    const response = await fetch("HTML/footerPhone.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".footer").innerHTML = `
        ${data}
    `;
}

function getModeForWidthFoot(w) {
    if (w >= 1001) return 'desktop';
    if (w >= 651) return 'ipad';
    return 'mobile';
}

let currentModeFoot = null;

async function loadAppropriateFoot() {
    const w = window.innerWidth;
    const mode = getModeForWidthFoot(w);
    if (mode === currentModeFoot) return;
    currentModeFoot = mode;
    if (mode === 'desktop') {
        await getFooter();
    } else if (mode === 'ipad') {
        await getFooter_IPAD();
    } else {
        await getFooterPhone();
    }
}

window.addEventListener('load', () => {
    loadAppropriateFoot();
});

window.addEventListener('resize', () => {
    loadAppropriateFoot();
});
