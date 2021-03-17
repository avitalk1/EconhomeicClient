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

export {
    formatUserExpenses
}