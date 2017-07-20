import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { File } from '../models/index';
import { FileStatus } from '../enums/file-status.enum';
import { PreviewComponent } from '../../modal/preview/preview.component';

declare const WebUploader: any;

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, OnDestroy {

  @Input() options;
  @Input() files: File[] = [];
  @Input() deleteFn: (fileId: number) => Promise<any>;
  @Input() pathToUrl: (path: string) => string;

  private uploader;
  queues: File[] = [];
  FileStatus = FileStatus;

  defaultOptions = {
    auto: true,
    swf: '../node_modules/webuploader/dist/Uploader.swf',
    pick: {
      id: '.uploader-add',
      innerHTML: '<div class="uploader-item">' +
      '<img src="/assets/img/uploader-add.png" width="100" height="100" alt="上传图片">' +
      '<h5>' + '上传图片' + '</h5>' +
      '</div>'
    },
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    },
    duplicate: true
  };

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    this.uploader = WebUploader.create(Object.assign({}, this.defaultOptions, this.options));

    this.uploader.on('fileQueued', (file: File) => {
      const upfile = new File(file);
      upfile.status = FileStatus.queued;

      this.queues.push(upfile);
    });

    this.uploader.on('uploadProgress', (file: File, percentage: number) => {
      const upfile = this.queues.find((item) => item.id === file.id);
      upfile.status = FileStatus.progress;
      upfile.percentage = percentage * 100 + '%';
    });

    this.uploader.on('uploadError', (file: File) => {
      const upfile = this.queues.find((item) => item.id === file.id);
      upfile.status = FileStatus.error;
    });

    this.uploader.on('uploadSuccess', (file: File, response) => {
      const upfile = this.queues.find((item) => item.id === file.id);
      upfile.reset(response);
      upfile.url = this.pathToUrl(upfile.filepath);
      this.files.push(upfile);

      const index = this.queues.indexOf(upfile);
      this.queues.splice(index, 1);
    });
  }

  ngOnDestroy() {
    if (this.uploader != null) {
      this.uploader.destroy();
    }
  }

  preview(file: File) {
    const modalRef = this.modal.open(PreviewComponent, { size: 'lg' });
    modalRef.componentInstance.url = file.url;
  }

  onDelete(file: File, event: MouseEvent) {
    event.stopPropagation();

    this.deleteFn(+file.id).then(response => {
      const index = this.files.indexOf(file);
      this.files.splice(index, 1);
    });
  }

  reupload(file: File) {
    this.uploader.upload(file.id);
  }

  cancel(file: File) {
    this.uploader.removeFile(file.id, true);

    const index = this.queues.indexOf(file);
    this.queues.splice(index, 1);
  }

}
