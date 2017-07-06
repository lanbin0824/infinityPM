import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-single-scan-mode-cmp',
  templateUrl: './single-scan-mode-cmp.component.html',
  styleUrls: ['./single-scan-mode-cmp.component.css']
})
export class SingleScanModeCmpComponent implements OnInit {

  leftcheckbox: Array < boolean >= [];
  rightcheckbox: Array < boolean >= [];
  rightValue: Array < string >= [];

  constructor() {}
  @Input() scanmode: any;
  @Input() name: string;

  ngOnInit() {
    this.scanmode.every((mode, index, _array) => {
      this.rightValue.push(mode.masterName);
      this.leftcheckbox[index] = false;
      this.rightcheckbox[index] = false;
      return true;
    });
  }

  ngOnDestroy() {
    this.rightcheckbox = this.clearCheckedState(this.scanmode.length);
    this.leftcheckbox = this.clearCheckedState(this.scanmode.length);
  }

  onRightRadioButtonClick(event, linediv, rightRdBt) {
    let currentIndex = parseInt(linediv.id);
    this.rightcheckbox = this.checkAndSetCheckboxes(this.scanmode.length, currentIndex);
    rightRdBt.checked = event;
    let leftIndex = this.checkOthersideCheckedIndex(this.leftcheckbox);
    if (currentIndex == leftIndex) {
      this.processEqualsCase(linediv, rightRdBt)
    } else if (leftIndex > -1) {
      let otherDiv = linediv.offsetParent.offsetParent.rows[leftIndex].children[1].children[0];
      this.processCheckboxandLines(linediv, otherDiv, rightRdBt, leftIndex, 'right');
    } else {
      //todo
      //checkbox checked and do nothing
    }
  }

  onLeftRadioButtonClick(event, linediv, leftRdBt) {
    let currentIndex = parseInt(linediv.id);
    this.leftcheckbox = this.checkAndSetCheckboxes(this.scanmode.length, currentIndex);
    leftRdBt.checked = event;
    let rightIndex = this.checkOthersideCheckedIndex(this.rightcheckbox);
    if (currentIndex == rightIndex) {
      this.processEqualsCase(linediv, leftRdBt)
    } else if (rightIndex > -1) {
      let otherDiv = linediv.offsetParent.offsetParent.rows[rightIndex].children[1].children[0];
      this.processCheckboxandLines(linediv, otherDiv, leftRdBt, rightIndex, 'left');
    } else {
      //todo
      //checkbox checked and do nothing
    }
  }

  public processEqualsCase(linediv: HTMLElement, btn: any) {
    if (this.hasClass(linediv, 'line-div-class')) {
      linediv.className = 'no-line-div-class';
    } else {
      linediv.className = 'line-div-class';
    }
    btn.checked = false;
    this.rightcheckbox = this.clearCheckedState(this.scanmode.length);
    this.leftcheckbox = this.clearCheckedState(this.scanmode.length);
  }

  public processCheckboxandLines(linediv: HTMLElement, otherDiv: HTMLElement, btn: any, clickIndex: number, side: string) {
    let currentIndex = parseInt(linediv.id);
    if (currentIndex == clickIndex) {
      if (this.hasClass(linediv, 'line-div-class')) {
        linediv.className = 'no-line-div-class';
      } else {
        linediv.className = 'line-div-class';
      }
      btn.checked = false;
      this.rightcheckbox = this.clearCheckedState(this.scanmode.length);
      this.leftcheckbox = this.clearCheckedState(this.scanmode.length);
    } else {
      if (clickIndex > -1) {
        let leftVal = this.rightValue[clickIndex];
        this.rightValue[clickIndex] = this.rightValue[currentIndex];
        this.rightValue[currentIndex] = leftVal;
        let lineDivCls = (side.toLowerCase() == 'left') ? 'line-div-class' : "no-line-div-class";
        let otherSideCls = (side.toLowerCase() == 'left') ? 'no-line-div-class' : "line-div-class";
        linediv.className = lineDivCls;
        otherDiv.className = otherSideCls;
        btn.checked = false;
        this.rightcheckbox = this.clearCheckedState(this.scanmode.length);
        this.leftcheckbox = this.clearCheckedState(this.scanmode.length);
      }
    }

  }

  /**
   * @param checkboxes Array<boolean>  
   * @return index number return checked radiobutton index; return -1 if no radiobutton be checked;
   */
  private checkOthersideCheckedIndex(checkboxes: Array < boolean > ) {
    let index = -1;
    checkboxes.every((checkbox, _index, _array) => {
      if (checkbox) {
        index = _index;
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
  private hasClass(element: Element, selectorClass: string) {
    if (!element || !selectorClass) {
      console.log("Empty input params")
      return;
    }
    let className = " " + selectorClass + " ";
    return (" " + element.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(className) > -1;
  }

  /**
   * 
   * @param length number: number to build an checkboxes obj to avoid operation on viewmodel 
   * @return checkboxes states object
   */
  private clearCheckedState(length: number) {
    let checkboxes = [];
    for (let i = 0; i < length; i++) {
      checkboxes[i] = false;
    }
    return checkboxes;
  }

  /**
   * 
   * @param length number: number to build an checkboxes obj to avoid operation on viewmodel
   * @param index number: which checkbox should be checked
   * @return checkboxes states object with only one checkbox checked 
   */
  private checkAndSetCheckboxes(length: number, index: number) {
    if (index > length || length < 0 || index < 0) {
      console.log("Invalid param");
      return;
    }
    let checkboxes = [];
    for (let i = 0; i < length; i++) {
      checkboxes[i] = false;
    }
    checkboxes[index] = true;
    return checkboxes;
  }
}
