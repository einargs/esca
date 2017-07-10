import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: [ "./app.component.sass" ]
})
export class AppComponent  {
  title = 'Esca';
  links = [
    { name: "My Recipes", url: "/recipe" }
  ];
}
