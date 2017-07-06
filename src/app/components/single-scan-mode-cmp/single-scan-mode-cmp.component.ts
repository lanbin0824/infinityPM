import { Component, OnInit, Input } from '@angular/core';
import { ScanModeModel } from '../../models/scan-mode-model';

@Component({
  selector: 'app-single-scan-mode-cmp',
  templateUrl: './single-scan-mode-cmp.component.html',
  styleUrls: ['./single-scan-mode-cmp.component.css']
})
export class SingleScanModeCmpComponent implements OnInit {
  

  selectedLeftValue: string;
  leftcheckbox: Array<boolean>=[];
  rightcheckbox: Array<boolean>=[];
  rightValue:Array<string>=[];

  constructor() { }
  @Input() scanmode:any;
  @Input() name:string;

  ngOnInit() {
    this.scanmode.every((mode,index,_array)=>{
      this.rightValue.push(mode.masterName);
      this.leftcheckbox[index]=false;
      this.rightcheckbox[index]=false;
      return true;
    });
  }

  onRightRadioButtonClick(event,linediv,rightRdBt){
    console.log('right click');
    let currentIndex=parseInt(linediv.id);
    this.rightcheckbox=this.checkAndSetCheckboxes(this.scanmode.length,currentIndex);
    rightRdBt.checked=event;
    let leftIndex=this.checkOthersideCheckedIndex(this.leftcheckbox);
    if(currentIndex==leftIndex){
      if(this.hasClass(linediv,'line-div-class')){
        linediv.className='no-line-div-class';
      }else{
        linediv.className='line-div-class';
      }
      this.leftcheckbox[leftIndex]=false;
      this.rightcheckbox[currentIndex]=false;
      rightRdBt.checked=false;
    }else{
      if(leftIndex!=-1){
        let leftVal=this.rightValue[leftIndex];
        this.rightValue[leftIndex]=this.rightValue[currentIndex];
        this.rightValue[currentIndex]=leftVal;
        linediv.className='no-line-div-class';
        linediv.offsetParent.offsetParent.rows[leftIndex].children[1].children[0].className="line-div-class";
        rightRdBt.checked=false;
        this.rightcheckbox[currentIndex]=false;
        this.leftcheckbox[leftIndex]=false;
      }
    }
  }

  onLeftRadioButtonClick(event,linediv,leftRdBt){
    let currentIndex=parseInt(linediv.id);
    this.leftcheckbox=this.checkAndSetCheckboxes(this.scanmode.length,currentIndex);
    let rightIndex=this.checkOthersideCheckedIndex(this.rightcheckbox);
    if(currentIndex==rightIndex){
      if(this.hasClass(linediv,'line-div-class')){
        linediv.className='no-line-div-class';
      }else{
        linediv.className='line-div-class';
      }
      leftRdBt.checked=false;
      this.rightcheckbox=this.clearCheckedState(this.scanmode.length);
      this.leftcheckbox=this.clearCheckedState(this.scanmode.length);
    }else{
      if(rightIndex!=-1){
        let leftVal=this.rightValue[rightIndex];
        this.rightValue[rightIndex]=this.rightValue[currentIndex];
        this.rightValue[currentIndex]=leftVal;
        linediv.className='line-div-class';
        linediv.offsetParent.offsetParent.rows[rightIndex].children[1].children[0].className="no-line-div-class";
        leftRdBt.checked=false;
        this.rightcheckbox=this.clearCheckedState(this.scanmode.length);
        this.leftcheckbox=this.clearCheckedState(this.scanmode.length);
        // this.rightcheckbox[currentIndex]=false;
        // this.leftcheckbox[rightIndex]=false;
      }
    }
  }

  /**
   * @param checkboxes Array<boolean>  
   * @return index number              return checked radiobutton index; return -1 if no radiobutton be checked;
   */
  private checkOthersideCheckedIndex(checkboxes:Array<boolean>){
    let index=-1;
    checkboxes.every((checkbox,_index,_array)=>{
      if(checkbox){
        index=_index;
        return false;
      }
      return true;
    })
    return index;
  }

  /** 
   * JQ element.hasClass()
   * @param element:        HTMLElement;
   * @param selectorClass:  the classname you want to check;
   * @return true if element has a class name of selectorClass;
  */
  private hasClass(element:Element, selectorClass:string){
    if(!element || !selectorClass){
      console.log("Empty input params")
      return;
    }
    let className = " "+selectorClass+" ";
    return (" "+element.className+" ").replace(/[\t\r\n\f]/g," ").indexOf(className)>-1;
  }
  // private clearCheckedState(checkboxes:Array<boolean>){
  //   checkboxes.every((checkbox,_index,_array)=>{
  //     checkbox=false;
  //     return true;
  //   })
  // }
  private clearCheckedState(length:number){
    let checkboxes = [];
    for(let i=0;i<length;i++){
      checkboxes[i]=false;
    }
    return checkboxes;
  }
  private checkAndSetCheckboxes(length:number,index:number){
    if(index>length || length<0 || index<0){
      console.log("Invalid param");
      return;
    }
    let checkboxes = [];
    for(let i=0;i<length;i++){
      checkboxes[i]=false;
    }
    checkboxes[index]=true;
    return checkboxes;
  }
}
