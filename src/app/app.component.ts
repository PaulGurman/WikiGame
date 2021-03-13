import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientSocketService } from './client-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WikiGame';

  constructor(private router : Router){}
  ngOnInit()
  {
    this.router.navigate(['GameDisplay'])
  }
}
