import { Container } from "pixi.js";
import { AbstractMediator } from "./mediator/AbstractMediator";
import { AbstractView } from "./view/AbstractView";
import * as _ from 'lodash';

export abstract class AbstractModule{
    protected mediators: Map<string,AbstractMediator> = new Map();
    protected views: Map<string,AbstractView> = new Map();
    protected layer!: Container;

    constructor(protected name: string, protected stage: Container){
        this.initLayer();
        this.registerMediators();
        this.registerViews();
    }

    protected initLayer(): void{
        this.layer = new Container();
        this.layer.label = this.name;
        this.layer.interactiveChildren = false;
        this.stage.addChild(this.layer);
    }

    protected registerMediator(name: string, mediatorType: any): void{
        const mediator: AbstractMediator = new mediatorType();
        this.mediators.set(name, mediator);
        const view = this.views.get(name)
        if(!_.isNil(view)){
            mediator.addView(view);
            mediator.setlayer(this.layer);
        }
    }

    protected registerView(name: string, viewType: any): void{
        const view: AbstractView = new viewType();
        this.views.set(name, view);
        const mediator = this.mediators.get(name)
        if(!_.isNil(mediator)){
            mediator.addView(view);
            mediator.setlayer(this.layer);
        }
    }

    protected registerMediators(): void{

    }

    protected registerViews(): void{
        
    }

    public remove(){
        this.layer.removeFromParent();
    }
}