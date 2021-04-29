import {ProgressGreen, ProgressOrange, ProgressRed} from '../../common/styleColors'


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

const pickColor = (value) => {
    if(value <= 33){
        return ProgressGreen
    }else if(value > 33 && value <=70){
        return ProgressOrange
    }else{
        return ProgressRed
    }
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
    let epc = Math.round( (totalWaterExpenses + totalElectricityExpenses) / (constraints.waterBudget + constraints.electricityBudget) * 100 * 100) / 100
    let water_epc = Math.round( totalWaterExpenses / constraints.waterBudget * 100 * 100) / 100
    let electricity_epc =  Math.round( totalElectricityExpenses /  constraints.electricityBudget * 100 * 100) / 100
    
    // calculate colors 


    let result = {
        totalExpenses: totalWaterExpenses + totalElectricityExpenses,
        totalWaterExpenses: totalWaterExpenses,
        totalElectricityExpenses: totalElectricityExpenses,
        todaysTotalExpenses: todaysWaterExpenses + todaysElectricityExpenses,
        todaysWaterExpenses: todaysWaterExpenses, 
        todaysElectricityExpenses: todaysElectricityExpenses,
        expensesPercentageCalculation:  {
            value:epc, 
            color: pickColor(epc)
        },
        WaterExpensesPercentageCalculation:{
            value:water_epc, 
            color: pickColor(water_epc)
        },
        ElectricityExpensesPercentageCalculation:{
            value:electricity_epc, 
            color: pickColor(electricity_epc)
        },
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