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
        try{
            const result = await API.post('LambdaSimpleProxy', '/presignupcheck',myInit);
            console.log("getUserByHouse results",result)
            return result 
        }catch(err){
            console.log("err",err)
            return false
        }
        
}
const registrUser = async (userObject) => { 
    console.log("registrUser before", userObject)
    const myInit = {
        body: userObject
    
}
        try{
            const result = await API.post('LambdaSimpleProxy', '/regiternewuser',myInit);
            console.log("registrUser results",result)
            return result 
        }catch(err){
            console.log("err",err)
            return false
        }
}

const testingLambda = async () => { 
    const result = await API.get('LambdaSimpleProxy', '/helloworld');
    console.log(result)
    return result;
}

export {
    getUserByHouse,
    registrUser, 
    testingLambda
}