
export type Set = {
    reps: number,
    weight: number,
}

export type Exercise = {
    name: string,
    sets: Set[],
}

export type Workout = {
    date: string,
    timeElapsed: number,
    exercises: Exercise[],
}

export type ExerciseSet = {
    id: string,
    weight: string,
    reps: string,
    completed: boolean,
}

export type SetCardProps = {
    exercise: Exercise,
    sets: ExerciseSet[],
    onUpdateSets: (updatedSets : ExerciseSet[]) => void,
    onRemove: () => void,
}