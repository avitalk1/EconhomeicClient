
import tempData from './dataObj'
const MONTHS_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "None"];
const formatUserExpensesCharts = (expensesArray) => {
    let userExpenses = {}
    let years = []
    for (let i = 0; i < expensesArray.length; i++) {
        let expenseDate = new Date(expensesArray[i].Date);
        if (!years.includes(expenseDate.getFullYear())) {
            years.push(expenseDate.getFullYear())
            userExpenses[expenseDate.getFullYear()] = [[], [], [], [], [], [], [], [], [], [], [], []]
        }
        userExpenses[expenseDate.getFullYear()][expenseDate.getMonth()].push(expensesArray[i])
    }
    return userExpenses
}

/*
const data = [
    { dayNumber: 1, totalExpenses: 100, waterExpenses:59, electricityExpenses:30},
        ... 
];
*/
const getDailyChart = (data) => {
    let resultData = []
    let ticks = [];
    let maxValues = {
        total: 0,
        water: 0,
        electricity: 0
    }
    for (let i = 0; i < data.length; i++) {
        let expenseDate = new Date(data[i].Date);
        ticks.push(expenseDate.getDate())
        let obj = {
            dayNumber: expenseDate.getDate(),
            total: data[i].waterExpenses + data[i].electricityExpenses,
            water: data[i].waterExpenses,
            electricity: data[i].electricityExpenses
        }
        if (i === 0) {
            maxValues = {
                total: obj.total,
                water: obj.water,
                electricity: obj.electricity
            }
        } else {
            maxValues = checkMax(maxValues, obj)
        }
        resultData.push(obj)
    }
    let result = {
        data: resultData,
        ticks: ticks,
        maxValues: maxValues
    }
    return result
}

const getMonthlyChartData = (data) => {
    let resultData = []
    let ticks = [];
    let maxValues = {
        total: 0,
        water: 0,
        electricity: 0
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].length > 0) {
            resultData.push(sumForMonth(data[i], i + 1))
        }
    }

    for (let i = 0; i < resultData.length; i++) {
        ticks.push(MONTHS_NAMES[resultData[i].month - 1])
        if (i === 0) {
            maxValues = {
                total: resultData[i].total,
                water: resultData[i].water,
                electricity: resultData[i].electricity
            }
        } else {
            maxValues = checkMax(maxValues, resultData[i])
        }
    }

    let result = {
        data: resultData,
        ticks: ticks,
        maxValues: maxValues
    }

    return result
}

const checkMax = (currentMax, checkValue) => {
    if (currentMax.total < checkValue.total) {
        currentMax.total = checkValue.total
    }
    if (currentMax.water < checkValue.water) {
        currentMax.water = checkValue.water
    }
    if (currentMax.electricity < checkValue.electricity) {
        currentMax.electricity = checkValue.electricity
    }

    return currentMax
}

const sumForMonth = (data, monthIndex) => {
    let dailyData = getDailyChart(data);
    let result = {
        month: monthIndex,
        monthName: MONTHS_NAMES[monthIndex - 1],
        total: 0,
        water: 0,
        electricity: 0
    }

    for (let i = 0; i < dailyData.data.length; i++) {
        result.total += dailyData.data[i].total
        result.water += dailyData.data[i].water
        result.electricity += dailyData.data[i].electricity
    }

    return result
}
const mainChartFunction = (values) => {
    let result = null
    let formatedData = formatUserExpensesCharts(tempData.Expenses);
    if (values.type == "init") {
        let today = new Date()
        result = getDailyChart(formatedData[today.getFullYear()][today.getMonth()])
    }
    if (values.type == "daily") {
        result = getDailyChart(formatedData[values.year][values.month])
    }
    if (values.type == "monthly") {
        result = getMonthlyChartData(formatedData[values.year])
    }

    return result
}

const getOptions = () => {
    let formatedData = formatUserExpensesCharts(tempData.Expenses)
    let optionsResult = {}
    let yearsOptions = Object.keys(formatedData)

    for (let i = 0; i < yearsOptions.length; i++) {
        optionsResult[yearsOptions[i]] = []
        for (let j = 0; j < formatedData[yearsOptions[i]].length; j++) {
            if (formatedData[yearsOptions[i]][j].length > 0) {
                optionsResult[yearsOptions[i]].push(j)
            }
        }
        optionsResult[yearsOptions[i]].push(12)
    }

    let result = {
        optionsResult,
        yearsOptions
    }

    return result
}

const getCompareData = (values) => {
    let result1 = null
    let result2 = null
    let result = null
    let formatedData = formatUserExpensesCharts(tempData.Expenses)
    if (values.type == "init") {
        let initValues = getInitCompareView()
        result1 = getDailyChart(formatedData[initValues.first.year][initValues.first.month])
        result2 = getDailyChart(formatedData[initValues.second.year][initValues.second.month])
        result = getDailyCompareChart(result1, result2)
        result["legend"] = {
            firstString: `${MONTHS_NAMES[initValues.first.month]} ${initValues.first.year}`,
            secondString: `${MONTHS_NAMES[initValues.second.month]} ${initValues.second.year}`
        }
    }
    if (values.type == "daily") {
        result1 = getDailyChart(formatedData[values.year1][values.month1])
        result2 = getDailyChart(formatedData[values.year2][values.month2])
        result = getDailyCompareChart(result1, result2)
        result["legend"] = {
            firstString: `${MONTHS_NAMES[values.month1]} ${values.year1}`,
            secondString: `${MONTHS_NAMES[values.month2]} ${values.year2}`
        }
    }
    if (values.type == "monthly") {
        result1 = getMonthlyChartData(formatedData[values.year1])
        result2 = getMonthlyChartData(formatedData[values.year2])
        result = getMonthlyCompareChart(result1, result2)
        result["legend"] = {
            firstString: `${values.year1}`,
            secondString: `${values.year2}`
        }
    }

    return result
}

const getInitCurrentView = () => {
    let today = new Date();
    let result = {
        year: today.getFullYear(),
        month: today.getMonth()
    }
    return result
}

const getInitCompareView = () => {
    let result1 = getInitCurrentView()
    let result2 = {
        year: null,
        month: null
    }
    let result = null
    let options = getOptions()
    let counter = 0
    //check if there is compare data
    for (let i = 0; i < options.yearsOptions.length && counter < 2; i++) {
        counter += options.optionsResult[options.yearsOptions[i]].length
    }
    if (counter === 0) {
        return false
    }
    // get the max month that is not result1.month if there are 2 months of current year
    if (options.optionsResult[result1.year].length > 2) {
        result2.year = result1.year
        result2.month = 0;
        options.optionsResult[result1.year].sort(function (a, b) {
            return b - a;
        });

        result2.month = options.optionsResult[result1.year][2];
        result = {
            first: result1,
            second: result2
        }

        return result
    }
    // get max year that is not current year
    options.yearsOptions.sort(function (a, b) {
        return b - a;
    });
    result2.year = options.yearsOptions[1];
    //get max month of the year
    options.optionsResult[result2.year].sort(function (a, b) {
        return b - a;
    });
    result2.month = options.optionsResult[result2.year][1]
    result = {
        first: result1,
        second: result2
    }

    return result
}

const monthsRangeNames = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => MONTHS_NAMES[start + (i * step)]);

const getMonthlyCompareChart = (res1, res2) => {
    let max1 = 0
    let max2 = 0
    let min1 = 12
    let min2 = 12

    let firstMonths = res1.data.map((item, index) => {
        max1 = max1 < item.month ? item.month : max1
        min1 = min1 > item.month ? item.month : min1
        return [item.month, index]
    })
    let secondsMonths = res2.data.map((item, index) => {
        max2 = max2 < item.month ? item.month : max2
        min2 = min2 > item.month ? item.month : min2
        return [item.month, index]
    })

    let maxMonthNumber = max1 < max2 ? max2 : max1
    let minMonthNumber = min1 > min2 ? min2 : min1
    let first = new Array(maxMonthNumber).fill(null);
    let second = new Array(maxMonthNumber).fill(null);

    for (let i = 0; i < firstMonths.length; i++) {
        first[firstMonths[i][0] - 1] = res1.data[firstMonths[i][1]]
    }
    for (let i = 0; i < secondsMonths.length; i++) {
        second[secondsMonths[i][0] - 1] = res2.data[secondsMonths[i][1]]
    }

    for (let i = 0; i < maxMonthNumber; i++) {
        if (first[i] == null) {
            first[i] = {
                "month": i + 1,
                "monthName": MONTHS_NAMES[i],
                "total": 0,
                "water": 0,
                "electricity": 0
            }
        }
        if (second[i] == null) {
            second[i] = {
                "month": i + 1,
                "monthName": MONTHS_NAMES[i],
                "total": 0,
                "water": 0,
                "electricity": 0
            }
        }
    }

    first.splice(0, minMonthNumber - 1);
    second.splice(0, minMonthNumber - 1);
    let result = {
        data: {
            first,
            second
        },
        ticks: monthsRangeNames(minMonthNumber - 1, maxMonthNumber - 1, 1),
        maxValues: {
            total: res1.maxValues.total > res2.maxValues.total ? res1.maxValues.total : res2.maxValues.total,
            water: res1.maxValues.water > res2.maxValues.water ? res1.maxValues.water : res2.maxValues.water,
            electricity: res1.maxValues.electricity > res2.maxValues.electricity ? res1.maxValues.electricity : res2.maxValues.electricity
        }
    }

    return result
}

const getDailyCompareChart = (res1, res2) => {
    let max1 = 0
    let max2 = 0

    let firstDays = res1.data.map((item, index) => {
        max1 = max1 < item.dayNumber ? item.dayNumber : max1
        return [item.dayNumber, index]
    })
    let secondsDays = res2.data.map((item, index) => {
        max2 = max2 < item.dayNumber ? item.dayNumber : max2
        return [item.dayNumber, index]
    })

    let maxDayNumber = max1 < max2 ? max2 : max1

    let first = new Array(maxDayNumber).fill(null);
    let second = new Array(maxDayNumber).fill(null);

    for (let i = 0; i < firstDays.length; i++) {
        first[firstDays[i][0] - 1] = res1.data[firstDays[i][1]]
    }
    for (let i = 0; i < secondsDays.length; i++) {
        second[secondsDays[i][0] - 1] = res2.data[secondsDays[i][1]]
    }
    for (let i = 0; i < maxDayNumber; i++) {
        if (first[i] == null) {
            first[i] = {
                "dayNumber": i + 1,
                "total": 0,
                "water": 0,
                "electricity": 0
            }
        }
        if (second[i] == null) {
            second[i] = {
                "dayNumber": i + 1,
                "total": 0,
                "water": 0,
                "electricity": 0
            }
        }
    }

    let result = {
        data: {
            first,
            second
        },
        ticks: Array.from({ length: maxDayNumber }, (_, i) => i + 1),
        maxValues: {
            total: res1.maxValues.total > res2.maxValues.total ? res1.maxValues.total : res2.maxValues.total,
            water: res1.maxValues.water > res2.maxValues.water ? res1.maxValues.water : res2.maxValues.water,
            electricity: res1.maxValues.electricity > res2.maxValues.electricity ? res1.maxValues.electricity : res2.maxValues.electricity
        }
    }
    return result
}
export {
    mainChartFunction,
    getOptions,
    MONTHS_NAMES,
    getInitCurrentView,
    getCompareData,
    getInitCompareView
}