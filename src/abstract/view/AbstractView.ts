import { Container } from "pixi.js"
import { Sender } from "../publish_subscribe/Sender"

export abstract class AbstractView extends Sender {
  public display!: Container;

  public initDisplay(layer: Container): void{
    this.display = layer;
    this.displayReady();
  }

  protected displayReady(): void{

  }
}