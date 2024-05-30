import { AbstractModule } from "../../abstract/AbstractModule";
import { BackgroundMediator } from "./mediator/background_mediator";
import { BackgroundView } from "./view/background_view";

export class BackgroundModule extends AbstractModule{
    protected viewName = 'BackgroundView'

    protected registerViews(): void {
        this.registerView(this.viewName, BackgroundView)
    }

    protected registerMediators(): void {
        this.registerMediator(this.viewName, BackgroundMediator);
    }
}