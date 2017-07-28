/*
 * ! JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.ConfirmView
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.master.ConfirmView', {
    extend               : 'PM.view.common.window.ModalDialog',
    layout               : {
        type    : 'border'
    },
    mainPanel            : null,
    cls                  : 'x-Confirm-window',
    frame                : false,
    width                : 555,
    height               : 230,
    modal                : true,
    btnOKConfirm         : null,
    btnCancelConfirm     : null,
    panelConfirmCenter   : null,
    panelConfirmButton   : null,
    labelText1           : null,
    labelText2           : null,
    initComponent : function() {
        var me = this;
        me.title = stringSetting.comments.title_confirm;
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height        : 32,
            width         : 118,
            cls           : 'icon-button',
            overCls       : 'icon-button-over',
            pressedCls    : 'icon-button-pressed',
            focusCls      : 'icon-button-focus',
            disabledCls   : 'icon-button-disable',

            text          : '<span class="SpanTextView">'+stringSetting.app_setting.button.ok+'<span>',
            disabled      : false,
            handler       : function() {
            	var resultstore = new Ext.data.Store({
                    proxy    : new Ext.data.proxy.Ajax({
                                url        : PROCESS_PATH_GLOBAL_ACTION + 'changeMasterListEPNumber.action',
                                reader     : {
                                    type            : 'json',
                                    totalProperty   : 'total'
                                },
                                getMethod   : function() {
                                    return 'POST';
                                }
                            }),
                    model: 'PM.model.MasterEvent'
                    });
                resultstore.on("load",function()
                {
                    if(resultstore.getAt(0).get("result") != '0')
                    {

                        if(resultstore.getAt(0).get("errormessage") === 'ERR0045'){
                            var _message = Ext.create('PM.view.common.window.Message', {
                                errorDetail: stringSetting.error.ERR0045,
                            });
                            _message.showWin();
                            me.showModal = true;
                        }else {
                            var _message = Ext.create('PM.view.common.window.Message', {
                                errorDetail: stringSetting.error.ERR0019,
                            });
                            _message.showWin();
                            me.showModal = true;
                        }
                    }
                    me.close();
                    me.okEvent();

            });
            var eplist = "";
            if(me.mainPanel.cacheContentPanel[MasterProcessStatus.Setting] != null)
            {
                eplist = me.formatJson(me.mainPanel.cacheContentPanel[MasterProcessStatus.Setting].addNewEPnumArray);
            }

            resultstore.load({
                params        : {
                    scanner_group      : me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                    ep_number_list     : JSON.stringify(eplist)
                }});
            }
        });
        me.btnCancelConfirm = Ext.create('Ext.Button', {
                height        : 32,
                width         : 118,
                cls           : 'icon-button',
                overCls       : 'icon-button-over',
                pressedCls    : 'icon-button-pressed',
                focusCls      : 'icon-button-focus',
                disabledCls   : 'icon-button-disable',
                text          : '<span class="SpanTextView">'+stringSetting.app_setting.button.cancel+'<span>',
                disabled      : false,
                handler       : function() {
                    me.cancelEvent();
                    me.close();
                }
            });

        me.panelConfirmButton = Ext.create('Ext.panel.Panel', {
                region        : 'south',
                height        : 60,
                minHeight     : 60,
                maxHeight     : 60,
                layout        : 'fit',
                cls           : 'panel-NoborderPadding',
                bodyCls       : 'button-Color-NoborderPadding',
                layout        : {
                       type      : 'hbox',
                       padding   : '0 0 0 0',
                       align     : 'middle',
                       pack      : 'end'
                },
                defaults    : {
                       padding    : '0 0 0 0',
                       margins    : '0 8 0 0'
                },
                items        : [{
                        id        : 'validation_panel_id',
                        html      : '<div id="validationid"><div>',
                        width     : 200,
                        height    : 20,
                        bodyStyle : 'background-color:#D1DFF5;border:0;float:rigth;'
                        }, me.btnOKConfirm, me.btnCancelConfirm]
            });
        me.panelConfirmCenter = Ext.create('Ext.panel.Panel', {
            width          : 800,
            region         : 'center',
            baseCls        : 'x-plain',
            bodyCls        : 'panel-comfirm-center',
            bodyPadding    : 12,
            border         : 1,
            defaults       : {
                   frame     : false
            },
            layout         : 'border',
            items          : [{
                    xtype     : 'label',
                    region    : 'north',
                    cls       : 'setting-text',
                    text      : me.labelText1,
                    margin    : '10 10 10 10'
                          }, {
                    region    : 'center',
                    xtype     : 'label',
                    cls       : 'setting-text',
                    text      : me.labelText2,
                    margin    : '10 10 10 10'
            }]
        });

        Ext.applyIf(this, {
                items    : [me.panelConfirmCenter, me.panelConfirmButton]
            });
        this.callParent(arguments);
    },
    cancelEvent    : function(){
        return;
    },
    okEvent        : function(){
        return;
    },
    formatJson : function(eplist){
    	var me = this;
        var result = [];

        for(var i = 0;i < eplist.length;i++)
        {
            result.push({
                key : eplist[i].key,
                epno : eplist[i].epno,
                patienttype : eplist[i].changePatientType,
                organ : eplist[i].changeOrgan,
            });

        }
        return result;
    },
    addQuo : function(str){
    	return '"' + str +'"';
    }
});
