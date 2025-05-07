import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const router = useRouter();

type Set = {
    weight: number;
    reps: number;
}

type ExerciseSummary = {
    name: string;
    sets: Set[];
}

type WorkoutSummaryProps = {
    summary: ExerciseSummary[];
    date: Date | null;
    timeElapsed: number;
    onClose: () => void;
}

const WorkoutSummary = ({ summary, date, timeElapsed, onClose }: WorkoutSummaryProps) => {

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            weekday: "short",
          month: "short",
          day: "numeric",
        })
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.popup}>

                <View style={styles.imgContainer}>
                    <Image source={require("@/assets/images/stars.png")} resizeMode="contain" style={styles.headerImg}/>
                    <Text style={{color: "#fff", fontSize: 18 }}>Congratulations on completing</Text>
                    <Text style={{color: "#fff", fontSize: 18 }}>your workout!</Text>
                </View>

                <Text style={styles.header}>WorkoutSummary</Text>
                <Text style={styles.subheader}>{formatDate(date)}</Text>
                <Text style={styles.subheader}>Duration: {formatTime(timeElapsed)} min</Text>

                <ScrollView style={styles.summaryList}>
                    {summary.map((exercise, idx) => (
                        <View key={idx} style={styles.exercise}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            {exercise.sets.map((set, i) => (
                                <Text key={i} style={styles.setText}>
                                    {set.weight}lbs x {set.reps} reps
                                </Text>
                            ))}
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity onPress={() => { onClose(); router.push("/history"); }} style={styles.closeBtn}>
                    <Ionicons name="close" size={32} color="#fff"/>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default WorkoutSummary

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        zIndex: 999,
    },
    popup: {
        position: "absolute",
        top: "5%",
        backgroundColor: "#111",
        borderRadius: 16,
        padding: 20,
        width: "90%",
        maxHeight: "90%",
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
    },
    headerImg: {
        height: 90,
        marginBottom: 20,
    },
    header: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subheader: {
        color: "#ccc",
        fontSize: 16,
    },
    summaryList: {
        marginTop: 10,
    },
    exercise: {
        marginBottom: 10,
    },
    exerciseName: {
        color: "#FF9500",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 10,
    },
    setText: {
        color: "#fff",
        marginTop: 5,
        fontSize: 16,
    },
    closeBtn: {
        marginTop: 20,
        alignSelf: "center",
        paddingVertical: 10,
    },
    closeText: {
        color: "#FF9500",
        fontWeight: "bold",
    },
});