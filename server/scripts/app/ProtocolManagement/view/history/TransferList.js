/*!
 * JS Console History
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.history.TransferList
 * @extends PM.view.history.Base
 * @import ConstitutionView.css
 */

Ext.define('PM.view.history.TransferList', {
    extend : 'PM.view.history.Base',

    columnIndex     : {
//      Select      : 0,
        Status      : 0,
        Type        : 1,
        PatientType : 2,
        Name        : 3,
        Date        : 4,
        SourceScanner: 5,
        Machine     : 6,

        names   : [
            "status",
            "type",
            "patienttype",
            "protocolname",
            "lastupddt",
            "lastupddt",
            "machine-sort-"
        ]
    },

    initComponent : function()
    {
        var me = this;

        me.titleName = stringSetting.history.title_transfer;

        me.callParent(arguments);
    },

    initStore : function()
    {
        var me = this;
        me.storeSearch = new Ext.data.Store(
            {
                proxy: new Ext.data.proxy.Ajax({
                    type:'ajax',
                    url: PROCESS_PATH_GLOBAL_ACTION + 'searchTransferList.action',
                    reader:
                    {
                        type: 'json',
                        totalProperty:'total',
                        header: 'header',
                        root: 'result'
                    }
                }),
                model: 'PM.model.ConstitutionList'
            });
        me.storeSearch.on("load",function()
        {
            if(me.centerPanel != null)
            {
                me.centerPanel.update("");
            }
            me.startRowNum = 0;
            me.pushData(me.storeSearch);
            me.panelUpdate(true);
            me.bindRefreshEvent();
            me.setHeaderTitle();
            me.setOffsetWidth();
//          me.btnTransfer.setDisabled(true);
        });

        me.store = new Ext.data.Store(
            {
                proxy: new Ext.data.proxy.Ajax({
                    type:'ajax',
                    url: PROCESS_PATH_GLOBAL_ACTION + 'getTransferList.action',
                    reader:
                    {
                        type: 'json',
                        totalProperty:'total',
                        header: 'header',
                        root: 'result'
                    }
                }),
                model: 'PM.model.ConstitutionList'
            });
        me.store.on("load",function()
        {

            Ext.getBody().unmask();
            clearMask();

            if(me.columnHeaderPanel != null)
            {
                me.columnHeaderPanel.columnData[me.columnIndex.Type].filter.list = [];
                me.columnHeaderPanel.columnData[me.columnIndex.PatientType].filter.list = [];
            }

            if(me.centerPanel != null)
            {
                me.centerPanel.update("");
            }

            me.pushData(me.store);
            me.panelUpdate(true);
            me.setHeaderTitle();
            me.bindRefreshEvent();
            alertStore.load();
            me.setOffsetWidth();
        });
    },

    updateDeleteAndRestoreButton : function(isDelete)
    {
        var me = this;
        if(isDelete)
        {
            me.btnDelete.hide();
            me.btnRestore.hide();

        }
        else
        {
            me.btnDelete.hide();
            me.btnRestore.hide();
        }
    },

    pushData    : function (myStore)
    {
        this.headerData = [];

        var _modelCount = 0;
        var _enddate = 0;
        if(myStore.data.items.length > 0)
        {
            if(myStore.data.items[0].data.machineheader.length > 0)
            {
                _modelCount = myStore.data.items[0].data.machineheader.length;
            }
//          if(!isNaN(myStore.data.items[0].data.enddate))
//          {
//              this.nextHistoryDate = myStore.data.items[0].data.enddate;
//          }
        }

        if(_modelCount != this.modelCount)
        {
            this.modelChange = true;
        }
        else
        {
            this.modelChange = false;
        }
        this.modelCount = _modelCount;

        for (var index = 0; index < this.modelCount; index++) {
            this.headerData[index] = myStore.data.items[0].data.machineheader[index];
        }

        deepClone(this.headerDataDuplicate, this.headerData);
        if (headerDataForTransferListFlg) {
            this.headerData = [];
            deepClone(this.headerData, headerDataForTransferList);
            this.modelCount = this.headerData.length;
        }

        myStore.data.items.shift();
        if(this.nextButtonFlg)
        {
            for(var i = 0;i< myStore.data.items.length;i++)
            {
                this.storeData.push(myStore.data.items[i]);
            }

            this.nextButtonFlg = false;
        }
        else
        {
            this.storeData = myStore.data.items;
        }

        for(var i = 0;i < this.storeData.length;i++)
        {
            var _groupNameAry = this.storeData[i].data.filepath.split('/Histories/');
            var _groupName = '';
            if(_groupNameAry.length > 1)
            {
                var _splitAry = _groupNameAry[0].split('/');
                if(_splitAry.length > 1)
                {
                    _groupName = _splitAry[_splitAry.length - 1];
                }
            }

            this.storeData[i].set('groupName', _groupName);

            if(ProtocolType.SureIQ == this.storeData[i].get('type') ||
                ProtocolType.VoicePreset == this.storeData[i].get('type') ||
                (ProtocolType.ExamPlan == this.storeData[i].get('type') && this.storeData[i].get('protocoleptype') === 'Service')
            )
            {
                this.storeData[i].set('patienttype', " Blank");
            }

            var machine_index = 0;
            for(var j = 0;j < this.headerData.length;j++)
            {
                var max = 0;
                for(var k = 0;k < this.headerData[j].machinename.length;k++)
                {
                    if(this.storeData[i].data.machinenamelist[machine_index].machinename == 1)
                    {
                        max = max + 10;
                    }
                    else if(this.storeData[i].data.machinenamelist[machine_index].machinename == 0)
                    {
                        max = max + 1;
                    }

                    machine_index++;
                }

                this.storeData[i].set('machine-sort-' + j, max);
            }
        }

        this.storeDataBak = this.storeData;
//        var ttt = this.storeData.length;
//        for(var i = ttt;i < 30;i++)
//        {
//            this.storeData[i] = this.storeData[0];
//            this.storeData[i].set('index', i);
//        }


//this.storeData[1].data.machinenamelist[0].machinename = "1";
//this.storeData[0].data.machinenamelist[1].machinename = "-1";
//this.storeData[0].data.machinenamelist[2].machinename = "0";
//this.storeData[1].data.machinenamelist[1].machinename = "1";
//this.storeData[1].data.machinenamelist[2].machinename = "0";
//this.storeData[1].data.machinenamelist[0].machinename = "1";
//this.storeData[2].data.machinenamelist[1].machinename = "2";
//this.storeData[2].data.machinenamelist[2].machinename = "1";

    },

    setColumnHeader    : function ()
    {
        var me = this;

        if(me.columnHeaderPanel == null || me.modelChange)
        {
            me.modelChange = false;
            var _Type_width = 135;
            var _Version_width = 100;
            var _PatientType_width = 180;
            var _Date_width = 186;
            var _Name_min_width = 371;
            if(document.body.clientWidth > 1900){
                _Name_min_width = 502;
            }
            if(memoryLanguage == "JP")
            {
                _Type_width = 151;
                _Version_width = 123;
                _PatientType_width = 170;
                //_Name_min_width = 219;
                _Date_width = 186;
            }
            else if(memoryLanguage == "ES")
            {
                _Type_width = 161;
                _Version_width = 100;
                _PatientType_width = 180;
                //_Name_min_width = 186;
                _Date_width = 260;
            }
            else if(memoryLanguage == "FR")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 190;
                //_Name_min_width = 186;
                _Date_width = 260;
            }
            else if(memoryLanguage == "IT")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 190;
                //_Name_min_width = 186;
                _Date_width = 260;
            }
            else if(memoryLanguage == "PT")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 195;
                //_Name_min_width = 186;
                _Date_width = 260;
            }

            var columnData = [];
            columnData.push({
                cls         : 'History-Column-Title',
                value       : '',
                sort        : false,
                width       : 24,
                minWidth    : 24});

            columnData.push({
                cls         : 'History-Column-Title',
                value       : stringSetting.history.column.type,
                sort        : true,
                arrowsCls   : 'History-Column-Sort',
                arrowsValue : ConstitutionArrows.typenull,
                width       : _Type_width,
                filter      : {
                    list    : [],
                    key     : 'type',
                },
                minWidth: 75});
            columnData.push({
                cls         : 'History-Column-Title',
                value       : stringSetting.history.column.patientype,
                sort        : true,
                arrowsCls   : 'History-Column-Sort',
                arrowsValue : ConstitutionArrows.patientnull,
                width       : _PatientType_width,
                filter      : {
                    list    : [],
                    key     : 'patienttype',
                },
                minWidth: 100});

            columnData.push({
                cls         : 'History-Column-Title',
                value       : stringSetting.history.column.name,
                sort        : true,
                arrowsCls   : 'History-Column-Sort',
                arrowsValue : ConstitutionArrows.namenull,
                width       : '',
                filter      : {
                    list    : [],
                    key     : 'protocolpoolname',
                },
                minWidth    : _Name_min_width});

            columnData.push({
                cls         : 'History-Column-Title',
                value       : stringSetting.history.column.date,
                sort        : true,
                arrowsCls   : 'History-Column-Sort',
                arrowsValue : ConstitutionArrows.datedown,
                width       : _Date_width,
                minWidth    : 100});

            columnData.push({
                cls         : 'History-Column-Title',
                value       : stringSetting.history.column.source_scanner,
                sort        : true,
                arrowsCls   : 'History-Column-Sort',
                arrowsValue : ConstitutionArrows.sourcescannernull,
                width       : 265,
                minWidth    : 100});

            if (columnInfoForTransferListFilter.length > 0) {
                deepClone(columnData, columnInfoForTransferListFilter);
            }

            me.columnHeaderPanel = Ext.create('PM.view.header.ResizeView', {
                minWidth        : me.minWinWidth,
                region          : 'center',
                cls             : getChromeScrollCss(),
                bodyCls         : "columnHeader-body-Chrome",
                tableCls        : 'Constitution-Table',
                columnData      : columnData,
                pageType        : "History",
                otherCellWidth  : me.modelCount * me.machinewidth,
                parentPanel     : me,
                getSortIndexFn  : me.getHeaderSortIndex,
                updateIconFn    : me.updateHeaderIcon,
                dataUpdate      : function()
                {
                    var header = document.getElementById("sourcetable_tableHeader");
                    if(header) {
                        me.tempScrollLeft = header.scrollLeft;
                    }
                    me.panelUpdate(false);
                },
                doFilterData        : function(filterList, index, bool, columnIndex)
                {
                    me.filterColumns(filterList, index, bool, columnIndex);
                    this.otherCellWidth = me.modelCount * me.machinewidth;
                    me.panelUpdate(false, true);
                },
                getFilterList: function(index)
                {
                    return me.getFilterList(index);
                }
            });
        }

    },

    getFilterList : function (index)
    {
        var me = this;
        if (index === 3) {
            var list = me.columnHeaderPanel.columnData[index].filter.list;
            var nameColumnFilterlist = [];
            for (var i = 0, len = list.length; i < len; i++) {
                nameColumnFilterlist.push(list[i].value);
            }
            var key = 'protocolpoolname';
            for (var i = 0, len = me.headerDataDuplicate.length; i < len; i++) {
                var index = me.headerDataDuplicate[i].modelname.indexOf('\n');
                var headerColumn = me.headerDataDuplicate[i].modelname.substr(0, index);
                if (nameColumnFilterlist.indexOf(headerColumn) === -1) {
                    var checkKey = key + MasterSplitSign + headerColumn;
                    var temp = true;
                    if (me.filterCheckedBakForTransfer[checkKey] === true) {
                        temp = true;
                    } else if (me.filterCheckedBakForTransfer[checkKey] === false) {
                        temp = false;
                    } else {
                        temp = true;
                    }
                    if (me.filterCheckedBakForTransfer[checkKey] == null) {
                        list.push({
                            value: headerColumn,
                            check: temp
                        });
                        me.filterCheckedBakForTransfer[checkKey] = true;
                        me.filterCheckedUsedForTransfer[checkKey] = true;
                    }
                    else if (!me.filterCheckedUsedForTransfer[checkKey]) {
                        list.push({
                            value: headerColumn,
                            check: me.filterCheckedBakForTransfer[checkKey]
                        });
                        me.filterCheckedUsedForTransfer[checkKey] = true;
                    }
                }
            }
            list.sort(function (a, b) {
                return a.value > b.value;
            })
            return list;
        } else {
            return me.columnHeaderPanel.columnData[index].filter.list;
        }
    },

    updateHeaderIcon : function(headerSortIndex, mainPanel, sortFlg)
    {
        var me = mainPanel;
        var arrowDown,arrowUp;
        var newSorter = [];

        if(headerSortIndex != me.columnIndex.Type)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Type).arrowsValue = ConstitutionArrows.typenull;
        }
        else
        {
            arrowDown = ConstitutionArrows.typedown;
            arrowUp = ConstitutionArrows.typeup;
        }

        if(headerSortIndex != me.columnIndex.PatientType)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.PatientType).arrowsValue = ConstitutionArrows.patientnull;
        }
        else
        {
            arrowDown = ConstitutionArrows.patientdown;
            arrowUp = ConstitutionArrows.patientup;
        }

        if(headerSortIndex != me.columnIndex.Name)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Name).arrowsValue = ConstitutionArrows.namenull;
        }
        else
        {
            arrowDown = ConstitutionArrows.namedown;
            arrowUp = ConstitutionArrows.nameup;
        }

        if(headerSortIndex != me.columnIndex.Date)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Date).arrowsValue = ConstitutionArrows.datenull;
        }
        else
        {
            arrowDown = ConstitutionArrows.datedown;
            arrowUp = ConstitutionArrows.dateup;
        }

        if(headerSortIndex != me.columnIndex.SourceScanner)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.SourceScanner).arrowsValue = ConstitutionArrows.sourcescannernull;
        }
        else
        {
            arrowDown = ConstitutionArrows.sourcescannerdown;
            arrowUp = ConstitutionArrows.sourcescannerup;
        }

        if(sortFlg != null)
        {
            if(sortFlg == 'up')
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowUp;
                newSorter.push({col:headerSortIndex, val:"ASC"});
            }
            else
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowDown;
                newSorter.push({col:headerSortIndex, val:"DESC"});
            }
        }
        else
        {
            if(me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue != arrowDown)
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowDown;
                newSorter.push({col:headerSortIndex, val:"DESC"});
            }
            else
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowUp;
                newSorter.push({col:headerSortIndex, val:"ASC"});
            }
        }

        if(newSorter[0].col == mainPanel.columnIndex.Date &&
            newSorter[0].val == "DESC")
        {
            mainPanel.sortHistory = [
                {col    : mainPanel.columnIndex.Date,
                    val    : 'DESC'},
                {col    : mainPanel.columnIndex.Type,
                    val    : 'ASC'},
                {col    : mainPanel.columnIndex.PatientType,
                    val    : 'ASC'},
                {col    : mainPanel.columnIndex.Name,
                    val    : 'ASC'},
                {col    : mainPanel.columnIndex.SourceScanner,
                    val    : 'ASC'}
            ];
        }
        else
        {
            for(var i = 0;i < mainPanel.sortHistory.length;i++)
            {
                if(mainPanel.sortHistory[i].col != headerSortIndex)
                {
                    newSorter.push({col : mainPanel.sortHistory[i].col,
                        val : mainPanel.sortHistory[i].val,
                        machineNum : mainPanel.sortHistory[i].machineNum});
                }
            }
            mainPanel.sortHistory = newSorter;
        }

        me.columnHeaderPanel.panelUpdate();
    },

    onClick: function (e)
    {
        var me = this;
        var target = e.target;
        var rowEl = me.getTrEl(target);

        if(rowEl != null)
        {
            me.selectRowNum = rowEl.rowIndex + me.startRowNum;
            if (me.historyShow)
            {
                return;
            }
            rowEl.className = 'selected';

            var doData = me.storeDataDisplay[me.selectRowNum];

            //debug
            cacheLocalStorage.set('filepath', doData.get('filepath'));

            me.historyShow = true;
            me.hideDeleteItem("back");

            if(cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer && memoryProtocolShare)
            {
                if(doData.get('status') == ProtocolStatus.deletionAccepted &&
                    doData.get('type') == ProtocolType.ExamPlan)
                {
                    me.updateDeleteAndRestoreButton(false);
                }
                else if(doData.get('type') == ProtocolType.ExamPlan &&
                    (doData.get('status') == ProtocolStatus.approvalAccepted ||
                    doData.get('status') == ProtocolStatus.localUseAccepted))
                {
                    me.updateDeleteAndRestoreButton(true);
                }
            }
            me.btnNextHistories.hide();

            if(me.centerPanel != null)
            {
                me.centerPanel.update("");
            }
            me.panelUpdate(true);
            return;
        }

        var modelEl = me.getHeaderModelEl(target);
        if(!me.historyShow && modelEl != null)
        {
            var tdIndex = modelEl.getAttribute("tdindex");
            var sortBy = me.sortHistory[0].col;
            var sortType = me.sortHistory[0].val;
            var machineNum = me.sortHistory[0].machineNum;

            if(sortBy != me.columnIndex.Machine ||
                (sortBy == me.columnIndex.Machine &&
                machineNum != tdIndex) ||
                (sortBy == me.columnIndex.Machine &&
                machineNum == tdIndex &&
                sortType == 'ASC'))
            {
                sortType = 'DESC';
            }
            else
            {
                sortType = 'ASC';
            }

            machineNum = tdIndex;
            sortBy = me.columnIndex.Machine;

            var newSorter = [];
            newSorter.push({
                col : sortBy,
                val : sortType,
                machineNum : machineNum});

            for(var i = 0;i < me.sortHistory.length;i++)
            {
                if(me.sortHistory[i].col != sortBy)
                {
                    newSorter.push({col : me.sortHistory[i].col,
                        val : me.sortHistory[i].val,
                        machineNum : me.sortHistory[i].machineNum});
                }
            }
            me.sortHistory = newSorter;

            me.columnHeaderPanel.getColumnData(me.columnIndex.Type).arrowsValue = ConstitutionArrows.typenull;
            me.columnHeaderPanel.getColumnData(me.columnIndex.PatientType).arrowsValue = ConstitutionArrows.patientnull;
            me.columnHeaderPanel.getColumnData(me.columnIndex.Name).arrowsValue = ConstitutionArrows.namenull;
            me.columnHeaderPanel.getColumnData(me.columnIndex.Date).arrowsValue = ConstitutionArrows.datenull;
            me.columnHeaderPanel.getColumnData(me.columnIndex.SourceScanner).arrowsValue = ConstitutionArrows.sourcescannernull;

            me.panelCleanUpdate(true);
            return;
        }

        if(!me.historyShow)
        {
            me.columnHeaderPanel.onClick(e);
        }
//
//return;
//      var rowStore = me.getStoreButton(e.target);
//
//
//      if(rowStore != null)
//      {
//          if(!me.historyShow)
//          {
//              me.selectRowNum = rowEl.rowIndex + me.startRowNum;
//              me.startRowNum = 0;
//          }
//          var thisPanel = this;
//
//          var confirm = Ext.create('PM.view.history.ResDelConfirm',{
//                  parentPanel        : thisPanel,
//                  filePath        : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('filepath'),
//                  machineName        : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('machinename'),
//                  isTransferred    : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('istransferred'),
//                  modifytime      : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('modifytime'),
//                  url                : PROCESS_PATH_GLOBAL_ACTION + 'restoreHistoryProtocol.action',
//                  title            : stringSetting.history.title_comfirm_header,
//                  headerText1        : stringSetting.history.message.restore_comfirm_text1,
//                  headerText2        : stringSetting.history.message.restore_comfirm_text2,
//                  option            : 'restore',
//                  parentPanelShow    : function ()
//                  {
//                      thisPanel.selectRowNum = -1;
////                      thisPanel.buttonPanel.show();
//                      thisPanel.transferGroupName = "";
//                      thisPanel.transferCount = 0;
//                      thisPanel.store.load({
//                          params: {refresh_flg : ""}});
//                      if (thisPanel.historyShow) {
//                          thisPanel.backList(false);
//                      }
//                  }
//             });
//
//             confirm.showWin();
//             if(!me.historyShow)
//          {
//                 thisPanel.selectRowNum = -1;
//          }
//             return;
//      }
//
//      var rowDel = me.getDeleteButton(e.target);
//      if(rowDel != null) {
//          var thisPanel = this;
//          if(!thisPanel.historyShow)
//          {
//              thisPanel.selectRowNum = rowEl.rowIndex + me.startRowNum;
//          }
//
//          var confirm = Ext.create('PM.view.history.ResDelConfirm',{
//                  parentPanel        : thisPanel,
//                  filePath        : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('filepath'),
//                  machineName        : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('machinename'),
//                  isTransferred    : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('istransferred'),
//                  modifytime      : thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('modifytime'),
//                  url                : PROCESS_PATH_GLOBAL_ACTION + 'deleteHistoryProtocol.action',
//                  title            : stringSetting.history.title_comfirm_header,
//                  headerText1        : stringSetting.history.message.delete_comfirm_text1,
//                  headerText2        : stringSetting.history.message.delete_comfirm_text2,
//                  option            : 'delete',
//                  parentPanelShow    : function ()
//                  {
//                      thisPanel.selectRowNum = -1;
////                      thisPanel.buttonPanel.show();
//                      thisPanel.transferGroupName = "";
//                      thisPanel.transferCount = 0;
//                      thisPanel.store.load({
//                          params: {refresh_flg : ""}});
//                      if (thisPanel.historyShow) {
//                          thisPanel.backList(false);
//                      }
//                  }
//             });
//
//             confirm.showWin();
//          if(!me.historyShow)
//          {
//              thisPanel.selectRowNum = -1;
//          }
//          return;
//      }
//
//      if(memoryProtocolShare)
//      {
//          var checkEl = me.getCheckboxEl(e.target);
//          if(checkEl != null)
//          {
//              var rowNum = rowEl.rowIndex + me.startRowNum;
//              if(me.historyShow)
//              {
//                  rowNum = me.selectRowNum;
//              }
//              else if(rowNum == -1)
//              {
//                  rowNum = 0;
//              }
//              if (checkEl.className == "checkBox_disabled")
//              {
//                  return;
//              }
//              else if (checkEl.className == "checkBox_selected")
//              {
//                  checkEl.className = "checkBox_unselected";
//                  me.storeDataDisplay[rowNum].data.seltransfer = false;
//                  me.transferCount--;
//              }
//              else
//              {
//                  checkEl.className = "checkBox_selected";
//                  me.storeDataDisplay[rowNum].data.seltransfer = true;
//                  me.transferCount++;
//              }
//
//              if(me.transferCount > 0)
//              {
//                  me.btnTransfer.setDisabled(false);
//                  if(me.transferGroupName == "")
//                  {
//                      me.transferGroupName = me.storeDataDisplay[rowNum].data.groupName;
//                      if(me.historyShow)
//                      {
//                          //nothing
//                      }
//                      else
//                      {
//                          for(var i = 0;i < rowEl.parentElement.childElementCount;i++)
//                          {
//                              if(me.storeData.length <= i)
//                              {
//                                  break;
//                              }
//                              if(me.storeDataDisplay[i + me.startRowNum].data.groupName != me.transferGroupName)
//                              {
//                                  var _td = rowEl.parentElement.childNodes[i].childNodes[0];
//
//                                  if(_td  != null &&
//                                      _td.childNodes[0] != null &&
//                                      _td.childNodes[0].childNodes[0] != null)
//                                  {
//
//                                      var _inputEl = _td.childNodes[0].childNodes[0];
//                                      _inputEl.className = "checkBox_disabled";
//                                  }
//                              }
//                          }
//                      }
//                  }
//              }
//              else
//              {
//                  me.btnTransfer.setDisabled(true);
//                  me.transferGroupName = "";
//                  for(var i = 0;i < rowEl.parentElement.childElementCount;i++)
//                  {
//                      if(me.storeDataDisplay.length <= i)
//                      {
//                          break;
//                      }
//                      if(me.storeDataDisplay[i].data.groupName != me.transferGroupName &&
//                         ProtocolStatus.approvalAccepted == me.storeDataDisplay[i].data.status)
//                      {
//                          var _td = rowEl.parentElement.childNodes[i].childNodes[0];
//
//                          if(_td  != null &&
//                              _td.childNodes[0] != null &&
//                              _td.childNodes[0].childNodes[0] != null)
//                          {
//
//                              var _inputEl = _td.childNodes[0].childNodes[0];
//                              _inputEl.className = "checkBox_unselected";
//                          }
//                      }
//                  }
//              }
//
//
//              return;
//          }
//      }
//
//      if(rowEl != null && rowStore == null && rowDel == null && checkEl == null)
//      {
//          me.selectRowNum = rowEl.rowIndex + me.startRowNum;
//          if (me.historyShow ||
//              rowEl.className == "Tr-Cons-Spa-even" ||
//              rowEl.className == "Tr-Cons-Spa-odd") {
//              return;
//          }
//          rowEl.className = 'Tr-Constitution-selected';
//
//          cacheLocalStorage.set('filepath',me.storeDataDisplay[me.selectRowNum].get('filepath'));
//
//          me.historyShow = true;
//          me.hideDeleteItem("back");
//          if(me.centerPanel != null)
//          {
//              me.centerPanel.update("");
//          }
////          me.buttonPanel.hide();
//          me.panelUpdate(true);
//          return;
//      }
//
//      var modelEl = me.getHeaderModelEl(e.target);
//      if(me.historyShow == false && modelEl != null)
//      {
//          var tdIndex = modelEl.getAttribute("tdindex");
//          var sortBy = me.sortHistory[0].col;
//          var sortType = me.sortHistory[0].val;
//          var machineNum = me.sortHistory[0].machineNum;
//
//          if(sortBy != me.columnIndex.Machine ||
//            (sortBy == me.columnIndex.Machine &&
//              machineNum != tdIndex) ||
//             (sortBy == me.columnIndex.Machine &&
//              machineNum == tdIndex &&
//              sortType == 'ASC'))
//          {
//              sortType = 'DESC';
//          }
//          else
//          {
//              sortType = 'ASC';
//          }
//
//          machineNum = tdIndex;
//          sortBy = me.columnIndex.Machine;
//
//          var newSorter = [];
//          newSorter.push({
//              col : sortBy,
//              val : sortType,
//              machineNum : machineNum});
//
//          for(var i = 0;i < me.sortHistory.length;i++)
//          {
//              if(me.sortHistory[i].col != sortBy)
//              {
//                  newSorter.push({col : me.sortHistory[i].col,
//                                  val : me.sortHistory[i].val,
//                                  machineNum : me.sortHistory[i].machineNum});
//              }
//          }
//          me.sortHistory = newSorter;
//
//          me.columnHeaderPanel.getColumnData(me.columnIndex.Type).arrowsValue = ConstitutionArrows.typenull;
//          me.columnHeaderPanel.getColumnData(me.columnIndex.PatientType).arrowsValue = ConstitutionArrows.patientnull;
//          me.columnHeaderPanel.getColumnData(me.columnIndex.Name).arrowsValue = ConstitutionArrows.namenull;
//          me.columnHeaderPanel.getColumnData(me.columnIndex.Date).arrowsValue = ConstitutionArrows.datenull;
//
//          me.panelCleanUpdate(true);
//          return;
//      }
//
//      if(!me.historyShow)
//      {
//          me.columnHeaderPanel.onClick(e);
//      }
    },

    hideDeleteItem : function(flg)
    {
        if(flg == "back")
        {
            this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.backtoTransferList + '</span>');
        }
        else if(flg == "hide")
        {
            if (!this.hideDelFlag) {
                this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.hidedeleteitems + "</span>");
            } else {
                this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.showdeleteitems + "</span>");
            }
        }
        else
        {
            if (!this.hideDelFlag) {
                this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.showdeleteitems + "</span>");
            } else {
                this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.hidedeleteitems + "</span>");
            }
            this.hideDelFlag = !this.hideDelFlag;
            if(this.centerPanel != null)
            {
                this.centerPanel.update("");
            }
            this.startRowNum = 0;
            this.panelUpdate(true);
        }
    },

    createHisData    : function(_array, selectRowNum, machine, column, ColumnsWidth)
    {
        var j = 0;
        var _height = 30;
        var displayColsPerPage = (document.documentElement.clientWidth>1300)? 59:30;
        var displayLen = this.startRowNum + displayColsPerPage;

        if(machine)
        {
            this.tipConfigList = [];
        }
        if(this.startRowNum + displayColsPerPage > this.storeDataDisplay.length)
        {
            displayLen = this.storeDataDisplay.length;
        }

        _array.push('<table class="Constitution-List-Table" onselectstart="return false" ondrag="return false">');

        for(var i = this.startRowNum;i < displayLen;i++)
        {

            if (this.selectRowNum != -1 && this.selectRowNum != i) {
                continue;
            }
            var linedata = this.storeDataDisplay[i];
            if (linedata.get('status')=='DELETION_ACCEPTED' && this.hideDelFlag) {
                j ++;
                continue;
            }
            var count = i;
            if (this.hideDelFlag) {
                count -= j;
            }
            _array.push('<tr status="'+linedata.get('status') + '" dataevent="true" selected="false"');
            if( i == this.storeDataDisplay.length - 1){
                if(this.cellEndHeight != 0){
                    _height = this.cellEndHeight;
                }else{
                    _height = 30;
                }
            }

            if(i >= this.storeData.length)
            {
                _array.push(' class="spa" ');
            }
            else
            {
                if (selectRowNum == i)
                {
                    _array.push(' class="selected" ');
                }
            }

            _array.push('>');
            var protocoleptype = linedata.get('protocoleptype');
            if(column)
            {
//              _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Select].width + '" style = "height:'+_height+'px;"  class = "Td-Constitution-Select" >');

//              if((linedata.get("patienttype") == '' &&
//                 linedata.get('status') == ''  &&
//                 linedata.get('protocolname') == '') ||
//                (cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Reviewer || !memoryProtocolShare))
//              {
//                  // nothing
//              }
//              else
//              {
//                  _array.push('<div style="position: relative; height:'+ (_height  - 3) + 'px;margin-top:1px;padding-top:5px;">');
//                  _array.push('<input type = "button"');
//                  _array.push(' hidefocus = "true" ');
//                  _array.push(' aria-checked = "false" ');
//                  _array.push(' aria-invalid = "false" ');
//
//                  if(ProtocolStatus.approvalAccepted == linedata.get('status'))
//                  {
//                      if(this.transferGroupName != "" && linedata.get('groupName') != this.transferGroupName)
//                      {
//                          _array.push(' class = "checkBox_disabled"');
//                      }
//                      else if(linedata.get('seltransfer'))
//                      {
//                          _array.push(' class = "checkBox_selected"');
//
//                      }
//                      else
//                      {
//                          _array.push(' class = "checkBox_unselected"');
//
//                      }
//                  }
//                  else
//                  {
//                      _array.push(' class = "checkBox_disabled"');
//                  }
//
//                  _array.push('>');
//                  _array.push('</input>');
//                  _array.push('</div>');
//              }

//              _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Status].width + '" style = "height:'+_height + 'px;" ');

                _array.push(this.getStatusTip(linedata.get('status'), linedata.get('istransferred')));
                _array.push(' class = "History-Column-Value" >');

                if (linedata.get('status') != '') {
                    _array.push('<div style="position: relative; height:'+ (_height  - 3) + 'px;margin-top:1px;">');
                    _array.push('<img src='+this.getStatusImgPath(linedata.get('status'), linedata.get('istransferred'))+' height="22">');
                    _array.push('</div>');
                }

                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Type].width + '" class = "History-Column-Value" style = "height:'+_height+'px;" ');

                if(getStringWidth(this.styleTip, convertSupFont(linedata.get('type')), true) >
                    (this.columnHeaderPanel.columnData[this.columnIndex.Type].width - 12))
                {
                    _array.push('data-qtip="');
                    _array.push(convertSupFont(linedata.get('type')));
                    _array.push('" ');
                }

                _array.push('>');
                if(linedata.get('type') != "")
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue">');
                    }
                    _array.push(convertSupFont(linedata.get('type')));
                    _array.push('</span>');
                }
                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.PatientType].width + '" ');
                _array.push('class = "History-Column-Value" style = "height:'+_height+'px;">');

                if(linedata.get('patienttype') != "" &&
                    ProtocolType.SureIQ != this.storeData[i].get('type') &&
                    ProtocolType.VoicePreset != this.storeData[i].get('type'))
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue">');
                    }
                    if (linedata.get("patienttype") == " Blank") {
                        _array.push('');
                    } else {
                        _array.push(linedata.get("patienttype"));
                    }
                    _array.push('</span>');
                }
                _array.push('</td>');

                var _name = linedata.get('protocolname');
                var _widthName = this.leftDataWidth;
                for(var ii = 0;ii < this.columnHeaderPanel.columnData.length;ii++)
                {
                    if(this.columnHeaderPanel.columnData[ii].width != '')
                    {
                        _widthName = _widthName - this.columnHeaderPanel.columnData[ii].width;
                    }
                }

                var _border = "";
                if(cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Reviewer)
                {
                    _border = "border-right:1px solid #ABC0E2;";
                }

                _array.push('<td class = "History-Column-Value" style = "height:'+_height+'px; ' + _border + '"');
                if(getStringRealWidth(this.styleTip, _name) > (_widthName - 12))
                {
                    _array.push('data-qtip="');
                    _array.push(Ext.util.Format.htmlEncode(Ext.util.Format.htmlEncode(_name)));
                    _array.push('" ');
                }

                _array.push('>');
                if(linedata.get('patienttype') != "" || linedata.get('type') == ProtocolType.VoicePreset
                    || linedata.get('type') == ProtocolType.ContrastPreset)
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue">');
                    }
                    _array.push(Ext.util.Format.htmlEncode(_name));
                    _array.push('</span>');
                }
                _array.push('</td>');

//              if(cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer)
//              {
//                  _array.push('<td class = "Td-Constitution-restore" style = "height:'+_height+'px;">');
//                  if (linedata.get('status') == 'DELETION_ACCEPTED' && linedata.get('type') == ProtocolType.ExamPlan) {
//
//                      _array.push('<div class="icon-button-restore-new">' +
//                              '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.restore + '</span>'
//                              + '</div>');
//                  } else {
//                      if (linedata.get('type') == ProtocolType.ExamPlan && (linedata.get('status') == ProtocolStatus.approvalAccepted || linedata.get('status') == ProtocolStatus.localUseAccepted)) {
//                          _array.push('<div class="icon-button-delete-new">' +
//                                  '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.deleted + '</span>'
//                                  + '</div>');
//                      }
//                  }
//                  _array.push('</td>');
//              }
//                _array.push('<td width = "' + this.columnData[this.columnIndex.Version].width + '" class = "Td-Constitution-Version" style = "height:'+_height+'px;">');
//
//                if(linedata.get('patienttype') != "")
//                {
//                    _array.push('<span unselectable="on" class ="spanGridValue">');
//                    _array.push(linedata.get('version'));
//                    _array.push('</span>');
//                }
//                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Date].width + '" class = "History-Column-Value" style = "height:'+_height+'px;" ');

                var lastUpddt = DateFormatByExt(new Date(linedata.get('lastupddt')), 'Y M d H:i');
                if(getStringRealWidth(this.styleTip, lastUpddt) >
                    (this.columnHeaderPanel.columnData[this.columnIndex.Date].width - 12))
                {
                    _array.push('data-qtip="');
                    _array.push(lastUpddt);
                    _array.push('" ');
                }

                _array.push('>');
                if(lastUpddt != "")
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue">');
                    }
                    _array.push(lastUpddt);
                    _array.push('</span>');
                }
                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.SourceScanner].width + '" class = "History-Column-Value" style = "height:'+_height+'px;" ');
                var sourceScanner = linedata.get("machinename");
                if(getStringRealWidth(this.styleTip, sourceScanner) >
                    (this.columnHeaderPanel.columnData[this.columnIndex.SourceScanner].width - 12))
                {
                    _array.push('data-qtip="');
                    _array.push(sourceScanner);
                    _array.push('" ');
                }

                _array.push('>');
                if(sourceScanner != "")
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue">');
                    }
                    _array.push(sourceScanner);
                    _array.push('</span>');
                }
                _array.push('</td>');
            }
            if(machine)
            {
                _array.push('<td width = "' + ColumnsWidth + '" class = "History-Column-Value" style = "height:'+_height+'px;">');
                _array.push('</td>');


                var headerDataModelname = [];
                var machinenameCount = [];
                for (var index = 0, len = this.headerDataDuplicate.length; index < len; index++) {
                    headerDataModelname.push(this.headerDataDuplicate[index].modelname);
                    machinenameCount.push(this.headerDataDuplicate[index].machinename.length);
                }

                for (var index = 0; index < this.headerData.length; index++) {
                    var _machineInfo = this.headerData[index].machinename;
                    var machineStatus = 2;
                    var MachineMax = 0;
                    var modelInfo = "";
                    var modelInfoTip = [];
                    var inDeliveryScanners = 0;
                    var headerIndex = headerDataModelname.indexOf(this.headerData[index].modelname);
                    var MachineIndex = 0;
                    for (var k = 0; k < headerIndex; k++) {
                        MachineIndex = MachineIndex + machinenameCount[k];
                    }
                    for (var ii = 0; ii < _machineInfo.length; ii++) {
                        var _machineList = linedata.get('machinenamelist');
                        if(_machineList == null || _machineList.length <= MachineIndex)
                        {
                            machineStatus = 2;
                        }
                        else
                        {
                            var _status = parseInt(_machineList[MachineIndex].machinename);
                            if(_status < machineStatus && _status != -1)
                            {
                                machineStatus = _status;
                            }
                            if(_status == 1)
                            {
                                inDeliveryScanners++;
                            }
                            modelInfoTip.push({status:_status,machineName:_machineInfo[ii]});

                            modelInfo = "/";
                        }
                        MachineMax++;
                        MachineIndex++;
                    }
                    if(modelInfo != "")
                    {
                        modelInfo = inDeliveryScanners + modelInfo + MachineMax;
                    }

                    var borderStyle = "Td-Constitution-Machine";
                    if (index == (linedata.get('machinenamelist').length - 1)) {
                        borderStyle = "Td-Constitution-Machine-noborder";
                    }

                    var _id = "id_machinename_tip" + i.toString() + '_' + index.toString();
                    _array.push('<td id = "' + _id + '" class = "' + borderStyle +'" style = "height:' + _height + 'px;"');

                    if(modelInfo != "")
                    {
                        var tipHtml = [];
                        for(var ii = 0;ii < modelInfoTip.length;ii++)
                        {
                            tipHtml.push(modelInfoTip[ii].machineName);
                            tipHtml.push(this.getTipMachineStatusImg(modelInfoTip[ii].status));
                            tipHtml.push("<br>");
                        }

                        this.tipConfigList.push({

                            target: _id,
                            //                anchor: 'buttom',
//                            anchorOffset: 115,
//                            mouseOffset : [-100,0],
                            html: tipHtml.join('')

                        });
                    }

                    _array.push('>');
                    _array.push(this.setMachineStatusImg(machineStatus, modelInfo, modelInfoTip, protocoleptype));
                    _array.push('</td>');
                }
            }

            _array.push('</tr>');
        }

        _array.push('</table>');
    },

    updateHistoryTable : function() {
        var _topHeight = 198 + this.historyPanelHeight;
        if (this.getNameRealWidth() < 0 && this.historyShow) {
            _topHeight = _topHeight + getChromeScrollWidth();
        }
        this.panelHistory = Ext.create('PM.view.history.BaseList',{
            parentPanel    : this,
            height      : 288,
            topHeight    : _topHeight,
            filePath    : this.storeDataDisplay[this.selectRowNum].get('filepath'),
            isBindBothCompareFromTransfer: false
        });
        this.centerPanel.add(this.panelHistory);
        this.centerPanel.body.removeCls("panel-Noborder-Padding-transparent");
        this.centerPanel.body.addCls("panel-NoborderPadding");
        this.centerPanel.body.dom.style.background = "#EDF0F7";
    },

    getStatusImgPath : function(status, isTransfer)
    {
        var imgPath = '';

        if (ProtocolStatus.approvalRequested == status) {
            imgPath =  ProtocolStatusSrc.approvalRequested;
        } else if (ProtocolStatus.deletionRequested == status) {
            imgPath =  ProtocolStatusSrc.deletionRequested;
        } else if (ProtocolStatus.approvalAccepted == status
            || ProtocolStatus.localUseAccepted == status
            || ProtocolStatus.withoutApproval == status) {
            if(isTransfer)
            {
                imgPath =  ProtocolStatusSrc.transfer;
            }
            else
            {
                imgPath =  ProtocolStatusSrc.approvalAccepted;
            }
        } else if (ProtocolStatus.approvalRejected == status) {
            imgPath =  ProtocolStatusSrc.approvalRejected;
        } else if (ProtocolStatus.deletionAccepted == status) {
            imgPath =  ProtocolStatusSrc.deletionAccepted;
        } else if (ProtocolStatus.deletionRejected == status) {
            imgPath =  ProtocolStatusSrc.deletionRejected;
        }

        return imgPath;
    },

    doRefreshEvent : function()
    {
        var me = this;
        Ext.getBody().mask();
        createMask();
//      me.transferGroupName = "";
//      me.transferCount = 0;
        this.startRowNum = 0;
        me.store.load({
            params: {refresh_flg : "refresh"}});
        if (me.selectRowNum != -1)
        {
            me.backList(true);
        }
        panelTabTransfer.setIcon(false);
        headerDataForHistoryListFlg = false;
        headerDataForTransferListFlg = false;
    },

    addTrEventFun : function(div1, div2)
    {
        var me = this;
        var dataTr1 = div1.getElementsByTagName("tr");
        var dataTr2 = div2.getElementsByTagName("tr");

        if(dataTr1.length != dataTr2.length || me.historyShow)
        {
            return;
        }
        var len = dataTr1.length;
        if(len > me.storeData.length)
        {
            len = me.storeData.length;
        }

        for (var i = 0; i < len; i++) {
            dataTr1[i].onmouseover = dataTr2[i].onmouseover = function(e)
            {
                var index = this.rowIndex;
                me.setSelelctColor(dataTr1[index], dataTr2[index], "selected");
            };
            dataTr1[i].onmouseout = dataTr2[i].onmouseout = function(e)
            {
                var index = this.rowIndex;
                me.setSelelctColor(dataTr1[index], dataTr2[index], "");
            };
        };
    },

    getFilterData : function(dataTemp, columnInfo, flag, fromFilter)
    {
        var me = this;

        var filterList = [];
        var list = [];
        if (!flag) {
            deepClone(list, columnInfo[3].filter.list);
        }
        me.filterCheckedBakForTransfer = {};
        me.filterCheckedUsedForTransfer = {};
        for(var j = 0;j < columnInfo.length;j++)
        {
            if(columnInfo[j].filter != null && columnInfo[j].filter.list.length > 0)
            {
                me.filterArrrayToObject(me.filterCheckedBakForTransfer, columnInfo[j].filter.list, columnInfo[j].filter.key);
                columnInfo[j].filter.list = [];
            }
        }
        for(var i = 0;i < dataTemp.length;i++)
        {
            var filterFlg = false;
            for(var j = 0;j < columnInfo.length;j++)
            {
                if(columnInfo[j].filter == null)
                {
                    continue;
                }
                var key = columnInfo[j].filter.key;
                var keyVal = dataTemp[i].get(key);
                if(key == 'type')
                {
                    keyVal = convertSupFont(keyVal)
                }
                var checkKey = key + MasterSplitSign + keyVal;
                if(me.filterCheckedBakForTransfer[checkKey] == null)
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : true
                    });
                    me.filterCheckedBakForTransfer[checkKey] = true;
                    me.filterCheckedUsedForTransfer[checkKey] = true;
                }
                else if(!me.filterCheckedUsedForTransfer[checkKey])
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : me.filterCheckedBakForTransfer[checkKey]
                    });
                    me.filterCheckedUsedForTransfer[checkKey] = true;
                }
                if(!me.filterCheckedBakForTransfer[checkKey])
                {
                    filterFlg = true;
                }
            }

            if(filterFlg)
            {
                continue;
            }
//          dataTemp[i].index = i;
//          dataTemp[i].displayIndex = filterList.length;
            filterList.push(dataTemp[i]);
        }
        if (!flag) {
            deepClone(columnInfo[3].filter.list, list);
        }
        if (fromFilter) {
            deepClone(columnInfoForTransferListFilter, columnInfo);
        }
        return filterList;
    },


    initTableTitle : function (_array)
    {
        _array.push(' <tr height="0">');
        for (var index = 0; index < this.headerData.length; index++) {
            _array.push('<td width="29" style="padding:0px">');
            _array.push('</td>');
            _array.push('<td width="132" style="padding:0px">');
            _array.push('</td>');
            _array.push('<td width="28" style="padding:0px">');
            _array.push('</td>');
        }
        _array.push('</tr> ');
        _array.push(' <tr height="19">');
        for (var index = 0; index < this.headerData.length; index++) {
            var linedate = this.headerData[index];
            var _modelname = linedate.modelname;
            var _scannerName = '';
            if(_modelname.split('\n').length > 0)
            {
                _scannerName = _modelname.split('\n')[0];
            }
            var tip = '';
            if(getStringRealWidth(this.styleTip, _scannerName) > this.machinewidth) {
                tip = ' data-qtip="' + _scannerName + '" ';
            }
            _array.push('<td colSpan = 3 ');
            _array.push('tdIndex = ' + index + ' ');
            if (index == (this.headerData.length -1 )) {
                _array.push(' class = "Td-Constitution-Machine-title-noborder" ');
                _array.push(tip + ' >');
            } else {
                _array.push(' class = "Td-Constitution-Machine-title" ');
                _array.push(tip + ' >');
            }
            _array.push('<span class="spanGridColumn-header-machine">');
            _array.push("<strong>");
            _array.push(_scannerName);
            _array.push("</strong>");
            _array.push('</span>');
            _array.push('</td>');
        }
        _array.push('</tr> ');
        _array.push(' <tr height="16">');
        for (var index = 0; index < this.headerData.length; index++) {
            _array.push('<td width="29" class = "Td-Constitution-Machine-title-noborder">');
            _array.push('</td>');
            var linedate = this.headerData[index];
            var _modelname = linedate.modelname;
            var _systemName = '';
            if(_modelname.split('\n').length > 1)
            {
                _systemName = _modelname.split('\n')[1];
            }
            var tip = '';
            if(getStringRealWidth(this.styleTipS, _systemName) > this.machinewidth - 56) {
                tip = ' data-qtip="' + _systemName + '" ';
            }

            _array.push('<td class = "Td-Constitution-Machine-title-noborder" ');
            _array.push('tdIndex = ' + index + ' ');
            _array.push(tip + ' >');

            _array.push('<span class="spanGridColumn-header-machine-S">');
            _array.push(_systemName);
            _array.push('</span>');
            _array.push('</td>');
            if (index == (this.headerData.length -1 )) {
                _array.push('<td class="Td-Constitution-Machine-title-sort-noborder" rowSpan = 2 ');
            } else {
                _array.push('<td class="Td-Constitution-Machine-title-sort" rowSpan = 2 ');
            }

            _array.push('tdIndex = ' + index + ' ');
            _array.push('>');
            _array.push('<img class = "Img-Constitution-Machine" style="float:right;" ');
            _array.push('src="');

            if(this.sortHistory[0].col == this.columnIndex.Machine && this.sortHistory[0].machineNum == index)
            {
                if(this.sortHistory[0].val == "ASC")
                {
                    _array.push(ConstitutionArrows.srcUp);
                }
                else if (this.sortHistory[0].val == "DESC")
                {
                    _array.push(ConstitutionArrows.srcDown);
                }
            }
            else
            {
                _array.push(ConstitutionArrows.none);
            }
            _array.push('">');
            _array.push('</img>');

            _array.push('</td>');
        }
        _array.push('</tr> ');
        _array.push(' <tr height="16">');
        for (var index = 0; index < this.headerData.length; index++) {
            _array.push('<td width="29" class = "Td-Constitution-Machine-title-noborder">');
            _array.push('</td>');
            var linedate = this.headerData[index];
            var _modelname = linedate.modelname;
            var _softwareVer = '';
            if(_modelname.split('\n').length > 2)
            {
                _softwareVer = _modelname.split('\n')[2];
            }
            var tip = '';
            if(getStringRealWidth(this.styleTipS, _softwareVer) > this.machinewidth - 56) {
                tip = ' data-qtip="' + _softwareVer + '" ';
            }

            _array.push('<td class = "Td-Constitution-Machine-title-noborder" ');
            _array.push('tdIndex = ' + index + ' ');
            _array.push(tip + ' >');

            _array.push('<span class="spanGridColumn-header-machine-S">');
            _array.push(_softwareVer);
            _array.push('</span>');
            _array.push('</td>');
        }
        _array.push('</tr> ');
        _array.push(' <tr height="19">');
        for (var index = 0; index < this.headerData.length; index++) {
            var linedate = this.headerData[index];
            var tip = '';
            var scannersStr = linedate.machinename.length + " " + stringSetting.history.column.scanners;
            if(getStringRealWidth(this.styleTip, scannersStr) > this.machinewidth) {
                tip = ' data-qtip="' + scannersStr + '" ';
            }

            _array.push('<td colSpan = 3 ');
            _array.push('tdIndex = ' + index + ' ');
            if (index == (this.headerData.length -1 )) {
                _array.push(' class = "Td-Constitution-Machine-title-noborder" ');
                _array.push(tip + ' >');
            } else {
                _array.push(' class = "Td-Constitution-Machine-title" ');
                _array.push(tip + ' >');
            }
            _array.push('<span class="spanGridColumn-header-machine">');
            _array.push(scannersStr);
            _array.push('</span>');
            _array.push('</td>');
        }
        _array.push('</tr> ');
        headerDataForTransferList = [];
        deepClone(headerDataForTransferList, this.headerData);
        headerDataForTransferListFlg = true;
    },

    initSortStatus : function()
    {
        var me = this;

        //Date(DESC) + Protocol Type (ASC) + Patient Type(ASC) + ProtocolName (ASC)
        me.sortHistory = [
            {col    : me.columnIndex.Date,
                val    : 'DESC'},
            {col    : me.columnIndex.Type,
                val    : 'ASC'},
            {col    : me.columnIndex.PatientType,
                val    : 'ASC'},
            {col    : me.columnIndex.Name,
                val    : 'ASC'},
            {col    : me.columnIndex.SourceScanner,
                val    : 'ASC'}
        ];
    }

});