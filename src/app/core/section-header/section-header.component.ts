import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  //* When subscribing to an onbservable different from http requests
  breadcrumb$: Observable<any[]>;

  constructor(private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }
}
