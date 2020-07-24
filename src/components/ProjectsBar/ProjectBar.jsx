import React from 'react'
import './ProjectBar.css'

const  ProjectBar = ({projects})=> {
    return (
        <div className='main-div'>
            <h4>PROJECTS</h4>
            <div className="projectLists">
            {projects.length > 0 ? projects.map((project, i)=>{
                       return  <div key={i} className="projectList"> 
                       <div className={project.priority === 'Normal' ? 'normal-style' : project.priority === 'Urgent' ? 'urgent-style' : project.priority === 'Not Important' ? 'np-style' :''}></div>
            <h5>{project.project}</h5>
                   </div>
                   }) : ''}
             
            </div>
        </div>
    )
} 

export default ProjectBar
