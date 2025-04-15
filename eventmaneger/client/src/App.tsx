import './App.css'
import Navbar from './component/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Event from './pages/Event'
import Error from './component/Error'

function App() {

  return (
    <>
     <div className='min-w-full min-h-full'>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/showevent' element={<Event/>}/>
      <Route path='*' element={<Error/>}/>
     </Routes>
     </div>
    </>
  )
}

export default App
