import { resourceNames } from '../enums/resources'
import { Character, Episode } from '../types/types'
import { getAllResources } from '../services/resources'
import { calcPerformanceTimeInSec, generateAnswer } from '../helpers/utils'

const executeExerciseTwo = async (exerciseName: string) => {
  const initialTime = performance.now()
  const resourcePromises = [
    getAllResources<Character>(resourceNames.character),
    getAllResources<Episode>(resourceNames.episode)
  ]
  const [charResults, epiResults] = await Promise.all(resourcePromises)
  const characters = charResults as Character[]
  const episodes = epiResults as Episode[]

  const charactersOriginMap = new Map(
    characters.map((character: Character) => [character.url, character.origin.name])
  )
  const episodesLocations = episodes.map(({ name, episode, characters: episodeCharacters }) => ({
    name,
    episode,
    locations: Array.from(
      new Set(
        episodeCharacters.map(
          (episodeCharacter: string) => charactersOriginMap.get(episodeCharacter)!
        )
      )
    )
  }))
  const finalTime = performance.now()

  const performanceTimeInSeconds = calcPerformanceTimeInSec(initialTime, finalTime)
  return generateAnswer(exerciseName, performanceTimeInSeconds, episodesLocations)
}

export default executeExerciseTwo
