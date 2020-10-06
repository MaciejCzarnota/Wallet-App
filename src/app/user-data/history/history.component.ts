import { Component, OnInit } from '@angular/core';

import { HistoryService } from './history.service';
import { SessionManagerService } from '../../shared/services/session-manager.service';
import { RedirectManagerService } from '../../shared/services/redirect-manager.service';

class HistoryLog {
  no: number;
  information: string;
  entryDate: string;

  constructor(no: number, information: string, entryDate: string) {
    this.no = no;
    this.information = information;
    this.entryDate = entryDate;
  }
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})


export class HistoryComponent implements OnInit {

  historyArray: HistoryLog[] = new Array();

  constructor(private historyService: HistoryService,
              private redirectManagerService: RedirectManagerService,
              private sessionManagerService: SessionManagerService) { }

  ngOnInit(): void {
    this.redirectManagerService.redirectIfNotLoggedIn();
    this.getHistory();
  }

  getHistory(): void {
    this.historyService.getHistory({userid: this.sessionManagerService.getId()}).subscribe(
      answer => {
        for (let i = 0; i < answer.length; i++) {
          this.historyArray.push(new HistoryLog(i + 1, answer[i].information, answer[i].entry_date));
        }
      }
    );
  }

}
