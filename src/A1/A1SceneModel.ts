/**
 * @file Main scene model
 * @description Main model for your application
 */

import {AppState, ASerializable, Color, GetAppState, NodeTransform3D, SVGAsset, V3, Vec2} from "../anigraph";
import {TrackModel} from "./nodes/Track/TrackModel";
import {VehicleDriveMode} from "./nodes";
import {App2DSceneModel} from "../anigraph/starter/App2D/App2DSceneModel";

var VehicleAsset:SVGAsset;
var MyCarAsset:SVGAsset;

/**
 * This is your Main Model class. The scene model is the main data model for your application. It is the root for a
 * hierarchy of models that make up your scene/
 */
@ASerializable("A1SceneModel")
export class A1SceneModel extends App2DSceneModel{
    _controlShapesVisible:boolean=true;
    _tracks:TrackModel[]=[];

    async PreloadAssets(): Promise<void> {
        await super.PreloadAssets();
        VehicleAsset = await SVGAsset.Load("./images/svg/racecar.svg");
        MyCarAsset = await SVGAsset.Load("./images/svg/myCarWithAxes.svg");
    }

    get tracks():TrackModel[]{
        return this._tracks;
    }

    get currentTrack():TrackModel{
        return this.tracks[this.tracks.length-1];
    }

    get controlShapesVisible(){
        return this._controlShapesVisible;
    }
    set controlShapesVisible(value:boolean){
        this._controlShapesVisible = value;
        for(let t of this.tracks){
            t.controlShapeVisible = this._controlShapesVisible;
            t.signalGeometryUpdate();
        }
    }

    /**
     * This will add variables to the control pannel
     * @param appState
     */
    initAppState(appState:AppState){
        /**
         * Optionally, you can add functions that will tell what should be displayed in the React portion of the GUI. Note that the functions must return JSX code, which means they need to be written in a .tsx file. That's why we've put them in a separate file.
         */
        // appState.setReactGUIContentFunction(UpdateGUIJSX);
        // appState.setReactGUIBottomContentFunction(UpdateGUIJSXWithCameraPosition);
    }

    /**
     * Use this function to initialize the content of the scene.
     * Generally, this will involve creating instances of ANodeModel subclasses and adding them as children of the scene:
     * ```
     * let myNewModel = new MyModelClass(...);
     * this.addChild(myNewModel);
     * ```
     *
     * You may also want to add tags to your models, which provide an additional way to control how they are rendered
     * by the scene controller. See example code below.
     */
    async initScene(){
        this.addNewTrack();
    }

    addTrack(track:TrackModel){
        this.addChild(track);
        this._tracks.push(track);
    }

    addNewTrack(){
        this.addTrack(new TrackModel());
    }

    addVehicle(driveMode:VehicleDriveMode, speed?:number){
        speed = (speed??1)+Math.random()*0.1;
        return this.currentTrack.addVehicle(VehicleAsset, this.clock.time, Color.Random(), driveMode, speed)
    }


    /**
     * Update the model with time here.
     * If no t is provided, use the model's time.
     * If t is provided, use that time.
     * You can decide whether to couple the controller's clock and the model's. It's usually good practice to have the model run on a separate clock.
     * @param t
     */
    timeUpdate(t?: number):void;
    timeUpdate(...args:any[])
    {
        let t = this.clock.time;
        if(args != undefined && args.length>0){
            t = args[0];
        }

        for(let track of this.tracks){
            track.update(t);
        }

        /**
         * If you want to update the react GUI components
         */
    // GetAppState().updateComponents();
    }
};
