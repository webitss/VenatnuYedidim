import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }

@Input() student:Student


  fatherDead: boolean;
  motherDead:boolean;

  ngOnInit() {
 this.student=new Student();
 this.appProxy.post("GetStudentById",{iPersonId:7}).then(data=>{this.student=data ;alert("successfuly")},err=>alert(err));


}
}
// if (this.meeting.iMeetingId == null) {
//   this.meeting.iPersonId=1;
//   this.appProxi.post("AddMeeting", { meeting: this.meeting, iUserId: 1 }).then(
//     data => {
//       alert("good");
//       // debugger;
//     },
//     err => {
//       alert("not good");
//     }
//   );
// }
// else
// this.appProxi.post("UpdateMeeting", { meeting: this.meeting, iUserId: 1 }).then(
//   data => {
//     alert("good");
//     debugger;
//   },
//   err => {
//     alert("not good");
//   }
// );
// }

// constructor(private route: ActivatedRoute, private appProxi: AppProxy) { }
// // subscription:Subscription;
// ngOnInit() {
// if (this.meeting == null)
//   this.meeting = new Meeting();
// //  this.sub=this.route.params.subscribe(params=>{
// //    this.meetingId=+params['iMeetingId'];
// //  });
// debugger;

// }