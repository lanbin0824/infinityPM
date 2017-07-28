import {
  Component,
  OnInit
} from '@angular/core';
import {
  RequestListService
} from './../../services/request-list.service';

@Component({
  selector: 'app-comparedetailpanel',
  templateUrl: './comparedetailpanel.component.html',
  styleUrls: ['./comparedetailpanel.component.css']
})
export class ComparedetailpanelComponent implements OnInit {
  //image names
  organImages: string[] = [
    "body_all_on.png",
    "body_part_on.png",
    "body_part01_on.png",
    "body_part02_on.png",
    "body_part03_on.png",
    "body_part04_on.png",
    "body_part05_on.png",
    "body_part06_on.png",
    "body_part07_on.png"
  ];

  organArray: string[] = [
    "All",
    "Chest To Pelvi",
    "Head",
    "Neck",
    "Chest",
    "Abdomen",
    "Pelvis",
    "Leg",
    "Other"
  ];

  //--adult organ locations
  AdultOrganLocations: string[] = [
    '36,13,77,91',
    '33,100,81,185',
    '134,10,204,52',
    '134,57,204,76',
    '134,81,204,120',
    '134,123,204,162',
    '134,165,204,204',
    '134,207,204,350',
    '206,74,247,249'
  ];

  //--child organ locations
  ChildOrganLocations: string[] = [
    '30,28,63,91',
    '29,106,67,173',
    '138,70,211,125',
    '138,126,211,140',
    '138,142,211,175',
    '138,176,211,207',
    '138,208,211,233',
    '138,234,211,311',
    '212,141,252,225'
  ];

  organimagpath: string;
  patientType: string = "adult";
  imgName: string = "";
  organName: string = "";
  comparelist: any;
  header: object;
  parameterList: any;
  scanModeList: any;
  parameterDisplayFlag: boolean = false;
  displayLabel: string = "Detail";

  constructor(private requestListService: RequestListService) {}

  ngOnInit() {
    this.imgName = this.organImages[0];
    this.organName = this.organArray[0];
    this.organimagpath = "assets/resources/images/organImgs/" + this.patientType + "/" + this.imgName;
    this.header = {
      patienttype: 'Patient Type',
      protocolname: 'Name',
      version: 'Version',
      lastupddt: 'Date',
    }
    this.requestListService.getRequestListData().then(comparelist => {
      this.comparelist = comparelist.result;
      console.log(comparelist)
    });
    // this.requestListService.getCompareData().then(parameterList => {
    //   this.parameterList = parameterList.result.changelist;
    // });
    // console.log(this.organArray)
  }
  onImgClick(event) {
    console.log(event);
    let positions = (this.patientType === "child") ? this.ChildOrganLocations : this.AdultOrganLocations;
    positions.every((position: string, index: number, _array) => {
      let picPosition = position.split(',');
      if (event.offsetX >= picPosition[0] && event.offsetY >= picPosition[1] && event.offsetX <= picPosition[2] && event.offsetY <= picPosition[3]) {
        this.imgName = this.organImages[index];
        this.organName = this.organArray[index];
        this.organimagpath = "assets/resources/images/organImgs/" + this.patientType + "/" + this.imgName;
        return false;
      } else {
        return true;
      }
    })
    console.log(this.organName);
  }

  handleChange(event) {
    this.parameterDisplayFlag = event.checked;
    this.displayLabel = event.checked ? 'Select Compared Scan Mode' : 'Detail';
    if (event.checked) {
      this.requestListService.getScanMode().then(scanModeList => {
        this.scanModeList = scanModeList;
        console.log(scanModeList);
      });
    }
    // console.log(event.checked);
  }

}

