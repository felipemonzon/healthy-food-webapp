import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() page: any;
  @Input() data: any;

  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer: any;

  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver) {
    setTimeout(() => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.page);
      this.modalContainer.clear();
      const container = this.modalContainer.createComponent(factory);
      container.instance.data = this.data;
    }, 100);
  }

  ngOnInit(): void { }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
