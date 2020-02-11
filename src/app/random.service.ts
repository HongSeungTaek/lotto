import { Injectable } from '@angular/core';
import { EnumData } from '../app/enum/enum';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  LOTTO_COUNT: number = 6;

  constructor() {}


  /* 랜덤 숫자 리턴 */
  getRandomNumber() {
    let number = (Math.random()*45)+1;
    number = parseInt(number+'');
    return number;
  }
  
  /* 정렬 함수 */
  sort(numbers:  Array<number>) {
    numbers.sort((n1,n2) => {
      if (n1 > n2) {
        return 1;
      }

      if (n1 < n2) {
       return -1;
      }

      return 0;
    });
    return ;
  }

  /* 랜덤 숫자 배열 출력 */
  async getRandomNUmbers() {
    let numbers: Array<number> = new Array<number>();

    for(let i=0; i<this.LOTTO_COUNT; i++) {
      let isSame = true;
      let number: number;
      
      while(isSame) {
        number = this.getRandomNumber();
        isSame = this.checkSameNumber(numbers, number);
      }
      numbers.push(number);
      //console.log('1=>'+numbers.join(','));

    }
    this.sort(numbers);
    return numbers;
  }

  /* 배열의 같은 수 체크 */
  checkSameNumber(numbers:  Array<number>, number: number) {
    for(let i=0; i<numbers.length; i++) {
      if(numbers[i] == number) {
        //console.log('겹침=>>'+numbers.join(',')+' // '+number);
        return true;
      }
    }

    return false;
  }



  /* 제일 낮은 숫자는 25미만의 숫자 */
  checkFirstNum(numbers: Array<number>) {
    this.sort(numbers);
    console.log('2=>'+numbers.join(','));

    let isSame = numbers[0] > 24;
    
    //if(!isSame) return;

    while(isSame) {
      numbers[0] = this.getRandomNumber();
      this.sort(numbers);
      console.log('3=>'+numbers.join(','));
      isSame = this.checkSameNumber(numbers, numbers[0]);

      if(!isSame && numbers[0] <= 24) return;

    }
  }

  /* 두번째 낮은 숫자는 30미만의 숫자 */
  checkSecondNum(numbers: Array<number>) {
    this.sort(numbers);
  }


  /* 랜덤 로또 번호 출력 */
  async _getRandomLotto() {
    let numbers: Array<number>;
    for(let i=0; i<100; i++) {
      numbers = await this.getRandomNUmbers();
      //this.sort(numbers);
      //this.checkFirstNum(numbers);
      //if(numbers[0] > 24 && numbers[1]> 24) console.log(numbers.join(','));
      //console.log('??==>'+numbers.join(','));
    }

    return numbers;
  }

  /* 연속된 숫자 */
  async alsdntlqkf(numbers: Array<number>) {
    let result = true;
    for(let i=0; i<this.LOTTO_COUNT-2; i++) {
      if((numbers[i]+2 == numbers[i+1]+1) && (numbers[i+1]+1 == numbers[i+2]) && (numbers[i]+2 == numbers[i+2])) {
        result = false;
        break;
      }
    }
    return result;
  }

  /* 체크 */
  async allCheck(numbers: Array<number>) {
    
    if( numbers[0] < 25 &&
       numbers[1] < 30 && 
       numbers[3] > 9 && //[20190924] 4번쨰자리 숫자중 1~9는 제외
       numbers[4] > 14 && 
       numbers[5] > 24 &&
       await this.alsdntlqkf(numbers)
    ) {
      return false;
    }

    return true;
  }

  async getRandomLotto() {
    let numbers: Array<number> = await this.getRandomNUmbers();;
    while(await this.allCheck(numbers)) {
      numbers = await this.getRandomNUmbers();
    }
    //console.log(numbers);
    return numbers;
  }
}

