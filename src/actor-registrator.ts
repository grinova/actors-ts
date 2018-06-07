import { ActorID } from './actor'
import { MessageHandler } from './message-handler'

export interface ActorRegistrator {
  register(id: ActorID, handler: MessageHandler): boolean
}
