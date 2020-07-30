import { environment } from './../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public type: 'users'|'medics'|'hospitals';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    type: 'users'|'hospitals'|'medics',
    id: string,
    img: string = 'no-image'
  ) {
    this._hideModal = false;
    this.type =  type;
    this.id = id;
    this.img = `${base_url}/uploads/${type}/${img}`;
  }

  closeModal() {
    this._hideModal = true;
  }

}
