import { ActorID, Message } from './actor'

export interface Sender {
  send(address: ActorID, message: Message): void
}
