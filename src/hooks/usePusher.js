import { useContext } from "react"
import { PusherContext } from "../providers/PusherProvider"

export function usePusher() {
  const context = useContext(PusherContext)
  
  if (!context) {
    throw new Error("usePusher hook must be used within a PusherProvider")
  }

  const { instance } = context
  return instance
}
