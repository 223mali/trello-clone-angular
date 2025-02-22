import { Component, OnInit, Inject } from "@angular/core";
// import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { ColorPickerDialogComponent } from "../shared/components/color-picker-dialog/color-picker-dialog.component";
import { IssueType, ITicket } from "../shared/models/schema.model";
import { MatChipInputEvent } from "@angular/material/chips";
import { appConstants } from "../shared/appConstants";

@Component({
  selector: "app-edit-talk",
  templateUrl: "./edit-talk.component.html",
  styleUrls: ["./edit-talk.component.scss"],
})
export class EditTalkComponent implements OnInit {
  formGroup: FormGroup;
  commentFormGroup: FormGroup;
  issueTypesArrayWithColor = Object.values(appConstants.issueTypeListWithColor);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { talk: ITicket; edit: boolean },
    private dialogRef: MatDialogRef<EditTalkComponent>,
    public formBuilder: FormBuilder,
    public colorPickerdialog: MatDialog
  ) {}

  ngOnInit() {
    const talk = this.data && this.data.talk ? this.data.talk : null;

    this.formGroup = this.formBuilder.group({
      title: talk && talk.title ? talk.title : "",
      assignee: [
        talk && talk.assignee ? talk.assignee : "",
        Validators.required,
      ],
      description: talk?.description,
      ticketCode: [talk && talk.ticketCode ? talk.ticketCode : ""],
      createdAt: [talk && talk.createdAt ? talk.createdAt : new Date()],
    });

    this.commentFormGroup = this.formBuilder.group({
      comment: "",
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close(this.formGroup.value);
  }

  removeTag(tag: string) {
    // Remove the tag from the tag control's value.
    const tagsControl = this.formGroup.get("tags");
    tagsControl.value.splice(tagsControl.value.indexOf(tag), 1);
  }

  addTag(event: MatChipInputEvent) {
    const tagsControl = this.formGroup.get("tags");

    // Create a new array of tags, if the talk doesn't have any,
    // otherwise add the new tag to the existing array.
    if (tagsControl.value) {
      tagsControl.value.push({ name: event.value, color: "#e0e0e0" });
    } else {
      tagsControl.setValue([event.value]);
    }

    // Clear the input's value once the tag has been added.
    event.input.value = "";
  }

  openColorPickerDialog(tag): void {
    const dialogRef = this.colorPickerdialog.open(ColorPickerDialogComponent, {
      // width: '250px',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        tag.color = result;
      }
    });
  }
}
