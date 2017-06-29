import { RequestListService } from './../../services/request-list.service';
import { RequestList } from './../../models/request-list-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
// import { DataTableModule, SharedModule } from 'primeng/primeng';

@Component({
    selector: 'request-list',
    templateUrl: './request-list.component.html',
    styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {
    requestList: any;
    compareData: any;
    cols: any[];
    header: object;

    isTrue: boolean;

    first: number = 0;
    rowsPerPage: number = (window.innerWidth < 1000)?10:20;
    totalRecords: number = 0;

    scrollable: boolean = true;
    paginator: boolean = true;
    scrollheight: string = "";
    epname: string = "";
    tablecellHeight: number = 5;

    isSelected: boolean = true;

    constructor(private requestListService: RequestListService,
                // private treeNode: TreeNode
                ) {}

    ngOnInit(){
        this.requestListService.getRequestListData().then(requestList => {
            this.requestList = requestList.result;
            let dataLen = requestList.result.length;
            this.totalRecords = Math.ceil(dataLen/this.rowsPerPage)*this.rowsPerPage;
            console.log(requestList.result.length)            
        });
        this.header = {
            status: '',
            type:'Protocol',
            patienttype:'Patient Type',
            protocolname: 'Name',
            version:'Version',
            lastupddt:'Date',
            displaymachinename:'Scanner',
            applicant:'User'
        }
        
        this.isTrue = false;
            
        this.cols = [
            {field: 'status', sortable:true, header: '', filter: true},
            {field: 'type', sortable:true, header: 'Protocol', filter: true},
            {field: 'patienttype', sortable:true, header: 'Patient Type', filter: true},
            {field: 'protocolname', sortable:true, header: 'Name', filter: true},
            {field: 'version', sortable:true, header: 'Version', filter: true},
            {field: 'lastupddt', sortable:true, header: 'Date', filter: true},
            {field: 'displaymachinename', sortable:true, header: 'Scanner', filter: true},
            {field: 'applicant', sortable:true, header: 'User', filter: true}
        ]
    }

    onRowSelect(event, dt){
        this.scrollheight = "30vh";
        this.isSelected  = false;
        let currentTarget = event.originalEvent.currentTarget;
        this.requestListService.getCompareData().then(compareData => {
            this.epname=compareData.result.rightprotocol.epname;
            this.compareData = compareData.result.changelist;
            this.scrollToSelectionPrimeNgDataTable(currentTarget);
            console.log(this.compareData);        
        });            
    }

    public scrollToSelectionPrimeNgDataTable(target) { 
        let list = document.querySelectorAll('tr');
        if (list !== null && target.sectionRowIndex < list.length) {
            let targetElement = list.item(target.sectionRowIndex);
            targetElement.scrollIntoView()
        }
    }

    rowTrackBy (index:number, row:any){
        console.log(index);
        console.log(row);
    }

    onButtonClick(){
        this.isSelected  = true;
        this.scrollheight = "";
    }
}
