import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { getUserInfo } from '../../common/api'
import { mainStatisticsFunction } from './statisticFunctions'
Amplify.configure(awsconfigsclient);
function MainStatisticsPage({ route, navigation }) {
    const [progressView, setProgressView] = useState(1);
    const [currentMonthStats, setCurrentMonthStats] = useState()
    const [userInfo, setUserInfo] = useState(route.params.userInfo.user)
    useEffect(() => {
        getUserInfo(route.params.userInfo).then(userInfoResult => {
            if (!('Expenses' in userInfoResult.user)) {
                navigation.navigate('HOMEPAGE', {
                    newUser: false,
                    userInfo: {
                        firstName: userInfoResult.user.firstName,
                        lastName: userInfoResult.user.lastName
                    }
                })
            } else {
                const result = mainStatisticsFunction(userInfoResult.user.Expenses, userInfoResult.user.Constaints)
                setCurrentMonthStats(result)
                setUserInfo(userInfoResult.user)

                
            }
        }).catch(err => console.log(err));

    }, [])
    if (currentMonthStats) {
        return (
            <View style={styles.container}>
                <Text style={styles.MSPageTitle}>Main Statistics Page</Text>
                <Text>{` ${currentMonthStats.monthName}`}</Text>
                <View style={styles.progressContainer}>
                <Text style={styles.daysText}>{`Day ${currentMonthStats.todaysDay} out of ${currentMonthStats.monthNumberOfDays}`}</Text>
                    {
                        progressView === 1 ?
                            <View>
                                <TouchableOpacity onPress={() => { setProgressView(2) }}>
                                    <AnimatedCircularProgress
                                        size={300}
                                        width={10}
                                        fill={currentMonthStats.expensesPercentageCalculation.value}
                                        tintColor={currentMonthStats.expensesPercentageCalculation.color}
                                        backgroundColor="#B0B4B4">
                                        {
                                            () => (
                                                <View>
                                                    <Text style={styles.numbersTextStyle}>
                                                        {`${currentMonthStats.expensesPercentageCalculation.value} %`}
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
                            <View >
                                <Text style={styles.numbersTextStyle}>Expenses Breakdown</Text>
                                <View style={styles.breakeDownContainer}>
                                    <TouchableOpacity onPress={() => { setProgressView(1) }}>
                                        <View style={styles.smallProgressContainer}>

                                            <Text style={styles.numbersTextStyle}>Water</Text>
                                            <AnimatedCircularProgress
                                                size={120}
                                                width={7}
                                                fill={currentMonthStats.WaterExpensesPercentageCalculation.value}
                                                tintColor={currentMonthStats.WaterExpensesPercentageCalculation.color}
                                                backgroundColor="#B0B4B4">
                                                {
                                                    () => (
                                                        <View>
                                                            <Text style={styles.numbersTextStyle}>
                                                                {`${currentMonthStats.WaterExpensesPercentageCalculation.value} %`}
                                                            </Text>
                                                            <Text style={styles.numbersTextStyle}>
                                                                {`${currentMonthStats.totalWaterExpenses} / ${userInfo.Constaints.waterBudget}`}
                                                            </Text>
                                                        </View>
                                                    )
                                                }
                                            </AnimatedCircularProgress>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setProgressView(1) }}>
                                        <View style={styles.smallProgressContainer}>
                                            <Text style={styles.numbersTextStyle}>Electricity</Text>
                                            <AnimatedCircularProgress
                                                size={120}
                                                width={7}
                                                fill={currentMonthStats.ElectricityExpensesPercentageCalculation.value}
                                                tintColor={currentMonthStats.ElectricityExpensesPercentageCalculation.color}
                                                backgroundColor="#B0B4B4">
                                                {
                                                    () => (
                                                        <View>
                                                            <Text style={styles.numbersTextStyle}>
                                                                {`${currentMonthStats.ElectricityExpensesPercentageCalculation.value} %`}
                                                            </Text>
                                                            <Text style={styles.numbersTextStyle}>
                                                                {`${currentMonthStats.totalElectricityExpenses} / ${userInfo.Constaints.electricityBudget}`}
                                                            </Text>
                                                        </View>
                                                    )
                                                }
                                            </AnimatedCircularProgress>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                    
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
                    currentMonthStats.todaysElectricityExpenses < 0 ?
                        <></>
                        :
                        <View style={styles.todaysNumbersTextContainer}>
                            <Text style={styles.numbersTextStyle}>Todays Water Expenses</Text>
                            <Text style={styles.numbersTextStyle}>{currentMonthStats.todaysElectricityExpenses}</Text>
                        </View>
                }
            </View>
        );
    } else return <></>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    progressContainer: {
       height:'57%', 
        display: 'flex',
        alignItems: 'center',
    },
    todaysNumbersTextContainer: {
        display: "flex",
        flexDirection: 'row',
       
        width:"60%", 
        justifyContent:"space-between", 
        marginTop:5
    },
    numbersTextStyle: {
        fontSize: 20, 
        textAlign:"center"
    },
    MSPageTitle: {
        fontSize: 24
    },
    breakeDownContainer: {
        display: "flex",
        flexDirection: 'row',
    }, 
    smallProgressContainer:{
        display: 'flex',
        alignItems: 'center', 
        margin:10
    }, 
    daysText:{
        marginTop:10
    }


});

export default MainStatisticsPage;