import { ISubscriber } from "./interfaces/ISubscriber"
import { MessageType } from "./utill/MessageType"

export abstract class Subscriber implements ISubscriber{
    events: Map<string,any> = new Map()
    constructor()
    {
        this.registerEvents()
    }

    //TEMPLATE
    registerEvents(){
        this.addEvent(MessageType.Print,this.onPrintReceived.bind(this))
    }
    //TEMPLATE
    onPrintReceived(data: any){
        console.log("received", data)
    }

    protected addEvent(name: string, callback: Function): void{
        if(!this.events.has(name)){
            this.events.set(name, callback)
        }
    }

    onEvent(message: string, data: any){
        if(this.events.has(message))
            this.events.get(message)(data)
    }

}