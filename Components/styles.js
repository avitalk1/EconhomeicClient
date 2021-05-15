import {StyleSheet ,Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        height: "100%",
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: windowWidth/2,
        borderTopWidth: windowHeight/3,
        borderRightColor: "transparent",
        borderTopColor: "#10375C",
    },
    triangleCornerTopRight: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: windowWidth/2,
        borderTopWidth: windowHeight/3,
        borderLeftColor:"transparent",
        borderTopColor: "#10375C"
    },
    welcomeText: {
        fontSize: 32,
        marginBottom: 50,
        color:"#10375C"
    },
    OrText: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20
    },
    buttonContainer: {
        width: "50%"
    },
    button:{
        backgroundColor:"#10375C"
    },
    InputContainer:{
        width:"80%",
        marginBottom:50
    }
});

export {styles};