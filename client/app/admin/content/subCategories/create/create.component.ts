import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ISubCategoryModel} from '../../../../models/subCategory.model';
import {SubCategoryService} from '../../../../services/subCategory.service';
import {DigitValidator} from '../../../../validators/digit.validator';
import { MatSnackBar } from '@angular/material';
import {CREATE_MESSAGE} from '../../../../constants/messages';


@Component({
  selector: 'create-subCategory',
  templateUrl: './create.view.html',
  styleUrls: ['./create.style.scss'],
})

export class SubCategoryCreateComponent implements OnInit {
  @Input() public subCategory: ISubCategoryModel;
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

  public createSubCategoryForm: FormGroup;
  public createSubCategoryFormErrors: any;

  constructor(
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar) {
    this.createSubCategoryFormErrors = {
      name   : {},
      code: {},
    };
  }

  public ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.subCategory = new ISubCategoryModel();
    });

    this.createSubCategoryForm = this.formBuilder.group({
      name   : ['', Validators.compose([Validators.required])],
      code: ['', Validators.compose([Validators.required, DigitValidator.validate])],
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

  public saveSubCategory() {
    this.subCategoryService
      .saveSubCategory(this.subCategory)
      .then(subCategory => {
          this.subCategory = subCategory;
          let msg = CREATE_MESSAGE.replace('{0}', this.createSubCategoryForm.value.name);
          this.openSnackBar(msg, 'x');
          SubCategoryCreateComponent.goBack();
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
