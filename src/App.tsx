import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import UserNews from "./pages/user/UserNews";
import {useAppDispatch} from "./hook/redux";
import {actionAuthUser} from "./redux/user/userStore";
import Main from "./pages/main/Main";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actionAuthUser())
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<UserNews />} />
      </Routes>
    </>
  );
}

export default App;
