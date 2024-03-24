// Paragraphs to array
function formatDate(timestamp, returnTime = true) {
    if (!timestamp) return 
    // timestamp = parseInt(timestamp)
    // timestamp = +timestamp
    let d = new Date(timestamp)
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    let getHours = d.getHours()
    let getMinutes = d.getMinutes()
    let hours = getHours > 12 ? getHours - 12 : getHours === 0 ? 12 : getHours
    let minutes = getMinutes < 10 ? '0'+getMinutes : getMinutes
    let amPm = getHours < 12 ? 'AM' : 'PM'
    let time = `${hours}:${minutes} ${amPm}`
    let fullDate = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
    let fullTime = `at ${hours}:${minutes} ${amPm}`
    if (returnTime) {
        return `${fullDate} ${fullTime}`
    }
    return fullDate 
}

function daysSince(date) {
    let start = new Date(date)
    let end = Date.now()
    return Math.round((end - start) / (1000 * 3600 * 24))
    

}

function paraToArray(data) {
    let newArr = data.split('\n')
    for (let i; i < newArr.length; i++) {
        if (newArr[i] == '') delete newArr[i]
    }
    return newArr
}

// Array to paragraphs
function arrayToPara(data) {
    let newString = ''
    for (let i; i < data.length; i++) {
        newString += `<p>${data[i]}</p>`
    }
    return newString
}

function arrayToString(data) {
    let newString = ''
    for (let i; i < data.length; i++) {
        newString += `${data[i]}\n`
    }
    return newString
}

let globalService = {
    paraToArray,
    arrayToPara,
    arrayToString,
    formatDate,
    daysSince
}

export default globalService
