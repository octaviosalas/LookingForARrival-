import React from 'react'
import { useState } from 'react'
import backendUrl from '../config/apiUrl'
import { userStore } from '../store/store'
import handleError from '../utils/handleAxiosErrors'
import {toast} from "react-toastify"
import {useNavigate } from 'react-router-dom'

type userName = { 
    name: string
}

interface Props { 
    cancelOperation: () => void
}

const Login = ({cancelOperation}: Props) => {

    const [name, setName] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()
    const {setUserAccountData} = userStore()

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }
    
    
    const createUser = async () => { 
        setLoad(false)
        const newUserData : userName = ({ 
            name: name
        })
        try {
            const {data, status} = await backendUrl.post("/users/login", newUserData)
            if(status === 200) { 
                setLoad(false)
                setUserAccountData(data.userData)
                toast.success(data.data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                navigate("/main")

            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

  return (
    <div>
       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" > Ingresa tu Nombre  </label>
                        <div className="flex flex-col mt-2">
                            <input  type="text" className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                            onChange={handleChangeName}  />
                        </div>
                 </div>
                 <div className='flex flex-col items-center justify-center mt-4'>
                     <button className='w-full h-10 bg-blue-500 font-medium text-white rounded-md' onClick={() => createUser()}>Ingresar</button>
                     <button className='w-full h-10 mt-2 bg-blue-500 font-medium text-white rounded-md' onClick={() => cancelOperation()}>Cancelar</button>
                 </div>
                 {load ? <div> Cargando..  </div> : null}
       </div>
    </div>
  )
}

export default Login
