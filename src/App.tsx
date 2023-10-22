import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from "./pages/user/UserProfile";
import Main from "./pages/main/Main";
import {useAppDispatch} from "./hook/redux";
import {actionAuthUser} from "./redux/user/userStore";
import Header from "./components/header/Header";
import './index.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(actionAuthUser());
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </section>
  );
}

export default App;
