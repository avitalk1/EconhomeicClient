import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { UpdateUserSettings } from '../../common/api';
import { Input, Button } from 'react-native-elements';
import { styles } from '../styles';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate } from '../../Redux/actions/UserDataActions/action';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

Amplify.configure(awsconfigsclient);

function Constraints(props) {
    console.log(props.userInfo.data.UserConstraints)

    const [constaints, setConstaints] = useState({
        numberOfHouseMembers: props.userInfo.data.UserConstraints.numberOfHouseMembers,
        electricityBudget: props.userInfo.data.UserConstraints.electricityBudget,
        waterBudget: props.userInfo.data.UserConstraints.waterBudget
    })

    const [edit, setedit] = useState(false)
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
            <TouchableOpacity onPress={handleEdit} style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 10 }}>
                {
                    edit ?
                        <MaterialIcons name="cancel" size={30} color="#e01a00" />
                        :
                        <AntDesign name="edit" size={30} color="#1ca340" />
                }
            </TouchableOpacity>
            {
                edit ?
                    <View >
                        <View style={styles.MenuLine} >
                            <Text style={styles.generalText}>Number Of House Members :</Text>
                            <Input
                                placeholder={`${constaints.numberOfHouseMembers}`}
                                onChangeText={value => handelInputChange('numberOfHouseMembers', value)}
                            />
                        </View>
                        <View style={styles.MenuLine} >
                            <Text style={styles.generalText}>Electricity Budget : </Text>
                            <Input
                                placeholder={`${constaints.electricityBudget}`}
                                onChangeText={value => handelInputChange('electricityBudget', value)}
                            />
                        </View>
                        <View style={styles.MenuLine} >
                            <Text style={styles.generalText}>Water Budget :</Text>
                            <Input
                                placeholder={`${constaints.waterBudget}`}
                                onChangeText={value => handelInputChange('waterBudget', value)}
                            />
                        </View>
                        <View style={styles.container}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    buttonStyle={styles.button}
                                    title="Submit"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.constrainsContainer}>
                        <View style={styles.boxContainer}>
                            <View style={styles.MenuLine} >
                                <Text style={styles.generalText}>Number Of House Members </Text>
                                <Text style={styles.constrainsInfo} r>{`${constaints.numberOfHouseMembers}`}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.MenuLine} >
                                <Text style={styles.generalText}>Electricity Budget </Text>
                                <Text style={styles.constrainsInfo}>{`${constaints.electricityBudget}`}₪</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={styles.MenuLine} >
                                <Text style={styles.generalText}>Water Budget</Text>
                                <Text style={styles.constrainsInfo}>{`${constaints.waterBudget}`}₪</Text>
                            </View>
                        </View>
                    </View>
            }
        </View>
    );
}


const mapStateToProps = (store) => ({
    userInfo: store.userData
});

const mapDispatchToProps = (dispatch) => ({
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Constraints);