import { Component, OnInit, Input } from '@angular/core';
import { ScanModeModel } from '../../models/scan-mode-model';

@Component({
  selector: 'app-single-scan-mode-cmp',
  templateUrl: './single-scan-mode-cmp.component.html',
  styleUrls: ['./single-scan-mode-cmp.component.css']
})
export class SingleScanModeCmpComponent implements OnInit {

  selectedLeftValue: string;
  selectedRightValue: boolean=false;
  rightValue:string[];

  constructor() { }
  @Input() scanmode:any;
  @Input() name:string;

  ngOnInit() {
    console.log(this.scanmode);
  }

  onRightRadioButtonClick(leftRdBt,rightRdBt,linediv){
    console.log('right click');
    console.log(event);
    
    console.log(leftRdBt);
    console.log(rightRdBt);
    console.log(linediv);
    // if(event.target.className != "radio-button-cls"){
    //   rightRdBt.checked = !rightRdBt.checked;
    // }  
  }

  onLeftRadioButtonClick(leftRdBt,rightRdBt,linediv){
    console.log('left click');
    console.log(leftRdBt);
    console.log(rightRdBt);
  }


}
