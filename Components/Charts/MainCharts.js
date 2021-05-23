import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements'
import { mainChartFunction, getOptions, MONTHS_NAMES, getInitCurrentView } from '../../common/chartsFunctions'
import DailyChart from './DailyChart'
import MonthlyChart from './MonthlyChart'
import DropDown from '../DropDown'
const BREAKDOWN_VIEW_TYPE_OPTIONS = ["total", "water", "electricity"]
function MainCharts(props) {
    const [data, setData] = useState(mainChartFunction({ type: "init" }))
    const [breakdownViewType, setBreakdownViewType] = useState("total")
    const [breakdownViewTypeIndex, setBreakdownViewTypeIndex] = useState(0)
    const [chartType, setChartType] = useState("daily")
    const [chartOptions, setChartOptions] = useState(getOptions())
    const [changeChartView, setChangeChartView] = useState(false)
    const [currentView, setCurrentView] = useState(getInitCurrentView())
    const [isDropDownExpended, setIsDropDownExpended] = useState(false)
    const [monthsOptions, setMonthsOptions] = useState(
        chartOptions.optionsResult[currentView.year].map(i => {
            return { label: MONTHS_NAMES[i], value: i }
        })
    )
    const [futureChartView, setFutureChartView] = useState(getInitCurrentView())
    const handleUpdateBreakdownViewType = (index) => {
        setBreakdownViewType(BREAKDOWN_VIEW_TYPE_OPTIONS[index])
        setBreakdownViewTypeIndex(index)
    }
    const handeOpenChangeChartView = () => {
        setChangeChartView(true)
    }
    const handleChangeChartsView = () => {
        let _type = futureChartView.month == 12 ? "monthly" : "daily"
        setChartType(_type)
        setCurrentView(JSON.parse(JSON.stringify(futureChartView)))
        setData(mainChartFunction({ type: _type, year: futureChartView.year, month: futureChartView.month }))
        setChangeChartView(false)
    }
    const handeCloseChangeChartView = () => {
        setFutureChartView(JSON.parse(JSON.stringify(currentView)))
        setChangeChartView(false)
    }
    const handlePickMonth = (value) => {
        let tempFuture = futureChartView;
        tempFuture.month = value;
        setFutureChartView(tempFuture)
    }
    const handlePickYear = (value) => {
        let tempFuture = futureChartView;
        tempFuture.year = value;
        tempFuture.month = chartOptions.optionsResult[value][0]
        setMonthsOptions(chartOptions.optionsResult[value].map(i => {
            return { label: MONTHS_NAMES[i], value: i }
        }))
        setFutureChartView(tempFuture)
    }
    const handleExpendEventUI = (value) => {
        setIsDropDownExpended(value)
    }

    return (

        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {
                    chartType == "daily" ?
                        <DailyChart data={data.data} viewType={breakdownViewType} maxValue={data.maxValues[breakdownViewType]} ticks={data.ticks} />
                        :
                        <MonthlyChart data={data.data} viewType={breakdownViewType} ticks={data.ticks} />
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
                                    {
                                        currentView.month != 12 ?
                                            <Text style={styles.dateText}>{MONTHS_NAMES[currentView.month]}</Text> :
                                            <></>
                                    }
                                    <Text style={styles.dateText}>{currentView.year}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.chartViewChangeContainer}>
                            <View style={styles.chartViewChangeOptionsContainer}>
                                <View style={styles.dropDownContainer}>
                                    <DropDown
                                        width={"40%"}
                                        dropDownOptions={monthsOptions}
                                        handlePickDropDown={handlePickMonth}
                                        initOption={MONTHS_NAMES[futureChartView.month]}
                                        isMonths={true}
                                        handleExpendEvent={handleExpendEventUI}
                                        isCompare={false}

                                    />
                                    <DropDown
                                        width={"40%"}
                                        dropDownOptions={
                                            chartOptions.yearsOptions.map(i => {
                                                return { label: i, value: i }
                                            })
                                        }
                                        handlePickDropDown={handlePickYear}
                                        initOption={futureChartView.year}
                                        isMonths={false}
                                        handleExpendEvent={handleExpendEventUI}
                                        isCompare={false}
                                    />
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
        flex: 1,
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
        height: 150,
        alignItems: "center"
    },
    buttonGroupContainer: {
        width: "100%",
    },
    chartViewContainerMain: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
    }

});
export default MainCharts;