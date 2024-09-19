/**
 * @file Main scene controller for your application
 * @description This is where you connect models to views.
 * This is done mainly by defining your model view spec and interaction modes.
 */
import {A1SceneModel} from "./A1SceneModel";
import {
    ADragInteraction,
    AInteractionEvent,
    AKeyboardInteraction,
    ASerializable,
    Color,
    GetAppState
} from "../anigraph";
import {ASceneInteractionMode} from "../anigraph/starter";
import {SplineModel, SplineView, VehicleModel} from "./nodes";
import {VehicleView} from "./nodes/Vehicle/VehicleView";
import {App2DSceneController} from "../anigraph/starter/App2D/App2DSceneController";
import {TRACK_COLOR_MODES, TrackModel} from "./nodes/Track/TrackModel";

const newCarSpeedStateName = "NewCarSpeed";

/**
 * This is your Main Controller class. The scene controller is responsible for managing user input with the keyboard
 * and mouse, as well as making sure that the view hierarchy matches the model heirarchy.
 */
@ASerializable("A1SceneController")
export class A1SceneController extends App2DSceneController{
    mainInteractionMode!:ASceneInteractionMode;

    get model():A1SceneModel{
        return this._model as A1SceneModel;
    }

    get splineModel(){
        return this.model.currentTrack;
    }

    /**
     * The main customization you might do here would be to set the background color or set a background image.
     * @returns {Promise<void>}
     */
    async initScene(): Promise<void> {
        this.setClearColor(Color.White());
        this.initControlPanelControls();
        await super.initScene();
    }

    initControlPanelControls(){
        const appState = GetAppState();
        const self = this;
        appState.addSliderControl(newCarSpeedStateName, 1, 0, 2, 0.001);
        appState.addButton("Spline Car", ()=>{
            self.model.addVehicle(VehicleModel.DriveModes.BezierSpline, appState.getState(newCarSpeedStateName));
        })
        appState.addButton("Linear Car", ()=>{
            self.model.addVehicle(VehicleModel.DriveModes.Linear, appState.getState(newCarSpeedStateName));
        })

        let track_color_options = Object.values(TRACK_COLOR_MODES);
        appState.setGUIControlSpecKey(
            "TrackColor",
            {
                options: track_color_options,
                value: track_color_options[0],
                onChange:(selected:any)=>{
                    switch (selected){
                        case track_color_options[0]:
                            this.model.currentTrack.setColorToStreet();
                            break;
                        case track_color_options[1]:
                            this.model.currentTrack.setColorToRandom();
                            break;
                        case track_color_options[2]:
                            this.model.currentTrack.setColorToSolid();
                            break;
                        default:
                            console.warn(`unknown track color option "${selected}"!`);
                            break;
                    }
                }
            }
        )

        appState.setGUIControlSpecKey(
            "ControlShape",
            {
                value: true,
                onChange:(value:any)=>{
                    self.model.controlShapesVisible = value;
                }
            }
        )

    }


    /**
     * Specifies what view classes to use for different model class.
     * If you create custom models and views, you will need to link them here by calling `addModelViewSpec` with the
     * model class as the first argument and the view class as the second.
     */
    initModelViewSpecs() {
        super.initModelViewSpecs();
        this.addModelViewSpec(TrackModel, SplineView);
        this.addModelViewSpec(SplineModel, SplineView);
        this.addModelViewSpec(VehicleModel, VehicleView);
    }




    initInteractions() {
        super.initInteractions();
        const self = this;
        this.mainInteractionMode = new ASceneInteractionMode(
            "A1InteractionMode",
            this,
            {
                onKeyDown: (event:AInteractionEvent, interaction:AKeyboardInteraction)=>{},
                onKeyUp:(event:AInteractionEvent, interaction:AKeyboardInteraction)=>{
                    if(event.key==='t'){
                        this.model.addNewTrack()
                    }
                    if(event.key==='v'){
                        let appState = GetAppState();
                        this.model.addVehicle(VehicleModel.DriveModes.BezierSpline, appState.getState(newCarSpeedStateName));
                    }
                    if(event.key==='b'){
                        let appState = GetAppState();
                        this.model.addVehicle(VehicleModel.DriveModes.Linear, appState.getState(newCarSpeedStateName));
                    }

                    if(event.key==='1'){
                        this.model.currentTrack.setColorToStreet();
                    }
                    if(event.key==='2'){
                        this.model.currentTrack.setColorToRandom();
                    }
                    if(event.key==='3'){
                        this.model.currentTrack.setColorTo(Color.FromString("#aaaaaa"));
                    }

                    if(event.key==='L'){
                        this.model.currentTrack.interpolationMode=SplineModel.InterpolationModes.Linear;
                    }
                    if(event.key==='C'){
                        this.model.currentTrack.interpolationMode=SplineModel.InterpolationModes.CubicBezier;
                    }

                    if(event.key==='q'){
                        this.model.controlShapesVisible = !this.model.controlShapesVisible;
                    }

                    if(event.key==='s'){
                    }
                    if(event.key==='S'){
                    }
                    if(event.key==='ArrowRight'){
                    }
                    if(event.key==='ArrowLeft'){
                    }
                    if(event.key==='ArrowUp'){
                    }
                    if(event.key==='ArrowDown'){
                    }
                },
                onDragStart:(event:AInteractionEvent, interaction:ADragInteraction)=>{
                    let ndcCursor = event.ndcCursor;
                    if(ndcCursor) {
                        let cursorPosition = this.model.worldPointFromNDCCursor(ndcCursor)
                        interaction.cursorStartPosition = cursorPosition;
                        if(self.splineModel.nControlPoints<1){
                            self.splineModel.verts.addVertices(
                                [
                                    cursorPosition,
                                    cursorPosition,
                                ],
                                self.model.currentTrack.getNewTrackVertColor()
                            )
                        }else {
                            self.splineModel.verts.addVertices(
                                [
                                    cursorPosition,
                                    cursorPosition,
                                    cursorPosition,
                                ],
                                self.model.currentTrack.getNewTrackVertColor()
                            )
                        }
                        // this.newVertsColor = Color.RandomRGB();
                        this.splineModel.signalGeometryUpdate();
                    }
                },
                onDragMove:(event:AInteractionEvent, interaction:ADragInteraction)=>{
                    let ndcCursor = event.ndcCursor;
                    if(ndcCursor) {
                        let cursorPosition = this.model.worldPointFromNDCCursor(ndcCursor)
                        let startPosition = interaction.cursorStartPosition;
                        if (this.splineModel.nControlPoints > 3) {
                            this.splineModel.verts.position.setAt(this.splineModel.nControlPoints - 2, startPosition);
                            this.splineModel.verts.position.setAt(this.splineModel.nControlPoints - 1, cursorPosition);
                            this.splineModel.verts.position.setAt(this.splineModel.nControlPoints - 3, startPosition.minus(cursorPosition.minus(startPosition)));
                        }else{
                            this.splineModel.verts.position.setAt(this.splineModel.nControlPoints - 1, cursorPosition);
                        }
                        this.splineModel.signalGeometryUpdate();
                    }
                },
                onDragEnd:(event:AInteractionEvent, interaction:ADragInteraction)=>{},
                // onClick:(event:AInteractionEvent)=>{},
                // afterActivate:(...args:any[])=>{},
                // afterDeactivate:(...args:any[])=>{},
                // beforeActivate:(...args:any[])=>{},
                // beforeDeactivate:(...args:any[])=>{},
                //dispose:()=>{},
            }
        )
        this.defineInteractionMode("MainInteractionMode", this.mainInteractionMode);
        this.setCurrentInteractionMode("MainInteractionMode");
    }
}
