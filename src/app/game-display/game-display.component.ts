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
    this.WikiService.getRandomArticle().subscribe((res : Array<WikiArticle>) => {
      Object.keys(res[res.length - 1].query.pages).forEach(k => {
        this.Goal = res[res.length - 1].query.pages[k].title;
        wikiService.getArticleDescription(res[res.length - 1].query.pages[k].pageid).subscribe((desc : WikiArticle) => {
          Object.keys(desc.query.pages).forEach((i) => {
            this.GoalDescription = desc.query.pages[i].extract;
          });
        });
      });
    });
  }
  
  ngOnInit() {
  }

}

interface WikiArticle{
  query?: any;
}