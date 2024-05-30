import { FederatedPointerEvent, Graphics, Ticker } from "pixi.js";
import { AbstractView } from "../../../abstract/view/AbstractView";
import * as _ from 'lodash'
import { BackgroundEventNames } from "../names/background_event_names";
import { CircleUtils } from "../../../global/simple_types";

export class BackgroundView extends AbstractView{
    protected background!: Graphics;
    protected winArea!: Graphics;
    protected backgroundColor: number = 0x32CD32;
    protected winAreaColor: number = 0xFFEB99;
    protected circleUtils = CircleUtils;
    protected collectedFollowers: Graphics[] = [];

    protected displayReady(): void {
         this.display.interactiveChildren = true;
        this.background = new Graphics();
        this.background.rect(0, 0, 800, 600);
        this.background.fill(this.backgroundColor);
        this.display.addChild(this.background);

        this.winArea = new Graphics();
        this.winArea.rect(0, 0, 800, 600);
        this.winArea.fill(this.winAreaColor);
        this.display.addChild(this.winArea);
    }

    public onScreenResized(args: any): void{
        this.background.width = args.width;
        this.background.height = args.height;

        this.winArea.x = args.width / 4 * 3
        this.winArea.width = args.width / 4;
        this.winArea.height = args.height;
        this.addClickListener()
    }

    protected addClickListener(): void{
        this.background.interactive = true;
        this.background.on('pointerdown', (event)=>{
            this.onClickBackground(event)
            }
        )
    }

    protected onClickBackground(event: FederatedPointerEvent): void{
        this.publish(BackgroundEventNames.BACKGROUND_CLICK, event)
    }

    public startCheckFollowerWithin(body:{
        ticker: Ticker
    }): void{
        const ticker = body.ticker;
        ticker.add(()=>{
            this.publish(BackgroundEventNames.FOLLOWER_CHECK, {
                callback:this.onFollowersReceived.bind(this)
            });
        })
    }

    protected onFollowersReceived(followers: Graphics[]): Graphics[]{
        _.forEach(followers, (follower)=>{
            const localPosition = this.display.toLocal(follower, follower.parent);
            const localCircle = {
                x: localPosition.x,
                y: localPosition.y,
                width: follower.width
            }
            const withinWinArea = this.circleUtils.isCircleWithinRectangle(localCircle, this.winArea);
            let isOverlap = false;
            _.forEach(this.collectedFollowers,(follower)=>{
                if(isOverlap) return
                isOverlap = this.circleUtils.circlesOverlap(localCircle, follower)
            })
            if(withinWinArea && !isOverlap){
                follower.removeFromParent();
                follower.position = localPosition;
                this.display.addChild(follower)
                this.collectedFollowers.push(follower)
                this.publish(BackgroundEventNames.FOLLOWER_ADDED_WIN, undefined);
            }
        })
        const remainingFollowers = _.filter(followers, (follower: Graphics)=>{
            return follower.parent != this.display
        })

        return remainingFollowers
    }
}