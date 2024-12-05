import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [HeaderComponent, NgIf],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.scss'
})
export class SobreMiComponent {

  userData: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const apiUrl = 'https://api.github.com/users/diegojabie142';
    this.http.get<any>(apiUrl).subscribe(data => {
      this.userData = data;
    });
  }
}
