import {
  Actor,
  ActorID,
  Exit,
  Message,
  Send,
  Spawn
  } from './actor'
import { Destroyer } from './destroyer'
import { MessageHandler } from './message-handler'
import { Sender } from './sender'
import { Spawner } from './spawner'

export class ActorOwner
implements MessageHandler {
  private parentId: ActorID
  private id: ActorID
  private actor: Actor
  private spawner: Spawner
  private sender: Sender
  private destroyer: Destroyer

  constructor(
    parentId: ActorID,
    id: ActorID,
    actor: Actor,
    spawner: Spawner,
    sender: Sender,
    destroyer: Destroyer
  ) {
    this.parentId = parentId
    this.id = id
    this.actor = actor
    this.spawner = spawner
    this.sender = sender
    this.destroyer = destroyer
  }

  init(): void {
    if (this.actor.onInit) {
      this.actor.onInit(this.id, this.onSend, this.onSpawn, this.onExit)
    }
  }

  handle(message: Message): void {
    if (this.actor.onMessage) {
      this.actor.onMessage(message, this.onSend, this.onSpawn, this.onExit)
    }
  }

  private onSend: Send = (id, message) => {
    this.sender.send(id, message)
  }

  private onSpawn: Spawn = (actor) => {
    return this.spawner.spawn(this.id, actor)
  }

  private onExit: Exit = (message) => {
    this.destroyer.destroy(this.id)
    if (message !== undefined) {
      this.sender.send(this.parentId, message)
    }
  }
}
