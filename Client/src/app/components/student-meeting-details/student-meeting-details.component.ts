import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-meeting-details',
  templateUrl: './student-meeting-details.component.html',
  styleUrls: ['./student-meeting-details.component.css']
})
export class StudentMeetingDetailsComponent implements OnInit,OnDestroy {
  private sub: any;
@Input() 
protected meetingId:number;
  

  constructor(private route: ActivatedRoute) { }
// subscription:Subscription;
  ngOnInit() {
   this.sub=this.route.params.subscribe(params=>{
     this.meetingId=+params['iMeetingId'];
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    }
  
  

}
