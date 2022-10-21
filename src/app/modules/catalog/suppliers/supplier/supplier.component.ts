import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Supplier } from 'src/app/models/catalog/supplier-model';
import { SupplierService } from 'src/app/services/catalogs/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [
  ]
})
export class SupplierComponent implements OnInit {
  @ViewChild("name", { static: true })
  public name!: ElementRef;
  @Input() data: any;
  supplier!: Supplier;
  isValid: boolean = false;
  isUpdate: boolean = false;
  frmSupplier: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService
  ) { }

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
    return this.frmSupplier.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.name.nativeElement.focus();
    }, 100);
  }

  save() {
    if (!this.frmSupplier.invalid) {
      this.supplier = this.frmSupplier.value;
      this.isUpdate
        ? this.supplierService.update(this.supplier)
        : this.supplierService.save(this.supplier);
    } else {
      this.isValid = true;
    }
  }

  /**
   * Construye un formulario nuevo.
   */
  private createNewForm() {
    this.frmSupplier = this.formBuilder.group({
      name: ["", [Validators.required]],
      rfc: ["", [Validators.required]],
      enterprise: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      comments: [""],
    });
  }

  /**
   * Llena el formulario para actualizar los datos.
   *
   * @param supplier datos de el proveedor
   */
  private updateData(supplier: Supplier) {
    this.frmSupplier = this.formBuilder.group({
      id: [supplier.id],
      name: [supplier.name, [Validators.required]],
      rfc: [supplier.rfc, [Validators.required]],
      enterprise: [supplier.enterprise, [Validators.required]],
      phone: [supplier.phone, [Validators.required]],
      address: [supplier.address, [Validators.required]],
      comments: [supplier.comments],
    });
  }
}
