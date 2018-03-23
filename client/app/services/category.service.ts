import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ICategoryModel} from '../models/category.model';
import { Observable } from 'rxjs/Observable';
import {CATEGORIES_API_URL} from '../constants/api';


@Injectable()
export class CategoryService {

    constructor(private http: Http) { }
    public k;
    public getCategories(): Observable<ICategoryModel[]> {
        return this.http.get(CATEGORIES_API_URL)
            .map(response => response.json());          
    }

    public getCategory(id: string): Promise<ICategoryModel> {
        return this.http.get(`${CATEGORIES_API_URL}/${id}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public saveCategory(category: ICategoryModel): Promise<ICategoryModel>  {
        if (category._id) {
            return this.put(category);
        }
        return this.post(category);
    }

    public deleteCategory(category: ICategoryModel): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${CATEGORIES_API_URL}/${category._id}`;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private post(category: ICategoryModel): Promise<ICategoryModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(CATEGORIES_API_URL, JSON.stringify(category), {'headers': headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(category: ICategoryModel): Promise<ICategoryModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${CATEGORIES_API_URL}/${category._id}`;
        return this.http
            .put(url, JSON.stringify(category), {'headers': headers})
            .toPromise()
            .then(() => category)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise
            .reject(error.message || error);
    }

    private extractData(response: any) {
        return Promise
            .resolve(response.json());
    }

}
