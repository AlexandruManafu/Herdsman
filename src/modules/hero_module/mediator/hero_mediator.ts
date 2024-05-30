import { Ticker } from "pixi.js";
import { AbstractMediator } from "../../../abstract/mediator/AbstractMediator";
import { INotification } from "../../../abstract/publish_subscribe/interfaces/iNotificaton";
import { NotificationNames } from "../../../global/notification_names";
import { HeroView } from "../view/hero_view";
import { HeroEventNames } from "../utils/hero_names";

export class HeroMediator extends AbstractMediator {
    protected view!: HeroView;
    protected ticker: Ticker;
    registerEvents(): void {
        this.addEvent(HeroEventNames.START_PROXIMITY_CHECK, this.onStartProximityCheck.bind(this));
    }

    protected addNotifications(): void {
        this.addNotification(NotificationNames.BACKGROUND_CLICKED, this.onBackgroundClicked.bind(this));
        this.addNotification(NotificationNames.GAME_LOADED, this.onGameLoaded.bind(this));
        this.addNotification(NotificationNames.START_HERO_FOLLOW, this.onStartHeroFollow.bind(this));
        this.addNotification(NotificationNames.FOLLOWER_CHECK, this.onFollowerCheck.bind(this));
    }

    protected onBackgroundClicked(notification: INotification): void{
        this.view.moveHero(notification.body);
    }

    protected onGameLoaded(notification: INotification): void{
        this.view.startProximityCheck(notification.body);
    }

    protected onStartProximityCheck(args: any): void{
        this.sendNotification(NotificationNames.START_PROXIMITY_CHECK, args);
    }

    protected onStartHeroFollow(notification: INotification): void{
        this.view.startHeroFollow(notification.body);
    }

    protected onFollowerCheck(notification: INotification): void{
        this.view.onFollowerCheck(notification.body);
    }
}