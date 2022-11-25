import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AuthorityModel } from 'src/app/models/administration/authority.model';
import { ProfileService } from 'src/app/services/configuration/profile.service';
import { MessagesConstant } from 'src/app/utils/messages-constants';
import { MessagingNotification } from 'src/app/utils/messaging-notification';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-profile-retrieve',
  templateUrl: './profile-retrieve.component.html',
  styles: [
  ]
})
export class ProfileRetrieveComponent implements OnInit {
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  @ViewChild("search", { static: true })
  public search!: ElementRef;

  profiles: AuthorityModel[] = [];
  pageSize = 10;
  page: number = 1;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.profilesRetrieve();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== "") {
      this.profileService.findProfileBy(search.trim()).subscribe((response) => {
        this.profiles = response;
      });
    } else {
      this.profilesRetrieve();
    }
  }

  openModal() {
    this.createModal("Registrar Perfile");
  }

  update(profile: AuthorityModel) {
    this.createModal("Actualizar Perfil", profile);
  }

  delete(id: string) {
    MessagingNotification.delete(
      MessagingNotification.WARNING_TYPE,
      MessagesConstant.WARNING_TITLE,
      MessagesConstant.DELETE_USER_QUESTION
    ).then((response) => {
      if (response) {
        //this.userService.delete(id);
      }
    });
  }

  /**
   * Consulta todos los perfiles.
   */
  private profilesRetrieve() {
    this.profileService.getAlProfile().subscribe((response) => {
      this.profiles = response;
    });
  }

  /**
   * Genera el componente modal.
   *
   * @param title titulo de la modal
   * @param user perfile a editar, nulo si es para registrar
   */
  private createModal(title: string, user?: AuthorityModel) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.page = ProfileComponent;
    modalRef.componentInstance.data = user;
  }
}
