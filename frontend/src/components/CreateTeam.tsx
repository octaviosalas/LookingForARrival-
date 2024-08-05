import { useState, useEffect } from "react"
import backendUrl from "../config/apiUrl"
import { userStore } from "../store/store"
import handleError from "../utils/handleAxiosErrors"
import {useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import { Player } from "../types/players"


type newTameData = { 
    name: string
}

const CreateTeam = () => {

    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [showInput, setShowInput] = useState<boolean>(false)
    const [possiblePlayers, setPossiblePlayers] = useState<Player[] | []>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [showingPlayers, setShowingPlayers] = useState<boolean>(false)
    const navigate = useNavigate()

      const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
          setName(e.target.value)
      }
      
      const createNewTeam = async () => { 
          const teamData : newTameData= ({ 
              name: name
          })
          setLoad(true)
          try {
              const {data, status} = await backendUrl.post(`/teams/createTeam/${user?._id}`, teamData)
              if(status === 200) { 
                  setLoad(false)
                  console.log(data)
                  toast.success(data, {
                      style: { backgroundColor: 'white', color: 'blue' },
                      pauseOnHover: false,
                      autoClose: 1500
                  });
                  navigate("/myTeams")
              }
          } catch (error) {
              handleError(error, setLoad)
          }
      }

      const getPlayers = async (name : string) => { 
        try {
        const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=2798f9e9f7a084d535ceaa8edbfaa35a14427bd94d3feb3d0a81e12c533914d5`); 
        console.log(response.data)
        setPossiblePlayers(response.data)
        } catch (error) {
        handleError(error, setLoad)
        }
      }

      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setInputValue(e.target.value)
      }

      const searchPlayer = () => { 
        getPlayers(inputValue)
        setShowingPlayers(true)
      }

      const resetSearch = () => { 
        setShowingPlayers(false)
        setPossiblePlayers([])
        setInputValue("")
      }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear Nuevo equipo
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre del equipo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                 
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChangeName}
               />
              </div>
            </div>

         

            <div className="flex flex-col items-center">
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setShowInput(prevState => !prevState)}
             >
                Añadir Jugadores
              </button>
              <button
                type="submit"
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => createNewTeam()}
             >
                Crear Equipo
              </button>
            </div>

            {showInput ? 
               <div className="flex flex-col">
                    <input onChange={handleChangeInput} type="text" className=" border border-red-600 h-12 w-full" value={inputValue}/>
                    {!showingPlayers ? <button className="bg-blue-500 font-medium mt-4 text-white" onClick={() => searchPlayer()}>buscar</button> 
                    :  
                    <button className="bg-blue-500 font-medium mt-4 text-white" onClick={() => resetSearch()}>Resetear</button>}
               </div>  : null}

        

            {possiblePlayers.length > 0 ? 
            <div className="flex flex-col items-start justify-start  overflow-y-auto max-h-[400px]">
               {possiblePlayers.map((pp) => (
                   <div className="flex flex-col items-start justify-start" key={pp.player_id}>
                      <p className="cursor-pointer font-medium"> {pp.player_name}</p>
                   </div>
               ))}
            </div>  : null}
          </form>

       
        </div>
      </div>
    </div>
  )
}

export default CreateTeam
