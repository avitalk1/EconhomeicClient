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
    }
}

export default awsconfigsclient;
