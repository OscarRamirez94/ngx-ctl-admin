import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
     <b>Calidad, Lealtad y Trabajo</b>
    </span>
    <div class="socials">
      <a href="#" target="_blank">
      <img  class="img-fluid" alt="Responsive image" src="/assets/images/logopng.png">
    </a>

    </div>
  `
})
export class FooterComponent {
}
