import {SplineModel} from "../Spline/SplineModel";
import {VehicleDriveMode, VehicleModel} from "../Vehicle/VehicleModel";
import {ANodeModel2D, ASerializable, Color, SVGAsset} from "../../../anigraph";

export enum TRACK_COLOR_MODES{
    STREET="Street",
    RANDBOW="Randbow",
    CONSTANT="CONSTANT"
}

@ASerializable("TrackModel")
export class TrackModel extends SplineModel{
    currentTrackColor:TRACK_COLOR_MODES=TRACK_COLOR_MODES.STREET;


    get children():VehicleModel[]{
        return this._children as VehicleModel[];
    }

    constructor() {
        super();
    }

    setColorTo(color:Color){
        this.verts.FillColor(color)
        this.signalGeometryUpdate();
    }

    setColorToSolid(color?:Color){
        this.currentTrackColor = TRACK_COLOR_MODES.CONSTANT;
        color = color??new Color(0.4, 0.4, 0.4);
        this.setColorTo(color);
    }

    setColorToRandom(){
        this.currentTrackColor = TRACK_COLOR_MODES.RANDBOW;
        this.verts.RandomizeColor();
        this.verts.color.setAt(this.verts.length-1, this.verts.color.getAt(0));
        this.verts.color.setAt(this.verts.length-2, this.verts.color.getAt(0));
        this.signalGeometryUpdate();
    }

    setColorToStreet(){
        this.currentTrackColor = TRACK_COLOR_MODES.STREET;
        for (let v = 0; v < this.verts.length; v++) {
            this.verts.color.setAt(v, this.getNewTrackVertColor());
        }
        this.verts.color.setAt(this.verts.length-1, this.verts.color.getAt(0));
        this.verts.color.setAt(this.verts.length-2, this.verts.color.getAt(0));
        this.signalGeometryUpdate();
    }

    addVehicle(svgAsset:SVGAsset, startTime?:number, color?:Color, driveMode?:VehicleDriveMode, speed?:number){
        let vehicle = new VehicleModel(svgAsset, startTime, driveMode, speed);
        if(color){
            vehicle.setColor(color);
        }
        this.addChild(vehicle);
        return vehicle;
    }

    update(t:number){
        for(let c of this.children){
            c.update(t);
        }
    }

    getNewTrackVertColor(){
        switch (this.currentTrackColor){
            case TRACK_COLOR_MODES.STREET:
                let brightness = 0.5+Math.random()*0.2;
                return new Color(brightness, brightness, brightness);
            case TRACK_COLOR_MODES.CONSTANT:
                return new Color(0.4, 0.4, 0.4);
            case TRACK_COLOR_MODES.RANDBOW:
                return Color.Random();
            default:
                console.warn(`unknown track color option "${this.currentTrackColor}"!`);
                break;
        }
    }

}
