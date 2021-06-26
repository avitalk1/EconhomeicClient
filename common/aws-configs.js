const awsconfigsclient = {
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'eu-west-1:f51c71fa-4b03-4e58-ba93-c081249517bb',
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_zbsjelUsr', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '486vsdqe2cs1uq9cnp08tsh3cs',
    },
    API: {
        endpoints: [
            {
                name:"EconhomeicAPIS",
                emdpoint:"https://ltyxyvveeh.execute-api.eu-west-1.amazonaws.com/test"
            },
            {
                name: "LambdaSimpleProxy",
                endpoint: "https://cx1baatjsj.execute-api.eu-west-1.amazonaws.com/test"
            }
            
        ]
    }, 
    Analytics: {
        // OPTIONAL - disable Analytics if true
        disabled: true,
        // OPTIONAL - Allow recording session events. Default is true.
        autoSessionRecord: false,

        AWSPinpoint: {
            // OPTIONAL -  Amazon Pinpoint App Client ID
            appId: 'cab36577eb1a451ba20c3be009e32284',
            // OPTIONAL -  Amazon service region
            region: 'eu-west-1'
        }
    },
    PushNotification: {
        appId: 'cab36577eb1a451ba20c3be009e32284',
        requestIOSPermissions: false
    }

}

export default awsconfigsclient;
