import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() pageSort: string[];
  @Input() totalPages: number;
  @Input() url: string;

  numbers: number[];

  ngOnChanges(): void {
    this.numbers = [];

    for (let i = this.pageNumber - 2; i <= this.pageNumber + 2; i++) {
      this.numbers.push(i);
    }

    while (this.numbers[0] < 0) {
      this.numbers.shift();
    }

    while (this.numbers[this.numbers.length - 1] >= this.totalPages) {
      this.numbers.pop();
    }

    while (this.numbers.length < 5 && this.numbers[0] > 0) {
      this.numbers.unshift(this.numbers[0] - 1);
    }

    while (this.numbers.length < 5 && this.numbers[this.numbers.length - 1] < this.totalPages - 1) {
      this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
    }
  }

}
