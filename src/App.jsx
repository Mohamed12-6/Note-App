
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Notfound from './components/notfound/notfound'
import Login from './components/Authuncation/login/login'
import Register from './components/Authuncation/register/register'
import { RecoilRoot } from 'recoil'
import AllNotes from './components/allNotes/allNotes'
import ProtctedRouting from './components/ProtctedRouting/ProtctedRouting'

function App() {

  let router=createBrowserRouter([
    {path:"",element:<Layout/>,children:[
        {index:true,element:<ProtctedRouting><Home/></ProtctedRouting>},
        {path:"/home",element:<ProtctedRouting><Home/></ProtctedRouting>},

        {path:"/Authuncation/login",element:<Login/>},
        {path:"/Authuncation/register",element:<Register/>},

        {path:"/allNotes", element:<AllNotes/>} ,

        {path:"*",element:<Notfound/>},

    ]}
  ])
  return (
    <>
    <RecoilRoot>
            <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
    </>
  )
}

export default App
