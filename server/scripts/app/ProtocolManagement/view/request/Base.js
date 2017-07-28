/*!
 * JS Console Request List
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.request.Base
 * @extends PM.view.panel.Click
 * @import RequestListView.css
 */
Ext.define('PM.view.request.Base', {
    extend: 'PM.view.panel.Click',

    cls             : 'panelTabView',
    bodyCls         : 'grid-Color-NoborderPadding',
    width           : '100%',
    minWidth        : 1260,
    minWinWidth     : 1170,

    columnIndex     : {
        Status      : 0,
        Type        : 1,
        PatientType : 2,
        Name        : 3,
        Version     : 4,
        Date        : 5,
        Machine     : 6,
        Applicant   : 7
    },
    cellHeight      : 31,
    selectRowNum    : -1,
    resizeFlg       : false,

    headerPanel         : null,
    columnHeaderPanel   : null,
    compCenterPanel     : null,
    comparePanel        : null,
    headCenterPanel     : null,
    centerPanel         : null,

    btnApprove          : null,
    btnKeep             : null,
    btnDelete           : null,
    btnReject           : null,
    btnBack             : null,

    store               : null,
    approveStore        : null,
    storeData           : [],
    styleTip            : styleGridTipGlobal,
    errActionStatus     : {
        overview        : '',
        details         : '',
        details2        : ''
    },

    errChangeFlg        : true,

    showCompare         : false,
    selectRowEl         : null,
    /**
     * function init Component
     */
    initComponent    : function ()
    {
        var me = this;

        // create the RequestList store
        me.store = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getRequestList.action',
                getMethod : function() {
                    return 'GET';
                },
                reader:
                {
                    type: 'json',
                    root: 'result',
                    totalProperty:'total'
                }
            }),
            model: 'PM.model.RequestList'
        });

        // create the approve store
        me.approveStore = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'requestevent.action',
                getMethod : function() {
                    return 'GET';
                },
                reader:
                {
                    type: 'json'
                }
            }),
            model: 'PM.model.RequestEvent'
        });

        me.store.on("load",function()
        {
            Ext.getBody().unmask();
            clearMask();
            if (me.errChangeFlg) {
                //Call ErrorList
                var winErrList = Ext.create("PM.view.request.Errorlist",{
                    minHeight:300
                });
                winErrList.storeLoad();
            }
            me.errChangeFlg = false;

            panelTabRequestList.setIcon(false);

            me.pushData();
            if (columnInfoForRequestListFilter.length > 0) {
                deepClone(me.columnHeaderPanel.columnData, columnInfoForRequestListFilter);
            }
            me.changeData();
            me.panelUpdate(true);

            me.setHeaderTitle();

            alertStore.load();
        });

        me.approveStore.on("load",function()
        {
            Ext.getBody().unmask();
            clearMask();
            if(me.approveStore.getAt(0).get("result") == '-1')
            {

                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR20001,
                    errorParameter : {
                        "overview"     :  me.errActionStatus.overview,
                        "details"     :  me.errActionStatus.details
                    }
                });
                _message.showWin();
            }
            else if(me.approveStore.getAt(0).get("result") == '-2')
            {
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR20002,
                    errorParameter : {
                        "overview"     :  me.errActionStatus.overview,
                        "details"     :  me.errActionStatus.details
                    }
                });
                _message.showWin();
            }
            else if(me.approveStore.getAt(0).get("result") == '-3')
            {

                var _msg = me.approveStore.getAt(0).get("errmessage");
                var list = me.approveStore.getAt(0).get("list");
                var _details = me.errActionStatus.details;
                if(typeof(list) != 'undefined' && list.length > 0){
                    var errList = [];
                    var errNameList = [];
                    var len = list.length;
                    if(len > 0){
                        for (var i = 0; i < len; i++) {

                            var errormessage = Ext.clone(stringSetting.error[list[i]["errmessage"]]);

                            if(list[i]["errmessage"] == 'ERR80002'||list[i]["errmessage"] == 'ERR80003'){

                                errormessage.overview = errormessage.overview.format(me.errActionStatus.overview);

                                errormessage.details = errormessage.details.format(me.errActionStatus.details);

                            }else{
                                errormessage.details = errormessage.details.format(list[i]["name"], list[i]["model"]);
                            }

                            errList.push(errormessage);
                        }


                        var _message = Ext.create('PM.view.common.window.Message',{
                                errorDetailList     : errList,
                                errorNameList         : errNameList
                            });
                        _message.showWin();
                    }
                }else
                {
                    if(_msg == "ERR10001")
                    {
                        _details = [me.errActionStatus.details];
                    }
                    else if(_msg == "ERR10002")
                    {
                        _details = [me.errActionStatus.details, me.errActionStatus.details];
                    }

                    var _message = Ext.create('PM.view.common.window.Message',{
                            errorDetail : stringSetting.error[_msg],
                            errorParameter : {
                                "overview"     :  me.errActionStatus.overview,
                                "details"     :  _details
                            }
                        });
                    _message.showWin();
                }
            }
            me.selectRowNum = -1;

            me.store.load({
                            params: {refresh_flg : ""}});
        });

        this.setColumnHeader();

        var btnRefresh = Ext.create('Ext.button.Button', {
            height: 24,
            cls: 'icon-button-storerefresh',
            overCls:'icon-button-storerefresh-over',
            pressedCls:'icon-button-storerefresh-pressed',
            focusCls:'icon-button-storerefresh-focus',
            disabledCls:'icon-button-storerefresh-disable',
            text:'<span class="SpanTextView-smallbutton" style="padding-left:12px;">' + stringSetting.request.button.refresh + '</span>',
            disabled    : false,
            hidden        : false,
            handler: function() {
                me.doRefreshEvent();
            }
        });

        me.btnBack = Ext.create('Ext.button.Button', {
            height      : 32,
            width       : 260,
            cls         : 'icon-button-BackListButton',
            overCls     : 'icon-button-BackListButton-over',
            pressedCls  : 'icon-button-BackListButton-pressed',
            focusCls    : 'icon-button-BackListButton-focus',
            disabledCls : 'icon-button-BackListButton-disable',
            text        : '<span class="SpanTextView">' + stringSetting.request.button.backtothelist + '</span>',
            hidden      : true,
            handler     : function()
            {
                me.selectRowNum = -1;
                me.panelUpdate(true);
            }
        });

        var buttonHeaderPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            region      : 'center',
            layout      : {
                type    : 'border'
            },
            items        : [
                {
                    region      : 'center',
                    cls         : 'panel-NoborderPadding-transparent',
                    bodyCls     : 'panel-btn-refresh',
                    items       : [btnRefresh]
                },
                {
                    region      : 'east',
                    width       : 260,
                    cls         : 'panel-NoborderPadding-transparent',
                    bodyCls     : 'panel-NoborderPadding-transparent'  ,
                    items       : [me.btnBack]
                }
            ]
        });

        var titleCountPanel = Ext.create('Ext.panel.Panel', {
            cls             : 'panel-NoborderPadding-transparent',
            bodyCls         : 'panel-NoborderPadding-transparent',
            region          : 'west',
            width           : 230,
            html            : me.getHeaderCount(stringSetting.request.title_request)
        });

        me.headerPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panelHeader',
            bodyCls     : 'panel-NoborderPadding',
            minWidth    : this.minWinWidth,
            region      : 'north',
            layout      : {
                type    : 'border'
            },
            height      : 74,
            items       :
            [
                {
                    height        : 35,
                    region        : 'north',
                    layout: {
                        type: 'border'
                    },
                    cls         : 'panel-NoborderPadding',
                    bodyCls     : 'panelHeader-body',
                    items       : [titleCountPanel, buttonHeaderPanel]
                },
                this.columnHeaderPanel
            ]
        });

        me.compCenterPanel = Ext.create('Ext.panel.Panel', {
            region          : 'center',
            layout          : {
                type: 'fit'
            },
            cls             : 'panel-NoborderPadding',
            bodyCls         : 'panel-ScrollBorder-NoPadding',
            html            : ''
        });

        me.headCenterPanel = Ext.create('PM.view.panel.Splitter', {
            region          : 'north',
            hidden          : true,
            height          : this.cellHeight * 4 + 1,
            layout: {
                type: 'fit'
            },
            cls             : 'panel-NoborderPadding',
            bodyCls         : 'panel-ScrollBorder-NoPadding',
            html            : ''
        });
        me.headCenterPanel.addListener('beforecollapse',function( p, direction, animate, eOpts ){
            return false;
        });
        me.centerPanel = Ext.create('Ext.panel.Panel', {
            cls            : 'grid-ColorPadding-Noborder',
            bodyCls       : 'panel-NoborderPadding',
            region      : 'center',
            layout: {
                type: 'border'
            },
            autoScroll    : false,
            items        : [
                me.headCenterPanel,
                me.compCenterPanel
            ]
        });

        Ext.applyIf(me, {
            items:[
                me.headerPanel,
                me.centerPanel,
                me.createButton()
            ]
        });

        me.callParent(arguments);
    },
    setColumnHeader    : function ()
    {
        var me = this;
        var aryColumnData = new Array();
        var _Type_width = 128;
        var _PatientType_width = 161;
        var _Version_width = 121;
        var _Date_width = 186;
        var _Scanner_width = 195;
        var _User_width = 195;

        if(memoryLanguage == Language.JP)
        {
            _Type_width = 151;
            _PatientType_width = 161;
            _Version_width = 134;
            _Scanner_width = 195;
            _User_width = 195;
            _Date_width = 186;
        }
        else if(memoryLanguage == Language.PT)
        {
            _Type_width = 145;
            _PatientType_width = 197;
            _Version_width = 115;
            _Date_width = 186;
            _Scanner_width = 195;
            _User_width = 195;
        }
        else if(memoryLanguage == Language.IT)
        {
            _Type_width = 145;
            _PatientType_width = 192;
            _Version_width = 132;
            _Date_width = 186;
            _Scanner_width = 195;
            _User_width = 195;
        }
        else if(memoryLanguage == Language.FR)
        {
            _Type_width = 139;
            _PatientType_width = 189;
            _Version_width = 131;
            _Date_width = 186;
            _Scanner_width = 195;
            _User_width = 195;
        }
        else if(memoryLanguage == Language.ES)
        {
            _Type_width = 145;
            _PatientType_width = 172;
            _Version_width = 123;
            _Scanner_width = 195;
            _User_width = 195;
            _Date_width = 186;
        }
        else if(memoryLanguage == Language.DE)
        {
            _Type_width = 133;
            _PatientType_width = 163;
            _Version_width = 121;
            _Date_width = 186;
            _Scanner_width = 195;
            _User_width = 195;
        }
        else if(memoryLanguage == Language.NL)
        {
            _Type_width = 130;
            _PatientType_width = 168;
            _Version_width = 127;
            _Date_width = 186;
            _Scanner_width = 195;
            _User_width = 195;
        }

        aryColumnData[me.columnIndex.Status] = {
                                cls         : 'Td-Column-Status',
                                value       : '',
                                sort        : false,
                                width       : 40,
                                minWidth    : 40};

        aryColumnData[me.columnIndex.Type] = {
                                cls         : 'Td-Column-Type',
                                value       : stringSetting.request.column.type,
                                sort        : true,
                                arrowsCls   : 'Td-Column-Type-Sort',
                                arrowsValue : RequestListArrows.TypeNone,
                                width       : _Type_width,
                                filter      : {
                                    list    : [],
                                    key     : 'type',
                                },
//                              filter      : true,
//                              filterList  : [],
//                              key         : 'type',
                                minWidth    : 75};

        aryColumnData[me.columnIndex.PatientType] = {
                                cls         : 'Td-Column-PatientType',
                                value       : stringSetting.request.column.patienttype,
                                sort        : true,
                                arrowsCls   : 'Td-Column-PatientType-Sort',
                                arrowsValue : RequestListArrows.PatientTypeNone,
                                width       : _PatientType_width,
                                filter      : {
                                    list    : [],
                                    key     : 'patienttypedisplay',
                                },
//                              filter      : true,
//                              filterList  : [],
//                              key         : 'patienttypedisplay',
                                minWidth    : 80};

        aryColumnData[me.columnIndex.Name] = {
                                cls             : 'Td-Column-Name',
                                value           : stringSetting.request.column.name,
                                sort            : true,
                                arrowsCls       : 'Td-Column-Name-Sort',
                                arrowsValue     : RequestListArrows.NameNone,
                                width           : '',
                                minWidth        : 150};

        aryColumnData[me.columnIndex.Version] = {
                                cls         : 'Td-Column-Version',
                                value       : stringSetting.request.column.version,
                                sort        : true,
                                arrowsCls   : 'Td-Column-Version-Sort',
                                arrowsValue : RequestListArrows.VersionNone,
                                width       : _Version_width,
                                minWidth    : 60};

        aryColumnData[me.columnIndex.Machine] = {
                                cls         : 'Td-Column-Machine',
                                value       : stringSetting.request.column.scanner,
                                sort        : true,
                                arrowsCls   : 'Td-Column-Machine-Sort',
                                arrowsValue : RequestListArrows.MachineNone,
                                width       : _Scanner_width,
                                filter      : {
                                    list    : [],
                                    key     : 'displaymachinename',
                                },
//                              filter      : true,
//                              filterList  : [],
//                              key         : 'displaymachinename',
                                minWidth    : 100};

        aryColumnData[me.columnIndex.Applicant] = {
                                cls         : 'Td-Column-Applicant',
                                value       : stringSetting.request.column.user,
                                sort        : true,
                                arrowsCls   : 'Td-Column-Applicant-Sort',
                                arrowsValue : RequestListArrows.ApplicantNone,
                                width       : _User_width,
                                minWidth    : 80};

        aryColumnData[me.columnIndex.Date] = {
                                cls         : 'Td-Column-Time',
                                value       : stringSetting.request.column.date,
                                sort        : true,
                                arrowsCls   : "Td-Column-Time-Sort",
                                arrowsValue : RequestListArrows.DateUp,
                                width       : _Date_width,
                                minWidth    : 100};

        me.columnHeaderPanel = Ext.create('PM.view.header.ResizeView', {
            minWidth            : me.minWinWidth,
            region              : 'center',
            cls                 : getChromeScrollCss(),
            bodyCls             : "columnHeader-body-Chrome",
            tableCls            : 'RequestList-Header',
//rowCls              : 'RequestList-ColumnHeader',
            columnData          : aryColumnData,
            parentPanel         : me,
            getSortIndexFn      : me.getHeaderSortIndex,
            updateIconFn        : me.updateHeaderIcon,
            doFilterData        : function()
            {
                me.changeData();
                me.panelUpdate(true);
            },
            dataUpdate          : function()
            {
                me.panelUpdate(false);
            },
            getFilterList: function(index)
            {
                return me.getFilterList(index);
            }
        });
    },
    /**
     * function set Header Title
     */
    setHeaderTitle    : function ()
    {
        var me = this;
        var _header = me.headerPanel.body.el.dom.getElementsByClassName('divGridHeaderCount');

        if(_header.length > 0)
        {
            _header[0].outerHTML = me.getHeaderCount(stringSetting.request.title_request +
                ' (' + this.storeData.length + ')');
        }
    },
    /**
     * function load html Data
     */
    loadData    : function ()
    {

        var viewDataHeight = 0;
        if(this.selectRowNum == -1)
        {
            viewDataHeight = document.documentElement.clientHeight - 231;
            if(viewDataHeight < 321 + 218)
            {
                viewDataHeight = 321+ 218;
            }
        }
        else
        {
            viewDataHeight = this.headCenterPanel.getHeight() - 1;
        }

        var maxCount = 0;
        var cellEndHeight = viewDataHeight % this.cellHeight;
        maxCount = (viewDataHeight - cellEndHeight) / this.cellHeight;
        if(viewDataHeight % this.cellHeight > 0)
        {
            maxCount++;
        }

        var lenMax = maxCount;
        if(this.storeData.length > maxCount)
        {
            lenMax = this.storeData.length;
        }
        var _array = new Array();
        var _style = "";
        _array.push('<table onselectstart="return false" ');
        _array.push('ondrag="return false" ');
        _array.push('class = "RequestList-Table">');

        for(var i = 0;i < lenMax;i++)
        {
            if(this.selectRowNum == i)
            {
                _style = "RequestList-Tr-Select";
            }
            else
            {
                if(i % 2 == 0)
                {
                    _style = "RequestList-Tr";
                }
                else
                {
                    _style = "RequestList-Tr-S";
                }
            }

            if(i >= this.storeData.length)
            {
                _style = _style + "-Space";
                _array.push('<tr class = "' + _style + '">');
                var _cellHeight = 0;
                if(i == lenMax - 1)
                {
                    if(cellEndHeight == 0)
                    {
                        _cellHeight = this.cellHeight;
                    }
                    else
                    {
                        _cellHeight = cellEndHeight - 1;
                    }
                }
                else
                {
                    _cellHeight = this.cellHeight;
                }
                //Status
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Status).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Type).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.PatientType).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                var _widthName = this.columnHeaderPanel.getSpaceCellWidth();
                if(_widthName < this.columnHeaderPanel.getColumnData(this.columnIndex.Name).minWidth)
                {
                    _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Name).minWidth + '" ');
                }
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Name).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Version).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Date).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-RequestList-Cell-Space" ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Machine).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td ');
                _array.push('width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Applicant).width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
            }
            else
            {
                _array.push('<tr class = "' + _style + '">');
                _array.push('<td');
                _array.push(' data-qtip="');
                if(this.storeData[i].get('status') ==
                    RequestListStatus.approvalRequested)
                {
                    _array.push("<strong>");
                    _array.push(stringSetting.status_tip.ApprovalRequested);
                    _array.push("</strong>");
                    _array.push("<Br>");
                    _array.push(stringSetting.status_tip.ApprovalRequestedValue);
                }
                else if(this.storeData[i].get('status') ==
                        RequestListStatus.deletionRequested)
                {
                    _array.push("<strong>");
                    _array.push(stringSetting.status_tip.DeletionRequested);
                    _array.push("</strong>");
                    _array.push("<Br>");
                    _array.push(stringSetting.status_tip.DeletionRequestedValue);
                }

                _array.push('" ');
                _array.push(' width = "' + this.columnHeaderPanel.getColumnData(this.columnIndex.Status).width + '"');
                _array.push(' class = "Td-RequestList-Status">');

                if(this.storeData[i].get('status') ==
                    RequestListStatus.approvalRequested)
                {
                    _array.push(RequestListStatusImg.approvalRequested);
                }
                else if(this.storeData[i].get('status') ==
                        RequestListStatus.deletionRequested)
                {
                    _array.push(RequestListStatusImg.deletionRequested);
                }

                _array.push('</td>');
                var protocoleptype = this.storeData[i].get('protocoleptype');

                _array.push(this.createTdString(convertSupFont(this.storeData[i].get('type')),
                                this.columnIndex.Type,
                                "Td-RequestList-Type", true, protocoleptype));

                _array.push(this.createTdString(this.storeData[i].get('patienttypedisplay'),
                                this.columnIndex.PatientType,
                                "Td-RequestList-PatientType", null, protocoleptype));

                var _name = this.storeData[i].get('protocolname');

                var _widthName = this.columnHeaderPanel.getSpaceCellWidth();
                var _widthNameHtml = "";
                if(_widthName < this.columnHeaderPanel.getColumnData(this.columnIndex.Name).minWidth)
                {
                    _widthName = this.columnHeaderPanel.getColumnData(this.columnIndex.Name).minWidth;
                    _widthNameHtml = 'width = "' + _widthName + '" ';
                }
                _array.push('<td class = "Td-RequestList-Name" ');
                if(getStringRealWidth(this.styleTip, _name) > _widthName - 13)
                {
                    _array.push('data-qtip="');
                    _array.push(Ext.util.Format.htmlEncode(Ext.util.Format.htmlEncode(_name)));
                    _array.push('" ');
                }
                _array.push(_widthNameHtml);
                _array.push('>');
                if (protocoleptype === 'Service') {
                    _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                } else {
                    _array.push('<span unselectable="on" class ="spanGridValue">');
                }
                _array.push(Ext.util.Format.htmlEncode(_name));
                _array.push('</span>');
                _array.push('</td>');

                _array.push(this.createTdString(this.storeData[i].get('version'),
                                this.columnIndex.Version,
                                "Td-RequestList-Version", null, protocoleptype));
                _array.push(this.createTdString(DateFormatByExt(this.storeData[i].get('lastupddt'), 'Y M d H:i'),
                                this.columnIndex.Date,
                                "Td-RequestList-Time", null, protocoleptype));
                _array.push(this.createTdString(
                                Ext.util.Format.htmlEncode(this.storeData[i].get('displaymachinename')),
                                this.columnIndex.Machine,
                                "Td-RequestList-Machine", null, protocoleptype));
                _array.push(this.createTdString(this.storeData[i].get('applicant'),
                                this.columnIndex.Applicant,
                                "Td-RequestList-Applicant", null, protocoleptype));
            }
            _array.push('</tr>');
        }

        _array.push('</table>');

        deepClone(columnInfoForRequestListFilter, this.columnHeaderPanel.columnData);

        return _array.join('');
    },
    createTdString    : function (val, columnIndex, tdCls, allLenFlg, protocoleptype)
    {
        var _array = new Array();
        _array.push('<td ');
        if(allLenFlg)
        {
            if(getStringWidth(this.styleTip, val, true) >
               this.columnHeaderPanel.getColumnData(columnIndex).width - 13)
            {
                _array.push('data-qtip="');
                _array.push(val);
                _array.push('" ');
            }
        }
        else
        {
            if(getStringRealWidth(this.styleTip, val) >
               this.columnHeaderPanel.getColumnData(columnIndex).width - 13)
            {
                _array.push('data-qtip="');
                _array.push(val);
                _array.push('" ');
            }
        }

        _array.push('width = "' + this.columnHeaderPanel.getColumnData(columnIndex).width + '" ');
        _array.push('class = "' + tdCls +'">');
        if (protocoleptype === 'Service') {
            _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
        } else {
            _array.push('<span unselectable="on" class ="spanGridValue">');
        }
        _array.push(val);

        _array.push('</span>');
        _array.push('</td>');

        return _array.join('');
    },
    changeData  : function()
    {
        var me = this;
        var index = 0
        var dataTemp = me.store.data.items;
        me.storeData = [];
        for(var i = 0;i < dataTemp.length;i++)
        {
            var filterFlg = false;
            for(var j = 0;j < me.columnHeaderPanel.columnData.length;j++)
            {
                if(me.columnHeaderPanel.columnData[j].filter == null)
                {
                    continue;
                }
                var keyVal = dataTemp[i].get(me.columnHeaderPanel.columnData[j].filter.key);
                if(keyVal == "")
                {
                    keyVal = "Blank";
                }
                else if(me.columnHeaderPanel.columnData[j].filter.key == "type")
                {
                    keyVal = convertSupFont(keyVal);
                }

                for(var k = 0;k < me.columnHeaderPanel.columnData[j].filter.list.length;k++)
                {
                    if(me.columnHeaderPanel.columnData[j].filter.list[k].check == false &&
                       me.columnHeaderPanel.columnData[j].filter.list[k].value == keyVal)
                    {
                        filterFlg = true;
                        break;
                    }
                }
                if(filterFlg)
                {
                    break;
                }
            }
            if(filterFlg)
            {
                continue;
            }

            me.storeData.push(dataTemp[i]);
            me.storeData[index].set('index', index);

            if(ProtocolType.SureIQ == me.storeData[index].get('type'))
            {
                me.storeData[index].set('patienttypedisplay', "");
            }
            else
            {
                me.storeData[index].set('patienttypedisplay', me.storeData[index].get('patienttype'));
            }
            index++;
        }
        deepClone(columnInfoForRequestListFilter, me.columnHeaderPanel.columnData);
    },
    pushData    : function ()
    {
        var me = this;
        me.storeData = me.store.data.items;
        var checkRepeat = [];
        for(var i = 0;i < me.storeData.length;i++)
        {
            me.storeData[i].set('index', i);

            if(ProtocolType.SureIQ == me.storeData[i].get('type'))
            {
                me.storeData[i].set('patienttypedisplay', "");
            }
            else
            {
                me.storeData[i].set('patienttypedisplay', me.storeData[i].get('patienttype'));
            }
            for(var j = 0;j < me.columnHeaderPanel.columnData.length;j++)
            {
                if(me.columnHeaderPanel.columnData[j].filter != null)
                {
                    if(i == 0)
                    {
                        me.columnHeaderPanel.columnData[j].filter.list = [];
                    }
                    var keyVal = me.storeData[i].get(me.columnHeaderPanel.columnData[j].filter.key);
                    if(keyVal == "")
                    {
                        keyVal = "Blank";
                    }
                    else if(me.columnHeaderPanel.columnData[j].filter.key == "type")
                    {
                        keyVal = convertSupFont(keyVal);
                    }
                    var checkKey = j + "#check#" + keyVal;
                    if(checkRepeat[checkKey] == null)
                    {
                        me.columnHeaderPanel.columnData[j].filter.list.push({
                            value   : keyVal,
                            check   : true,
                        });
                        checkRepeat[checkKey] = "";
                    }
                }
            }
        }

    },
    sortData : function()
    {
        var select = -1;
        if(this.selectRowNum != -1)
        {
            select = this.storeData[this.selectRowNum].get('index');
        }

        var arrowsTypeValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Type).arrowsValue;
        if(arrowsTypeValue == RequestListArrows.TypeDown)
        {
            sortArrayCommon(this.storeData, 'type', 'DESC');
        }
        else if(arrowsTypeValue == RequestListArrows.TypeUp)
        {
            sortArrayCommon(this.storeData, 'type', 'ASC');
        }

        var arrowsPatientTypeValue = this.columnHeaderPanel.getColumnData(this.columnIndex.PatientType).arrowsValue;
        if(arrowsPatientTypeValue == RequestListArrows.PatientTypeDown)
        {
            sortArrayCommon(this.storeData, 'patienttypedisplay', 'DESC');
        }
        else if(arrowsPatientTypeValue == RequestListArrows.PatientTypeUp)
        {
            sortArrayCommon(this.storeData, 'patienttypedisplay', 'ASC');
        }

        var arrowsNameValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Name).arrowsValue;
        if(arrowsNameValue == RequestListArrows.NameDown)
        {
            sortArrayCommon(this.storeData, 'protocolname', 'DESC');
        }
        else if(arrowsNameValue == RequestListArrows.NameUp)
        {
            sortArrayCommon(this.storeData, 'protocolname', 'ASC');
        }

        var arrowsVersionValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Version).arrowsValue;
        if(arrowsVersionValue == RequestListArrows.VersionDown)
        {
            sortArrayCommon(this.storeData, 'version', 'DESC');
        }
        else if(arrowsVersionValue == RequestListArrows.VersionUp)
        {
            sortArrayCommon(this.storeData, 'version', 'ASC');
        }

        var arrowsDateValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Date).arrowsValue;
        if(arrowsDateValue == RequestListArrows.DateDown)
        {
            sortArrayCommon(this.storeData, 'lastupddt', 'DESC');
        }
        else if(arrowsDateValue == RequestListArrows.DateUp)
        {
            sortArrayCommon(this.storeData, 'lastupddt', 'ASC');
        }

        var arrowsMachineValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Machine).arrowsValue;
        if(arrowsMachineValue == RequestListArrows.MachineDown)
        {
//          sortArrayCommon(this.storeData, 'machinename', 'DESC');
            sortArrayCommon(this.storeData, 'displaymachinename', 'DESC');
        }
        else if(arrowsMachineValue == RequestListArrows.MachineUp)
        {
//          sortArrayCommon(this.storeData, 'machinename', 'ASC');
            sortArrayCommon(this.storeData, 'displaymachinename', 'ASC');
        }

        var arrowsApplicantValue = this.columnHeaderPanel.getColumnData(this.columnIndex.Applicant).arrowsValue;
        if(arrowsApplicantValue == RequestListArrows.ApplicantDown)
        {
            sortArrayCommon(this.storeData, 'applicant', 'DESC');
        }
        else if(arrowsApplicantValue == RequestListArrows.ApplicantUp)
        {
            sortArrayCommon(this.storeData, 'applicant', 'ASC');
        }

        if(select != -1)
        {
            for(var i = 0;i < this.storeData.length;i++)
            {
                if(this.storeData[i].get('index') == select)
                {
                    this.selectRowNum = i;
                    break;
                }
            }
        }
    },
    panelInit : function()
    {
        if(this.selectRowNum == -1)
        {
            this.columnHeaderPanel.panelUpdate();
            this.headCenterPanel.hide();
            this.compCenterPanel.update("");
        }
    },
    cleanPanel : function()
    {
        if(this.compCenterPanel.items.length > 0)
        {
            this.compCenterPanel.removeAll(true);
            this.compCenterPanel.removeCls("compare-ColorPadding-Noborder");
            this.compCenterPanel.addCls("panel-NoborderPadding");
            this.compCenterPanel.body.removeCls("grid-Color-NoborderPadding");
            this.compCenterPanel.body.addCls("panel-ScrollBorder-NoPadding");
        }
        this.headCenterPanel.hide();
        this.compCenterPanel.update({
            region      : 'center',
            layout: {
                type: 'fit'
            },
            autoScroll    : false,
            minWidth    : this.minWinWidth,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-ScrollBorder-NoPadding',
            html        : ""
        });
        this.btnApprove.hide();
        this.btnKeep.hide();
        this.btnDelete.hide();
        this.btnReject.hide();
    },
    panelUpdate    : function (compareFlg)
    {
        var me = this;
        me.sortData();

//      var _html = me.loadData();
        if(me.selectRowNum == -1)
        {
            me.btnBack.hide();
            if(me.compCenterPanel.items.length > 0)
            {
                me.compCenterPanel.removeAll(true);
                me.compCenterPanel.removeCls("compare-ColorPadding-Noborder");
                me.compCenterPanel.addCls("panel-NoborderPadding");
                me.compCenterPanel.body.removeCls("grid-Color-NoborderPadding");
                me.compCenterPanel.body.addCls("panel-ScrollBorder-NoPadding");
            }
            me.headCenterPanel.hide();
            me.headCenterPanel.update("");
            me.compCenterPanel.update({
                region      : 'center',
                layout: {
                    type: 'fit'
                },
                autoScroll      : false,
                minWidth        : me.minWinWidth,
                cls             : 'panel-NoborderPadding',
                bodyCls         : 'panel-ScrollBorder-NoPadding',
                html            : me.loadData()
            });
            me.btnApprove.hide();
            me.btnKeep.hide();
            me.btnDelete.hide();
            me.btnReject.hide();
        }
        else
        {
            me.btnBack.show();
            if(compareFlg)
            {
                me.compCenterPanel.update("");
                me.headCenterPanel.show();
            }

            if(me.resizeFlg == false)
            {
                me.headCenterPanel.update({
                    region          : 'north',
                    layout          : 'fit',
                    width           : '100%',
                    autoScroll      : false,
                    minWidth        : me.minWinWidth,
                    cls             : 'panel-NoborderPadding',
                    bodyCls         : 'panel-ScrollBorder-NoPadding',
                    html            : me.loadData()

                });
            }
            else
            {
                var _w = document.documentElement.scrollWidth - 43;
                if(_w != me.headCenterPanel.getWidth())
                {
                    me.headCenterPanel.setWidth(_w);
                }
            }

            if(compareFlg)
            {
                me.compCenterPanel.removeCls("panel-NoborderPadding");
                me.compCenterPanel.addCls("compare-ColorPadding-Noborder");
                me.compCenterPanel.body.removeCls("panel-ScrollBorder-NoPadding");
                me.compCenterPanel.body.addCls("grid-Color-NoborderPadding");
                if(me.compCenterPanel.items.length == 0)
                {
                    me.compCenterPanel.add(me.comparePanel);
                }

                me.comparePanel.compareInit(me.comparePanel);
            }
        }
    },
    doRefreshEvent : function() {
        this.selectRowNum = -1;
        this.errChangeFlg = true;

        Ext.getBody().mask();
        createMask();
        this.store.load({
                    params: {refresh_flg : "refresh"}});
        panelTabRequestList.setIcon(false);
    },
    /**
     * function viewResize
     * Parameters
     * me         :     Ext.Component
     * adjWidth :     Number
     *                 The box-adjusted width that was set
     * adjHeight:     Number
     *                 The box-adjusted height that was set
     * eOpts     :     Object
     *                 The options object passed to Ext.util.Observable.addListener.
     */
    viewResize : function (me, adjWidth, adjHeight, eOpts)
    {
        this.panelUpdate(true);
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

            if(targetEl.className == "RequestList-Tr" ||
               targetEl.className == "RequestList-Tr-S")
            {
                if(targetEl.firstChild.className == "Td-RequestList-Status")
                {
                    return targetEl;
                }
                else
                {
                    return null;
                }

            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },
    getHeaderCount: function(val)
    {
        var html = [];
        html.push('<div class="divGridHeaderCount">');
        html.push('<span class="spanGridHeader">');
        html.push(val);
        html.push('</span>');
        html.push('</div>');
        return html.join('');
    },
    getHeaderSortIndex: function (el, mainPanel)
    {
        var me = mainPanel;
        var targetEl = el;
        if(targetEl == null)
        {
            return null;
        }

        switch (targetEl.className)
        {
            case RequestListHeaderImg.TypeClass:
                return me.columnIndex.Type;
            case RequestListHeaderImg.PatientTypeClass:
                return me.columnIndex.PatientType;
            case RequestListHeaderImg.NameClass:
                return me.columnIndex.Name;
            case RequestListHeaderImg.VersionClass:
                return me.columnIndex.Version;
            case RequestListHeaderImg.DateClass:
                return me.columnIndex.Date;
            case RequestListHeaderImg.MachineClass:
                return me.columnIndex.Machine;
            case RequestListHeaderImg.ApplicantClass:
                return me.columnIndex.Applicant;
        }
        for(var i = 0;i < 2;i++)
        {
            if(targetEl == null)
            {
                return null;
            }
            switch (targetEl.className)
            {
                case me.columnHeaderPanel.columnData[me.columnIndex.Type].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Type].arrowsCls:
                    return me.columnIndex.Type;

                case me.columnHeaderPanel.columnData[me.columnIndex.PatientType].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.PatientType].arrowsCls:

                    return me.columnIndex.PatientType;

                case me.columnHeaderPanel.columnData[me.columnIndex.Name].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Name].arrowsCls:

                    return me.columnIndex.Name;

                case me.columnHeaderPanel.columnData[me.columnIndex.Version].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Version].arrowsCls:

                    return me.columnIndex.Version;

                case me.columnHeaderPanel.columnData[me.columnIndex.Date].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Date].arrowsCls:

                    return me.columnIndex.Date;

                case me.columnHeaderPanel.columnData[me.columnIndex.Machine].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Machine].arrowsCls:

                    return me.columnIndex.Machine;

                case me.columnHeaderPanel.columnData[me.columnIndex.Applicant].cls:
                case me.columnHeaderPanel.columnData[me.columnIndex.Applicant].arrowsCls:

                    return me.columnIndex.Applicant;

            }

            targetEl = targetEl.parentElement;
        }
        return null;
    },

    clearSelectStatus: function (tbodyEl)
    {
        for(var i = 0;i < tbodyEl.childElementCount;i++)
        {
            if("RequestList-Tr-Select" == tbodyEl.children[i].className)
            {
                if(i % 2 == 0)
                {
                    tbodyEl.children[i].className = 'RequestList-Tr';
                }
                else
                {
                    tbodyEl.children[i].className = 'RequestList-Tr-S';
                }
            }
        }
    },
    checkCompareExist: function()
    {

        var leftfilepath = "";
        var rightversion = this.storeData[this.selectRowNum].get('version');
        var rightstatus = this.storeData[this.selectRowNum].get('status');
        var rightfilepath = this.storeData[this.selectRowNum].get('filepath');

        this.comparePanel.checkCompareResult(
        	false,
            'all',
            leftfilepath,
            rightversion,
            rightstatus,
            rightfilepath,
            '' ,
            true
        );
    },
    showComparePanel: function()
    {
        var me = this;
        me.btnApprove.setDisabled(false);
        me.btnKeep.setDisabled(false);
        me.btnDelete.setDisabled(false);
        me.btnReject.setDisabled(false);
        if(me.showCompare)
        {
            me.clearSelectStatus(me.selectRowEl.parentElement);
            me.selectRowEl.className = "RequestList-Tr-Select";
            me.comparePanel.compareInit(me.comparePanel);
        }
        else
        {
            me.panelUpdate(true);
            if(me.headCenterPanel.body != null)
            {
                var tableEl = me.headCenterPanel.body.dom;
                if(tableEl != null)
                {
                    tableEl.scrollTop = me.selectRowNum * me.cellHeight;
                }
            }
        }

        if(cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer)
        {
            if(me.storeData[me.selectRowNum].get('status') ==
                RequestListStatus.approvalRequested)
            {
                me.btnApprove.show();
                if(me.storeData[me.selectRowNum].get('type') == ProtocolType.ExamPlan &&
                   me.storeData[me.selectRowNum].get('oldepno')=="")
                {
                    me.btnKeep.show();
                }else{
                    me.btnKeep.hide();
                }
                me.btnDelete.hide();
                me.btnReject.show();
            }
            else if(me.storeData[me.selectRowNum].get('status') ==
                    RequestListStatus.deletionRequested)
            {
                me.btnApprove.hide();
                me.btnKeep.hide();
                me.btnDelete.show();
                me.btnReject.show();
            }
        }
    },
    updateHeaderIcon: function(headerSortIndex, mainPanel, sortFlg)
    {
        var me = mainPanel;
        var arrowDown,arrowUp;

        if(headerSortIndex != me.columnIndex.Type)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Type).arrowsValue = RequestListArrows.TypeNone;
        }
        else
        {
            arrowDown = RequestListArrows.TypeDown;
            arrowUp = RequestListArrows.TypeUp;
        }

        if(headerSortIndex != me.columnIndex.PatientType)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.PatientType).arrowsValue = RequestListArrows.PatientTypeNone;
        }
        else
        {
            arrowDown = RequestListArrows.PatientTypeDown;
            arrowUp = RequestListArrows.PatientTypeUp;
        }

        if(headerSortIndex != me.columnIndex.Name)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Name).arrowsValue = RequestListArrows.NameNone;
        }
        else
        {
            arrowDown = RequestListArrows.NameDown;
            arrowUp = RequestListArrows.NameUp;
        }

        if(headerSortIndex != me.columnIndex.Version)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Version).arrowsValue = RequestListArrows.VersionNone;
        }
        else
        {
            arrowDown = RequestListArrows.VersionDown;
            arrowUp = RequestListArrows.VersionUp;
        }

        if(headerSortIndex != me.columnIndex.Date)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Date).arrowsValue = RequestListArrows.DateNone;
        }
        else
        {
            arrowDown = RequestListArrows.DateDown;
            arrowUp = RequestListArrows.DateUp;
        }

        if(headerSortIndex != me.columnIndex.Machine)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Machine).arrowsValue = RequestListArrows.MachineNone;
        }
        else
        {
            arrowDown = RequestListArrows.MachineDown;
            arrowUp = RequestListArrows.MachineUp;
        }

        if(headerSortIndex != me.columnIndex.Applicant)
        {
            me.columnHeaderPanel.getColumnData(me.columnIndex.Applicant).arrowsValue = RequestListArrows.ApplicantNone;
        }
        else
        {
            arrowDown = RequestListArrows.ApplicantDown;
            arrowUp = RequestListArrows.ApplicantUp;
        }

        if(sortFlg != null)
        {
            if(sortFlg == 'up')
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowUp;
            }
            else
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowDown;
            }
        }
        else
        {
            if(me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue != arrowDown)
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowDown;
            }
            else
            {
                me.columnHeaderPanel.getColumnData(headerSortIndex).arrowsValue = arrowUp;
            }
        }

        me.columnHeaderPanel.panelUpdate();
    },
    clearMenuDiv: function()
    {
        var me = this;

        if(me.columnHeaderPanel != null &&
           me.columnHeaderPanel.filterMenu != null)
        {
            me.columnHeaderPanel.filterMenu.ClearDiv();
        }
    },
    onClick: function (e)
    {
        var me = this;

        me.clearMenuDiv();
        me.selectRowEl = me.getTrEl(e.target);
        if(me.selectRowEl != null)
        {
            Ext.getBody().mask();
            me.showCompare = true;
            if(me.selectRowNum == -1)
            {
                me.showCompare = false;
            }
            me.selectRowNum = me.selectRowEl.sectionRowIndex;

            if(!me.showCompare)
            {
                me.comparePanel = Ext.create('PM.view.compare.Base', {
                    store           : null,
                    isHide          : false,
                    cellHeight      : 30,
                    uniqueid        : "requestCompare",
                    filePath        : this.storeData[this.selectRowNum].get('filepath'),
                    parentPanel     : me
                });
            }
            if(me.comparePanel != null &&
               me.comparePanel.checkCompareResult != null)
            {
                me.checkCompareExist();
                me.btnApprove.setDisabled(true);
                me.btnKeep.setDisabled(true);
                me.btnDelete.setDisabled(true);
                me.btnReject.setDisabled(true);
                me.clearSelectStatus(me.selectRowEl.parentElement);
                me.selectRowEl.className = "RequestList-Tr-Select";
            }
        }
    },
    createButton: function()
    {
        var me = this;

        me.btnApprove = Ext.create('Ext.button.Button', {
            height      : 32,
            width       : 138,
            cls         : 'icon-button-Appove',
            overCls     : 'icon-button-Appove-over',
            pressedCls  : 'icon-button-Appove-pressed',
            focusCls    : 'icon-button-Appove-focus',
            disabledCls : 'icon-button-Appove-disable',
            text        : '<span class="SpanTextView" style="padding-left:10px;">' + stringSetting.request.button.approve + '</span>',
            disabled    : false,
            hidden      : true,
            handler     : function()
            {
                me.errActionStatus = stringSetting.error.event.approve;

                var _groupNameAry = me.storeData[me.selectRowNum].get('filepath').split('/Requests/');
                var _groupName = '';
                if(_groupNameAry.length > 1)
                {
                    var _splitAry = _groupNameAry[0].split('/');
                    if(_splitAry.length > 1)
                    {
                        _groupName = _splitAry[_splitAry.length - 1];
                    }
                }

                var confirm = Ext.create('PM.view.confirm.BaseForRequest',{
                    protocolAction        : ProtocolAction.approve,
                    groupName          : _groupName,
                    selectProtocol     : me.storeData[me.selectRowNum],
                    OKLoad               : function (checkedRPIDsJsonStr)
                    {
                        var scanlist = this.getScanList();
                        var reasonValue = this.getReason();
                        var transferReasonValue = this.getTransferReason();
                        var transferReason = '';
                        if(scanlist == null || scanlist.length == 0)
                        {
                            scanlist = new Array();
                        } else {
                            scanlist.sort(function(a, b) {
                                return a.localeCompare(b);
                            });
                            me.errActionStatus = stringSetting.error.event.approvetransfer;
                            var systemComments = stringSetting.comments.text.reason;
                            for (var i = 0, len = scanlist.length; i < len; i++) {
                                systemComments = systemComments + scanlist[i];
                                if (i < len - 1) {
                                    systemComments = systemComments + ', '
                                } else {
                                    systemComments = systemComments + '.'
                                }
                            }
                            transferReason = /*systemComments + '\n' +*/ transferReasonValue;
                            //reasonValue = systemComments + '\n' + reasonValue;
                        }

                        var autoApproval = stringSetting.comments.text.autoApproval;
                        autoApproval = autoApproval.replace('{1}', convertSupFont(me.storeData[me.selectRowNum].get('type')));

                        var autoReason = stringSetting.comments.text.autoApprovalReason;
                        autoReason = autoReason.replace('{1}', convertSupFont(me.storeData[me.selectRowNum].get('type')));

                        Ext.getBody().mask();
                        createMask();

                        me.approveStore.load({
                            params: {
                                event: ProtocolAction.approve,
                                epNumber: me.storeData[me.selectRowNum].get('epno'),
                                protocolName: me.storeData[me.selectRowNum].get('protocolname'),
                                uid: me.storeData[me.selectRowNum].get('uid'),
                                version: me.storeData[me.selectRowNum].get('version'),
                                machineName: me.storeData[me.selectRowNum].get('machinename'),
                                protocolStatus: me.storeData[me.selectRowNum].get('status'),
                                pt: me.storeData[me.selectRowNum].get('type'),
                                organ: me.storeData[me.selectRowNum].get('organ'),
                                patienttype: me.storeData[me.selectRowNum].get('patienttype'),
                                reason: reasonValue,
                                settinggroup: JSON.stringify(scanlist),
                                checkedRPIDsJsonStr: checkedRPIDsJsonStr,
                                auto_approval_reason: autoApproval,
                                auto_reason: autoReason,
                                auto_transfer_reason:systemComments,
                                transfer_reason: transferReason
                            },

                        });

                    }
                   });

                   confirm.showWin();
            }
        });

        me.btnKeep = Ext.create('Ext.button.Button', {
            height: 32,
//          width: 138,
            disabled: true,
            cls: 'icon-button-KeepLocally',
            overCls: 'icon-button-KeepLocally-over',
            pressedCls: 'icon-button-KeepLocally-pressed',
            focusCls: 'icon-button-KeepLocally-focus',
            disabledCls: 'icon-button-KeepLocally-disable',
            text: '<span class="SpanTextView" style="padding-left:15px;">' + stringSetting.request.button.keeplocally + '<span>',
            disabled: false,
            hidden: true,
            handler: function () {
//              me.actionStatus = stringSetting.request.event.keeplocally;

                me.errActionStatus = stringSetting.error.event.approve;
                var confirm = Ext.create('PM.view.confirm.Base', {
                    protocolAction: ProtocolAction.keep,

                    OKLoad: function () {
                        Ext.getBody().mask();
                        createMask();
                        var autoApproval = stringSetting.comments.text.autoApproval;
                        autoApproval = autoApproval.replace('{1}', convertSupFont(me.storeData[me.selectRowNum].get('type')));
                        me.approveStore.load({
                            params: {event: ProtocolAction.keep,
                                epNumber: me.storeData[me.selectRowNum].get('epno'),
                                protocolName: me.storeData[me.selectRowNum].get('protocolname'),
                                uid: me.storeData[me.selectRowNum].get('uid'),
                                version: me.storeData[me.selectRowNum].get('version'),
                                machineName: me.storeData[me.selectRowNum].get('machinename'),
                                protocolStatus: me.storeData[me.selectRowNum].get('status'),
                                pt: me.storeData[me.selectRowNum].get('type'),
                                organ: me.storeData[me.selectRowNum].get('organ'),
                                patienttype: me.storeData[me.selectRowNum].get('patienttype'),
                                auto_approval_reason: autoApproval,
                                reason: this.getReason()}});
                    }
                });

                confirm.showWin();


            }
        });

        me.btnReject = Ext.create('Ext.button.Button', {
            height: 32,
            width: 138,
            disabled: true,
            cls: 'icon-button-Reject',
            overCls: 'icon-button-Reject-over',
            pressedCls: 'icon-button-Reject-pressed',
            focusCls: 'icon-button-Reject-focus',
            disabledCls: 'icon-button-Reject-disable',
            text: '<span class="SpanTextView" style="padding-left:10px;" >' + stringSetting.request.button.reject + '</span>',
            hidden: true,
            disabled: false,
            handler: function () {
//              me.actionStatus = stringSetting.request.event.reject;
                var doEvent = '';
                if (me.storeData[me.selectRowNum].get('status') ==
                    ProtocolStatus.approvalRequested) {
                    doEvent = ProtocolAction.rejectApproval;
                    me.errActionStatus = stringSetting.error.event.approve;
                }
                else if (me.storeData[me.selectRowNum].get('status') ==
                    ProtocolStatus.deletionRequested) {
                    doEvent = ProtocolAction.rejectDeletion;
                    me.errActionStatus = stringSetting.error.event.deleted;
                }

                var autoReject = stringSetting.comments.text.autoReject;
                autoReject = autoReject.replace('{1}', convertSupFont(me.storeData[me.selectRowNum].get('type')));

                var autoReason = stringSetting.comments.text.autoRejectReason;
                autoReason = autoReason.replace('{1}', convertSupFont(me.storeData[me.selectRowNum].get('type')));

                var confirm = Ext.create('PM.view.confirm.Base', {
                    protocolAction: doEvent,

                    OKLoad: function () {
                        Ext.getBody().mask();
                        createMask();
                        me.approveStore.load({
                            params: {event: doEvent,
                                epNumber: me.storeData[me.selectRowNum].get('epno'),
                                protocolName: me.storeData[me.selectRowNum].get('protocolname'),
                                uid: me.storeData[me.selectRowNum].get('uid'),
                                version: me.storeData[me.selectRowNum].get('version'),
                                machineName: me.storeData[me.selectRowNum].get('machinename'),
                                protocolStatus: me.storeData[me.selectRowNum].get('status'),
                                pt: me.storeData[me.selectRowNum].get('type'),
                                organ: me.storeData[me.selectRowNum].get('organ'),
                                patienttype: me.storeData[me.selectRowNum].get('patienttype'),
                                auto_reason: autoReason,
                                auto_approval_reason: autoReject,
                                reason: this.getReason()}});
                    }
                });
                confirm.showWin();
            }
        });

        me.btnDelete = Ext.create('Ext.button.Button', {
            height: 32,
            width: 138,
            disabled:true,
            cls: 'icon-button-Deleted',
            overCls:'icon-button-Deleted-over',
            pressedCls:'icon-button-Deleted-pressed',
            focusCls:'icon-button-Deleted-focus',
            disabledCls:'icon-button-Deleted-disable',
            text:'<span class="SpanTextView" style="padding-left:10px;" >' + stringSetting.request.button.deleted + '</span>',
            hidden:true,
            hidden:true,
            disabled:false,
            handler: function() {
                me.errActionStatus = stringSetting.error.event.deleted;
                var confirm = Ext.create('PM.view.confirm.Base',{
                    protocolAction     : ProtocolAction.deleteProtocl,

                    OKLoad            : function ()
                    {
                        Ext.getBody().mask();
                        createMask();
                        me.approveStore.load({
                            params:{event            : ProtocolAction.deleteProtocl,
                                      epNumber        : me.storeData[me.selectRowNum].get('epno'),
                                      protocolName    : me.storeData[me.selectRowNum].get('protocolname'),
                                      uid                : me.storeData[me.selectRowNum].get('uid'),
                                      version            : me.storeData[me.selectRowNum].get('version'),
                                      machineName        : me.storeData[me.selectRowNum].get('machinename'),
                                      protocolStatus    : me.storeData[me.selectRowNum].get('status'),
                                      pt                : me.storeData[me.selectRowNum].get('type'),
                                      organ            : me.storeData[me.selectRowNum].get('organ'),
                                      patienttype        : me.storeData[me.selectRowNum].get('patienttype'),
                                      reason            : this.getReason()}});
                    }
                   });
                   confirm.showWin();
            }
        });

        var btnP = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'button-Color-NoborderPadding',
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
                margins:'0 8 0 0'
            },
            items:[me.btnApprove,
                   me.btnKeep,
                   me.btnDelete,
                   me.btnReject]
        });

        return btnP;
    },

    getFilterList: function(index)
    {
        var me = this;
        if (columnInfoForRequestListFilter.length > 0) {
            deepClone(me.columnHeaderPanel.columnData, columnInfoForRequestListFilter);
        }
        return me.columnHeaderPanel.columnData[index].filter.list;
        //return this.columnData[index].filter.list;
    },
});
