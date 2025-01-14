import { registerRootComponent } from 'expo';
// index.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/aws-exports'


import App from './App';

Amplify.configure(amplifyconfig)


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
