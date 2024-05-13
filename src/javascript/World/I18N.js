const translations = {
    ca: {
        youSitHere: 'Sit here',
        matus: 'Matus',
        matusFaro: 'Matus Faro',
        Faro: 'Faro',
        nomin: 'Nomin',
        nominKhurelbaatar: 'Nomin Khurelbaatar',
        khurelbaatar: 'Khurelbaatar',
        weddingInvitation1: 'Wedding',
        weddingInvitation2: 'invitation →',
        theEnd: 'The End',
    },
    mn: { // АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ
        youSitHere: 'Энд суу',
        matus: 'Матус',
        matusFaro: 'Матус Фаро',
        faro: 'Фаро',
        nomin: 'Номин',
        nominKhurelbaatar: 'Номин Хурэлбаатар',
        khurelbaatar: 'Хурэлбаатар',
        weddingInvitation1: 'Хуримын',
        weddingInvitation2: '  урилга →',
        theEnd: 'Төгсгөл',
    },
    sk: {
        youSitHere: 'Sedíš tu',
        matus: 'Matúš',
        matusFaro: 'Matúš Faro',
        faro: 'Faro',
        nomin: 'Nomin',
        nominKhurelbaatar: 'Nomin Khurelbaatar',
        khurelbaatar: 'Khurelbaatar',
        weddingInvitation1: 'Svadobná',
        weddingInvitation2: '  pozvánka →',
        theEnd: 'Koniec',
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
