import { Injectable } from '@angular/core';
import { PhotoLibrary, LibraryItem} from '@ionic-native/photo-library/ngx';

import { Observable, from} from 'rxjs';
import { switchMap, take} from 'rxjs/operators';

@Injectable()
export class UtilsService {
    constructor(
        private photoLibrary: PhotoLibrary
    ) {}

    downloadCanvas = (src: string, fileName = '') =>  from(this.PhotoLibraryRequestAuthorization()).pipe(
        switchMap(this.PhotoLibraryGetLibrary),
        switchMap(() => this.PhotoLibrarySaveImage(src, fileName)),
        take(1),
    )

    private PhotoLibraryRequestAuthorization = (): Promise<void> => this.photoLibrary.requestAuthorization({
        'read': true,
        'write': true
    })

    private PhotoLibraryGetLibrary = (): Observable<LibraryItem[]> => this.photoLibrary.getLibrary();

    private PhotoLibrarySaveImage = (src: string, fileName = '') => this.photoLibrary.saveImage(src, fileName);

}
