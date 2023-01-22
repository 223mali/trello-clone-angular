import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { appConstants } from "../shared/appConstants";
import { IssueType } from "../shared/models/schema.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  issueTypesWithColor = appConstants.issueTypeListWithColor;
  issueTypes = Object.values(IssueType);
  firstName = "";
  lastName = "";
  initials = "";
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() title: string;
  @Input() priority: any;
  @Input() storyPoints: number;
  @Input() ticketCode: string;
  @Input() assignee: string;

  constructor() {}

  ngOnInit() {
    console.log(
      "🚀 ~ file: card.component.ts:20 ~ CardComponent ~ priority",
      this.priority
    );
    try {
      const names = this.assignee.split(" ");
      this.firstName = names[0];

      if (names.length > 0) this.lastName = names[1];

      if (this.firstName) this.initials += this.firstName.substring(0, 1);
      if (this.lastName) this.initials += this.lastName.substring(0, 1);

      this.initials = this.initials.toUpperCase();
    } catch (error) {
      console.log(error);
    }
  }
}
