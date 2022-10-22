import React from "react";

const PusherContext = React.createContext()

function PusherProvider({ instance, children }) {
  return (
    <PusherContext.Provider value={{ instance }}>
      {children}
    </PusherContext.Provider>
  )
}

function usePusher() {
  const context = React.useContext(PusherContext)
  
  if (!context) {
    throw new Error("usePusher must be used within a PusherProvider")
  }

  const { instance } = context
  return instance
}

export { PusherProvider, usePusher }

