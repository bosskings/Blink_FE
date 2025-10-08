import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const InitialScreen = () => {
  
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      
      <View>
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/icon.png')}
          />
        </View>
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={'white'}
        />
      </View>
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066CC",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});