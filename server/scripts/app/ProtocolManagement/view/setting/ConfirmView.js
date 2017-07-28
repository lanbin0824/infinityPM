/*
 * ! JS Console ConfirmView 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights 
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.Setting.ConsoleConfirmView
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.Setting.ConfirmView', {
    extend               : 'PM.view.common.window.ModalDialog',
    layout               : {
        type    : 'border'
    },
    cls                  : 'x-Confirm-window',
	modal                : true,
    okURL                : null,
    store                : null,
    storeData            : new Array(),
    protocolPoolName     : null,
    title                : null,
    btnOKConfirm         : null,
    btnCancelConfirm     : null,
    panelConfirmCenter   : null,
    panelConfirmSouth    : null,
    panelConfirmButton   : null,
    
    warningText1         : null,
    warningText2         : null,
    option               : null,
    parentPanel			 : null,
    
    source				 : false,
    dest				 : false,
    modifyParamsStr		 : '',
    
    step1				 : '',
    
    modifyConsoleSettingStore : null,
    doSomething 		 : '',
    settingname			 : '',
    checkMovingStore	: null,
    moveArray			: [],
    setConsole			: '',
    
    initComponent : function() {
        var me = this;
        me.initStore();
        me.title = stringSetting.comments.title_confirm;
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height         : 32,
            width          : 118,
            cls            : 'icon-button',
            overCls        : 'icon-button-over',
            pressedCls     : 'icon-button-pressed',
            focusCls       : 'icon-button-focus',
            disabledCls    : 'icon-button-disable',
            text           : '<span class="SpanTextView">'+stringSetting.app_setting.button.ok+'<span>',
            disabled       : false,
            handler        : function() {
            	if(me.doSomething == 'wheatherMove'){
            		var modifyConsoleStr = '';
        			for(var i=0;i<me.moveArray.length;i++){
        				modifyConsoleStr +=  me.moveArray[i].data.machinename + "," +
        								 "" + "," +
        								 me.moveArray[i].data.settingname + "," +
        								 me.settingname + ',' +
        								 "move";
        				if(i != me.moveArray.length - 1){
        					modifyConsoleStr += "%,%";
        				}
            		}
        			if(me.modifyParamsStr != ''){
        				modifyConsoleStr = me.modifyParamsStr + '%,%' + modifyConsoleStr;
        			}
        			me.modifyConsoleSettingStore.requestSend({
				            params: 
				            {
				                modifyParamsStr    : modifyConsoleStr
				            }
				       });
        			
        			
            	}else if(me.doSomething == 'wheatherContinue'){
            		me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
            		me.startMove();
            	}
            	me.close();
            }
        });

        me.btnCancelConfirm = Ext.create('Ext.Button', {
                    height         : 32,
                    width          : 118,
                    cls            : 'icon-button',
                    overCls        : 'icon-button-over',
                    pressedCls     : 'icon-button-pressed',
                    focusCls       : 'icon-button-focus',
                    disabledCls    : 'icon-button-disable',
                    text           : '<span class="SpanTextView">'+stringSetting.app_setting.button.cancel+'<span>',
                    disabled       : false,
                    handler        : function() {
                    	if(me.doSomething == 'wheatherAdd'){
                    		if(me.modifyParamsStr != ''){
		                    	me.modifyConsoleSettingStore.requestSend({
						            params: 
						            {
						                modifyParamsStr    : me.modifyParamsStr
						            }
						       });
					       }
                    	}else if(me.doSomething == 'wheatherContinue'){
		            		me.setScannerMovedStore.requestSend({params:{feedback:'cancel'}});
		            		me.checkMovingTask.stop();
		            	}
                        me.close();
                    }
                });
                
        me.panelConfirmButton = Ext.create('Ext.panel.Panel', {
                    region       : 'south',
                    height       : 60,
                    minHeight    : 60,
                    maxHeight    : 60,
                    layout       : 'fit',
                    cls          : 'panel-NoborderPadding',
                    bodyCls      : 'button-Color-NoborderPadding',
                    layout       : {
                        type         : 'hbox',
                        padding      : '0 0 0 0',
                        align        : 'middle',
                        pack         : 'end'
                    },
                    defaults     : {
                        padding      : '0 0 0 0',
                        margins      : '0 8 0 0'
                    },
                    items        : [{
                                id           : 'validation_panel_id',
                                html         : '<div id="validationid"><div>',
                                width        : 200,
                                height       : 20,
                                bodyStyle    : 'background-color:#D1DFF5;border:0;float:right;'
                                //bodyCls      : 'Console-Setting-error-panel',
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
                        frame    : false
                    },
                    layout        : 'border',
                    html          : ''
                });

        Ext.applyIf(this, {
                    items    : [me.panelConfirmCenter, me.panelConfirmButton]
                });
        this.callParent(arguments);
    },
    initStore : function(){
    	var me = this;
        
        me.checkMovingStore = Ext.create('PM.data.Ajax',
		        {
		            url: ConsoleSettingUrl.checkMovingHistoryWithScanner,
		            method      : "POST",
		            loadData: function(responseObj)
		            {
		                me.checkMoving(responseObj);
		            }
		        });
        
        me.modifyConsoleSettingStore = Ext.create('PM.data.Ajax',
		        {
		            url: ConsoleSettingUrl.modifyConsoleSetting,
		            method      : "POST",
		            loadData: function(responseObj)
		            {
		                me.doMoving(responseObj);
		            }
		        });
		me.setScannerMovedStore = Ext.create('PM.data.Ajax',
		        {
		            url: ConsoleSettingUrl.setScannerMoved,
		            method      : "POST",
		        });
    },
    checkMoving:function(responseObj){
    	var me = this;
    	if(responseObj.allfinish){
    		me.checkMovingTask.stop();
    		if(responseObj.errorlist && responseObj.errorlist != ''){
    			var _message = Ext.create('PM.view.common.window.Message', {
	               errorDetail        : stringSetting.error['1'],
	            });
	            _message.show();
	            me.close();
    		}
    	}else{
    		if(responseObj.flag == 1 && responseObj.dest){
    			me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
    			me.startMove();
    		}else if(responseObj.flag == 1 && !responseObj.dest){
    			var _confirm = Ext.create('PM.view.Setting.ConfirmView', {
			        parentPanel 	: me.parentPanel,
			    });
    			_confirm.sendParam(
								stringSetting.app_setting.message.console_not_taken_over_histories,
								stringSetting.app_setting.message.delete_continue,'','wheatherContinue',
								me.settingname,me.moveArray);
				_confirm.show();
    		}else if(responseObj.flag == 2){
    			me.startMove();
    		}
    	}
    },
    doMoving:function(responseObj){
    	var me = this;
    	if(responseObj.flag){
    		function taskFunction(){
                me.checkProcess();
            }
			var runner = new Ext.util.TaskRunner();
			me.checkMovingTask = runner.newTask({
                 run: taskFunction,
                 interval: 1000
            });
            me.checkMovingTask.start();
    		
    	}
    },
    checkProcess:function(){
    	var me = this;
    	me.checkMovingStore.requestSend({params:{}});
    },
    startMove : function(){
    	var me = this;
    	
    	var move_begin = new Date().getTime();        
        var move = Ext.create('PM.view.Setting.MovingConfirmView', {
            parentPanel : me.parentPanel,
            move_begin: move_begin
        });
        move.show();
    	me.close();
    },
    initWin : function() {
        var me = this;
        me.panelConfirmCenter.removeAll(true);
        me.panelConfirmCenter.add({
                    xtype     : 'label',
                    region    : 'north',
                    forId     : 'myFieldId',
                    cls       : 'setting-text',
                    text      : me.warningText1,
                    margin    : '0 0 0 10'
                }, {
                    region    : 'center',
                    xtype     : 'label',
                    forId     : 'myFieldId',
                    cls       : 'setting-text',
                    text      : me.warningText2,
                    margin    : '5 0 0 10'
                });
    },
    sendParam : function(warningText1, warningText2,modifyParamsStr,doSomething,settingname,moveArray) {
    	
        this.warningText1 = warningText1;
        this.warningText2 = warningText2;
        this.modifyParamsStr = modifyParamsStr;
        this.doSomething = doSomething;
        this.settingname = settingname;
        this.moveArray = moveArray;
        
        this.initWin();
        this.setWidth(555);
        this.setHeight(180);
    }
});
