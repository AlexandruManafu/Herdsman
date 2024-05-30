import { FederatedPointerEvent } from "pixi.js";
import { AbstractMediator } from "../../../abstract/mediator/AbstractMediator";
import { INotification } from "../../../abstract/publish_subscribe/interfaces/iNotificaton";
import { NotificationNames } from "../../../global/notification_names";
import { BackgroundEventNames } from "../names/background_event_names";
import { BackgroundView } from "../view/background_view";

export class BackgroundMediator extends AbstractMediator{
    protected view!: BackgroundView;
    registerEvents(): void {
        this.addEvent(BackgroundEventNames.BACKGROUND_CLICK, this.onBackgroundClicked.bind(this));
        this.addEvent(BackgroundEventNames.FOLLOWER_CHECK, this.onFollowerCheck.bind(this));
        this.addEvent(BackgroundEventNames.FOLLOWER_ADDED_WIN, this.onFollowerAddedWin.bind(this));
    }

    addNotifications(): void{
        this.addNotification(NotificationNames.SCREEN_RESIZED,this.onScreenResized.bind(this));
        this.addNotification(NotificationNames.GAME_LOADED, this.onGameLoaded.bind(this));
    }

    protected onScreenResized(args: INotification){
        this.view.onScreenResized(args.body);
        this.removeNotification(NotificationNames.SCREEN_RESIZED)
    }

    protected onBackgroundClicked(data: FederatedPointerEvent): void{
        const global = data.global
        const element = data.path[data.path.length - 1]
        this.sendNotification(NotificationNames.BACKGROUND_CLICKED, {
            globalPosition: global,
            element: element
        })
    }

    protected onGameLoaded(notification: INotification): void{
        this.view.startCheckFollowerWithin(notification.body)
    }

    protected onFollowerCheck(callback: Function): void{
        this.sendNotification(NotificationNames.FOLLOWER_CHECK, callback);
    }

    protected onFollowerAddedWin(): void{
        this.sendNotification(NotificationNames.FOLLOWER_ADDED_WIN)
    }
}