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
export {
    formatUserExpenses, 
    getDateAndTimeAsString
}