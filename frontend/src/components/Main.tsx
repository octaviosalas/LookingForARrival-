import { userStore } from '../store/store'

const Main = () => {

  const userData = userStore(state => state.user)

  return (
    <div className='flex flex-col items-center justify-center'>
         <p>{userData?.name}</p>
    </div>
  )
}

export default Main
