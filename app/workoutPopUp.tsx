import { StyleSheet, Text, TouchableOpacity, View, Keyboard, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import SetCard from '../components/setCard';
import SearchBar from '../components/SearchBar';
import WorkoutSummary from '../components/WorkoutSummary';

import { exercises } from '@/constants/exercises';
import { Ionicons } from '@expo/vector-icons';

import * as Haptics from "expo-haptics";
import { router } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutPopUp = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercise, setSelectedExercise] = useState<Exercise[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [workoutFinished, setWorkoutFinished] = useState(false);
    const [workoutSummary, setWorkoutSummary] = useState<Exercise[]>([]);
    const [workoutDate, setWorkoutDate] = useState(null);

    const timeRef = useRef(null);

    useEffect(() => {
        timeRef.current = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000); // updates every second

        return () => clearInterval(timeRef.current);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const closeSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleAddSet = () => {
        setShowSearch(!showSearch);
    };

    const handleAddExercise = (exercise: Exercise) => {
        const newExercise = { ...exercise, sets: [] }; // add empty sets array
        // Avoid duplicates
        if (!selectedExercise.some(e => e.name === exercise.name)) {
            setSelectedExercise([...selectedExercise, newExercise]);
        }
        setShowSearch(false);
    };

    const removeExercise = (exToRemove: string) => {
        setSelectedExercise((prev) => prev.filter(ex => ex.name !== exToRemove));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    };

    const handleFinishWorkout = () => {
        clearInterval(timeRef.current);
        setWorkoutFinished(true);

        const now = new Date();
        setWorkoutDate(now);

        const summary = selectedExercise.map((exercise) => ({
            name: exercise.name,
            sets: exercise.sets || [],
        }));

        setWorkoutSummary(summary);

        const workoutData = {
            date: now.toISOString(),
            timeElapsed,
            exercises: summary,
        };

        const storeWorkout = async () => {
            try {
                const prev = await AsyncStorage.getItem("workoutHistory");
                const prevHistory = prev ? JSON.parse(prev) : [];
                const updatedHistory = [workoutData, ...prevHistory];
                await AsyncStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));
            } catch (error) {
                console.error("Failed to save to workout history", error);
            }
        };

        storeWorkout();
    };

    const resetWorkout = () => {
        setSelectedExercise([]);
        setWorkoutFinished(false);
        setWorkoutSummary([]);
        setWorkoutDate(null);
        setTimeElapsed(0);
        setSearchTerm("");
        setShowSearch(false);
    };

    return (
        <View style={styles.overlay}>
            <Text style={styles.headerText}>Workout Started</Text>

            <View style={{ flexDirection: "row", gap: 10, paddingBottom: 20 }}>
                <Ionicons name="timer-outline" size={26} style={{ color: "#fff", marginLeft: 15 }} />
                <Text style={{ color: "#fff", fontSize: 20 }}>
                    {formatTime(timeElapsed)}
                </Text>
            </View>

            <TouchableOpacity style={styles.finishBtn} onPress={handleFinishWorkout}>
                <Text style={styles.finishText}>Finish</Text>
            </TouchableOpacity>

            {showSearch && (
                <View style={styles.searchDropdown}>

                    <TouchableOpacity onPress={closeSearch}>
                        <Ionicons name="close" size={32} style={{ color: "#fff", alignSelf: "center" }} />
                    </TouchableOpacity>

                    <SearchBar value={searchTerm} onChangeText={setSearchTerm} />

                    <FlatList
                        data={filteredExercises}
                        keyExtractor={(item) => item.name}
                        style={{ maxHeight: 800 }}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <View style={styles.searchResult}>
                                <Text style={{ color: "#fff", fontSize: 20 }}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleAddExercise(item);
                                        setSearchTerm("");
                                    }}
                                >
                                    <Text style={styles.addButton}>+ Add</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}

            <FlatList
                data={selectedExercise}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingBottom: 120 }} // So inputs aren't stuck at bottom
                renderItem={({ item, index }) => (
                    <SetCard
                        exercise={item}
                        sets={item.sets}
                        onUpdateSets={(newSets) => {
                            const updatedExercises = [...selectedExercise];
                            updatedExercises[index].sets = newSets;
                            setSelectedExercise(updatedExercises);
                        }}
                        onRemove={() => removeExercise(item.name)}
                    />
                )}
                ListFooterComponent={
                    <View style={{ height: 10 }} /> // buffer so last input clears the keyboard
                }
                keyboardShouldPersistTaps="handled"
            />

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.addExerciseBtn}
                    onPress={() => {
                        handleAddSet();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                >
                    <Text style={{ color: "#FF9500", fontSize: 28, alignSelf: "center" }}>
                        Add Exercise
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                        resetWorkout();
                        router.back(); // go back to the previous screen
                    }}>
                    <Text style={styles.cancelText}>Cancel Workout</Text>
                </TouchableOpacity>
            </View>

            {workoutFinished && (
                <WorkoutSummary
                    summary={workoutSummary}
                    date={workoutDate}
                    timeElapsed={timeElapsed}
                    onClose={() => {
                        setWorkoutFinished(false);
                        resetWorkout();
                        router.replace("/history"); // navigate to history cleanly (optional)
                    }}
                />
            )}
        </View>
    );
};

export default WorkoutPopUp;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#000",
    },
    popup: {
        padding: 20,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100%",
        paddingBottom: 80,
    },
    headerText: {
        color: "#fff",
        fontSize: 24,
        marginTop: 55,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
        marginRight: 180,
    },
    finishBtn: {
        backgroundColor: "rgba(69, 100, 191, 0.5)",
        borderRadius: 10,
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 10,
        position: "absolute",
        top: 62,
        right: 25,
    },
    finishText: {
        color: "#82aefa",
        fontSize: 20,
    },
    searchDropdown: {
        position: "absolute",
        top: 40, // adjust based on where your search bar is
        left: 0,
        right: 0,
        backgroundColor: "#222",
        zIndex: 10,
        borderRadius: 8,
        padding: 10,
    },
    addExerciseBtn: {
        backgroundColor: "rgba(255, 149, 0, 0.3)",
        width: "90%",
        borderRadius: 20,
        marginVertical: 10,
    },
    searchResult: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingHorizontal: 10,
    },
    addButton: {
        color: "#FF9500",
        fontWeight: "bold",
        fontSize: 20,
    },
    cancelBtn: {
        backgroundColor: "rgba(227, 66, 52, 0.3)",
        width: "90%",
        borderRadius: 20,
        marginVertical: 10,
        marginBottom: 50,
    },
    cancelText: {
        color: "#E34234",
        fontSize: 28,
        alignSelf: "center",
    },
});
