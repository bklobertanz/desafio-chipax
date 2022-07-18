export const calcPerformanceTimeInSec = (initialTime: number, finalTime: number) => {
  const ONE_SEC_IN_MS = 1000
  return (finalTime - initialTime) / ONE_SEC_IN_MS
}

export const isInTime = (performanceTime: number) => {
  const thresholdTimeInS = 3
  return performanceTime < thresholdTimeInS
}

export const generateAnswer = (
  exerciseName: string,
  time: number,
  results: Record<string, string | number | string[]>[]
) => ({
  exercise_name: exerciseName,
  time,
  in_time: isInTime(time),
  results
})
