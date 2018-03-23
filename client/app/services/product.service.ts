import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {IProductModel} from '../models/product.model';
import { Observable } from 'rxjs/Observable';
import {PRODUCTS_API_URL, SUBCATEGORIES_API_URL} from '../constants/api';

@Injectable()
export class ProductService {


    constructor(private http: Http) { }

    public getProducts(): Observable<IProductModel[]> {
        return this.http.get(PRODUCTS_API_URL)
            .map(response => response.json());
        }
    
    
    public getProductsOfThisSubCategory(id: string): Observable<IProductModel[]> {
        return this.http.get(`${SUBCATEGORIES_API_URL}/${id}/products`)
            .map(response => response.json());          
    }

    public getProduct(id: string): Promise<any> {
        return this.http.get(`${PRODUCTS_API_URL}/${id}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public saveProduct(product: IProductModel): Promise<IProductModel>  {
        if (product._id) {
            return this.put(product);
        }
        return this.post(product);
    }

    public deleteProduct(product: IProductModel): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${PRODUCTS_API_URL}/${product._id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private post(product: IProductModel): Promise<IProductModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(PRODUCTS_API_URL, JSON.stringify(product), {'headers': headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(product: IProductModel): Promise<IProductModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${PRODUCTS_API_URL}/${product._id}`;

        return this.http
            .put(url, JSON.stringify(product), {'headers': headers})
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise
            .reject(error.message || error);
    }

    private extractData(response: any) {
        return Promise
            .resolve(response.json())
    }
}
