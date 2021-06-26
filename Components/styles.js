import { StyleSheet, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
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
        height: windowHeight / 10,
    },
    topTitle: {
        marginTop: 20,
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontFamily: "BeatifulPeople",
    },
    progressContainer: {
        height: windowHeight / 3,
        display: 'flex',
        alignItems: 'center',
        marginTop: 30
    },
    dailyInfo: {
        width: windowWidth,
        backgroundColor: "#10375C",
        height: windowHeight / 4
    },
    todaysNumbersTextContainer: {
        display: "flex",
        flexDirection: 'row',
        width: "60%",
        justifyContent: "space-between",
        marginTop: 5
    },
    numbersTextStyle: {
        fontSize: 20,
        textAlign: "center"
    },
    PageTitle: {
        width: windowWidth,
        backgroundColor: "#E2DDDD",
        color: "#10375C",
        fontSize: 20,
        fontFamily: "Roboto-bold",
        textAlign: 'center',
    },
    rowContainer: {
        display: "flex",
        flexDirection: 'row',
    },
    smallProgressContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: 15
    },
    daysText: {
        color: "#10375C",
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },
    squareInfo: {
        height: 110,
        width: 100,
        backgroundColor: "white",
        borderRadius: 20,
        margin: 15
    },
    squareTitle: {
        fontSize: 16,
        margin: 10,
        textAlign: "center",
        color: "#10375C"
    },
    squareNumbers: {
        fontSize: 30,
        textAlign: "center",
        color: "#10375C"
    },
    boxContainer: {
        backgroundColor: "white",
        width: windowWidth,
    },
    MenuTitels: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 5
    },
    MenuLines: {
        display: "flex",
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    MenuLine: {
        display: "flex",
        flexDirection: 'row',
        width: "90%",
        marginLeft: "5%",
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: windowHeight * 0.05
    },
    ConstrainsText:{
        fontSize: 18,
        color: "#10375C",
    },
    profileLine:{
        marginLeft : 15
    },
    generalText: {
        fontSize: 18,
        textAlign: "center",
        color: "#10375C",
        marginLeft: 10
    },
    MenuName: {
        fontSize: 20,
        marginTop: 20,
        marginLeft: 10,
        color: "#10375C",
        fontFamily: "Roboto-Medium",
    },
    arrowIcon: {
        fontSize: 24,
        opacity: 0.5,
        color: "#abaaa7",
        borderRadius: 5
    },
    switchBtn: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    InputConstrains: {
        height: 40,
        borderWidth: 0.3,
        borderRadius:5,
        width: "80%"
    },
    notificationContainer: {
        margin: 5,
        paddingBottom: 5
    },
    notificationItemTitle: {
        fontWeight: 'bold'
    },
    messageDate:{
        marginTop: 10,
        marginBottom:10,
        textAlign: 'right',
    },
    messageTitle:{
        fontSize:18,
        marginBottom:10,
        marginLeft:10,
        fontWeight : 'bold',
        color: "#10375C"
    },
    messageBody:{
        marginTop:10,
        width:'90%',
        marginLeft:'5%'
    },
    messageBodyTxt:{
        fontSize:15,
        margin:15
    },
    messageBtnContainer: {
        width: "70%",
        marginLeft:'15%'
    },
    messageBtn:{
        margin:10,
    },
    titleNotificationContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    notificationItemDate: {
        fontSize: 12
    },
    constrainsContainer: {
        marginTop: 20
    },
    updateConstrains: {
        marginBottom:20,
        marginLeft:"15%"
    },
    constrainsInfo: {
        fontSize: 18
    },
    loadingPage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'stretch'
    },
    ModalPickerContainer:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    Modal:{
        backgroundColor:'white',
        borderRadius:10,
        borderWidth:0.3
    },
    optionText:{
        margin:20,
        fontSize:18,
        fontWeight:'bold'
    },
    modalOption:{
        alignItems:'flex-start'
    }, 
    ModalPickerContiner:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(0,0,0,0.3)"
    }
});

const headerStyle = {
    headerTintColor: '#10375C',
    headerStyle: {
        backgroundColor: "#E2DDDD",
        height: 30
    },
    headerTitleStyle: {
        textAlign: 'center',
        fontSize: 20,
        flex: 4,
    }, 
    headerTitleAlign:"center"
}


export { styles, headerStyle };