import { Injectable, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { TGlobalParameters } from '../classes/TGlobalParameters';
import { AppProxy } from './app.proxy';

export const GLOBAL={title:"כותרת",GlobalVerMarch:"טקסט_ראשי",GlobalMarchSF:"טקסט_משני"}
@Injectable()
export class settingsFrontend {

    
    public  Globals:TGlobalParameters[]=new  Array<TGlobalParameters>();
    public GlobalHeader:TGlobalParameters=new TGlobalParameters();

    public  GlobalVerMarch:TGlobalParameters=new TGlobalParameters();
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

  
  //  
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
setGlobalParameters(){
  this.GetGlobalParameters().then(res=>{
    
       this.GlobalHeader=(<any>res).filter(r=>r.nvTitle==[GLOBAL.title])[0]
      
       this.GlobalVerMarch     =(<any>res).filter(r=>r.nvTitle==[GLOBAL.GlobalVerMarch])[0]
       
       this.GlobalMarchSF=(<any>res).filter(r=>r.nvTitle==[GLOBAL.GlobalMarchSF])[0]
    //  
})}}
