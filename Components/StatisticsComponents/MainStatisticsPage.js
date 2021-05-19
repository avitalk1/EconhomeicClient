import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Amplify, { Analytics, Auth } from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs';
import { styles } from '../styles';
import { mainStatisticsFunction } from './statisticFunctions';
import { fetchUserData } from '../../Redux/actions/UserDataActions/action';

Amplify.configure(awsconfigsclient);

function MainStatisticsPage(props) {
    const [progressView, setProgressView] = useState(1);
    const [currentMonthStats, setCurrentMonthStats] = useState(null)
    useEffect(() => {
        if (props.userInfo.data != null) {
            if ('Expenses' in props.userInfo.data) {
                let result = mainStatisticsFunction(props.userInfo.data.Expenses, props.userInfo.data.Constraints)
                setCurrentMonthStats(result)
            } else {
                console.log("no expenses ")
            }
        }
    }, [props.userInfo.loading])

    if (currentMonthStats) {
        return (
            <View style={styles.container}>
                <View>
                    {
                        progressView === 1 ?
                            <View style={styles.progressContainer}>
                                <TouchableOpacity onPress={() => { setProgressView(2) }}>
                                    <AnimatedCircularProgress
                                        size={250}
                                        width={15}
                                        fill={currentMonthStats.expensesPercentageCalculation.value}
                                        tintColor="#00ff00"
                                        width={10}
                                        tintColorSecondary="#ff0000"
                                        backgroundColor="#3d5875"
                                        arcSweepAngle={240}
                                        rotation={240}
                                        lineCap="round"
                                    >
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
                            <View style={styles.progressContainer} >
                                <Text style={styles.numbersTextStyle}>Expenses Breakdown</Text>
                                <View style={styles.breakeDownContainer}>
                                    <TouchableOpacity onPress={() => { setProgressView(1) }}>
                                        <View style={styles.smallProgressContainer}>
                                            <Text style={styles.numbersTextStyle}>Water</Text>
                                            <AnimatedCircularProgress
                                                size={150}
                                                width={7.5}
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
                                                                {`${currentMonthStats.totalWaterExpenses} / ${props.userInfo.data.Constraints.waterBudget}`}
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
                                                size={150}
                                                width={7.5}
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
                                                                {`${currentMonthStats.totalElectricityExpenses} / ${props.userInfo.data.Constraints.electricityBudget}`}
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
                    <Text style={styles.daysText}>{`${currentMonthStats.monthNumberOfDays - currentMonthStats.todaysDay} Days left`}</Text>
                    <View style={styles.dailyInfo}>
                        <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>{` ${currentMonthStats.monthName}`}</Text>
                        <View style={styles.breakeDownContainer}>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle} >Overall</Text>
                                <Text style={styles.squareNumbers}>{`${currentMonthStats.totalExpenses}`}</Text>
                            </View>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle}>Electricity</Text>
                                <Text style={styles.squareNumbers} >{`${currentMonthStats.totalElectricityExpenses}`}</Text>
                            </View>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle}>Water</Text>
                                <Text style={styles.squareNumbers}>{`${currentMonthStats.totalWaterExpenses}`}</Text>
                            </View>
                        </View>
                    </View>
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

const mapStateToProps = (store) => ({
    userInfo: store.userData,
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserDataFunc: (email) => dispatch(fetchUserData(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainStatisticsPage);