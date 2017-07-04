import { RequestListComponent } from './components/requestList/request-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TabViewModule, ButtonModule, DataTableModule, SharedModule, DropdownModule, TooltipModule, TreeTableModule, TieredMenuModule, SplitButtonModule, MenuModule, PanelModule, DialogModule, ToggleButtonModule, RadioButtonModule} from 'primeng/primeng';
// import { TreeTableModule } from 'ng-treetable';
import { RequestListService } from './services/request-list.service';
import { ComparedetailpanelComponent } from './components/comparedetailpanel/comparedetailpanel.component';
import { ScanModeSelectComponent } from './components/scan-mode-select/scan-mode-select.component';
import { SingleScanModeCmpComponent } from './components/single-scan-mode-cmp/single-scan-mode-cmp.component';
// import { SortTipsComponent } from './components/sort-tips/sort-tips.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
    ComparedetailpanelComponent,
    ScanModeSelectComponent,
    SingleScanModeCmpComponent,
    // SortTipsComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    HttpModule,
    ButtonModule,
    DataTableModule, 
    SharedModule,
    DropdownModule,
    BrowserAnimationsModule,
    TooltipModule,
    TieredMenuModule,
    TreeTableModule,
    MenuModule,
    PanelModule,
    DialogModule,
    ToggleButtonModule,
    RadioButtonModule
  ],
  providers: [ RequestListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
