import  { useEffect, useState } from 'react'
import { TeamType } from '../types/teamType'

interface Props { 
    teams: TeamType[] | []
}

const MessageTeamComplete = ({teams}: Props) => {

    const [quantity, setQuantity] = useState<number>(0)

    const checkPlayers = (teams : TeamType[] | []) => {
        if(teams.length > 0) {
            const getTotal = teams.reduce((acc, el) => acc + el.players.length, 0)
            console.log(getTotal)
            setQuantity(getTotal)
        }
    }

    useEffect(() => { 
        checkPlayers(teams)
    }, [teams])

  return (
    <div className={`flex items-center justify-center w-full lg:w-3/4 mt-4 h-12 rounded-lg ${quantity < 10 ? 'bg-red-600' : 'bg-green-800'}`}>
         {quantity < 10 ? 
            <p className='text-white font-bold'>Faltan jugadores para que ambos equipos esten completos</p> : 
            <p className='text-white font-bold'>Ambos equipos estan completos</p> 
         }
    </div>
  )
}

export default MessageTeamComplete
