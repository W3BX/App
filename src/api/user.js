import React from 'react'
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { userdetail, logoutuser } from "../store/slices/user"
import { saveComment, emptyComment } from '../store/slices/userComments';

const URl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_CONNECTION_KEY_GLOBAL : process.env.REACT_APP_CONNECTION_KEY_LOCAL
const client = new axios.create({
    baseURL: URl,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
})

export const UserLogin = async (data, navigate, dispatch) => {
    
    const login = await client.post('/login', { data })
    let userdata = login.data
    if (!userdata.exits) {

        if (userdata.type == 0) {
            toast.error(userdata.msg);
        } else if (userdata.type == 1) {
            toast.error(userdata.msg);
        }

    } else if (userdata.exits) {

        if (userdata.type == 2) {
            dispatch(userdetail(userdata.data))
            navigate('/')
            toast.success(userdata.msg);
        }

    }

}

export const UserSave = (data, navigate) => {

    client.post('/signup', { data }).then(res => {
        try {

            if (res.data.status == 400) {
                toast.error(res.data.msg);
            } else if (res.data.status == 200) {
                { toast.success(res.data.msg) }
                navigate("/login")
            }
        } catch (err) {

        }
    }
    )
}

export const showUser = async (navigate, dispatch) => {
    const userData = await client.post('/data')
    if (userData.data) {
        if (userData.data.status == 404) {
            navigate("/login")
        } else {
            dispatch(userdetail(userData.data))
        }
    }

}

export const removeUser = async (navigate, dispatch) => {

    const removUser = await client.post('/removeUser')
    if (removUser.data.status == 800) {
        dispatch(logoutuser())
        toast.success(removUser.data.msg)
    }


}

export const Comment = async (data, user, settextarea) => {
   
    if (data == '') {
        toast.error('Please write a comment');
    } else {
        try {

            let postData = { data }
            let userName = ''

            if (!Object.keys(user).length) {
                let randomstring = 'Anonymous'

                let randomnumber = Math.floor((Math.random() * 10) + 10)
                let randomnstring = randomstring + randomnumber
                userName = randomnstring
            } else {
                userName = user.name
            }

            postData.user = userName
            settextarea('')
            return postData


        } catch (err) {
            console.log(err)
        }


    }
}


export const GetComments = async (dispatch, setloading) => {


    const showUser = await client.post('/showComment')
    if (showUser.data.status == 200) {
        dispatch(saveComment(showUser.data.data))
        setloading(false)
    } else {
        setloading(false)
    }

}
