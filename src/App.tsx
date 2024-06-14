import { FaClipboard, FaPen } from "react-icons/fa"
import TodoList from "./components/TodoList"
import "./CSS/App.css";

function App() {
 

  return (
    <div>
      <div className="App">
        <div className="header">
          <div className="logoside">
            <FaPen/>
            <h1>What to do</h1>
            <FaClipboard/>
          </div>
        </div>
        <TodoList/>
      </div>
      
    </div>
  )
}

export default App
