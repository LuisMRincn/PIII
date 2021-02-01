import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { Component } from 'react'
import Home from './Views/Home'
import  AllJobs  from  "./Views/AllJobs";
export default class App extends Component {
  

  render() {
    return (
      <div>
       <Router>
         Ever...
         <Switch>

          <Route path="/" exact>
          {<Home/>}
          </Route>
          <Route path="/AllJobs">
          {<AllJobs/>}
          </Route>


         </Switch>
       </Router>
          
      </div>

    );
  }
}
