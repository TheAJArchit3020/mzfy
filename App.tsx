

import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Routing from './src/managers/routing';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

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
