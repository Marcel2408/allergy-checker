import { Component, OnInit } from '@angular/core';
import { PictureService } from '../picture.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  constructor(private apiPicService: PictureService) {}

  onSubmit(form): void {
    const { invalid } = form;
    const { picUrl } = form.value;
    const url = { url: picUrl };

    if (!invalid) {
      this.apiPicService.getIngFromPic(url).subscribe((ingredients) => {
        this.apiPicService.fillWithIng(ingredients);
      });
    }
  }

  ngOnInit(): void {}

  isWebcam: boolean = false;
  onWebcam(e): void {
    this.isWebcam = !this.isWebcam;
  }
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.apiPicService
      .getUrlFromCloudinary(this.webcamImage.imageAsDataUrl)
      .subscribe((response) => {
        const { url } = response;
        console.log(response);

        console.log('url from Cloudinary', url);
        this.apiPicService
          .getIngFromPic({url: url})
          .subscribe((ingredients) => {
            this.apiPicService
            .fillWithIng(ingredients);
        });
      });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
