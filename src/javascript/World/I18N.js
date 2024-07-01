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
        seeYouSoon: 'See you soon!',
        sixPm: 'Mongolia, 5pm',
        invitesYou: 'Invites you to our wedding',
        skyResort: 'Sky Resort',
    },
    mn: { // АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ
        youSitHere: 'Энд суу',
        matus: 'Матус',
        matusFaro: 'Матус Фаро',
        faro: 'Фаро',
        nomin: 'Номин',
        nominKhurelbaatar: 'Номин Хурэлбаатар',
        khurelbaatar: 'Хурэлбаатар',
        weddingInvitation1: 'Тавтай',
        weddingInvitation2: '  морилно уу →',
        theEnd: 'Төгсгөл',
        seeYouSoon: 'Удахгүй уулзацгаая',
        sixPm: '17 цагт болно',
        invitesYou: 'Нарын гэрлэх ёслолд урьж байна',
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
        seeYouSoon: 'Uvidíme sa!',
        sixPm: 'Mongolsko, 17h',
        invitesYou: 'Vás pozývajú na svadbu',
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
