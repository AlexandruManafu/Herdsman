
import * as _ from 'lodash';
import { INotification } from '../publish_subscribe/interfaces/iNotificaton';
import { AbstractMediator } from '../mediator/AbstractMediator';

export class EventFacadeSingleton{
    public static instance: EventFacadeSingleton;
    protected mediators: AbstractMediator[];
    private constructor() {
        this.mediators = [];
    }

    public static getInstance(): EventFacadeSingleton {
        if (!EventFacadeSingleton.instance) {
            EventFacadeSingleton.instance = new EventFacadeSingleton();
        }
        return EventFacadeSingleton.instance;
    }

    public addMediator(mediator: AbstractMediator): void{
        this.mediators.push(mediator);
    }

    public sendNotification(notification: INotification): void{
        _.forEach(this.mediators, (mediator)=>{
            mediator.handleNotification(notification);
        })
    }
}