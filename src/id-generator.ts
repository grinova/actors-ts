import { ActorID } from './actor'

export interface IdGenerator {
  newId(): ActorID
}
