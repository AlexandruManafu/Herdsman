import { AbstractModule } from "../../abstract/AbstractModule";
import { AnimalsMediator } from "./mediator/animals_mediator";
import { AnimalsView } from "./view/animals_view";

export class AnimalsModule extends AbstractModule {
    protected viewName = 'HeroView';

    protected registerMediators(): void {
        this.registerMediator(this.viewName, AnimalsMediator);
    }

    protected registerViews(): void {
        this.registerView(this.viewName, AnimalsView);
    }
}