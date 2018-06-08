import {
  Actor as _Actor,
  ActorID as _ActorID,
  Exit as _Exit,
  Message as _Message,
  OnInit as _OnInit,
  OnMessage as _OnMessage,
  Send as _Send,
  Spawn as _Spawn
  } from './actor'
import {
  Actors as _Actors,
  ActorsListener as _ActorsListener,
  IdGeneratorCreator as _IdGeneratorCreator
  } from './actors'
import { IdGenerator as _IdGenerator } from './id-generator'
import { NumericIdGenerator as _NumericIdGenerator } from './numeric-id-generator'

export type Actor = _Actor
export const Actors = _Actors
export type ActorID = _ActorID
export type Exit = _Exit
export type Actors = _Actors
export type ActorsListener = _ActorsListener
export type IdGenerator = _IdGenerator
export type IdGeneratorCreator = _IdGeneratorCreator
export type NumericIdGenerator = _NumericIdGenerator
export const NumericIdGenerator = _NumericIdGenerator
export type Message = _Message
export type OnInit = _OnInit
export type OnMessage = _OnMessage
export type Send = _Send
export type Spawn = _Spawn
