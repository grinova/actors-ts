import {
  Actor,
  ActorID,
  Message
  } from './actor'
import { Destroyer } from './destroyer'
import { IdGenerator } from './id-generator'
import { MessageRouter } from './message-router'
import { NumericIdGenerator } from './numeric-id-generator'
import { Sender } from './sender'
import { Spawner } from './spawner'

export interface MessageListener {
  onMessage(address: ActorID, message: Message): void
}

export type IdGeneratorCreator = (parentId: ActorID) => IdGenerator

const defaultIdGeneratorCreator: IdGeneratorCreator = (parentId) => {
  return new NumericIdGenerator(parentId)
}

export class Actors
implements Destroyer, Sender {
  private rootId: ActorID
  private router: MessageRouter
  private rootSpawner: Spawner
  private messageListener?: MessageListener

  constructor(rootId: string = '', idGeneratorCreator: IdGeneratorCreator = defaultIdGeneratorCreator) {
    this.rootId = rootId
    this.router = new MessageRouter()
    this.rootSpawner = new Spawner(idGeneratorCreator(this.rootId), idGeneratorCreator, this.router, this, this)
  }

  destroy(id: ActorID): void {
    this.router.unregister(id)
  }

  send(address: ActorID, message: Message): void {
    this.router.route({ address, message })
    if (this.messageListener) {
      this.messageListener.onMessage(address, message)
    }
  }

  setMessageListener(messageListener: MessageListener) {
    this.messageListener = messageListener
  }

  spawn(actor: Actor): ActorID {
    return this.rootSpawner.spawn(this.rootId, actor)
  }
}
