import { AfterContentInit,Directive, ElementRef,Input, OnChanges, SimpleChanges} from "@angular/core";

@Directive({
  selector: '[appTheme]'
})

export class ThemeDirective implements AfterContentInit, OnChanges{
  @Input() appTheme: string = '';

  constructor(private element: ElementRef) {}

  ngAfterContentInit() {
    this.setTheme(this.appTheme);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.element.nativeElement.classList.contains('light')){
      this.removeTheme('light');
    }
    if(this.element.nativeElement.classList.contains('dark')){
      this.removeTheme('dark');
    }
    if(this.element.nativeElement.classList.contains('green')){
      this.removeTheme('green');
    }
    this.setTheme(this.appTheme);
  }


  private setTheme(theme: string):void{
    this.element.nativeElement.classList.add(theme);
  }

  private removeTheme(oldTheme: string){
    this.element.nativeElement.classList.remove(oldTheme);
  }
}
