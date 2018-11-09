import React from 'react';
import axios from 'axios';

class Project extends React.Component {
constructor(props) {
    super(props);
    this.state={
        activeProject: {}
    }
}

componentDidMount() {
axios.get(`http://localhost:7000/api/projects/${this.props.match.params.id}`)
.then(res=>this.setState({activeProject:res.data}))
.catch(error=>console.log("The server failed to retrieve this project: ", error));
}

render() {
    return (
        <div className="project-full">
        <h3 className="project-name">{this.state.activeProject.name}</h3>
        <h5 className="project-description">{this.state.activeProject.description}</h5>
        <h6 className="project-completed">{this.state.activeProject.completed}</h6>
        </div>
    )
}

}

export default Project;