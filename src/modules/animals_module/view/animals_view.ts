import { Graphics } from "pixi.js";
import { AbstractView } from "../../../abstract/view/AbstractView";
import * as _ from 'lodash';
import { CircleUtils, SimplePoint } from "../../../global/simple_types";
import { AnimalsEventNames } from "../utils/animals_names";

export class AnimalsView extends AbstractView {
    protected spawnBoundsX: number[];
    protected spawnBoundsY: number[];
    protected spawnBoundsPixelsX: number[];
    protected spawnBoundsPixelsY: number[];
    protected displayWidth: number;
    protected displayHeight: number;

    protected animalColor = 0xFFFFFF;
    protected animalWidth = 30;
    protected animalsCircles: Graphics[] = [];
    protected animalCount = 10;
    protected followWidthMultiplier: number = 2;
    protected circleUtils = CircleUtils;

    protected displayReady(): void {
    }

    public onScreenResized(args: any): void{
        this.displayWidth = args.width;
        this.displayHeight = args.height;
    }

    public setSpawnBounds(boundsX: number[], boundsY: number[]): void{
        this.spawnBoundsX = JSON.parse(JSON.stringify(boundsX));
        this.spawnBoundsY = JSON.parse(JSON.stringify(boundsY));
    }

    protected computeRealBounds(): void{
        this.spawnBoundsPixelsX = [
            this.spawnBoundsX[0] * this.displayWidth,
            this.spawnBoundsX[1] * this.displayWidth
        ];

        this.spawnBoundsPixelsY = [
            this.spawnBoundsY[0] * this.displayHeight,
            this.spawnBoundsY[1] * this.displayHeight
        ];
    }
    protected createAnimal(x: number, y: number): void{
        const graphics = new Graphics();
        graphics.circle(0,0, this.animalWidth);
        graphics.fill(this.animalColor);
        graphics.x = x;
        graphics.y = y;
        let overlap = false;
        _.forEach(this.animalsCircles, (circle)=>{
            if(this.circleUtils.circlesOverlap(circle, graphics)){
                overlap = true;
            }
        })
        if(!overlap){
            this.animalsCircles.push(graphics);
            this.display.addChild(graphics);
        }
    }

    protected getRandomPosition(): { x: number, y: number } {
        const minX = this.spawnBoundsPixelsX[0];
        const minY = this.spawnBoundsPixelsY[0];
        const maxX = this.spawnBoundsPixelsX[1];
        const maxY = this.spawnBoundsPixelsY[1];
        const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        return { x, y };
    }

    public spawnRandomAnimals(){
        this.computeRealBounds();
        _.times(this.animalCount, ()=>{
            const position = this.getRandomPosition();
            this.createAnimal(position.x, position.y)
        })
    }

    public checkAnimalsProximity(
        details:{
            position: SimplePoint
            width: number ,
            followers: Graphics[]
        }): void{
            const localPosition = this.display.toLocal(details.position);
            const width = details.width * this.followWidthMultiplier;
            const proximityDetails = {
                x: localPosition.x,
                y: localPosition.y,
                width: width
            }
             _.forEach(this.animalsCircles,(circle: Graphics)=>{
                const isOverlap = this.circleUtils.circlesOverlap(circle, proximityDetails)
                if(isOverlap && circle.parent == this.display){
                    this.publish(AnimalsEventNames.START_HERO_FOLLOW, circle)
                }
            })   
    }
    
}