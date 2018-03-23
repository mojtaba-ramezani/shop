import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {CategoryService} from '../../../../services/category.service';
import {ICategoryModel} from '../../../../models/category.model';
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

let categoryLength: number;

@Component({
   selector: 'index-categories',
   templateUrl: './index.view.html',
   styleUrls: ['./index.style.scss'],
   animations : appAnimations,
})

export class CategoriesIndexComponent implements OnInit {
  public displayedColumns: Array<any> = ['id', 'image', 'name', 'code', 'active'];
  public exampleDatabase = new ExampleDatabase();
  public selection = new SelectionModel<string>(true, []);
  public dataSource: ExampleDataSource | null;

  public max: number = 3;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild('filter') public filter: ElementRef;

  @Input() public categories: ICategoryModel[];
  @Input() private error: any;

  constructor(
       private categoryService: CategoryService, private router: Router,
       ) {  }

    public ngOnInit(): void {
    this.getCategories();
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

   public getCategories() {
    this.categoryService.getCategories()
    .subscribe( data => {
      this.categories = data;
      categoryLength = this.categories.length;
      this.setData();
    }, error => console.log(error),                     
    );
   }  

   public showLink(id) {
    this.router.navigate([`admin/categories/show/${id}`]);
   }
   public addCategory() {
    this.router.navigate(['admin/categories', 'create']);
   }

   public setData() {
    for ( let i = 0; i < this.categories.length; i++) {
      NAMES.push(this.categories[i].name);
      ID.push((this.categories[i]._id));
      CODE.push((this.categories[i].code));
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


const NAMES = [];
const ID = [];
const CODE = [];

export class ExampleDatabase {
  public dataChange: BehaviorSubject<ICategoryModel[]> = new BehaviorSubject<ICategoryModel[]>([]);

  public get data(): ICategoryModel[] {
    return this.dataChange.value;
  }

  constructor() {
    setTimeout(() => {
        this.addRow();
    });
  }

  public addRow() {
    const copiedData = this.data.slice();
    for ( let i = 0; i < categoryLength; i++ ) {
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
      };
  }
}

export class ExampleDataSource extends DataSource<any> {
  public _filterChange = new BehaviorSubject('');

  public get filter(): string
  {
    return this._filterChange.value;
  }

  public set filter(filter: string)
  {
    this._filterChange.next(filter);
  }

  public filteredData: ICategoryModel[] = [];
  public renderedData: ICategoryModel[] = [];

  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort,
  ) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  public connect(): Observable<ICategoryModel[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._exampleDatabase.data.slice().filter((item: ICategoryModel) => {
        let searchStr = (item.name + item.code).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  public disconnect() {

  }


  public sortData(data: ICategoryModel[]): ICategoryModel[] {
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
        case 'categoryName':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'code':
          [propertyA, propertyB] = [a.code, b.code];
          break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
