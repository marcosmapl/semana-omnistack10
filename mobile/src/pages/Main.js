import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity , Dimensions, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

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
      <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder='Buscar Devs por Tecnologia...'
            placeholderTextColor= '#999'
            autoCapitalize='words'
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => {}} style={styles.loadButton}> 
            <MaterialIcons name='my-location' size={20} color='#FFF'/>
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
    // display: 'flex'; eh o padrão
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