import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
Amplify.configure(awsconfigsclient);
const getUserByHouse = async (houseID) => {
    console.log("house id", houseID)
    const myInit = {
        body: {
            houseID: houseID
        }, // replace this with attributes you need
    };
    try {
        const result = await API.post('LambdaSimpleProxy', '/presignupcheck', myInit);
        console.log("getUserByHouse results", result)
        return result
    } catch (err) {
        console.log("err", err)
        return false
    }

}
const registrUser = async (userObject) => {

    const myInit = {
        body: userObject
    }
    try {
        const result = await API.post('LambdaSimpleProxy', '/regiternewuser', myInit);
        return result
    } catch (err) {
        console.log("err", err)
        return false
    }
}
const getUserInfo = async (email) => {
    const myInit = {
        body:{
            userEmail: email
        }
    }
    try{
        const result = await API.post('LambdaSimpleProxy', '/getuserbyemail', myInit)
        return result 
    }catch(err){
        return err;
    }
    
}
export {
    getUserByHouse,
    registrUser,
    getUserInfo,
}