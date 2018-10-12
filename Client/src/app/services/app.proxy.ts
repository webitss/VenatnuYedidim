import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { debug } from "util";

@Injectable()
export class AppProxy {

  public static baseDevUrl = 'http://localhost:14776/';
  public static baseQAUrl = 'http://qa.webit-track.com/VenatnuYedidim/Service/';
  public static getBaseUrl() {
    if (location.host == 'qa.webit-track.com')
      return AppProxy.baseQAUrl;
    else
      return AppProxy.baseDevUrl;
  }

  constructor(private http: HttpClient) { }

  public post(url: string, data: any = {}): Promise<any> {
   
    return this.http
      .post(`${AppProxy.getBaseUrl() + 'Service.svc/'}${url.trim()}`, this.convertData(data, true))
      .toPromise()
      .then(data => { return this.convertData(data, false) })
      .catch(error => {
        alert('שגיאה בגישה לשרת');
        // return Promise.reject(error)
      });
  }

  public get(url: string): Promise<any> {
    return this.http
      .get(`${AppProxy.getBaseUrl() + 'Service.svc/'}${url.trim()}`)
      .toPromise()
      .then(result => { return this.convertData(result, false) })
      .catch(error => {
        alert('שגיאה בגישה לשרת');
        // return Promise.reject(error) 
      });
  }

  private convertData(data, isPost) {
    if (!(data instanceof Object) || data instanceof Date) {
      let prop = data;
      // parse string date
      if (
        isPost === false &&
        (prop instanceof String || typeof prop === "string") &&
        prop.indexOf("/Date(") > -1
      ) {
        let date = prop.substring(
          prop.indexOf("(") + 1,
          prop.indexOf("+") != -1 ? prop.indexOf("+") : prop.indexOf(")")
        );
        prop = new Date(parseInt(date));
      } else if (isPost && prop instanceof Date) {
        // convert to string date
        let d = Date.UTC(
          prop.getFullYear(),
          prop.getMonth(),
          prop.getDate(),
          prop.getHours(),
          prop.getMinutes()
        );
        prop =
          d.toString() === "NaN" || d === NaN
            ? null
            : "/Date(" +
            Date.UTC(
              prop.getFullYear(),
              prop.getMonth(),
              prop.getDate(),
              prop.getHours(),
              prop.getMinutes()
            ) +
            ")/";
      }
      return prop;
    }

    // parse array / object
    let isArr = data instanceof Array;
    let arrayData = [];
    let objectData = {};

    if (data) {
      Object.keys(data).forEach(key => {
        // dictionary
        if (
          !isPost &&
          isArr &&
          data[key] &&
          Object.keys(data[key]).length === 2 &&
          data[key].Key &&
          data[key].Value != null
        ) {
          arrayData[data[key].Key] = this.convertData(data[key].Value, isPost);
        } else if (isArr) {
          // array
          arrayData.push(this.convertData(data[key], isPost));
        } else {
          // object
          objectData[key] = this.convertData(data[key], isPost);
        }
      });
    }
    return isArr ? arrayData : objectData;
  }

}
