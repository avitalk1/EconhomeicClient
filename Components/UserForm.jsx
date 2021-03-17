import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { registrUser } from '../common/api';
import { Input, Button } from 'react-native-elements';


function UserForm({ route, navigation }) {
  const [userFormStage, setUserFormStage] = useState(1)
  const [address, setAdress] = useState({
    state: "Israel",
    city: 'Yavne',
    street: 'Hartzit',
    streetNumber: 0,
    entrance: 0,
    apartment: 0
  })
  const [userInfo, setUserInfo] = useState({
    firstName: "Avital",
    lastName: "Kahani",
    email: route.params.email,
    PhoneNumber: "054-8073866",
  })
  //const houseID = route.params.houseID;  <= look at line 45
  const [constaints, setConstaints] = useState({
    numberOfHouseMembers: 5,
    electricityBudget: 500,
    waterBudget: 500
  })


  const handelInputChange = (field, value, flag) => {
    let temp;
    if (flag == 1) {
      temp = userInfo;
      temp[field] = value;
      setUserInfo(temp);
    }
    else if (flag == 2) {
      temp = address;
      temp[field] = value;
      setAdress(temp);
    }
    else {
      temp = constaints;
      temp[field] = value;
      setConstaints(temp);
    }
  }

  const handleSubmit = async () => {
    try {
      const  result = await registrUser({
        firstName: userInfo.first,
        lastName: userInfo.lastName,
        email: userInfo.email,
        PhoneNumber:userInfo.PhoneNumber ,
        AddressState: address.state,
        AddressCity: address.city,
        AddressStreet: address.street,
        AddressStreetNumber: address.streetNumber,
        AddressEntrance: address.entrance,
        AddressApartment: address.apartment,
        houseID: route.params.houseID,
        numberOfHouseMembers: constaints.numberOfHouseMembers,
        electricityBudget: constaints.electricityBudget,
        waterBudget: constaints.waterBudget
      });
      //   const { result } = await registrUser({
      //     firstName:userInfo.firstName,
      //     lastName:userInfo.lastName,
      //     email: userInfo.email,
      //     PhoneNumber:userInfo.PhoneNumber,
      //     Address:userInfo.Address,
      //     houseID:route.params.houseID,
      //     numberOfHouseMembers:constaints.numberOfHouseMembers,
      //     electricityBudget:constaints.electricityBudget,
      //     waterBudget:constaints.waterBudget
      // });
      console.log(result)
      if (result) {
        navigation.navigate('HOMEPAGE',{
          newUser:true,
          userInfo:{
            firstName: userInfo.firstName,
            lastName: userInfo.lastName
          }
        }
        )
      } else {
        console.log("opsiiii2")
        navigation.navigate('LANDING_PAGE')
      }
    } catch (err) {
      console.log(err)
      console.log("opsiiii3")
      navigation.navigate('LANDING_PAGE')
    }
  }


  return (
    <View style={styles.container}>
      <Text>User Form Page</Text>

      {
        (() => {
          switch (userFormStage) {
            case 1: return (
              <View>
                <Text>Contact Information</Text>
                <Input
                  placeholder="First Name"
                  onChangeText={value => handelInputChange('firstName', value, 1)}
                />
                <Input
                  placeholder="Last Name"
                  onChangeText={value => handelInputChange('lastName', value, 1)}
                />
                <Input
                  placeholder="Phon Number"
                  onChangeText={value => handelInputChange('PhoneNumber', value, 1)}
                />
                <Button onPress={() => setUserFormStage(2)}>Next : Address</Button>
              </View>
            );
            case 2: return (
              <View>
                <Text>Address</Text>
                <Input
                  placeholder="State"
                  onChangeText={value => handelInputChange('state', value, 2)}
                />
                <Input
                  placeholder="City"
                  onChangeText={value => handelInputChange('city', value, 2)}
                />
                <Input
                  placeholder="Street"
                  onChangeText={value => handelInputChange('street', value, 2)}
                />
                <Input
                  placeholder="Street Number"
                  onChangeText={value => handelInputChange('streetNumber', value, 2)}
                />
                <Input
                  placeholder="Entrance"
                  onChangeText={value => handelInputChange('entrance', value, 2)}
                />
                <Input
                  placeholder="Apartment"
                  onChangeText={value => handelInputChange('apartment', value, 2)}
                />
                <Button onPress={() => setUserFormStage(3)}>Next : Address</Button>
              </View>
            );
            case 3: return (
              <View>
                <Text>Constraints</Text>
                <Input
                  placeholder="Number Of House Members"
                  onChangeText={value => handelInputChange('numberOfHouseMembers', value, 3)}
                />
                <Input
                  placeholder="Electricity Budget"
                  onChangeText={value => handelInputChange('electricityBudget', value, 3)}
                />
                <Input
                  placeholder="Water Budget"
                  onChangeText={value => handelInputChange('waterBudget', value, 3)}
                />
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                />
              </View>
            )
            default: null;
          }
        })()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }

});

export default UserForm;