import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {ISubCategoryModel} from '../models/subCategory.model';

import {SUBCATEGORIES_API_URL} from '../constants/api';
import { ReplaySubject } from 'rxjs';


@Injectable()
export class SubCategoryService {

  constructor(private http: Http) { }

  public getSubCategories(): Observable<ISubCategoryModel[]> {
      return this.http.get(SUBCATEGORIES_API_URL)
          .map(response => response.json());       
  }
  
  public getSubCategory(id: string): Promise<any> {
      return this.http.get(`${SUBCATEGORIES_API_URL}/${id}`)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
  }

  public saveSubCategory(subCategory: ISubCategoryModel): Promise<ISubCategoryModel>  {
      if (subCategory._id) {
          return this.put(subCategory);
      }
      return this.post(subCategory);
  }

  public deleteSubCategory(subCategory: ISubCategoryModel): Promise<any> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = `${SUBCATEGORIES_API_URL}/${subCategory._id}`;
      return this.http
          .delete(url, headers)
          .toPromise()
          .catch(this.handleError);
  }

  private post(subCategory: ISubCategoryModel): Promise<ISubCategoryModel> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
        .post(SUBCATEGORIES_API_URL, JSON.stringify(subCategory), {'headers': headers})
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError);
  }

  private put(subCategory: ISubCategoryModel): Promise<ISubCategoryModel> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${SUBCATEGORIES_API_URL}/${subCategory._id}`;
    return this.http
        .put(url, JSON.stringify(subCategory), {'headers': headers})
        .toPromise()
        .then(() => subCategory)
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
