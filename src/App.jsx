import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Appbar from './component/Appbar'
import Student from './component/Student'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Appbar />
     <Student />
    </>
  )
}

export default App
