import api from '../api/api'
import deserializeNames from '../deserializer/names.deserializer'
import { resourceNames, resourceNameLetter } from '../enums/resources.enum'
import { resourceNameType } from '../types/resources.types'
import { word2Letters, calcPerformanceTimeInSec } from '../helpers/utils'

const getAllResourcesNames = async (resourceName: resourceNameType, numberOfRequests: number) => {
  const results: Promise<any>[] = []

  for (let i = 0; i < numberOfRequests; i += 1) {
    const pageNumber = i + 1
    results.push(api.fetchAll(resourceName, pageNumber))
  }
  const auxResults = await Promise.all(results)
  return deserializeNames(auxResults)
}

const countWordByLetter = (word: string, letter: string): number => {
  let sum = 0
  const letters = word2Letters(word)
  const index = letters.findIndex((letterElem: string) => letterElem.toLowerCase() === letter)

  if (index === -1) return 0
  for (let i = index; i < letters.length - 1; i += 1) {
    if (letters[i].toLowerCase() === letter) sum += 1
  }

  return sum
}
const wordsCounter = (words: string[], letter: string): number => {
  let wordTotal = 0
  for (let i = 0; i < words.length - 1; i += 1) {
    wordTotal += countWordByLetter(words[i], letter)
  }
  return wordTotal
}
const isInTime = (performanceTime: number) => {
  const thresholdTimeInS = 3
  return performanceTime < thresholdTimeInS
}
const generateAnswer = (
  exerciseName: string,
  time: number,
  results: Record<string, string | number>[]
) => ({
  exercise_name: exerciseName,
  time,
  in_time: isInTime(time),
  results
})
const generateResults = (letter: string, count: number, resource: resourceNameType) => ({
  char: letter,
  count,
  resource
})

const countWordsAndGetResult = (
  resourceNames: string[],
  resourceName: resourceNameType,
  resourceLetter: string
) => {
  const totalLetters = wordsCounter(resourceNames, resourceLetter)
  return generateResults(resourceLetter, totalLetters, resourceName)
}
const executeExerciseOne = async (exerciseName: string) => {
  const initialTime = performance.now()
  const resourcesNames = [
    getAllResourcesNames(resourceNames.character, 42),
    getAllResourcesNames(resourceNames.episode, 3),
    getAllResourcesNames(resourceNames.location, 7)
  ]

  const [characterNames, episodeNames, locationNames] = await Promise.all(resourcesNames)
  const characterResults = countWordsAndGetResult(
    characterNames,
    resourceNames.character,
    resourceNameLetter[resourceNames.character]
  )
  const locationResults = countWordsAndGetResult(
    locationNames,
    resourceNames.location,
    resourceNameLetter[resourceNames.location]
  )
  const episodeResults = countWordsAndGetResult(
    episodeNames,
    resourceNames.episode,
    resourceNameLetter[resourceNames.episode]
  )
  const finalTime = performance.now()

  const performanceTimeInSeconds = calcPerformanceTimeInSec(initialTime, finalTime)

  return generateAnswer(exerciseName, performanceTimeInSeconds, [
    characterResults,
    locationResults,
    episodeResults
  ])
}

export default executeExerciseOne
