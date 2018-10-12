import { Injectable, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { TGlobalParameters } from '../classes/TGlobalParameters';
import { AppProxy } from './app.proxy';
import { Alert, promise } from 'selenium-webdriver';

@Injectable()
export class settingsFrontend {

    
    public  Globals:TGlobalParameters[]=new  Array<TGlobalParameters>();
    public GlobalHeader:TGlobalParameters=new TGlobalParameters();
    public GlobalVerMarch:TGlobalParameters=new TGlobalParameters();
    public GlobalMarchSF:TGlobalParameters=new TGlobalParameters();
  constructor(private appProxy:AppProxy) { 

  }
  SaveGlobalParameters(GlobalParameters:Array<TGlobalParameters> ) : Promise<boolean>{
    return  this.appProxy.post("SaveGlobalParameters", { GlobalParameters: GlobalParameters }).
        then(l => {
          if (l) {
           
            return true;
          }
          return false;
        });
}
updateGlobalParameters(GlobalParameters:Array<TGlobalParameters> ) : Promise<boolean>{
  alert(GlobalParameters.length);
  debugger;
  return  this.appProxy.post("UpdGlobalParameters", { GlobalParameters: GlobalParameters }).
      then(l => {
        if (l) {
         
          return true;
        }
        return false;
      });
}
GetGlobalParameters():Promise<TGlobalParameters>{

  return this.appProxy.get("GetGlobalParameters");

}

}