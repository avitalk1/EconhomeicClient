import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements'
import { getInitCompareView, getCompareData, getOptions, MONTHS_NAMES, getPerDeviceDataCompare } from '../../common/chartsFunctions'
import DailyChartCompare from './DailyChartCompare'
import MonthlyChartCompare from './MonthlyChartCompare'

import DropDown from '../DropDown'
import {
    FirstLegendColor,
    SecondLegendColor
} from '../../common/styleColors'
const BREAKDOWN_VIEW_TYPE_OPTIONS = ["total", "water", "electricity"]
function CompareCharts(props) {
    const [data, setData] = useState(getCompareData({ type: "init", expenses: props.expenses }))
    const [breakdownViewType, setBreakdownViewType] = useState("total")
    const [breakdownViewTypeIndex, setBreakdownViewTypeIndex] = useState(0)
    const [chartType, setChartType] = useState("daily")
    const [chartOptions, setChartOptions] = useState(getOptions(props.expenses))
    const [changeChartView, setChangeChartView] = useState(false)
    const [currentView, setCurrentView] = useState(getInitCompareView(props.expenses))
    const [isDropDownExpended, setIsDropDownExpended] = useState(false)
    const [monthsOptionsFirst, setMonthsOptionsFirst] = useState(
        chartOptions.optionsResult[currentView.first.year].map(i => {
            return { label: MONTHS_NAMES[i], value: i }
        })
    )
    const [monthsOptionsSecond, setMonthsOptionsSecond] = useState(
        chartOptions.optionsResult[currentView.second.year].map(i => {
            return { label: MONTHS_NAMES[i], value: i }
        })
    )
    const [futureChartView, setFutureChartView] = useState(getInitCompareView(props.expenses))
    const handleUpdateBreakdownViewType = (index) => {
        setBreakdownViewType(BREAKDOWN_VIEW_TYPE_OPTIONS[index])
        setBreakdownViewTypeIndex(index)
    }
    const handeOpenChangeChartView = () => {
        setChangeChartView(true)
    }
    const handleChangeChartsView = () => {
        let _type = futureChartView.first.month == 12 ? "monthly" : "daily"
        setChartType(_type)
        setCurrentView(JSON.parse(JSON.stringify(futureChartView)))
        setData(getCompareData({ type: _type, year1: futureChartView.first.year, month1: futureChartView.first.month, year2: futureChartView.second.year, month2: futureChartView.second.month, expenses: props.expenses }))
        setChangeChartView(false)
    }
    const handeCloseChangeChartView = () => {
        setFutureChartView(JSON.parse(JSON.stringify(currentView)))
        setChangeChartView(false)
    }
    const handlePickMonth = (values) => {
        if (values.index == 1) {
            let tempFuture = futureChartView;
            tempFuture.first.month = values.month;
            setFutureChartView(tempFuture)
        } else {
            let tempFuture = futureChartView;
            tempFuture.second.month = values.month;
            setFutureChartView(tempFuture)
        }
        if (values.month == 12) {
            let tempFuture = futureChartView;
            tempFuture.first.month = values.month;
            tempFuture.second.month = values.month;
            setFutureChartView(tempFuture)
        }
    }
    const handlePickYear = (values) => {
        if (values.index == 1) {
            let tempFuture = futureChartView;
            tempFuture.first.year = values.year;
            setFutureChartView(tempFuture)
            setMonthsOptionsFirst(chartOptions.optionsResult[values.year].map(i => {
                return { label: MONTHS_NAMES[i], value: i }
            }))
        } else {
            let tempFuture = futureChartView;
            tempFuture.second.year = values.year;
            setFutureChartView(tempFuture)
            setMonthsOptionsSecond(chartOptions.optionsResult[values.year].map(i => {
                return { label: MONTHS_NAMES[i], value: i }
            }))
        }
    }
    const handleExpendEventUI = (value) => {
        setIsDropDownExpended(value)
    }
    const handleOnBarClick = (val) => {
        let first = {
            year: currentView.first.year,
            month: chartType === "monthly" ? monthsOptionsFirst[val + 1].value : currentView.first.month,
            day: chartType === "daily" ? val + 1 : null
        }
        let second = {
            year: currentView.second.year,
            month: chartType === "monthly" ? monthsOptionsSecond[val + 1].value : currentView.second.month,
            day: chartType === "daily" ? val + 1 : null
        }
        let result = getPerDeviceDataCompare({ first, second }, breakdownViewType, props.expenses)
        props.navigation.navigate('PerDeviceViewCompare', {
            params: {
                data: result, dates: {
                    first: {
                        year: currentView.first.year,
                        month: chartType === "monthly" ? monthsOptionsFirst[val + 1].label : currentView.first.month,
                        day: chartType === "daily" ? val + 1 : null
                    }, 
                    second:{
                        year: currentView.second.year,
                        month: chartType === "monthly" ? monthsOptionsSecond[val + 1].label : currentView.second.month,
                        day: chartType === "daily" ? val + 1 : null
                    }
                }, breakdown: breakdownViewType, chartType: chartType, viewType: "Compare"
            },
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {
                    chartType == "daily" ?
                        <DailyChartCompare data={data} viewType={breakdownViewType} handleBarClick={handleOnBarClick} />
                        :
                        <MonthlyChartCompare data={data} viewType={breakdownViewType} handleBarClick={handleOnBarClick} />
                }
            </View>
            <View style={styles.buttonGroupContainer}>
                <ButtonGroup
                    onPress={handleUpdateBreakdownViewType}
                    selectedIndex={breakdownViewTypeIndex}
                    buttons={BREAKDOWN_VIEW_TYPE_OPTIONS}
                    containerStyle={!changeChartView ? styles.buttonGroupStyleShow : styles.buttonGroupStyleHide}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                />
            </View>
            <View style={styles.chartViewContainerMain}>
                {
                    !changeChartView ?
                        <View style={styles.chartViewContainer}>
                            <TouchableOpacity onPress={handeOpenChangeChartView}>
                                <View style={styles.dateTextContainer}>
                                    <View style={{ width: 10, height: 10, backgroundColor: FirstLegendColor }} />
                                    {
                                        currentView.first.month != 12 ?
                                            <Text style={styles.dateText}>{MONTHS_NAMES[currentView.first.month]}</Text> :
                                            <></>
                                    }
                                    <Text style={styles.dateText}>{currentView.first.year}</Text>
                                </View>
                                <Text style={styles.dateVSText}>VS</Text>
                                <View style={styles.dateTextContainer}>
                                    <View style={{ width: 10, height: 10, backgroundColor: SecondLegendColor }} />
                                    {
                                        currentView.second.month != 12 ?
                                            <Text style={styles.dateText}>{MONTHS_NAMES[currentView.second.month]}</Text> :
                                            <></>
                                    }
                                    <Text style={styles.dateText}>{currentView.second.year}</Text>
                                </View>

                            </TouchableOpacity>

                        </View>
                        :
                        <View style={styles.chartViewChangeContainer}>
                            <View style={styles.chartViewChangeOptionsContainer}>
                                <View style={styles.mainDropDownContainer}>
                                    <View style={styles.dropDownContainer}>
                                        <DropDown
                                            width={"40%"}
                                            dropDownOptions={monthsOptionsFirst}
                                            handlePickDropDown={handlePickMonth}
                                            initOption={MONTHS_NAMES[futureChartView.first.month]}
                                            isMonths={true}
                                            handleExpendEvent={handleExpendEventUI}
                                            isCompare={1}
                                        />
                                        <DropDown
                                            width={"40%"}
                                            dropDownOptions={
                                                chartOptions.yearsOptions.map(i => {
                                                    return { label: i, value: i }
                                                })
                                            }
                                            handlePickDropDown={handlePickYear}
                                            initOption={futureChartView.first.year}
                                            isMonths={false}
                                            handleExpendEvent={handleExpendEventUI}
                                            isCompare={1}
                                        />
                                    </View>
                                    <Text style={styles.dateVSText}>VS</Text>
                                    <View style={styles.dropDownContainer}>
                                        <DropDown
                                            width={"40%"}
                                            dropDownOptions={monthsOptionsSecond}
                                            handlePickDropDown={handlePickMonth}
                                            initOption={MONTHS_NAMES[futureChartView.second.month]}
                                            isMonths={true}
                                            handleExpendEvent={handleExpendEventUI}
                                            isCompare={2}
                                        />
                                        <DropDown
                                            width={"40%"}
                                            dropDownOptions={
                                                chartOptions.yearsOptions.map(i => {
                                                    return { label: i, value: i }
                                                })
                                            }
                                            handlePickDropDown={handlePickYear}
                                            initOption={futureChartView.second.year}
                                            isMonths={false}
                                            handleExpendEvent={handleExpendEventUI}
                                            isCompare={2}
                                        />

                                    </View>
                                </View>

                            </View>
                            {
                                !isDropDownExpended ?
                                    <View style={styles.chartViewButtonsContainer}>
                                        <Button
                                            onPress={handleChangeChartsView}
                                            title="GO"
                                            buttonStyle={styles.chartViewButton}
                                        />
                                        <Button
                                            onPress={handeCloseChangeChartView}
                                            title="Cancel"
                                            buttonStyle={styles.chartViewButton}
                                        />
                                    </View>
                                    :
                                    <></>
                            }

                        </View>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        width: "100%",
    },
    chartContainer: {
        height: 300,
    },
    chartViewContainer: {
        width: "100%",
        backgroundColor: '#10375C',
        height: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignSelf: "flex-end",
    },
    chartViewChangeContainer: {
        width: "100%",
        backgroundColor: '#10375C',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10,
        justifyContent: "center"
    },
    text2: {
        color: "white"
    },
    selectedButtonStyle: {
        backgroundColor: '#10375C',
    },
    selectedTextStyle: {
        color: 'white',
    },
    dateTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateText: {
        color: "white",
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonGroupStyleShow: {
        height: 50,
        borderRadius: 20,
        zIndex: 1,
        margin: 0,
        padding: 0
    },
    buttonGroupStyleHide: {
        display: "none"
    },
    chartViewButtonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",

    },
    chartViewButton: {
        width: 100,
        padding: 5,
    },
    dropDownContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    buttonGroupContainer: {
        width: "100%",
    },
    chartViewContainerMain: {
        width: "100%",
        flex: 1,
        flexDirection: "row"
    },
    dateVSText: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
    },


});
export default CompareCharts;