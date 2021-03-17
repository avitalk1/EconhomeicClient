import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { mainStatisticsFunction } from './statisticFunctions'
Amplify.configure(awsconfigsclient);
function MainStatisticsPage({ route, navigation }) {
    const [progressView, setProgressView] = useState(1);
    const [currentMonthStats, setCurrentMonthStats] = useState()
    const [userInfo, setUserInfo] = useState(route.params.userInfo.user)
    useEffect(() => {
        const result = mainStatisticsFunction(userInfo.Expenses, userInfo.Constaints)
        setCurrentMonthStats(result)

    }, [])
    if (currentMonthStats) {
        return (
            <View style={styles.container}>
                <Text>Main Statistics Page</Text>
                <Text>{`${currentMonthStats.todaysDay}, ${currentMonthStats.monthName} ${currentMonthStats.currentYear}`}</Text>
                <View style={styles.progressContainer}>
                    {
                        progressView === 1 ?
                            <View>
                                <TouchableOpacity onPress={() => { setProgressView(2) }}>
                                    <AnimatedCircularProgress
                                        size={300}
                                        width={3}
                                        fill={currentMonthStats.expensesPercentageCalculation}
                                        tintColor="#00e0ff"
                                        backgroundColor="#3d5875">
                                        {
                                            () => (
                                                <View>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.expensesPercentageCalculation} %`}
                                                    </Text>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.totalExpenses} / ${currentMonthStats.totalBudget}`}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </TouchableOpacity>
                                
                            </View>
                            :
                            <View>
                                <Text style={styles.numbersTextStyle}>Expenses Breakdown</Text>
                                <TouchableOpacity onPress={() => { setProgressView(1) }}>
                                    <Text style={styles.numbersTextStyle}>Water</Text>
                                    <AnimatedCircularProgress
                                        size={100}
                                        width={3}
                                        fill={currentMonthStats.WaterExpensesPercentageCalculation}
                                        tintColor="#00e0ff"
                                        backgroundColor="#3d5875">
                                        {
                                            () => (
                                                <View>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.WaterExpensesPercentageCalculation} %`}
                                                    </Text>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.totalWaterExpenses} / ${userInfo.Constaints.waterBudget}`}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                    <Text style={styles.numbersTextStyle}>Electricity</Text>
                                    <AnimatedCircularProgress
                                        size={100}
                                        width={3}
                                        fill={currentMonthStats.ElectricityExpensesPercentageCalculation}
                                        tintColor="#00e0ff"
                                        backgroundColor="#3d5875">
                                        {
                                            () => (
                                                <View>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.ElectricityExpensesPercentageCalculation} %`}
                                                    </Text>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.totalElectricityExpenses} / ${userInfo.Constaints.electricityBudget}`}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </TouchableOpacity>

                            </View>
                    }
                    <Text>{`Day ${currentMonthStats.todaysDay} out of ${currentMonthStats.monthNumberOfDays}`}</Text>
                </View>

                {
                    currentMonthStats.todaysTotalExpenses < 0 ?
                        <></>
                        :
                        <View style={styles.todaysNumbersTextContainer}>
                            <Text style={styles.numbersTextStyle}>Todays Total Expenses</Text>
                            <Text style={styles.numbersTextStyle}>{currentMonthStats.todaysTotalExpenses}</Text>
                        </View>
                }
                {
                    currentMonthStats.todaysWaterExpenses < 0 ?
                        <></>
                        :
                        <View style={styles.todaysNumbersTextContainer}>
                            <Text style={styles.numbersTextStyle}>Todays Water Expenses</Text>
                            <Text style={styles.numbersTextStyle}>{currentMonthStats.todaysWaterExpenses}</Text>
                        </View>
                }
                {
                    currentMonthStats.todaysWaterExpenses < 0 ?
                        <></>
                        :
                        <View style={styles.todaysNumbersTextContainer}>
                            <Text style={styles.numbersTextStyle}>Todays Water Expenses</Text>
                            <Text style={styles.numbersTextStyle}>{currentMonthStats.todaysWaterExpenses}</Text>
                        </View>
                }

            </View>
        );
    } else return <></>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100, 
        display:'flex', 
        alignItems:'center', 
        height:'100%'
    }, 
    progressContainer:{
        height:'40%', 
        display:'flex', 
        alignItems:'center', 
    }, 
    todaysNumbersTextContainer:{
        display:"flex", 
        flexDirection:'row', 
    }, 
    numbersTextStyle:{
        fontSize:16
    }


});

export default MainStatisticsPage;