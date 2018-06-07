import { ActorID } from './actor'
import { IdGenerator } from './id-generator'

export class NumericIdGenerator
implements IdGenerator {
  private static readonly SEPARATOR = '/'

  private prefix: string
  private index: number = 0

  constructor(prefix: string = '') {
    this.prefix = prefix
  }

  newId(): ActorID {
    const actorId = [this.prefix, this.index.toString()].join(NumericIdGenerator.SEPARATOR)
    this.index++
    return actorId
  }
}
