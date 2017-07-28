/*!
 * JS batch approving view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Ext.define('PM.view.progressview.ChangePositionProgressView', {
    extend           : 'PM.view.common.window.ModalDialog',
    layout           : {
        type : 'border'
    },
    cls              : 'x-Confirm-window',
    minWidth         : 300,
    minHeight        : 100,
    width            : 550,
    height           : 180,
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
    name             : null,
    currentNumber    : null,
    totalNumber      : null,
    updateCenterRegion    : null,
    errActionStatus  : {
            overview     : '',
            details      : '',
            details2     : ''
    },
    
//-------------------------------------
    request_date    : null,
    approve_date    : null,
//-------------------------------------

    initComponent : function() {
        var me = this;
        
        me.title = stringSetting.protocol_position.label.title_progress;
        me.errActionStatus = stringSetting.error.event.move;
        me.initStore();
        me.startStore.load({
            params: me.param
        });
    
        /*me.btnCancelConfirm = Ext.create('Ext.Button', {
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
                //me.updateCenterRegion.stop();
                me.cancelStore.load();
            }
        });*/
        
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
            items      : [{
                    id        : 'validation_panel_id',
                    html      : '<div id="validationid"><div>',
                    width     : 200,
                    height    : 20,
                    bodyStyle : 'background-color:#D1DFF5;border:0;float:rigth;'
                    }/*, me.btnCancelConfirm*/]
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
        
        //me.initParam();
        
        Ext.applyIf(me, {
                    items : [me.centerPanel, me.buttonPanel]
        });
        me.callParent(arguments);
    },
    
    initParam:function(){
        var me = this;
        
        var displayPanel = me.createRegionPanel();
        me.centerPanel.removeAll();
        me.centerPanel.add(displayPanel);
    },
    
    initStore:function(){
        var me = this;
        
        me.startStore = new Ext.data.Store({
            proxy: new Ext.data.proxy.Ajax({
                url: PROCESS_PATH_GLOBAL_ACTION + 'changeMasterListEPNumber.action',
                reader: {
                    type: 'json',
                    totalProperty: 'total'
                },
                timeout: 600000,
                getMethod: function () {
                    return 'POST';
                }
            }),
            model: 'PM.model.MasterEvent'
        });
        
        me.store = Ext.create('Ext.data.Store', {
              model    :'ChangeProtocolPositionModel' ,
              proxy : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'checkChangePositionAction.action',
                getMethod   : function(){
                    return 'GET';
                },
                reader : {
                    type : 'json',
                }
            })
        });
        
        /*me.cancelStore = new Ext.data.Store({
            model : 'ChangeProtocolPositionModel',
            proxy : new Ext.data.proxy.Ajax({
                url : PROCESS_PATH_GLOBAL_ACTION + 'cancelChangePosition.action',
                reader : {
                    type : 'json',
                    totalProperty : 'total',
                    root : 'result'
                },
                getMethod : function() {
                    return 'POST';
                }
            })
        });*/

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
            me.checkProcess();
        });
        
        me.store.on("load",function(){
            me.pushData();
        });
        
        /*me.cancelStore.on("load",function(){
        });*/
        
    },
    
    createRegionPanel:function(){
        var me = this;
        
        var columnWidth = 360;
        me.name = stringSetting.protocol_position.label.label_changing;
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
        
        if(me.store.getCount()>0){
            var approveStore  = me.store.getAt(0);
                
            if(approveStore.get("flag")){
                if( approveStore.get("finish") ){
                    me.updateCenterRegion.stop();
                    if (approveStore.get("errorList") && approveStore.get("errorList").length > 0) {
                        var errorList = [];
                        var resultErrorList = [];
                        resultErrorList = approveStore.get("errorList");
                        for (var i = 0; i < resultErrorList.length; i++) {
                            errorList.push(resultErrorList[i].protocolname + '(' + resultErrorList[i].epno + ')');
                        }
                        var errormessage = Ext.clone(stringSetting.error.ERR0042);
                        errormessage.details = errormessage.details.format(errorList.join('<br>'));
                        var _message = Ext.create('PM.view.common.window.Message', {
                            errorDetail: errormessage
                        });
                        _message.showWin();
                    } else {
                        me.succeedChange(approveStore);
                    }

                    setTimeout(
                        function(){
                            me.parentPanel.finishSave();
                            me.close();
                        },
                        2000
                    );
                    return ;
                }
                
                me.name = approveStore.get("name");
                me.currentNumber = approveStore.get("currentNumber");
                me.totalNumber = approveStore.get("totalNumber");
                me.initParam();
            }
        }
    },
    
    checkProcess:function(){
        var me = this;
        me.store.load();
    },
    
    succeedChange:function(approveStore){
        var me = this;
        
        var showMessage = null;
        /*if(approveStore.get("cancel")){
            showMessage = stringSetting.app_setting.label.cancel;
        }else{
            showMessage = stringSetting.app_setting.label.succeed;
        }*/
        showMessage = stringSetting.protocol_position.label.succeed;
        
        var labelFinish = {
            xtype:'label',
            height: 60,
            width: 500,
            style:'color:#1E3246; font-size:13pt; padding-top:20px;',
            text: showMessage,
        };
        
        var closePanel = Ext.create('Ext.panel.Panel',{
            height        : 60,
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            bodyStyle     : 'background:#EDF0F7;',
            layout: {
                     type:'hbox',    
                     align:'middle',
                     pack : 'end'
                 },
            items:[labelFinish]
        });
        
        me.centerPanel.removeAll();
        me.centerPanel.add(closePanel);
        
        /*setTimeout(
            function(){
                me.parentPanel.finishSave();
                me.close();
            },
            2000
        );*/
    },
    
    cancelApprove:function(){
        
    }
});
