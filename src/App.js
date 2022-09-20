import Home from "./Home";
import { SearchFilter } from "./SearchFilter";
import { Route, Routes } from "react-router-dom";
import { InfosPodcast } from "./InfosPodcast";
import { Login } from "./Login";
import React, { useState } from "react";
import { Menu } from "./Menu";
import { Subscriptions } from './Subscriptions'

export const TokenContext = React.createContext();
export default function App() {
  const [access_token, setAccess_token] = useState(null)
  const variablesContext = { access_token, setAccess_token }
  return (
    <TokenContext.Provider value={variablesContext}>
      <Menu />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/infoPodcast/:podcastId" element={<InfosPodcast />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subsriptions" element={<Subscriptions />} />
          <Route path="/search" element={<SearchFilter />} />
        </Routes>
      </div>
    </TokenContext.Provider>
  );
}

