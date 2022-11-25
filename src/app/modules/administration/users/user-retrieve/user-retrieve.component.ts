import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UserModel } from 'src/app/models/security/user-model';
import { UserService } from 'src/app/services/configuration/user.service';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-retrieve',
  templateUrl: './user-retrieve.component.html',
  styles: [
  ]
})
export class UserRetrieveComponent implements OnInit {
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  @ViewChild("search", { static: true })
  public search!: ElementRef;
  frmSearch: FormGroup = new FormGroup({});

  users: UserModel[] = [];
  pageSize = 10;
  page: number = 1;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.frmSearch = this.formBuilder.group({
      search: [""],
    });
    this.userRetrieve();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.userService.findUserBy(search.trim()).subscribe((response) => {
        this.users = response;
      });
    } else {
      this.userRetrieve();
    }
  }

  openModal() {
    this.createModal("Registrar Usuario");
  }

  update(user: UserModel) {
    this.createModal("Actualizar Usuario", user);
  }

  delete(id: string) {
    MessagingNotification.delete(
      MessagingNotification.WARNING_TYPE,
      MessagesConstant.WARNING_TITLE,
      MessagesConstant.DELETE_USER_QUESTION
    ).then((response) => {
      if (response) {
        this.userService.delete(id);
      }
    });
  }

  /**
   * Consulta todos los usuarios.
   */
  private userRetrieve() {
    this.userService.getAlUser().subscribe((response) => {
      this.users = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param user usuario a editar, nulo si es para registrar
   */
  private createModal(title: string, user?: UserModel) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = UserComponent;
    modalRef.componentInstance.data = user;
  }
}
