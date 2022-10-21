import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Unit } from 'src/app/models/configuration/unit.model';
import { UnitService } from 'src/app/services/configuration/unit.service';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-unit-retrieve',
  templateUrl: './unit-retrieve.component.html',
  styles: [
  ]
})
export class UnitRetrieveComponent implements OnInit {
  /**
   * Componente del boton de buscar.
   */
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  /**
   * Componente para el campo de busqueda.
   */
  @ViewChild("search", { static: true })
  public search!: ElementRef;
  frmSearch: FormGroup = new FormGroup({});

  units: Unit[] = [];
  pageSize = 10;
  page: number = 1;

  constructor(
    private unitService: UnitService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.frmSearch = this.formBuilder.group({
      search: [""],
    });
    this.unitsRetrieve();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.unitService.findBy(search.trim()).subscribe((response) => {
        this.units = response;
      });
    } else {
      this.unitsRetrieve();
    }
  }

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal("Registrar Unidad");
  }

  /**
   * Actualiza los datos de una unidad.
   *
   * @param unit unidad a actualizar
   */
  update(unit: Unit) {
    this.createModal("Actualizar Unidad", unit);
  }

  /**
   * Elimina una unidad.
   *
   * @param id Identificador de la unidad
   */
  delete(id: string) {
    MessagingNotification.delete(
      MessagingNotification.WARNING_TYPE,
      MessagesConstant.WARNING_TITLE,
      MessagesConstant.DELETE_UNIT_QUESTION
    ).then((response) => {
      if (response) {
        this.unitService.delete(id);
      }
    });
  }

  /**
   * Consulta todos las unidades de medida.
   */
  private unitsRetrieve() {
    this.unitService.getAllUnits().subscribe((response) => {
      this.units = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param units unidad a editar, nulo si es para registrar
   */
  private createModal(title: string, units?: Unit) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = UnitComponent;
    modalRef.componentInstance.data = units;
  }
}
