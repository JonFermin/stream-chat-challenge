
export async function signupMongo (userObject) {
    let response = await fetch( process.env.REACT_APP_MONGO_USER_ENDPOINT, { 
        method: 'post', 
        headers: new Headers({
            "x-api-key": process.env.MONGO_USER_API,
            "Content-Type": "application/json",
            "data" : userObject
        })
    });
    let data = await response.json();
    return data;
}

export async function loginMongo (userObject) {
    console.log(userObject)

    let response = await fetch( process.env.REACT_APP_MONGO_USER_ENDPOINT, { 
        method: 'get', 
        headers: new Headers({
            "x-api-key": process.env.MONGO_USER_API,
            "Content-Type": "application/json",
            "data" : userObject
        })
    });
    console.log(response)

    let data = await response.json();
    console.log(data)

    return data;
}