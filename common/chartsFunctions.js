const MONTHS_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "None"];
import {formatDateStrExpenses, getDateAndTimeAsString} from './utils'
const getDailyData = (_month, _year, data) => {
    let refDate = new Date(_year, _month + 1, 0)
    let numberOfDaysInMonth = refDate.getDate();
    let dateStr = null
    let date = null
    let dataResult = new Array(numberOfDaysInMonth).fill({
        date: null,
        dayNumber: null,
        water: 0,
        electricity: 0
    })

    for (let i = 0; i < data.length; i++) {
        if (data[i].DeviceType == "water" || data[i].DeviceType == "combined") {
            for (let j = 0; j < data[i].WaterExpenses.length; j++) {
                dateStr = formatDateStrExpenses(data[i].WaterExpenses[j].startTime)
                
                date = new Date(dateStr)
                if (date.getMonth() == refDate.getMonth() && date.getFullYear() == refDate.getFullYear()) {
                    dataResult[date.getDate() - 1] = {
                        date: dateStr,
                        dayNumber: date.getDate(),
                        water: dataResult[date.getDate() - 1].water + data[i].WaterExpenses[j].consumption,
                        electricity: 0
                    }
                }
            }
        }
        if (data[i].DeviceType == "electricity" || data[i].DeviceType == "combined") {
            for (let j = 0; j < data[i].ElectricityExpenses.length; j++) {
                dateStr = formatDateStrExpenses(data[i].ElectricityExpenses[j].startTime)
                date = new Date(dateStr)
                if (date.getMonth() == refDate.getMonth() && date.getFullYear() == refDate.getFullYear()) {
                    dataResult[date.getDate() - 1] = {
                        date: dateStr,
                        dayNumber: date.getDate(),
                        water: dataResult[date.getDate() - 1].water,
                        electricity: dataResult[date.getDate() - 1].electricity + data[i].ElectricityExpenses[j].consumption
                    }
                }
            }
        }
    }
    let maxDay = -1;
    let minDay = 32;
    let maxWater = 0;
    let maxElecticity = 0
    let maxTotal = 0
    let ticks = []
    let cleanDataResult = dataResult.map(item => {
        if (item.date != null) {
            let date = new Date(item.date)
            let total = item.water + item.electricity
            ticks.push(date.getDate())
            minDay = minDay > date.getDate() - 1 ? date.getDate() - 1 : minDay
            maxDay = maxDay < date.getDate() - 1 ? date.getDate() - 1 : maxDay
            maxWater = maxWater < item.water ? item.water : maxWater
            maxElecticity = maxElecticity < item.electricity ? item.electricity : maxElecticity
            maxTotal = maxTotal < total ? total : maxTotal
            item["total"] = total
            return item
        }

    })
    
    cleanDataResult = cleanDataResult.slice(minDay, maxDay)
   
    let result = {
        data: cleanDataResult,
        maxValues: {
            total: maxTotal,
            water: maxWater,
            electricity: maxElecticity
        },
        ticks
    }
    return result
}

const mainChartFunction = (values) => {
    let result = null
    if (values.type == "init") {
        let today = new Date()
        result = getDailyData(today.getMonth(), today.getFullYear(), values.expenses)
    }
    if (values.type == "daily") {
        result = getDailyData(values.month, values.year, values.expenses)
    }
    if (values.type == "monthly") {
        result = getMonthlyData(values.year, values.expenses)
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

const getOptions = (data) => {
    /**
     * year options
     * and fro every year month options
     */

    let allExpenses = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].DeviceType == "water" || data[i].DeviceType == "combined") {
            allExpenses = allExpenses.concat(data[i].WaterExpenses)
        }
        if (data[i].DeviceType == "electricity" || data[i].DeviceType == "combined") {
            allExpenses = allExpenses.concat(data[i].ElectricityExpenses)
        }
    }


    let years = []
    let optionsResult = {}

    for (let i = 0; i < allExpenses.length; i++) {
        let dateStr = formatDateStrExpenses(allExpenses[i].startTime)
        let date = new Date(dateStr)
        if (!years.includes(date.getFullYear())) {
            years.push(date.getFullYear())
            optionsResult[date.getFullYear()] = []
            optionsResult[date.getFullYear()].push(12)
        }
        if (!optionsResult[date.getFullYear()].includes(date.getMonth())) {
            optionsResult[date.getFullYear()].push(date.getMonth())
        }
    }

    let result = {
        yearsOptions: years,
        optionsResult
    }
    return result
}
const sumDailyForMonthly = (data, month) =>{
    let result = {
        monthIndex: month, 
        monthName: MONTHS_NAMES[month], 
        total:0, 
        water:0, 
        electricity:0
    }

    for(let i = 0; i< data.length; i++ ){
        result.total += data[i].total
        result.water += data[i].water
        result.electricity += data[i].electricity
    }

    return result
}
const getMonthlyData = (_year, data) => {
    let options = getOptions(data)
    options = options.optionsResult[`${_year}`]
    let resultData = []
    for(let i = 0; i< options.length; i++ ){
        if(options[i] != 12){
            let daily = getDailyData(options[i], _year, data)
            let sumDailyResult = sumDailyForMonthly(daily.data, options[i])
            resultData.push(sumDailyResult)
        }
    }
    let ticks = [];
    let maxValues = {
        total: 0,
        water: 0,
        electricity: 0
    }

    for (let i = 0; i < resultData.length; i++) {
        ticks.push(MONTHS_NAMES[resultData[i].monthIndex])
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

const getInitCurrentView = () => {
    let today = new Date();
    let result = {
        year: today.getFullYear(),
        month: today.getMonth()
    }
    return result
} 
const getInitCompareView = (data) => {
    let result1 = getInitCurrentView()
    let result2 = {
        year: null,
        month: null
    }
    let result = null
    let options = getOptions(data)
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

const getCompareData = (values) => {
    let result1 = null
    let result2 = null
    let result = null
    if (values.type == "init") {
        let initValues = getInitCompareView(values.expenses)
        result1 = getDailyData(initValues.first.month, initValues.first.year, values.expenses)
        result2 = getDailyData(initValues.second.month, initValues.second.year, values.expenses)
        result = getDailyCompareData(result1, result2)
        result["legend"] = {
            firstString: `${MONTHS_NAMES[initValues.first.month]} ${initValues.first.year}`,
            secondString: `${MONTHS_NAMES[initValues.second.month]} ${initValues.second.year}`
        }
    }
    if (values.type == "daily") {
        result1 = getDailyData(values.month1, values.year1, values.expenses)
        result2 = getDailyData(values.month2, values.year2, values.expenses)
        result = getDailyCompareData(result1, result2)
        result["legend"] = {
            firstString: `${MONTHS_NAMES[values.month1]} ${values.year1}`,
            secondString: `${MONTHS_NAMES[values.month2]} ${values.year2}`
        }
    }
    if (values.type == "monthly") {
        result1 = getMonthlyData(values.year1, values.expenses)
        result2 = getMonthlyData(values.year2, values.expenses)
        result = getMonthlyCompareData(result1, result2)
        result["legend"] = {
            firstString: `${values.year1}`,
            secondString: `${values.year2}`
        }
    }

    return result
}

const monthsRangeNames = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => MONTHS_NAMES[start + (i * step)]);

const getMonthlyCompareData = (res1, res2) => {
 
    let max1 = 0
    let max2 = 0
    let min1 = 12
    let min2 = 12

    let firstMonths = res1.data.map((item, index) => {
        max1 = max1 < item.monthIndex ? item.monthIndex : max1
        min1 = min1 > item.monthIndex ? item.monthIndex : min1
        return [item.monthIndex, index]
    })
    let secondsMonths = res2.data.map((item, index) => {
        max2 = max2 < item.monthIndex ? item.monthIndex : max2
        min2 = min2 > item.monthIndex ? item.monthIndex : min2
        return [item.monthIndex, index]
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
        ticks: monthsRangeNames(minMonthNumber, maxMonthNumber, 1),
        maxValues: {
            total: res1.maxValues.total > res2.maxValues.total ? res1.maxValues.total : res2.maxValues.total,
            water: res1.maxValues.water > res2.maxValues.water ? res1.maxValues.water : res2.maxValues.water,
            electricity: res1.maxValues.electricity > res2.maxValues.electricity ? res1.maxValues.electricity : res2.maxValues.electricity
        }
    }
    return result
}

const getDailyCompareData = (res1, res2) => {
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
const getPerDeviceData = (date, breakdownType, data) => {
    let result = []
    for (let i = 0; i < data.length; i++) {
        
        if (breakdownType == "water" || breakdownType == "total") {
            if (data[i].DeviceType == "water" || data[i].DeviceType == "combined") {
                let obj = {}
                obj["deviceName"] = data[i].DeviceName;
                obj["deviceType"] = "water";
                obj["floor"] = data[i].floor
                obj["room"] = data[i].room
                obj["expenses"] = data[i].WaterExpenses.filter(expense => expense.startTime.includes(date));
                result.push(obj)
            }
        }
        if (breakdownType == "electricity" || breakdownType == "total") {
            if (data[i].DeviceType == "electricity" || data[i].DeviceType == "combined") {
                let obj = {}
                obj["deviceName"] = data[i].DeviceName;
                obj["deviceType"] = "electricity";
                obj["floor"] = data[i].floor
                obj["room"] = data[i].room
                obj["expenses"] = data[i].ElectricityExpenses.filter(expense => expense.startTime.includes(date));
                result.push(obj)
            }
        }
    }
    return result;
}
const getPerDeviceDataMain = (dateValues, breakdownType, data) => {
    let result = null;
    let date = null;
    if (dateValues.day != null) {
        date = new Date(dateValues.year, dateValues.month, dateValues.day);
        date = getDateAndTimeAsString(date)
        date = date.replace(/[/:.-]+/gi, '-')
        date = date.substr(0, 10)
    } else {
        date = new Date(dateValues.year, dateValues.month, 1);
        date = getDateAndTimeAsString(date)
        date = date.replace(/[/:.-]+/gi, '-')
        date = date.substr(3, 7)
    }
    result = getPerDeviceData(date, breakdownType, data)
    return result
}
const getPerDeviceDataCompare = (dateValues, breakdownType, data) => {
    let result1 = getPerDeviceDataMain(dateValues.first, breakdownType, data)
    let result2 = getPerDeviceDataMain(dateValues.second, breakdownType, data)
    result1 = result1.map(res=>{
        let sum = 0;
        for(let i = 0; i < res.expenses.length; i++){
            sum += res.expenses[i].consumption
        }
        res.expenses = sum 
        return res
    })
    result2 = result2.map(res=>{
        let sum = 0;
        for(let i = 0; i < res.expenses.length; i++){
            sum += res.expenses[i].consumption
        }
        res.expenses = sum 
        return res
    })
    let result = result1.map(res => {
        res.expenses1 = res.expenses
        res.expenses2 = 0
        delete res.expenses
        return res
    })
    for(let i = 0; i< result2.length; i++){
        let resultIndex = result.findIndex(element => {
            return element.deviceName == result2[i].deviceName && element.deviceType == result2[i].deviceType && element.room == result2[i].room && element.floor == result2[i].floor
        })

        if(resultIndex > -1){
            result[resultIndex].expenses2 = result2[i].expenses
        }else{
            let tempObj = result2[i]
            res.expenses1 = 0
            res.expenses2 =  result2[i].expenses
            delete res.expenses
            result.push(tempObj)
        }
    }
  return result
}
export {
    mainChartFunction, 
    getCompareData, 
    getOptions, 
    getInitCompareView, 
    getInitCurrentView, 
    getPerDeviceDataCompare,
    getPerDeviceDataMain,
    MONTHS_NAMES
}