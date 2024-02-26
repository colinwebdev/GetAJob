

function formatDate(timestamp) {
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
    let hours = getHours > 12 ? hours - 12 : getHours === 0 ? 12 : getHours
    let minutes = getMinutes < 10 ? '0'+getMinutes : getMinutes
    let amPm = getHours < 12 ? 'AM' : 'PM'
    let time = `${hours}:${minutes} ${amPm}`
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at ' + time
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
    GOOGLE_MAPS_KEY,
    GOOGLE_MAP_ID,
    formatDate
}

export default globalService
