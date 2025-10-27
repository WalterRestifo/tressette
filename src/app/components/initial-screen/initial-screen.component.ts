import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial-screen',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './initial-screen.component.html',
  styleUrl: './initial-screen.component.scss',
})
export class InitialScreenComponent {
  form = new FormGroup({
    session: new FormControl(),
  });
}
