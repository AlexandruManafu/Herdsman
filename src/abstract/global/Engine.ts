import * as PIXI from 'pixi.js'
import * as _ from 'lodash';

export interface EngineParams{
    containerId: string,
    width: number,
    height: number, 
    antialias: boolean
    name: string
}

export class Engine{
    public static instance: Engine;
    protected app : PIXI.Application
    public ticker! : PIXI.Ticker
    public stage: PIXI.Container;

    private constructor(protected params: EngineParams) {
        this.app = new PIXI.Application();
        //Expose Pixi App to Pixi Inspector
        (globalThis as any).__PIXI_APP__ = this.app;
        (globalThis as any).__PIXI_STAGE__ = this.app.stage;
        (globalThis as any).__PIXI_RENDERER__ = this.app.renderer;
    }

    public static getInstance(params?: EngineParams): Engine {
        if (_.isNil(Engine.instance) && !_.isNil(params)) {
            Engine.instance = new Engine(params);
        }
        return Engine.instance;
    }
    public init(): Promise<void>{
        return new Promise(resolve => {
            this.app.init().then(()=>{
                document.body.append(this.app.canvas)
                this.app.canvas.width = this.params.width;
                this.app.canvas.height = this.params.height;
                this.ticker = this.app.ticker
                this.stage = this.app.stage;
                this.app.stage.label = this.params.name;
                resolve()
            })
        })
    }

    public setCanvasSize(width : number, height:number)
    {
        this.app.renderer.resize(width,height)
    }
}