import { AbstractModule } from "../../abstract/AbstractModule";
import { HeroMediator } from "./mediator/hero_mediator";
import { HeroView } from "./view/hero_view";

export class HeroModule extends AbstractModule {
    protected viewName = 'HeroView';

    protected registerMediators(): void {
        this.registerMediator(this.viewName, HeroMediator);
    }

    protected registerViews(): void {
        this.registerView(this.viewName, HeroView);
    }
}