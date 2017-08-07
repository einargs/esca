import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.sass']
})
export class AppToolbarComponent {
  @Input() title: string;
  @Output("toggleMenu") toggleMenuEmitter = new EventEmitter<void>();
  @Input() menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.toggleMenuEmitter.emit();
  }
}
