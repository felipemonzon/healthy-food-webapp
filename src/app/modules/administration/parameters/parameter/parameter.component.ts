import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parameter } from 'src/app/models/configuration/parameter.model';
import { ParameterService } from 'src/app/services/configuration/parameter.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styles: [
  ]
})
export class ParameterComponent implements OnInit {
  /**
   * Campo de id.
   */
  @ViewChild("id", { static: true })
  public id!: ElementRef;
  /**
   * Recibe los datos para actualizar.
   */
  @Input() data: any;
  parameter!: Parameter;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmParameter: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private parameterService: ParameterService
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
    return this.frmParameter.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.id.nativeElement.focus();
    }, 100);
  }

  /**
   * Guarda un parámetro.
   */
  save() {
    if (!this.frmParameter.invalid) {
      this.parameter = this.frmParameter.value;
      this.isUpdate
        ? this.parameterService.update(this.parameter)
        : this.parameterService.save(this.parameter);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmParameter = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      value: ["", [Validators.required]],
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param parameter datos del parámetro
   */
  private updateData(parameter: Parameter) {
    this.frmParameter = this.formBuilder.group({
      id: [parameter.id],
      description: [parameter.description, [Validators.required]],
      value: [parameter.value, [Validators.required]],
    });
  }
}
