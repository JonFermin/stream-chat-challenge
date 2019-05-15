export async function signupMongo (userObject) {
    var data = {
        email: userObject.email, 
        id: userObject.id,
        user: userObject.username,
        image: userObject.image,
    }

    let response = await fetch( process.env.REACT_APP_LAMBDA_ENDPOINT + "add-user", { 
        method: 'post', 
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(data)
    });
    let res = await response.json();
    console.log(res)
    return res;
}

export async function grabUserMongo (id) {
    let response = await fetch( process.env.REACT_APP_LAMBDA_ENDPOINT + "get-user/" + id, { 
        method: 'get', 
        headers: new Headers({
            "Content-Type": "application/json",
        })
    });
    let res = await response.json();
    console.log(res);
    return res;
}