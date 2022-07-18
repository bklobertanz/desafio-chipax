export const calcPerformanceTimeInSec = (initialTime: number, finalTime: number) => {
  const ONE_SEC_IN_MS = 1000
  return (finalTime - initialTime) / ONE_SEC_IN_MS
}

export default calcPerformanceTimeInSec
