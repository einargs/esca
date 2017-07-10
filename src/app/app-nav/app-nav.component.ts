import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.sass']
})
export class AppNavComponent {
  @Input() links: any[];
}
