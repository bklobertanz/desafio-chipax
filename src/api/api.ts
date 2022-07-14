import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://rickandmortyapi.com/api'

const fetchAll = async (resource: string, pageNumber?: number) => {
  const url = pageNumber ? `${BASE_URL}/${resource}/?page=${pageNumber}` : `${BASE_URL}/${resource}`

  const requestInit: RequestInit = {
    method: 'GET'
  }

  const result = await fetch(url, requestInit)
  if (result.status !== StatusCodes.OK) throw new Error(`${result.status}: ${result.statusText}`)

  const data = await result.json()
  return data
}

export default { fetchAll }
