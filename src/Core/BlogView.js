import React, {useState, useEffect} from 'react'
import Menu from "./Menu"
import "./blogview.css"
import {Modal, Button, Form} from "react-bootstrap"
import {addPost, getPost} from "../ApI Calls/api"
import BlogCard from './Card'



const BlogView = () => {
    const [popup, setPopup] = useState(false);
    const [post, setPost] = useState({
        title: "",
        description: "",
        name : JSON.parse(localStorage.getItem("name"))
    })

    const [isEmpty, setIsEmpty] = useState(false)
 
 // DESTRUCTURING   
    const {title, description, name} = post
    const [cardData, setCardData] = useState([])


    useEffect(() => {
        preLoad()
    }, [cardData])

    const preLoad = () => {
        getPost().then(data =>{
            if (data.error) {
                console.log(data.error)
            }else{
               setCardData(data)  
            }      
        })  
    }    

    const postAdd = () =>{
        
        if(title && description !== ""){   
        addPost(post)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setPost({
                    ...post,
                    title: "",
                    description: ""
                })
                setPopup(false)
            }
        }) 
    }else{
        setIsEmpty(true)
    }      
    }

    const emptySignInMessage = () =>{
        return(
            <div class="alert alert-danger" role="alert">
                Please fill all the feilds...
          </div>              
        )} 

    const handleChange = name => event => {
        const value = event.target.value
        setPost({
            ...post,
            [name] : value
        })
    }

    return (
        <div>
            <Menu />
            <div className="bg">
            <div className="container">
            <h2> Blogs </h2>
                <div className="blogview">
                
                    <div className="content">

                    {cardData.map((post, index) =>{
                        return(
                            <div key={index}>
                                    <BlogCard 
                                        title={post.title}
                                        description={post.description}
                                        name={post.name}
                                        time={post.createdAt}
                                    />
                                    
                            </div>
                        )
                    })}
                    
                        

                        <Modal 
                            show={popup}
                            size="lg"
                            centered
                         >
                            <Modal.Header>
                            <Modal.Title>Create Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {isEmpty && emptySignInMessage()}
                                        <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="title" onChange={handleChange("title")} value={title} />
                                        </Form.Group>
                                        
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Blog content</Form.Label>
                                        <Form.Control as="textarea" rows="5" onChange={handleChange("description")} value= {description} />
                                        </Form.Group>
                                    </Form>
                            
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={()=>{
                                setPopup(false)
                                setIsEmpty(false)
                                setPost({
                                    ...post,
                                    title: "",
                                    description: ""
                                })
                            }}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={postAdd}>
                                Add Post
                            </Button>
                            </Modal.Footer>
                        </Modal>
                                            
                    </div>


                    
                    <div className="addblog">
                        <h2 style={{marginTop:10}}> Add Blog </h2>
                        <hr />
                        <p> Add your ideas or post here...</p>
                        <button className="addPost" onClick={() =>{ setPopup(true)}}>Add Post</button>
                    </div>

                </div>
            </div>
            </div>
        </div>
    )
}

export default BlogView
