import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {


    const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">Alquila Tu Cancha</span>
    </div>
    <div className="block lg:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/></svg>
      </button>
    </div>
    <div className={`${isOpen ? '' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
      <div className="text-sm lg:flex-grow">
        <Link to="/myTeams" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-md mr-4">
          Mis Equipos
        </Link>
        <Link to="/createTeam" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-md mr-4">
          Crear Nuevo Equipo
        </Link>
     
      </div>
    </div>
  </nav>
  )
}

export default NavBarComponent
