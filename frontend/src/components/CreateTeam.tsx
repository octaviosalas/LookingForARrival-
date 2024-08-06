import { useState } from "react"
import backendUrl from "../config/apiUrl"
import { userStore } from "../store/store"
import handleError from "../utils/handleAxiosErrors"
import {useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from "axios"
import { Player } from "../types/players"
import Spinner from "./Spinner"
import { newTeamPlayers } from "../types/teamType"
import NewTeamList from "./NewTeamList"
import { errorToastView, succesToastView } from "../utils/toastFunctions"

type newTeamData = { 
    name: string,
    players: newTeamPlayers[] | []
}

const CreateTeam = () => {

    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [showInput, setShowInput] = useState<boolean>(false)
    const [possiblePlayers, setPossiblePlayers] = useState<Player[] | []>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [showingPlayers, setShowingPlayers] = useState<boolean>(false)
    const [newTeamPlayersData, setNewTeamPlayersData] = useState<newTeamPlayers[]>([]);
    const navigate = useNavigate()

      const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
          setName(e.target.value)
      }

      const goToAddPlayers = () => {
        if(name.length > 0) { 
           setShowInput(prevState => !prevState)
        } else { 
          toast.error("Debes completar el nombre del equipo", {
            style: { backgroundColor: 'white', color: 'red' },
            pauseOnHover: false,
            autoClose: 2500
        });
        }
      }
      
      const createNewTeam = async () => { 
          const teamData : newTeamData= ({ 
              name: name,
              players: newTeamPlayersData
          })
          setLoad(true)
          try {
              const {data, status} = await backendUrl.post(`/teams/createTeam/${user?._id}`, teamData)
              if(status === 200) { 
                  setLoad(false)
                  console.log(data)
                  succesToastView(data)
                  navigate("/myTeams")
              }
          } catch (error) {
              handleError(error, setLoad)
          }
      }

      const getPlayers = async (name : string) => { 
        setLoad(true)
        try {
        const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=2798f9e9f7a084d535ceaa8edbfaa35a14427bd94d3feb3d0a81e12c533914d5`); 
        console.log(response.data)
        setPossiblePlayers(response.data)
        setLoad(false)
        if (response.status === 404 || ('error' in response.data && response.data.error)) { 
          errorToastView("No se encontraron jugadores")
          resetSearch()
        }
        } catch (error) {
        handleError(error, setLoad)
        }
      }

      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setInputValue(e.target.value)
      }

      const searchPlayer = () => { 
        if(inputValue.length > 0) { 
          getPlayers(inputValue)
          setShowingPlayers(true)    
        } else { 
          errorToastView("Debes completar el nombre del jugador")
        }
      
      }

      const resetSearch = () => { 
        setShowingPlayers(false)
        setPossiblePlayers([])
        setInputValue("")
      }

      const addPlayer = (playerData: Player) => {
        const playerExists = newTeamPlayersData.some(player => player.id === playerData.player_id);
        if (!playerExists) {
          const newPlayer: newTeamPlayers = {
            id: playerData.player_id,
            name: playerData.player_name,
            image: playerData.player_image,
          };
          setNewTeamPlayersData(prevState => [...prevState, newPlayer]);
          succesToastView("Añadido correctamente")
        } else {
          errorToastView("El juagdor ya existe en el equipo")
        }      
        setInputValue("");
        setShowingPlayers(false);
        setPossiblePlayers([]);
      };

      const removePlayer = (id: string) => {
        setNewTeamPlayersData(prevState => prevState.filter(player => player.id !== id));
      };

      const finish = () => { 
        setInputValue("")
        setShowingPlayers(false)
        setPossiblePlayers([])
        setShowInput(false)
      }




  return (
    <div className="flex items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">         
            <h2 className="mt-2 2xl:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crear Nuevo equipo
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900"> Nombre del equipo </label>
                <div className="mt-2">
                  <input id="email" required  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={handleChangeName}
                />
                </div>
              </div>

              {newTeamPlayersData.length > 0 ?
                  <div className="flex w-full">
                     <NewTeamList playersData={newTeamPlayersData} remove={removePlayer}/>
                  </div> : null
              }

              <div className="flex flex-col items-center">
              <button
                  type="button"
                  className="flex mt-4 w-full justify-center rounded-md bg-blue-500 text-white px-3 py-1.5 text-sm font-semibold "
                  onClick={() => goToAddPlayers()}
              >
                  Añadir Jugadores
                </button>
                <button
                  type="button"
                  className="flex mt-3 w-full justify-center rounded-md bg-blue-500 text-white px-3 py-1.5 text-sm font-semibold "
                  onClick={() => createNewTeam()}
              >
                  Crear Equipo
                </button>
              </div>

              {showInput ? 
                <div className="flex flex-col">

                      <input onChange={handleChangeInput} type="text" className="block w-full mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={inputValue}/>

                      {!showingPlayers ? 
                      <div className="flex flex-col">
                        <button className="bg-blue-500 font-medium mt-4 text-white" onClick={() => searchPlayer()}>Buscar</button> 
                        {newTeamPlayersData.length > 0 ? 
                           <button className="bg-blue-500 font-medium mt-4 text-white" onClick={() => finish()}>Finalizar</button> 
                          : null}
                      </div>
                      :  
                      <button className="bg-blue-500 font-medium mt-4 text-white" onClick={() => resetSearch()}>Resetear</button>}
                      </div>  
                      : null}


                {load ? <div className="flex items-center justify-center mt-4"> <Spinner/> </div> : null}

          

              {possiblePlayers.length > 0 ? 
                  <div className="flex flex-col items-start justify-start overflow-y-auto max-h-[100px] lg:max-h-[140px]  2xl:max-h-[220px]">
                      {possiblePlayers.map((pp) => (
                          <div className="flex flex-col items-start justify-start" key={pp.player_id}>
                              <p className="cursor-pointer font-medium" onClick={() => addPlayer(pp)}> {pp.player_complete_name}</p>
                          </div>
                      ))}
                  </div> 
              : null}

        
          </div>

        </div>

    </div>
  )
}

export default CreateTeam
