import {
  RequestListService
} from './../../services/request-list.service';
import {
  RequestList
} from './../../models/request-list-model';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  TreeNode
} from 'primeng/primeng';

@Component({
  selector: 'request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {
  requestList: any;
  compareData: Array < object >= [];
  cols: any[];
  header: object;

  isTrue: boolean;

  first: number = 0;
  rowsPerPage: number = (window.innerWidth < 1000) ? 10 : 20;
  totalRecords: number = 0;

  scrollable: boolean = true;
  paginator: boolean = true;
  scrollheight: string = "";
  epnames: object;
  tablecellHeight: number = 10;

  isSelected: boolean = true;
  hiddenthirdColumn: boolean = false;
  display: boolean = false;
  collapsestate: string = "Collapse All";
  disableClick: boolean = true;

  constructor(private requestListService: RequestListService,
    // private treeNode: TreeNode
  ) {}

  ngOnInit() {
    this.requestListService.getRequestListData().then(requestList => {
      this.requestList = requestList.result;
      let dataLen = requestList.result.length;
      this.totalRecords = Math.ceil(dataLen / this.rowsPerPage) * this.rowsPerPage;
      console.log(requestList.result.length)
    });
    this.header = {
      status: '',
      type: 'Protocol',
      patienttype: 'Patient Type',
      protocolname: 'Name',
      version: 'Version',
      lastupddt: 'Date',
      displaymachinename: 'Scanner',
      applicant: 'User'
    }
    // this.isTrue = false;
  }

  onRowSelect(event, dt) {
    this.scrollheight = "27vh";
    this.isSelected = false;
    this.disableClick = event.data.status == "APPROVAL_REQUESTED" ? true : false;
    this.hiddenthirdColumn = false;
    let currentTarget = event.originalEvent.currentTarget;
    this.requestListService.getCompareData({
        leftfilepath:  '',
				rightversion: event.data.version,
				rightfilepath: event.data.filepath,
				parameterlist: '',
				eventstatus: '',
				eventid: '',
				eventFlag: 'all'
    }).then(compareData => {
      this.compareData=this.processData2Tree(compareData.result.changelist)
      this.epnames = compareData.result.rightprotocol;
      this.scrollToSelectionPrimeNgDataTable(currentTarget);
    });
  }

  private processData2Tree(dataArray: any) {
    let tree = [];
    var parseTreeJson = function (treeNodes) {
      if (!treeNodes || !treeNodes.length) return;

      for (var i = 0, len = treeNodes.length; i < len; i++) {
        treeNodes[i].expanded = true;
        treeNodes[i].data = {
          name: treeNodes[i].name,
          mastervalue: treeNodes[i].mastervalue,
          targetvalue: treeNodes[i].targetvalue
        }
        delete treeNodes[i].name;
        delete treeNodes[i].mastervalue;
        delete treeNodes[i].targetvalue;

        treeNodes[i].children = treeNodes[i].childlist;
        if (treeNodes[i].children && treeNodes[i].children.length > 0) {

          delete treeNodes[i].childlist;
          parseTreeJson(treeNodes[i].children);
        }
      }
    };
    parseTreeJson(dataArray);
    return dataArray;
  }


  public scrollToSelectionPrimeNgDataTable(target) {
    let list = document.querySelectorAll('tr');
    if (list !== null && target.sectionRowIndex < list.length) {
      let targetElement = list.item(target.sectionRowIndex);
      targetElement.scrollIntoView()
    }
  }

  onButtonClick() {
    this.isSelected = true;
    this.scrollheight = "";
  }

  onCollapseAllClick(event, treetable) {
    let isExpanded = treetable.value[0].expanded;
    if (isExpanded) {
      this.collapsestate = "Expand All";
    } else {
      this.collapsestate = "Collapse All";
    }
    this.compareData.forEach(node => this.expandRecursive(node, !isExpanded))
  }

  onHeaderClick(event, treetable) {
    if (!this.hiddenthirdColumn) {
      this.hiddenthirdColumn = true;
    } else {
      this.display = true;
    }
  }

  onCancelButton() {
    this.display = false;
  }

  onOKButton() {
    this.display = false;
  }

  private expandRecursive(node, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
