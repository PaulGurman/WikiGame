import { Component, OnInit, Input } from '@angular/core';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { WikipediaService } from '../wikipedia-service.service';

@Component({
  selector: 'app-link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.scss']
})
export class LinkContainerComponent implements OnInit {
  @Input() GoalArticle: string;

  buttons = Array<LinkButtonComponent>();
  buttonContents = Array<string>();
  CurrentArticle: string;
  GoalDescription: string;
  WikiService: WikipediaService;
  
  constructor(wikiService : WikipediaService) { 
    var randomArticle;
    this.WikiService = wikiService;
    wikiService.getRandomArticle().subscribe((res : WikiArticle) =>
    {
      Object.keys(res.query.pages).forEach(function(k){
        randomArticle = res.query.pages[k].title;
      });
      this.CurrentArticle = randomArticle;
      
      var buttonArray = [];
      var contents = [];
      wikiService.getLinks(this.CurrentArticle).subscribe((res : WikiArticle) =>
      {
        Object.keys(res.query.pages).forEach(function(k){
          res.query.pages[k].links.forEach(link => {
            buttonArray.push(new LinkButtonComponent());
            contents.push(link.title);
          });
        });

        this.buttons = buttonArray;
        this.buttonContents = contents;
      })
    });
  }

  ngOnInit() {
    for(var i = 0; i < 100; i++)
    {
      this.buttons.push(new LinkButtonComponent())
    }
  }

  SelectionMade(i: any)
  {
    this.CurrentArticle = this.buttonContents[i];

  
    this.WikiService.getLinks(this.CurrentArticle).subscribe((res : WikiArticle) =>
    {
      var buttonArray = [];
      var contents = [];
      Object.keys(res.query.pages).forEach(function(k){
        res.query.pages[k].links.forEach(link => {
          buttonArray.push(new LinkButtonComponent());
          contents.push(link.title);
        });
      });

      this.buttons = buttonArray;
      this.buttonContents = contents;
    });

  }
}

interface WikiArticle{
  query?: any;
}

