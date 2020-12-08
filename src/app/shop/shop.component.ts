import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from './../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  //* Use static 'true' when we have conditionals as parents for the template reference
  // @ViewChild('search', { static: true }) searchTerm: ElementRef;
  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  totalCount: number;
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
                    .subscribe(response => {
                      this.products = response.data;
                      this.shopParams.pageNumber = response.pageIndex;
                      this.shopParams.pageSize = response.pageSize;
                      this.totalCount = response.count;
                    }, error => console.log(error));
  }

  getBrands() {
    this.shopService.getBrands()
                    .subscribe(response => this.brands = [{id: 0, name: 'All'}, ...response],
                               error => console.log(error));
  }

  getTypes() {
    this.shopService.getTypes()
                    .subscribe(response => this.types = [{id: 0, name: 'All'}, ...response],
                               error => console.log(error));
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  /**
   * * Conditional added 'cause there is a bug in ngx-bootstrap pagination
   * * Every time we use the filters footer then click on our column filter
   * * the totalCount is updated
   * * It causes to fire the event from component as a result we have
   * * two identical request for the first time then it works normally
   */
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
