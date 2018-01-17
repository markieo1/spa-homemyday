import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  autoProcessQueue: true,
  autoQueue: false
};

@NgModule({
  imports: [
    BrowserModule,
    DropzoneModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  exports: [
    DropzoneModule
  ]
})
export class DropzoneWrapperModule { }
