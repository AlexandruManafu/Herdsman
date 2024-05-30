import { Container, Graphics, Ticker } from "pixi.js";
import { AbstractView } from "../../../abstract/view/AbstractView";
import gsap from "gsap";
import * as _ from 'lodash';
import { HeroEventNames } from "../utils/hero_names";
import { CircleUtils } from "../../../global/simple_types";


export class HeroView extends AbstractView {
    public container!: Container;
    protected heroCircle: Graphics;
    protected position = {
        x: 200,
        y: 200
    }
    protected width = 60;
    protected moveTween!: gsap.core.Tween;
    protected moveSpeed = 100;
    protected circleUtils = CircleUtils;
    protected maximumFollowCount: number = 5;
    protected followers: Graphics[] = [];

    protected initGraphics(){
        this.container = new Container();
        this.container.x = this.position.x;
        this.container.y = this.position.y;
        this.container.label = 'Hero'
        const graphics = new Graphics();
        graphics.circle(0,0, this.width);
        graphics.fill(0xFF0000);
        this.heroCircle = graphics;
        this.container.addChild(graphics);
        this.display.addChild(this.container);
    }

    protected displayReady(): void {
        this.initGraphics();
    }

    protected getMoveDuration(position: {x: number, y: number}): number{
        const x1 = this.container.x;
        const x2 = position.x;
        const y1 = this.container.y;
        const y2 = this.position.y;
        const distance = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2 - y1,2));
        const duration = distance / this.moveSpeed;
        return duration;
    }

    public moveHero(data: any): void {
        const position = data.globalPosition;
        const duration = this.getMoveDuration(position)
        if(!_.isNil(this.moveTween)){
            this.moveTween.kill();
        }
        this.moveTween = gsap.to([this.container],{
            x: position.x,
            y: position.y,
            duration: duration
        })
    }

    public startProximityCheck(body: {
        ticker: Ticker
    }): void{
        let frameCount: number = 0;
        body.ticker.add(()=>{
            if(this.followers.length < this.maximumFollowCount){
                frameCount = 0;
                this.publish(
                    HeroEventNames.START_PROXIMITY_CHECK,
                    {
                        position: this.container.position,
                        width: this.heroCircle.width,
                        followers: this.followers
                    }
                )
            }
            frameCount++
        })
    }

    public startHeroFollow(animalCircle: Graphics): void{
        const localPosition = this.container.toLocal(animalCircle);
        const localCircle = {
            x: localPosition.x,
            y: localPosition.y,
            width: animalCircle.width
        }
        let isOverlap = false;
        _.forEach(this.followers,(follower)=>{
            if(isOverlap) return
            isOverlap = this.circleUtils.circlesOverlap(localCircle, follower)
        })
        isOverlap = isOverlap || this.circleUtils.circlesOverlap(this.heroCircle, localCircle)
        if(!isOverlap){
            this.followers.push(animalCircle)
            animalCircle.removeFromParent();
            this.container.addChild(animalCircle);
            animalCircle.position = localPosition;
        }
    }

    public onFollowerCheck(body:{
        callback: Function
    }): void{
        const callback = body.callback;
        if(this.followers.length > 0){
            this.followers = callback(this.followers)
        }
    }
}