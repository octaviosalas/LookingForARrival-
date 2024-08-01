import axios from 'axios'
import { useEffect, useState } from 'react'

type user = { 
  name: string,
  age: number
}

function App() {

    const [count, setCount] = useState<user>({ 
      name: "Juan",
      age: 10
    })

    const getPlayers = async (name : string) => { 
       try {
        const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=2798f9e9f7a084d535ceaa8edbfaa35a14427bd94d3feb3d0a81e12c533914d5`); 

        console.log(response.data)
       } catch (error) {
        console.log(error)
       }
    }

    useEffect(() => { 
      getPlayers("Benzema")
    }, [])

  return (
    <>
      <div>
       
        
      </div>
      <h1 className='text-red-600'>Vite + React</h1>
       
       {count.name}
       {count.age}
       
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
