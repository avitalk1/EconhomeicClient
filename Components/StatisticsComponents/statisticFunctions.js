import { ProgressGreen, ProgressOrange, ProgressRed } from '../../common/styleColors'
const CURRENCY_CONST = 43
import { formatDateStrExpenses } from '../../common/utils'
const MONTHS_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const pickColor = (value) => {
    if (value <= 33) {
        return ProgressGreen
    } else if (value > 33 && value <= 70) {
        return ProgressOrange
    } else {
        return ProgressRed
    }
}

const getSumOfExepnses = (arr) => {
    let today = new Date();
    let sum = 0;
    let todaySum = 0;
    let currDateStr = null;
    let currDate = null
    for (let i = 0; i < arr.length; i++) {
        currDateStr = formatDateStrExpenses(arr[i].startTime)
        currDate = new Date(currDateStr);
        if (currDate.getDate() == today.getDate() && currDate.getMonth() == today.getMonth()) {
            todaySum += arr[i].consumption
            sum += arr[i].consumption
        } else if (currDate.getMonth() == today.getMonth()) {
            sum += arr[i].consumption
        }
    }

    let result = {
        sum,
        todaySum
    }
    return result
}

const getMainStatisticsSums = (data) => {
    let sumWater = 0;
    let sumElectricity = 0;
    let todaySumWater = 0;
    let todaySumElectricity = 0;

    for (let i = 0; i < data.length; i++) {
        let res = 0;
        if (data[i].DeviceType == "water" || data[i].DeviceType == "combined") {
            res = getSumOfExepnses(data[i].WaterExpenses)
            sumWater += res.sum
            todaySumWater += res.todaySum
        }
        if (data[i].DeviceType == "electricity" || data[i].DeviceType == "combined") {
            res = getSumOfExepnses(data[i].ElectricityExpenses)
            sumElectricity += res.sum
            todaySumElectricity += res.todaySum
        }
    }
    let result = {
        sumWater,
        sumElectricity,
        todaySumWater,
        todaySumElectricity
    }
    return result
}

const getCurrentDateData = () => {
    /**
     * todays day
     * todays month 
     * todays year
     * number of days in current month
     */
    let today = new Date();
    let result = {
        day: today.getDate(),
        month: MONTHS_NAMES[today.getMonth()],
        year: today.getFullYear(),
        numberOfDaysInMonth: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(), 
        currentTimeStamp: today.toLocaleString('en-US', { month: 'long' }),
    }
    return result;
}

const getMainStatistics = (expenses, constraints) => {
    let sumsResult = getMainStatisticsSums(expenses)
    let currentDateDataResult = getCurrentDateData()
    let epc = Math.round(((sumsResult.sumWater + sumsResult.sumElectricity)* CURRENCY_CONST)/ (constraints.waterBudget + constraints.electricityBudget) * 100 * 100) / 100
    let water_epc = Math.round((sumsResult.sumWater* CURRENCY_CONST) / constraints.waterBudget * 100 * 100) / 100
    let electricity_epc = Math.round((sumsResult.sumElectricity* CURRENCY_CONST) / constraints.electricityBudget * 100 * 100) / 100

    let totalExpenses = (sumsResult.sumWater + sumsResult.sumElectricity) * CURRENCY_CONST

    let result = {
        totalExpenses: totalExpenses.toFixed(1),
        totalWaterExpenses: sumsResult.sumWater.toFixed(1) * CURRENCY_CONST,
        totalElectricityExpenses: sumsResult.sumElectricity.toFixed(1) * CURRENCY_CONST,
        todaysTotalExpenses: (sumsResult.todaySumWater + sumsResult.todaySumElectricity).toFixed(1) * CURRENCY_CONST,
        todaysWaterExpenses: sumsResult.todaySumWater.toFixed(1) * CURRENCY_CONST,
        todaysElectricityExpenses: sumsResult.todaySumElectricity.toFixed(1) * CURRENCY_CONST,
        expensesPercentageCalculation: {
            value: epc,
            color: pickColor(epc)
        },
        WaterExpensesPercentageCalculation: {
            value: water_epc,
            color: pickColor(water_epc)
        },
        ElectricityExpensesPercentageCalculation: {
            value: electricity_epc,
            color: pickColor(electricity_epc)
        },
        monthNumberOfDays: currentDateDataResult.numberOfDaysInMonth,
        todaysDay: currentDateDataResult.day,
        monthName: currentDateDataResult.month,
        totalBudget: constraints.waterBudget + constraints.electricityBudget,
        currentYear: currentDateDataResult.year, 
        currentTimeStamp: currentDateDataResult.currentTimeStamp
    }
    return result
}
export {
    getMainStatistics
}