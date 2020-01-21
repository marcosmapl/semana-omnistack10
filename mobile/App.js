import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

// ignore yellow box warning when the client connects with server
// TODO: fix ti
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection',
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}