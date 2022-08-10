/* eslint-disable no-use-before-define */
import { resourceNames, resourceNameLetter } from '../enums/resources'
import { calcPerformanceTimeInSec, generateAnswer } from '../helpers/utils'
import { getAllResources } from '../services/resources'
import { Character, Episode, Location, resourceNameType } from '../types/types'

export const executeExerciseOne = async (
  exerciseName: string
): Promise<Record<string, string | boolean | Record<string, string | number | string[]>[]>> => {
  const initialTime = performance.now()

  const [charResults, epiResults, locResults] = await getAllResourcesData()

  const characters = charResults as Character[]
  const episodes = epiResults as Episode[]
  const locations = locResults as Location[]

  const [charactersNames, episodesNames, locationsNames] = getAllResourcesNames(
    characters,
    episodes,
    locations
  )

  const [characterResults, locationResults, episodeResults] = countResourcesNamesAndResult(
    charactersNames,
    locationsNames,
    episodesNames
  )

  const finalTime = performance.now()

  const performanceTimeInSeconds = calcPerformanceTimeInSec(initialTime, finalTime)

  return generateAnswer(exerciseName, performanceTimeInSeconds, [
    characterResults,
    locationResults,
    episodeResults
  ])
}
const getAllResourcesData = (): Promise<(Character[] | Episode[] | Location[])[]> => {
  const resourcePromises = [
    getAllResources<Character>(resourceNames.character),
    getAllResources<Episode>(resourceNames.episode),
    getAllResources<Location>(resourceNames.location)
  ]
  return Promise.all(resourcePromises)
}

const getAllResourcesNames = (
  characters: Character[],
  episodes: Episode[],
  locations: Location[]
): string[][] => {
  const charactersNames = characters.map((character: Character) => character.name)
  const episodesNames = episodes.map((episode: Episode) => episode.name)
  const locationsNames = locations.map((location: Location) => location.name)
  return [charactersNames, episodesNames, locationsNames]
}

const countResourcesNamesAndResult = (
  charactersNames: string[],
  locationsNames: string[],
  episodesNames: string[]
): Record<string, string | number>[] => {
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
  return [characterResults, locationResults, episodeResults]
}

const countWordsAndGetResult = (
  resourceNames: string[],
  resourceName: resourceNameType,
  resourceLetter: string
): Record<string, string | number> => {
  const totalLetters = wordsCounter(resourceNames, resourceLetter)
  return generateResults(resourceLetter, totalLetters, resourceName)
}

export const wordsCounter = (words: string[], letter: string): number =>
  words
    .map((word: string) => countWordByLetter(word, letter))
    .reduce((a: number, b: number) => a + b)

export const countWordByLetter = (word: string, letter: string): number => {
  const regExp = new RegExp(letter, 'gi')
  return Number(word.match(regExp)?.length) || 0
}

const generateResults = (
  letter: string,
  count: number,
  resource: resourceNameType
): Record<string, string | number> => ({
  char: letter,
  count,
  resource
})
