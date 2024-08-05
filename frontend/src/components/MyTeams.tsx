import Spinner from "./Spinner"
import { useEffect, useState } from "react"
import backendUrl from "../config/apiUrl"
import { userStore } from "../store/store"
import handleError from "../utils/handleAxiosErrors"
import {TeamType} from "../types/teamType"
import TeamData from "./TeamData"
import TableTeam from "./Table"
import { Table } from "@nextui-org/react"


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
    <div className="flex flex-col items-center justify-center">    
       {load ? <Spinner/> :
        userTeams.length > 0 ? ( 
          userTeams.map((us : TeamType) => ( 
            <div className="flex items-center w-full border">
               <div className="flex flex-col border h-full w-1/4">
                  <h2 className="font-medium text-black text-sm lg:text-lg 2xl:text-xl">Nombre del equipo</h2>
                  <p>{us.name}</p>
               </div>
               <div className="border h-full w-3/4">
                   <p>sin datos</p>
                </div>
            </div>
          
          ))
       ) : <p>No tenes equipos</p>
       }
                 <TableTeam userTeams={userTeams}/>
    </div>
  )
}

export default MyTeams


/* 
import Spinner from "./Spinner"
import { useEffect, useState } from "react"
import backendUrl from "../config/apiUrl"
import { userStore } from "../store/store"
import handleError from "../utils/handleAxiosErrors"
import {TeamType} from "../types/teamType"
import TeamData from "./TeamData"


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
    <div className="flex flex-col items-center justify-center">    
       {load ? <Spinner/> :
        userTeams.length > 0 ? ( 
          userTeams.map((us : TeamType) => ( 
            <div>
              <TeamData team={us}/>
            </div>
          ))
       ) : <p>No tenes equipos</p>
       }
    </div>
  )
}

export default MyTeams



*/