import {HttpClient} from "@angular/common/http";
import {CrudOperations} from "./crudoperations.interface";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "app/app.constants";

export class CrudService<T, ID> implements CrudOperations<T, ID> {

    protected http: HttpClient;
    protected options: any;
    protected base: string;

    constructor(
        base: string,
        http: HttpClient,
        options: any) {
        this.base = SERVER_API_URL + base;
        this.http = http;
        this.options = options;
    }

    save(t: T) {
        console.log(this.base);
        /*return this.http.post(this.base, t, this.options())
          .map(this.extractData)
          .catch(this.handleError);*/
        return null;
    }

    update(id: ID, t: T) {
        /*return this.http.put(this.base + "/" + id, t, this.options())
          .map(this.extractData)
          .catch(this.handleError);*/
        return null;
    }

    findOne(id: ID) {
        /*return this.http.get(this.base + "/" + id, this.options())
          .map(this.extractData)
          .catch(this.handleError);*/
        return null;
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('getting all:' + this.base);
            this.http.get<T[]>(this.base)
                .subscribe(
                    data => {
                        //console.log(data);
                        resolve(data)
                    },
                    error => reject(this.handleError(error)));
        });
    }

    delete(id: ID): Observable<any> {
        return undefined;
    }

    /*delete(id: ID) {
      return this.http.delete(this.base + '/' + id, this.options())
               .map(this.extractData)
        .catch(this.handleError);
      }
    */
    protected handleError(error: Response | any) {
        let msg: any;
        console.log(error);
        if (error instanceof Response) {
            msg = error.json() || '';
        } else {
            msg = error.message ? error.message : error.toString();
        }

        return Observable.throw(msg);
    }
}
