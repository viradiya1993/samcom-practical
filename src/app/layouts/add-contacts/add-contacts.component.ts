import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, public modal: NgbActiveModal, public sharedservice: SharedService, public contacts: ContactService) { }

  ngOnInit(): void {
    this.setFormGroup();
  }

  //Set Form Group
  setFormGroup() {
    this.formGroup = this.fb.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)])],
    });
  }

  /** Save Contact */
  save() {
    if (this.formGroup.invalid) {
			return
		}
    const formData: any = {};
		formData['first_name'] = this.formGroup.controls.first_name.value;
		formData['last_name'] = this.formGroup.controls.last_name.value;
		formData['email'] = this.formGroup.controls.email.value;
    if (!this.isLoading) {
      this.isLoading = true;
      this.contacts.addContacts(formData).subscribe((res: any) => {
        if (res) {
          this.isLoading = false;
          this.modal.close();
					this.sharedservice.swalSuccess("Contacts added successfully.");
        }
      }, err => {
        this.isLoading = false;
				this.sharedservice.swalError("Something went wrong.");
      });
    }
  }

  //Get form controls
  get f() { return this.formGroup.controls; }

  //Close model
  cancel() {
    this.modal.close();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation:any, controlName: any): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: any): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
