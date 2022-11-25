import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthorityModel } from 'src/app/models/administration/authority.model';
import { ProfileService } from 'src/app/services/configuration/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  /**
   * Campo de id.
   */
   @ViewChild("name", { static: true })
   public id!: ElementRef;
   /**
    * Recibe los datos para actualizar.
    */
   @Input() data: any;
   profile!: AuthorityModel;
   isValid: boolean = false;
   isUpdate: boolean = false;
   frmProfile: FormGroup = new FormGroup({});
 
   constructor(
     private formBuilder: FormBuilder,
     private profileService: ProfileService
   ) {}
 
   ngOnInit(): void {
     if (this.data) {
       this.isUpdate = true;
       this.updateData(this.data);
     } else {
       this.createNewForm();
     }
   }
 
   // convenience getter for easy access to form fields
   get form() {
     return this.frmProfile.controls;
   }
 
   ngAfterViewInit() {
     setTimeout(() => {
       this.id.nativeElement.focus();
     }, 100);
   }
 
   /**
    * Guarda un perfil.
    */
   save() {
     if (!this.frmProfile.invalid) {
       this.profile = this.frmProfile.value;
       console.log(this.profile);
       
       this.isUpdate
         ? this.profileService.update(this.profile)
         : this.profileService.save(this.profile);
     } else {
       this.isValid = true;
     }
   }
 
   /**
    * Construye un formulario nuevo.
    */
   private createNewForm() {
     this.frmProfile = this.formBuilder.group({
       name: ["", [Validators.required]],
       value: ["", [Validators.required]],
     });
   }
 
   /**
    * Llena el formulario para actualizar los datos.
    *
    * @param profile datos del perfil
    */
   private updateData(profile: AuthorityModel) {
     this.frmProfile = this.formBuilder.group({
       id: [profile.id],
       name: [profile.name, [Validators.required]],
       value: [profile.value, [Validators.required]],
     });
   }
}
