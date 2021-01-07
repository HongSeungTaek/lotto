import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../bootstrap/bootstrap.css', './main.component.css']
})
export class MainComponent implements OnInit {
  lottos: Array<Array<number>>;
  count: number;
  constructor(
    private randomService: RandomService
  ) {
    this.lottos = new Array<Array<number>>();
    this.count = 5;
  
    //[20210107]HST 개발시 페이지 리로딩시 바로 나오게함
  /*
    this.lottos = [];
    var list = [];
    for(let i=0; i<this.count; i++) {
      this.randomService.getRandomLotto()
      .then(function(data) {
        list.push(data);
      });
    }
    this.lottos = list;
    */
  }

  ngOnInit() {
  }

  async showNumber() {
    this.lottos = [];
    let numbers: Array<number>;
    for(let i=0; i<this.count; i++) {
      numbers = await this.randomService.getRandomLotto();
      this.lottos.push(numbers);
    }
  }
}
