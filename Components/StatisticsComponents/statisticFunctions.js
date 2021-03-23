const formatUserExpenses = (expensesArray) => {
    let today = new Date();
    let year = today.getFullYear();
    let monthsArray = [[], [], [], [], [], [], [], [], [], [], [], []]
    for (let i = 0; i < expensesArray.length; i++) {
        let expenseDate = new Date(expensesArray[i].Date);
        if (expenseDate.getFullYear() === year) {
            monthsArray[expenseDate.getMonth()].push(expensesArray[i])
        }
    }
    return monthsArray
}
const mainStatisticsFunction = (expensesArray, constraints) =>{
    let formatedExpenses = formatUserExpenses(expensesArray);
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentMonthExpenses = formatedExpenses[currentMonth];
    let todaysWaterExpenses = -1;
    let todaysElectricityExpenses = -1;
    let totalWaterExpenses = 0;
    let totalElectricityExpenses = 0;
    if(currentMonthExpenses.length === 0){
        return false;
    }
    for(let i =0 ; i< currentMonthExpenses.length; i++){
        let date = new Date(currentMonthExpenses[i].Date);
        if(today.getDate() === date.getDate()){
            todaysWaterExpenses = currentMonthExpenses[i].waterExpenses;
            todaysElectricityExpenses = currentMonthExpenses[i].electricityExpenses
        }
        totalWaterExpenses += currentMonthExpenses[i].waterExpenses;
        totalElectricityExpenses+= currentMonthExpenses[i].electricityExpenses;
    }

    let result = {
        totalExpenses: totalWaterExpenses + totalElectricityExpenses,
        totalWaterExpenses: totalWaterExpenses,
        totalElectricityExpenses: totalElectricityExpenses,
        todaysTotalExpenses: todaysWaterExpenses + todaysElectricityExpenses,
        todaysWaterExpenses: todaysWaterExpenses, 
        todaysElectricityExpenses: todaysElectricityExpenses,
        expensesPercentageCalculation: Math.round( (totalWaterExpenses + totalElectricityExpenses) / (constraints.waterBudget + constraints.electricityBudget) * 100 * 100) / 100, 
        WaterExpensesPercentageCalculation: Math.round( totalWaterExpenses / constraints.waterBudget * 100 * 100) / 100, 
        ElectricityExpensesPercentageCalculation: Math.round( totalElectricityExpenses /  constraints.electricityBudget * 100 * 100) / 100, 
        monthNumberOfDays: new Date(today.getFullYear(), today.getMonth() +1 , 0).getDate(), 
        todaysDay:today.getDate(), 
        monthName: today.toLocaleString('en-US', { month: 'long' }),
        totalBudget: constraints.waterBudget + constraints.electricityBudget,
        currentYear: today.getFullYear()

    }
        return result
}
export {
    formatUserExpenses, 
    mainStatisticsFunction
}