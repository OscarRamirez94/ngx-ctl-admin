import { Component } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  template: `
  <div class="row">
  <div class="col-lg-12">
    <nb-card>
      <nb-card-header>Default Inputs</nb-card-header>
      <nb-card-body>
        <div>
          <h1>dashboard</h1>
        </div>
        </nb-card-body>
</nb-card>
  </div>
</div>

    <router-outlet>
    </router-outlet>
  `,
})
export class DashboardComponent {
}
