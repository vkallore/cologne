import { useState } from 'react'

export const useToggleState = value => {
  const [stateValue, setStateValue] = useState(value)
  const setToggleState = () => {
    setStateValue(!stateValue)
  }
  return [stateValue, setToggleState]
}
