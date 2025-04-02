import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ServerLoggerComponent } from '../components/server-logger/server-logger.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule,RouterOutlet,ServerLoggerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
