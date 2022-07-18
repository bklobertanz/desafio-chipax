import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://rickandmortyapi.com/api'

const fetchAll = async <T>(resource: string, pageNumber?: number) => {
  const url = pageNumber ? `${BASE_URL}/${resource}/?page=${pageNumber}` : `${BASE_URL}/${resource}`

  const requestInit: RequestInit = {
    method: 'GET'
  }

  const result = await fetch(url, requestInit)
  if (result.status !== StatusCodes.OK) throw new Error(`${result.status}: ${result.statusText}`)

  const data = await result.json()
  return <T>data
}
const fetchOne = async <T>(url: string) => {
  const requestInit: RequestInit = {
    method: 'GET'
  }

  const result = await fetch(url, requestInit)
  if (result.status !== StatusCodes.OK) {
    console.log(result.headers)
    throw new Error(`${result.status}: ${result.statusText}`)
  }
  const data = await result.json()
  return <T>data
}
export default { fetchAll, fetchOne }
