import { Component, OnInit, Input } from '@angular/core';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { WikipediaService } from '../wikipedia-service.service';
import { Observable } from 'rxjs';

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
  WikiService: WikipediaService;

  searchInProgress: boolean = false;
  
  IgnoredLinks: RegExp = /(Category:)|(Portal:)|(Talk:)|(Wikipedia:)|(Template:)|(Template talk:)|(Help:)|(File:)|(Module:)/;

  constructor(wikiService : WikipediaService) { 
    var randomArticle;
    this.WikiService = wikiService;
    wikiService.getRandomArticle().subscribe((res : WikiArticle) =>
    {
      Object.keys(res.query.pages).forEach(function(k){
        randomArticle = res.query.pages[k].title;
      });
      this.CurrentArticle = randomArticle;
      
      
      wikiService.getLinks(this.CurrentArticle).subscribe((res : Array<WikiArticle>) => res.forEach(response => {
        Object.keys(response.query.pages).forEach((k) => {
          response.query.pages[k].links.forEach((link : any) => {
            if(link.title[0] != "." && !link.title.match(this.IgnoredLinks))
            {
              this.buttons.push(new LinkButtonComponent());
              this.buttonContents.push(link.title);
            }
          })
        })
      }));
    });
  }

  ngOnInit() {
    console.log("Initialized")
  }


  SelectionMade(i: any)
  {
    // Set current article to the content corresponding to the button
    this.CurrentArticle = this.buttonContents[i];

    // Check if current article is goal
    if(this.CurrentArticle == this.GoalArticle)
    {
      this.CurrentArticle = "Won!";
      return;
    }

    var links = [];

    this.searchInProgress = true;

    this.WikiService.getLinks(this.CurrentArticle).subscribe((res : Array<WikiArticle>) => {  
      res.forEach((response) => {

      Object.keys(response.query.pages).forEach((k) => {
        response.query.pages[k].links.forEach((link : any) => {
          if(link.title[0] != "." && !link.title.match(this.IgnoredLinks))
          {
            links.push(link.title);
          }});
        });
      });
        

      var numOfNewLinks = links.length - this.buttonContents.length;
      // More new links than before
      if(numOfNewLinks > 0)
      {
        var i = 0;
        var len = this.buttonContents.length;
        while(i < links.length)
        {
          if(i < len)
          {
            // Just change the content
            this.buttonContents[i] = links[i];
          } 
          else 
          {
            // Add new button and content;
            this.buttonContents.push(links[i]);
            this.buttons.push(new LinkButtonComponent());
          }
          i++;
        }
      } else if (numOfNewLinks < 0)
      {
        var i = 0;
        len = links.length;
        while(i < this.buttonContents.length)
        {
          if(i < len)
          {
            // Just change the content
            this.buttonContents[i] = links[i];
          } else 
          {
            // Add new button and content;
            this.buttonContents.pop();
            this.buttons.pop();
          }
          i++;
        }
      }

      this.searchInProgress = false;
    });
  }


}

interface WikiArticle{
  query?: any;
  batchcomplete?: any;
  continue?: any;
}

