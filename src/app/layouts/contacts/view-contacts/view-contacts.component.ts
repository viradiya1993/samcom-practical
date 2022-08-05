import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactService } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss']
})
export class ViewContactsComponent implements OnInit {
  contactId: any;
  loader = false;
  @Input() viewData: any;
  constructor(public sharedService: SharedService,
    public contacts: ContactService,
    public route: ActivatedRoute, private router: Router) { this.sharedService.showLoader();}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.contactId = paramMap.get('id');
        this.sharedService.showLoader(); 
        this.contacts.getUserDetails(this.contactId).subscribe((res: any) => {
          if (res) {
            this.sharedService.hideLoader(); 
            this.viewData = res.data; 
          }
        }, err => {
           this.sharedService.hideLoader();
        });
      }
   })
  }
}
