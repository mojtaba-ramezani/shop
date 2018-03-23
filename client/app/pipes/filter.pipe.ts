import { Pipe, PipeTransform } from '@angular/core';
import { AppUtils } from '../material-design/material-helper/appUtils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    public transform(mainArr: any[], searchText: string, property: string): any {
        return AppUtils.filterArrayByString(mainArr, searchText);
    }
}
