import { NgModule } from '@angular/core';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FromNowPipe } from './from-now.pipe';
import { ProfilePicturePipe } from './profilePicture.pipe';
import { BackgroundPicturePipe } from './backgroundPicture.pipe';


@NgModule({
    declarations: [
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        TruncatePipe,
        FromNowPipe,
        ProfilePicturePipe,
        BackgroundPicturePipe,
    ],
    imports     : [],
    exports     : [
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        TruncatePipe,
        FromNowPipe,
        ProfilePicturePipe,
        BackgroundPicturePipe,
    ],
})

export class AppPipesModule {

}
