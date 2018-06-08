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
import { OnSpawn, Spawner } from './spawner'

export interface ActorsListener {
  onMessage?(address: ActorID, message: Message): void
  onSpawn?(id: ActorID, actor: Actor): void
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
  private listener?: ActorsListener

  constructor(rootId: string = '', idGeneratorCreator: IdGeneratorCreator = defaultIdGeneratorCreator) {
    this.rootId = rootId
    this.router = new MessageRouter()
    this.rootSpawner = new Spawner(
      idGeneratorCreator(this.rootId),
      idGeneratorCreator,
      this.router,
      this,
      this,
      this.onSpawn
    )
  }

  destroy(id: ActorID): void {
    this.router.unregister(id)
  }

  send(address: ActorID, message: Message): void {
    this.router.route({ address, message })
    if (this.listener && this.listener.onMessage) {
      this.listener.onMessage(address, message)
    }
  }

  setListener(listener: ActorsListener) {
    this.listener = listener
  }

  spawn(actor: Actor): ActorID {
    const id = this.rootSpawner.spawn(this.rootId, actor)
    this.onSpawn(id, actor)
    return id
  }

  private onSpawn: OnSpawn = (id, actor) => {
    if (this.listener && this.listener.onSpawn) {
      this.listener.onSpawn(id, actor)
    }
  }
}
