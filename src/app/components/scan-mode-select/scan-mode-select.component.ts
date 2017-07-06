import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-scan-mode-select',
  templateUrl: './scan-mode-select.component.html',
  styleUrls: ['./scan-mode-select.component.css']
})
export class ScanModeSelectComponent implements OnInit {
  contrastparameter: string = "ContrastPreset";
  spparameter: string = "ExamPlan";
  sureexpparameter: string = "SureExposure";
  sureiqparameter: string = "SureIQ";
  voicepresetparameter: string = "VoicePreset";
  constructor() {}
  @Input() scanmodes: any;

  ngOnInit() {
    console.log(this.scanmodes);
  }

}
