export const calcPerformanceTimeInSec = (initialTime: number, finalTime: number): number => {
  const ONE_SEC_IN_MS = 1000
  return (finalTime - initialTime) / ONE_SEC_IN_MS
}

export const timeMask = (timeInS: number): string => {
  const [secsPart, milisecPart] = `${timeInS}`.split('.')
  const maskedSeconds = `${secsPart}s `
  const maskedMiliseconds = `${milisecPart}ms`
  return `${maskedSeconds}${maskedMiliseconds}`
}
export const isInTime = (performanceTime: number): boolean => {
  const thresholdTimeInS = 3
  return performanceTime < thresholdTimeInS
}

export const generateAnswer = (
  exerciseName: string,
  time: number,
  results: Record<string, string | number | string[]>[]
): Record<string, string | boolean | Record<string, string | number | string[]>[]> => ({
  exercise_name: exerciseName,
  time: timeMask(time),
  in_time: isInTime(time),
  results
})
