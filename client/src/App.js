import React, { Component } from 'react';
import axios from 'axios';
import {Route} from "react-router-dom";
import Project from "./Project";
import ProjectList from "./ProjectList";

import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state={
      projects:[]
    }
  }


componentDidMount() {
  axios.get('http://localhost:7000/api/projects')
  .then(res=>this.setState({projects:res.data}))
  .catch(err=>console.log(err, "We failed to retrieve the list of projects."))
}

  render() {
if (!this.state.projects.length) {
  return <h1>Retrieving projects...</h1>
} else {

    return (
      <div className="App">
<Route exact path="/" render={ownProps=>(<ProjectList {...ownProps} projects={this.state.projects}/>)}/> 
 <Route exact path="/:id" render={ownProps=>(<Project {...ownProps} projects={this.state.projects}/>)}/>     
      </div>
    );
  }
}
}

export default App;
