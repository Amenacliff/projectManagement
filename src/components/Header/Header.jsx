import React from 'react';
import './Header.css';
import {FaBars, FaTimesCircle} from 'react-icons/fa'
import { useState } from 'react';

const  Header = ()=> {
    const [navOpen, setNavOpen] = useState(false)
    return (
        <div className='headerDiv'>
            {
            navOpen ? <FaTimesCircle onClick={()=>{setNavOpen(false)}} size={35} color='dodgerblue' className='nav-Control' /> : 
            <FaBars onClick={()=>{setNavOpen(true)}} size={35} color='dodgerblue' className='nav-Control' />

            }
         <ul className={navOpen ? 'headerNav' : 'headerNav-closed'} >
        <li>Home</li>    
        <li>Project</li>    
        <li>Inbox</li>    
        <li>Team</li>    
        </ul>   
        <div className="userOptions">
            <button className="upgradeBtn">
                Upgrade
            </button>

            <div className="userNameDiv">
                <h3>
                  AC  
                </h3>
            </div>

        </div>
        </div>
    )
}

export default Header
