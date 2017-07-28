/*
 * ! JS Console ConfirmView 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights 
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.Setting.WarningConfirmView
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.Setting.WarningConfirmView', {
    extend: 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    cls: 'x-Confirm-window',
    okURL: null,
    store: null,
    modal: true,
    storeData: new Array(),
    protocolPoolName: null,
    btnOKConfirm: null,
    btnCancelConfirm: null,
    panelConfirmCenter: null,
    panelConfirmSouth: null,
    panelConfirmButton: null,
    deleteid: null,
    warningText1: null,
    warningText2: null,
    option: null,
    initComponent: function () {
        var me = this;
        me.title = stringSetting.comments.title_confirm;
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',

            text: '<span class="SpanTextView">' + stringSetting.app_setting.button.ok + '<span>',
            disabled: false,
            handler: function () {
                me.mask();
                createMask();
                me.btnOKConfirm.setDisabled(false);
                me.btnCancelConfirm.setDisabled(false);
                var resultstore = new Ext.data.Store({
                    proxy: new Ext.data.proxy.Ajax({
                        url: me.okURL,
                        timeout: 300000,
                        reader: {
                            type: 'json',
                            totalProperty: 'total',
                            root: 'result'
                        },
                        getMethod: function () {
                            return 'GET';
                        }
                    }),
                    model: 'PM.model.AppSetting'
                });
                resultstore.load({
                    params: {
                        deleteid: me.deleteid
                    },
                    callback: function (records, operation, success) {


                        var resultJson = eval("(" + operation.response.responseText + ")");
                        var result = resultJson["result"];
                        var isSucceed = resultJson["result"][0]['flag'];
                        var errCode = resultJson["result"][0]['errcode'];

                        if (!isSucceed) {
                            var _message = Ext.create('PM.view.common.window.Message', {
                                errorDetail: stringSetting.error[errCode],
                            });
                            _message.OKLoad = function () {
                                me.parentPanel.panelUpdate();
                            }
                            _message.showWin();
                        } else {
                            me.parentPanel.initParam();
                        }
                        me.unmask();
                        clearMask();
                        me.close();
                    },
                    scope: me
                });
            }
        });

        me.btnCancelConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.app_setting.button.cancel + '<span>',
            disabled: false,
            handler: function () {
                me.close();
            }
        });

        me.panelConfirmButton = Ext.create('Ext.panel.Panel', {
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
            items: [
                {
                    id: 'validation_panel_id',
                    html: '<div id="validationid"><div>',
                    width: 200,
                    height: 20,
                    bodyStyle: 'background-color:#D1DFF5;border:0;float:rigth;'
                },
                me.btnOKConfirm,
                me.btnCancelConfirm
            ]
        });
        me.panelConfirmCenter = Ext.create('Ext.panel.Panel', {
            width: 800,
            region: 'center',
            baseCls: 'x-plain',
            bodyCls: 'panel-comfirm-center',
            bodyPadding: 12,
            border: 1,
            defaults: {
                frame: false
            },
            layout: 'border',
            html: ''
        });

        Ext.applyIf(this, {
            items: [me.panelConfirmCenter, me.panelConfirmButton]
        });
        this.callParent(arguments);
    },
    initWin: function () {
        var me = this;
        me.panelConfirmCenter.removeAll(true);
        me.panelConfirmCenter.add({
            xtype: 'label',
            region: 'north',
            forId: 'myFieldId',
            cls: 'setting-text',
            text: me.warningText1,
            margin: '0 0 0 10'
        }, {
            region: 'center',
            xtype: 'label',
            forId: 'myFieldId',
            cls: 'setting-text',
            text: me.warningText2,
            margin: '5 0 0 10'
        });
    },
    sendParam: function (deleteid, okURL, warningText1, warningText2, option) {
        this.okURL = okURL;
        this.deleteid = deleteid;
        this.warningText1 = warningText1;
        this.warningText2 = warningText2;
        this.option = option;
        this.initWin();
        this.setWidth(555);
        this.setHeight(180);
    }
});
