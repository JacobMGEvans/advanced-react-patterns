// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React, {useContext} from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{on, toggle}} {...props} />
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
const useToggle = () => {
  let context = useContext(ToggleContext)
  if (!context) {
    throw new Error(`useToggle Must be used within a Toggle`)
  }
  return context
}

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

const App = () => (
  <div>
    <Toggle>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <span>Hello</span>
      <ToggleButton />
    </Toggle>
  </div>
)

export default App

/*
eslint
  no-unused-vars: "off",
*/
