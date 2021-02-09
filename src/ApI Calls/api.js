import {API} from "../Core/Backend"

// ADD POST
export const addPost = (post) =>{
    return fetch(`${API}/blogAdd`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getPost = () =>{
    // console.log(`API is hello ${API}`)
    return fetch(`${API}/blogGetAll`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const signup = (user) => {
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response => {    
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
} 


export const signin = (user) => {
    console.log(JSON.stringify(user))
    return fetch(`${API}/signin`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response => {    
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
} 


export const authenticate = (data, next) =>{
    if(typeof window!== undefined){
        localStorage.setItem("token",JSON.stringify(data.token))
        localStorage.setItem("name",JSON.stringify(data.name))

        next()
    }
}

export const signout = next =>{
    if(typeof window!== undefined){
        localStorage.clear()
        next()
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response =>{console.log("signout success")})
        .catch(err =>{console.log(err)})
    }
}