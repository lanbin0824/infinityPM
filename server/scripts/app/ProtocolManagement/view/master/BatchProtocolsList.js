/*!
 * JS batch approving view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Ext.define('PM.view.master.BatchProtocolsList', {
    extend           : 'PM.view.common.window.ModalDialog',
    alias: 'widget.masterbatchprotocolslist',
    layout           : {
        type : 'border'
    },
    parentPanel      : null,
    cls              : 'x-Confirm-window',
    minWidth         : 300,
    minHeight        : 100,
    width            : 550,
    height           : 130,
    bodyBorder       : false,
    border           : false,
    closable         : false, 
    modal            : true,
    frame            : false,
    resizable        : false,
        
    padding          : 0,
    bodyPadding      : 0,
    
    groupList        : null,
    centerPanel      : null,
    buttonPanel      : null,
    store            : null,
    startStore       : null,
    cancelStore      : null,
    reqErrStore      : null,
    name             : null,
    currentNumber    : null,
    totalNumber      : null,
    updateCenterRegion    : null,
    keylist          : '',
    protocolList     : new Array,
    index            : 0,
    exeFlag : 0,
    errorList : [],
    errActionStatus  : {
            overview     : '',
            details      : '',
            details2     : ''
    },
    initComponent : function() {
        var me = this;
        
        me.title = stringSetting.master.title.title_approve;;
        me.errActionStatus = stringSetting.error.event.approve;

       me.initStore();
       
       var storeData = me.protocolList;
       if(storeData.length !=0){
       		for(var i=0 ; i<storeData.length-1 ;i++)
       		{
       			me.keylist += storeData[i].key+"<,>";
       		}
       		me.keylist += storeData[storeData.length-1].key;
       }
       
       me.startStore.load({
                            params: {keylist : me.keylist}});
 
        me.btnCancelConfirm = Ext.create('Ext.Button', {
            height      : 32,
            width       : 118,
            cls         : 'icon-button',
            overCls     : 'icon-button-over',
            pressedCls  : 'icon-button-pressed',
            focusCls    : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text        : '<span class="SpanTextView">'
                         + stringSetting.app_setting.button.cancel
                         + '<span>',
            disabled    : false,
            handler     : function() {
                if (me.exeFlag == 0) {
                    me.cancelStore.load();
                } else {
                    me.cancelCleanStore.load();
                }

            }
        });
        
        me.buttonPanel = Ext.create('Ext.panel.Panel', {
            region     : 'south',
            height     : 60,
            minHeight  : 60,
            maxHeight  : 60,
            cls        : 'panel-NoborderPadding',
            bodyCls    : 'button-Color-NoborderPadding',
            layout     : {
                    type    : 'hbox',
                    padding : '0 0 0 0',
                    align   : 'middle',
                    pack    : 'end'
            },
            defaults   : {
                    padding : '0 0 0 0',
                    margins : '0 8 0 0'
            },
            items      : [ me.btnCancelConfirm]
        });
        
        me.centerPanel=Ext.create('Ext.panel.Panel',{
            baseCls       : 'x-plain',
            bodyPadding   : 0,
            bodyCls       : 'panel-comfirm-center',
            region        : 'center',
            height        : 80,
            layout: {
                    type     : 'hbox',
                    align    :'middle',
                    pack     :'end',
                 },
        });
                
        Ext.applyIf(me, {
                    items : [me.centerPanel/*, me.buttonPanel*/]
        });
        me.callParent(arguments);
        me.errorList = [];
        me.exeFlag = 0;
    },
    updateProgress:function(){
        var me = this;
        var displayPanel = me.createRegionPanel();
        me.centerPanel.removeAll();
        me.centerPanel.add(displayPanel);
    },
    initStore : function(){
        var me = this;       
        me.startStore = Ext.create('Ext.data.Store', {
              model    :'BatchApproveModel' ,
              proxy : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'startBatchApprove.action',
                getMethod   : function(){
                    return 'POST';
                },
                reader : {
                    type : 'json',
                }
            })
        });
        
        me.store = Ext.create('Ext.data.Store', {
              model    :'BatchApproveModel' ,
              proxy : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'checkBatchApprove.action',
                getMethod   : function(){
                    return 'GET';
                },
                reader : {
                    type : 'json',
                }
            })
        });

        me.cleanstore = Ext.create('Ext.data.Store', {
            model    :'BatchApproveModel' ,
            proxy : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'checkcleanmastermaker.action',
                getMethod   : function(){
                    return 'GET';
                },
                reader : {
                    type : 'json',
                }
            })
        });
        
        me.cancelStore = new Ext.data.Store({
            model : 'BatchApproveModel',
            proxy : new Ext.data.proxy.Ajax({
                url : PROCESS_PATH_GLOBAL_ACTION + 'cancelBatchApprove.action',
                reader : {
                    type : 'json',
                    totalProperty : 'total',
                    root : 'result'
                },
                getMethod : function() {
                    return 'POST';
                }
            })
        });

        me.cancelCleanStore = new Ext.data.Store({
            model : 'BatchApproveModel',
            proxy : new Ext.data.proxy.Ajax({
                url : PROCESS_PATH_GLOBAL_ACTION + 'cancelcleanmastermaker.action',
                reader : {
                    type : 'json',
                    totalProperty : 'total',
                    root : 'result'
                },
                getMethod : function() {
                    return 'POST';
                }
            })
        });
        
        me.reqErrStore = new Ext.data.Store({
            proxy : new Ext.data.proxy.Ajax({
                url :  PROCESS_PATH_GLOBAL_ACTION + 'geterrorlist.action',
                type : 'ajax',
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
            model : 'RequestErrorModel'
        });
        
        me.startStore.on("load",function(){
        	me.checkProcess();
            function taskFunction(){
                me.checkProcess();
            }

            me.currentNumber = 0;
            me.totalNumber = 100;
            me.updateProgress();

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

        me.cleanstore.on("load",function(){
            me.pushData();
        });

        me.cancelStore.on("load",function(){

        });
        
    
    },
    createRegionPanel : function(){
        var me = this;
        
        var columnWidth = 360;
        if(me.exeFlag == 0){
            me.name = stringSetting.master.title.label_approving;
        }else{
            me.name = stringSetting.master.title.label_cleaning;
        }
        var labelNameWidth = getStringRealWidth(styleGridTipGlobal,me.name);
        
        var tipStr = '';
        if(columnWidth < labelNameWidth){
            tipStr = me.name;
        }


        var percentValue = parseInt((me.currentNumber * 100)/me.totalNumber);
        
        var labelName = Ext.create('Ext.panel.Panel',{
            height        : 60,
            width         : columnWidth,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            html:'<div class="panel-name" data-qtip = '+tipStr+'>' + me.name + '</div>'
        });
        
        var labelDone = Ext.create('Ext.panel.Panel',{
            height        : 60,
            width         : 80,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            html:'<div style="color:#1E3246; font-size:13pt; padding-top:20px;padding-left:10px;">' + stringSetting.app_setting.label.done + '</div>'
        });
        
        var labelProcess = Ext.create('Ext.panel.Panel',{
            height        : 60,
            width         : 100,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            //html:'<div class="panel-name" >' + me.currentNumber+"/" + me.totalNumber + '</div>'
            html:'<div class="panel-name" >' + percentValue + '%</div>'
        });

        var regionPanel = Ext.create('Ext.panel.Panel',{
            height        : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            layout: {
                     type:'hbox',    
                     align:'middle',
                     pack : 'end'
                 },
            items:[
                labelName,
                labelProcess,
                labelDone
            ]
        });
        
        return regionPanel;
    },
    
    pushData: function(){
    	var me = this;

        if(me.exeFlag == 0 && me.store.getCount()>0){
            var approveStore  = me.store.getAt(0);

            if(approveStore.get("flag")){
                if( approveStore.get("finish") ){
                    me.updateCenterRegion.stop();
                    me.checkError(approveStore);
                    return ;
                }
                
                me.name = approveStore.get("name");
                me.currentNumber = approveStore.get("currentNumber");
                me.totalNumber = approveStore.get("totalNumber");
                me.updateProgress();
            }
        } else if(me.exeFlag == 1 && me.cleanstore.getCount()>0){
            var approveStore  = me.cleanstore.getAt(0);

            if(approveStore.get("flag")){
                if( approveStore.get("finish") ){
                    me.updateCenterRegion.stop();
                    me.checkError(approveStore);
                    return ;
                }

                me.name = approveStore.get("name");
                me.currentNumber = approveStore.get("currentNumber");
                me.totalNumber = approveStore.get("totalNumber");
                me.updateProgress();
            }
        }

    },
    
    checkProcess:function() {
        var me = this;
        if (me.exeFlag == 0) {
            me.store.load();
        } else if (me.exeFlag == 1) {
            me.cleanstore.load();
        }
    },
    
    checkError:function(approveStore){
        var me = this;
        if(approveStore.get("errorList") == null && me.errorList.length == 0){
            me.succeedApprove(approveStore);
        } else{
            var requestStore = me.reqErrStore;
            me.errorApprove(approveStore,requestStore);
        }
        /*me.reqErrStore.load({
            callback: function(records, operation, success) {
                if(me.reqErrStore.getCount()<=0 && approveStore.get("errorList") == null && me.errorList.length == 0){
                    me.succeedApprove(approveStore);
                } else{
                    var requestStore = me.reqErrStore;
                    me.errorApprove(approveStore,requestStore);
                }
            }
        });*/
    },
    
    succeedApprove:function(approveStore) {
        var me = this;

        if (approveStore.get("cancel")) {
            me.exeFlag = 1;
        }else {
            me.currentNumber = 100;
            me.totalNumber = 100;
            me.updateProgress();
        }
        setTimeout(
            function () {
                if (me.exeFlag == 0) {
                    me.exeFlag = 1;
                    me.currentNumber = 0;
                    me.totalNumber = 100;
                    me.updateProgress();
                    me.setWinTitle(stringSetting.master.title.title_clean);
                    me.setTitle(me.title);
                    me.updateCenterRegion.start();
                } else {
                    me.close();
                    me.cancelEvent();
                }
            },
            2000
        );
    },
    
    cancelApprove:function(){
        
    },
    
    errorApprove:function(approveStore,requestStore){
        var me = this;
        var resultApprove = [];
        var errorProtocolCount;
        if(me.exeFlag == 0){
            if(approveStore.get("errorList") !== null){
                me.errorList = approveStore.get("errorList");
            }

            me.exeFlag = 1;
            me.currentNumber = 0;
            me.totalNumber = 100;
            me.updateProgress();
            me.setWinTitle(stringSetting.master.title.title_clean);
            me.setTitle(me.title);
            me.updateCenterRegion.start();
            return;
        }else{
            errorProtocolCount = me.errorList.length;
            resultApprove = me.errorList;
            if(approveStore.get("errorList") !== null){
                resultApprove = resultApprove.concat(approveStore.get("errorList"));
            }
        }
        var errList = [];
        var errNameList = [];

        var header = {
            "status": "error",
            "overview": stringSetting.app_setting.label.overview,
            "details": stringSetting.master.message.approve_error_header.format(errorProtocolCount),
            "solution": "",
            "calladmin": ""
        };
        errList.push(header);
        errNameList.push('');

        for(var i=0;i<resultApprove.length;++i){
            var errCode = resultApprove[i]["errorCode"];
            var errName = resultApprove[i]["errorName"];
            var errormessage = Ext.clone(stringSetting.error[errCode]);
            errormessage.overview = stringSetting.app_setting.label.overview;
            
            if(errCode == "ERR10001" || errCode == "ERR10009"){
                errormessage.details = errormessage.details.format(me.errActionStatus.details);
                errList.push(errormessage);
                errNameList.push(errName);    
            }else if(errCode == "ERR10002"){
                errormessage.details = errormessage.details.format(me.errActionStatus.details, me.errActionStatus.details);
                errList.push(errormessage);
                errNameList.push(errName);    
            }else if(errCode == "ERR20002"){
                errormessage.details = errormessage.details.format(errName);
                errList.push(errormessage);
                errNameList.push(" ");    
            }else{
                errList.push(errormessage);
                errNameList.push(errName);    
            }
        }
        
        var _message = Ext.create('PM.view.common.window.Message',{
            errorDetailList       : errList,
            errorNameList         : errNameList,
            OKLoad	              : function(){
                       me.cancelEvent();
                	},
        });
        
        _message.showWin();

        me.close();
    },
    
 cancelEvent : function()
 {
 	return;
 }
    
});
