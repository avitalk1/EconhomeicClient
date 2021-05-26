import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet,Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {getUserByHouse} from '../common/api'
function PreSignUp({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
          const result = await getUserByHouse(data)
          if(result){
            navigation.navigate('SIGNUP', {
                houseID: data
            })
          }else{
              navigation.navigate('LANDING_PAGE')
          }
      }
      const handleBarCodeScannedSim = async () => {
        setScanned(true);
          const result = await getUserByHouse("1234")
          if(result){
            navigation.navigate('SIGNUP', {
                houseID: "1234"
            })
          }else{
              navigation.navigate('LANDING_PAGE')
          }
      }
      
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return (
       <View style={styles.container}>
         <Text>Pre Sign up Screen</Text>
         <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        <Button
         title="simulate qr code"
         onPress={handleBarCodeScannedSim}
        />
       </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
  });

export default PreSignUp