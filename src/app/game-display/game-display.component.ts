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
    this.WikiService.getRandomArticle().subscribe((res : WikiArticle) => {
      Object.keys(res.query.pages).forEach(k => {
        this.Goal = res.query.pages[k].title;
        wikiService.getArticleDescription(res.query.pages[k].pageid).subscribe((desc : WikiArticle) => {
          Object.keys(desc.query.pages).forEach((i) => {
            this.GoalDescription = desc.query.pages[i].extract;
          });
        });
      });
    })
  }
  
  ngOnInit() {
  }

}

interface WikiArticle{
  query?: any;
}