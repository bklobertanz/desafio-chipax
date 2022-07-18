import { resourceNameType } from '../types/types'

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
  results: Record<string, string | number>[]
) => ({
  exercise_name: exerciseName,
  time,
  in_time: isInTime(time),
  results
})
export const generateResults = (letter: string, count: number, resource: resourceNameType) => ({
  char: letter,
  count,
  resource
})
