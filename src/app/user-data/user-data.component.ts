import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from './user-data.service';
import { SessionManagerService } from '../shared/services/session-manager.service';
import { CountriesService } from '../shared/services/countries.service';
import { DatabaseLoggerService } from '../shared/services/database-logger.service';
import { RedirectManagerService } from '../shared/services/redirect-manager.service';
import { MESSAGES } from './messages';

class User {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
  countryId: string;
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit {
  userDataForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    country_id: new FormControl('')
  });
  countries: {id: number, name: string}[] = new Array();
  userid: number;
  isSuccessful: boolean;
  isChanged: boolean;
  isClicked: boolean;
  userData: User;
  messages = MESSAGES;

  constructor(private userDataService: UserDataService,
              private sessionManagerService: SessionManagerService,
              private countriesService: CountriesService,
              private redirectManagerService: RedirectManagerService,
              private databaseLoggerService: DatabaseLoggerService,
              private router: Router) {
    this.isSuccessful = false;
    this.isClicked = false;
    this.userData = new User();
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(list => {
      for (const country of list) {
        this.countries.push({id: country.country_id, name: country.name});
      }
    });
    this.redirectManagerService.redirectIfNotLoggedIn();
    this.getData();
  }

  getData(): void {
    this.userDataService.getUserData({userid: this.sessionManagerService.getId()}).subscribe(
      data => {
        if (data.isFound) {
          this.userData.firstname = data.first_name;
          this.userData.lastname = data.last_name;
          this.userData.email = data.email;
          this.userData.phonenumber = data.phone_number;
          this.userData.countryId = data.country_id;
          this.userDataForm.controls.first_name.setValue(data.first_name);
          this.userDataForm.controls.last_name.setValue(data.last_name);
          this.userDataForm.controls.email.setValue(data.email);
          this.userDataForm.controls.phone_number.setValue(data.phone_number);
          this.userDataForm.controls.country_id.setValue(data.country_id);
        }else {
          this.userDataForm.controls.country_id.setValue(1);
        }
      }
    );
  }

  sendData(): void {
    this.isChanged = this.checkIfChanged();
    if (this.isChanged) {
      const user = {
        userid: this.sessionManagerService.getId(),
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        phone_number: this.phone_number.value,
        country_id: this.country_id.value
      };
      this.userDataService.setUserData(user).subscribe(data => {
        this.isSuccessful = data.success;
        if (this.isSuccessful) {
          this.userData.firstname = this.first_name.value;
          this.userData.lastname = this.last_name.value;
          this.userData.email = this.email.value;
          this.userData.phonenumber = this.phone_number.value;
          this.userData.countryId = this.country_id.value;
          this.databaseLoggerService.storeLog({user_id: this.sessionManagerService.getId(), information: `User data was edited.`})
            .subscribe();
        }
      });
    }else {
      this.isSuccessful = false;
    }
    this.isClicked = true;
  }

  checkIfChanged(): boolean {
    if (this.userData.firstname === this.first_name.value &&
        this.userData.lastname === this.last_name.value &&
        this.userData.email === this.email.value &&
        this.userData.phonenumber === this.phone_number.value &&
        this.userData.countryId === this.country_id.value) {
      return false;
    }else {
      return true;
    }
  }

  get first_name(): AbstractControl { return this.userDataForm.get('first_name'); }

  get last_name(): AbstractControl { return this.userDataForm.get('last_name'); }

  get email(): AbstractControl { return this.userDataForm.get('email'); }

  get phone_number(): AbstractControl { return this.userDataForm.get('phone_number'); }

  get country_id(): AbstractControl { return this.userDataForm.get('country_id'); }

}
