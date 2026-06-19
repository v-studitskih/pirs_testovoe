import { Routes, Route } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import Home from "../pages/Home";
import UserInfo from "../pages/UserInfo";
import CreateUser from "../pages/CreateUser";
import Footer from "../widgets/Footer";
import UpdateUser from "../pages/UpdateUser";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="user">
            <Route index element={<Home />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="update" element={<UpdateUser />} />
            <Route path=":userId" element={<UserInfo />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
