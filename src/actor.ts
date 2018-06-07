export type ActorID = string
export interface Message {}
export type Spawn = (actor: Actor) => ActorID
export type Send = (id: ActorID, message: Message) => void
export type Exit = (message?: Message) => void

export interface Actor {
  onInit?(send: Send, spawn: Spawn, exit: Exit): void
  onMessage(message: Message, send: Send, spawn: Spawn, exit: Exit): void
}
