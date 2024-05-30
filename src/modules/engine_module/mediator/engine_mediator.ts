import { Engine } from "../../../abstract/global/Engine";
import { AbstractMediator } from "../../../abstract/mediator/AbstractMediator";
import { NotificationNames } from "../../../global/notification_names";

export class EngineMediator extends AbstractMediator{
    protected engine!: Engine;
    constructor(){
        super()
        this.initEngine()
    }
    registerEvents(): void {
        
    }

    protected initEngine(){
        this.engine = Engine.getInstance();
        window.addEventListener("resize",this.updateOnResize.bind(this))
        this.updateOnResize()
        this.onGameLoaded();
    }

    protected updateOnResize(): void {
        this.engine.setCanvasSize(window.innerWidth,window.innerHeight);
        this.sendNotification(NotificationNames.SCREEN_RESIZED, {
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    protected onGameLoaded(): void{
        this.sendNotification(NotificationNames.GAME_LOADED, {
            ticker: this.engine.ticker
        });
    }
}