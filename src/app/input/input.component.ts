import { Component, OnInit } from '@angular/core';
import { PictureService } from '../picture.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { AllergyService } from '../allergy.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  constructor(private apiPicService: PictureService, private allergyService: AllergyService) {}

  ngOnInit(): void {
    // to load allergies to allergyService the first time the user enters the app
    if (this.allergyService.allergies.length === 0) {
      this.allergyService.getAllergiesFromDB()
      .subscribe((allergies) => this.allergyService.addToAllergies(allergies));

    }
  }

  headingText: string = 'Check your meal';
  isWebcam: boolean = false;
  onWebcam(e): void {
    this.isWebcam = !this.isWebcam;
    if (this.isWebcam) this.headingText = 'No more photos';
    else this.headingText = 'Check your meal';
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
      .subscribe((picture) => {
        const { url } = picture;

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
