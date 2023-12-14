// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";


function App() {
  return (
    <div className="App flex bg-white items-center flex-row box-border overflow-auto">
      <Sidebar/>
      <Output/>
      <Prompt/>
    </div>
  );
}

export default App;
