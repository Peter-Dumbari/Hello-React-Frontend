import './App.css';
import { Provider } from 'react-redux';
import Greeting from './Components/greeting';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Greeting />
    </Provider>
  );
}

export default App;
