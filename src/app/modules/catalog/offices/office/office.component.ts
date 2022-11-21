import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfficeModel } from 'src/app/models/catalog/office.model';
import { UserModel } from 'src/app/models/security/user-model';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { UserService } from 'src/app/services/configuration/user.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styles: [
  ]
})
export class OfficeComponent implements OnInit {
  @ViewChild("name", { static: true })
  public name!: ElementRef;
  @Input() 
  data: any;
  office!: OfficeModel;
  users: UserModel[] = [];
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmOffice: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private officeService: OfficeService,
    private userService: UserService
  ) {
    this.userService.getAlUser().subscribe(response => {
      this.users = response;
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
    return this.frmOffice.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.name.nativeElement.focus();
    }, 100);
  }

  save() {
    if (!this.frmOffice.invalid) {
      this.office = this.frmOffice.value;
      this.isUpdate
        ? this.officeService.update(this.office)
        : this.officeService.save(this.office);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmOffice = this.formBuilder.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      idManager: [null, [Validators.required]],
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param office datos de la sucursal
   */
  private updateData(office: OfficeModel) {    
    this.frmOffice = this.formBuilder.group({
      id: [office.id],
      name: [office.name, [Validators.required]],
      phone: [office.phone, [Validators.required]],
      address: [office.address, [Validators.required]],
      idManager: [null, [Validators.required]],
    });
    setTimeout(() => {
      this.form.idManager.setValue(office.managerId);
    }, 100);
  }
}
