import { useState } from "react"
import Register from "./Register"
import Login from "./Login"

const Welcome = () => {

    const [showRegister, setShowRegister] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [hiddenButtons, setHiddenButtons] = useState<boolean>(false)

    
    const wannaRegister = () => { 
        setShowRegister(true)
        setShowLogin(false)
        setHiddenButtons(true)
    }

    const wannaLogin = () => { 
        setShowRegister(false)
        setHiddenButtons(true)
        setShowLogin(true)
    }

    const cancelOperation = () => { 
        setShowRegister(false)
        setHiddenButtons(false)
        setShowLogin(false)
    }



  return (
   <div className='flex flex-col lg:flex-row  w-screen '>
    <div className='w-screen lg:w-2/4 h-screen'>

    <div className="w-full h-full border bg-cover bg-center 
          bg-[url('https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/01/the-30-best-football-teams-in-the-world-ranked-image.jpeg')]" />  
    </div>

       <div className='w-screen lg:w-2/4 h-auto lg:h-screen '>
           <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
             
              {!hiddenButtons ?
                    <div className='flex flex-col lg:flex-row items-center justify-center mt-4 gap-6 '>
                        <button className='w-72 h-10 bg-blue-500 font-medium text-white rounded-md' onClick={() => wannaLogin()}>Tengo cuenta</button>
                        <button className='w-72 h-10 bg-blue-500 font-medium text-white rounded-md' onClick={() => wannaRegister()}>Crear cuenta</button>
                    </div> : null}
              <div>
                {showRegister ? <Register cancelOperation={cancelOperation} goLogin={wannaLogin}/> : null}
                {showLogin ? <Login cancelOperation={cancelOperation}/> :null}
              </div>
           </div>
       </div>

      
     

    </div>
  )
}

export default Welcome
