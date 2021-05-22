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
    menuTitle: {
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
    avatarImg: {
        marginTop: 50,
        marginLeft: 20,
        display: "flex",
        flexDirection: 'row',
    },
    MenuContainer: {
        marginTop: 30,
        width: '90%',
        marginLeft: '5%'
    },
    MenuLines: {
        display: "flex",
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    generalText: {
        fontSize: 20,
        textAlign: "center",
        color: "#10375C",
        marginTop: 10
    },
    MenuName: {
        fontSize: 20,
        marginTop: 20,
        marginLeft: 10,
        color: "#10375C",
        fontFamily: "Roboto-Medium",
    },
    MenuBox: {
        backgroundColor: "white",
        borderRadius: 10,
        width: windowWidth / 2.5,
        height: windowHeight / 8,
        shadowColor: "#0a0a0a",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 10,
        shadowRadius: 70
    },
    MenuIcon: {
        fontSize: 30,
        marginLeft: 15,
        marginTop: 10
    },
    switchLine: {
        width: windowWidth * 0.8,
        display: "flex",
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: windowWidth * 0.1,
        justifyContent: "space-between",
    },
    switchBtn: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    },
    switchTxt: {
        fontSize: 24,
        fontFamily: "Roboto-Light",
        color: "#10375C",
    },
    InputConstrains: {
        width: "80%",
        marginBottom: 10
    },
    notificationContainer: {
        margin: 5,
        paddingBottom: 5
    },
    notificationItemTitle: {
        fontWeight: 'bold'
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
        width: '80%',
        marginLeft: '10%',
        marginTop: 20
    },
    constrainsInfo: {
        textAlign: 'right',
        fontSize: 20,
        marginTop: 10
    },
    loadingPage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'stretch'
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
    }
}

export { styles, headerStyle };