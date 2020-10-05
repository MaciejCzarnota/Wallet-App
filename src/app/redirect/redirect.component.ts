import { Component, OnInit } from '@angular/core';
import { RedirectManagerService } from './../shared/services/redirect-manager.service';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent implements OnInit {

  constructor(private redirectManagerService: RedirectManagerService) {

  }

  ngOnInit(): void {
    this.redirectManagerService.redirectEveryOtherPage();
  }

}
