import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICategoryModel} from '../../../../models/category.model';
import {CategoryService} from '../../../../services/category.service';
import { MatSnackBar } from '@angular/material';
import {DigitValidator} from '../../../../validators/digit.validator';
import {CREATE_MESSAGE} from '../../../../constants/messages';


@Component({
    selector: 'create-category',
    templateUrl: './create.view.html',
    styleUrls: ['./create.style.scss'],
})

export class CategoryCreateComponent implements OnInit {
    @Input() public category: ICategoryModel;
    @Input() private error: any;

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

    public createCategoryForm: FormGroup;
    public createCategoryFormErrors: any;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar) {
            this.createCategoryFormErrors = {
                name   : {},
                code: {},
            };
    }

    public ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.category = new ICategoryModel();
        });

        this.createCategoryForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required])],
            code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
        });
        this.createCategoryForm.valueChanges.subscribe(() => {
            this.onCreateCategoryFormValuesChanged();
        });
    }

    private onCreateCategoryFormValuesChanged() {
        for ( const field in this.createCategoryFormErrors ) {
            if ( !this.createCategoryFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            this.createCategoryFormErrors[field] = {};

            const control = this.createCategoryForm.get(field);

            if ( control && control.dirty && !control.valid ) {
                this.createCategoryFormErrors[field] = control.errors;
            }
        }
    }

    public saveCategory() {
        this.categoryService
            .saveCategory(this.category)
            .then(category => {
                this.category = category;
                let msg = CREATE_MESSAGE.replace('{0}', this.createCategoryForm.value.name);
                this.openSnackBar(msg, 'x');
                CategoryCreateComponent.goBack();
            })
            .catch(error => this.error = error);
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
