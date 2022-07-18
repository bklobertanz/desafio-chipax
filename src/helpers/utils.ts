export const calcPerformanceTimeInSec = (initialTime: number, finalTime: number) => {
  const ONE_SEC_IN_MS = 1000
  return (finalTime - initialTime) / ONE_SEC_IN_MS
}
export const word2Letters = (word: string): string[] => word.split('')
