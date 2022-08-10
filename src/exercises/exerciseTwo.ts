/* eslint-disable no-use-before-define */
import { resourceNames } from '../enums/resources'
import { Character, Episode } from '../types/types'
import { getAllResources } from '../services/resources'
import { calcPerformanceTimeInSec, generateAnswer } from '../helpers/utils'

const executeExerciseTwo = async (
  exerciseName: string
): Promise<Record<string, string | boolean | Record<string, string | number | string[]>[]>> => {
  const initialTime = performance.now()

  const [charResults, epiResults] = await getAllResourcesData()

  const characters = charResults as Character[]
  const episodes = epiResults as Episode[]

  const charactersOriginMap = generateHelper(characters)

  const episodesLocations = getEpisodesLocations(episodes, charactersOriginMap)

  const finalTime = performance.now()

  const performanceTimeInSeconds = calcPerformanceTimeInSec(initialTime, finalTime)
  return generateAnswer(exerciseName, performanceTimeInSeconds, episodesLocations)
}

const getAllResourcesData = async (): Promise<(Character[] | Episode[])[]> => {
  const resourcePromises = [
    getAllResources<Character>(resourceNames.character),
    getAllResources<Episode>(resourceNames.episode)
  ]
  return Promise.all(resourcePromises)
}

const generateHelper = (characters: Character[]): Map<string, string> =>
  new Map(characters.map((character: Character) => [character.url, character.origin.name]))

const getEpisodesLocations = (
  episodes: Episode[],
  charactersOriginMap: Map<string, string>
): Record<string, string | string[]>[] =>
  episodes.map(({ name, episode, characters: episodeCharacters }) => ({
    name,
    episode,
    locations: getEpisodeLocations(episodeCharacters, charactersOriginMap)
  }))

const getEpisodeLocations = (
  episodeCharacters: string[],
  charactersOriginMap: Map<string, string>
): string[] =>
  Array.from(
    new Set(
      episodeCharacters.map(
        (episodeCharacter: string) => charactersOriginMap.get(episodeCharacter)!
      )
    )
  )

export default executeExerciseTwo
