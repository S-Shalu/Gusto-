import { BrowserRouter, Route } from "react-router-dom";
import home from "./Component/Home/Home";
import filter from "./Component/Filter/Filter";
import details from "./Component/Details";
import Header from './Component/Header'



function App() {
  return (
   
   <BrowserRouter>
  <Header/>
   <Route  exact path="/"  component={home}/>
   <Route path="/filter"  component={filter}/>
   <Route path='/details' component={details}/>
   </BrowserRouter>
  );
}

export default App;
