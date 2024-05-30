import { Text, TextOptions } from "pixi.js";
import { AbstractView } from "../../../abstract/view/AbstractView";

export class ScoreView extends AbstractView{
    protected scoreLabel: string;
    protected score: number = 0;
    protected textPosition = {
        x: 30,
        y: 30
    }
    protected scoreText: Text;
    protected scoreStyle: TextOptions
    protected displayReady(): void {
        this.scoreLabel = 'Score: ';
        this.scoreStyle = {
            text: this.scoreLabel + this.score.toString(),
            style: {
                fontFamily: 'Arial',
                fontSize: 30,
            fill: 0x00000,
            align: 'center',
            }
        }
        this.scoreText = new Text(this.scoreStyle)
        this.display.addChild(this.scoreText);
        this.scoreText.x = this.textPosition.x;
        this.scoreText.y = this.textPosition.y;
    }

    public incrementScore(): void{
        this.score++;
        this.scoreText.text = this.scoreLabel + this.score.toString();
    }
}