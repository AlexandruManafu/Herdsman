import { AbstractModule } from "../../abstract/AbstractModule";
import { ScoreMediator } from "./mediator/score_mediator";
import { ScoreView } from "./view/score_view";

export class ScoreModule extends AbstractModule{
    protected viewName = 'ScoreView'

    protected registerMediators(): void{
        this.registerMediator(this.viewName, ScoreMediator)
    }

    protected registerViews(): void{
        this.registerView(this.viewName, ScoreView);
    }
}