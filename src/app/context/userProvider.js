"use client";
import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await axios.get("/api/current");
        setUser(response.data.user); // logged in
      } catch (error) {
        if (error.response?.status === 401) {
          // Not logged in → this is NORMAL
          setUser(undefined);
        } else {
          console.error("Unexpected error loading user:", error);
        }
      }
    };

    loadCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
