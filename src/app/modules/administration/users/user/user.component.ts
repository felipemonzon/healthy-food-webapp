import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorityModel } from 'src/app/models/administration/authority.model';
import { OfficeModel } from 'src/app/models/catalog/office.model';
import { UserModel } from 'src/app/models/security/user-model';
import { Role } from 'src/app/security/enums/Role';
import { SecurityUtilities } from 'src/app/security/utils/security.utils';
import { UserService } from 'src/app/services/configuration/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  @ViewChild("firstName", { static: true })
  public name!: ElementRef;
  @Input() data: any;
  user!: UserModel;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmUser: FormGroup = new FormGroup({});
  offices: OfficeModel[] = [];
  authorities: AuthorityModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userService.initialData().subscribe((response) => {
      this.offices = response.offices;
      this.authorities = response.authorities;
    });
  }

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
    return this.frmUser.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.name.nativeElement.focus();
    }, 100);
  }

  saveUser() {        
    if (!this.frmUser.invalid) {
      this.user = this.frmUser.value;
      this.isUpdate
        ? this.userService.update(this.user)
        : this.userService.save(this.user);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un nuevo formulario de usuario.
   */
  private createNewForm() {
    this.frmUser = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      idBranchOffice: [null, [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      genre: [""],
      profiles: ["", [Validators.required]]
    });
    this.addPasswordControl();
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param user datos de usuario
   */
  private updateData(user: UserModel) {
    this.frmUser = this.formBuilder.group({
      id: [user.id],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      phone: [user.cel, [Validators.required]],
      idBranchOffice: [null, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      genre: [user.genre],
      profiles: [null, [Validators.required]]
    });

    this.addPasswordControl();

    setTimeout(() => {
      this.form.idBranchOffice.setValue(user.branchOfficeId);
      this.form.profiles.setValue(user.profiles.map(x => x.id));
    }, 100);
  }

  /**
   * Agrega el campo contraseña cuando es perfil admin
   * 
   * @param profiles perfiles del usuario
   */
  addPasswordControl(): boolean{
    if (SecurityUtilities.getUser().profiles.findIndex((i) => i.name === Role.ADMIN) === 0) {      
      this.frmUser.addControl("password", new FormControl("", [Validators.required]));
      return true;
    } else {
      return false;
    }
  }
}
