import React from 'react'
import {Dropdown} from "react-bootstrap"
import { signout } from '../ApI Calls/api'
import { withRouter } from 'react-router-dom'

const UserName = (
  {history}
  ) => {
    return (
      <div>
      <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    <b>{JSON.parse(localStorage.getItem("name"))} </b> 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={()=>{
      signout(() =>{
        history.push("/")
    })
    }}>Signout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</div>
    )
}

export default withRouter(UserName)
