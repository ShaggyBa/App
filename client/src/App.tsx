import {Navigate, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import TaskDetails from "./pages/TaskDetails"
import Login from "./pages/Login"
import Layout from "./layouts/Layout"

import {Toaster} from "sonner"

function App() {


    return (
        <main className='w-full min-h-screen bg-[#f3f4f6]'>

            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<Navigate to={'/dashboard'}/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>

                    <Route path='/tasks' element={<Tasks/>}/>
                    <Route path='/task/:id' element={<TaskDetails/>}/>


                    <Route path='/completed/:status' element={<Tasks/>}/>
                    <Route path='/in-progress/:status' element={<Tasks/>}/>
                    <Route path='/todo/:status' element={<Tasks/>}/>

                    <Route path='/team' element={<Users/>}/>

                    <Route path="/trashed" element={<Trash/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>
            </Routes>

            <Toaster richColors/>
        </main>
    )
}

export default App
