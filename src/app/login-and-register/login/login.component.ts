import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    console.log(this.el.nativeElement);
    this.renderer2.setStyle(this.el.nativeElement.querySelector('p'), 'color', 'red');
    const testDiv = this.renderer2.createElement('div', '<div>fasfdsafdsafdsa</div>');
    // testDiv = this.renderer2.createText('fdsafdas');
    testDiv.innerHTML = '<div style="color: aquamarine">fdjskalfjldsa</div>';
    this.renderer2.appendChild(this.el.nativeElement, testDiv);
  }

}
