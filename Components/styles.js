import { StyleSheet, Dimensions } from 'react-native'

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
        borderRightWidth: windowWidth / 2,
        borderTopWidth: windowHeight / 3,
        borderRightColor: "transparent",
        borderTopColor: "#10375C",
    },
    triangleCornerTopRight: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: windowWidth / 2,
        borderTopWidth: windowHeight / 3,
        borderLeftColor: "transparent",
        borderTopColor: "#10375C"
    },
    welcomeText: {
        fontSize: 32,
        marginBottom: 50,
        color: "#10375C"
    },
    OrText: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20
    },
    buttonContainer: {
        width: "50%"
    },
    button: {
        backgroundColor: "#10375C"
    },
    InputContainer: {
        width: "80%",
        marginBottom: 50
    },
    topContainer: {
        backgroundColor: "#10375C",
        height: windowHeight/10,
    },
    menuIconContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
        // width: 50,
        // height: 50,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    menuIcon: {
        marginLeft: 20,
        marginTop:10,
        fontSize: 30,
        fontWeight: "bold",
        color:"white",
    },
    menuTitle:{
        fontSize: 20,
        color:"white",
        marginLeft: 100,
        marginTop: 20,
        fontFamily: "BeatifulPeople",
    },
    progressContainer: {
        height:'57%', 
         display: 'flex',
         alignItems: 'center',
     },
     todaysNumbersTextContainer: {
         display: "flex",
         flexDirection: 'row',
         width:"60%", 
         justifyContent:"space-between", 
         marginTop:5
     },
     numbersTextStyle: {
         fontSize: 20, 
         textAlign:"center"
     },
     MSPageTitle: {
         fontSize: 24,
         fontFamily: "Roboto-bold",
     },
     breakeDownContainer: {
         display: "flex",
         flexDirection: 'row',
     }, 
     smallProgressContainer:{
         display: 'flex',
         alignItems: 'center', 
         margin:10
     }, 
     daysText:{
         marginTop:10
     },
     navContainer:{
         backgroundColor:"blue"
     }
});

export { styles };