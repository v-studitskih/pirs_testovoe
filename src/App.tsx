import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UserInfo from "./pages/UserInfo"
import CreateUser from "./pages/CreateUser"
import Footer from "./components/Footer"
import UpdateUser from "./pages/UpdateUser"


function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Home />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/update" element={<UpdateUser />} />
          <Route path="/user/:userId" element={<UserInfo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
