import { MessageType } from "../utill/MessageType";
import { ISubscriber } from "./ISubscriber";

export interface ISender{
    subscribers: Array<ISubscriber>
    subscribe(sub: ISubscriber): void
    unsubscribe(sub: ISubscriber): void
    publish(messageType: MessageType, data: any): void
}