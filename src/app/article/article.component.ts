import { Component, OnInit } from '@angular/core';
import {Article} from '../article';
import {ARTICLES} from '../offline-articles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeParam =params.get('headline');
      console.log(this.currentArticle);

      this.currentArticle = ARTICLES.find(x => x.headline == this.routeParam)
    });
  }
  routeParam: string;
  currentArticle: Article;
  articles = ARTICLES;
}
