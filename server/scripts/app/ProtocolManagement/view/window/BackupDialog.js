/*
 * ! JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.window.BackupDialog
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.window.BackupDialog', {
    extend:'PM.view.common.window.ModalDialog',
    layout: {
        type:'border'
    },
    mainPanel:null,
    cls:'x-findPath-window',
    width: 1000,
    height: 560,
    modal: true,
    title: 'ProtocolManagement Backup',
    log:"",
    backupLogs:null,
    btnBrowse:null,
    btnBackup:null,
    btnClearLog:null,
    btnClose:null,
    pathEditField:null,
    progressBar:null,
    done:0,


    initComponent : function() {
        var me = this;
        me.title = stringSetting.backupDialog.backupTitle,
        me.btnBrowse = Ext.create('Ext.Button', {
            height: 32,
            width: 32,
            cls: 'icon-browse-button',
            overCls: 'icon-browse-button-over',
            pressedCls: 'icon-browse-button-pressed',
            focusCls: 'icon-browse-button-focus',
            disabledCls: 'icon-browse-button-disable',
            text: '<span class="SpanTextView">...</span>',
            disabled: false,
            handler: function() {
                me.browseServerDrive();
			}
        });

        var btnDeEsWidth = 118;
        var btnDeEsCls = 'icon-button';
        var btnDeEsOverCls = 'icon-button-over';
        var btnDeEsPressedCls = 'icon-button-pressed';
        var btnDeEsFocusCls = 'icon-button-focus';
        var btnDeEsDisabledCls = 'icon-button-disable';
        if (memoryLanguage == 'DE' || memoryLanguage == 'ES' || memoryLanguage == 'FR' || memoryLanguage == 'NL' || memoryLanguage == 'IT' || memoryLanguage == 'PT') {
            btnDeEsWidth = 180;
            btnDeEsCls = 'icon-dees-button';
            btnDeEsOverCls = 'icon-dees-button-over';
            btnDeEsPressedCls = 'icon-dees-button-pressed';
            btnDeEsFocusCls = 'icon-dees-button-focus';
            btnDeEsDisabledCls = 'icon-dees-button-disable';
        }



        me.btnBackup = Ext.create('Ext.Button', {
            height: 32,
            width: btnDeEsWidth,
            cls: btnDeEsCls,
            overCls: btnDeEsOverCls,
            pressedCls: btnDeEsPressedCls,
            focusCls: btnDeEsFocusCls,
            disabledCls: btnDeEsDisabledCls,
            id: 'BackupBtn',
            text: '<span class="SpanTextView">' +
                  stringSetting.backupDialog.backupBtn + 
                  '</span>',
            disabled: true,
            handler: function() {
                me.backupToServer();
            }
        });

        var panelHeader = Ext.create('Ext.panel.Panel', {
            id: 'Backup_Dialog_Button_Area',
            region: 'north',
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
                pack: 'begin'
            },
            defaults: {
                padding: '2 2 2 2',
                margins: '0 8 0 0',
                style: 'font-family:Meiryo UI,Segoe UI;',
            },
            items: [
				{
					xtype: 'label',
					height: 32,
					cls: 'setting-text',
					html: stringSetting.backupDialog.backupLocation,
					margin: '0 10 0 18',
                    style:"font-size:18px;",	
				
				},
                {
                    xtype: 'label',
                    height: 32,
                    width: 10,
                    id: 'Backup_Path_Drive_Type',
                    cls: 'setting-text',
                    style:"font-size:16px;",
                    text: '',
                    padding: '6 0 0 0',
                    margin: '0 10 10 20'       
                },
				{
                    id: 'Backup_Path_Editor',
                    xtype:'textfield',
					height: 32,
					width: 400,
					cls:'x-plain',
                    anchor:'50%',
                    readOnly : true,
                    fieldStyle:"font-size:16px;",
                },
				
                me.btnBrowse,
                me.btnBackup
            ]
        });

        var panelLog = Ext.create('Ext.panel.Panel', {
            id:'Backup_Dialog_Log_Area',
            region: 'center',
            baseCls: 'x-plain',
            bodyCls: 'panel-comfirm-center',
            bodyPadding: '0 10 5 10',
            border: 1,
            defaults: {
                frame: false,
                style: 'font-family:Meiryo UI,Segoe UI;',
            },
			layout: {
                type: 'vbox',
                align: 'stretch'
			},
            items: [{
			   xtype: 'label',
               region: 'north',
               height: 32,
               cls: 'setting-text',
               html: stringSetting.backupDialog.backupLogs,
               margin: '10 10 6 10',
			   style:"font-size:18px;"
			}, {
    			region: 'center',
    			xtype: 'textarea',
                id: 'Backup_Dialog_Logs',
                fieldLabel: 'Backup logs',
                hideLabel: true,
                style: 'margin:0',
                flex: 1,
    			readOnly : true,
    			width: 200,
                fieldStyle:"font-size:16px;"
            }]
        });

        me.progressBar = Ext.create('Ext.ProgressBar', {
            width: 450,
            height: 30,
            margin: '20 120 20 20'
        });

        me.btnClearLog = Ext.create('Ext.Button', {
            height: 32,
            width: btnDeEsWidth,
            region:'west',
            cls: btnDeEsCls,
            overCls: btnDeEsOverCls,
            pressedCls: btnDeEsPressedCls,
            focusCls: btnDeEsFocusCls,
            disabledCls: btnDeEsDisabledCls,
            margin:'10 10 10 10',
            text: '<span class="SpanTextView">' +
                  stringSetting.backupDialog.clearLogBtn + 
                  '<span>',
            handler: function() {
                me.log = "";
                me.backupLogs.setValue("");
            }
        });

        me.btnClose = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            region:'west',
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            margin:'10 20 10 0',
            text: '<span class="SpanTextView">' +
                  stringSetting.UserSpecificName.button.close + 
                  '<span>',
            handler: function() {
                me.close();
            }
        });


        var panelFooter = Ext.create('Ext.panel.Panel', {
            region: 'south',
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            cls: 'panel-NoborderPadding',
            bodyCls: 'button-Color-NoborderPadding',
            layout: {
                type: 'hbox',
                padding: '0 0 0 0',
                align: 'middle',
                pack: 'end'
            },
            items: [me.progressBar,me.btnClearLog, me.btnClose]
        });
        
        Ext.applyIf(this, {
            items:[panelHeader, panelLog, panelFooter]
        });

        this.callParent(arguments);

        me.backupLogs = me.getComponent('Backup_Dialog_Log_Area').getComponent('Backup_Dialog_Logs');
        me.pathEditField = me.getComponent('Backup_Dialog_Button_Area').getComponent('Backup_Path_Editor');
        me.progressBar.hide();
    },

    

    browseServerDrive: function(){
        var me = this;
        var treePanel = null;
        var store = Ext.create('Ext.data.TreeStore', {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getBackupPath.action',
                getMethod : function() {
                    return this.actionMethods.read;
                },
                reader: {
                    type: 'json'
                }
            }),
            folderSort: true,
            sorters: [{
                property: 'text',
                direction: 'ASC'
            }],
        });
        
        me.log = "";
        me.backupLogs.setValue("");

        store.load();
        store.on('load', function(){
            var findPathDialog = Ext.create('PM.view.window.PathBrowseDialog', {
                pathTreeStore: store,
            });
            findPathDialog.show();
        });

	},


    backupToServer:function(){
        var me = this;   
        var backupPath = me.pathEditField.getValue();
        me.clearLog();
        if (!/^[a-zA-Z]:(\\[\w\. ]*)*/.test(backupPath)) {
            console.log("invalid file path.");
            me.errorCase();
            return;
        }
        me.btnBackup.setDisabled(true);
        me.btnBrowse.setDisabled(true);
        me.pathEditField.setDisabled(true);
        me.btnClose.setDisabled(true);
        // setTimeout(function(){
        //     me.btnClose.setDisabled(false);
        // }, 2000);

        me.logOnPanel("Begin to Backup...");

        PM.data.Connection.requestSend({
            method : "GET",
            url : PROCESS_PATH_GLOBAL_ACTION + 'backupProtocolData.action',
            timeout: 30000,
            params : {
                path:backupPath,
                clearcache : true,
            },
            loadData: function(responseObj, success) {
                if (responseObj && 
                    typeof responseObj.total != "undefined"&& 
                    typeof responseObj.done != "undefined" && 
                    typeof responseObj.path != "undefined"
                ) {
                    me.logOnPanel("Files will be backup in the directory:  " + responseObj.path.toString());
                    me.logOnPanel(responseObj.total.toString() + " files is being processed...");
                    me.logOnPanel("\n");
                    me.total = responseObj.total;
                    me.done = parseInt(responseObj.done);
                    me.progressBar.show();
                    me.queryBackupProgress(responseObj.path);
                } else {
                    me.errorCase();
                }
                
            }
        });
    },


    queryBackupProgress:function(filePath){
        var me = this;
        PM.data.Connection.requestSend({
            method : "GET",
            url : PROCESS_PATH_GLOBAL_ACTION + 'queryBackupProgress.action',
            timeout: 30000,
            params : {
                path:filePath,
                clearcache : true,
            },
            loadData: function(responseObj, success) {
                if (responseObj && 
                    typeof me.total != "undefined" &&
                    typeof responseObj.done != "undefined" && 
                    typeof responseObj.path != "undefined") {
                    if (parseInt(responseObj.done) > me.done) {
                        //me.logOnPanel(responseObj.done.toString() + "% files is done.");
                        me.logOnPanel(parseInt(parseInt(responseObj.done*100)/parseInt(me.total)) + "% files is done.");
                        me.done = parseInt(responseObj.done);
                    }    
                    me.progressBar.updateProgress(parseInt(responseObj.done)/parseInt(me.total), '', 'backup...');
                    if (parseInt(responseObj.done) < parseInt(me.total) && responseObj.finished === false) {
                        setTimeout(function(){
                            me.queryBackupProgress(responseObj.path);
                        }, 300);
                    } else {
                        me.logOnPanel("\nBackup ProtocolManagement Data Successfully");
                        me.btnBackup.setDisabled(false);
                        me.btnBrowse.setDisabled(false);
                        me.pathEditField.setDisabled(false);
                        me.btnClose.setDisabled(false);
                        setTimeout(function(){
                            me.progressBar.hide();
                        }, 3000);
                        me.done = 0;
                    }
                } else {
                    me.errorCase();
                }              
            }
        });
    },

    errorCase:function(){
        var me = this;
        me.goToInitState();
        me.clearLog();
        var _message = Ext.create('PM.view.common.window.Message', {
            errorDetail: stringSetting.error.ERR0033
        });
        _message.showWin();
    },


    logOnPanel:function(log){
        var me = this;
        me.log += log + "\n";
        me.backupLogs.setValue(me.log);
        var logArea = me.backupLogs.getActionEl().dom;
        logArea.scrollTop = logArea.scrollHeight;

    },

    goToInitState: function(){
        var me = this;
        var driveTypeLabel = Ext.getCmp('Backup_Dialog_Button_Area').getComponent('Backup_Path_Drive_Type');

        me.btnBackup.setDisabled(false);
        me.btnBrowse.setDisabled(false);
        me.pathEditField.setDisabled(false);
        me.btnClose.setDisabled(false);
        me.progressBar.hide();
        driveTypeLabel.setText('');
    },

    clearLog: function(){
        var me = this;
        me.log = "";
        me.backupLogs.setValue("");
    },

});
