/*!
 * JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.confirm.Base
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.confirm.Base', {
    extend: 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    cls        : 'x-Confirm-window',
    bodyCls    : 'x-Confirm-window-body',
    minWidth   : 300,
    minHeight  : 320,
    width      : 629,
    height     : 300,
    title      : '',

    btnOkConfirm: null,
    btnLeft: null,
    btnRight: null,
    panelConfirmHeader: null,
    panelConfirmCenter: null,
    transferPanel: null,
    transfercommentspanel: null,
    panelWestFont: null,
    panelEastFont: null,
    btnRadlex: null,
    radlexView          : null,
    
    protocolAction     : null,
    isPlace            : null,
    reasonValue        : "",
    errActionStatus    : null,
    transferStore      : null,
    getSelectedRpidData: null,
    
    //transfer
    isTransfer         : false,
    //Radlex
    isRadlex           : false,

    /* PUBLIC ATTRIBUTE BEGIN */
    isFromTransfer     : false,
    selectProtocol     : null,
    groupName          : '',
    protocolPathList   : null,
    protocolTypeList   : null,
    protocolList       : null,
    /* PUBLIC ATTRIBUTE END */

    initComponent: function() {
        var me = this;

        me.title = stringSetting.comments.title_confirm;

        me.btnOkConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.comments.button.ok + '<span>',
            disabled: false,
            handler: function() {
                var reasonEl = document.getElementsByClassName("Comfirm-input-request")[0];
                me.reasonValue = reasonEl.value;
                var resRpidData = "";
                if (!me.isFromTransfer && me.radlexView) {
                    resRpidData = me.radlexView.getSelectedRpidData();
                }
                me.closeWin();
                if (me.isFromTransfer) {
                    Ext.getBody().mask();
                    createMask();

                    var scanlist = me.getScanList();
                    if (scanlist == null) {
                        scanlist = "";
                    } else {
                        scanlist.sort(function(a, b) {
                            return a.localeCompare(b);
                        });
                    }
                    var protocolpath = me.protocolPathList;
                    if (protocolpath == null) {
                        protocolpath = "";
                    }
                    var protocoltype = me.protocolTypeList;
                    if (protocoltype == null) {
                        protocoltype = "";
                    }
                    var protocolNameList = new Array();
                    for (var i = 0; i < me.protocolList.length; i++) {
                        protocolNameList.push(me.protocolList[i].get('protocolname'));
                    }
                    var systemComments = stringSetting.comments.text.reason;
                    for (var i = 0, len = scanlist.length; i < len; i++) {
                        systemComments = systemComments + scanlist[i];
                        if (i < len - 1) {
                            systemComments = systemComments + ', '
                        } else {
                            systemComments = systemComments + '.'
                        }
                    }
                    me.reasonValue = /*systemComments + '\n' +*/ me.reasonValue;
                    me.transferStore.load({
                        params: {
                            protocolList: protocolpath.join(';'),
                            settingGroup: JSON.stringify(scanlist),
                            auto_transfer_reason:systemComments,
                            reason: me.reasonValue,
                            type: protocoltype.join(';'),
                            protocolName: protocolNameList.join(';'),
                        }
                    });
                } else {
                    me.OKLoad(resRpidData);
                }
                
            }
        });

        var btnCancelConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.comments.button.cancel + '<span>',
            disabled: false,
            handler: function() {
                me.closeWin();
            }
        });

        var panelConfirmButton = Ext.create('Ext.panel.Panel', {
            region: 'south',
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            layout: 'fit',
            cls: 'panel-NoborderPadding',
            bodyCls: 'button-Color-NoborderPadding',
            layout: {
                type: 'hbox',
                padding: '0 0 0 0',
                align: 'middle',
                pack: 'end'
            },
            defaults: {
                padding: '0 0 0 0',
                margins: '0 8 0 0'
            },
            items: [me.btnOkConfirm, 
                    btnCancelConfirm]
        });

        me.uploadStyle();

        me.setInformation();
        
        if (me.isFromTransfer) {
            me.btnOkConfirm.disable();
            me.protocolAction = null;
            me.errActionStatus = stringSetting.error.event.transfer;
            me.transferStore = new Ext.data.Store({
                proxy: new Ext.data.proxy.Ajax({
                    type: 'ajax',
                    url: PROCESS_PATH_GLOBAL_ACTION + 'transferprotocols.action',
                    getMethod: function() {
                        return 'GET';
                    },
                    reader: {
                        type: 'json',
                        root: 'result',
                    }
                }),
                model: 'PM.model.TransferError'
            });
            me.transferStore.on("load", function() {
                Ext.getBody().unmask();
                clearMask();
                var errList = [];
                var errNameList = [];
                var len = me.transferStore.getCount();

                if (len > 0) {
                    for (var i = 0; i < len; i++) {

                        var errormessage = Ext.clone(stringSetting.error[me.transferStore.getAt(i).get("errmessage")]);
                        if (me.transferStore.getAt(i).get("errmessage") == 'ERR80002' || me.transferStore.getAt(i).get("errmessage") == 'ERR80003') {
                            errormessage.overview = errormessage.overview.format(me.errActionStatus.overview);
                            errormessage.details = errormessage.details.format(me.errActionStatus.details);
                        } else if (me.transferStore.getAt(i).get("errmessage") == 'ERR0045') {
                            errormessage = Ext.clone(stringSetting.error.ERR0045);
                            errList.push(errormessage);
                            break;
                        } else {
                            errormessage.details = errormessage.details.format(me.transferStore.getAt(i).get("name"), me.transferStore.getAt(i).get("model"));
                        }
                        errList.push(errormessage);
                    }
                    var _message = Ext.create('PM.view.common.window.Message', {
                        errorDetailList: errList,
                        errorNameList: errNameList
                    });
                    _message.showWin();
                }
                me.OKLoad();
            });
        }


        me.panelConfirmCenter = Ext.create('Ext.panel.Panel', {
            region: 'center',
            cls: 'panel-comfirm-center',
            bodyCls: 'panel-comfirm-center-body',

            html: me.createComfirmTable()
        });

        if (memoryProtocolRpids && 
            me.protocolAction == "APPROVE" &&
            me.selectProtocol != null && 
            me.selectProtocol.get('type') == "ExamPlan") {

            me.radlexView = Ext.create("PM.view.request.Radlex", {
                region          : 'center',
                hidden          : true,
                organ           : me.selectProtocol.get("organ"),
                protocolConfirm : me.selectProtocol,
                protocolAction  : me.protocolAction
            });
        }

        me.transferPanel = Ext.create('PM.view.confirm.Transfer', {
            region: 'center',
            hidden: true,
            width : 630,
            height: 176,
            groupName: me.groupName,
            checkchange: function() {
                if (me.isFromTransfer) {
                    if (me.getScanList().length > 0) {
                        var reasonEl = document.getElementsByClassName("Comfirm-input-request")[0];
                        me.btnOkConfirm.enable();
                    } else {
                        me.btnOkConfirm.disable();
                    }
                }
            }
        });

        me.panelCenter = Ext.create('Ext.panel.Panel', {
            region: 'center',
            cls: 'panel-comfirm-center',
            bodyCls: 'panel-comfirm-center-body',
            style: 'padding:0px;',
            bodyStyle: 'padding:0px;',
            layout: 'vbox',
            items: [
                me.radlexView,
                me.transferPanel,
                me.panelConfirmCenter

            ]
        });

        var height = 0;
        if ((memoryProtocolRpids && 
             me.selectProtocol != null && 
             me.selectProtocol.get('type') == "ExamPlan") || 
            (memoryProtocolShare && 
             (me.protocolAction == ProtocolAction.approve || 
              me.protocolAction == null))) {
            height = 30;
            me.height = me.height + 30;

        }
        me.btnLeft = Ext.create('Ext.Button', {
            height: 28,
            width: 32,
            cls: 'icon-button-Transfer_Left',
            overCls: 'icon-button-Transfer_Left-over',
            pressedCls: 'icon-button-Transfer_Left-pressed',
            focusCls: 'icon-button-Transfer_Left-focus',
            disabledCls: 'icon-button-Transfer_Left-disable',
            text: '<span class="SpanTextView"></span>',
            disabled: false,
            hidden: true,
            handler: function() {
                if (me.isRadlex) {
                    me.toRadlex();
                }
                if (me.isTransfer) {

                    me.changePage();
                }
            }
        });

        if (memoryProtocolShare &&
             (me.protocolAction == ProtocolAction.approve || 
              me.protocolAction == null)) {
            me.height = 496;
            me.transferPanel.show();
            // if(memoryLanguage == "JP")
            // {
            //     me.btnRight = Ext.create('Ext.Button', {
            //         height: 32,
            //         width: 155,
            //         cls: 'icon-button-Radlex',
            //         overCls: 'icon-button-Radlex-over',
            //         pressedCls: 'icon-button-Radlex-pressed',
            //         focusCls: 'icon-button-Radlex-over',
            //         disabledCls: 'icon-button-Radlex-disable',
            //         text: '<span class="SpanTextView">' + stringSetting.comments.label.transferlable + '</span>',
            //         disabled: false,
            //         hidden: true,
            //         handler: function() {
            //             me.changePage();
            //         }
            //     });
            // }
            // else
            // {
            //     me.btnRight = Ext.create('Ext.Button', {
            //         height: 32,
            //         width: 260,
            //         cls: 'icon-button-hidenochange',
            //         overCls: 'icon-button-hidenochange-over',
            //         pressedCls: 'icon-button-hidenochange-pressed',
            //         focusCls: 'icon-button-hidenochange-over',
            //         disabledCls: 'icon-button-hidenochange-disable',
            //         text: '<span class="SpanTextView">' + stringSetting.comments.label.transferlable + '</span>',
            //         disabled: false,
            //         hidden: true,
            //         handler: function() {
            //             me.changePage();
            //         }
            //     });
            // }
        }

        if (memoryProtocolRpids && 
            me.selectProtocol != null && 
            me.selectProtocol.get('type') == "ExamPlan") {
            me.btnRadlex = Ext.create('Ext.Button', {
                cls: 'icon-button-Radlex',
                overCls: 'icon-button-Radlex-over',
                pressedCls: 'icon-button-Radlex-pressed',
                focusCls: 'icon-button-Radlex-over',
                disabledCls: 'icon-button-Radlex-disable',
                style: 'margin-right:5px',
                height: 32,
                width: 155,
                text: '<span class="SpanTextView">' + stringSetting.comments.label.radlex + '<span>',
                handler: function() {
                    me.toRadlex();
                }
            });
        }

        me.panelWestFont = Ext.create('Ext.panel.Panel', {
            xtype: 'panel',
            region: "center",
            hidden: true,
            bodyCls: 'confirm-comments',
            html: stringSetting.comments.label.comments
        });

        me.panelEastFont = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            region      : 'south',
            height      : 40,
            minHeight   : 40,
            maxHeight   : 40,
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
            items:[me.btnRadlex,
                   me.btnRight]
        });   
        
        var panelWest = Ext.create('Ext.panel.Panel', {
            cls: 'panel-comfirm-center',
            bodyCls: 'panel-comfirm-center-body confirm-comments-left-blank',
            region: 'center',
            width: 400,
            layout: 'border',
            items: [{
                    xtype: 'panel',
                    region: "west",
                    bodyCls: 'confirm-comments-background',
                    width: 32,
                    items: [me.btnLeft]
                },
                me.panelWestFont
            ]
        });

        me.transfercommentspanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'confirm-comments-transfer',
            layout: 'border',
            region: 'center',
            items: [
                panelWest,
                me.panelEastFont
            ],
        });

        Ext.applyIf(me, {
            items: [{
                    xtype: 'panel',
                    layout: 'border',
                    region: 'center',
                    bodyCls: 'confirm-comments-noBorder',
                    items: [{
                        xtype: 'panel',
                        region: "center",
                        layout: 'border',
                        bodyCls: 'confirm-comments-left-panel',
                        items: [
                            me.panelConfirmHeader,
                            me.panelCenter
                        ]

                    }
                    // , {
                    //     xtype: 'panel',
                    //     region: "south",
                    //     height: height + 10,
                    //     bodyCls: 'confirm-comments-right-panel',
                    //     layout: 'border',
                    //     items: [me.transfercommentspanel]
                    // }
                    ]
                },
                panelConfirmButton
            ]
        });
        me.callParent(arguments);
    },

    changePage: function() {
        var me = this;
        me.isTransfer = !me.isTransfer;

        if (me.isTransfer) {
            me.panelConfirmHeader.setHeight(0);
            me.panelWestFont.show();
            me.btnLeft.show();
            me.transferPanel.show();
            me.panelEastFont.hide();
            me.btnRight.hide();
            me.panelConfirmCenter.hide();


        } else {
            me.panelConfirmHeader.setHeight(100);
            me.panelConfirmCenter.show();
            me.transferPanel.hide();
            me.panelWestFont.hide();
            me.btnLeft.hide();
            me.panelEastFont.show();
            me.btnRight.show();

        }
        me.setTitle(me.title);
    },

    toRadlex: function() {
        var me = this;
        me.isRadlex = !me.isRadlex;
        if (me.isRadlex) {
            me.panelConfirmHeader.setHeight(0);

            me.btnLeft.show();
            me.panelEastFont.hide();

            me.panelWestFont.show();
            if (me.btnRight != null) {
                me.btnRight.hide();
            }
            me.panelConfirmCenter.hide();
            me.radlexView.show();

        } else {
            me.panelConfirmHeader.setHeight(100);

            me.btnLeft.hide();
            me.panelEastFont.show();
            me.panelWestFont.hide();
            if (me.btnRight != null) {
                me.btnRight.show();
            }
            me.panelConfirmCenter.show();
            me.radlexView.hide();

        }
        me.setTitle(me.title);
    },

    getTransferComments: function() {
        var table = '<table width="100%">';
        table += '<tr>';

        if (this.isTransfer) {
            table += '<td class="confirm-comments-transfer-table-td">';
            table += '<div class="confirm-comments-transfer-arrows">_</div>';
            table += '<div class="confirm-comments-transfer-label">';
            table += stringSetting.comments.label.comments;
            table += '</div> ';
        } else {
            table += '<td class="confirm-comments-no-transfer-table-td">';
            table += '<div class="confirm-comments-no-transfer-label">'; 
            table += stringSetting.comments.label.transferlable; 
            table += '</div>';
            table += '<div class="confirm-comments-no-transfer-arrows">`</div>';
        }

        table += '</td>';
        table += '</tr>';
        table += '<table>';
        return table;
    },
    getScanList: function() {
        if (this.transferPanel != null) {
            return this.transferPanel.scanlist;
        } else {
            return "";
        }
    },
    uploadStyle: function() 
    {
        if (this.protocolAction == ProtocolAction.approve ||
            this.protocolAction == ProtocolAction.deleteProtocl)
        {
        } else {
            this.btnOkConfirm.disable();
        }
        if (this.protocolAction == ProtocolAction.keep ||
            this.protocolAction == ProtocolAction.rejectApproval ||
            this.protocolAction == ProtocolAction.rejectDeletion)
        {
            this.isPlace = 'display:inline;';
        } else {
            this.isPlace = 'display:none;';
        }
    },
    getReason: function() 
    {
        return this.reasonValue;
    },
    addReasonEvent: function() {
        var thisWin = this;
        var reason = document.getElementsByClassName("Comfirm-input-request")[0];
        reason.onblur = function(e) {
            var reasonSpan = document.getElementById("spanReason");
            var warningSpan = document.getElementById("spanWarning");
            var reasonVal = this.value;
            var resonLength = this.value.length;
            if (resonLength > 0) 
            {
                warningSpan.style.display = "none";
                if (resonLength > 255) 
                {
                    this.value = this.value.substring(0, 255);
                    reasonSpan.innerHTML = stringSetting.comments.label.comments + " (0):";
                    return;
                } 
                else
                {
                    reasonSpan.innerHTML = stringSetting.comments.label.comments + 
                                   " (" + (255 - resonLength) + "):";
                }
            } else 
            {
                reasonSpan.innerHTML = stringSetting.comments.label.comments + " (255):";
            }

            if (reasonVal == null || reasonVal.replace(/[\r\n]/g, "").trim() == '') 
            {
                if (thisWin.protocolAction == ProtocolAction.keep ||
                    thisWin.protocolAction == ProtocolAction.rejectApproval ||
                    thisWin.protocolAction == ProtocolAction.rejectDeletion)
                {
                    //thisWin.btnOkConfirm.disable();
                    warningSpan.style.display = "inline";
                }
            } else {
                if (thisWin.isFromTransfer) 
                {
                    if (thisWin.getScanList().length > 0) 
                    {
                        thisWin.btnOkConfirm.enable();
                    } 
                    else
                    {
                        thisWin.btnOkConfirm.disable();
                    }
                } 
                else
                {
                    thisWin.btnOkConfirm.enable();
                }
            }

        };
        reason.onkeyup = reason.onblur;

    },
    createComfirmTable: function() 
    {
        var table = '';
        table += '<table class="ComfirmTable">';
        table += '<tr>';
        table += '<td class="Comfirm-Reason-Label">';
        table += '<span id="spanReason" class="spanComfirm">' + stringSetting.comments.label.comments + ' (255):</span>';
        table += '<span class="comfirmIsPalce" style= "' + this.isPlace + ';" id="spanWarning">' + stringSetting.comments.label.reminder + '</span>';
        table += '</td>';
        table += '</tr>';
        table += '<tr>';
        table += '<td colspan="2">';
        table += '<textarea class = "Comfirm-input-request" autofocus></textarea>';
        table += '</td>';
        table += '</tr>';
        table += '</table>';
        return table;
    },
    setInformation: function()
    {
        var me = this;
        
        var titleData1 = '';
        var titleData2 = '';
        if (me.isFromTransfer) 
        {
            titleData1 = stringSetting.comments.text.transfer;
            titleData2 = stringSetting.comments.text.asker;
        }
        else if (me.protocolAction == ProtocolAction.approve) 
        {
            titleData1 = stringSetting.comments.text.approve;
            titleData2 = stringSetting.comments.text.asker;
        } 
        else if (me.protocolAction == ProtocolAction.deleteProtocl)
        {
            titleData1 = stringSetting.comments.text.deleteProtocl;
            titleData2 = stringSetting.comments.text.asker;
        } 
        else if (me.protocolAction == ProtocolAction.rejectApproval)
        {
            titleData1 = stringSetting.comments.text.rejectApproval;
            titleData2 = stringSetting.comments.text.asker;
        } 
        else if (me.protocolAction == ProtocolAction.rejectDeletion)
        {
            titleData1 = stringSetting.comments.text.rejectDeletion;
            titleData2 = stringSetting.comments.text.asker;
        } 
        else if (me.protocolAction == ProtocolAction.keep)
        {
            titleData1 = stringSetting.comments.text.keep;
            titleData2 = stringSetting.comments.text.asker;
        }
        
        me.panelConfirmHeader = Ext.create('Ext.panel.Panel',
        {
            region  : 'north',
            baseCls : 'x-plain',
            bodyCls : 'panel-comfirm-header-body',
            height  :  100,
            defaults : {
                frame : false
            },
            layout      : 'column',
            items : [ {
                cls         : 'panel-NoborderPadding',  
                bodyCls     : 'panel-comfirm-info-header',
                height      : 100,
                columnWidth:1,
                html : 
                       '<table>' +
                          '<tr>' +
                            '<td class="comfirm-header">' + titleData1 + '</td>' +
                          '</tr>' +
                          '<tr>' +
                            '<td class="comfirm-header">' + titleData2 + '</td>' +
                          '</tr>' +
                      '</table>'
            }]
        });
    },
    OKLoad: function() 
    {
        return;
    },
    showWin: function() 
    {
        this.callParent(arguments);
        this.addReasonEvent();
        var task = new Ext.util.DelayedTask(function(){
            var reason = document.getElementsByClassName("Comfirm-input-request")[0];
            reason.focus();
        });
        task.delay(500);
    }
});