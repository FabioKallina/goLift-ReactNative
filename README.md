# goLift: A Workout Tracker App

A simple yet powerful Workout Tracker App built with **React Native** and **Expo**.

This app features:
- 🏋🏼‍♀️ Over 60 exercises including pictures and instructions
- 📆 A start page to initialize your workout
- 🏋️ Add and track sets, reps, and weight for each exercise
- 🧾 End-of-workout summary popup
- 📝 History pages that tracks previous workouts

---

## 📁 File Structure

```
goLift/
│
├── node_modules/
│
├── .expo/
│
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── history.tsx
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   │   └── search.tsx
│   │
│   ├── workoutPopUp.tsx
|   └── _layout.tsx
|   
├── assets/
│   ├── exercise-images/
│   │
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   │
│   ├── icons/
│   │   └── stars.png
│   │
│   ├── images/
│       ├── default-profile.jpg
│       └── stars.png
│   
├── components/
│   ├── ExerciseCard.tsx
│   ├── SearchBar.tsx
│   ├── setCard.tsx
│   ├── SwipeToDelete.tsx
│   └── WorkoutSummary.tsx
│   
├── constants/
│   ├── icons.ts
│   ├── images.ts
│   └── exercises.js
│   
├── interfaces/
│   └── interface.d.js
│   
├── types/
│   ├── workout.ts
│   └── images.d.js
│   
├── .gitignore
├── app.json
├── expo-env.d.ts
├── tsconfig.json
├── package-lock.json
└── package.json

```

---

## 🚀 Getting Started

### 1. **Clone The Repository**
```bash
git clone https://github.com/FabioKallina/goLift-ReactNative.git
cd goLift-ReactNative
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run The App**
```bash
npx expo start
```

- 📱 On iPhone: scan the QR code using the Camera app
- 🤖 On Android: scan with the Expo Go app
- 💻 On Web/Simulator: follow terminal instructions

---

## 🛠 Built With

- **ReactNative + Expo**
- **JavaScript + TypeScript**
- **AsyncStorage** for persistent storage

---
