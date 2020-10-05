import { Component, Input, OnInit } from '@angular/core';

class Message {
  title: string;
  content: string;
  success: boolean;
  display: boolean;
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor() {
  }

  ngOnInit(): void {
  }

}
