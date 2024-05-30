import { MessageType } from "../utill/MessageType"

export interface ISubscriber{
    events: Map<MessageType,any>
    registerEvents(): void
    onEvent(messageType: MessageType, data: any): void
}