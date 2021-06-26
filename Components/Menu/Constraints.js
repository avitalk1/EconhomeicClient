import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView ,TextInput} from 'react-native';
import { connect } from 'react-redux'
import { UpdateUserSettings } from '../../common/api';
import { Button } from 'react-native-elements';
import { styles } from '../styles';
import { userDataUpdate, userDataUpdateConstraints} from '../../Redux/actions/UserDataActions/action';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

function Constraints(props) {
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
            props.userDataUpdateConstraintsFunc({
                numberOfHouseMembers:parseInt(constaints.numberOfHouseMembers),
                electricityBudget: parseInt(constaints.electricityBudget),
                waterBudget: parseInt(constaints.waterBudget)
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
                    <SafeAreaView style={styles.constrainsContainer}>
                        <View style={styles.updateConstrains}>
                            <Text style={styles.ConstrainsText}>Number Of House Members :</Text>
                            <TextInput
                                style={styles.InputConstrains}
                                onChangeText={value => handelInputChange('numberOfHouseMembers', value)}
                                placeholder={`${constaints.numberOfHouseMembers}`}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.updateConstrains} >
                            <Text style={styles.ConstrainsText}>Electricity Budget : </Text>
                            <TextInput
                                style={styles.InputConstrains}
                                onChangeText={value => handelInputChange('electricityBudget', value)}
                                placeholder={`${constaints.electricityBudget}`}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.updateConstrains} >
                            <Text style={styles.ConstrainsText}>Water Budget :</Text>
                            <TextInput
                                style={styles.InputConstrains}
                                onChangeText={value => handelInputChange('waterBudget', value)}
                                placeholder={`${constaints.waterBudget}`}
                                keyboardType="numeric"
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
                    </SafeAreaView>
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
    updateUserDataFunc: (data) => dispatch(userDataUpdate(data)),
    userDataUpdateConstraintsFunc: (data) => dispatch(userDataUpdateConstraints(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Constraints);