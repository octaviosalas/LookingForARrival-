import { useState } from 'react'

type user = { 
  name: string,
  age: number
}

function App() {
  const [count, setCount] = useState<user>({ 
    name: "Juan",
    age: 10
  })

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
