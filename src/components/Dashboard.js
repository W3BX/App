import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { showMern } from '../store/slices/mern'
import { saveComment, emptyComment } from '../store/slices/userComments'
import { DiMongodb, DiReact, DiNodejsSmall } from "react-icons/di"
import { HiOutlineUserCircle } from "react-icons/hi"
import { SiExpress } from "react-icons/si"
import { Comment, GetComments } from '../api/user'
import moment from 'moment'
import Socket from '../socket'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const dispatch = useDispatch()

    const userlogged = useSelector((state) => state.user.islogged)
    const userdetail = useSelector((state) => state.user?.value)
    const merndetail = useSelector((state) => state.mern.mern)
    const commnets = useSelector((state) => state.newComment)


    const [textarea, settextarea] = useState('')
    const [newMsgs, setnewMsgs] = useState([])
    const [newMsgStatus, setnewMsgStatus] = useState(false)
    const [commnetsubmit, setcommnetsubmit] = useState(false)
    const [loading, setloading] = useState(false)
    const user = useSelector((state) => state.user?.value)
    // const Socket = io('http://localhost:5000')


    useEffect(() => {

        Socket.on('connect', () => {
            setloading(true)
            GetComments(dispatch, setloading)
        });


    }, [])

    const uservalue = (e) => {
        const text = e.target.value
        settextarea(text)
    }

    const submitText = async (e) => {
        e.preventDefault()
        if (Socket.connected) {
            const postData = await Comment(textarea.trim(), user, settextarea)
            postData.id = Socket.id
            if (postData) {
                Socket.emit('send_comment', postData)
            }
        }
    }



    useEffect(() => {
        Socket.on('send_saved_comments', (data) => {
            if (data.socket_id != Socket.id) {
                setnewMsgStatus(true)
            }
            setnewMsgs(data.data)
        })
        Socket.on('msg_status', data => data.sent == 1 ? setcommnetsubmit(true) : '')

    }, [Socket])

    useEffect(() => {

        if (newMsgs.length > 0) {
            dispatch(saveComment(newMsgs))
            setInterval(() => {
                setnewMsgStatus(false)
            }, 5000)
        }

    }, [newMsgs])

    useEffect(() => {
        if (commnetsubmit) {
            toast.success('Comment posted')
            setcommnetsubmit(false)
        }
    }, [commnetsubmit])


    return (
        <div className='container mt-5'>
            <div className='row dashboard'>
                <div className='col-sm col1 '>
                    <h3 className='mt-3'>{userlogged && 'Welcome ' + userdetail.name}</h3>
                    <p>This project is developed by
                        <span style={{ color: merndetail.title == 'Mongo' ? merndetail.color : '' }}> M</span>
                        <span style={{ color: merndetail.title == 'Express' ? merndetail.color : '' }}>E</span>
                        <span style={{ color: merndetail.title == 'React' ? merndetail.color : '' }}>R</span>
                        <span style={{ color: merndetail.title == 'Node' ? merndetail.color : '' }}>N</span> stack normie</p>
                    <span className='iconstext'>Click/hover on the below icons to see the stack details.</span>
                    <div className='mern row'>
                        <div className='col-sm' onMouseEnter={() => dispatch(showMern('mongo'))}><DiMongodb size={80} color={'#00684A'} /></div>
                        <div className='col-sm' onMouseEnter={() => dispatch(showMern('express'))}><SiExpress size={80} color={'#f6e834'} /></div>
                        <div className='col-sm' onMouseEnter={() => dispatch(showMern('react'))}><DiReact size={80} color={'#88dded'} /></div>
                        <div className='col-sm' onMouseEnter={() => dispatch(showMern('node'))}><DiNodejsSmall size={80} color={'#3c873a'} /></div>

                    </div>
                </div>
                <div className='col-sm col2'>
                    <div className=' mt-5'>
                        <p className='bold h2' style={{ color: merndetail.color }}>{merndetail.title}</p>
                        <p>{merndetail.desc}</p>
                        <p></p>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='textareadiv row'>
                        <div className='col-sm commnetdiv'>
                            {loading ? "..." : commnets && commnets.filter((val, ind) => ind !== 0).map((c, index) => {
                                return (
                                    <div className={` commnets my-2 py-2 px-2 ${index % 2 === 0 ? 'even' : 'odd'} ${newMsgStatus && index == 0 ? 'newmsg' : ''}`} key={index}>
                                        <span className='username'>{c.user} <span className='time'>({moment(c.createdAt).calendar()})</span> </span>
                                        <span className='commnet'>{c.comment}</span>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className='col-sm'>
                            <textarea className="form-control text-area" autoFocus name='textarea' value={textarea} onChange={(e) => uservalue(e)} id="exampleFormControlTextarea1" rows="5" placeholder="Hey, you can comment without login in. &#x1F60E;"></textarea>
                            <button className='btn btn-outline-info' onClick={(e) => submitText(e)} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard