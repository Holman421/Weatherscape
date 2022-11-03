import { Route, Routes } from "react-router-dom";
import Home from "./pages/Logged/LogHome";
import AddTown from "./pages/Logged/AddTown";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import UnLogHome from "./pages/Unlogged/UnLogHome";

const App = () => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="App">
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<Home UserID={user.uid} />} />
            <Route path="/addtown" element={<AddTown />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<UnLogHome />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
