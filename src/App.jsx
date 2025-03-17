import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Login } from "./pages/Login"; 
import { Private } from "./pages/Private";
import NavbarMain from "./components/navbar/NavbarMain"; 
import HeroMain from "./components/HeroSection/HeroMain";



function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      {user && <NavbarMain />} {/* Navbar will only show if user is logged in */}
      {user && <HeroMain />} {/* Navbar will only show if user is logged in */}
      
      <Routes>
        <Route path="/" element={<Login user={user} />} />
        <Route path="/private" element={user ? <Private /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
