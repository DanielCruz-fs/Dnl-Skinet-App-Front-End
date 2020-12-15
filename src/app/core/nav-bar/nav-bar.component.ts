import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  /**
   * * We're creating our own custom observable that is why we use
   * * the async pipe, furthermore we do not need to unsubscribe thanks
   * * to async pipe it is automatically done for us.
   * * On the other hand we can use the common 'subscribe' method, make sure
   * * to unsubscribe inside ngOnDestroy life-cycle
   */
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
}
