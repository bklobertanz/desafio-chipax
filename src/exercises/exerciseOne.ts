import { resourceNames, resourceNameLetter } from '../enums/resources'
import { calcPerformanceTimeInSec, generateAnswer } from '../helpers/utils'
import { getAllResources } from '../services/resources'
import { Character, Episode, Location, resourceNameType } from '../types/types'

const countWordByLetter = (word: string, letter: string): number => {
  const regExp = new RegExp(letter, 'gi')
  return word.match(regExp)?.length || 0
}

const wordsCounter = (words: string[], letter: string): number => {
  let wordTotal = 0
  for (let i = 0; i < words.length - 1; i += 1) {
    wordTotal += countWordByLetter(words[i], letter)
  }
  return wordTotal
}
export const generateResults = (letter: string, count: number, resource: resourceNameType) => ({
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
  const resourcePromises = [
    getAllResources<Character>(resourceNames.character),
    getAllResources<Episode>(resourceNames.episode),
    getAllResources<Location>(resourceNames.location)
  ]
  const [charResults, epiResults, locResults] = await Promise.all(resourcePromises)
  const characters = charResults as Character[]
  const episodes = epiResults as Episode[]
  const locations = locResults as Location[]

  const charactersNames = characters.map((character: Character) => character.name)
  const episodesNames = episodes.map((episode: Episode) => episode.name)
  const locationsNames = locations.map((location: Location) => location.name)

  const characterResults = countWordsAndGetResult(
    charactersNames,
    resourceNames.character,
    resourceNameLetter[resourceNames.character]
  )
  const locationResults = countWordsAndGetResult(
    locationsNames,
    resourceNames.location,
    resourceNameLetter[resourceNames.location]
  )
  const episodeResults = countWordsAndGetResult(
    episodesNames,
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
