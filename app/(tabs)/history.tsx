import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem("workoutHistory");
        const parsed = stored ? JSON.parse(stored) : [];
        setHistory(parsed);
      } catch (err) {
        console.error("Failed to load workout history:", err);
      }
    };

    fetchHistory();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "short",  // e.g. "Mon"
      month: "short",    // e.g. "May"
      day: "numeric",    // e.g. "5"
    });
  };

  const removeWorkoutFromHistory = async (workoutToRemove) => {
    try {
      const storedHistory = await AsyncStorage.getItem('workoutHistory');
      const history = storedHistory ? JSON.parse(storedHistory) : [];

      // Filter out the workout
      const updatedHistory = history.filter(workout => workout.date !== workoutToRemove.date);

      // Save the updated history back to AsyncStorage
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));

      // Update state
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to remove workout:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Workout History:</Text>

      {history.map((workout, index) => (
        <View key={index} style={styles.historyCard}>
          <Text style={styles.date}>
            {formatDate(new Date(workout.date))} - {formatTime(workout.timeElapsed)}min
          </Text>
          
          {workout.exercises.map((ex, i) => (
            <View key={i} style={styles.historyInfo}>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              {ex.sets.map((set, j) => (
                <Text key={j} style={styles.setInfo}>
                  {set.reps} reps x {set.weight}lbs
                </Text>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeWorkoutFromHistory(workout)}
          >
            <Text style={styles.removeText}>Remove Workout</Text>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },
  date: {
    color: "#FF9500",
    fontSize: 20,
    marginBottom: 10,
  },
  historyInfo: {
    marginBottom: 10,
  },
  exerciseName: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
  },
  setInfo: {
    color: "#ccc",
    fontSize: 16,
    padding: 5,
  },
  removeBtn: {
    backgroundColor: "rgba(227, 66, 52, 0.3)",
    padding: 9,
    borderRadius: 5,
    marginTop: 10,
    width: "40%",
  },
  removeText: {
    color: "#E34234",
    fontWeight: "semibold",
  },
});
