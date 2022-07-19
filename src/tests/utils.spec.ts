import { calcPerformanceTimeInSec } from '../helpers/utils'

describe('Utils', () => {
  describe('calcPerformanceTimeInSec fx', () => {
    let initialTime: number
    let finalTime: number
    let expectedResult: number
    beforeEach(() => {
      // arrange
      initialTime = 0
      finalTime = 1000
      expectedResult = 1
    })

    it('should return elapsed time given two input times', () => {
      // act
      const result = calcPerformanceTimeInSec(initialTime, finalTime)
      // assert
      expect(result).toBe(expectedResult)
    })
    it('should expect finalTime to be greater than initialTime', () => {
      expect(finalTime).toBeGreaterThan(initialTime)
    })
  })
})
