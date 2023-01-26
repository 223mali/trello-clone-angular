import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { appConstants } from "../shared/appConstants";

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"],
})
export class CreateTicketComponent implements OnInit {
  formGroup: FormGroup;
  priorityList: string[];
  storyPointList: number[];
  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTicketComponent>
  ) {
    this.priorityList = appConstants.PRIORITY_LIST;
    this.storyPointList = appConstants.STORY_POINTS_LIST;
  }

  generateTicketCode(projectShort: string) {
    return projectShort + "-" + String(Math.ceil(Math.random() * 1000));
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      ticketCode: this.generateTicketCode("MDG"),
      description: "",
      priority: "",
      storyPoints: "",
      assignee: "",
      createdAt: Date.now(),
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }
}
