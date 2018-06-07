import { ActorID, Message } from './actor'
import { ActorRegistrator } from './actor-registrator'
import { MessageHandler } from './message-handler'

export interface DirectMessage {
  address: string
  message: Message
}

export class MessageRouter
implements ActorRegistrator {
  private handlers: Map<ActorID, MessageHandler> = new Map<ActorID, MessageHandler>()

  register(id: ActorID, handler: MessageHandler): boolean {
    const has = this.handlers.has(id)
    this.handlers.set(id, handler)
    return !has
  }

  unregister(id: ActorID): boolean {
    return this.handlers.delete(id)
  }

  route(data: DirectMessage): boolean {
    const handler = this.handlers.get(data.address)
    if (handler) {
      handler.handle(data.message)
      return true
    } else {
      return false
    }
  }
}
