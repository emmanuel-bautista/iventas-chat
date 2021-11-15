import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./features/Chat/Chat";
import Login from "./features/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { isAuthenticated } from "./features/Auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <Chat /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/login"
        element={authenticated ? <Navigate to={"/"} /> : <Login />}
      />
    </Routes>
  );
}

export default App;
