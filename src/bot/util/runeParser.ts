const enum elderFuthark {
    fehu = 'ᚠ',
    uruz = 'ᚢ',
    thurisaz = 'ᚦ',
    ansuz = 'ᚨ',
    raido = 'ᚱ',
    kaunan = 'ᚲ',
    gebo = 'ᚷ',
    wunjo = 'ᚹ',
    hagalaz = 'ᚺ',
    naudiz = 'ᚾ',
    isaz = 'ᛁ',
    jera = 'ᛃ',
    eihwaz = 'ᛇ',
    perth = 'ᛈ',
    algiz = 'ᛉ',
    sowilo = 'ᛋ',
    tiwaz = 'ᛏ',
    berkanan = 'ᛒ',
    ehwaz = 'ᛖ',
    mannaz = 'ᛗ',
    laguz = 'ᛚ',
    ingwaz = 'ᛜ',
    othala = 'ᛟ',
    dagaz = 'ᛞ'
}

const transcriptionTable = {
    f: elderFuthark.fehu,
    u: elderFuthark.uruz,
    þ: elderFuthark.thurisaz,
    a: elderFuthark.ansuz,
    r: elderFuthark.raido,
    k: elderFuthark.kaunan,
    c: elderFuthark.kaunan,
    g: elderFuthark.gebo,
    w: elderFuthark.wunjo,
    h: elderFuthark.hagalaz,
    n: elderFuthark.naudiz,
    i: elderFuthark.isaz,
    j: elderFuthark.jera,
    y: elderFuthark.jera,
    æ: elderFuthark.eihwaz,
    ï: elderFuthark.eihwaz,
    p: elderFuthark.perth,
    z: elderFuthark.algiz,
    s: elderFuthark.sowilo,
    t: elderFuthark.tiwaz,
    b: elderFuthark.berkanan,
    e: elderFuthark.ehwaz,
    m: elderFuthark.mannaz,
    l: elderFuthark.laguz,
    ŋ: elderFuthark.ingwaz,
    o: elderFuthark.othala,
    d: elderFuthark.dagaz,
    v: elderFuthark.fehu,
    ð: elderFuthark.thurisaz,
    x: elderFuthark.kaunan + elderFuthark.sowilo,
    ch: elderFuthark.gebo,
    ij: elderFuthark.ehwaz,
    cc: elderFuthark.kaunan + elderFuthark.sowilo,
    th: elderFuthark.thurisaz,
    eau: elderFuthark.othala,
    chr: elderFuthark.hagalaz + elderFuthark.raido,
    ing: elderFuthark.ingwaz,
    chl: elderFuthark.hagalaz + elderFuthark.laguz,
    ng: elderFuthark.ingwaz,
    chj: elderFuthark.hagalaz + elderFuthark.jera,
    nk: elderFuthark.ingwaz + elderFuthark.kaunan,
    chw: elderFuthark.hagalaz + elderFuthark.wunjo,
    ei: elderFuthark.sowilo,
    ø: elderFuthark.othala + elderFuthark.ehwaz,
    å: elderFuthark.ansuz + elderFuthark.ansuz,
    q: elderFuthark.kaunan,
    punctuation: {
        [PUNCTUATION.CRUZ]: '᛭',
        [PUNCTUATION.CROSS]: '᛭',
        [PUNCTUATION.UNICO]: '᛫',
        [PUNCTUATION.SINGLE]: '᛫',
        [PUNCTUATION.DUPLO]: '᛬',
        [PUNCTUATION.DOUBLE]: '᛬',
    }
}

const enum PUNCTUATION {
    CRUZ = 'cruz',
    CROSS = 'cross',
    UNICO = 'unico',
    SINGLE = 'single',
    DUPLO = 'duplo',
    DOUBLE = 'double',
};

const enum SPACING {
    NORMAL = 'normal',
    CRUZ = 'cruz',
    CROSS = 'cross',
    UNICO = 'unico',
    SINGLE = 'single',
    DUPLO = 'duplo',
    DOUBLE = 'double',
};

const defaultSettings = {
    punctuation: PUNCTUATION.SINGLE,
    spacing: SPACING.NORMAL
};

function transcribeLetter(letter: string) {
    // @ts-ignore
    let rune = transcriptionTable.hasOwnProperty(letter) ? transcriptionTable[letter] : null
    if (!rune) {
        return isNaN(parseInt(letter)) ? letter : ''
    }
    return rune || ''
};

function transcribeLetterCombinations(letters: string) {
    let combinations = Object.keys(transcriptionTable)
        // @ts-ignore
        .filter(key => key.length !== 1 && typeof transcriptionTable[key] === 'string')
        .sort((a, b) => b.length - a.length)
    return combinations.reduce((str, key) => str = str.replace(key, transcribeLetter(key)), letters.toLowerCase())
};

const runeReducer = (settings: { punctuation: string | number | symbol; spacing: string | number | symbol; }) => (convertedString: any, letter: string) => {
    let rune
    switch (letter) {
        case '.':
        case ',':
            rune = transcriptionTable.punctuation.hasOwnProperty(settings.punctuation)
                // @ts-ignore
                ? transcriptionTable.punctuation[settings.punctuation]
                : transcriptionTable.punctuation[defaultSettings.punctuation]
            break
        case ' ':
            rune = ' '
            if (settings.spacing !== SPACING.NORMAL && transcriptionTable.punctuation.hasOwnProperty(settings.spacing)) {
                // @ts-ignore
                rune = transcriptionTable.punctuation[settings.spacing]
            }
            break
        default:
            rune = transcribeLetter(letter)
    }
    return convertedString += rune
}

function transcribe(string: string, userSettings: any | null) {
    const settings = Object.assign({}, defaultSettings, userSettings)
    return transcribeLetterCombinations(string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")).split('')
        .reduce(runeReducer(settings), new String)
}

export { transcribe, transcribeLetter, transcribeLetterCombinations }
export default transcribe
