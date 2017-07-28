/*!
 * JS Console History
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.history.Base
 * @extends PM.view.panel.OnMouse
 * @import ConstitutionView.css
 */

Ext.define('PM.view.history.Base', {
    extend : 'PM.view.panel.OnMouse',
    layout : {
        type : 'border'
    },
    cls             : 'panelTabView',
    bodyCls         : 'grid-Color-NoborderPadding',
    width           : '100%',

    //panel
    northPanel      : null,
//  northPanelNorth : null,
    northPanelCenter: null,
    centerPanel     : null,
    panelHistory    : null,
    columnHeaderPanel   : null,
//  buttonPanel         : null,

    // button
    btnHideDelete   : null,
    btnTransfer     : null,
    btnDelete       : null,
    btnRestore      : null,
    btnNextHistories: null,

    // store
    store           : null,
    storeSearch     : null,
    storeData       : [],
    storeDataBak    : [],
    storeDataDisplay    : [],
    transferCount       : 0,
    transferGroupName   : "",
    lenDataDisplay  : 0,

    styleTip        : styleGridTipGlobal,
    styleTipS       : '9pt',
    selectRowNum    : -1,
    historyShow     : false,
    hideDelFlag     : false,
    hideHistoryFlag : false,

    curWidth        : null,
    curHeight       : null,

    machinewidth    : 189,
    modelCount      : 0,
    modelChange     : false,
    headerData      : [],
    headerDataDuplicate : [],
    dropLineHeight  : 0,
    offsetWidth     : 0,
    leftDataWidth   : 0,
    tipConfigList   : [],

//  nextHistoryDate : 0,
    nextButtonFlg   : false,

    startRowNum     : 0,

    bottomScrollHeight    : 0,
    historyPanelHeight    : 70,

    columnIndex     : {
//      Select      : 0,
        Status      : 0,
        Type        : 1,
        PatientType : 2,
        Name        : 3,
        Date        : 4,
        Machine     : 5,
        names   : [
            "status",
            "type",
            "patienttype",
            "protocolname",
            "lastupddt",
            "machine-sort-"
        ]
    },

    // sort
    sortHistory     : [],

    // search
    txSearch        : null,
    txSearchImg     : null,

    titleName       : '',
    scrollTime:0,
    tempScrollLeft : 0,

    initComponent : function()
    {
        var me = this;

        me.initSortStatus();

        var buttonPanel = me.getButtonArea();

        me.initStore();

        var titleP = me.setSearchArea();

        me.northPanelCenter = Ext.create('Ext.panel.Panel', {
            autoScroll  : false,
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'grid-Color-NoborderPadding',
            bodyStyle   : 'border-left: 1px solid #ABC0E2; border-bottom: 1px solid #ABC0E2;border-right: 1px solid #ABC0E2;',
            region      : 'center',
            layout: {
                type: 'fit'
            },
            html        : ''
        });
        me.northPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panelHeader',
            bodyCls     : 'panel-NoborderPadding',
            region      : 'north',
            layout      : {
                type    : 'border'
            },
            height      : 47,
            items       : [titleP, me.northPanelCenter]

        });

        me.centerPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'padding-Bottom-Left-Right',
            bodyCls     : 'panel-Noborder-Padding-transparent',
            bodyStyle   : 'margin-top:-1px;',
            region      : 'center',
            layout: {
                type: 'fit'
            },
            html    : ""
        });

        Ext.applyIf(me, {
            items:[
                me.northPanel,
                me.centerPanel,
                buttonPanel
            ]
        });
        me.callParent(arguments);
    },

    initStore : function()
    {
        var me = this;


        me.storeSearch = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'searchConstitutionList.action',
                timeout: 600000,
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
                url: PROCESS_PATH_GLOBAL_ACTION + 'getConstitutionList.action',
                timeout: 600000,
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

    setSearchArea : function()
    {
        var me = this;
        me.txSearch = {
            width       : 200,
            height      : 24,
            style       : '',
            id          : 'searchText',
            cls         : 'ConstitutionView-Search',
            emptyText   : stringSetting.history.text_search,
            emptyCls    : 'ConstitutionView-Search-empty',
            focusCls    : 'ConstitutionView-Search-empty',
            requiredCls : 'ConstitutionView-Search-empty',
            dirtyCls    : '',
            fieldCls    : 'PM-Search-field',
            clearCls    : '',
            componentCls: '',
            noemptyCls  : 'ConstitutionView-Search-empty',
            xtype       : 'textfieldview',
            listeners:{
                specialKey :function(field, e) {
                    if (e.keyCode == 13) {
                        var hasSearch = field.getRawValue().replace(/(^\s*)|(\s*$)/g, "");
                        if(!me.historyShow){
                            me.storeSearch.load({
                                params:{hasSearch            : hasSearch
                                }
                            });
                        }
                    }
                }
            }
        };
        me.txSearchImg = Ext.create('Ext.Img',{
            width : 24,
            height : 24,
                src : PROCESS_PATH_GLOBAL_RESOURCES + 'images/search/search.png',
            cls : 'ConstitutionView-Search-Img',
            xtype : 'img',
            style : 'padding:4px;',
            draggable : false,
            listeners:{
                click: {
                    element: 'el',
                    fn: function(el){
                        var hasSearch = Ext.getCmp('searchText').getRawValue().replace(/(^\s*)|(\s*$)/g, "");
                        if(!me.historyShow){
                            me.storeSearch.load({
                                params:{hasSearch            : hasSearch
                                }
                            });
                        }
                        //me.hasSearch = Ext.getCmp('searchText').value.replace(/(^\s*)|(\s*$)/g, "");
                        //me.panelUpdate(true);
                    }
                }
            }
        });
        me.btnHideDelete = Ext.create('Ext.button.Button', {
            height: 32,
            width: 260,
            cls : 'icon-button-BackListButton',
            overCls : 'icon-button-BackListButton-over',
            pressedCls : 'icon-button-BackListButton-pressed',
            focusCls : 'icon-button-BackListButton-focus',
            disabledCls : 'icon-button-BackListButton-disable',
            text : '<span class="SpanTextView">' + stringSetting.history.button.hidedeleteitems + '</span>',
            disabled : false,
            listeners:{
                "click":function(){
                    if(!me.historyShow)
                    {
                        me.hideDeleteItem("hideclick");
                    }
                    else
                    {
                        me.backList(true);
                    }

                }
            }
        });


        var titleP = Ext.create('Ext.panel.Panel', {
            region      : 'north',
            height      : 35,
            layout      : {
                type    : 'border'
            },
            bodyCls     : 'panelHeader-body',
            items       :[{
                region      : 'center',
                bodyCls     : 'panelHeader-body',
                cls         : 'panel-NoborderPadding',
                bodyStyle   : 'border:0;',
                html        : '<div>' +
                              '<span class="spanGridHeaderText">' + me.titleName + '</span>' +
                              '</div>' +
                              '<div style="float:left;margin-left: 25px;margin-top: 4px;">' +
                              '<div class="icon-button-storerefresh-his">' +
                              '<span class="SpanTextView-smallbutton" style="margin-top: -1px;padding-left:12px;">' + stringSetting.request.button.refresh + '</span>' +
                              '</div>' +
                          '</div>'
            },{
                region      : 'east',
                bodyCls     : 'panelHeader-body',
                cls         : 'panel-NoborderPadding',
                bodyStyle   : 'border:0;',
                items : [{
                    height : 35,
                    bodyCls: 'panelHeader-body-panel',
                    layout : 'column',
                    width  : 490,
                    layoutConfig :
                    {
                        columns : 4
                    },
                    items:[me.txSearch,
                           me.txSearchImg,
                           {
                                width:5,
                                height:5,
                                cls:'panel-NoborderPadding-transparent',
                                bodyCls:'panel-NoborderPadding-transparent'
                           },
                           me.btnHideDelete]
                }]
            }]
        });

        return titleP;
    },

    getButtonArea : function()
    {
        var me = this;
        me.btnRestore = Ext.create('Ext.button.Button', {
            height      : 32,
            width       : 138,
            cls         : 'icon-button-Restore',
            overCls     : 'icon-button-Restore-over',
            pressedCls  : 'icon-button-Restore-pressed',
            focusCls    : 'icon-button-Restore-focus',
            disabledCls : 'icon-button-Restore-disable',
            text        : '<span class="SpanTextView" style="padding-left:10px;">' + stringSetting.history.button.restore + '</span>',
            disabled    : false,
            hidden      : true,
            handler: function()
            {
                me.delresButtonEvent(false);
            }
        });
        me.btnDelete = Ext.create('Ext.button.Button', {
            height      : 32,
            width       : 138,
            cls         : 'icon-button-Delete',
            overCls     : 'icon-button-Delete-over',
            pressedCls  : 'icon-button-Delete-pressed',
            focusCls    : 'icon-button-Delete-focus',
            disabledCls : 'icon-button-Delete-disable',
            text        : '<span class="SpanTextView" style="padding-left:10px;">' + stringSetting.history.button.deleted + '</span>',
            disabled    : false,
            hidden      : true,
            handler: function()
            {
                me.delresButtonEvent(true);
            }
        });

        me.btnTransfer = Ext.create('Ext.button.Button', {
            height      : 32,
            width       : 138,
            cls         : 'icon-button-Transfer',
            overCls     : 'icon-button-Transfer-over',
            pressedCls  : 'icon-button-Transfer-pressed',
            focusCls    : 'icon-button-Transfer-focus',
            disabledCls : 'icon-button-Transfer-disable',
            text        : '<span class="SpanTextView" style="padding-left:10px;">' + stringSetting.history.button.transfer + '</span>',
            disabled    : false,
            hidden      : true,
            handler: function()
            {
                var filePathList = [];
                var protocolType = [];
                var _protocolList = [];
                filePathList.push(me.storeDataDisplay[me.selectRowNum].get('filepath'));
                protocolType.push(me.storeDataDisplay[me.selectRowNum].get('type'));
                _protocolList.push(me.storeDataDisplay[me.selectRowNum]);
                var groupName = me.storeDataDisplay[me.selectRowNum].get('groupName');
                var confirm = Ext.create('PM.view.confirm.Base',{
                    groupName            : groupName,
                    protocolPathList    : filePathList,
                    protocolTypeList    : protocolType,
                    protocolList        : _protocolList,
                    isFromTransfer        : true,
                    OKLoad            : function ()
                    {
//                      me.selectRowNum = -1;
//                      me.startRowNum = 0;
//                      me.buttonPanel.show();
                        me.backList(false);
                        Ext.getBody().mask();
                        createMask();
//                      me.transferGroupName = "";
//                      me.transferCount = 0;
                        me.store.load({
                            params: {refresh_flg : ""}});
//                      if (me.historyShow) {
//                          me.backList(false);
//                      }
                    }
                   });
                   confirm.showWin();

            }
        });

        me.btnNextHistories = Ext.create('Ext.button.Button', {
            height: 32,
            width: 260,
            cls : 'icon-button-Next-Histories',
            overCls : 'icon-button-Next-Histories-over',
            pressedCls : 'icon-button-Next-Histories-pressed',
            disabledCls : 'icon-button-Next-Histories-disable',

            text:'<span class="SpanTextView">' + stringSetting.history.button.NextHistories + '</span>',
            disabled:false,
            hidden:false,
            handler: function() {
                me.selectRowNum = -1;
                me.startRowNum = 0;

                me.nextButtonFlg = true;
                Ext.getBody().mask();
                createMask();
                me.store.load({
                    params: {refresh_flg : "next"}
                });
            }
        });

        var buttonPanel = Ext.create('Ext.panel.Panel', {
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'button-Color-NoborderPadding',
            region      : 'south',
            height      : 60,
            minHeight   : 60,
            maxHeight   : 60,
            layout: {
                type:'hbox',
                padding:'0 0 0 0',
                align:'middle',
                pack:'end'
            },
            defaults:
            {
                padding:'0 0 0 0',
                margins:'0 8 0 8'
            },
            items:[
                me.btnNextHistories,
                {
                    xtype:'tbspacer',
                    flex:1
                },
                me.btnDelete,
                me.btnRestore,
                me.btnTransfer
            ]
        });

        return buttonPanel;
    },

    sortData:function(el)
    {
        var me = this;

        var names = [];
        var sequencing = [];
        for(var i = 0;i < me.sortHistory.length;i++)
        {
            if(me.sortHistory[i].col == me.columnIndex.Machine)
            {
                names.push(me.columnIndex.names[me.columnIndex.Machine] + me.sortHistory[i].machineNum);
            }
            else
            {
                names.push(me.columnIndex.names[me.sortHistory[i].col]);
            }
            sequencing.push(me.sortHistory[i].val);
        }
        sortObjectArray(me.storeData, names, sequencing);

    },

    onMouseOver: function(e)
    {
        var me = this;
        if(!me.historyShow && me.columnHeaderPanel != null)
        {
            me.columnHeaderPanel.onMouseOver(e);
        }

    },
    onMouseDown: function (e)
    {
        var me = this;
        if(!me.historyShow && me.columnHeaderPanel != null)
        {
            this.columnHeaderPanel.onMouseDown(e);
        }
    },
    onMouseOut : function (e){
        var me = this;
        if(me.columnHeaderPanel !== null && me.columnHeaderPanel !== undefined) {
            me.columnHeaderPanel.onMouseOut(e);
        }
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
            var _Name_min_width = 448;
            
            if(document.body.clientWidth > 1900){
                _Name_min_width = 578;
            }
            if(memoryLanguage == "JP")
            {
                _Type_width = 151;
                _Version_width = 123;
                _PatientType_width = 170;
                //_Name_min_width = 448;
                _Date_width = 186;
            }
            else if(memoryLanguage == "ES")
            {
                _Type_width = 161;
                _Version_width = 100;
                _PatientType_width = 180;
                //_Name_min_width = 448;
                _Date_width = 260;
            }
            else if(memoryLanguage == "FR")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 190;
                //_Name_min_width = 448;
                _Date_width = 260;
            }
            else if(memoryLanguage == "IT")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 190;
                //_Name_min_width = 448;
                _Date_width = 260;
            }
            else if(memoryLanguage == "PT")
            {
                _Type_width = 160;
                _Version_width = 100;
                _PatientType_width = 195;
                //_Name_min_width = 448;
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


            if (columnInfoForHistoryListFilter.length > 0) {
                deepClone(columnData, columnInfoForHistoryListFilter);
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
                    me.panelUpdate(false);
                },
                doFilterData        : function(filterList, listIndex, bool, columnIndex)
                {
                    me.filterColumns(filterList, listIndex, bool, columnIndex);
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

    filterColumns : function (filterList, listIndex, bool, columnIndex) {
        this.startRowNum = 0;
        if (columnIndex === 3) {
            if (listIndex === -1 && bool === true) {
                this.modelCount = this.headerDataDuplicate.length;
                deepClone(this.headerData, this.headerDataDuplicate);
            } else if (listIndex === -1 && bool === false) {
                this.modelCount = 0;
            }
            if (!filterList) {
                return;
            }
            var headerDataModelname = [];
            for (var i = 0, len = this.headerDataDuplicate.length; i < len; i++) {
                var index = this.headerDataDuplicate[i].modelname.indexOf('\n');
                headerDataModelname.push(this.headerDataDuplicate[i].modelname.substr(0, index));
            }
            var value = [];
            var showIndex = [];
            for (var i = 0, len = filterList.length; i < len; i++) {
                value.push(filterList[i].value);
                if (filterList[i].check === true && (headerDataModelname.indexOf(filterList[i].value) !== -1)) {
                    showIndex.push(headerDataModelname.indexOf(filterList[i].value));
                }
            }
            var headerDataShow = [];
            for (var i = 0, len = showIndex.length; i < len; i++) {
                headerDataShow.push(this.headerDataDuplicate[showIndex[i]]);
            }
            this.modelCount = headerDataShow.length;
            this.headerData = headerDataShow;
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
                    if (me.filterCheckedBak[checkKey] === true) {
                        temp = true;
                    } else if (me.filterCheckedBak[checkKey] === false) {
                        temp = false;
                    } else {
                        temp = true;
                    }
                    if (me.filterCheckedBak[checkKey] == null) {
                        list.push({
                            value: headerColumn,
                            check: temp
                        });
                        me.filterCheckedBak[checkKey] = true;
                        me.filterCheckedUsed[checkKey] = true;
                    }
                    else if (!me.filterCheckedUsed[checkKey]) {
                        list.push({
                            value: headerColumn,
                            check: me.filterCheckedBak[checkKey]
                        });
                        me.filterCheckedUsed[checkKey] = true;
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

    getHeaderSortIndex: function (el, mainPanel)
    {
        var targetEl = el;
        if(targetEl == null)
        {
            return null;
        }

        if((el.tagName == "IMG" || el.tagName == "SPAN") &&
           el.parentElement != null &&
           el.parentElement.getAttribute('colKey') != null &&
           mainPanel.columnHeaderPanel.columnData[el.parentElement.getAttribute('colKey')].sort)
        {
            return el.parentElement.getAttribute('colKey');
        }

        if(el.tagName == "TD" &&
           el.getAttribute('colKey') != null &&
           mainPanel.columnHeaderPanel.columnData[el.getAttribute('colKey')].sort)
        {
            return el.getAttribute('colKey');
        }
        return null;
    },

    getSpaceCellWidth: function(min)
    {
        return this.columnHeaderPanel.getSpaceCellWidth(min);
    },

    getSpaceScrollWidth: function()
    {
        var scroll = 0;
        if(!this.historyShow)
        {
            scroll = getChromeScrollWidth();
        }
        return scroll;
    },

    getNameRealWidth : function() {
        var cellWidth = this.columnHeaderPanel.getSpaceCellWidth();

        cellWidth = cellWidth - this.columnHeaderPanel.columnData[this.columnIndex.Name].minWidth;
        return cellWidth;
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
        headerDataForHistoryList = [];
        deepClone(headerDataForHistoryList, this.headerData);
        headerDataForHistoryListFlg = true;
    },
    loadData    : function (selectRowNum)
    {
        var divWidth = this.curWidth - 43;
        var divHeight = 0;
        this.leftDataWidth = 0;

        for(var i = 0;i < this.columnHeaderPanel.columnData.length;i++)
        {
            if(this.columnHeaderPanel.columnData[i].width != '')
            {
                this.leftDataWidth = this.leftDataWidth + this.columnHeaderPanel.columnData[i].width;
            }
        }
        this.leftDataWidth = this.leftDataWidth + this.getSpaceCellWidth(this.columnHeaderPanel.columnData[this.columnIndex.Name].minWidth);

        var docwidth = this.getNameRealWidth();

        if (this.selectRowNum == -1) {
            divHeight = this.curHeight - 144 - 60;
        } else {
            if (docwidth < 0 && this.historyShow) {
                divHeight = 30 + this.historyPanelHeight + getChromeScrollWidth();
            } else {
                divHeight = 31 + this.historyPanelHeight;
            }
        }
        if(docwidth < 0)
        {
            this.bottomScrollHeight = getChromeScrollWidth();
        }
        else
        {
            this.bottomScrollHeight = 0;
        }
        var _array = new Array();
        _array.push('<div class = "div-history-data" ');
        _array.push('style="height:' + divHeight + 'px; width:' + divWidth + 'px;">');

        if(!this.historyShow)
        {
            _array.push('<div class = "div-history-data" ');
            _array.push('style="border-left: 1px solid #ABC0E2; background-color: #93AEDB;float: right;height:' + this.historyPanelHeight + 'px;width:'+ getChromeScrollWidth() +'px;z-index:46;">');
            _array.push('</div>');
        }

        //header left
        _array.push('<div id = "sourcetable_upperHeader" class = "div-history-data" ');
        _array.push('style="height: ' + this.historyPanelHeight + 'px; width: ' + this.leftDataWidth + 'px; z-index: 50;">');
        _array.push(this.columnHeaderPanel.getColumnHeader(false));
        _array.push('</div>');

        //header right
        _array.push('<div id = "sourcetable_tableHeader" class = "div-history-data" ');
        _array.push('style="left: ' + this.leftDataWidth + 'px;top: -' + this.historyPanelHeight + 'px;height: ' + this.historyPanelHeight + 'px; width: ' + (divWidth - this.leftDataWidth - (this.historyShow ? 0:getChromeScrollWidth())) + 'px; z-index: 45;">');
        _array.push('<table class="Constitution-Table-Deep-Color" onselectstart="return false" ondrag="return false">');
        this.initTableTitle(_array);
        _array.push('</table>');
        _array.push('</div>');

        //table left
        _array.push('<div id = "sourcetable_tableColumn"  class = "div-history-data" ');
        _array.push('style="top: -' + this.historyPanelHeight + 'px;height: ' + (divHeight - this.historyPanelHeight - this.bottomScrollHeight) + 'px; width: ' + this.leftDataWidth + 'px; z-index: 40;">');
        this.createHisData(_array, selectRowNum, false, true);
//        _array.push('</table>');
        _array.push('</div>');

        //table right
        _array.push('<div id = "sourcetable_tableData" class = "div-history-data" ');
        _array.push('style="overflow-x: auto;');

        var rightTableWidth = divWidth;
        if(!this.historyShow)
        {
            rightTableWidth = rightTableWidth - getChromeScrollWidth();
        }

        _array.push('left:0px;top: ' + (- divHeight + this.bottomScrollHeight) + 'px;height: ' + (divHeight - this.historyPanelHeight) + 'px; width: ' + (rightTableWidth) + 'px; z-index: 35;">');
        this.createHisData(_array, selectRowNum, true, false, this.leftDataWidth);
        _array.push('</div>');

        //scroll
        if(!this.historyShow)
        {
            _array.push('<div id = "sourcetable_scroll" class = "div-history-data" ');
            _array.push('style="overflow-x: hidden;');
            _array.push('overflow-y: scroll;');
            _array.push('left:' + (divWidth - getChromeScrollWidth() - 1) +'px;top: ' + (- divHeight * 2 + this.bottomScrollHeight + this.historyPanelHeight) + 'px;height: ' + (divHeight - this.historyPanelHeight - this.bottomScrollHeight) + 'px; width: ' + (getChromeScrollWidth()) + 'px; z-index: 46;">');
            this.createScroll(_array, (divHeight - this.historyPanelHeight - this.bottomScrollHeight));
            _array.push('</div>');
        }

        _array.push('</div>');
        return _array.join('');

    },
    createScroll    : function(_array, _height)
    {
        var _cellHeight = 30;
        var _tableHeight = (this.storeDataDisplay.length - 1) * _cellHeight;
        if(this.cellEndHeight > 0)
        {
            _tableHeight += this.cellEndHeight;
        }
        else
        {
            _tableHeight += _cellHeight;
        }

        _array.push('<div style="left:-5px; width:' + (getChromeScrollWidth() + 5) + 'px; height:' + _height + 'px;"');
        _array.push('>');
        _array.push('<div style="width:1px; height:' + _tableHeight + 'px;"');
        _array.push('>');
        _array.push('</div>');
        _array.push('</div>');
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
            if (linedata.get('status') == 'DELETION_ACCEPTED' && this.hideDelFlag) {
                j++;
                continue;
            }
            var count = i;
            if (this.hideDelFlag) {
                count -= j;
            }
            _array.push('<tr status="' + linedata.get('status') + '" dataevent="true" selected="false"');
            if (i == this.storeDataDisplay.length - 1) {
                if (this.cellEndHeight != 0) {
                    _height = this.cellEndHeight;
                } else {
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
                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Status].width + '" style = "height:' + _height + 'px;" ');

                _array.push(this.getStatusTip(linedata.get('status'), linedata.get('istransferred')));
                _array.push(' class = "History-Column-Value" >');

                if (linedata.get('status') != '') {
                    _array.push('<div style="position: relative; height:' + (_height - 3) + 'px;margin-top:1px;">');
                    _array.push('<img src=' + this.getStatusImgPath(linedata.get('status'), linedata.get('istransferred')) + ' height="22">');
                    _array.push('</div>');
                }

                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Type].width + '" class = "History-Column-Value" style = "height:' + _height + 'px;" ');

                if (getStringWidth(this.styleTip, convertSupFont(linedata.get('type')), true) >
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
                _array.push('class = "History-Column-Value" style = "height:' + _height + 'px;">');

                if (linedata.get('patienttype') != "" &&
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

                _array.push('<td class = "History-Column-Value" style = "height:' + _height + 'px; ' + _border + ';position:relative">');
                if(linedata.get('patienttype') != "" || linedata.get('type') == ProtocolType.VoicePreset
                    || linedata.get('type') == ProtocolType.ExamPlan || linedata.get('type') == ProtocolType.ContrastPreset)
                {
                    if (protocoleptype === 'Service') {
                        _array.push('<span unselectable="on" class ="spanGridValueForNewColor"');
                    } else {
                        _array.push('<span unselectable="on" class ="spanGridValue"');
                    }
                    if(getStringRealWidth(this.styleTip, _name) > (_widthName - 12))
                    {
                        _array.push('data-qtip="');
                        _array.push(Ext.util.Format.htmlEncode(Ext.util.Format.htmlEncode(_name)));
                        _array.push('" ');
                    }
                    _array.push('>');
                    _array.push(Ext.util.Format.htmlEncode(_name));
                    _array.push('</span>');
                    
                    if (cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer) {
                        _array.push('<div style="position:absolute;top:2px;right:0px;">');
                        if (linedata.get('status') == 'DELETION_ACCEPTED' && linedata.get('type') == ProtocolType.ExamPlan) {
                            _array.push('<div style = "display:none;float:left;"></div>');
                            _array.push('<div class="icon-button-restore-new" style = "display:none;float:right;margin:1px 10px 0 0;">' +
                                '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.restore + '</span>'
                                + '</div>');
                        } else {
                            if (linedata.get('type') == ProtocolType.ExamPlan && (linedata.get('status') == ProtocolStatus.approvalAccepted || linedata.get('status') == ProtocolStatus.localUseAccepted)) {
                                _array.push('<div class="icon-button-delete-new" style = "display:none;float:left; margin:1px 10px 0 0;"">' +
                                    '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.deleted + '</span>'
                                    + '</div>');

                                if(cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer && memoryProtocolShare && linedata.get('status') == ProtocolStatus.approvalAccepted)
                                {
                                    _array.push('<div class="icon-button-transfer-new" style = "display:none;float:right;margin:1px 10px 0 0;">' +
                                        '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.transfer + '</span>'
                                        + '</div>');
                                } else {
                                    _array.push('<div style = "display:none"></div>');
                                }
                            } else if ((linedata.get('type') != ProtocolType.ExamPlan && linedata.get('status') == 'DELETION_ACCEPTED') || linedata.get('status') == 'APPROVAL_REJECTED') {
                                _array.push('<div style = "display:none"></div>');
                                _array.push('<div style = "display:none"></div>');
                            } else {
                                _array.push('<div style = "display:none"></div>');
                                if((transferPresetEnabled || linedata.get('type') == ProtocolType.ExamPlan) && cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer && memoryProtocolShare)
                                {
                                    _array.push('<div class="icon-button-transfer-new" style = "display:none;float:right;margin:1px 10px 0 0;">' +
                                        '<span class="SpanTextView-restorebutton">' + stringSetting.history.button.transfer + '</span>'
                                        + '</div>');
                                } else {
                                    _array.push('<div style = "display:none"></div>');
                                }

                            }
                        }
                        _array.push('</div>');
                    }
                }
                _array.push('</td>');
                
//                _array.push('<td width = "' + this.columnData[this.columnIndex.Version].width + '" class = "Td-Constitution-Version" style = "height:'+_height+'px;">');
//
//                if(linedata.get('patienttype') != "")
//                {
//                    _array.push('<span unselectable="on" class ="spanGridValue">');
//                    _array.push(linedata.get('version'));
//                    _array.push('</span>');
//                }
//                _array.push('</td>');

                _array.push('<td width = "' + this.columnHeaderPanel.columnData[this.columnIndex.Date].width + '" class = "History-Column-Value" style = "height:' + _height + 'px;" ');

                var lastUpddt = DateFormatByExt(new Date(linedata.get('lastupddt')), 'Y M d H:i');
                if (getStringRealWidth(this.styleTip, lastUpddt) >
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
            }
            if(machine)
            {
                _array.push('<td width = "' + ColumnsWidth + '" class = "History-Column-Value" style = "height:' + _height + 'px;">');
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
                            modelInfoTip.push({status: _status, machineName: _machineInfo[ii]});

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
                    _array.push('<td id = "' + _id + '" class = "' + borderStyle + '" style = "height:' + _height + 'px;"');

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

    setMachineStatusImg : function(type, info, tip, protocoleptype) {
        var shareHtml = "";

        if (type == 0) {
            shareHtml = '<img src='+ ProtocolShared.IN_DELIVERY + ' style="width:32px;margin-bottom: -6px;padding-right:10px;"/>';
            shareHtml = shareHtml + '<span unselectable="on" class ="spanGridValue">' + info + '</span>';
        }
        if (type == 1) {
            shareHtml = '<img src='+ ProtocolShared.DELIVERIED +' style="width:32px;margin-bottom: -4px;padding-right:10px;"/>';
            shareHtml = shareHtml + '<span unselectable="on" class ="spanGridValue">' + info + '</span>';;
        }
        if (type == 2 || type == -1) {
            shareHtml = ProtocolShared.NOT_TO_DELIVERY;
        }
        return shareHtml;
    },

    getTipMachineStatusImg : function(type) {
        var shareHtml = "";

        if (type == 0) {
            shareHtml = '<img src='+ ProtocolShared.IN_DELIVERY + ' style="width:32px;margin-bottom: -6px;padding-right:10px;"/>';
        }
        if (type == 1) {
            shareHtml = '<img src='+ ProtocolShared.DELIVERIED +' style="width:32px;margin-bottom: -4px;padding-right:10px;"/>';
        }
        if (type == 2) {
            shareHtml = ProtocolShared.NOT_TO_DELIVERY;
        }
        return shareHtml;
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
        if (headerDataForHistoryListFlg) {
            this.headerData = [];
            deepClone(this.headerData, headerDataForHistoryList);
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

    delresButtonEvent : function(isDelete)
    {
        var me = this;

        var params = {};
        if(isDelete)
        {
            params.option = 'delete';
            params.url = PROCESS_PATH_GLOBAL_ACTION + 'deleteHistoryProtocol.action';
            params.headerText1 = stringSetting.history.message.delete_comfirm_text1;
        }
        else
        {
            params.option = 'restore';
            params.url = PROCESS_PATH_GLOBAL_ACTION + 'restoreHistoryProtocol.action';
            params.headerText1 = stringSetting.history.message.restore_comfirm_text1;
        }
        var confirm = Ext.create('PM.view.history.ResDelConfirm',{
                parentPanel     : me,
                filePath        : me.storeDataDisplay[me.selectRowNum].get('filepath'),
                machineName     : me.storeDataDisplay[me.selectRowNum].get('machinename'),
                isTransferred   : me.storeDataDisplay[me.selectRowNum].get('istransferred'),
                modifytime      : me.storeDataDisplay[me.selectRowNum].get('modifytime'),
                url             : params.url,
                title           : stringSetting.history.title_comfirm_header,
                headerText1     : params.headerText1,
                headerText2     : stringSetting.history.message.restore_comfirm_text2,
                option          : params.option,
                parentPanelShow : function ()
                {
                    me.selectRowNum = -1;
                    me.store.load({
                        params: {refresh_flg : ""}});
                    if (me.historyShow) {
                        me.backList(false);
                    }
                }
           });
           confirm.showWin();
    },

    getFilterData : function(dataTemp, columnInfo, flag, fromFilter)
    {
        var me = this;

        var filterList = [];
        var list = [];
        if (!flag) {
            deepClone(list, columnInfo[3].filter.list);
        }
        me.filterCheckedBak = {};
        me.filterCheckedUsed = {};
        for(var j = 0;j < columnInfo.length;j++)
        {
            if(columnInfo[j].filter != null && columnInfo[j].filter.list.length > 0)
            {
                me.filterArrrayToObject(me.filterCheckedBak, columnInfo[j].filter.list, columnInfo[j].filter.key);
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
                if(me.filterCheckedBak[checkKey] == null)
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : true
                    });
                    me.filterCheckedBak[checkKey] = true;
                    me.filterCheckedUsed[checkKey] = true;
                }
                else if(!me.filterCheckedUsed[checkKey])
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : me.filterCheckedBak[checkKey]
                    });
                    me.filterCheckedUsed[checkKey] = true;
                }
                if(!me.filterCheckedBak[checkKey])
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
            deepClone(columnInfoForHistoryListFilter, columnInfo);
        }
        return filterList;
    },

    filterArrrayToObject : function(obj, ary, name)
    {
        var me = this;
        for(var i = 0;i < ary.length;i++)
        {
            var _key = name + MasterSplitSign + ary[i].value;
            obj[_key] = ary[i].check;
        }
    },

    panelCleanUpdate : function (flag)
    {
        this.startRowNum = 0;
        var header = document.getElementById("sourcetable_tableHeader");
        if(header) {
            this.tempScrollLeft = header.scrollLeft;
        }
        if(this.centerPanel != null)
        {
            this.centerPanel.update("");
        }
        this.panelUpdate(flag);
    },

    panelUpdate : function (flag, fromFilter)
    {
        var me = this;

        me.getDomSize();
        me.setColumnHeader();

        me.cellEndHeight = 0;
        me.lenDataDisplay = 0;
        if(me.selectRowNum == -1)
        {
            me.storeDataDisplay = [];
            if(me.northPanel.getWidth() != me.curWidth - 19)
            {
                me.northPanel.setWidth(me.curWidth - 19);
            }
            me.storeData = me.storeDataBak;
            me.sortData();

            me.storeData = me.getFilterData(me.storeData, me.columnHeaderPanel.columnData, flag, fromFilter);

            if (this.hideDelFlag) {
                for(var i = 0;i < this.storeData.length;i++) {
                    if (this.storeData[i].get("status") == 'DELETION_ACCEPTED') {
                        continue;
                    }
                    this.storeDataDisplay.push(this.storeData[i]);
                    this.lenDataDisplay++;
                }
            }
            else
            {
                for(var i = 0;i < this.storeData.length;i++) {
                    this.storeDataDisplay.push(this.storeData[i]);
                    this.lenDataDisplay++;
                }
            }

            var docwidth = this.getNameRealWidth();

            var tableRealheight = this.storeDataDisplay.length * 30;
            var tableListHeight = this.curHeight - 145 - this.historyPanelHeight - 60;

            ColumnsWidth = 0;
            for(var i = 0;i < this.columnHeaderPanel.columnData.length;i++)
            {
                if(this.columnHeaderPanel.columnData[i].width != '')
                {
                     ColumnsWidth = ColumnsWidth + this.columnHeaderPanel.columnData[i].width;
                }
            }
            ColumnsWidth=  ColumnsWidth + this.getSpaceCellWidth(this.columnHeaderPanel.columnData[this.columnIndex.Name].minWidth);
            if (docwidth < 0) {
                tableListHeight -= getChromeScrollWidth();
            }

            if (tableListHeight > tableRealheight) {
                var spaceTd = Math.ceil((tableListHeight - tableRealheight) / 30);
                this.cellEndHeight = (tableListHeight - tableRealheight) % 30;

                for (var i = 0; i < spaceTd; i++) {
                    this.storeDataDisplay[this.storeDataDisplay.length] = new PM.model.ConstitutionList();
                }
            }
        }
        var _html = this.loadData(this.selectRowNum, 0);

        if(this.selectRowNum != -1)
        {
            if (!this.historyShow || flag) {
                this.updateProtocolTable(_html);
                setTipByConfig(this.tipConfigList);
            }
            this.updateHistoryTable();
        }
        else
        {
            this.centerPanel.update(_html);
            setTipByConfig(this.tipConfigList);
        }
        this.getDropLineHeight();
        this.addGridEvent();

    },

    addTrEventFun : function(div1, div2)
    {
        var me = this;
        var dataTr1 = div1.getElementsByTagName("tr");
        var dataTr2 = div2.getElementsByTagName("tr");

        if(dataTr1.length != dataTr2.length)
        {
            return;
        }
        var len = dataTr1.length;
        if(len > me.storeData.length)
        {
            len = me.storeData.length;
        }

        for (var i = 0; i < len; i++) {
            if (dataTr1[i].attributes.status.nodeValue !== '') {
                dataTr1[i].onmouseover = dataTr2[i].onmouseover = function (e) {
                    var index = this.rowIndex;
                    me.setSelelctColor(dataTr1[index], dataTr2[index], "selected");
                    if(cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Reviewer){
                        return;
                    }
                    dataTr1[index].childNodes[3].childNodes[1].childNodes[0].style.display = '';
                    dataTr1[index].childNodes[3].childNodes[1].childNodes[1].style.display = '';
                };
                dataTr1[i].onmouseout = dataTr2[i].onmouseout = function (e) {
                    var index = this.rowIndex;
                    me.setSelelctColor(dataTr1[index], dataTr2[index], "");
                    if(cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Reviewer){
                        return;
                    }
                    dataTr1[index].childNodes[3].childNodes[1].childNodes[0].style.display = 'none';
                    dataTr1[index].childNodes[3].childNodes[1].childNodes[1].style.display = 'none';
                };
            }
        };
    },

    widthChange : function(headerObj)
    {
        var me = this;

        var headerDiv = document.getElementById("sourcetable_upperHeader");

        var _array = [];
        _array.push('<table class="Constitution-Table-Deep-Color" onselectstart="return false" ondrag="return false">');
        _array.push(headerObj.getColumnHeader(true));
        _array.push('</table>');
        headerDiv.innerHTML = _array.join('');

        var tableDiv = document.getElementById("sourcetable_tableColumn");
        _array = [];
        me.createHisData(_array, me.selectRowNum, false, true);
        tableDiv.innerHTML = _array.join('');

        var rightDiv = document.getElementById("sourcetable_tableData");
        me.addTrEventFun(tableDiv, rightDiv);
    },

    addGridEvent : function()
    {
        //bind event
        var me = this;
        var dataDiv = document.getElementById("sourcetable_tableData");
        var clolumnDiv = document.getElementById("sourcetable_tableColumn");

        me.addTrEventFun(clolumnDiv, dataDiv);

        dataDiv.onscroll = function(e)
        {
            var headerDiv = document.getElementById("sourcetable_tableHeader");
            headerDiv.scrollLeft = this.scrollLeft;
        };
        if(me.tempScrollLeft > 0 && dataDiv){
            var headerDiv = document.getElementById("sourcetable_tableHeader");
            if(headerDiv) {
                headerDiv.scrollLeft = me.tempScrollLeft;
                dataDiv.scrollLeft = me.tempScrollLeft;
                clolumnDiv.scrollLeft = me.tempScrollLeft;
            }
            me.tempScrollLeft = 0;
        }
        var scrollDiv = document.getElementById("sourcetable_scroll");
        if(!scrollDiv)
        {
            return;
        }


        var scrollEventFlg = "";
        var mouseWheelEvent = function(e)
        {
            var currentTime = (new Date()).getTime();

            if((currentTime - me.scrollTime)<60){
                me.scrollTime = currentTime;
                return false;
            }
            me.scrollTime = currentTime;
            var divObj = this;
            var e = event || window.event;
            var deltaY =
//                         e.deltaY * 30 ||
                         e.wheelDeltaY / -1 ||
                         (e.wheelDeltaY === undefined && e.wheelDelta / -1) ||
//                         e.detail * 10 ||
                         0;
            if(deltaY == null)
            {
                return;
            }

            var outlierBak = divObj.scrollTop;
            var _startRowNum = me.startRowNum;

            var contentHeight = divObj.offsetHeight - 2;
//            var frameHeight = me.lenDataDisplay * 30;
            var frameHeight = 900;
            var _scrollTop = divObj.scrollTop;

            _scrollTop = _scrollTop + deltaY + _startRowNum * 30;

            var outlier = _scrollTop % 30;
            _startRowNum = (_scrollTop - outlier) / 30;

            var maxRows = Math.ceil(contentHeight / 30);
            if(me.lenDataDisplay < maxRows)
            {
                return;
            }
            if(_startRowNum < 0)
            {
                _startRowNum = 0;

                outlier = 0;
            }
            else if(_startRowNum > me.lenDataDisplay - maxRows)
            {

                _startRowNum = me.lenDataDisplay - maxRows;

                outlier = contentHeight % 30;
            }


            if(me.startRowNum == _startRowNum && outlierBak == outlier)
            {
                return;
            }
            me.startRowNum = _startRowNum;

            //var _html = new Array();

            /*if(this.id == "sourcetable_tableColumn")
            {
                me.createHisData(_html, me.selectRowNum, false, true, this.leftDataWidth);
            }
            else if(this.id == "sourcetable_tableData")
            {
                me.createHisData(_html, me.selectRowNum, true, false, me.leftDataWidth);
            }*/

            //divObj.innerHTML = _html.join('');

            //var minOffset = Math.min(outlier, frameHeight - contentHeight + me.bottomScrollHeight);

            //divObj.scrollTop = minOffset;

            scrollDiv.scrollTop = _scrollTop;

            scrollEventFlg = this.id;
            return false;
        };

        dataDiv.onmousewheel = mouseWheelEvent;
        clolumnDiv.onmousewheel = mouseWheelEvent;

        scrollDiv.onscroll = function(e)
        {
            var _html = [];
            if(scrollEventFlg == "sourcetable_tableColumn" || scrollEventFlg == "sourcetable_tableData")
            {
                me.createHisData(_html, me.selectRowNum, false, true, me.leftDataWidth);
                clolumnDiv.innerHTML = _html.join('');

                _html = [];
                me.createHisData(_html, me.selectRowNum, true, false, me.leftDataWidth);
                dataDiv.innerHTML = _html.join('');

                if(scrollEventFlg == "sourcetable_tableColumn") {
                    dataDiv.scrollTop = clolumnDiv.scrollTop;
                }else{
                    clolumnDiv.scrollTop = dataDiv.scrollTop;
                }
            }
            else
            {

                var contentHeight = this.offsetHeight - 2;
                var frameHeight = 900;
                var _scrollTop = this.scrollTop;

                var outlier = this.scrollTop % 30;
                me.startRowNum = (_scrollTop - outlier) / 30;

                var maxRows = Math.ceil(contentHeight / 30);

                if(me.startRowNum < 0)
                {
                    me.startRowNum = 0;

                    outlier = 0;
                }
                else if(me.startRowNum > me.storeData.length - maxRows)
                {
                    me.startRowNum = me.storeData.length - maxRows;

                    outlier = contentHeight % 30;
                }
                var _html = [];
                me.createHisData(_html, me.selectRowNum, false, true, this.leftDataWidth);
                clolumnDiv.innerHTML = _html.join('');

                _html = [];
                me.createHisData(_html, me.selectRowNum, true, false, me.leftDataWidth);
                dataDiv.innerHTML = _html.join('');

                var minOffset = Math.min(outlier, frameHeight - contentHeight + me.bottomScrollHeight);

                dataDiv.scrollTop = minOffset;
                clolumnDiv.scrollTop = minOffset;
            }

            setTipByConfig(me.tipConfigList);

            me.addTrEventFun(clolumnDiv, dataDiv);

            scrollEventFlg = "";
        };

    },
    updateProtocolTable : function(html)
    {
        this.northPanelCenter.update(html);
        if (this.getNameRealWidth() < 0 && this.historyShow) {
            this.northPanel.setHeight(78 + this.historyPanelHeight + getChromeScrollWidth());
        } else {
            this.northPanel.setHeight(78 + this.historyPanelHeight);
        }
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
        });
        this.centerPanel.add(this.panelHistory);
        this.centerPanel.body.removeCls("panel-Noborder-Padding-transparent");
        this.centerPanel.body.addCls("panel-NoborderPadding");
        this.centerPanel.body.dom.style.background = "#EDF0F7";
    },
    updateHistoryTableHeight : function()
    {
        var _topHeight = 198 + this.historyPanelHeight;
        if (this.getNameRealWidth() < 0 && this.historyShow) {
            _topHeight = _topHeight + getChromeScrollWidth();
        }
        this.panelHistory.topHeight = _topHeight;
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

    onClick: function (e)
    {
        var me = this;
        var target = e.target;

        var rowStore = me.getStoreButton(e.target);
        var rowEl = me.getTrEl(target);

        if (rowStore != null) {
            if (!me.historyShow) {
                me.selectRowNum = rowEl.rowIndex + me.startRowNum;
                me.startRowNum = 0;
            }
            var thisPanel = this;

            var confirm = Ext.create('PM.view.history.ResDelConfirm', {
                parentPanel: thisPanel,
                filePath: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('filepath'),
                machineName: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('machinename'),
                isTransferred: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('istransferred'),
                modifytime: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('modifytime'),
                url: PROCESS_PATH_GLOBAL_ACTION + 'restoreHistoryProtocol.action',
                title: stringSetting.history.title_comfirm_header,
                headerText1: stringSetting.history.message.restore_comfirm_text1,
                headerText2: stringSetting.history.message.restore_comfirm_text2,
                option: 'restore',
                parentPanelShow: function () {
                    thisPanel.selectRowNum = -1;
                    thisPanel.transferGroupName = "";
                    thisPanel.transferCount = 0;
                    thisPanel.store.load({
                        params: {refresh_flg: ""}
                    });
                    if (thisPanel.historyShow) {
                        thisPanel.backList(false);
                    }
                }
            });

            confirm.showWin();
            if (!me.historyShow) {
                thisPanel.selectRowNum = -1;
            }
            return;
        }

        var rowDel = me.getDeleteButton(e.target);
        if (rowDel != null) {
            var thisPanel = this;
            if (!thisPanel.historyShow) {
                thisPanel.selectRowNum = rowEl.rowIndex + me.startRowNum;
            }

            var confirm = Ext.create('PM.view.history.ResDelConfirm', {
                parentPanel: thisPanel,
                filePath: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('filepath'),
                machineName: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('machinename'),
                isTransferred: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('istransferred'),
                modifytime: thisPanel.storeDataDisplay[thisPanel.selectRowNum].get('modifytime'),
                url: PROCESS_PATH_GLOBAL_ACTION + 'deleteHistoryProtocol.action',
                title: stringSetting.history.title_comfirm_header,
                headerText1: stringSetting.history.message.delete_comfirm_text1,
                headerText2: stringSetting.history.message.delete_comfirm_text2,
                option: 'delete',
                parentPanelShow: function () {
                    thisPanel.selectRowNum = -1;
                    thisPanel.transferGroupName = "";
                    thisPanel.transferCount = 0;
                    thisPanel.store.load({
                        params: {refresh_flg: ""}
                    });
                    if (thisPanel.historyShow) {
                        thisPanel.backList(false);
                    }
                }
            });

            confirm.showWin();
            if (!me.historyShow) {
                thisPanel.selectRowNum = -1;
            }
            return;
        }

        var rowTransfer = me.getTransferButton(e.target);
        if (rowTransfer != null) {
            var thisPanel = this;
            if (!thisPanel.historyShow) {
                thisPanel.selectRowNum = rowEl.rowIndex + me.startRowNum;
            }

            var filePathList = Array();
            var protocolType = Array();
            var _protocolList = new Array();
            filePathList.push(me.storeDataDisplay[me.selectRowNum].get('filepath'));
            protocolType.push(me.storeDataDisplay[me.selectRowNum].get('type'));
            _protocolList.push(me.storeDataDisplay[me.selectRowNum]);
            var groupName = me.storeDataDisplay[me.selectRowNum].get('groupName');
            var confirm = Ext.create('PM.view.confirm.Base',{
                groupName            : groupName,
                protocolPathList    : filePathList,
                protocolTypeList    : protocolType,
                protocolList        : _protocolList,
                isFromTransfer        : true,
                OKLoad            : function ()
                {
                    me.backList(false);
                    Ext.getBody().mask();
                    createMask();
                    me.store.load({
                        params: {refresh_flg : ""}});
                }
            });
            confirm.showWin();
            if (!me.historyShow) {
                thisPanel.selectRowNum = -1;
            }
            return;
        }

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
                me.btnTransfer.hide();

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
                if (doData.get('status') == ProtocolStatus.localUseAccepted || doData.get('status') == ProtocolStatus.approvalAccepted) {
                    me.btnTransfer.hide();
                } else {
                    me.btnTransfer.hide();
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

    getTrEl: function (el)
    {
        var targetEl = el;
        for(var i = 0;i < 5;i++)
        {
            if(targetEl == null)
            {
                return null;
            }
            if(targetEl.tagName == "TR" &&
               targetEl.getAttribute('status') != null &&
               targetEl.className != "spa")
            {
                return targetEl;
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },

    getStoreButton: function (el)
    {
        var targetEl = el;
        if (targetEl.className.split(" ")[0] == "icon-button-restore-new") {
            return targetEl;
        }
        else if (targetEl.parentElement != null &&
            targetEl.parentElement.className == "icon-button-restore-new") {
            return targetEl.parentElement;
        } else {
            return null;
        }
    },

    getDeleteButton: function (el)
    {
        var targetEl = el;
        if (targetEl.className.split(" ")[0] == "icon-button-delete-new") {
            return targetEl;
        }
        else if(targetEl.parentElement != null &&
                targetEl.parentElement.className == "icon-button-delete-new")
        {
            return targetEl.parentElement;
        } else {
            return null;
        }
    },

    getTransferButton: function (el)
    {
        var targetEl = el;
        if (targetEl.className.split(" ")[0] == "icon-button-transfer-new") {
            return targetEl;
        }
        else if(targetEl.parentElement != null &&
            targetEl.parentElement.className == "icon-button-transfer-new")
        {
            return targetEl.parentElement;
        } else {
            return null;
        }
    },

    setHeaderTitle  : function ()
    {
        var me = this;

        var span_count = document.getElementsByClassName("spanGridHeaderText");

        if (span_count.length > 0)
        {
            span_count = span_count[0];
            span_count.innerHTML = me.titleName + ' (' +
              this.storeData.length + ")";
        }
    },

    hideDeleteItem : function(flg)
    {
        if(flg == "back")
        {
            this.btnHideDelete.setText('<span class="SpanTextView">' + stringSetting.history.button.backtoHistoryList + '</span>');
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

    getDomSize : function()
    {
        this.curWidth = document.documentElement.clientWidth;
        this.curHeight = document.documentElement.clientHeight;
        if (this.curHeight <= 552 + 218) {
            this.curHeight = 552 + 218;
        }
        if (this.curWidth <= 1600) {
            this.curWidth = 1600;
        }
    },

    getStatusTip : function(status, isTransfer)
    {
        var _array = [];
        _array.push('<td');
        _array.push(' data-qtip="');

        if (ProtocolStatus.approvalRequested == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.ApprovalRequested);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.ApprovalRequestedValue);
        } else if (ProtocolStatus.deletionRequested == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionRequested);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionRequestedValue);
        } else if (ProtocolStatus.approvalAccepted == status) {
            if(isTransfer)
            {
                _array.push("<strong>");
                _array.push(stringSetting.status_tip.Transferred);
                _array.push("</strong>");
                _array.push("<Br>");
                _array.push(stringSetting.status_tip.TransferredValue);
            }
            else
            {
                _array.push("<strong>");
                _array.push(stringSetting.status_tip.ApprovalAccepted);
                _array.push("</strong>");
                _array.push("<Br>");
                _array.push(stringSetting.status_tip.ApprovalAcceptedValue);
            }
        } else if (ProtocolStatus.localUseAccepted == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.LocalUseAccepted);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.LocalUseAcceptedValue);
        } else if (ProtocolStatus.approvalRejected == status)
        {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.ApprovalRejected);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.ApprovalRejectedValue);
        } else if (ProtocolStatus.deletionRejected == status)
        {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionRejected);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionRejectedValue);
        } else if (ProtocolStatus.deletionAccepted == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionAccepted);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionAcceptedValue);
        }
        _array.push('" ');
        return _array.join('');
    },

    getStatusImgPath : function(status, isTransfer)
    {
        var imgPath = '';

        if (ProtocolStatus.approvalRequested == status) {
            imgPath =  ProtocolStatusSrc.approvalRequested;
        } else if (ProtocolStatus.deletionRequested == status) {
            imgPath =  ProtocolStatusSrc.deletionRequested;
        } else if (ProtocolStatus.approvalAccepted == status) {
            if(isTransfer)
            {
                imgPath =  ProtocolStatusSrc.transfer;
            }
            else
            {
                imgPath =  ProtocolStatusSrc.approvalAccepted;
            }
        } else if (ProtocolStatus.localUseAccepted == status) {
            imgPath =  ProtocolStatusSrc.localUseAccepted;
        } else if (ProtocolStatus.approvalRejected == status) {
            imgPath =  ProtocolStatusSrc.approvalRejected;
        } else if (ProtocolStatus.deletionAccepted == status) {
            imgPath =  ProtocolStatusSrc.deletionAccepted;
        } else if (ProtocolStatus.deletionRejected == status) {
            imgPath =  ProtocolStatusSrc.deletionRejected;
        }

        return imgPath;
    },

    backList : function(bool)
    {
        var me = this;
        me.selectRowNum = -1;
        me.startRowNum = 0;

        me.btnTransfer.hide();
        me.btnDelete.hide();
        me.btnRestore.hide();
        me.btnNextHistories.show();

        this.northPanel.setHeight(47);
        this.northPanelCenter.update("");
        this.centerPanel.update("");
        this.centerPanel.removeAll(true);
        this.centerPanel.body.removeCls("panel-NoborderPadding");
        this.centerPanel.body.addCls("panel-Noborder-Padding-transparent");

        if(this.panelHistory != null)
        {
            this.panelHistory.removeAll(true);
        }
        this.panelHistory = null;
        this.historyShow = false;
        this.hideDeleteItem("hide");
        if(bool)
        {
            this.panelUpdate(true);
        }
    },

//  getCheckboxEl: function (el)
//  {
//      var targetEl = el;
//      if (targetEl.className == "checkBox_unselected" ||
//          targetEl.className == "checkBox_selected" ||
//          targetEl.className == "checkBox_disabled") {
//          return targetEl;
//      }
//      else if(targetEl.parentElement != null &&
//              targetEl.parentElement.className == "Td-Constitution-Select")
//      {
//          return targetEl.childNodes[0];
//      }
//      else if(targetEl.className == "Td-Constitution-Select")
//      {
//          return targetEl.childNodes[0].childNodes[0];
//      } else {
//          return null;
//      }
//  },

    getHeaderModelEl: function (el)
    {
        var targetEl = el;
        if(targetEl == null)
        {
            return null;
        }

        for(var i = 0;i < 3;i++)
        {
            if(targetEl == null)
            {
                return null;
            }
            if(targetEl.tagName == "TD" &&
               targetEl.offsetParent != null &&
               targetEl.offsetParent.className == "Constitution-Table-Deep-Color" &&
               (targetEl.className == "Td-Constitution-Machine-title" ||
                targetEl.className == "Td-Constitution-Machine-title-noborder" ||
                targetEl.className == "Td-Constitution-Machine-title-sort" ||
                targetEl.className == "Td-Constitution-Machine-title-sort-noborder"))
            {
                return targetEl;
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },

    setSelelctColor : function(tr1, tr2, class_name)
    {
        tr1.className = class_name;
        tr2.className = class_name;
    },

    bindRefreshEvent : function()
    {
        var me = this;
        var btn = document.getElementsByClassName("icon-button-storerefresh-his");
        if (btn != null && btn.length > 0)
        {
            btn[0].onclick = function()
            {
                me.doRefreshEvent();
            };
        }
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
        panelTabConstitution.setIcon(false);
        headerDataForHistoryListFlg = false;
        headerDataForTransferListFlg = false;
    },

    resizeWin : function()
    {
        this.getDomSize();
        this.setColumnHeader();
        var _html = this.loadData(this.selectRowNum);
        this.updateProtocolTable(_html);
        setTipByConfig(this.tipConfigList);
        this.updateHistoryTableHeight();
        this.panelHistory.viewResize();
        // scroll event
        this.addGridEvent();
        this.setOffsetWidth();
    },

    setOffsetWidth : function()
    {
        var tableDiv = document.getElementById("sourcetable_tableData");
        var dataTable = tableDiv.getElementsByTagName("table")[0];
        this.offsetWidth = dataTable.offsetWidth - document.documentElement.scrollWidth + 43;
    },

    getDropLineHeight : function ()
    {
         this.dropLineHeight = this.getNameRealWidth() < 0 ? - getChromeScrollWidth() + 2 : 0;
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
             val    : 'ASC'}
        ];
    }
});