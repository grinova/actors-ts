import { Message } from './actor'

export interface MessageHandler {
  handle(message: Message): void
}
