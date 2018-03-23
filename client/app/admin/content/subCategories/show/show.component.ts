import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ISubCategoryModel} from '../../../../models/subCategory.model';
import {SubCategoryService} from '../../../../services/subCategory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DigitValidator} from '../../../../validators/digit.validator';
import { MatSnackBar } from '@angular/material';
import {CREATE_MESSAGE} from '../../../../constants/messages';

import {IProductModel} from '../../../../models/product.model';
import {ProductService} from '../../../../services/product.service';


@Component({
    selector: 'show-subCategory',
    templateUrl: './show.view.html',
    styleUrls: ['./show.style.scss'],
})

export class SubCategoryShowComponent implements OnInit {
    @Input() public subCategory: ISubCategoryModel;
    @Input() public newSubCategory: boolean = false;
    @Input() private error: any;
    @Input() public products: IProductModel[];
    

    public createSubCategoryForm: FormGroup;
    public createSubCategoryFormErrors: any;

    constructor(
        private subCategoryService: SubCategoryService,
        private productService: ProductService,
        private route: ActivatedRoute, private formBuilder: FormBuilder,
        public snackBar: MatSnackBar) {
            this.createSubCategoryFormErrors = {
                name   : {},
                code: {},
            };
    }

    public ngOnInit(): void {
        //this.getProductsOfThisSubCategory();
        this.createSubCategoryForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required])],
            code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
        });
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.newSubCategory = false;
            this.subCategoryService.getSubCategory(id)
                .then(subCategory => this.subCategory = subCategory);
            this.productService.getProductsOfThisSubCategory(id)
                .subscribe( products => {
                    this.products = products;
                }, error => console.log(error));         
        });
        this.createSubCategoryForm.valueChanges.subscribe(() => {
            this.onCreateSubCategoryFormValuesChanged();
        });
    }
    private onCreateSubCategoryFormValuesChanged() {
        for ( const field in this.createSubCategoryFormErrors ) {
            if ( !this.createSubCategoryFormErrors.hasOwnProperty(field) ) {
                continue;
            }
            this.createSubCategoryFormErrors[field] = {};
            const control = this.createSubCategoryForm.get(field);
            if ( control && control.dirty && !control.valid ) {
                this.createSubCategoryFormErrors[field] = control.errors;
            }
        }
    }

    // public getProductsOfThisSubCategory() {
    //     this.subCategoryService.getProductsOfThisSubCategory()
    //     .subscribe( data => {
    //         this.products = data;
    //         }, error => console.log(error),
    //     );
    // }
    
    protected saveSubCategory() {
        this.subCategoryService
            .saveSubCategory(this.subCategory)
            .then(subCategory => {
                this.subCategory = subCategory;
                let msg = CREATE_MESSAGE.replace('{0}', this.createSubCategoryForm.value.name);
                this.openSnackBar(msg, 'x');
                SubCategoryShowComponent.goBack();
            })
            .catch(error => this.error = error);
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

     public static goBack(): void {
        window.history.back();
    }
}
