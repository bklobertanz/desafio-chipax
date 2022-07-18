import { resourceNames } from '../enums/resources'
import { Episode } from '../types/types'
import { getAllResources } from '../services/resources'
import getCharacterLocation from '../services/characters'

export const getEpisodeLocations = async (episode: Episode) => {
  const { characters: charUrls } = episode
  const promises = charUrls.map((charUrl: string) => getCharacterLocation(charUrl))
  const episodeLocations = await Promise.all(promises)
  return Array.from(new Set(episodeLocations))
}
const generateResult = (episode: Episode, locations: string[]) => {
  const { name, episode: episodeId } = episode
  return {
    name,
    episode: episodeId,
    locations
  }
}

const executeExerciseTwo = async () => {
  const episodes = await getAllResources<Episode>(resourceNames.episode)
  const episode = episodes[0]

  const episodeLocations = await getEpisodeLocations(episode)
  console.log(generateResult(episode, episodeLocations))
}

export default executeExerciseTwo
