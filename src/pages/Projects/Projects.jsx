import React, {useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ProjectBar from '../../components/ProjectsBar/ProjectBar';
import ProjectLayout from '../../components/ProjectLayout/ProjectLayout'
import './Projects.css'

const  Projects = ()=> {

    const [projectsState, setProjectState] = useState([])
    

    useEffect(()=>{
        let projectsStorage = JSON.parse(localStorage.getItem('projects'))
        if(projectsStorage !== null){
            setProjectState(projectsStorage)
            console.log(typeof(projectsStorage))
        } else{
            setProjectState([])
        }
    },[])

    const setProjects = (passedProjects)=>{
        setProjectState([passedProjects])
        console.log(projectsState)
        console.log(passedProjects)
    }

    const setProjectsAsArray = (passedArray)=>{
        setProjectState([...projectsState, passedArray])
        console.log(projectsState)
        console.log(passedArray)
    }

    const setUpdatedArray = (newArray)=>{
        setProjectState(newArray)
    }

    return (
        <div>
        <Header/> 
        <div className="context-flex">
            <ProjectBar projects = {projectsState} />
            <ProjectLayout setProject = {setProjects} setProjectArray = {setProjectsAsArray} setNewArray = {setUpdatedArray} />
            </div> <br/><br/><br/>
        </div>
    )
}

export default Projects
