import {Pipe, PipeTransform} from '@angular/core';
import {LAYOUTPATHS} from '../constants/path';

@Pipe({name: 'backgroundPicture'})
export class BackgroundPicturePipe implements PipeTransform {
  public transform(input: string, ext = 'png'): string {
    return LAYOUTPATHS.images.backgrounds + input + '.' + ext;
  }
}