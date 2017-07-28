/*
 * ! JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.window.PathBrowseDialog
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.window.PathBrowseDialog', {
    extend: 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    mainPanel: null,
    cls: 'x-Confirm-window',
    width: 555,
    height: 300,
    modal: true,
    panelTreeBody: null,
    title: 'Backup location', 
    pathTreeStore:null,
    pathEditRollBackValue: '',
    defaults: {
        style: 'font-family:Meiryo UI,Segoe UI;',
    },
    
    initComponent: function() {
        var me = this;
        me.title = stringSetting.backupDialog.backupLocation;
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            disabled: true,
            text: '<span class="SpanTextView">' +
                    stringSetting.app_setting.button.ok +
                   '<span>',
            handler: function() {
                me.OKLoad();
            	me.okEvent();
                me.close();
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
                    stringSetting.app_setting.button.cancel +
                    '<span>',
            handler: function() {
                var pathEdit = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Editor');
                pathEdit.setValue(me.pathEditRollBackValue);
                me.close();
            }
        });

        var panelFooter = Ext.create('Ext.panel.Panel', {
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
            defaults    : {
                padding: '0 0 0 0',
                margins: '0 8 0 0'
            },
            items: [
                me.btnOKConfirm,
                btnCancelConfirm
            ]
        });
		
        me.panelTreeBody = Ext.create('Ext.tree.Panel', {
            id: 'Backup_PathBrowser_TreePanel',
            region: 'center',
            baseCls: 'x-plain',
            bodyCls: 'panel-comfirm-center',
            height: 204,
            minHeight: 204,
            bodyPadding: '6 10 0 10',
			store: me.pathTreeStore,
            allowDeselect: true,
            style:'background-color:#dfe8f6;',
            listeners:{
                select: function (rowModel, record, index, eOpts) {
                    var pathEdit = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Editor');
                    var driveTypeLabel = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Drive_Type');
                    if (!pathEdit || !driveTypeLabel) {
                        console.log("Failed to get path edit control.");
                        return;
                    }
                    pathEdit.setValue("");
                    driveTypeLabel.setText("");
                    var drive = "", path = "", driveType = "";
                    if (!record.parentNode) {
                        return;
                    }
                    var driveNode = record, node = record;
                    while (driveNode.parentNode) {
                        if (driveNode.data.id && (driveNode.data.id.indexOf("drive") > -1)) {
                            break;
                        }
                        driveNode = driveNode.parentNode;
                    }
                    if (driveNode.data.id && (driveNode.data.id.indexOf("drive") === -1)) {
                        return;
                    }

                    var strArray = driveNode.data.id.split("_");
                    drive = strArray[1];
                    driveType = strArray[2];

                    if (record.data.id && (record.data.id.indexOf("drive") > -1)) {
                        path = "";
                    } else {
                        path = record.data.text;
                        while(node.parentNode) {
                            if (node.parentNode.data.id && (node.parentNode.data.id.indexOf("drive") > -1)) {
                                break;
                            }
                            path = node.parentNode.data.text + "\\" + path;
                            node = node.parentNode;
                        }
                    }
                    node = record;
                    while(node.childNodes.length > 0) {
                        if (path !== "") {
                            path = path + "\\" + node.childNodes[0].data.text;
                        } else {
                            path = node.childNodes[0].data.text;
                        }
                        node = node.childNodes[0];
                    }

                    path = drive + "\\" + path;
                    pathEdit.setValue(path + "\\");
                    driveTypeLabel.setText('');
                    me.btnOKConfirm.setDisabled(false);
                },
                deselect: function () {
                    me.btnOKConfirm.setDisabled(true);
                }
            }
        });

        Ext.applyIf(this, {
            items: [me.panelTreeBody, panelFooter]
        });
        var pathEdit = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Editor');
        me.pathEditRollBackValue = pathEdit.getValue();
        this.callParent(arguments);
    },
    cancelEvent    : function(){},
    okEvent        : function(){

    },

    checkPath: function(){
        var pathEdit = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Editor');
        if (!pathEdit) {
            return false;
        }
        var test = /^[a-zA-Z]:(\\[\w\. ]*)*/;
        return true;
    },

    OKLoad: function () {
        var backupBtn = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('BackupBtn');
        backupBtn.setDisabled(false);
    }

});
