import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.scss"],
})
export class CreateTicketComponent implements OnInit {
  formGroup: FormGroup;
  constructor(public formBuilder: FormBuilder) {}

  generateTicketCode(projectShort: string) {
    return projectShort + "-" + String(Math.random() * 100);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: "",
      ticketCode: this.generateTicketCode("MDG"),
      description: "",
      priority: "",
      storyPoints: "",
      assignee: "",
      createdAt: Date.now(),
    });
  }
}
