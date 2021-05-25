import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { UpdateUserSettings } from '../../common/api';
import { Input, Button } from 'react-native-elements';
import { styles } from '../styles';
import Amplify from 'aws-amplify';
import awsconfigsclient from '../../common/aws-configs'
import { userDataUpdate, userDataUpdateConstraints} from '../../Redux/actions/UserDataActions/action';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

Amplify.configure(awsconfigsclient);

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
            const result = await UpdateUserSettings({
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
            setedit(!edit)

            return result;
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
                    <View style={styles.container}>
                        <Input
                            placeholder={`${constaints.numberOfHouseMembers}`}
                            onChangeText={value => handelInputChange('numberOfHouseMembers', value)}
                        />
                        <Input
                            placeholder={`${constaints.electricityBudget}`}
                            onChangeText={value => handelInputChange('electricityBudget', value)}
                        />
                        <Input
                            placeholder={`${constaints.waterBudget}`}
                            onChangeText={value => handelInputChange('waterBudget', value)}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                buttonStyle={styles.button}
                                title="Submit"
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                    :
                    <View style={styles.constrainsContainer}>
                        <View style={styles.MenuLines}>
                            <Text style={styles.generalText}>Number Of House Members :</Text>
                            <Text style={styles.constrainsInfo}r>{`${constaints.numberOfHouseMembers}`}</Text>
                        </View>
                        <View style={styles.MenuLines}>
                            <Text style={styles.generalText}>Electricity Budget :</Text>
                            <Text style={styles.constrainsInfo}>{`${constaints.electricityBudget}`}₪</Text>
                        </View>
                        <View style={styles.MenuLines}>
                            <Text style={styles.generalText}>Water Budget:</Text>
                            <Text style={styles.constrainsInfo}>{`${constaints.waterBudget}`}₪</Text>
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