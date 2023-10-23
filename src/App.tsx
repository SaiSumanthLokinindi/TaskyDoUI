import Button from "./components/Button/button"
import Configuration from "./components/Configuration"
import Input from "./components/Input/input"


function App() {
  return <Configuration>
    <Input type="text" placeholder="Enter something" defaultValue="Hello" disabled/>
    <Input type="text" placeholder="Enter something" defaultValue="Hello" readOnly/>
    <Button href="www.google.com">Login</Button>
    </Configuration>
}

export default App
