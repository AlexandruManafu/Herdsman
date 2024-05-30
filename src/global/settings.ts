import * as _ from 'lodash'

export class GameSettings{
    public static instance: GameSettings;
    //These are screen percentages
    public spawnBoundsX: number[]
    public spawnBoundsy: number[]
    private constructor() {
        this.spawnBoundsX = [0.10, 0.65];
        this.spawnBoundsy = [0.10, 0.90];
    }

    public static getInstance(): GameSettings {
        if (_.isNil(GameSettings.instance)) {
            GameSettings.instance = new GameSettings();
        }
        return GameSettings.instance;
    }
}