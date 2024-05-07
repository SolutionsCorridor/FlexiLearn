import { useEffect, useState } from 'react'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import 'agora-react-uikit/dist/index.css'
import { useNavigate } from 'react-router-dom'
import { getStudent } from '@/services/student/profile.service'
import { getTeacher } from '@/services/teacher/profile.service'

const Appointement = () => {
    const [videocall, setVideocall] = useState(true)
    const [isPinned, setPinned] = useState(false)
    const [username, setUsername] = useState('')

    const id = localStorage.getItem("userId");

    const navigate = useNavigate();

    useEffect(() => {
        const userType = localStorage.getItem('userType')

        if (!id) return;

        if (userType === 'student') {
            getStudent(id).then((res: any) => {
                setUsername(res.data.fullName)
            })
        } else {
            getTeacher(id).then((res: any) => {
                setUsername(res.data.fullName)
            })
        }
    }, [id])

    useEffect(() => {
        if (videocall === false) {
            navigate(`/teacher/profile/${id}`)
        }
    }, [videocall])

    return (
        <div className='w-screen h-screen flex flex-1 bg-slate-700'>
            <div className='w-full h-full flex flex-col'>
                {videocall ? (
                    <>
                        <div className='flex'>
                            <p
                                className='text-white font-bold text-2xl p-2 bg-primary rounded-md cursor-pointer'
                                onClick={() => setPinned(!isPinned)}
                            >
                                Change Layout
                            </p>
                        </div>
                        <AgoraUIKit
                            rtcProps={{
                                appId: '9f896f319cf64ec19bf74271a8302076',
                                channel: 'test',
                                token: null, // add your token if using app in secured mode
                                layout: isPinned ? layout.pin : layout.grid,
                                enableScreensharing: true
                            }}
                            rtmProps={{ username: username || 'user', displayUsername: true }}
                            callbacks={{
                                EndCall: () => setVideocall(false)
                            }}
                        />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Appointement
