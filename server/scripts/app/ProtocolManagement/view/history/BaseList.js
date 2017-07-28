/*!
 * JS Console Compare
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.history.BaseList
 * @extends Ext.panel.Panel
 * @import Constitution.css
 */

Ext.define('PM.view.history.BaseList', {
    extend: 'PM.view.panel.OnMouse',
    layout: {
        type: 'border'
    },
    cls: 'panelTabView',
    bodyCls: 'grid-Color-NoborderPadding',
    width: '100%',
    selectRowNum: -1,
    sortDate: false,
    sortName: null,
    compareShow: false,
    headerPanel: null,
    centerPanel: null,
    compCenterPanel: null,
    comparePanel: null,
    topHeight: 242,
    headCenterPanel: null,
    btnHideHistory: null,
    hideHistoryFlag: false,
    store: null,
    storeData:[],
    styleTip: styleGridTipGlobal,
    headerPanelHeight: 47,
    columnHeaderPanel: null,
    columnData: null,
    marker: null,
    rowEl: null,
    scrollFlag: false,
    curWidth: null,
    filePath: null,
    //centerHeaderScroolFlg: true,
    curHeight: null,
    isBindBothCompareFromTransfer: true,
    initComponent: function() {
        var me = this;
        this.marker = document.getElementById('marker');
        me.btnHideHistory = Ext.create('Ext.button.Button', {
            height: 32,
            width: 105,
            hidden: true,
            name: 'hidehistoryitem',
            style: 'float:right;margin-right:3px;',
            cls: 'icon-button-HideListButton',
            overCls: 'icon-button-HideListButton-over',
            pressedCls: 'icon-button-HideListButton-pressed',
            focusCls: 'icon-button-HideListButton-focus',
            disabledCls: 'icon-button-HideListButton-disable',
            text: '<span class="SpanTextView">' + stringSetting.history.button.hide + '</span>',
            disabled: false,
            listeners: {
                "click": function() {
                    me.hideHistoryItem();
                }
            }
        });

        // create the PM.model.ConstitutionHistoryList store
        var store = new Ext.data.Store({
            proxy: new Ext.data.proxy.Ajax({
                getMethod: function() {
                    return 'GET';
                },
                type: 'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getConstitutionHistoryList.action',
                reader: {
                    type: 'json',
                    root: '',
                    totalProperty: 'total'
                }
            }),
            model: 'PM.model.BaseModel'
        });

        store.on("load", function() {
            if(store.getAt(0).data.errmessage){
                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetail: stringSetting.error[store.getAt(0).data.errmessage],
                    closeWin: function () {
                        this.close();
                    }
                });
                _message.showWin();
                return;
            }
            me.store = Ext.create('Ext.data.Store', {
                model: 'PM.model.ConstitutionHistoryList',
                data : store.getAt(0).data.result
            });
            me.pushData();
            me.setHeaderTitle();
            me.viewResize();
        });

        if (me.isBindBothCompareFromTransfer) {
            me.comparePanel = Ext.create('PM.view.compare.Base', {
                store: null,
                isHide: false,
                cellHeight: 30,
                uniqueid: "constitutionCompare",
                filePath: this.filePath,
                parentPanel: this
            });
        } else {
            me.comparePanel = Ext.create('PM.view.compare.Base', {
                store: null,
                isHide: false,
                cellHeight: 30,
                uniqueid: "constitutionCompare",
                filePath: this.filePath,
                parentPanel: this,
                isBindBothCompareFromTransfer: false
            });
        }


        me.setColumnData();

        me.headerPanel = Ext.create('Ext.panel.Panel', {
            cls: 'padding-Top-Left-Right',
            bodyCls: 'panel-NoborderPadding',
            bodyStyle: 'background:#EDF0F7',
            minWidth: 830,
            region: 'north',
            layout: {
                type: 'border'
            },
            height: 75,
            items: [{
                    height: 35,
                    region: 'north',
                    cls: 'panel-NoborderPadding',
                    bodyCls: 'panelHeader-body',
                    html: '<div id="id_div_historylist_count" ' +
                        'class="divGridHeaderCount">' +
                        '<span class="spanGridHeader">' + stringSetting.history.title_protocolhistory + '</span>' +
                        '</div>',
                    items: [me.btnHideHistory]
                },
                this.columnHeaderPanel
            ]
        });

        me.compCenterPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: {
                type: 'fit'
            },
            cls: 'panel-NoborderPadding',
            bodyCls: 'grid-Color-NoborderPadding',
            items: [{
                cls: 'panel-NoborderPadding',
                bodyCls: 'grid-Color-NoborderPadding',
                html: ''
            }]
        });
        me.headCenterPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            height: 0,
            layout: {
                type: 'fit'
            },
            cls: 'panel-NoborderPadding',
            bodyCls: 'grid-Color-NoborderPadding',
            style: "padding-bottom:12px;background:transparent;",
            items: [{
                cls: 'panel-NoborderPadding',
                bodyCls: 'grid-Color-NoborderPadding',
                html: ''
            }]
        });

        me.centerPanel = Ext.create('Ext.panel.Panel', {
            cls: 'panel-NoborderPadding-transparent',
            bodyCls: 'panel-NoborderPadding-transparent',
            region: 'center',
            layout: {
                type: 'border'
            },
            autoScroll: false,
            items: [
                me.headCenterPanel,
                me.compCenterPanel
            ]
        });

        Ext.applyIf(me, {
            items: [
                me.headerPanel,
                me.centerPanel
            ]
        });

        me.callParent(arguments);

        store.load({
            params: {
                filepath: cacheLocalStorage.get('filepath')
            }
        });
    },
    /**
     * function set Header Title
     */
    setHeaderTitle: function() {
        var div_history = document.getElementById("id_div_historylist_count");
        if (!div_history) {
            return;
        }
        div_history.innerHTML =
            '<span class="spanGridHeader">' + stringSetting.history.title_protocolhistory + ' (' + this.storeData.length +
            ')</span>';
    },
    /**
     * function load html Data
     */
    loadData: function(selectNum) {
        var _array = new Array();
        var _style = "";
        var imgPath = "";
        var tips = "";
        var img = "";
        var me = this;
        _array.push('<table class = "conHistory-Table" id="protocolHistoryTable">');


        if (this.storeData.length == 0) {
            _array.push('<tr class = "conHistory-Tr">');
            _array.push('<td class = "Td-conHistory-Status" cls="7">');
            _array.push('Not history information');
            _array.push('</td>');
            _array.push('</tr>');
        } else {
            var beforeDeleteStatus = "";
            for (var i = 0; i < this.storeData.length; i++) {
                var linedata = this.storeData[i];
                if (selectNum == i) {
                    _style = "conHistory-Tr-Select";
                } else {
                    if (i % 2 == 0) {
                        _style = "conHistory-Tr";
                    } else {
                        _style = "conHistory-Tr-S";
                    }
                }

                var actionStatus = linedata.get('action_event');
                var actionEvent = "";
                var tips = "";
                var img = "";
                if (i % 2 == 0) {
                    actionEvent = this.getCellContent(actionStatus);
                    if (actionStatus != "Approve" || actionStatus != "Keep Locally" || actionStatus != "Reject") {
                        actionEvent += "(" + stringSetting.history.action_event.Request + ")";
                    }

                    img = this.getStatusImgPath(actionStatus);
                    tips = this.getImgsTips(actionStatus);
                } else {
                    var forwardEvent = this.storeData[i - 1].get("action_event");
                    actionEvent = this.getCellContent(actionStatus);

                    if (forwardEvent == "Delete" && actionStatus == "Reject") {
                        actionEvent += " -> " + this.getRejectStatus(i);
                        img = this.getStatusImgPath("Reject -> Delete");
                        tips = this.getImgsTips("Reject -> Delete");
                    } else if (forwardEvent != "Delete" && actionStatus == "Reject" && beforeDeleteStatus != "") {
                        actionEvent += " -> " + beforeDeleteStatus;
                        img = this.getStatusImgPath(actionStatus);
                        tips = this.getImgsTips(actionStatus);
                    } else {

                        img = this.getStatusImgPath(actionStatus);
                        tips = this.getImgsTips(actionStatus);
                    }

                    if (actionStatus == "Restore" && beforeDeleteStatus != "") {
                        actionEvent += " -> " + beforeDeleteStatus;
                    }
//                  else if (actionStatus == "Transfer") {
//                      actionEvent += " -> " + this.getCellContent("Approve");
//                  }

                    var beforeStatus = this.storeData[i].get("action_event");
                    if (beforeStatus != null && beforeStatus != "Delete" && beforeStatus != "Restore" && beforeStatus != "Transfer" && beforeStatus != "Reject") {
                        beforeDeleteStatus = this.getCellContent(beforeStatus);
                    }
                }

                // request
                // img column
                _array.push('<tr class = "' + _style + '">');
                _array.push('<td class = "Td-conHistory-Manage" width="' + this.columnData[0].width + '" ');
                _array.push(' data-qtip = "' + tips + ' " ');
                _array.push('>');


                if (i < this.storeData.length) {
                    _array.push('<div style="position: relative; height: 23px;margin-top:1px;margin-left:1px;">');
                    _array.push('<img src=' + img + '  height="22">');
                    _array.push('</div>');
                }

                _array.push('</td>');

                // event
                _array.push('<td ');


                if (getStringRealWidth(this.styleTip, actionEvent) > this.columnData[1].width - 13) {
                    _array.push('data-qtip = "' + actionEvent + '" ');
                }
                _array.push(' class = "Td-conHistory-Version" width="' + this.columnData[1].width + '">');
                _array.push('<span unselectable="on" class ="spanGridValue">');
                _array.push(actionEvent);
                _array.push('</span>');
                _array.push('</td>');

                //user
                _array.push('<td ');
                var _user = linedata.get("updatedUserName_event");

                //var arrayUser = _user.split("\\n");
                if (getStringRealWidth(this.styleTip, _user) > this.columnData[2].width - 13) {
                    _array.push('data-qtip = "' + _user + '" ');
                }

                _array.push('class = "Td-conHistory-Applicant" width="' + this.columnData[2].width + '">');
                _array.push('<span unselectable="on" class ="spanGridValue">');
                _array.push(_user);
                _array.push('</span>');
                _array.push('</td>');

                // Date
                _array.push("<td ");
                var _updatedDateTime = DateFormatByExt(new Date(linedata.get("updatedDateTime_event")), "Y M d H:i");
                if (getStringRealWidth(this.styleTip, _updatedDateTime) > this.columnData[3].width - 13) {
                    _array.push('data-qtip = "' + _updatedDateTime + '" ');
                }
                _array.push('class = "Td-conHistory-Time" width="' + this.columnData[3].width + '">');
                _array.push('<span unselectable="on" class ="spanGridValue">');
                _array.push(_updatedDateTime);
                _array.push('</span>');
                _array.push('</td>');

                // remark_event
                _array.push(this.getRemarks(linedata.get("remark_event"), selectNum));

                _array.push('</tr>');

            }
        }
        _array.push('</table>');
        return _array.join('');
    },

    getDisplayAction: function() {

    },

    getRejectStatus: function(index) {
        var rejectStatus = "";
        for(var i = index - 2;i > 0;i = i - 2)
        {
            var status = this.storeData[i].get('action_event');
            if (status == "Approve" || status == "Create" || status == "Edit" || status == "Keep Locally" ||
                status == "Delete" || status == "Restore" || status == "Transfer" || status == "CutAndPaste" ) {
                rejectStatus = status;
                break;
            }
        }
        return this.getCellContent(rejectStatus);
    },

    getCellContent: function(status) {
        var cellContent = "";
        switch (status) {
            case "Create":
                cellContent = stringSetting.history.cell_content.event_create;
                break;
            case "Edit":
                cellContent = stringSetting.history.cell_content.event_edit;
                break;
            case "CutAndPaste":
                cellContent = stringSetting.history.cell_content.event_cutandpaste;
                break;
            case "Approve":
                cellContent = stringSetting.history.cell_content.event_approve;
                break;
            case "Keep Locally":
                cellContent = stringSetting.history.cell_content.event_keep_locally;
                break;
            case "Reject":
                cellContent = stringSetting.history.cell_content.event_reject;
                break;
            case "Delete":
                cellContent = stringSetting.history.cell_content.event_delete;
                break;
            case "Restore":
                cellContent = stringSetting.history.cell_content.event_restore;
                break;
            case "Transfer":
                cellContent = stringSetting.history.cell_content.event_transfer;
                break;
            default:
                break;
        }
        return cellContent;
    },
    getImgsTips: function(imgPath) {
        var tips = "";
        if (imgPath == "Approve") {
            tips = "<strong>" + stringSetting.status_tip.ApprovalAccepted + "</strong>" + "<br>" + stringSetting.status_tip.ApprovalAcceptedValue;
        } else if (imgPath == "Edit" || imgPath == "Create" || imgPath == "CutAndPaste") {
            tips = "<strong>" + stringSetting.status_tip.ApprovalRequested + "</strong>" + "<br>" + stringSetting.status_tip.ApprovalRequestedValue;
        } else if (imgPath == "Reject") {
            tips = "<strong>" + stringSetting.status_tip.ApprovalRejected + "</strong>" + "<br>" + stringSetting.status_tip.ApprovalRejectedValue;
        } else if (imgPath == "Keep Locally") {
            tips = "<strong>" + stringSetting.status_tip.LocalUseAccepted + "</strong>" + "<br>" + stringSetting.status_tip.LocalUseAcceptedValue;
        } else if (imgPath == "Delete") {
            tips = "<strong>" + stringSetting.status_tip.DeletionAccepted + "</strong>" + "<br>" + stringSetting.status_tip.DeletionAcceptedValue;
        } else if (imgPath == "Transfer") {
            tips = "<strong>" + stringSetting.status_tip.Transferred + "</strong>" + "<br>" + stringSetting.status_tip.TransferredValue;
        } else if (imgPath == "Restore") {
            tips = "<strong>" + stringSetting.status_tip.Restored + "</strong>" + "<br>" + stringSetting.status_tip.RestoredValue;
        } else if (imgPath == "Reject -> Delete") {
            tips = "<strong>" + stringSetting.status_tip.DeletionRejected + "</strong>" + "<br>" + stringSetting.status_tip.DeletionRejectedValue;
        }
        return tips;
    },

    getStatusImgPath: function(status) {
        var imgPath = "";
        if (status == "Approve") {
            imgPath = ProtocolStatusSrc.approvalAccepted;
        } else if (status == "Edit" || status == "Create"||status == "CutAndPaste") {
            imgPath = ProtocolStatusSrc.approvalRequested;
        } else if (status == "Reject") {
            imgPath = ProtocolStatusSrc.approvalRejected;
        } else if (status == "Keep Locally") {
            imgPath = ProtocolStatusSrc.localUseAccepted;
        } else if (status == "Delete") {
            imgPath = ProtocolStatusSrc.deletionAccepted;
        } else if (status == "Restore") {
            imgPath = ProtocolStatusSrc.restoreDeleted;
        } else if (status == "Transfer") {
            imgPath = ProtocolStatusSrc.transfer;
        } else if (status == "Reject -> Delete") {
            imgPath = ProtocolStatusSrc.deletionRejected;
        }
        return imgPath;
    },

    getDisplayStatus: function(action) {
        var status = "";
        if (action == "Approve" || action == "Reject -> Approve" ||
            action == "Restore -> Approve" || action == "Transfer") {

            status = "APPROVAL_ACCEPTED";
        } else if (action == "Keep Locally" || action == "Restore -> Keep Locally" ||
            action == "Reject -> Keep Locally") {
            status = "LOCAL_USE_ACCEPTED";
        } else if (action == "Reject") {
            status = "APPROVAL_REJECTED";
        } else if (action == "Delete") {
            status = "DELETION_ACCEPTED";
        }

        return status;
    },

    pushData: function() {

        this.storeData = new Array();
        var storeLength = this.store.getCount();

        for (var i = 0; i < storeLength; i++) {
            var record = this.store.getAt(i);

            var _uid = record.get("uid");
            var _epno = record.get("epno");
            var _version = record.get("version");
            var _machinename = record.get("machinename");
            var _protocolname = Ext.util.Format.htmlEncode(record.get("protocolname"));
            var _status = record.get("status");
            var _strType = record.get("type");
            var _lastupddt = record.get("lastupddt");
            var _applicant = record.get("applicant");
            var _event = record.get('event');
            var _remark = record.get('remark');
            var _patienttype = record.get('patienttype');
            var _organ = record.get('organ');
            //request
            var _action_request = record.get('action_request');
            var _remark_request = record.get('remark_request');
            var _updatedDateTime_request = record.get('updatedDateTime_request');
            var _updatedUserName_request = record.get('updatedUserName_request');

            //response
            var _eventid_response = record.get('eventid_response');
            var _action_response = record.get('action_response');
            var _remark_response = record.get('remark_response');
            var _system_remark = record.get('system_remark');
            if(_system_remark === '<System Comment>') {
                _remark_response = stringSetting.comments.text.systemComment + ' ' + _remark_response;
            }
            var _updatedDateTime_response = record.get('updatedDateTime_response');
            var _updatedUserName_response = record.get('updatedUserName_response');

            //displayData
            var _displayAction = "";
            var _displayStatus = "";
            var _displayUpdatedDateTime = record.get('updatedDateTime_response');
            var _displayComment = _remark_response;
            if (i > 0 && _action_response == "Reject" || _action_response == "Restore") {
                for (var j = i - 1; j > -1; j--) {
                    if (this.store.getAt(j).get('action_response') == "Approve" || this.store.getAt(j).get('action_response') == "Keep Locally") {
                        _displayAction = _action_response + " -> " + this.store.getAt(j).get('action_response');
                        break;
                    }
                }
                _displayStatus = this.getDisplayStatus(_displayAction);
            } else {
                _displayStatus = this.getDisplayStatus(_action_response);
            }


            this.storeData[i * 2] = new PM.model.ConstitutionHistoryList({
                'uid': _uid,
                'epno': _epno,
                'version': _version,
                'machinename': _machinename,
                'protocolname': _protocolname,
                'status': _status,
                'type': _strType,
                'lastupddt': _lastupddt,
                'applicant': _applicant,
                'event': _event,
                'remark': _remark,
                'organ': _organ,
                'patienttype': _patienttype,

                'action_event': _action_request,
                'remark_event': _remark_request,
                'updatedDateTime_event': _updatedDateTime_request,
                'updatedUserName_event': _updatedUserName_request,

                'displayStatus': _displayStatus,
                'displayUpdatedDateTime': _displayUpdatedDateTime,
                'displayComment': _displayComment,

                'index': i * 2
            });
            this.storeData[i * 2 + 1] = new PM.model.ConstitutionHistoryList({
                'uid': _uid,
                'epno': _epno,
                'version': _version,
                'machinename': _machinename,
                'protocolname': _protocolname,
                'status': _status,
                'type': _strType,
                'lastupddt': _lastupddt,
                'applicant': _applicant,
                'event': _event,
                'remark': _remark,
                'organ': _organ,
                'patienttype': _patienttype,

                'eventid_response': _eventid_response,
                'action_event': _action_response,
                'remark_event': _remark_response,
                'updatedDateTime_event': _updatedDateTime_response,
                'updatedUserName_event': _updatedUserName_response,

                'displayStatus': _displayStatus,
                'displayUpdatedDateTime': _displayUpdatedDateTime,
                'displayComment': _displayComment,

                'index': i * 2 + 1
            });

        }
    },

    panelUpdate: function(headerChangeFlg, status) {
        if (this.body == null) {
            return;
        }
        this.getDomSize();
        this.columnHeaderPanel.panelTop = this.topHeight;
        var _html = this.loadData(this.selectRowNum);

        if (headerChangeFlg != null && headerChangeFlg == true) {

            this.scrollShow(this.selectRowNum);
        }

        if (this.selectRowNum == -1) {
            this.compCenterPanel.remove(0);
            this.compCenterPanel.add({
                region: 'center',
                overflowY: 'auto',
                bodyStyle: 'border-top: 0; overflow-y: auto;',
                html: _html
            });
        } else {
            var overflow = 'false';
            if (this.storeData.length > 4) {
                overflow = 'auto';
            }
            this.headCenterPanel.remove(0);
            this.headCenterPanel.add({
                layout: {
                    type: 'fit'
                },
                overflowY: 'auto',
                cls: 'panel-NoborderPadding',
                bodyCls: 'history-panel-ScrollBorder-NoPadding',
                bodyStyle: 'border-top:0;overflow-y:' + overflow + ';',
                html: _html
            });

            if (!this.hideHistoryFlag) {
                this.headerPanelHeight = this.headerPanel.getSize().height;
            }

            if (this.compareShow) {
                this.headCenterHeightChange(status);
                this.comparePanel.refrush();
            } else {
                this.compCenterPanel.remove(0);
                this.compCenterPanel.add({
                    region: 'center',
                    autoScroll: false,
                    cls: 'compare-ColorPadding-Noborder',
                    bodyCls: 'grid-Color-NoborderPadding',
                    layout: 'fit',
                    items: [this.comparePanel]
                });
				this.comparePanel.compareInit(this.comparePanel);
            }
        }
        this.hideBtnStatus();
        this.addSpaceLine();
    },
    viewResize: function() {
        var status = "resize";
        this.panelUpdate(true, status);
    },

    scrollShow: function(selectNum) {
        if (this.compCenterPanel.getSize() == null) {
            return;
        }
        var listcompHeight = this.compCenterPanel.getSize().height;
        var listRealHeight = this.storeData.length * 30;
        this.getDomSize();
        if (selectNum == -1) {
            if (listRealHeight <= listcompHeight) {
                this.columnHeaderPanel.removeScroll(null);
                //this.centerHeaderScroolFlg = false;
            } else {
                this.columnHeaderPanel.addScroll(null);
            }
        } else {
            var centerPanelHeight = this.headCenterPanel.getSize().height;
            if (listRealHeight >= centerPanelHeight) {
                this.columnHeaderPanel.addScroll(null);
            } else {
                this.columnHeaderPanel.removeScroll(null);
            }
        }
    },
    getTrEl: function(el) {
        var targetEl = el;

        for (var i = 0; i < 5; i++) {
            if (targetEl == null) {
                return null;
            }

            if (targetEl.className == "conHistory-Tr-S") {
                return targetEl;
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },
    clearSelectStatus: function(tbodyEl) {
        for (var i = 0; i < tbodyEl.childElementCount; i++) {
            if ("conHistory-Tr-Select" == tbodyEl.children[i].className) {
                if (i % 2 == 0) {
                    tbodyEl.children[i].className = 'conHistory-Tr';
                } else {
                    tbodyEl.children[i].className = 'conHistory-Tr-S';
                }
            }
        }
    },

    showComparePanel: function(el) {

        if (this.storeData.length > 3 && !this.compareShow) {
            this.headCenterPanel.setHeight(121 + 12);

        } else {
            if (!this.compareShow) {
                this.headCenterPanel.setHeight(this.storeData.length * 30 + 13);
            }
        }
        if (typeof(el) != "undefined")
            this.selectRowNum = el.sectionRowIndex;

        if (this.compareShow) {
            if (typeof(el) != "undefined") {

                this.clearSelectStatus(el.parentElement);
                el.className = "conHistory-Tr-Select";
            }
            this.headCenterHeightChange();
//          CompareInit(this.comparePanel);
            this.comparePanel.compareInit(this.comparePanel);
        } else {

            this.panelUpdate(true);
            this.headCenterHeightChange();
            this.compareShow = true;
        }
        Ext.getBody().unmask();

    },

    showCompareData: function(el) {
        if (this.storeData.length != 0) {
            var selectIndex = el.sectionRowIndex;
            var rightuid = this.storeData[selectIndex].get('uid');
            var rightversion = this.storeData[selectIndex].get('version');
            var rightepno = this.storeData[selectIndex].get('epno');
            var rightepname = this.storeData[selectIndex].get('protocolname');
            var rightprotocoltype = this.storeData[selectIndex].get('type');
            var rightstatus = this.storeData[selectIndex].get('status');
            var rightorgan = this.storeData[selectIndex].get('organ');
            var rightpatienttype = this.storeData[selectIndex].get('patienttype');
            var rightfilepath = this.filePath;
            
            var rightdisplayStatus = this.storeData[selectIndex].get('displayStatus');
            var rightdisplayUpdatedDateTime = this.storeData[selectIndex].get('displayUpdatedDateTime');
            var rightdisplayComment = this.storeData[selectIndex].get('displayComment');
            var rightEventUid = this.storeData[selectIndex].get('eventid_response');
            var requestRemark = this.storeData[selectIndex].get('remark_event');

            this.comparePanel.setDisplayParams(    rightdisplayStatus,
                                                rightdisplayUpdatedDateTime,
                                                rightdisplayComment,
                                                rightversion, rightuid,
                                                requestRemark,
                                                rightEventUid);
            //            CompareInit(this.comparePanel);            
            this.comparePanel.checkCompareResult(true,'all',null,rightversion,rightstatus,rightfilepath,"", true, el);
        }
    },

    doRefreshEvent: function() {
        this.parentPanel.doRefreshEvent();
    },

    onClick: function(e) {

        var el = this.getTrEl(e.target);
        this.rowEl = el;
        if (el != null) {

            if (this.comparePanel != null && this.comparePanel.checkCompareResult != null) {
                Ext.getBody().mask();
                this.showCompareData(el);
                this.comparePanel.isExpand = false;

                return;

            }
        }

        var headerDateEl = this.getHeaderDateEl(e.target);
        if (headerDateEl != null) {
            if (this.sortDate == null ||
                !this.sortDate) {
                var trEl = headerDateEl.parentElement.parentElement;
                var ImgElList = trEl.getElementsByClassName("Img-Constitution-History-Name");
                if (ImgElList != null && ImgElList.length > 0) {
                    ImgElList[0].src = ConstitutionHistoryArrows.none;
                }

                this.sortName = null;
                this.sortDate = true;
                headerDateEl.src = ConstitutionHistoryArrows.srcDown;
            } else {
                this.sortName = null;
                this.sortDate = false;
                headerDateEl.src = ConstitutionHistoryArrows.srcUp;
            }
            this.panelUpdate();

        }
        StopPropagation(e);
        return false;
    },
    getHeaderDateEl: function(el) {
        var targetEl = el;
        if (targetEl == null) {
            return null;
        }

        if (targetEl.className == "Img-Constitution-History-Date") {
            return targetEl;
        }
        for (var i = 0; i < 2; i++) {
            if (targetEl == null) {
                return null;
            }
            if (targetEl.className == "Td-History-Column-Time") {
                var trEl = targetEl.parentElement;
                var ImgElList = trEl.getElementsByClassName("Img-Constitution-History-Date");
                if (ImgElList != null && ImgElList.length > 0) {
                    return ImgElList[0];
                }
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },

    hideHistoryItem: function() {
        var status = "show";
        if (!this.hideHistoryFlag) {
            this.btnHideHistory.setText('<span class="SpanTextView">' + stringSetting.history.button.show + '</span>');
            this.headerPanel.setHeight(59);
            this.headerPanel.items.getAt(1).hide();
            this.headCenterPanel.hide();
        } else {
            this.compCenterPanel.show();
            this.btnHideHistory.setText('<span class="SpanTextView">' + stringSetting.history.button.hide + '</span>');
            this.headerPanel.setHeight(this.headerPanelHeight);
            this.headerPanel.items.getAt(1).show();
            this.headCenterPanel.show();
            this.headCenterHeightChange(status);
            this.scrollShow();
        }
        this.comparePanel.fillCompareBlankLine(this.comparePanel.isExistTarget, this.comparePanel.uniqueid);
        this.hideHistoryFlag = !this.hideHistoryFlag;
        this.parentPanel.hideHistoryFlag = !this.parentPanel.hideHistoryFlag;
    },
    hideBtnStatus: function() {
        if (this.selectRowNum == -1) {
            this.btnHideHistory.setVisible(false);
        } else {
            this.btnHideHistory.setVisible(true);
        }
    },
    getRemarks: function(remarks, selectNum) {
        var realNoRemakWidth = 0;

        for (var index = 0; index < this.columnData.length - 1; index++) {
            realNoRemakWidth += this.columnData[index].width;
        }

        var remarkWidth = this.curWidth - realNoRemakWidth - 26 - 47;
        if (remarkWidth < this.columnData[4].minWidth) {
            remarkWidth = this.columnData[4].minWidth;
        }

        var td_remarks = document.createElement("td");
        td_remarks.setAttribute("class", "Td-conHistory-Remark");

        var arrayremarks = remarks.split("\\n");
        if (arrayremarks[arrayremarks.length - 1] == "") {
            arrayremarks.splice(arrayremarks.length - 1, 1);
        }
        var tipFlag = false;
        var tipStr = "";
        for (var rm in arrayremarks) {
            if (selectNum == -1) {
                var oNewP = document.createElement("p");
                oNewP.setAttribute('style', 'padding-top:3px;padding-left:7px;padding-right:5px;' +
                    'font-size: 13pt;color: #1E3246;text-overflow: ellipsis;overflow: hidden; margin:0px;height:28px;');
                var oText = document.createElement('span');
                oText.innerHTML = arrayremarks[rm];
                oNewP.appendChild(oText);
                td_remarks.appendChild(oNewP);
                if (getStringRealWidth(this.styleTip, arrayremarks[rm]) > remarkWidth) {
                    tipFlag = true;
                }
            } else {
                var oNewP = document.createElement("span");
                oNewP.setAttribute('style', 'padding-top:3px;padding-left:7px;padding-right:5px;' +
                    'font-size: 13pt;color: #1E3246;text-overflow: ellipsis;overflow: hidden;');
                if (arrayremarks.length > 1 && rm == 0) {
                    var oText = document.createElement('span');
                    oText.innerHTML = arrayremarks[rm] + '...';
                    oNewP.appendChild(oText);
                    td_remarks.appendChild(oNewP);
                    tipFlag = true;
                } else if (arrayremarks.length == 1) {
                    var text = arrayremarks[rm];
                    if (getStringRealWidth(this.styleTip, arrayremarks[rm]) > remarkWidth) {
                        text += '...';
                        tipFlag = true;
                    }
                    var oText = document.createElement('span');
                    oText.innerHTML = text;
                    oNewP.appendChild(oText);
                    td_remarks.appendChild(oNewP);
                }
            }
            if (rm != arrayremarks.length - 1) {
                tipStr += arrayremarks[rm] + '<br/>';
            } else {
                tipStr += arrayremarks[rm];
            }
        }

        if (tipFlag) {
            td_remarks.setAttribute("data-qtip", tipStr);
        }

        return td_remarks.outerHTML;
    },
    addSpaceLine: function() {

        if (this.selectRowNum == -1) {
            var listHeight = this.compCenterPanel.getSize().height;
            var tableObj = document.getElementById('protocolHistoryTable');
            var listRealHeight = tableObj.offsetHeight;
            if (listRealHeight < listHeight) {
                this.compCenterPanel.items.getAt(0).setAutoScroll(false);
                var addDataCount = Math.floor((listHeight - listRealHeight) / 30);
                for (var i = this.storeData.length; i < (addDataCount + 1 + this.storeData.length); i++) {
                    if (i % 2 == 0) {
                        _style = "conHistory-Tr-space";
                    } else {
                        _style = "conHistory-Tr-space-S";
                    }
                    var tr = document.createElement("tr");
                    tr.setAttribute('class', _style);
                    tr.setAttribute('style', 'height:30px;');

                    var manage = document.createElement("td");
                    manage.setAttribute('class', 'Td-conHistory-Manage');
                    manage.setAttribute('style', 'cursor:default;');
                    tr.appendChild(manage);

                    var version = document.createElement("td");
                    version.setAttribute('class', 'Td-conHistory-Version');
                    version.setAttribute('style', 'cursor:default;');
                    tr.appendChild(version);

                    var machine = document.createElement("td");
                    machine.setAttribute('class', 'Td-conHistory-Machine');
                    machine.setAttribute('style', 'cursor:default;');
                    tr.appendChild(machine);

                    var time = document.createElement("td");
                    time.setAttribute('class', 'Td-conHistory-Time');
                    time.setAttribute('style', 'cursor: default');
                    tr.appendChild(time);

                    var Remark = document.createElement("td");
                    Remark.setAttribute('class', 'Td-conHistory-Remark');
                    Remark.setAttribute('style', 'cursor:default;');
                    tr.appendChild(Remark);
                    tableObj.getElementsByTagName('tbody')[0].appendChild(tr);
                }

            } else {
                this.scrollFlag = true;
            }

        }
    },
    setColumnData: function() {
        var me = this;
        me.columnData = new Array();

        //null column
        me.columnData[0] = {
            cls: 'Td-HistoryHeader-Column-Manage',
            value: "",
            sort: false,
            width: 37,
            minWidth: 37
        };

        // Event
        me.columnData[1] = {
            cls: 'Td-HistoryHeader-Column-Version',
            value: stringSetting.history.column.event,
            sort: false,
            width: 210,
            minWidth: 90
        };

        // User
        me.columnData[2] = {
            cls: 'Td-HistoryHeader-Column-Applicant',
            value: stringSetting.history.column.user,
            sort: false,
            width: 120,
            minWidth: 90
        };

        // Time
        me.columnData[3] = {
            cls: 'Td-HistoryHeader-Column-Time',
            value: stringSetting.history.column.date,
            //          sort: true,
            //          arrowsCls: 'Td-History-Column-Time-Sort',
            //          arrowsValue: ConstitutionHistoryArrows.date,
            width: 200,
            minWidth: 157
        };

        // Comment
        me.columnData[4] = {
            cls: 'Td-HistoryHeader-Column-Remark',
            value: stringSetting.history.column.comment,
            sort: false,
            minWidth: 250
        };

        me.columnHeaderPanel = Ext.create('PM.view.header.ResizeView', {
            region: 'center',
            cls: getChromeScrollCss(),
            bodyCls: "columnHeader-body-Chrome",
            tableCls: 'conHistory-Table',
            columnData: me.columnData,
            parentPanel: me,
            panelTop: me.topHeight,
            pageType: 'HistoryList',
            dataUpdate          : function()
            {
                me.panelUpdate(false);
            }
        });
    },

    headCenterHeightChange: function(status) {
        if (this.headCenterPanel.body != null) {
            var tableEl = this.headCenterPanel.body.dom.firstChild.firstChild;
            var number = this.selectRowNum;
            if (tableEl != null) {

                if (this.storeData.length > 3) {

                    if (!this.compareShow || status == "show" || status == "resize") {
                        tableEl.scrollTop = (number - 3) * 30;
                    }
                }
            }
        }
    },
    getDomSize: function() {
        this.curWidth = document.documentElement.clientWidth;
        this.curHeight = document.documentElement.clientHeight;
        if (this.curHeight <= 552 + 218) {
            this.curHeight = 552 + 218;
        }
        if (this.curWidth <= 1600) {
            this.curWidth = 1600;
        }
    }
});