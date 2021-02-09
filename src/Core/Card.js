import React from 'react'
import "./card.css"
import moment from "moment"

const BlogCard = ({
    title = "Quote",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ullamco laboris nisi ut aliquip ex ea commodo",
    name = "Unknown",
    time= "createdTime"
}) => {
    return (
        <div className="blog-card">
            <h2 className="blog-title">{title}</h2>
            
            <p className="subhead">by <span className="name">{name}</span></p>
            <hr />  
            <p className="blogcontent">{description} </p>
            
            <hr />
            <div className="bottom-card">
            <p className="date"> Posted on {moment(time).format("MMM DD YYYY, h:mm a")}</p>
            
            </div>
        </div>
    )
}

export default BlogCard
