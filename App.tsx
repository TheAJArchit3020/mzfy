

import 'react-native-gesture-handler';
import Routing from '@managers/routing';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { PostHogProvider } from 'posthog-react-native';


function App() {


  return (
    <>

      <Provider store={store} >
        <NavigationContainer>
          <PostHogProvider apiKey="phc_Pqr7lQXnSJZe91LFSTJjbVhTyZXV90Ky3n00MeNzuAl" options={{
            host: "https://eu.i.posthog.com",
          }}>
            <Routing />
          </PostHogProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}



export default App;
