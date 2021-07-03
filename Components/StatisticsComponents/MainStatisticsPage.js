import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from '../styles';
import { getMainStatistics } from './statisticFunctions';
import { fetchUserData } from '../../Redux/actions/UserDataActions/action';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

function MainStatisticsPage(props) {
    const [progressView, setProgressView] = useState(1);
    const [currentMonthStats, setCurrentMonthStats] = useState(null)
    useEffect(() => {
        if (props.userInfo.data != null) {
            if ('Expenses' in props.userInfo.data) {
                let result = getMainStatistics(props.userInfo.data.Expenses, props.userInfo.data.UserConstraints)
                setCurrentMonthStats(result)
            } else {
                console.log("no expenses ")
            }
        }
    }, [props.userInfo])
    const handleRefreshData = () => {
        if( props.userInfo.data != null){
            props.fetchUserDataFunc(props.userInfo.data.userDetails.email)
        }
        
    }
    if (currentMonthStats) {
        return (
            <View style={styles.container}>
                <View style={styles.mainStatisticsDateContainer}>
                    <Text style={styles.mainStatisticsDateText}> {`${currentMonthStats.monthName} ${currentMonthStats.currentYear}`}</Text>
                </View>
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
                                                        {`${currentMonthStats.totalExpenses} ₪/ ${currentMonthStats.totalBudget}₪`}
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
                                <View style={styles.rowContainer}>
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
                                                                {`${currentMonthStats.totalWaterExpenses} ₪/ ${props.userInfo.data.UserConstraints.waterBudget}₪`}
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
                                                                {`${currentMonthStats.totalElectricityExpenses} ₪/ ${props.userInfo.data.UserConstraints.electricityBudget}₪`}
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
                        <View style={styles.dailyInfoRefreshContainer}>
                            <Text style={{ color: "white", textAlign: "center" }}>{` ${currentMonthStats.currentTimeStamp}`}</Text>
                            <Button
                            onPress={handleRefreshData}
                                icon={
                                    <Ionicons name="refresh" size={16} color="white" />
                                }
                                type="clear"
                                width={100}
                                style={{margin:0, padding:0 }}
                            />
                            
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle} >Overall</Text>
                                <Text style={styles.squareNumbers}>{currentMonthStats.todaysTotalExpenses < 1 ? 0 : currentMonthStats.todaysTotalExpenses}₪</Text>
                            </View>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle}>Electricity</Text>
                                <Text style={styles.squareNumbers} >{currentMonthStats.todaysElectricityExpenses < 1 ? 0 : currentMonthStats.todaysElectricityExpenses}₪</Text>
                            </View>
                            <View style={styles.squareInfo}>
                                <Text style={styles.squareTitle}>Water</Text>
                                <Text style={styles.squareNumbers}>{currentMonthStats.todaysWaterExpenses < 1 ? 0 : currentMonthStats.todaysWaterExpenses}₪</Text>
                            </View>
                        </View>
                    </View>
                </View>
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