import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  error: any;

  //* Navigation Extras are only available in constructor, we only have one time access after reload we lose state
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation && navigation.extras && navigation.extras.state && navigation.extras.state.error;
  }

  ngOnInit(): void {}
}
