import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.sass']
})
export class AppToolbarComponent {
  @Input() title: string;
  @Output() menuToggle = new EventEmitter<void>();

  emitMenuToggle(): void {
    this.menuToggle.emit();
  }
}
