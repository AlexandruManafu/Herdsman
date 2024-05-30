import { AbstractModule } from "../../abstract/AbstractModule";
import { EngineMediator } from "./mediator/engine_mediator";

export class EngineModule extends AbstractModule{
    protected viewName = 'Engine';
    protected initLayer(): void {
        
    }

    protected registerMediators(): void {
        this.registerMediator('Engine', EngineMediator);
    }
}