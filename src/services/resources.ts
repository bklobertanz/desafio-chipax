import { resourceNameType, RickAndMortyAPIResponse } from '../types/types'
import api from './api/api'

export const getResourceInfo = async <T>(
  resourceName: resourceNameType
): Promise<RickAndMortyAPIResponse<T>> => api.fetchAll(resourceName)

export const getAllResources = async <ResourceType>(resourceName: resourceNameType) => {
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
