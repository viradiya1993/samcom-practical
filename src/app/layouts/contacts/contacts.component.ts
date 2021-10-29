import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AppConst } from 'src/app/app.constant';
import { AddContactsComponent } from '../add-contacts/add-contacts.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  searchKey: any = null;
  searchTerm: any;
  page: any = 1;
  limit: number = AppConst.pageSize;;
  modelFunctionality = AppConst.modelOpenFunctionality;
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
    this.contacts.getAllContacts(this.searchKey, this.page, this.limit).subscribe((res: any) => {
      if (res) {
        this.sharedservice.hideLoader();
        this.contactsList = res.data;
        this.length = res.total;
      }
    }, err => {
      this.sharedservice.swalError("Something went wrong!");
    });
  }

  //Open model
  create() { 
    const modalRef = this.modalService.open(AddContactsComponent, this.modelFunctionality);
  }
  /**
   *  for search opration
   * @param serachdata 
   */
  search(event: any) {
    /** Search query parmas not working that's why create custome search on front side */
    this.searchTerm = (event.target as HTMLInputElement).value;
    // if (this.searchKey !== this.searchTerm) {
    //   this.searchKey = this.searchTerm
    //   this.limit = AppConst.pageSize;
    //   this.page = 1;
    //   this.getAllContacts();
    // }
     this.contactsList.filter((val: any) => val.name = this.searchTerm);
     this.limit = AppConst.pageSize;
     this.page = 1;
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
}
