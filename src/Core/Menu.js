import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import "./menu.css"
import UserName from './userName'




function Menu(
  {history}
) {

      return (
        <div>
        <nav>
        <label class="logo">VBlog</label>
        <ul>
          <li>
            <Link to="/initialPage">Home</Link>
          </li>
          <li>
          <Link to="/blogView">Blogs</Link>
          </li>
          <li>
          <Link to="/myblog">My blogs</Link>
          </li>
          <li>
          <Link to="/aboutUs">About Us</Link>
          </li>
          <div className="user">
          <UserName />
          </div>
        </ul>
       
      </nav>

      </div>
    )
}

export default withRouter(Menu)
