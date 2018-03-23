import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {IProductModel} from '../../../../models/product.model';
import {ProductService} from '../../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DigitValidator} from '../../../../validators/digit.validator';
import { MatSnackBar } from '@angular/material';
import {CREATE_MESSAGE} from '../../../../constants/messages';


@Component({
    selector: 'show-product',
    templateUrl: './show.view.html',
    styleUrls: ['./show.style.scss'],
})

export class ProductShowComponent implements OnInit {
    @Input() public product: IProductModel;
    @Input() public newProduct: boolean = false;
    @Input() private error: any;
    public createProductForm: FormGroup;
    public createProductFormErrors: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute, private formBuilder: FormBuilder,
        public snackBar: MatSnackBar) {
            this.createProductFormErrors = {
                name   : {},
                code: {},
                quantity: {},
                amountPeopleSaved: {},
            };
        }

    public ngOnInit(): void {
        this.createProductForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required])],
            code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
            amountPeopleSaved   : ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required, DigitValidator.validate])],
        });
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.newProduct = false;
            this.productService.getProduct(id)
                .then(product => this.product = product);
        });
        this.createProductForm.valueChanges.subscribe(() => {
            this.onCreateProductFormValuesChanged();
        });
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

    protected saveProduct() {
        this.productService
        .saveProduct(this.product)
        .then(product => {
            this.product = product;
            let msg = CREATE_MESSAGE.replace('{0}', this.createProductForm.value.name);
            this.openSnackBar(msg, 'x');
            ProductShowComponent.goBack();
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
