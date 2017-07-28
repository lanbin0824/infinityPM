/*!
 * JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.history.ResDelConfirm
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.history.ResDelConfirm', {
    extend: 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    cls:'x-Confirm-window',
    bodyCls:'x-Confirm-window-body',
    minWidth      : 300,
    minHeight     : 300,
    width         : 625,
    height        : 320,
    
    url              : null,
    headerText1      : null, 
    headerText2      : null, 
    title          : null,
    option        : null,
    filePath       : null,
    modifytime    : "",
    isTransferred : null,
    machineName      : null,
    
    btnOkConfirm             : null,
    panelConfirmHander       : null,
    panelConfirmCenter      : null,

    initComponent: function() {
        var me = this;
        
        me.btnOkConfirm = Ext.create('Ext.Button', {
            height: 32,
            width:118,
            cls : 'icon-button',
            overCls : 'icon-button-over',
            pressedCls : 'icon-button-pressed',
            focusCls : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text : '<span class="SpanTextView">' + stringSetting.history.button.ok + '<span>',
            disabled : true,
            handler : function() {
                var restore = new Ext.data.Store(
                {
                    proxy: new Ext.data.proxy.Ajax({
                        type    : 'ajax',
                        url        : me.url,
                        reader    :
                        {
                            type: 'json',
                            totalProperty:'total',                 
                            root: 'result'
                        },
                        getMethod : function() {
                            return 'POST';
                        }
                    }),
                    model: 'PM.model.Restore'
                }); 
                restore.load({
                    params: {
                            filePath : me.filePath,
                            machinename: me.machineName,
                            istransferred    : me.isTransferred,
                            modifytime      : me.modifytime,
                            reason : document.getElementById("restore_textReason").value
                    },
                    callback: function(records, operation, success) 
                    {
                        Ext.getBody().unmask();
                        clearMask();
                        var errActionStatus = {};
                        if (me.option == 'restore') {
                            errActionStatus = stringSetting.error.event.restore;
                        } else {
                            errActionStatus = stringSetting.error.event.deleted;
                        }
                                                
                        var restoreFlag = records[0].data.restoreflag;
                        if (!restoreFlag) {
                            if (!me.parentPanel.historyShow) {
                                me.parentPanel.selectRowNum = -1;
                            }
                            else if(records[0].data.restoreresult == "ERR0045")
                            {
                                var errormessage = Ext.clone(stringSetting.error.ERR0045);

                                var _message = Ext.create('PM.view.common.window.Message', {
                                    errorDetailList: [errormessage],
                                    errorNameList: []
                                });

                                _message.showWin();
                                return;
                            }
                             if (records[0].data.title == 2) {
                                 var _msg = records[0].data.restoreresult;
                                 var _details = errActionStatus.details;
                                 if(_msg == "ERR10001")
                                 {
                                     _details = [errActionStatus.details];
                                 }
                                 else if(_msg == "ERR10002")
                                 {
                                     _details = [errActionStatus.details, errActionStatus.details];
                                 }

                                var _message = Ext.create('PM.view.common.window.Message',{
                                        errorDetail : stringSetting.error[_msg],
                                        errorParameter : {
                                            "overview"     :  errActionStatus.overview,
                                            "details"     :  _details
                                        }
                                    });
                                _message.showWin(); 
                             }
                             if (records[0].data.title == 3) {
                                 
                                var _message = Ext.create('PM.view.common.window.Message',{
                                    errorDetail : stringSetting.error.ERR20001,
                                    errorParameter : {
                                        "overview"     :  errActionStatus.overview,
                                        "details"     :  errActionStatus.details
                                    }
                                });
                                   _message.showWin();
                            }
                        }
                        me.parentPanelShow();

                    },
                    scope: this
                });
                me.closeWin();
                Ext.getBody().mask();
                createMask();
            }
        
        });
        
        me.btnCancelConfirm = Ext.create('Ext.Button', {
            height: 32,
            width:118,
            cls : 'icon-button',
            overCls : 'icon-button-over',
            pressedCls : 'icon-button-pressed',
            focusCls : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text : '<span class="SpanTextView">' + stringSetting.history.button.cancel + '<span>',
            disabled : false,
            handler : function() {
                me.closeWin();
            }
        });
        
        var panelConfirmButton = Ext.create('Ext.panel.Panel', {         
            region      : 'south',
            height      : 60,
            minHeight   : 60,
            maxHeight   : 60,
            layout      : 'fit',
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'button-Color-NoborderPadding',
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
           items:[me.btnOkConfirm, me.btnCancelConfirm]
        });
        
        me.panelConfirmHander = Ext.create('Ext.form.Panel', {
            region: 'north',
            width: 500,
            height:90,
            bodyStyle: 'font-size:13pt;',
            bodyCls : 'panel-comfirm-center-body',
            layout:{
                type:'border'
            },
            items: [{
                xtype: 'label',
                region: 'north',  
                forId: 'myFieldId',
                height: 48,
                text: me.headerText1,
                margin: '0 0 0 5'
            },{
                region: 'center',
                xtype: 'label',
                height: 24,
                forId: 'myFieldId',
                text: me.headerText2,
                margin: '5 0 0 5'
            }]
        });
        
        me.reasonHeaderPanel = Ext.create('Ext.form.Panel', {
            width: 500,
            bodyStyle: 'font-size:13pt;',
            bodyCls : 'panel-comfirm-center-body',
            region: 'north',
            items: [{
                xtype: 'label',
                forId: 'myFieldId',
                text: stringSetting.history.message.comfirm_commants + '(255):'
            },{
                xtype: 'label',
                forId: 'myFieldId',
                text: stringSetting.history.message.comfirm_commants_null,
                margin: '0 0 0 10',
                style: 'color: orange;',
                hidden: false
            }]
        });
           
        me.textareaPanel = Ext.create('Ext.form.FormPanel', {
            width       : 600,
            region      : 'center',
            bodyCls     : 'panel-comfirm-center-body',
            html        : '<textarea class = "Comfirm-input-request" id="restore_textReason"></textarea>'
        });
        
        me.panelConfirmCenter = Ext.create('Ext.panel.Panel',
        { 
            region  : 'center',
            baseCls : 'x-plain',
            bodyCls    : 'panel-comfirm-center',           
            defaults : {
                frame : false
            },
            layout: {
                type: 'border'
            },
            items : [me.reasonHeaderPanel,me.textareaPanel]
        });
            
        Ext.applyIf(me, {
            items:[
                me.panelConfirmHander,
                me.panelConfirmCenter,
                panelConfirmButton               
            ]
        });
        me.callParent(arguments);    
    },
    showWin : function() {
        this.callParent(arguments);
        this.bindFunction();
        var task = new Ext.util.DelayedTask(function(){
            var obj = document.getElementById("restore_textReason");
            obj.focus();
        });
        task.delay(500);
    },
    onKeyUpComfirm : function() {
        var me = this;
        var textReasonEl = document.getElementById("restore_textReason");
        if(textReasonEl == null)
        {
            return;
        }
        var resonLength = textReasonEl.value.length;
        var resonValue = textReasonEl.value.replace(/\n/g,'');
        if(resonValue.trim() == ""){
            me.reasonHeaderPanel.items.getAt(1).show();
            me.btnOkConfirm.disable();
            me.reasonHeaderPanel.items.getAt(0).setText(stringSetting.history.message.comfirm_commants + '('+(255-resonLength)+'):');
            return;
        }
        if (resonLength > 0) {
            if (resonLength > 255) {
                textReasonEl.value = textReasonEl.value.substring(0, 255);                        
                me.reasonHeaderPanel.items.getAt(0).setText(stringSetting.history.message.comfirm_commants + '(0):');
            } else {
                me.reasonHeaderPanel.items.getAt(0).setText(stringSetting.history.message.comfirm_commants + '('+(255-resonLength)+'):');

            }
            me.reasonHeaderPanel.items.getAt(1).hide();
            me.btnOkConfirm.enable();
        }
    },
    bindFunction : function() {
        var me = this;
        var obj = document.getElementById("restore_textReason");
        obj.onkeyup = function() {
            me.onKeyUpComfirm();
        };
        
        obj.onblur = function() {
            me.onKeyUpComfirm();
        };
        
    },
    parentPanelShow : function()
    {
        return;
    }
});
