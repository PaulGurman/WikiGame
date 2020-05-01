import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

    return this.http.get(random);
  }

  getLinks(title:string)
  {
    var query = "?origin=*&action=query&titles=" + encodeURIComponent(title) + "&" + "prop=links&pllimit=max&format=json";
    console.log(this.url+query);
    return this.http.get(this.url + query);
  }

}

