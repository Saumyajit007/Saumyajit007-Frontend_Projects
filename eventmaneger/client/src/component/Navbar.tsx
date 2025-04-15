import {NavLink} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-between bg-amber-300 items-center">
      <div className="mx-4 text-2xl my-2 font-bold">
        <p>BookYourEvent</p>
      </div>
      <div className="mx-10">
        <NavLink to="/" className={({isActive})=>isActive?"mx-2 text-xl font-semibold bg-blue-500 px-3 py-1 rounded-2xl text-white":"mx-2 text-xl font-semibold px-3 py-1"}><span>home</span></NavLink>
        <NavLink to="/showevent" className={({isActive})=>isActive?"mx-2 text-xl font-semibold bg-blue-500 px-3 py-1 rounded-2xl text-white":"mx-2 text-xl font-semibold px-3 py-1"}><span>events</span></NavLink>
      </div>
    </div>
  )
}

export default Navbar
