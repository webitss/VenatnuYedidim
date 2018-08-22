import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
    selector: '[fit-element]',
    exportAs: 'fit-element'
})
export class FitElement {

    @Input() public container: any;

    private containerHeight: number = 0;
    private containerWidth: number = 0;
    private src: string = '';
    private ratio: number = 0;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (this.el.nativeElement.style.height == '')
            this.el.nativeElement.style.height = '50px';
    }

    ngAfterViewChecked() {
        if (this.el.nativeElement.clientHeight != null && this.el.nativeElement.clientWidth &&
            (this.el.nativeElement.src != this.src || this.container.clientHeight != this.containerHeight || this.container.clientWidth != this.containerWidth)) {
            this.src = this.el.nativeElement.src;
            this.containerHeight = this.container.clientHeight;
            this.containerWidth = this.container.clientWidth;
            this.ratio = this.el.nativeElement.clientHeight / this.el.nativeElement.clientWidth;
            this.setSize();
        }
    }

    setSize() {
        let heightSize = this.el.nativeElement.clientHeight <= this.container.clientHeight ? this.el.nativeElement.clientHeight : this.container.clientHeight;
        //plus
        for (let i = heightSize; i <= this.container.clientHeight; i++) {
            if (this.el.nativeElement.clientHeight < this.container.clientHeight || this.el.nativeElement.clientWidth < this.container.clientWidth) {
                heightSize++;
                this.el.nativeElement.style.height = (this.el.nativeElement.clientHeight + 1) + "px";;
                this.el.nativeElement.style.width = (this.el.nativeElement.clientWidth + (this.el.nativeElement.style.height * this.ratio)) + "px";
            }
        }
        // //minus
        for (let i = heightSize; i >= 1; i--) {
            if (this.el.nativeElement.clientHeight > this.container.clientHeight || this.el.nativeElement.clientWidth > this.container.clientWidth) {
                heightSize--;
                this.el.nativeElement.style.height = (this.el.nativeElement.clientHeight - 1) + "px";
                this.el.nativeElement.style.width = (this.el.nativeElement.clientWidth - (this.el.nativeElement.style.height * this.ratio)) + "px";
            }
        }
    }

}