import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {SubCategoryService} from '../../../../services/subCategory.service';
import {ISubCategoryModel} from '../../../../models/subCategory.model';
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

let subCategoryLength: number;

@Component({
  selector: 'index-subCategories',
  templateUrl: './index.view.html',
  styleUrls: ['./index.style.scss'],
  animations : appAnimations,
})

export class SubCategoriesIndexComponent implements OnInit {
  public displayedColumns: Array<any> = ['id', 'image', 'name', 'code', 'active'];
  public exampleDatabase = new ExampleDatabase();
  public selection = new SelectionModel<string>(true, []);
  public dataSource: ExampleDataSource | null;

  public max: number = 3;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild('filter') public filter: ElementRef;

  @Input() public subCategories: ISubCategoryModel[];
  @Input() private error: any;

  constructor(
    private subCategoryService: SubCategoryService, private router: Router,
  ) {  }

  public ngOnInit(): void {
    this.getSubCategories();
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

  public getSubCategories() {
    this.subCategoryService.getSubCategories()
    .subscribe( data => {
      this.subCategories = data;
      subCategoryLength = this.subCategories.length;
      this.setData();
    }, error => console.log(error),                     
    );
  }  

  public showLink(id) {
    this.router.navigate([`admin/subCategories/show/${id}`]);
  }
  public addSubCategory() {
    this.router.navigate(['admin/subCategories', 'create']);
  }

  public setData() {
    for(let i = 0; i < this.subCategories.length; i++) {
      NAMES.push(this.subCategories[i].name);
      ID.push((this.subCategories[i]._id));
      CODE.push((this.subCategories[i].code));
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
  public dataChange: BehaviorSubject<ISubCategoryModel[]> = new BehaviorSubject<ISubCategoryModel[]>([]);

  public get data(): ISubCategoryModel[] {
    return this.dataChange.value;
  }

  constructor() {
    setTimeout(() => {
      this.addRow();
    });
  }

  public addRow() {
    const copiedData = this.data.slice();
    for ( let i = 0; i < subCategoryLength; i++ ) {
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

  public filteredData: ISubCategoryModel[] = [];
  public renderedData: ISubCategoryModel[] = [];

  constructor(
    private _exampleDatabase: ExampleDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort,
  ) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  public connect(): Observable<ISubCategoryModel[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._exampleDatabase.data.slice().filter((item: ISubCategoryModel) => {
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


  public sortData(data: ISubCategoryModel[]): ISubCategoryModel[] {
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
        case 'subCategoryName':
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
