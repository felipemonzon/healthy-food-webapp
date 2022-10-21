import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { OfficeModel } from 'src/app/models/catalog/office.model';
import { OfficeService } from 'src/app/services/catalogs/office.service';
import { OfficeComponent } from '../office/office.component';

@Component({
  selector: 'app-offices-retrieve',
  templateUrl: './offices-retrieve.component.html',
  styles: [
  ]
})
export class OfficesRetrieveComponent implements OnInit {
  /**
   * Campo para busquedas.
   */
  @ViewChild("search", { static: true })
  public search!: ElementRef;

  offices: OfficeModel[] = [];
  pageSize = 10;
  page: number = 1;

  /**
   * Constructor de la clase.
   * 
   * @param officeService servicio de oficinas
   * @param formBuilder constructor de formulario
   * @param modalService servicio para la modal
   */
  constructor(private officeService: OfficeService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  /**
   * Evento iniciado al solicitar la pantalla.
   */
  ngOnInit(): void {
    this.officeRetrieve();
  }

  /**
   * Evento iniciado despues de cargar la pantalla.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  /**
   * Consulta una sucursal por nombre, direccion, telefono.
   */
  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.officeService.findBy(search.trim()).subscribe((response) => {
        this.offices = response;
      });
    } else {
      this.officeRetrieve();
    }
  }

  /**
   * Actualiza los datos de una sucursal.
   *
   * @param office sucursal a actualiza
   */
  update(office: OfficeModel) {
    this.createModal("Actualizar Sucursal", office);
  }

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal("Registrar Sucursal");
  }

  /**
   * Consulta todas las sucursales.
   */
  private officeRetrieve() {
    this.officeService.getAllOffices().subscribe(response => {
      this.offices = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param office sucursal a editar, nulo si es para registrar
   */
  private createModal(title: string, office?: OfficeModel) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = OfficeComponent;
    modalRef.componentInstance.data = office;
  }
}
