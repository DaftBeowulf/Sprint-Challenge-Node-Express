import React, { Component } from 'react';
import axios from 'axios';

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
 <div className="project-list-wrapper">
 {this.state.projects.map(project=>{
   return (
     <div key={project.id} className="project">
     <h1 className="project-name">{project.name}</h1>
     <h3 className="project-description">{project.description}</h3>
     <h5 className="project-completed">{project.completed}</h5>
     </div>
   )
 })}
 </div>
      </div>
    );
  }
}
}

export default App;
