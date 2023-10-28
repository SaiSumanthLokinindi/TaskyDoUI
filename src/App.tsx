
import Card from "./components/Card/card"
import Configuration from "./components/Configuration"
import Input from "./components/Input/input"
import Login from "./pages/Login"


function App() {
  return <Configuration>
    {/* <Card><div style={{height: '300px', width: '500px'}}>
      <Input placeholder='username or email'/>
      <Input disabled placeholder='password'/>
      </div></Card> */}
    <Login/>
    </Configuration>
}

export default App
