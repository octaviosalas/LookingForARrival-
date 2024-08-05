import { newTeamPlayers } from "../types/teamType"

interface Props { 
    playersData: newTeamPlayers[] | [],
    remove: (id: string) => void
}

const NewTeamList = ({playersData, remove}: Props) => {

    return (
    <div className="w-full mt-3">
         {playersData.map((pp : newTeamPlayers) => ( 
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={pp.image} className="rounded-xl w-6 h-6"/>
                    <p>{pp.name}</p>
                </div>
                <div className="">
                    <p className="cursor-pointer" onClick={() => remove(pp.id)}>X</p>
                </div>
              </div>
         ))}
    </div>
  )
}

export default NewTeamList

