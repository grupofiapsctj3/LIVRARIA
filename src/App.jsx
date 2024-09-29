import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";



function App() {
  
  return (
    <>
      <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    </>
)}

export default App



