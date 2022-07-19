import { countWordByLetter, wordsCounter } from '../exercises/exerciseOne'

describe('ExerciseOne', () => {
  describe('countWordByLetter fx', () => {
    it('should return how many letters there are in a given word', () => {
      // arrange
      const letter = 'a'
      const word = 'abacus'
      const expectedResult = 2
      // act
      const result = countWordByLetter(word, letter)
      // assert
      expect(result).toBe(expectedResult)
    })
  })
  describe('wordsCounter fx', () => {
    it('should return how many letters a list of given words has', () => {
      // arrange
      const letter = 'a'
      const words = ['abacus', 'back', 'hello', 'again']
      const expectedResult = 5
      // act
      const result = wordsCounter(words, letter)
      // assert
      expect(result).toBe(expectedResult)
    })
  })
})
