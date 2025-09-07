import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {

  constructor(private router: Router){}

  ngOnInit(){
    this.redirigir();
  }

  redirigir(){
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 5000);
  }
}
