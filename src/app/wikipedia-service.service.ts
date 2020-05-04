import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, retry, expand, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  url: string = "https://en.wikipedia.org/w/api.php"; 

  randomparams = {
      action: "query",
      format: "json",
      generator: "random",
      grnnamespace: "0",
      prop: "revisions|images",
      rvprop: "content",
      grnlimit: "1"
  };
  
  constructor(private http: HttpClient) {  }

  getRandomArticle()
  {
    var random = this.url;
    var params = this.randomparams;
    random += "?origin=*";
    Object.keys(this.randomparams).forEach(function(key){random += "&" + key + "=" + params[key];});
    return this.http.get(random).pipe(
      expand((response : WikiArticle) => {
        var title : string;
        Object.keys(response.query.pages).forEach((k) => title = response.query.pages[k].title);
        if(title == null || title.match(new RegExp("(disambiguation)", "i"))){
          return this.http.get(random);
        }
        return EMPTY; 
      }), toArray()
    );
  }

  getArticleDescription(pageid:string)
  {
    return this.http.get(this.url + "?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + pageid);
  }

  getLinks(title:string, plcontinue:string = "")
  {
    var query = "?origin=*&action=query&titles=" + encodeURIComponent(title) + "&prop=links&pllimit=max&format=json" + plcontinue;
    return this.http.get(this.url + query).pipe(
      expand((response : WikiArticle) => {
        if(response.batchcomplete != "")
        {
          return this.http.get(this.url + query + "&plcontinue=" + response.continue.plcontinue);
        } else  
        {
          return EMPTY;
        }
      }), toArray()
    );
  }

}

interface WikiArticle{
  query?: any;
  batchcomplete?: any;
  continue?: {
    plcontinue? : string;
  };
}

