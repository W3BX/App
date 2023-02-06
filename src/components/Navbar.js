import { React, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { removeUser } from '../api/user'
import { Link, useNavigate } from 'react-router-dom'
import { RiReactjsFill, RiHome5Line, RiUserFill, RiLogoutBoxRLine, RiAlignJustify, RiCloseFill } from "react-icons/ri"
const Navbar = () => {

    const userlogged = useSelector((state) => state.user.islogged)
    const [navbar, setnavbar] = useState(false)
    let navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className='navbar navbar-light Navhead px-3'>
            <span className='reactIcon'>
                <RiReactjsFill size={30} />
            </span>
            <span className='leftSide collpase'>
                <span className='stackMobile' onClick={() => setnavbar(!navbar)}>
                    {!navbar ? <RiAlignJustify size={25} /> : <RiCloseFill size={25} />}
                </span>
                <span className={`stackDesktop ${navbar ? `colapseopen` : `colapseclose`} `}>
                    <span className='mobIcons'>
                        <NavLink to='/'>
                            <RiHome5Line size={25} />
                        </NavLink>
                        <NavLink to={userlogged ? '/user' : '/login'}>
                            <RiUserFill size={20} />
                        </NavLink>
                        {userlogged ? <NavLink to='/login' onClick={() => { removeUser(navigate, dispatch) }}>
                            <RiLogoutBoxRLine size={20} />
                        </NavLink> : ''}
                    </span>
                </span>

            </span>
        </div>
    )
}

export default Navbar