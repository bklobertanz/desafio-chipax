import api from '../api/api'
import { resourceNames, resourceNameLetter } from '../enums/resources.enum'
import { resourceNameType } from '../types/resources.types'
import { calcPerformanceTimeInSec } from '../helpers/utils'

interface RickAndMortyAPIResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

interface Episode {
  id: number
  episode: string
  name: string
  characters: []
  url: string
  created: string
}

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}
const getResourceInfo = async <T>(
  resourceName: resourceNameType
): Promise<RickAndMortyAPIResponse<T>> => api.fetchAll(resourceName)

const getAllResources = async <ResourceType>(resourceName: resourceNameType) => {
  const { info, results } = await getResourceInfo<ResourceType>(resourceName)
  const { pages: totalPages } = info
  const firstPageResults = [...results]
  const promises: Promise<RickAndMortyAPIResponse<ResourceType>>[] = []
  const initialPage = 2

  for (let pageNumber = initialPage; pageNumber <= totalPages; pageNumber += 1) {
    promises.push(api.fetchAll(resourceName, pageNumber))
  }
  const responses = await Promise.all(promises)
  const otherResults = responses
    .map((response: RickAndMortyAPIResponse<ResourceType>) => response.results)
    .flat()
  return firstPageResults.concat(otherResults)
}

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
