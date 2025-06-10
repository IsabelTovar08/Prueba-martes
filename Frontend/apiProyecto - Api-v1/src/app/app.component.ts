import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
