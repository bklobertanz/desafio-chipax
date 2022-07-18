import { Character } from '../types/types'
import api from './api/api'

const getCharacterLocation = async (characterUrl: string) => {
  const { origin } = await api.fetchOne<Character>(characterUrl)
  return origin.name
}

export default getCharacterLocation
