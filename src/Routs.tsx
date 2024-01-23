import { Route, Routes } from "react-router-dom"
import {Login} from "./screens/Login"
import Dashboard from "./screens/Dashboard"

const Routs = () => {
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Routs
