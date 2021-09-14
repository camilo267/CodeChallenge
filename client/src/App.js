import './App.css';
import { ListContractorComponent } from './components/ListContractorComponent'
import { ContractorComponent } from './components/ContractorComponent'
import { CreateContractorComponent } from './components/CreateContractorComponent'
import { EditContractorComponent } from './components/EditContractorComponent'
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';

function App() {
  const BASE_URL = 'http://localhost:8080';
  return (
    <div>
    <Navbar />
      <Switch>
        <Route exact path="/contractors">
            <ListContractorComponent  url={ BASE_URL }/>
        </Route>
        <Route exact path="/contractors/add">
          <div className="App">
            <CreateContractorComponent url={ BASE_URL }/>
          </div>
        </Route>
        <Route exact path="/contractors/:id">
          <div className="App">
            <ContractorComponent url={ BASE_URL }/>
          </div>
        </Route>
        <Route exact path="/contractors/edit/:id">
          <div className="App">
            <EditContractorComponent url={ BASE_URL }/>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
