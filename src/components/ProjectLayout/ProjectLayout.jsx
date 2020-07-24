import React from 'react'
import './ProjectLayout.css'
import { useState, useEffect } from 'react'
import {FiTrash} from 'react-icons/fi'

const  ProjectLayout = ({setProject, setProjectArray, setNewArray })=> {

    const [showModal, setShowModal] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projectPriority, setProjectPriorty] = useState('')
    const [projects, setProjects] = useState([])
    const [showEditDeleteModal, setshowEditDeleteModal] = useState(false)
    const [showClearProjectsModal, setshowClearProjectsModal] = useState(false)
    const [projectTobeEdited, setProjectToBeEdited]  = useState({})
    const [focusProject, setFocusProject] = useState({})


    useEffect(()=>{
        let projectsStorage = localStorage.getItem('projects')
        let projectStorageParsed = JSON.parse(projectsStorage)
        console.log(projectStorageParsed)
        if(projectStorageParsed === null){
            setProjects([])
        }
        setProjects(projectStorageParsed)

    },[])



    const toogleOpenModal = ()=>{
        setShowModal(true)
    }

    const toogleCloseModal = ()=>{
        setShowModal(false)
    }


    const setProjectNameFunc = (value)=>{
        setProjectName(value)
    }

    const setProductPriorityFunc = (value)=>{
        setProjectPriorty(value)
    }

    const arrangeText = (value)=>{
        let name = value
        let nameSplitted = name.split(' ')
        let firstLetter = nameSplitted[0].slice(0,1)
        let secoundLetter
        let finalText
        if(nameSplitted.length >=2){
            secoundLetter = nameSplitted[nameSplitted.length-1].slice(0,1) 
        }

        if(nameSplitted.length >=2){
         finalText = firstLetter.toUpperCase() + secoundLetter.toUpperCase()
        } else{
            finalText  =  firstLetter.toUpperCase()
        }
        return finalText
    }

    const StoreProjects = ()=>{
        let storedProject = localStorage.getItem('projects')
        let storedProjects = JSON.parse(storedProject)
        if(storedProjects ===  null){
            let newProject = JSON.stringify([{"project":projectName, "priority": projectPriority}])
            localStorage.setItem('projects', newProject)
            setShowModal(false)
            setProjects([{"project":projectName, "priority": projectPriority} ])
            setProject({"project":projectName, "priority": projectPriority})
            setProjectNameFunc('') ;
            setProductPriorityFunc('')
        } else{
            storedProjects.push({"project":projectName, "priority": projectPriority})
            let stringifiedData = JSON.stringify(storedProjects)
            localStorage.setItem('projects', stringifiedData)
            setShowModal(false)
            setProjects([...projects,{"project":projectName, "priority": projectPriority}])
            setProjectArray({"project":projectName, "priority": projectPriority})
            setProjectNameFunc('') ;
            setProductPriorityFunc('')
        }
    }

    const storeUpdatedArray = (updatedArray)=>{

        const newArrayParsed = JSON.stringify(updatedArray)

        localStorage.setItem('projects', newArrayParsed)
    }

    const showclearStorageModal = ()=>{
        setshowClearProjectsModal(true)
        
    }

    const clearStorage = ()=>{
        localStorage.clear('projects')
        setProjects([])
        setProject([])
        setshowClearProjectsModal(false)
    }
    const handleProjectClick=(projectPassed)=>{
        if(!showModal){
            setshowEditDeleteModal(true)
            console.log(projectPassed)
            setProjectToBeEdited(projectPassed)
            setFocusProject(projectPassed)
        }
    }

    const handleModalRemoval = ()=>{
        if(showModal){
            setShowModal(false)
        }

        else if(showEditDeleteModal){
            setshowEditDeleteModal(false)
        }

        else if (showEditDeleteModal){
            setshowEditDeleteModal(false)
        }
    }

    const handleEditModal = (value)=>{
        // let {project, priority} = value
        // console.log(project, priority)
        setProjectToBeEdited(value)
        // console.log(projectTobeEdited)
    }

    const handleEditModalPriority = (priority)=>{
        let {project} = projectTobeEdited
        console.log(project, priority)

        setProjectToBeEdited({
            "project":project,
            "priority":priority
        })
    }

    const submitEditButton = ()=>{
        let focusedProjects = projects.filter((obj, i)=>{
            return obj.project !== focusProject.project
        })

    const projectIndex = projects.findIndex(projects=>projects.project === focusProject.project)

    focusedProjects.splice(projectIndex, 0, projectTobeEdited)

   setProjects(focusedProjects)

   setNewArray(focusedProjects)

   storeUpdatedArray(focusedProjects)

   setshowEditDeleteModal(false)
    }

    const handleDeleteProject  = ()=>{
        let focusedProjects = projects.filter((obj, i)=>{
            return obj.project !== focusProject.project
        })

        setProjects(focusedProjects)
        setNewArray(focusedProjects)

        storeUpdatedArray(focusedProjects)

        setshowEditDeleteModal(false)
    }

    return (
        <div>
    <button style={{width:'120px', height:'35px', backgroundColor:'dodgerblue', color:'white', textAlign:'center', border:'none', borderRadius:'5px', fontFamily:'Jost, san-serif', marginLeft:'60vw', fontSize:'16px'}} onClick={()=>showclearStorageModal()} >Clear Projects</button>
        <div onClick={()=>{handleModalRemoval()}} className={
            showModal ? 'projectLayout-div-modal': showEditDeleteModal ? 'projectLayout-div-modal' : showClearProjectsModal ?  'projectLayout-div-modal' : 'projectLayout-div' 
        }>
            { projects !== null ? projects.map((project, i)=>{
                let Abbreviation = arrangeText(project.project)
                return <div key={i} onClick={()=>{handleProjectClick(project)}} > <div key={i} className={project.priority === 'Urgent' ? 'projectCard-urgent' : project.priority === 'Normal' ? 'projectCard-normal' : project.priority === 'Not Important' ? 'projectCard-nimp' : 'projectCard-urgent' }>
                <p key={i} className='projectCardAbr'>{Abbreviation}</p>
            </div>
            <h3 style={{textAlign:'center', wordWrap:'break-word',width:'100px', marginLeft:'20px'}}>{project.project}</h3>
            </div>
            }):''}
            <div onClick={()=>toogleOpenModal()} className="projectCard-add">
                <h4>
                    +
                </h4>
                <h3 style={{textAlign:'center', wordWrap:'break-word',width:'100px'}}>Add a Project</h3>
            </div>


            
        </div>
        { showModal ? 
                <div className='add-project-modal'>
                    <h4 style={{fontSize:'20px', marginTop:'10px'}}>Add a Project </h4>
                    <div  onClick={()=>toogleCloseModal()} style={{background:'rgb(236, 77, 77)', width:'30px', height:'30px', textAlign:"center", marginLeft:'5vw', borderRadius:'50px', marginTop:'-55px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px'}}>X</p>
                    </div>
                    <p>Project Name</p>
                    <input onChange={(event)=>setProjectNameFunc(event.target.value)} type="text" className='input-projectName' />
                    
                    <br/><br/>
                    <p>Project Priority:</p>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>setProductPriorityFunc('Urgent')} style={{backgroundColor:'red', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white' , textAlign:'center', marginTop:'5px'}}>Urgent</p>
                    </div>
                    <div onClick={()=>setProductPriorityFunc('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div><br/>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>setProductPriorityFunc('Normal')} style={{backgroundColor:'dodgerblue', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white', textAlign:'center'}}>Normal</p>
                    </div>
                    <div onClick={()=>setProductPriorityFunc('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div><br/>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>setProductPriorityFunc('Not Important')} style={{backgroundColor:'green', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white', textAlign:'center'}}>Not Important</p>
                    </div>
                    <div onClick={()=>setProductPriorityFunc('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div>
                    
                    </div>
                    { projectName.length > 0 && projectPriority.length > 1 ? 
                   <button onClick={()=>StoreProjects()} className='add-project-button'>Add Project</button> 
                    : ''}
                </div>
            : ''}

            {
                showEditDeleteModal ? <div className='edit-project-modal'>
                    <div  onClick={()=>setshowEditDeleteModal(false)} style={{background:'rgb(236, 77, 77)', width:'30px', height:'30px', textAlign:"center", marginLeft:'10vw', borderRadius:'50px', marginTop:'0px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px'}}>X</p>
                    </div>
                    <input onChange={(event)=>handleEditModal({
                        "project" : event.target.value,
                        "priority" : projectTobeEdited.priority
                    })} className='input-projectName' style={{marginTop:'50px', fontSize:'16px'}} type value={projectTobeEdited.project} />
                   <FiTrash onClick={()=>handleDeleteProject()} style={{marginLeft:'30px'}}  color='red' size={30}/>
                  <div style={{display:'flex', flexDirection:'row', marginTop:'50px'}}>
                        <div onClick={()=>handleEditModalPriority('Urgent')} style={{backgroundColor:'red', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white' , textAlign:'center', marginTop:'5px'}}>Urgent</p>
                    </div>
                    <div onClick={()=>handleEditModalPriority('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div><br/>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>handleEditModalPriority('Normal')} style={{backgroundColor:'dodgerblue', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white', textAlign:'center'}}>Normal</p>
                    </div>
                    <div onClick={()=>handleEditModalPriority('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div><br/>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>handleEditModalPriority('Not Important')} style={{backgroundColor:'green', width:'200px', height:'35px', borderRadius:'20px', marginLeft:'30px'}}>
                        <p style={{ color:'white', textAlign:'center'}}>Not Important</p>
                    </div>
                    <div onClick={()=>handleEditModalPriority('')} style={{background:'black', width:'30px', height:'25px', textAlign:"center", marginLeft:'5px', borderRadius:'50px', marginTop:'5px'}}>
                        <p style={{textAlign:'center', color:'white', marginLeft:'0px', paddingTop:'3px', fontSize:'10px', marginTop:'3px'}}>X</p> 
                        </div>
                        </div>
                        { projectTobeEdited.project.length > 0 && projectTobeEdited.priority  !== '' ? 
                   <button onClick={()=>submitEditButton()} className='add-project-button'>Edit Project</button> 
                    : ''}
                </div> : ''
            }
            {
                showClearProjectsModal ? <div className='edit-project-modal'>
                    <h2 style={{textAlign:'center', paddingTop:"30px"}}>
                        Are you sure you want to clear all your Projects ? 
                    </h2>
                    <button  onClick={()=>clearStorage()} style={{backgroundColor:'red', width:'auto', padding:'10px', height:'auto', border:'none', color:'white', fontSize:'20px', borderRadius:'5px',  marginTop:'20px'}}> Yes, I want to Delete </button> <br/>
                    <button  onClick={()=>setshowClearProjectsModal(false)} style={{backgroundColor:'dodgerblue', width:'auto', padding:'10px', height:'auto', border:'none', color:'white', fontSize:'20px', borderRadius:'5px',  marginTop:'20px'}}>No, Please Take me Back </button>
                </div> : ''
            }
        </div>
    )
}

export default ProjectLayout
