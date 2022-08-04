import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    public route: ActivatedRoute, private router: Router, public modal: NgbActiveModal,) { }

  ngOnInit(): void {}
  
    //Close model
    cancel() {
      this.modal.close();
    }
}
