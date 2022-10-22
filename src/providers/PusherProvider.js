import React, { createContext } from "react";

const PusherContext = createContext()

function PusherProvider({ instance, children }) {
  return (
    <PusherContext.Provider value={{ instance }}>
      {children}
    </PusherContext.Provider>
  )
}

export { PusherProvider, PusherContext }

