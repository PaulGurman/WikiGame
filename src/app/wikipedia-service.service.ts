import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  random_url: string = "https://en.wikipedia.org/w/api.php"; 

  params = {
      action: "query",
      format: "json",
      list: "random",
      rnlimit: "1"
  };
  
  constructor(private http: HttpClient) { }

  getRandomArticle()
  {
    var random = this.random_url;
    var params = this.params;
    random += "?origin=*";
    Object.keys(this.params).forEach(function(key){random += "&" + key + "=" + params[key];});
    console.log(this.http.get(random).subscribe((response : any) => {response.json}));
  }
}
