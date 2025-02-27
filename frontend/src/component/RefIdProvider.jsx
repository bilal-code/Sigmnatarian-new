"use client";

import { useState } from "react";
import { RefIdContext } from "../contextApiID";

export default function RefIdProvider({ children }) {
  const [idInput, setIdInput] = useState("");
  const [user, setUserId] = useState("");
  const userIdHandler = (id) => {
    setIdInput(id);
  };
  const refIdHandler = (id) => {
    setUserId(id);
  };
  return (
    <RefIdContext.Provider
      value={{ refId: idInput, userId: user, refIdHandler, userIdHandler }}
    >
      {children}
    </RefIdContext.Provider>
  );
}
