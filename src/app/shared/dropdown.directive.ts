import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    
    @HostBinding('class.open') showClass: boolean = false;
    
    @HostListener('click') onOpenDropdown(){
        this.showClass = !this.showClass;
    }
}