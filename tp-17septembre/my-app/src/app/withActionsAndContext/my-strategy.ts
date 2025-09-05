import { WritableSignal } from "@angular/core";

export interface IDrawer{
      entityName:WritableSignal<string>
      bgColor :WritableSignal<string>
}

export abstract class MyStrategy{
       abstract init(drawer : IDrawer):void;
}

export class XStrategy extends MyStrategy{
     init(drawer : IDrawer){
        drawer.entityName.set("Xxx")
        drawer.bgColor.set("lightgreen")
     }
}

export class YStrategy extends MyStrategy{
     init(drawer : IDrawer){
        drawer.entityName.set("Yyy")
        drawer.bgColor.set("lightpink")
     }
}

export class MyStrategyFactory{

    getStrategy(name:string):MyStrategy|null{
        switch(name){
            case "X" : return new XStrategy();
            case "Y" : return new YStrategy();
            default : return null;
        }
    }

}