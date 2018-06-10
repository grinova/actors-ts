export type ActorID = string
export interface Message {}
export type Spawn = (actor: Actor) => ActorID
export type Send = (id: ActorID, message: Message) => void
export type Exit = (message?: Message) => void

export type OnInit = (selfId: ActorID, send: Send, spawn: Spawn, exit: Exit) => void
export type OnMessage<M extends Message = Message> = (message: M, send: Send, spawn: Spawn, exit: Exit) => void

export interface Actor<M extends Message = Message> {
  onInit?: OnInit
  onMessage?: OnMessage<M>
}
