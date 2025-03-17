import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from "./components/ProtectedRoute"; // Fixed import path
import { auth } from "./firebase";
import { Login } from "./pages/Login"; 
import { Private } from "./pages/Private";  // Ensure file name matches

import './App.css';

function App() { 
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
      } else 
      {
        setUser(null);
        setIsFetching(false);
      }
    });

    return () => unsubscribe(); // Corrected function name
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login user={user} />} />
        <Route
          path="/private"
          element={
            <ProtectedRoute user={user}>
              <Private></Private>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
