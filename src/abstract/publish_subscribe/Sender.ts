import { ISender } from "./interfaces/ISender"
import { Subscriber } from "./Subscriber"

export abstract class Sender implements ISender{
    subscribers: Array<Subscriber> = []
    subscribe(sub: Subscriber): void {
        if(!this.subscribers.includes(sub))
            this.subscribers.push(sub)
    }

    unsubscribe(sub: Subscriber): void {
        const index = this.subscribers.indexOf(sub)
        if(index >= 0)
            this.subscribers.splice(index, 1)
    }
    publish(message: string, data: any){
        for(let i = 0; i<this.subscribers.length; i++)
        {
            this.subscribers[i].onEvent(message, data)
        }
    }
    
}