import {Pipe, PipeTransform} from '@angular/core';
import {LAYOUTPATHS} from '../constants/path';


@Pipe({name: 'profilePicture'})
export class ProfilePicturePipe implements PipeTransform {
  public transform(input: string, ext = 'png'): string {
    return LAYOUTPATHS.images.profile + input + '.' + ext;
  }
}
