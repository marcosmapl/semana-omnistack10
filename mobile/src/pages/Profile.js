import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * GitHub Profile view route (screen)
 * Creates a Webview component passing the github user page address
 */
function Profile({ navigation }) {
  const github_username = navigation.getParam('github_username');

  return <WebView sytle={{ flex: 1 }} source={{ uri: `https://github.com/${github_username}` }} />
}
    
export default Profile;