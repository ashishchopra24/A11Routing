import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, CanComponentDeactivate  {

  prev = '';
  env = '';
  status = '';
  changesSaved = false;
  envrn = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServer() {
    this.router.navigate(['servers']);
  }

  login() {
    this.authService.login();
    this.status = 'User logged in';
  }

  logout() {
    this.authService.logout();
    this.status = 'User logged out';
  }


  updateEnv(inp: HTMLInputElement) {
    this.env = inp.value;
    this.changesSaved = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.env+' '+this.envrn);
    if (this.env !== this.envrn && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
  }
