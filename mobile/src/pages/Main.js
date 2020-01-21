import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevepelopers } from '../services/socket';

/**
 * App Main route (screen)
 */
function Main({ navigation }) {

  // array of developers to show on map
  const [developers, setDevelopers] = useState([]);
  // mobile phone current regions
  const [currentRegion, setCurrentRegion] = useState(null);
  // string of all desired techs
  const [techs, setTechs] = useState('');

  /**
   * loads mobile phone initial position if allowed by the user
   */
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const location = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = location.coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }

    }

    loadInitialPosition();
  }, []);

  /**
   * handler function for event 'new-developer'
   * updates developers array with the new developers in search area
   */
  useEffect(() => {
    subscribeToNewDevepelopers(dev => setDevelopers([...developers, dev]));
  }, [developers]);

  /**
   * connects the client with banckend websocket server
   * informs to backend our search area and desired technologies
   */
  function setupWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs,
    );
  }

  /**
   * search for all developers into the search area with that have desired techs
   */
  async function loadDevelopers() {

    // gets mobile phone position
    const { latitude, longitude } = currentRegion;

    // sends a search request to backend,
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
        maxDist: 10000,
      }
    });

    // updates developers array with data returned from backend
    setDevelopers(response.data.devs);

    // after a search we need to keep listening the backend 'new-developer' event
    // and when a new developer is register in our search area, the developer
    // needs to be put into map
    setupWebSocket();
  }

  /**
   * handler method for 'onRegionChangeComplete' event
   * it updates our current region 'state'
   */
  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion)
    return null;

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.mapStyle}
      >
        {developers.map(developer => (
          <Marker
            key={developer._id}
            coordinate={{
              longitude: developer.location.coordinates[0],
              latitude: developer.location.coordinates[1]
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: developer.avatar_url }}
            />

            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: developer.github_username });
            }}>
              <View style={styles.callout}>
                <Text style={styles.developerName}>{developer.name}</Text>
                <Text style={styles.developerBio}>{developer.bio}</Text>
                <Text style={styles.developerTechs}>{developer.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar Devs por Tecnologia...'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          onPress={loadDevelopers}
          style={styles.loadButton}
        >
          <MaterialIcons
            name='my-location'
            size={20}
            color='#FFF'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },

  callout: {
    width: 260,
  },

  developerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  developerBio: {
    color: '#666',
    marginTop: 5,
  },

  developerTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 20,
    zIndex: 5,
    // display: 'flex'; it's default value
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default Main;