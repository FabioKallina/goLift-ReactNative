import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground} from 'react-native'
import React from 'react'

import { images } from '@/constants/images'

const Profile = () => {
  return (
    <ImageBackground source={require("@/assets/images/cloud-bg.jpg")} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.container}>
      <Image source={images.defaultProfile} style={styles.image}/>
      <Text style={styles.profileText}>John Doe</Text>
      <Text style={styles.text}> 304 Workouts</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    profileText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        marginTop: 20,
    },
    loginText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "black"
    },
    text: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "#fff",
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    loginBtn: {
        backgroundColor: "#FF9500",
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20
    }
  })