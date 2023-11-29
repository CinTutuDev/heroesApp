import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public hero! : Hero;

  constructor() { }

  ngOnInit(): void {
    if(!this.hero) throw Error ('Hero property is required')
  }

}
