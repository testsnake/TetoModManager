const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

const i18nInstance = i18next.createInstance();

async function init() {
    await i18nInstance
        .use(Backend)
        .init({
            lng: 'en',
            fallbackLng: 'en',
            backend: {
                loadPath: './src/locales/{{lng}}.json',
            },
        });

}

module.exports = { init, t: (key) => i18nInstance.t(key) };
