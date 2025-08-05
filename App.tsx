

import 'react-native-gesture-handler';
import Routing from '@managers/routing';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

function App() {


  return (
    <>
      <Provider store={store} >
        <Routing />
      </Provider>
    </>
  );
}



export default App;
