

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Routing from './src/managers/routing';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Routing />
    </>
  );
}



export default App;
