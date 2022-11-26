import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "src/app/models/security/user-model";
import { SecurityUtilities } from "src/app/security/utils/security.utils";
import { UserService } from "src/app/services/configuration/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class UserDataComponent implements OnInit {
  frmUser: FormGroup = new FormGroup({});
  isValid: boolean = false;
  user!: UserModel;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {}

  ngOnInit(): void {
    this.createNewForm(SecurityUtilities.getUser());
  }

  saveUser() {
    if (!this.frmUser.invalid) {      
      this.user = this.frmUser.value;
      this.user.branchOfficeId = SecurityUtilities.getUser().branchOfficeId;
      this.userService.saveProfile(this.user);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param user datos de usuario
   */
  private createNewForm(user: UserModel) {
    this.frmUser = this.formBuilder.group({
      username: [user.username, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      officeName: [user.branchOfficeName, [Validators.required]],
      cel: [user.cel, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      genre: [user.genre],
      password: [""],
    });

    this.form.officeName.disable();
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.frmUser.controls;
  }
}
