const ParseDateMoment = (date,time) => {

    let dateConcat = `${date}T${time}}`;
    let newDate = moment.utc(dateConcat,"DD-MM-YYYYTHH:mm:ss.sssZ")
    return newDate;
}

module.exports = {
    ParseDateMoment
}