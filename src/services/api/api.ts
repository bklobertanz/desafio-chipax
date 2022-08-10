import { StatusCodes } from 'http-status-codes'
import fetch from 'node-fetch'

const BASE_URL = 'https://rickandmortyapi.com/api'

const fetchAll = async <T>(resource: string, pageNumber?: number) => {
  const url = pageNumber ? `${BASE_URL}/${resource}/?page=${pageNumber}` : `${BASE_URL}/${resource}`
  const result = await fetch(url)
  if (result.status !== StatusCodes.OK) console.log(`${result.status}: ${result.statusText}`)

  const data = await result.json()
  return <T>data
}
const fetchOne = async <T>(url: string) => {
  const result = await fetch(url)
  if (result.status !== StatusCodes.OK) {
    console.log(`${result.status}: ${result.statusText}`)
  }
  const data = await result.json()
  return <T>data
}
export default { fetchAll, fetchOne }
