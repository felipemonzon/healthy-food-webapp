import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Unit } from 'src/app/models/configuration/unit.model';
import { UnitService } from 'src/app/services/configuration/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styles: [
  ]
})
export class UnitComponent implements OnInit {
  /**
   * Componente del campo nombre.
   */
  @ViewChild("name", { static: true })
  public name!: ElementRef;
  /**
   * Datos de entrada para actualizar.
   */
  @Input() data: any;
  unit!: Unit;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmUnit: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private unitService: UnitService
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
    return this.frmUnit.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.name.nativeElement.focus();
    }, 100);
  }

  /**
   * Guarda una unidad de medida.
   */
  save() {
    if (!this.frmUnit.invalid) {
      this.unit = this.frmUnit.value;
      this.isUpdate
        ? this.unitService.update(this.unit)
        : this.unitService.save(this.unit);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmUnit = this.formBuilder.group({
      name: ["", [Validators.required]],
      abbreviation: ["", [Validators.required]],
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param unit datos de la unidad de medida
   */
  private updateData(unit: Unit) {
    this.frmUnit = this.formBuilder.group({
      id: [unit.id],
      name: [unit.name, [Validators.required]],
      abbreviation: [unit.abbreviation, [Validators.required]],
    });
  }
}
