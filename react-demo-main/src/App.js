import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/Dashboard/404/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import AddEmployee from './components/Dashboard/Employee/AddEmployee';
import RouteDashBoard from './components/Dashboard/RouteDashBoard';
import Login from './components/Login/Login';
import { store } from './redux/app/store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
