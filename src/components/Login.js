import React from 'react'
import login from "../vectors/login.jpg"
import { RiUser3Fill, RiLockPasswordFill } from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { useSelector, useDispatch, connect } from 'react-redux/es/exports'
import { UserLogin } from '../api/user'

const Login = (props) => {
  const { handleSubmit, pristine, reset, submitting, load } = props
  const loginData = useSelector((state) => state.form.login?.values)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const handleData = () => {

    UserLogin(loginData, navigate, dispatch)

  }
  const data = {
    email: 'asdad',
    pasword: 123
  }
  return (
    <div className='container LoginDiv'>
      <div className=''>
        <div className='row border'>
          <div className='col-sm-4'>
            <div className='sign-header'>
              <p>Sigin</p>
            </div>
            <form className='form-sign' autoComplete="off" onSubmit={handleSubmit(handleData)}>
              <div class="form-group">
                <label for="exampleInputEmail1"><RiUser3Fill size={20} /></label>
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="E-mail"
                  className="form-input"
                />
                {/* <input type="email" class="form-input" id="exampleInputEmail1" placeholder="Enter Email" /> */}
              </div>
              <div class="form-group">
                <label for="exampleInputpassword"><RiLockPasswordFill size={20} /></label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="E-mail"
                  className="form-input"
                />
                {/* <input type="password" class="form-input" id="exampleInputpassword" placeholder="Enter Password" /> */}
              </div>
              <div class="form-group-submit">
                <button className='login-button' type='submit' >Login</button>
                <br />
                <button className='dummy-button' type='button' onClick={() => { dispatch(change('login', 'email', 'Abc@mail.com')); dispatch(change('login', 'password', '555550')) }} >Get dummt user</button>
              </div>

              <div class="form-group-link">
                <Link to={'/register'}>Register Now</Link>
              </div>
            </form>
          </div>
          <div className='col-sm-8 colImg'>
            <img src={login} class="img-fluid" alt="Responsive image" height='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default  reduxForm({
  form: 'login' // a unique identifier for this form
})(Login)

