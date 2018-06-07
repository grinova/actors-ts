import { Actor, ActorID } from './actor'
import { ActorOwner } from './actor-owner'
import { ActorRegistrator } from './actor-registrator'
import { IdGeneratorCreator } from './actors'
import { Destroyer } from './destroyer'
import { IdGenerator } from './id-generator'
import { Sender } from './sender'

export class Spawner {
  private idGeneratorCreator: IdGeneratorCreator
  private registrator: ActorRegistrator
  private destroyer: Destroyer
  private sender: Sender
  private idGenerator: IdGenerator

  constructor(
    idGenerator: IdGenerator,
    idGeneratorCreator: IdGeneratorCreator,
    registrator: ActorRegistrator,
    sender: Sender,
    destroyer: Destroyer
  ) {
    this.idGenerator = idGenerator
    this.idGeneratorCreator = idGeneratorCreator
    this.registrator = registrator
    this.sender = sender
    this.destroyer = destroyer
  }

  spawn(parentId: ActorID, actor: Actor): ActorID {
    const id = this.idGenerator.newId()
    const spawner = new Spawner(
      this.idGeneratorCreator(parentId),
      this.idGeneratorCreator,
      this.registrator,
      this.sender,
      this.destroyer
    )
    const owner = new ActorOwner(parentId, id, actor, spawner, this.sender, this.destroyer)
    this.registrator.register(id, owner)
    owner.init()
    return id
  }
}
