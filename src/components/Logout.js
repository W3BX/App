import React, { useEffect } from 'react'
import { removeUser } from '../api/user'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user?.value)

  useEffect(() => {
    if (user && user !== null) {
      removeUser(navigate, dispatch)
    }
  }, [user])


  return (
    <div></div>
  )
}

export default Logout