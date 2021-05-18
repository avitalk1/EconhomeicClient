import { StyleSheet, Dimensions } from 'react-native'

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
    MSPageTitle: {
        width: windowWidth,
        backgroundColor: "#E2DDDD",
        color: "#10375C",
        fontSize: 20,
        fontFamily: "Roboto-bold",
        textAlign: 'center',
    },
    breakeDownContainer: {
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
        fontSize: 32,
        textAlign: "center",
        color: "#10375C"
    },
    avatarImg: {
        margin: 20
    },
    MenuContainer:{
        marginTop : 20
    },
    MenuLines: {
        display: "flex",
        flexDirection: 'row',
        margin: 15,
    },
    MenuText: {
        fontSize: 20,
        marginLeft: 15,
        color: "#10375C",
    }
});

export { styles };