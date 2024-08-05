import React from 'react'
import { TeamType } from '../types/teamType'
import {  useState } from "react";
import backendUrl from "../config/apiUrl";
import handleError from "../utils/handleAxiosErrors";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { succesToastView, errorToastView } from "../utils/toastFunctions";
import AddNewPlayer from './AddNewPlayer';


interface Props { 
    userTeams: TeamType[],
    getTeams: () => void
}

type NewNameTeam = { 
    name: string
  };

const TeamCardData = ({userTeams, getTeams}: Props) => {

    const [load, setLoad] = useState<boolean>(false);
    const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>("");
    const [selectedTeamIdToBeEdited, setSelectedTeamIdToBeEdited] = useState<string | undefined>("");
    const [selectedTeamIdToAddNewPlayer, setSelectedTeamIdToAddNewPlayer] = useState<string | undefined>("");
    const [newName, setNewName] = useState<string>("");

      const handleViewPlayers = (teamId: string | undefined) => {
        setSelectedTeamId(selectedTeamId === teamId ? undefined : teamId);
      };
  
      const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
      };
  
      const changeTeamName = async () => {
        const teamId = selectedTeamIdToBeEdited;
        const teamData: NewNameTeam = { 
          name: newName
        };
        try {
          const { data, status } = await backendUrl.put(`/teams/changeName/${teamId}`, teamData);
          if (status === 200) { 
            succesToastView(data);
            setSelectedTeamIdToBeEdited("");
            getTeams();
          }
        } catch (error) {
          handleError(error, setLoad);
        }
      };
  
      const deleteTeam = async (teamId: string | undefined) => {
        try {
          const { data, status } = await backendUrl.delete(`/teams/deleteTeam/${teamId}`);
          if (status === 200) { 
            succesToastView(data);
            getTeams();
          }
        } catch (error) {
          handleError(error, setLoad);
        }
      };

      const verifyTeamPlayers = async (team: TeamType) => {
        if(team.players.length === 5) { 
            errorToastView("El equipo ya cuenta con 5 jugadores")
        } else { 
            setSelectedTeamIdToAddNewPlayer(team._id)
        }
      };


  return (
    <div className='w-full flex flex-col items-center justify-center'>
       {userTeams.map((us: TeamType) => (
          <div key={us._id} className="flex flex-col justify-between w-full lg:w-3/4 border shadow-xl rounded-lg mt-3">
            <div className="flex justify-between w-full p-4">
              <div className="flex flex-col">
                {selectedTeamIdToBeEdited !== us._id ? (
                  <p><b>Nombre:</b> {us.name}</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <p><b>Nombre:</b></p>
                    <input 
                      type="text" 
                      value={newName}
                      className="block w-full mt-1 h-6 rounded-md border py-1.5 text-gray-900 shadow-sm"
                      onChange={handleChangeTeamName}
                    />
                    {newName.length > 0 && (
                      <button className="bg-blue-500 text-white font-medium h-6 2xl:h-8 w-36 rounded-lg" onClick={changeTeamName}>Confirmar</button>
                    )}
                  </div>
                )}
                <p><b>Jugadores:</b> {us.players.length}</p>

                <p className="font-bold text-black">Estado: <b className={us.players.length === 5 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{us.players.length === 5 ? "Completo" : "Incompleto"}</b></p>

                {us.players.length > 0 && (
                  <p className="text-red-500 cursor-pointer text-xs underline" onClick={() => handleViewPlayers(us._id)}>Ver Jugadores</p>
                )}
                {selectedTeamId === us._id && (
                  <div className="mt-2">
                    <b>Lista de Jugadores:</b>
                    <ul>
                      {us.players.map(player => (
                        <div key={player.id} className="flex items-center gap-2">
                          <img src={player.image} className="rounded-xl h-6 w-6" alt={player.name} />
                          <li>{player.name}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                     <DropdownItem className="cursor-pointer" key="add" onClick={() => verifyTeamPlayers(us)}>Añadir Jugador</DropdownItem>      
                    <DropdownItem className="cursor-pointer" key="edit" onClick={() => setSelectedTeamIdToBeEdited(us._id)}>Editar</DropdownItem>      
                    <DropdownItem className="cursor-pointer" key="delete" onClick={() => deleteTeam(us._id)}>Eliminar</DropdownItem>      
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            {selectedTeamIdToAddNewPlayer === us._id ? 
              <div>
                <AddNewPlayer teamData={us} getTeams={getTeams}/>
              </div> 
              :
              null
            }
          </div>
        ))}
    </div>
  )
}

export default TeamCardData
