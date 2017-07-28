/*
 * ! JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.common.window.ConfirmMessage
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.common.window.ConfirmMessage', {
    extend               : 'PM.view.common.window.ModalDialog',
    layout               : {
        type : 'border'
    },
    mainPanel            : null,
    cls                  : 'x-Confirm-window',
    bodyCls              : 'x-message-window-body',

    width                : 555,
    height               : 250,
    modal                : true,
    maxMessageHeight     : 640,

    labelText1           : null,
    labelText2           : null,
    nameList             : null,
    labelText1Height     : 70,
    btn1Text:'',
    btn2Text:'',

    initComponent : function() {
        var me = this;

        me.title = stringSetting.comments.title_confirm;

        if (me.btn1Text.length === 0) {
            me.btn1Text = stringSetting.app_setting.button.ok;
        }

        if (me.btn2Text.length === 0) {
            me.btn2Text = stringSetting.app_setting.button.cancel;
        }

        var btnOKConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' +
                me.btn1Text +
                '<span>',
            disabled: false,
            handler: function () {
                me.close();
                me.okEvent();
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
            text: '<span class="SpanTextView">' +
                me.btn2Text +
                '<span>',
            disabled: false,
            handler: function () {
                me.cancelEvent();
                me.close();
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
            items: [
                btnOKConfirm,
                btnCancelConfirm
            ]
        });

        var textList = [
            {
                html: me.labelText1,
                height: me.labelText1Height
            }
        ];
        if (me.nameList != null) {
            for (var i = 0; i < me.nameList.length; i++) {
                textList.push({
                    margin: '0 10 0 10',
                    text: me.nameList[i]
                });
            }
        }
        textList.push({
            text: me.labelText2
        });
        var panelConfirmCenter = Ext.create('Ext.panel.Panel', {
            region: 'center',
            baseCls: 'x-plain',
            bodyCls: 'panel-comfirm-center',
            bodyPadding: 12,
            border: 1,
            defaults: {
                frame: false,
                xtype: 'label',
                margin: '10 10 10 10',
                cls: 'setting-text',
                columnWidth: 1
            },
            items: textList
        });

        Ext.applyIf(
            this,
            {
                items: [panelConfirmCenter,
                    panelConfirmButton]
            });
        me.callParent(arguments);
        me.show();

        if (me.nameList != null) {
            var span = panelConfirmCenter.body.dom.children;
            if (span.length == 0) {
                return;
            }
            if (span[0].clientHeight > me.maxMessageHeight) {
                panelConfirmCenter.body.addCls("panel-message-ScrollBorder");
                me.setHeight(me.maxMessageHeight);
            }
            else {
                me.setHeight(span[0].clientHeight + 35 + 50 + 10);
            }
        }
        me.resetWinPosition();
    },
    cancelEvent    : function(){},
    okEvent        : function(){},
});
