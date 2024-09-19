import {ANodeView, ASVGGraphic, ASVGModel, ASVGView, Color} from "../../../anigraph";
import {VehicleModel} from "./VehicleModel";

export class VehicleView extends ASVGView{
    protected _model!:VehicleModel;
    svgGraphic!:ASVGGraphic;
    get model():VehicleModel{
        return this._model as VehicleModel;
    }

    static Create(model:VehicleModel, color?:Color, ...args:any[]){
        color = color??Color.Random();
        let view = new VehicleView();
        view.setModel(model);
        view.setCarColor(color);
        return view;
    }

    init(){
        this.svgGraphic = ASVGGraphic.Create(this.model.svgAsset, true);
        this.registerAndAddGraphic(this.svgGraphic)
        if(this.model.color) {
            this.setCarColor(this.model.color);
        }
    }

    setCarColor(color:Color){
        this.svgGraphic.setElementColor("carbody", color);
    }

    update(): void {
        this.svgGraphic.setTransform2D(this.model.matrix2DH, 1);
    }

}
