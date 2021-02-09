import React, {useState} from 'react'
import "../Core/home.css"
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { signup, signin, authenticate } from '../ApI Calls/api';
import {Redirect} from "react-router-dom"
import {Modal, Button, Form} from "react-bootstrap"

export const userContext = React.createContext()

const Home = () => {
    const [popup, setPopup] = useState(false);
    
    const [isEmpty, setIsEmpty] = useState(false)

    const [signUpEmpty, setSignUpEmpty] = useState(false)

    const [signUpError, setSignUpError] = useState(false)
    
    const [values, setValues] = useState({
        name : "",
        password : "",
        email: "",
        didRedirect: false,
        didSign : false,
        error: "",
        success: false,
        signupValueError: ""                   
    })

    const {name, password, email, didRedirect, didSign, error, success, signupValueError} = values

    const handleChange = name => event =>{
        setSignUpError(false)
        setIsEmpty(false)
        setSignUpEmpty(false)
        setValues({
            ...values,
            error: ""
        })
        const value = event.target.value
        setValues({
            ...values,
            [name]: value
        })
    }

    const signUpSuccess = () =>{
        return (
            <div class="alert alert-success signup-alert" role="alert">
                 Your account was created successfully!. Please <span className="login" onClick={()=>{setPopup(true)}}>login here...</span>
            </div>
        )}

    const onSubmit = event =>{
        event.preventDefault()
        if(name && password && email !== ""){
        signup({name, password, email})
        .then(data =>{
            if(data.error){
                console.log(data.error)
                setValues({...values, signupValueError: data.error})
                setSignUpError(true)
            }else{
                if(data.err){
                    setValues({
                        ...values,
                        signupValueError: data.err
                    })
                    setSignUpError(true)
                    console.log(data.err)
                }
                else{
                setValues({
                    ...values,
                    name: "",
                    password: "",
                    email:"",
                    success: true,
                    error: "",
                    signupValueError: ""    
                   })
                   setIsEmpty(false)
                   setSignUpError(false)     
                }
            }
          
            
        })
        .catch(console.log("Error in signup"))
        }
        else{
            setSignUpEmpty(true)

        }
    }

    const onSignin = event =>{
        event.preventDefault()

        if(email && password !== ""){
        signin({email, password})
        .then(data =>{
            if(data.error){
                console.log("ERROR", data.error)
                setValues({...values, error: data.error})
                
            }else{
                if(data.err){
                    setValues({
                        ...values,
                        error: data.err
                    })
                    console.log(data.err)
                }else{
                    authenticate(data, ()=>{
                        setValues({
                            ...values,
                            didSign: true
                           })    
                    })
                }
                        
                
                       
            }
        })
        .catch(console.log("Error in signin"))
    }else{
        setIsEmpty(true)
    }

    }

    const reDirect = () =>{
        if(didRedirect){
            return <Redirect to="/initialPage" />
        }
    }

    const signRedirect = () =>{
        if(didSign){
            return <Redirect to="/initialPage" />
        }
    }


    const emptySignInMessage = () =>{
        return(
            <div class="alert alert-danger" role="alert">
                Please provide email and password...
          </div>              
        )} 

    const errorSignInMessage = () =>{
        return(
            <div class="alert alert-danger" role="alert">
                {error}
          </div>              
        )} 
    
    const errorSigupMessage = () =>{
       return(
         <div class="alert alert-danger signup-empty-alert" role="alert">
                    {signupValueError}
              </div>              
            )}    
    

    const emptySignUpMessage = () =>{
        return(
            <div class="alert alert-danger signup-empty-alert" role="alert">
                Please provide all required feilds...
          </div>              
        )} 


    const signPage = () => {
        return(
            <div className="container-fluid blog-bg">
            <div className="outer">
            <div className="row">
                <div className="col-5 left">
                   
                    <div className="left-inner">
                    <h1> Welcome to VBlog! </h1>
                    
                    <p>To Keep connected with us please
                    <br /> 
                    login with your personal info
                    </p>
                    <button className="signin-btn" onClick={()=>{
                        setPopup(true)
                        setSignUpError(false)
                        setIsEmpty(false)
                        setSignUpEmpty(false)
                        setValues({...values,
                            error:"",
                            signupValueError:"",
                            email:"",
                            password: ""
                        })
                    }}>SIGN IN</button>
                    </div>
                </div>

                <div className="col-7 right">
                   
                <div className="right-div-head">
                    <p className="right-head"> Create Account</p>
                    <FacebookIcon className="social-icons" style={
                        {fontSize: 50}
                    } />    
                    <LinkedInIcon className="social-icons" style={
                        {fontSize: 50}
                    } />

                    <TwitterIcon className="social-icons" style={
                        {fontSize: 50}
                    } />
                </div>
                {signUpEmpty && emptySignUpMessage()}
                {success && signUpSuccess()}
                {signUpError && errorSigupMessage()}
                <div className="form-div"> 
                    <form>
                    <div class="form-group">    
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" class="form-control" placeholder="Enter username" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange("name")} value={name} ></input>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Email</label>
                        <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Enter email" onChange={handleChange("email")} value={email} ></input>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={handleChange("password")} placeholder="Enter password" value={password} ></input>
                    </div>
                    <button className="signup-btn" onClick={onSubmit}> SIGN UP</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        
        )
    }

    const signIn = () => {
        return (
            <div>
            <Modal 
            show={popup}
            size="lg"
            centered
            >
            <Modal.Header>
            <Modal.Title>Signin </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {isEmpty && emptySignInMessage()}
                    {signupValueError && errorSignInMessage()}
                        <Form>
                        
                        <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleChange("email")} value={email} />
                        </Form.Group>
                        
                        <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" onChange={handleChange("password")} value={password} />
                        </Form.Group>
                        
                        
                    </Form>
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{
                setPopup(false)
                setIsEmpty(false)
                setValues({
                    email: "",
                    password: "",
                    error: ""
                })
            }}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onSignin}>
                Signin
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
        )
    }

    return (
        <div>
            {signPage()}
            {reDirect()}
            {signIn()}
            {signRedirect()}
        </div>
    )
}

export default Home
