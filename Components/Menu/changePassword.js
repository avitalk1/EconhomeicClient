import React, { useState } from 'react';
import { View, Text ,TextInput} from 'react-native';
import { connect } from 'react-redux'
import { UpdateUserSettings } from '../../common/api';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';


Amplify.configure(awsconfigsclient);

function ChangePassword(props) {

    const [constaints, setConstaints] = useState({

    })

    const handleEdit = () => {
        setedit(!edit)
    }
    const handelInputChange = (field, value) => {
        let tempConstarints = constaints
        tempConstarints[field] = value
        setConstaints(tempConstarints);
    }
    const handleSubmit = async () => {
        try {
            await UpdateUserSettings({
                numberOfHouseMembers: constaints.numberOfHouseMembers,
                electricityBudget: constaints.electricityBudget,
                waterBudget: constaints.waterBudget,
                UserID: props.userInfo.data.UserID
            })
            props.updateUserDataFunc({
                numberOfHouseMembers: constaints.numberOfHouseMembers,
                electricityBudget: constaints.electricityBudget,
                waterBudget: constaints.waterBudget,
                UserID: props.userInfo.data.UserID
            })
            handleEdit();
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View>
            <Text>Change Password page</Text>
        </View>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData
});

const mapDispatchToProps = (dispatch) => ({
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);