import { Engine } from "./abstract/global/Engine";
import { AbstractModule } from "./abstract/AbstractModule";
import * as _ from 'lodash';
import { HeroModule } from "./modules/hero_module/hero_module";
import { BackgroundModule } from "./modules/background_module/background_module";
import { EngineModule } from "./modules/engine_module/engine_module";
import { AnimalsModule } from "./modules/animals_module/animals_module";
import { ScoreModule } from "./modules/score_module/score_module";

export class Herdsman{
    protected engine!: Engine;
    protected modules: AbstractModule[] = [];

    constructor(){
        this.run();
    }

    protected run(): void {

        this.engine = Engine.getInstance({
            containerId: 'game',
            width: window.innerWidth,
            height: window.outerHeight, 
            antialias: true,
            name: Herdsman.name
        });
        this.engine.init().then(()=>{
            this.onEngineInitiFinished();
        })
    }

    protected onEngineInitiFinished(): void{
        this.addModule('BackgroundModule', BackgroundModule)
        this.addModule('HeroModule', HeroModule)
        this.addModule('AnimalsModule', AnimalsModule)
        this.addModule('ScoreModule', ScoreModule)
        this.addModule('Engine', EngineModule);
    }

    protected addModule(name:string, moduleType: any): void{
        this.modules.push(
            new moduleType(name, this.engine.stage)
        )
    }

    protected removeModule(module: AbstractModule): void{
        this.modules = _.remove(this.modules, (compareModule)=>{
            module == compareModule;
        })
        module.remove();
    }
}

window.onload = ()=>{
    new Herdsman();
}