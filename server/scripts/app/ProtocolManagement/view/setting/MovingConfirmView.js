/*!
 * JS batch approving view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Ext.define('PM.view.Setting.MovingConfirmView', {
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
    reqErrStore      : null,
    name             : null,
    currentNumber    : null,
    totalNumber      : null,
    initdataa		 : null,
    updateCenterRegion    : null,
    title_select     :null,
    isAdd			 : false,
    scanner			 : '',
    errActionStatus  : {
            overview     : '',
            details      : '',
            details2     : ''
    },
    
//-------------------------------------
    request_date    : null,
    move_date    : null,
//-------------------------------------

    initComponent : function() {
        var me = this;
        
        me.title = me.title_select;
        me.errActionStatus = stringSetting.error.event.move;
        me.initStore();
        
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
        me.initParam();
        Ext.applyIf(me, {
                    items : [me.centerPanel]
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
        
        
        me.store = Ext.create('PM.data.Ajax',
		        {
		            url: ConsoleSettingUrl.checkMovingHistoryWithScanner,
		            method      : "POST",
		            loadData: function(responseObj)
		            {
		                me.checkMoving(responseObj);
		            }
		        });
        
        me.setScannerMovedStore = Ext.create('PM.data.Ajax',
		        {
		            url: ConsoleSettingUrl.setScannerMoved,
		            method      : "POST",
		        });
        me.startMove();
        
        
    },
    startMove:function(){
    	var me = this;
	    function taskFunction(){
            me.checkProcess();
        }
        var runner = new Ext.util.TaskRunner();
    
        me.updateCenterRegion = runner.newTask({
             run: taskFunction,
             interval: 200
        });

        me.updateCenterRegion.start();
    },
    
    createRegionPanel:function(){
        var me = this;
        
        var columnWidth = 360;
        me.name = stringSetting.app_setting.label.label_moving;
        me.name = me.name.format(me.scanner);
        var labelNameWidth = getStringRealWidth(styleGridTipGlobal,me.name);
        var percentValue = parseInt((me.currentNumber * 100)/me.totalNumber);
        var tipStr = '';
        if(columnWidth < labelNameWidth){
            tipStr = me.name;
        }
        
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
    
    checkMoving: function(responseObj){
        var me = this;
            
        if(responseObj.allfinish){
            me.updateCenterRegion.stop();
            //errlist
	            me.parentPanel.parentPanel.initParam();
	            me.succeedMove(true);
        }else{
        	if(responseObj.flag == 2){
	        	me.scanner = responseObj.scanner;
	        	me.name = responseObj.name;
	        	me.currentNumber = responseObj.currentNumber;
	        	me.totalNumber = responseObj.totalNumber;
	        	if(me.scanner != ''){
	        		me.initParam();
	        	}
	        	if(me.currentNumber == me.totalNumber){
	        		me.updateCenterRegion.stop();
	        		me.parentPanel.checkMovingTask.start();
	        		me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
	        		if(me.totalNumber != 0){
        				me.succeedMove();
        			}else{
        				me.parentPanel.updateBtn();
        				me.close();
        			}
	        	}
	        	
        	}else if(responseObj.flag == 3){
        		me.updateCenterRegion.stop();
        		me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
        		me.succeedMove();
        	}
        }
    },
    
    checkProcess:function(){
        var me = this;
        me.store.requestSend({params:{}});
    },
    
    
    succeedMove:function(isAllFinish){
        var me = this;
        var showMessage = '';
        if(me.isAdd){
        	showMessage = stringSetting.app_setting.message.add_successfully;
        }else{
        	showMessage = stringSetting.app_setting.message.move_successfully;
        }
        /*var labelFinish = {
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
        me.centerPanel.add(closePanel);*/
        me.currentNumber = 100;
        me.totalNumber = 100;
        me.initParam();
        me.parentPanel.updateBtn();
        setTimeout(
            function(){
            	if(isAllFinish){
            		me.closeWin();
            	}else{
	                me.close();
	            }
            },
            2000
        );
    },
    
});
