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
      this.initials = "DU";
    } catch (error) {
      console.log(error);
    }
  }
}
