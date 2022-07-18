import executeExerciseOne from './exercises/exerciseOne'
import { EXERCISE_ONE_NAME } from './common/constants'

Promise.all([executeExerciseOne(EXERCISE_ONE_NAME)]).then((results) =>
  console.log('hola', JSON.stringify(results, undefined, 2))
)
