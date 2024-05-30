import { Container } from "pixi.js";
import { EventFacadeSingleton } from "../global/EventFacadeSingleton";
import { Subscriber } from "../publish_subscribe/Subscriber";
import { INotification } from "../publish_subscribe/interfaces/iNotificaton";
import { AbstractView } from "../view/AbstractView";
import * as _ from 'lodash';
import { GameSettings } from "../../global/settings";

export class AbstractMediator extends Subscriber {
    protected view!: AbstractView;
    protected eventFacade!: EventFacadeSingleton;
    protected notifications: Map<string,Function>;
    protected settings: GameSettings;

    constructor(){
        super()
        this.notifications = new Map();
        this.eventFacade = EventFacadeSingleton.getInstance();
        this.settings = GameSettings.getInstance();
        this.eventFacade.addMediator(this);
        this.addNotifications();
    }

    protected addNotifications(): void{

    }

    addView(view: AbstractView): void{
        this.view = view;
        this.view.subscribe(this);
    }

    public setlayer(layer: Container): void{
        this.view.initDisplay(layer);
    }

    protected addNotification(name: string, callback: Function): void{
        if(!this.notifications.has(name)){
            this.notifications.set(name, callback);
        }
    }

    protected removeNotification(name: string): void{
        if(this.notifications.has(name)){
            this.notifications.delete(name);
        }
    }

    public handleNotification(notification: INotification): void {
        const callback = this.notifications.get(notification.name);
        if(!_.isNil(callback)){
            callback(notification);
        }
    }

    protected sendNotification(name: string, body?: any): void {
        this.eventFacade.sendNotification({
            name: name,
            body: body
        });
    }
}