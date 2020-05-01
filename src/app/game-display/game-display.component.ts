import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../wikipedia-service.service';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit {

  Goal:string;
  GoalDescription:string;
  WikiService: WikipediaService;
  constructor(wikiService : WikipediaService) {
    this.WikiService = wikiService;
    var goal;
    this.WikiService.getRandomArticle().subscribe((res : WikiArticle) => {
      Object.keys(res.query.pages).forEach(function(k){
        goal = res.query.pages[k].title;
      });
    this.Goal = goal;
    })
  }

  ngOnInit() {
  }

}

interface WikiArticle{
  query?: any;
}