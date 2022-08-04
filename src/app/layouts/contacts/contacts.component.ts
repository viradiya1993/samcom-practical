import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AppConst } from 'src/app/app.constant';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  page: any = 1;
  limit: number = AppConst.pageSize;;
  length: any
  index: number;
  contactsList: any = [];

  constructor(private modalService: NgbModal, public sharedservice: SharedService, public contacts: ContactService) { this.sharedservice.showLoader(); }

  ngOnInit(): void {
    this.getAllContacts();
  }

  //Fetch all contacts
  getAllContacts() {
    this.sharedservice.showLoader();
    this.contacts.getAllContacts(this.page, this.limit).subscribe((res: any) => {
      if (res) {
        this.sharedservice.hideLoader();
        this.contactsList = res.data;
        this.length = res.total;
      }
    }, err => {
      this.sharedservice.swalError("Something went wrong!");
    });
  }

  /**
 * for pagination
 * // TODO: receiveMessage
 * @param event
 */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllContacts();
  }

  openDialog(data: any) {
    const modalRef = this.modalService.open(ViewContactsComponent, { size: 'lg', backdrop: 'static', keyboard: false });
		modalRef.componentInstance.viewData = data;
		modalRef.result.then((result) => {
			this.getAllContacts();
		})
	}
}
