import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-scan-mode-cmp',
  templateUrl: './single-scan-mode-cmp.component.html',
  styleUrls: ['./single-scan-mode-cmp.component.css']
})
export class SingleScanModeCmpComponent implements OnInit {

  constructor() { }
  @Input() scanmode:any;
  @Input() name:string;

  ngOnInit() {
    console.log(this.scanmode);
  }

}
