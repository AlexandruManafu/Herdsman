import { Graphics } from "pixi.js";
import { AbstractMediator } from "../../../abstract/mediator/AbstractMediator";
import { INotification } from "../../../abstract/publish_subscribe/interfaces/iNotificaton";
import { NotificationNames } from "../../../global/notification_names";
import { AnimalsEventNames } from "../utils/animals_names";
import { AnimalsView } from "../view/animals_view";

export class AnimalsMediator extends AbstractMediator{
    protected view: AnimalsView;

    registerEvents(): void{
        this.addEvent(AnimalsEventNames.START_HERO_FOLLOW, this.onStartHeroFollow.bind(this))
    }

    protected addNotifications(): void {
        this.addNotification(NotificationNames.SCREEN_RESIZED,this.onScreenResized.bind(this))
        this.addNotification(NotificationNames.GAME_LOADED, this.onGameLoaded.bind(this));
        this.addNotification(NotificationNames.START_PROXIMITY_CHECK, this.onStartProximityCheck.bind(this))
    }

    protected onScreenResized(args: INotification){
        this.view.onScreenResized(args.body)
    }

    protected onGameLoaded(): void{
        const boundsX = this.settings.spawnBoundsX;
        const boundsY = this.settings.spawnBoundsy;
        this.view.setSpawnBounds(boundsX, boundsY);
        this.view.spawnRandomAnimals()
    }

    protected onStartProximityCheck(notification: INotification): void{
        this.view.checkAnimalsProximity(notification.body)
    }

    protected onStartHeroFollow(args: Graphics): void{
        this.sendNotification(NotificationNames.START_HERO_FOLLOW, args)
    }
}