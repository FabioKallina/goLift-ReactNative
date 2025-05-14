import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '@/constants/images'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {

  const [workoutsCount, setWorkoutsCount] = useState(0);

  const fetchWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem("workoutHistory");
      const parsedWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
      setWorkoutsCount(parsedWorkouts.length)
    } catch (e) {
      console.error("Failed fetching workouts", e)
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, [])

  return (

    <View style={styles.container}>
    <Image source={images.defaultProfile} style={styles.image} />
    <Text style={styles.profileText}>John Doe</Text>
    <Text style={styles.text}>{workoutsCount} Workouts</Text>
    
    <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText}>Log In</Text>
    </TouchableOpacity>

  </View>
);
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
    color: "black",
  },
  text: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  loginBtn: {
    backgroundColor: "#FF9500",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
});