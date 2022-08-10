import { executeExerciseOne } from './exercises/exerciseOne'
import executeExerciseTwo from './exercises/exerciseTwo'
import { EXERCISE_ONE_NAME, EXERCISE_TWO_NAME } from './common/constants'

const executeChallenge = async () => {
  const promises = [executeExerciseOne(EXERCISE_ONE_NAME), executeExerciseTwo(EXERCISE_TWO_NAME)]
  const results = await Promise.all(promises)
  console.log(JSON.stringify(results, undefined, 2))
}
executeChallenge().then()
