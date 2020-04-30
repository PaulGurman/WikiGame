import { Component, OnInit } from '@angular/core';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { WikipediaService } from '../wikipedia-service.service';

@Component({
  selector: 'app-link-container',
  templateUrl: './link-container.component.html',
  styleUrls: ['./link-container.component.scss']
})
export class LinkContainerComponent implements OnInit {

  buttons = Array<LinkButtonComponent>();
  CurrentArticle: string;
  constructor(wikiServer : WikipediaService) { 
    this.CurrentArticle = "Article";
    wikiServer.getRandomArticle();
  }

  ngOnInit() {
    for(var i = 0; i < 100; i++)
    {
      this.buttons.push(new LinkButtonComponent())
    }
  }

  SelectionMade(i: any)
  {
    console.log(i)
    this.CurrentArticle = i;
  }

}
