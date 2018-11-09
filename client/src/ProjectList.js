import React from 'react';

class ProjectList extends React.Component{
    
    routeToProject(event, id) {
        event.preventDefault();
        this.props.history.push(`/${id}`);
    }
    
    render() {
 return (
 <div className="project-list">
    {this.props.projects.map(project=>{
      return (
        <div key={project.id} className="project" 
        onClick={event=>this.routeToProject(event, project.id)}>
        <h1 className="project-name">{project.name}</h1>
        <h3 className="project-description">{project.description}</h3>
        <h5 className="project-completed">{project.completed}</h5>
        </div>
      )
    })}
    </div>
)    
}
}

export default ProjectList;