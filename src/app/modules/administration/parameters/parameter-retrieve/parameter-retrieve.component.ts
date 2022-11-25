import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Parameter } from 'src/app/models/configuration/parameter.model';
import { ParameterService } from 'src/app/services/configuration/parameter.service';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { ParameterComponent } from '../parameter/parameter.component';

@Component({
  selector: 'app-parameter-retrieve',
  templateUrl: './parameter-retrieve.component.html',
  styles: [
  ]
})
export class ParameterRetrieveComponent implements OnInit {
  /**
   * Boton para consultar.
   */
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  /**
   * Campo de busqueda.
   */
  @ViewChild("search", { static: true })
  public search!: ElementRef;

  parameters: Parameter[] = [];
  pageSize = 10;
  page: number = 1;

  constructor(
    private parameterService: ParameterService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.parameterRetrieve();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.parameterService.findBy(search.trim()).subscribe((response) => {
        this.parameters = response;
      });
    } else {
      this.parameterRetrieve();
    }
  }

  /**
   * Abre la ventana modal.
   */
  openModal() {
    this.createModal("Registrar Parámetro");
  }

  /**
   * Actualiza los datos de un parámetro.
   *
   * @param parameters parámetro a actualizar
   */
  update(parameters: Parameter) {
    this.createModal("Actualizar Parámetro", parameters);
  }

  /**
   * Elimina un parámetro.
   *
   * @param id Identificador del parámetro
   */
  delete(id: string) {
    MessagingNotification.delete(
      MessagingNotification.WARNING_TYPE,
      MessagesConstant.WARNING_TITLE,
      MessagesConstant.DELETE_PARAMETER_QUESTION
    ).then((response) => {
      if (response) {
        this.parameterService.delete(id);
      }
    });
  }

  /**
   * Consulta todos los parámetros.
   */
  private parameterRetrieve() {
    this.parameterService.getAllParameters().subscribe((response) => {
      this.parameters = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param parameters parámetro a editar, nulo si es para registrar
   */
  private createModal(title: string, parameters?: Parameter) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = ParameterComponent;
    modalRef.componentInstance.data = parameters;
  }
}
