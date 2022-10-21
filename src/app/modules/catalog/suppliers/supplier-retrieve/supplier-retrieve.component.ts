import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Supplier } from 'src/app/models/catalog/supplier-model';
import { SupplierService } from 'src/app/services/catalogs/supplier.service';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { SupplierComponent } from '../supplier/supplier.component';

@Component({
  selector: 'app-supplier-retrieve',
  templateUrl: './supplier-retrieve.component.html',
  styles: [
  ]
})
export class SupplierRetrieveComponent implements OnInit {
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  @ViewChild("search", { static: true })
  public search!: ElementRef;
  frmSearch: FormGroup = new FormGroup({});

  suppliers: Supplier[] = [];
  pageSize = 10;
  page: number = 1;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.frmSearch = this.formBuilder.group({
      search: [""],
    });
    this.suppliersRetrieve();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.supplierService.findBy(search.trim()).subscribe((response) => {
        this.suppliers = response;        
      });
    } else {
      this.suppliersRetrieve();
    }
  }

  openModal() {
    this.createModal("Registrar Proveedor");
  }

  /**
   * Actualiza los datos de un proveedor.
   *
   * @param suppliers proveedor a actualizar
   */
  update(suppliers: Supplier) {
    this.createModal("Actualizar Proveedor", suppliers);
  }

  /**
   * Elimina un proveedor.
   *
   * @param id Identificador del proveedor
   */
  delete(id: string) {
    MessagingNotification.delete(
      MessagingNotification.WARNING_TYPE,
      MessagesConstant.WARNING_TITLE,
      MessagesConstant.DELETE_SUPPLIER_QUESTION
    ).then((response) => {
      if (response) {
        this.supplierService.delete(id);
      }
    });
  }

  /**
   * Consulta todos los proveedores.
   */
  private suppliersRetrieve() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param suppliers proveedor a editar, nulo si es para registrar
   */
  private createModal(title: string, suppliers?: Supplier) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = SupplierComponent;
    modalRef.componentInstance.data = suppliers;
  }
}
