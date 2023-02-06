import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { showUser } from '../api/user'
import { Link, useNavigate } from 'react-router-dom'

const User = () => {
    const user = useSelector((state) => state.user?.value)
    const dispatch = useDispatch()
    let navigate = useNavigate()
   
    useEffect(() => {
        if(user && user !== null){
            showUser(navigate, dispatch)
        }
    }, [])

    return (
        <div className='container w-100 h-100 '>
            <div className='MainUser'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <span><span className='label'>Name:</span> {user.name}</span><br/>
                        <span><span className='label'>E-mail:</span> {user.email}</span>
                    </div>
                    <div className='col-sm-6'>
                        <ui>
                            <li>
                             Users can log in, Register to see the effectiveness of the project. with the latest redux/toolkit enable and mongoAtlas setup.
                            </li>
                            <li>
                            JWT token is used to handle the authentication. 
                            </li>
                        </ui>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User