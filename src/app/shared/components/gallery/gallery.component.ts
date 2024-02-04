import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  @Input() images: string[] = [];
  constructor(public dialog: MatDialog) {}

  openImageModal(imageSrc: string): void {
    this.dialog.open(ImageModalComponent, {
      data: imageSrc,
    });
  }
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.html',
  standalone: true,
  imports: [MatDialogContent],
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
