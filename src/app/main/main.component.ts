import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  lottos: Array<Array<number>>;
  count: number;
  constructor(
    private randomService: RandomService
  ) {
    this.lottos = new Array<Array<number>>();
    this.count = 5;
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
