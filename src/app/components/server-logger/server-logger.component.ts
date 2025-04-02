import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-server-logger',
  templateUrl: './server-logger.component.html',
  styleUrls: ['./server-logger.component.css']
})
export class ServerLoggerComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformServer(this.platformId)) {
      console.log('This message appears only on the server side.');
    }
  }

  ngOnInit() {
  }

}
