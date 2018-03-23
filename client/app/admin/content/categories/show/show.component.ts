import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ICategoryModel} from '../../../../models/category.model';
import {CategoryService} from '../../../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DigitValidator} from '../../../../validators/digit.validator';
import { MatSnackBar } from '@angular/material';
import {CREATE_MESSAGE} from '../../../../constants/messages';


@Component({
    selector: 'show-category',
    templateUrl: './show.view.html',
    styleUrls: ['./show.style.scss'],
})

export class CategoryShowComponent implements OnInit {
    @Input() public category: ICategoryModel;
    @Input() public newCategory: boolean = false;
    @Input() private error: any;

    public createCategoryForm: FormGroup;
    public createCategoryFormErrors: any;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute, private formBuilder: FormBuilder,
        public snackBar: MatSnackBar) {
            this.createCategoryFormErrors = {
                name   : {},
                code: {},
            };
    }

    public ngOnInit(): void {
        this.createCategoryForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required])],
            code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
        });
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
                this.newCategory = false;
                this.categoryService.getCategory(id)
                    .then(category => this.category = category);
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

    protected saveCategory() {
        this.categoryService
            .saveCategory(this.category)
            .then(category => {
                this.category = category;
                let msg = CREATE_MESSAGE.replace('{0}', this.createCategoryForm.value.name);
                this.openSnackBar(msg, 'x');
                CategoryShowComponent.goBack();
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
