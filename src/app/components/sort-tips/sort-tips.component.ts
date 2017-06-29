import { Component, OnInit } from '@angular/core';
import { MenuModule,MenuItem } from 'primeng/primeng';

@Component({
    selector: 'sort-tips',
    templateUrl: './sort-tips.component.html',
    styleUrls: ['./sort-tips.component.css']
})

export class SortTipsComponent implements OnInit {
    private items: MenuItem[];
    ngOnInit(){
        
    }
}