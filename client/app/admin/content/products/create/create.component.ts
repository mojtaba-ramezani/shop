import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IProductModel} from '../../../../models/product.model';
import {ProductService} from '../../../../services/product.service';

import {DigitValidator} from '../../../../validators/digit.validator';
import {NameValidator} from '../../../../validators/name.validator';

import { MatSnackBar } from '@angular/material';

import {CREATE_MESSAGE} from '../../../../constants/messages';


@Component({
    selector: 'create-product',
    templateUrl: './create.view.html',
    styleUrls: ['./create.style.scss'],
})

export class ProductCreateComponent implements OnInit, AfterViewInit {
    @ViewChild('nameInput') public nameInput: ElementRef;
    @Input() public product: IProductModel;
    @Input() private error: any;

    public spinnerColor: string = 'accent';
    public spinnerMode: string = 'indeterminate';
    public spinnerValue: number = 50;

    public step: number = 0;

    public setStep(index: number) {
        this.step = index;
    }

    public nextStep() {
        this.step++;
    }

    public prevStep() {
        this.step--;
    }

    public createProductForm: FormGroup;
    public createProductFormErrors: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private renderer: Renderer) {
            this.createProductFormErrors = {
                name   : {},
                code: {},
                quantity: {},
                amountPeopleSaved: {},
                subCategoryId: {},
            };
    }


    public ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.product = new IProductModel();
        });

        this.createProductForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required, NameValidator.validate])],
            code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
            amountPeopleSaved   : ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required, DigitValidator.validate])],
            subCategoryId: ['', Validators.compose([Validators.required])],
        });
        this.createProductForm.valueChanges.subscribe(() => {
            this.onCreateProductFormValuesChanged();
        });
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
          this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus', []);
          // this.nameInput.nativeElement.value = 'sdsdsklsklsd';
        }, 50);
      }

    private onCreateProductFormValuesChanged() {
        for ( const field in this.createProductFormErrors ) {
            if ( !this.createProductFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            this.createProductFormErrors[field] = {};

            const control = this.createProductForm.get(field);

            if ( control && control.dirty && !control.valid ) {
                this.createProductFormErrors[field] = control.errors;
            }
        }
    }

    public saveProduct() {
        this.productService
            .saveProduct(this.product)
            .then(product => {
                this.product = product;
                let msg = CREATE_MESSAGE.replace('{0}', this.createProductForm.value.name);
                this.openSnackBar(msg, 'x');
                // setInterval(function() {
                //     this.goBack();
                // }, 10000)
            })
            .catch(error => {
                this.error = error;
            });
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    public static goBack() {
        window.history.back();
    }
}
