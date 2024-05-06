const translations = {
    ca: {
        matusFaro: 'Matus Faro',
        nominKhurelbaatar: 'Nomin Khurelbaatar',
    },
    mn: { // АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ
        matusFaro: 'Матус Фаро',
        nominKhurelbaatar: 'Номин Хурэлбаатар',
    },
    sk: {
        matusFaro: 'Matúš Faro',
        nominKhurelbaatar: 'Nomin Khurelbaatar',
    },
}

export default class I18N {
    constructor(_options) {
        this.config = _options.config
    }

    get(key) {
        return translations[this.getLanguage()][key] || translations.ca[key] || key
    }

    getLanguage() {
        return this.config.language || 'ca'
    }
}
