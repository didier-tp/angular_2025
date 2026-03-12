import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../common/data/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent  {

  myForm!: FormGroup;
  defaultReservation=new Reservation('jean','Bon','0102030405','jean.Bon@ici.fr',new Date() );
  reservation = this.defaultReservation;
  message="";

  dateHeureMinuteAsString(d:Date){
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0].substring(0,5);
    return `${date}T${time}`
  }

  constructor(private _formBuilder: FormBuilder) { 
    this.myForm = this._formBuilder.group({
      firstName: [this.defaultReservation.firstName,[ Validators.required , Validators.minLength(2)]],
      lastName: [this.defaultReservation.lastName, Validators.required],
      telephone: [this.defaultReservation.telephone, [Validators.required , 
                         Validators.pattern('[0-9]{10}')]],
      email: [this.defaultReservation.email, [Validators.required, Validators.email]],
      dateEtHeure:  [ /*'2024-09-01T14:30' */ this.dateHeureMinuteAsString(this.defaultReservation.dateEtHeure), 
        [Validators.required , 
          Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}.*')]
        ]
    });
  }

  onReservation(){
    //this.reservation=JSON.parse(JSON.stringify(this.myForm.value))
    this.reservation=new Reservation(this.myForm.value.firstName ,
                                     this.myForm.value.lastName,
                                     this.myForm.value.telephone ,
                                     this.myForm.value.email,
                                     this.myForm.value.dateEtHeure
                                    );
    this.message="donnees saisies=" + JSON.stringify(this.reservation);
  }

  displayDetails(controlName:string){
    let control= this.myForm.get(controlName); 
    
    if(control==null) return;
    else{
      let err = control.errors;
      if(err)
         console.log("errors="+JSON.stringify(err));
    }
   
  }

}
