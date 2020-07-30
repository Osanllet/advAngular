import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  public chosenImage: File;
  public imgTemp: any = null;

  constructor( public modalImageService: ModalImageService,
               public fileService: FileUploadService ) { }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(file: File) {
    this.chosenImage = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileService.updatePhoto(this.chosenImage, type, id)
      .then(img => {
        Swal.fire('Guardada', 'Imagen actualizada.', 'success');

        this.modalImageService.newImage.emit(img);

        this.closeModal();
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo actualizar la imagen.', 'error');
      });

  }

}
