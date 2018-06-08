import {
  Actor as _Actor,
  ActorID as _ActorID,
  Message as _Message
  } from './actor'
import {
  Actors as _Actors,
  ActorsListener as _ActorsListener,
  IdGeneratorCreator as _IdGeneratorCreator
  } from './actors'

export namespace actors {
  export type Actor = _Actor
  export const Actors = _Actors
  export type ActorID = _ActorID
  export type Actors = _Actors
  export type IdGeneratorCreator = _IdGeneratorCreator
  export type Message = _Message
  export type ActorsListener = _ActorsListener
}
