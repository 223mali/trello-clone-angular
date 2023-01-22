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
    try {
      const names = this.assignee.split(" ");
      this.firstName = names[0];
      console.log(
        "🚀 ~ file: card.component.ts:32 ~ CardComponent ~ ngOnInit ~ names[0]",
        names[1]
      );
      if (names.length > 0) this.lastName = names[1];

      console.log(
        "🚀 ~ file: card.component.ts:37 ~ CardComponent ~ ngOnInit ~ this.firstName.substring(0, 0)",
        this.firstName.substring(0)
      );
      if (this.firstName) this.initials += this.firstName.substring(0, 1);
      if (this.lastName) this.initials += this.lastName.substring(0, 1);

      console.log(
        "🚀 ~ file: card.component.ts:40 ~ CardComponent ~ ngOnInit ~ initials",
        this.initials
      );
      this.initials = this.initials.toUpperCase();
    } catch (error) {
      console.log(error);
    }
  }
}
