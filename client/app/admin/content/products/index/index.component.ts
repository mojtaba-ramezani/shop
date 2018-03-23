import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {IProductModel} from '../../../../models/product.model';
import { appAnimations } from '../../../../material-design/material-helper/animations';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

let productLength: number;

@Component({
   selector: 'index-products',
   templateUrl: './index.view.html',
   styleUrls: ['./index.style.scss'],
   animations : appAnimations,
})

export class ProductsIndexComponent implements OnInit {
    public displayedColumns: Array<any> =
      ['id', 'image', 'name', 'code', 'amountPeopleSaved', 'quantity', 'active', 'subCategoryId'];
    public exampleDatabase = new ExampleDatabase();
    public selection = new SelectionModel<string>(true, []);
    public dataSource: ExampleDataSource | null;
    public max: number = 3;
    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;
    @ViewChild('filter') public filter: ElementRef;
    @Input() public products: IProductModel[];
    @Input() private error: any;

    constructor(
        private productService: ProductService, private router: Router) { }

    public ngOnInit(): void {
        this.getProducts();
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
            if ( !this.dataSource ) {
              return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
   }

   public getProducts() {
       this.productService.getProducts()
       .subscribe( data => {
           this.products = data;
           productLength = this.products.length;
           this.setData();
           }, error => console.log(error),
       );
   }

   public showLink(id) {
       this.router.navigate([`admin/products/show/${id}`]);
   }
   public addProduct() {
       this.router.navigate(['admin/products', 'create']);
   }

   public setData() {
       for( let i = 0; i < this.products.length; i++) {
          AMOUNTPEOPLESAVED.push((this.products[i].amountPeopleSaved));
          NAMES.push(this.products[i].name);
          ID.push((this.products[i]._id));
          CODE.push((this.products[i].code));
          QUANTITY.push((this.products[i].quantity));
          SUBCATEGORYID.push((this.products[i].subCategoryId));
     }
   }


    public isAllSelected(): boolean {
        if ( !this.dataSource ) {
            return false;
        }
        if ( this.selection.isEmpty() ) {
            return false;
        }
        if ( this.filter.nativeElement.value ) {
            return this.selection.selected.length === this.dataSource.renderedData.length;
        } else {
            return this.selection.selected.length === this.exampleDatabase.data.length;
        }
    }

    public masterToggle() {
        if ( this.dataSource ) {
            return;
        }

        if ( this.isAllSelected() ) {
            this.selection.clear();
        } else if ( this.filter.nativeElement.value ) {
            this.dataSource.renderedData.forEach(data => this.selection.select(data._id));
        } else {
            this.exampleDatabase.data.forEach(data => this.selection.select(data._id));
        }
    }
}

const AMOUNTPEOPLESAVED = [];
const NAMES = [];
const ID = [];
const CODE = [];
const QUANTITY = [];
const SUBCATEGORYID = [];

export class ExampleDatabase {
    public dataChange: BehaviorSubject<IProductModel[]> = new BehaviorSubject<IProductModel[]>([]);

    public get data(): IProductModel[] {
        return this.dataChange.value;
    }

    constructor() {
        setTimeout(() => {
            this.addRow();
        });
    }

    public addRow() {
        const copiedData = this.data.slice();
        for ( let i = 0; i < productLength; i++ ) {
            copiedData.push(this.createNewRow(i));
        }
        this.dataChange.next(copiedData);
    }

    private createNewRow(i) {
        return {
            id      : i + 1,
            _id : ID[i],
            name    : NAMES[i],
            code: CODE[i],
            quantity: QUANTITY[i],
            amountPeopleSaved   : AMOUNTPEOPLESAVED[i],
            subCategoryId: SUBCATEGORYID[i],
      };
  }
}

export class ExampleDataSource extends DataSource<any> {
    public _filterChange = new BehaviorSubject('');

    public get filter(): string {
        return this._filterChange.value;
    }

    public set filter(filter: string) {
        this._filterChange.next(filter);
    }

    public filteredData: IProductModel[] = [];
    public renderedData: IProductModel[] = [];

    constructor(
        private _exampleDatabase: ExampleDatabase,
        private _paginator: MatPaginator,
        private _sort: MatSort,
    ) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    public connect(): Observable<IProductModel[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            this.filteredData = this._exampleDatabase.data.slice().filter((item: IProductModel) => {
                let searchStr = (item.name + item.amountPeopleSaved).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
            const sortedData = this.sortData(this.filteredData.slice());
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        });
    }

    public disconnect() { }


    public sortData(data: IProductModel[]): IProductModel[] {
        if ( !this._sort.active || this._sort.direction === '' ) {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch ( this._sort.active ) {
              case 'id':
                [propertyA, propertyB] = [a._id, b._id];
                break;
              case 'productName':
                [propertyA, propertyB] = [a.name, b.name];
                break;
              case 'code':
                [propertyA, propertyB] = [a.code, b.code];
                break;
              case 'amountPeopleSaved':
                [propertyA, propertyB] = [a.amountPeopleSaved, b.amountPeopleSaved];
                break;
            }
        let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
}
