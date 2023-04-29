window.api.on('i18n-ready', async () => {
    document.querySelectorAll('[data-i18n]').forEach(async elem => {
        const key = elem.getAttribute('data-i18n');
        const translation = await window.api.translate(key);
        elem.textContent = translation;
    });
});
