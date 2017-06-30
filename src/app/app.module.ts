import { RequestListComponent } from './components/requestList/request-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TabViewModule, ButtonModule, DataTableModule, SharedModule, DropdownModule, TooltipModule, TieredMenuModule, TreeTableModule, SplitButtonModule, MenuModule, PanelModule} from 'primeng/primeng';
import { RequestListService } from './services/request-list.service';
// import { SortTipsComponent } from './components/sort-tips/sort-tips.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
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
    PanelModule
  ],
  providers: [ RequestListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
