import Button from "./components/Button/button"
import Configuration from "./components/Configuration"
import Input from "./components/Input/input"
import Link from "./components/Link/link"


function App() {
  return <Configuration>
    {/* <Input type="text" placeholder="Enter something" defaultValue="Hello" disabled/>
    <Input type="text" placeholder="Enter something" defaultValue="Hello" readOnly/>
    <Button href="www.google.com">Login</Button>
    <br/>
    <br/> */}
    <Link href='www.google.com'>SignUp</Link>
    </Configuration>
}

export default App
