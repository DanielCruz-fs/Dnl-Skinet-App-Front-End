import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) { 
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.loadProduct(+params.id));
  }

  loadProduct(id: number) {
    this.shopService.getProduct(id)
                    .subscribe(response => {
                      this.product = response
                      this.bcService.set('@productDetails', this.product.name);
                    }, error => console.log(error));
  }
}
