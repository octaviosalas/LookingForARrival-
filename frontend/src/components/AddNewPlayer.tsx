import { TeamType } from '../types/teamType'
import axios from 'axios'
import {  useState } from 'react'
import { Player } from '../types/players'
import handleError from '../utils/handleAxiosErrors'
import { errorToastView, succesToastView } from "../utils/toastFunctions"
import { newTeamPlayers } from "../types/teamType"
import Spinner from './Spinner'
import NewTeamList from './NewTeamList'
import backendUrl from '../config/apiUrl'
import { userStore } from "../store/store";

interface Props { 
    teamData: TeamType,
    getTeams: () => void
}

interface newPlayersToBeAddType { 
    players: newTeamPlayers[]
}

const AddNewPlayer = ({teamData, getTeams}: Props) => {

    const [possiblePlayers, setPossiblePlayers] = useState<Player[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [showingPlayers, setShowingPlayers] = useState<boolean>(false)
    const [newTeamPlayersData, setNewTeamPlayersData] = useState<newTeamPlayers[]>([]);
    const { user } = userStore();

      const getPlayers = async (name : string) => {
        setLoad(true) 
        try {
        const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=2798f9e9f7a084d535ceaa8edbfaa35a14427bd94d3feb3d0a81e12c533914d5`); 
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
        const playerExists = teamData.players.some(player => player.id === playerData.player_id);
      
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
      }

      const introducePlayersToTheTeam = async () => { 
        const userId = user?._id
        const playersData : newPlayersToBeAddType = ({ 
            players: newTeamPlayersData
        })
        try {
            const {data, status} = await backendUrl.post(`/teams/addNewPlayer/${teamData._id}/${userId}`, playersData)
            if(status === 200) { 
                succesToastView(data)
                getTeams()
            } else { 
                console.log("error")
            }
        } catch (error) {
            handleError(error, setLoad)
            setNewTeamPlayersData([])
        }
      }



  return (
    <div>
         <input 
         onChange={handleChangeInput} 
         type="text" 
         className="block w-full lg:w-2/4 mt-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 " value={inputValue}/>
        
         {!showingPlayers ? 
             <div className="flex flex-col">
                <div className='flex flex-col'>

                {newTeamPlayersData.length > 0 ?
                  <div className="flex  w-full lg:w-2/4 ">
                     <NewTeamList playersData={newTeamPlayersData} remove={removePlayer}/>
                  </div> : null
              }

                    <button className="w-full lg:w-2/4 bg-blue-500 rounded-lg font-medium mt-4 text-white mb-2" onClick={() => searchPlayer()}>Buscar</button>  
                    {newTeamPlayersData.length > 0 ?
                        <div className="flex w-full lg:w-2/4 ">
                            <button  className="w-full bg-blue-500 rounded-lg font-medium mt-1 text-white" onClick={() => introducePlayersToTheTeam()}>Añadir</button>
                        </div> : null
                     }
                   
                    {load ? <div className='flex justify-center w-full lg:w-2/4 mt-2 mb-2'> <Spinner/> </div>: null}

                </div>                    
             </div> : <button className="w-full lg:w-2/4 bg-blue-500 font-medium mt-4 text-white" onClick={() => resetSearch()}>Resetear</button>
          }

                 {possiblePlayers.length > 0 ? 
                  <div className="flex flex-col items-start justify-start  overflow-y-auto max-h-[400px]">
                      {possiblePlayers.map((pp) => (
                          <div className="flex flex-col items-start justify-start" key={pp.player_id}>
                              <p className="cursor-pointer font-medium" onClick={() => addPlayer(pp)}> {pp.player_complete_name}</p>
                          </div>
                      ))}
                  </div> 
              : null}
    </div> 
  )
}

export default AddNewPlayer
