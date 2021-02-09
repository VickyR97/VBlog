import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './Core/Home'
import IntialPage from './Core/IntialPage'
import BlogView from './Core/BlogView'
import AboutUs from './Core/AboutUs'
import Myblogs from './Core/Myblogs'
import ExpandBlog from './ExpandBlog'


const Routes = () => {
    return (
        <div>
        <BrowserRouter>
        <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/initialPage" exact component={IntialPage} />
                <Route path="/blogView" exact component={BlogView} />
                <Route path="/aboutUs" exact component={AboutUs} />            
                <Route path="/myblog" exact component={Myblogs} />
                <Route path="/expandblog" exact component={ExpandBlog} />
                
        </Switch>
        </BrowserRouter>

        </div>
    )
}

export default Routes
