import React, { useState } from 'react'
import { RiUser3Fill, RiLockPasswordFill, RiMailFill, RiSmartphoneFill } from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'
import register from "../vectors/register.png"
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { Field, reduxForm } from 'redux-form'
import { UserSave } from '../api/user'

function Register(props) {
    const { handleSubmit, pristine, reset, submitting } = props
    const userData = useSelector((state) => state.form.simple?.values)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const handleData = () => {
        UserSave(userData, navigate)
    }

    return (
        <div className='container LoginDiv'>
            <div className=''>
                <div className='row border'>
                    <div className='col-sm-4'>
                        <div className='sign-header'>
                            <p>Register</p>
                        </div>
                        <form className='form-sign' onSubmit={handleSubmit(handleData)}>
                            <div class="form-group">
                                <label for="exampleInputname"><RiUser3Fill size={20} /></label>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="First Name"
                                    className="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputemail"><RiMailFill size={20} /></label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="E-mail"
                                    className="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputnumber"><RiSmartphoneFill size={20} /></label>
                                <Field
                                    name="number"
                                    component="input"
                                    type="text"
                                    placeholder="Mobile no"
                                    className="form-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputpassword"><RiLockPasswordFill size={20} /></label>
                                <Field
                                    name="password"
                                    component="input"
                                    type="text"
                                    placeholder="Password"
                                    className="form-input"
                                />
                            </div>
                            <div class="form-group-submit">
                                <button className='login-button' type='submit' >Submit</button>
                            </div>
                            <div class="form-group-link">
                                <Link to={'/login'}>Login</Link>
                            </div>
                        </form>
                    </div>
                    <div className='col-sm-8'>
                        <img src={register} class="img-fluid" alt="Responsive image" height='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'simple' // a unique identifier for this form
})(Register)
