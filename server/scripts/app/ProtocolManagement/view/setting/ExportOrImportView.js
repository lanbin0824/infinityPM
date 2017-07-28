/*!
 * JS export or import view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Ext.define('PM.view.Setting.ExportOrImportView', {
    extend               : 'PM.view.common.window.ModalDialog',
    layout               : {
              type  : 'border'
    },
    cls                  : 'x-Confirm-window',
    minWidth             : 300,
    minHeight            : 100,
    width                : 550,
    height               : 180,
    bodyBorder           : false,
    border               : false,
    closable             : false, 
    modal                : true,
    frame                : false,
    resizable            : false,
    
    padding              : 0,
    bodyPadding          : 0,
    
    type                 : null,
    btnClose             : null,
    btnCancel            : null,
    btnOk                : null,
    groupList            : null,
    centerPanel          : null,
    buttonPanel          : null,
    store                : null,
    checkStore           : null,
    startStore           : null,
    cancelStore          : null,
    isExport             : false,    
    name                 : null,
    currentNumber        : null,
    totalNumber          : null,
    updateCenterRegion   : null,
    errActionStatus      : {
                overview       : '',
                details        : '',
                details2       : ''
    },
    
    initComponent : function() {
        var me = this;
        var path = null;
        
        me.initStore();
        
        if(me.type == "export"){
            me.title = stringSetting.app_setting.title.export;
            me.errActionStatus = stringSetting.error.event.export;
            me.isExport = true;
            
            me.checkStore.load();
        }else{
            me.title = stringSetting.app_setting.title.import;
            me.errActionStatus = stringSetting.error.event.import;
        }
        
        me.btnCancel = Ext.create('Ext.Button', {
            height        : 32,
            width         : 118,
            cls           : 'icon-button',
            overCls       : 'icon-button-over',
            pressedCls    : 'icon-button-pressed',
            focusCls      : 'icon-button-focus',
            disabledCls   : 'icon-button-disable',
            text          : '<span class="SpanTextView">'
                            + stringSetting.app_setting.button.cancel
                            + '<span>',
            disabled      : false,
            handler       : function() {
                me.cancelStore.load();
            }
        });
        
        me.btnClose = Ext.create('Ext.Button', {
            height       : 32,
            width        : 118,
            cls          : 'icon-button',
            overCls      : 'icon-button-over',
            pressedCls   : 'icon-button-pressed',
            focusCls     : 'icon-button-focus',
            disabledCls  : 'icon-button-disable',
            text         : '<span class="SpanTextView">'
                           + stringSetting.app_setting.button.close
                           + '<span>',
            disabled     : false,
            handler      : function() {
                me.closeWin();
            }
        });
        
        me.btnOk = Ext.create('Ext.Button', {
            height         : 32,
            width          : 118,
            cls            : 'icon-button',
            overCls        : 'icon-button-over',
            pressedCls     : 'icon-button-pressed',
            focusCls       : 'icon-button-focus',
            disabledCls    : 'icon-button-disable',
            text           : '<span class="SpanTextView">'
                             + stringSetting.app_setting.button.ok
                             + '<span>',
            disabled       : false, 
            handler : function() {
                me.centerPanel.removeAll();
                me.showHandleMsg(stringSetting.app_setting.label.export_clear_message);
                me.btnDisplay(false,false,true);
                me.startStore.load({
                    params    :{
                            type : me.type
                    }
                });
            }
        });
        
        
        
        me.buttonPanel = Ext.create('Ext.panel.Panel', {
            region       : 'south',
            height       : 60,
            minHeight    : 60,
            maxHeight    : 60,
            cls          : 'panel-NoborderPadding',
            bodyCls      : 'button-Color-NoborderPadding',
            layout       : {
                type       : 'hbox',
                padding    : '0 0 0 0',
                align      : 'middle',
                pack       : 'end'
            },
            defaults     : {
                padding    : '0 0 0 0',
                margins    : '0 8 0 0'
            },
            items        : [{
                        id        : 'validation_panel_id',
                        html      : '<div id="validationid"><div>',
                        width     : 200,
                        height    : 20,
                        bodyStyle : 'background-color:#D1DFF5;border:0;float:rigth;'
                    }, me.btnOk,me.btnClose,me.btnCancel]
        });
        
        me.btnDisplay(false,false,false);
        
        me.centerPanel=Ext.create('Ext.panel.Panel',{
            baseCls       : 'x-plain',
            bodyPadding   : 0,
            bodyCls       : 'panel-comfirm-center',
            region        : 'center',
            height        :80,
            layout        : {
                        type   :'hbox',
                        align  :'middle',
                        pack   :'end',
                 },
        });
        
        if(!me.isExport){
            me.showHandleMsg(stringSetting.app_setting.label.import_init_message);
            me.btnDisplay(false,false,true);
            me.startStore.load({
                params    :{
                         type : me.type
                }
            });
        }

        Ext.applyIf(me, {
                    items : [me.centerPanel, me.buttonPanel]
        });
        me.callParent(arguments);
    },
    
    initParam : function(){
        var me = this;
        
        var displayPanel = me.createRegionPanel();
        me.centerPanel.removeAll();
        me.centerPanel.add(displayPanel);
        me.btnDisplay(false,false,true)
    },
    
    initStore : function(){
        var me = this;
        
        me.checkStore = Ext.create('Ext.data.Store', {
            model       :'ProtocolOperationModel' ,
            proxy       : new Ext.data.proxy.Ajax({
                    type        : 'ajax',
                    url         : PROCESS_PATH_GLOBAL_ACTION + 'checkExportFileExist.action',
                    getMethod   : function(){
                    return 'GET';
                },
                    reader : {
                           type : 'json',
                }
            })
        });        
        
        me.startStore = Ext.create('Ext.data.Store', {
            model       :'ProtocolOperationModel' ,
            proxy       : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'startProtocolData.action',
                getMethod   : function(){
                    return 'GET';
                },
                reader : {
                    type : 'json',
                }
            })
        });
        
        me.store = Ext.create('Ext.data.Store', {
            model       :'ProtocolOperationModel' ,
            proxy       : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'checkProtocolData.action',
                getMethod   : function(){
                    return 'GET';
                },
                reader      : {
                        type : 'json',
                }
            })
        });
        
        me.cancelStore = new Ext.data.Store({
            model    : 'BatchApproveModel',
            proxy    : new Ext.data.proxy.Ajax({
                url       : PROCESS_PATH_GLOBAL_ACTION + 'cancelProtocolData.action',
                reader    : {
                    type          : 'json',
                    totalProperty : 'total',
                    root          : 'result'
                },
                getMethod : function() {
                    return 'POST';
                }
            })
        });

        me.checkStore.on('load',function(){ 
            if(me.checkStore.getCount() <= 0){
                return ;
            }
            var filesnumber = me.checkStore.getAt(0).get('filesNumber');
            if(me.type == "export" && filesnumber>0){
                me.showHandleMsg(stringSetting.app_setting.label.export_message);
                me.btnDisplay(true,true,false);
            }else{
                me.startStore.load({
                    params    :{
                           type : me.type
                    }
                });
            }
        });

        me.startStore.on("load",function(){
            function taskFunction(){
                me.checkProcess();
            }
            
            var runner = new Ext.util.TaskRunner();
        
            me.updateCenterRegion = runner.newTask({
                 run: taskFunction,
                 interval: 2000
            });
    
            me.updateCenterRegion.start();
        });
        
        me.store.on("load",function(){
            me.pushData();
        });

        me.cancelStore.on("load",function(){
        });
        
    },

    createRegionPanel : function()
    {
        var me = this;
    
        var labelName = Ext.create('Ext.panel.Panel',{
            height         : 60,
            width          : 270,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7;',
            html           : '<div class="panel-name" >' + me.name + '</div>'
        });
        
        var labelDone = Ext.create('Ext.panel.Panel',{
            height        : 60,
            width         : 90,
            cls           : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            html          : '<div class="panel-name">' + stringSetting.app_setting.label.done + '</div>'            
        });
        
        var labelProcess = Ext.create('Ext.panel.Panel',{
            height         : 60,
            width          : 180,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7; text-align:center',
            html           : '<div class="panel-name">' + me.currentNumber+"/" + me.totalNumber + '</div>'
        });

        var regionPanel = Ext.create('Ext.panel.Panel',{
            height         : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7;',
            layout         : {
                    type     : 'table',
                    columns  : 3
            },
            items          :[
                labelName,
                labelProcess,
                labelDone
            ]
        });
        
        return regionPanel;
    },
    
    pushData: function(){
        var me = this;
        
        if(me.store.getCount()>0){
            var operationStore  = me.store.getAt(0);
            if(operationStore.get("nodata")){
                me.updateCenterRegion.stop();
                me.importNothing();
            }
            
            if(operationStore.get("flag")){
                if( operationStore.get("finish") ){
                    me.updateCenterRegion.stop();
                    me.checkError(operationStore);
                    return ;
                }
                
                me.name = operationStore.get("name");
                me.currentNumber = operationStore.get("currentNumber");
                me.totalNumber = operationStore.get("totalNumber");
                me.initParam();
            }
        }else{
            me.btnDisplay(false,true,false);
        }
    },
    
    checkProcess:function(){
        var me = this;
        me.store.load();
    },
    
    checkError:function(operationStore){
        var me = this;
        
        if(operationStore.get("errorList") == null){
            me.succeedOperation(operationStore);
        } else{
            me.errorOperation(operationStore);
        }
    },
    
    succeedOperation:function(operationStore){
        var me = this;
        
        var showMessage = null;
        if(operationStore.get("cancel") && me.isExport ){
            showMessage = stringSetting.app_setting.label.export_cancel;
        }else if(operationStore.get("cancel") && !me.isExport ){
            showMessage = stringSetting.app_setting.label.import_cancel;
        }else if(me.isExport){
            showMessage = stringSetting.app_setting.label.export_succeed;
        }else if(!me.isExport){
            showMessage = stringSetting.app_setting.label.import_succeed;
        }
        
        var showWidth = me.getShowWidth(showMessage);
        
        var labelFinish = {
            xtype:'label',
            height: 60,
            width: showWidth,
            style:'color:#1E3246; font-size:13pt; padding-top:20px;',
            text: showMessage,
        };
        
        var closePanel = Ext.create('Ext.panel.Panel',{
            height         : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7;',
            layout         : {
                     type     : 'hbox',    
                     align    : 'middle',
                     pack     : 'end'
                 },
            items:[labelFinish]
        });
        
        me.centerPanel.removeAll();
        me.centerPanel.add(closePanel);
        
        me.btnDisplay(false,true,false);
    },
    
    errorOperation : function(operationStore){
        var me = this;
        
        var resultOperation = operationStore.get("errorList");
        var errList = [];
        var errNameList = [];
        
        for(var i=0;i<resultOperation.length;++i){
            var errCode = resultOperation[i]["errorCode"];
            var errName = resultOperation[i]["errorName"];
            var errormessage = Ext.clone(stringSetting.error[errCode]);
            
            if(me.isExport){
                errormessage.overview = stringSetting.app_setting.label.export_overview;
            }else{
                errormessage.overview = stringSetting.app_setting.label.import_overview;
            }
            
            if(errCode == "ERR9003" || errCode == "ERR9004" ||errCode == "ERR9005" || errCode == "ERR9007"){
                errormessage.details = errormessage.details.format(me.errActionStatus.details);
            }
            
            errList.push(errormessage);
            errNameList.push(errName);    
        }
        
        var _message = Ext.create('PM.view.common.window.Message',{
            errorDetailList     : errList,
            errorNameList       : errNameList
        });
        
        _message.showWin(); 
        
        me.close();
    },
    
    importNothing : function(){
        var me = this;
        
        var showMessage = stringSetting.app_setting.label.import_message;
        var showWidth = me.getShowWidth(showMessage);
        
        var labelFinish = {
            xtype    :'label',
            height   : 60,
            width    : showWidth,
            style    :'color:#1E3246; font-size:13pt; padding:20px 0px 0px 0px',
            text     : showMessage,
        };
        
        var closePanel = Ext.create('Ext.panel.Panel',{
            height         : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7;',
            layout         : {
                          type   :'hbox',    
                          align  :'middle',
                          pack   : 'end'
                }, 
            items          :[labelFinish]
        });
        
        me.centerPanel.removeAll();
        me.centerPanel.add(closePanel);
        
        me.btnDisplay(false,true,false);
    },
    
    showHandleMsg:function(msg){
        var me = this;
        var showWidth = me.getShowWidth(msg);
        
        var labelConfirm = {
            xtype     :'label',
            height    : 60,
            width     : showWidth,
            style     :'color:#1E3246; font-size:13pt; padding:20px 0px 0px 0px',
            text      : msg,
        };
        
        var confirmPanel = Ext.create('Ext.panel.Panel',{
            height         : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            bodyStyle      : 'background:#EDF0F7;',
            layout         : {
                          type    :'hbox',    
                          align   :'middle',
                          pack    : 'end'
                 },
            items          :[labelConfirm]
        });
        
        me.centerPanel.removeAll();
        me.centerPanel.add(confirmPanel);
        
        
    },
    
    btnDisplay : function(okbtn, closebtn,cancelbtn) {
        var me = this;
        
        me.btnOk.setVisible(okbtn);
        me.btnClose.setVisible(closebtn);
        me.btnCancel.setVisible(cancelbtn);
    },
    
    getShowWidth : function(showMessage){
        var me = this;
        
        var labelWidth = getStringRealWidth(styleGridTipGlobal,showMessage);
        var showWidth = me.width - (me.width-labelWidth)/2; 
        return showWidth;
    }
});
