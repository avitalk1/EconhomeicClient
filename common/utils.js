const formatUserExpenses = (expensesArray) => {
    var today = new Date();
    var year = today.getFullYear();
    let monthsArray = [[], [], [], [], [], [], [], [], [], [], [], []]
    for (let i = 0; i < expensesArray.length; i++) {
        let expenseDate = new Date(expensesArray[i].Date);
        if (expenseDate.getFullYear() === year) {
            monthsArray[expenseDate.getMonth()].push(expensesArray[i])
        }
    }
    return monthsArray
}

const getDateAndTimeAsString = (date) => {
    let dateStr = null;
    if (date.getDate() < 10) {
        dateStr = `0${date.getDate()}/`
    } else {
        dateStr = `${date.getDate()}/`
    }
    if (date.getMonth() + 1 < 10) {
        dateStr = `${dateStr}0${date.getMonth() + 1}/`
    } else {
        dateStr = `${dateStr}${date.getMonth() + 1}/`
    }
   
    dateStr = `${dateStr}${date.getFullYear()} `;
    dateStr = `${dateStr}${date.toLocaleTimeString()} `
    return dateStr
}
const getDateAsString = (day, month, year) => {
    let dateStr = null;
    if (day < 10) {
        dateStr = `0${day}/`
    } else {
        dateStr = `${day}/`
    }
    if (month + 1 < 10) {
        dateStr = `${dateStr}0${month + 1}/`
    } else {
        dateStr = `${dateStr}${month + 1}/`
    }
   
    dateStr = `${dateStr}${year} `;
    return dateStr
}
const formatDateStrExpensesBad = (date) => {
    let resDateStr = `${date[3]}${date[4]}-${date[0]}${date[1]}-${date[6]}${date[7]}${date[8]}${date[9]}`
    return resDateStr
}
const formatDateStrExpenses = (date) => {
    let resDateStr = `${date[6]}${date[7]}${date[8]}${date[9]}-${date[3]}${date[4]}-${date[0]}${date[1]}`
    return resDateStr
}
export {
    formatUserExpenses, 
    getDateAndTimeAsString, 
    formatDateStrExpenses, 
    getDateAsString
}