export async function signupMongo (userObject) {
    console.log(userObject);
    
    let response = await fetch( process.env.REACT_APP_LAMBDA_ENDPOINT + "add-user", { 
        method: 'post', 
        headers: new Headers({
            "Content-Type": "application/json",
            "data" : {
                id: userObject.uid,
                name: userObject.name,
                image: userObject.image,
            }
        })
    });
    let data = await response.json();
    return data;
}

export async function grabUserMongo (id) {
    console.log(id);
    let response = await fetch( process.env.REACT_APP_LAMBDA_ENDPOINT + "get-user/" + JSON.stringify(id), { 
        method: 'get', 
        headers: new Headers({
            "Content-Type": "application/json",
        })
    });
    let data = await response.json();
    console.log(data);
    return data;
}