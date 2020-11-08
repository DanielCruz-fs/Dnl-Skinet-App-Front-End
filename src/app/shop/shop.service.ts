import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number) {
    const params = new HttpParams();

    if (brandId) 
      params.append('brandId', brandId.toString());
    
    if (typeId)
      params.append('typeId', typeId.toString());

    // we use observe 'response' just for using rxjs
    /**
     * options: {observe: 'body', responseType: 'json'}. These are the default values for those options,
     */
    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
                    .pipe(map(response => { return response.body }));
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
