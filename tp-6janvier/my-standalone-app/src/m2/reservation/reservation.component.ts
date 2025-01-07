import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Reservation } from '../common/data/reservation'; 

@Component({
  selector: 'app-reservation',
  standalone: false,

  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  myForm: FormGroup;
  reservation :Reservation = new Reservation(); //for default value and transformed result
  message:string="";

  constructor(private _formBuilder: FormBuilder) {
    
    this.myForm = this._formBuilder.group({
      firstName: [this.reservation.firstName, [Validators.required]],
      lastName: [this.reservation.lastName, [Validators.required, Validators.pattern("[A-Z].+")]],
      telephone: [this.reservation.telephone, [Validators.required, Validators.minLength(10)]],
      email: [this.reservation.email, [Validators.required, Validators.email]],
      date:[ /*'2024-09-01' */this.dateAsString(this.reservation.dateTime), [Validators.required , Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
      time: [ /*'14:30' */ this.localTimeAsString(this.reservation.dateTime), [Validators.required , Validators.pattern('[0-9]{2}:[0-9]{2}.*')]]
    
    });
  }

  public onReservation(){
    let res  = this.myForm.value; 
    this.reservation = new Reservation(res.firstName , res.lastName ,
                                        res.telephone , res.email , 
                                        this.dateTimeFromDateAndLocalTime(res.date,res.time));
    this.message="reservation effectuée=" + JSON.stringify(this.reservation);
  }

  myFieldErrorMessage(fieldName:string, fieldExpectation:string=""){
    const myForm= this.myForm;
    //myForm.controls[fieldName].invalid && (myForm.controls[fieldName].dirty || myForm.controls[fieldName].touched)
    let errMsg="";
    const vErrors : ValidationErrors | null = myForm.controls[fieldName].errors;
    if(vErrors!=null){
    console.log(JSON.stringify(vErrors));
    if(vErrors['required']===true)
    errMsg=`${fieldName} is required`;
    else if(vErrors['minlength'])
    errMsg=`${fieldName}.minLength=${vErrors['minlength'].requiredLength}`;
    else if(vErrors['email']===true)
    errMsg=`${fieldName} should be a valid email with ...@...`;
    else
    errMsg=`${fieldName} ${fieldExpectation}`;
    }
    return errMsg;
    }

    localTimeAsString(d:Date){
      return  d.toTimeString().split(' ')[0].substring(0,5);
    }
  
    dateAsString(d:Date){
      return  d.toISOString().split('T')[0];
    }

    dateTimeFromDateAndLocalTime(sDate:string , sLocalTime:string):Date{
      let [HH,MM] = sLocalTime.split(':')
      return new Date(`${sDate}T${HH}:${MM}`)
   }
  

}
