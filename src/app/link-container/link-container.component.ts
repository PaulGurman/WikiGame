import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChild('filterInput', null) filterTerm: ElementRef;

  // Arrays for buttons and buttonContents
  buttons = Array<LinkButtonComponent>();
  buttons_filtered = Array<LinkButtonComponent>();
  buttonContents = Array<string>();
  buttonContents_filtered = Array<string>();
  
  queryStack = Array<Array<any>>();

  CurrentArticle: string;
  WikiService: WikipediaService;

  searchInProgress: boolean = false;
  
  IgnoredLinks: RegExp = /(Category:)|(Portal:)|(Talk:)|(Wikipedia:)|(Template:)|(Template talk:)|(Help:)|(File:)|(Module:)/;

  constructor(private wikiService : WikipediaService, private router : Router) { 
    var randomArticle;
    this.WikiService = wikiService;
    wikiService.getRandomArticle().subscribe((res : Array<WikiArticle>) =>
    {
      Object.keys(res[res.length - 1].query.pages).forEach(function(k){
        randomArticle = res[res.length - 1].query.pages[k].title;
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
          });
        });
        this.buttonContents_filtered = this.buttonContents;
        this.buttons_filtered = this.buttons;
        this.queryStack.push(this.buttons.slice(), this.buttonContents.slice());
      }));
    });
  }

  ngOnInit() {
    console.log("Initialized")
  }


  SelectionMade(i: any)
  {
    this.queryStack = [];

    this.buttons = [];
    this.buttonContents = [];

    this.prevFilter = "";

    // Set current article to the content corresponding to the button
    this.CurrentArticle = this.buttonContents_filtered[i];
    this.filterTerm.nativeElement.value = '';
    // Check if current article is goal
    if(this.CurrentArticle == this.GoalArticle)
    {
      this.CurrentArticle = "Won!";
      this.router.navigate(['EndResults']);
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
        var old_len = this.buttonContents.length;
        while(i < old_len)
        {
          if(i < len)
          {
            // Just change the content
            this.buttonContents[i] = links[i];
          } else 
          {
            // Remove unused button and content;
            this.buttonContents.pop();
            this.buttons.pop();
          }
          i++;
        }
      }

      this.buttonContents_filtered = this.buttonContents;
      this.buttons_filtered = this.buttons;

      this.queryStack.push(this.buttons, this.buttonContents);

      this.searchInProgress = false;
    });
  }

  prevFilter : string = '';

  FilterLinks(filter : string)
  {
    if(this.prevFilter.length > filter.length)  // Are you backspacing? Then take the previous combo of buttons and contents, saves on time
    {
      var prevQuery = this.queryStack[this.queryStack.length - 1];
      this.queryStack.pop();
      this.buttons_filtered = prevQuery[0];
      this.buttonContents_filtered = prevQuery[1];
    } else {  // Save the query state in the stack, and perform a filter, remove as many buttons as needed.
      var removedButtons = this.buttons_filtered.length;
      this.queryStack.push([this.buttons_filtered.slice(), this.buttonContents_filtered.slice()]);

      this.buttonContents_filtered = this.buttonContents_filtered.filter(c => c.match(new RegExp(filter, "i")))
    
      removedButtons -= this.buttonContents_filtered.length;
      for(var i = 0; i < removedButtons; i++)
      {
        this.buttons_filtered.pop();
      }
    }
    this.prevFilter = filter;
  }

}

interface WikiArticle{
  query?: any;
  batchcomplete?: any;
  continue?: any;
}

