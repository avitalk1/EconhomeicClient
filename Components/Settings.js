import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { UpdateUserSettings } from '../common/api';
import { Input, Button } from 'react-native-elements';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
import { userDataUpdate } from '../Redux/actions/UserDataActions/action';
Amplify.configure(awsconfigsclient);
function Settings(props) {

    const [constaints, setConstaints] = useState({
        numberOfHouseMembers: 5,
        electricityBudget: 500,
        waterBudget: 500
    })
    const handelInputChange = (field, value) => {
        constaints[field] = value;
        setConstaints(constaints);
    }
    const handleSubmit = async () => {
        try {
            const result = await UpdateUserSettings({
                numberOfHouseMembers: constaints.numberOfHouseMembers,
                electricityBudget: constaints.electricityBudget,
                waterBudget: constaints.waterBudget,
                UserID: props.userInfo.data.UserID
            })
            return result;
        } catch (err) {
            console.log(err)
            console.log("check chen ")
        }
    }
    return (
        <View>
            <Text>Constraints</Text>
            <Input
                placeholder="Number Of House Members"
                onChangeText={value => handelInputChange('numberOfHouseMembers', value)}
            />
            <Input
                placeholder="Electricity Budget"
                onChangeText={value => handelInputChange('electricityBudget', value)}
            />
            <Input
                placeholder="Water Budget"
                onChangeText={value => handelInputChange('waterBudget', value)}
            />
            <Button
                title="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    }

});


const mapStateToProps = (store) => ({
    userInfo: store.userData,
});

const mapDispatchToProps = (dispatch)=> ({
   updateUserDataFunc:(data)=> dispatch(userDataUpdate(data))
  })
export default connect(mapDispatchToProps,mapStateToProps)(Settings);