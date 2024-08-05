import { userStore } from '../store/store'

const Main = () => {

  const userData = userStore(state => state.user)

  return (
    <div className='flex flex-col items-center justify-center'>
         <h2 className="mt-10 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900"> BIENVENIDO </h2>
         <p className='mt-2 text-center text-xl font-medium leading-9 tracking-tight text-gray-900'>{userData?.name}</p>
    </div>
  )
}

export default Main
