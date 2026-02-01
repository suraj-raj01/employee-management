import { Link, Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <div>
      <nav className='font-bold flex md:px-20  items-center md:justify-between justify-center h-15 bg-blue-200'>
        <Link to='/' className='text-2xl'>Employee Management</Link>
        <button className="border p-2 cursor-pointer font-normal rounded-md bg-blue-600 text-white px-5">
          <Link to='/dashboard'>Dashboard</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  )
}

export default LayOut