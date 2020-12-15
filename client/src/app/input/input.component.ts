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

  headingText = 'Check your meal';
  isWebcam = false;
  isFirstTime = true;
  isLoading = false;
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    // to load allergies to allergyService the first time the user enters the app
    if (this.allergyService.allergies.length === 0) {
      this.allergyService.getAllergiesFromDB()
      .subscribe((allergies) => this.allergyService.addToAllergies(allergies));

    }
  }

  onWebcam(e): void {
    this.isFirstTime = false;
    this.isWebcam = !this.isWebcam;
    if (this.isFirstTime) this.headingText = 'Check your meal';
    else this.headingText = 'Take another snapshot';
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.isWebcam = !this.isWebcam;
    this.isLoading = true;

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
      setTimeout(() => this.isLoading = false, 1000);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
