import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

// FIXME: ignore yellow box warning when the client connects with server
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection',
]);

/**
 * Creates mobile app
 */
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}