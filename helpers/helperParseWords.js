const parseWordsLower = (word) => {

    let first = word[0].toUpperCase();
    let last  = word.slice(1).toLowerCase()

    return first+last
}

module.exports = {
    parseWordsLower
}