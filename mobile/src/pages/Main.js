import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

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

  if (!currentRegion)
    return null;

  return (
    <View style={styles.container}>
      <MapView initialRegion={currentRegion} style={styles.mapStyle} >
        <Marker coordinate={{ latitude: -3.1102162, longitude: -59.9852251 }}>
          <Image style={styles.avatar} source={{ uri: 'https://www.sideshow.com/storage/product-images/903188/bb-8_star-wars_silo.png' }} />

          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'marcosmapl' });
          }}>
            <View style={styles.callout}>
              <Text style={styles.developerName}>Marcos Lima</Text>
              <Text style={styles.developerBio}>Computer Science Student ar Federal University of Amazonas</Text>
              <Text style={styles.developerTechs}>Python, Java, C, SQL</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
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
});

export default Main;