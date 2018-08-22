import { Directive, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({    
    selector: '[safeUrl]',
    exportAs: 'safeUrl'
})
export class SafeUrl {

    @Input()
    protected elementSrc: string;
    protected safeSrc: any;

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.safeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.elementSrc);
    }

}