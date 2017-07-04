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
    compareData: any[];
    cols: any[];
    header: object;

    isTrue: boolean;

    first: number = 0;
    rowsPerPage: number = (window.innerWidth < 1000)?10:20;
    totalRecords: number = 0;

    scrollable: boolean = true;
    paginator: boolean = true;
    scrollheight: string = "";
    epnames: object;
    tablecellHeight: number = 5;

    isSelected: boolean = true;
    hiddenthirdColumn: boolean = false;
    display: boolean = false;
    collapsestate: string = "Collapse All";

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
        this.scrollheight = "27vh";
        this.isSelected  = false;
        let currentTarget = event.originalEvent.currentTarget;
        this.requestListService.getCompareData().then(compareData => {
            this.compareData = compareData.result.changelist;
            this.epnames=compareData.result.rightprotocol;
            this.scrollToSelectionPrimeNgDataTable(currentTarget);       
        });            
    }

    private processDatatoNode(node, dataObj){
        dataObj.forEach(data=>{
            if(data.haschild){
                node.expanded=true;
                node.data={
                    name:data.name,
                    mastervalue:data.mastervalue,
                    targetvalue:data.targetvalue
                };
                if(data.childlist && data.childlist!=""){
                    node.children=data.childlist;
                    node.children.forEach( childNode => {
                        this.processDatatoNode(childNode, data.childlist);
                    });
                    // this.processDatatoNode(singleNode.children,data.childlist);
                }else{
                    node.children=data.childlist;
                    node.expanded=true;
                    node.data={
                        name:data.name,
                        mastervalue:data.mastervalue,
                        targetvalue:data.targetvalue
                    };
                }
            }
            // this.compareData.push(node);
        })
    }

    public scrollToSelectionPrimeNgDataTable(target) { 
        let list = document.querySelectorAll('tr');
        if (list !== null && target.sectionRowIndex < list.length) {
            let targetElement = list.item(target.sectionRowIndex);
            targetElement.scrollIntoView()
        }
    }

    // rowTrackBy (index:number, row:any){
    //     console.log(index);
    //     console.log(row);
    // }

    onButtonClick(){
        this.isSelected  = true;
        this.scrollheight = "";
    }

    onCollapseAllClick(event,treetable){
        let isExpanded = treetable.value[0].expanded;
        if(isExpanded){
            this.collapsestate = "Expand All";
        }else{
            this.collapsestate = "Collapse All";
        }
        this.compareData.forEach( node => this.expandRecursive(node, !isExpanded))
    }

    onHeaderClick(event, treetable){
        if(!this.hiddenthirdColumn){
            this.hiddenthirdColumn = true;
        } else {
            this.display=true;
            console.log('second click')
        }
    }

    onCancelButton(){
        this.display=false;
    }

    onOKButton(){
        this.display=false;
    }

    private expandRecursive(node, isExpand:boolean){
        node.expanded = isExpand;
        if(node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }
}
