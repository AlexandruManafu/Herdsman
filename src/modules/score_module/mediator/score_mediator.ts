import { AbstractMediator } from "../../../abstract/mediator/AbstractMediator";
import { NotificationNames } from "../../../global/notification_names";
import { ScoreView } from "../view/score_view";

export class ScoreMediator extends AbstractMediator{
    protected view: ScoreView;
    protected addNotifications(): void {
        this.addNotification(NotificationNames.FOLLOWER_ADDED_WIN, this.onFollowerAddedWin.bind(this))
    }

    protected onFollowerAddedWin(): void{
        this.view.incrementScore();
    }
}