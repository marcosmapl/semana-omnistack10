import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

/**
 * Creates a new container with 2 routes Main and Profile (screens)
 * Main - is our map route where we can choose a location and search for techs
 * Profile - shows a developers github profile page
 */
const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no GitHub',
      },
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#7D40E7',
      },
    },
  })
);

export default Routes;