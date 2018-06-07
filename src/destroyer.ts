import { ActorID } from './actor'

export interface Destroyer {
  destroy(id: ActorID): void
}
