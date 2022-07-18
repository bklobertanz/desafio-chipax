const deserializeNames = (results: Record<string, any>[]): string[] => {
  const numberOfLevels = 1
  const otherResults = results.flat(numberOfLevels).map((auxResult: any) => auxResult.results)
  return otherResults.flat(numberOfLevels).map((otherResult: any) => otherResult.name)
}

export default deserializeNames
