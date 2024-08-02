import Spinner from "./Spinner"
import { useEffect, useState } from "react"
import backendUrl from "../config/apiUrl"
import { userStore } from "../store/store"
import handleError from "../utils/handleAxiosErrors"
import {TeamType} from "../types/teamType"


const MyTeams = () => {

    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [userTeams, setUserTeams] = useState<TeamType[] | []>([])


    const getTeams = async () => { 
        setLoad(true)
        try {
            const {data, status} = await backendUrl.get(`/teams/userTeams/${user?._id}`)
            console.log(data)
            if(status === 200) { 
                setLoad(false)
                setUserTeams(data)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    useEffect(() => { 
        getTeams()
    }, [])

  return (
    <div>
         mis equipos
       
       {load ? <Spinner/> : 
         userTeams.map((us : TeamType) => ( 
             <div>
                <p>{us.name}</p>
             </div>
         ))
       }
         
         
    </div>
  )
}

export default MyTeams
