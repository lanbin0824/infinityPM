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

Ext.define('PM.view.Setting.ConsoleConfirmView', {
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
    settingname          : null,
    oldStoreData         : null,
    newStoreData         : null,
    saveListDate         : new Array(),
    warningText1         : null,
    warningText2         : null,
    option               : null,
    doSomething			 : '',
    dest			 : '',
    source			 : '',
    responseObj			 : null,
    initComponent : function() {
        var me = this;
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
            	if(me.doSomething == 'wheatherSave'){
	            	me.parentPanel.okOption();
	            }else if(me.doSomething == 'wheatherMove'){
	            	if(me.dest){
	            		if(me.source){
	            			me.parentPanel.title_select = stringSetting.app_setting.title.move;
	            			me.parentPanel.setConsoleState('continue',true,me.responseObj);
	            		}else{
	            			me.parentPanel.title_select = stringSetting.app_setting.title.title_select;
	            			me.parentPanel.setConsoleState('continue',false);
	            		}
	            	}else{
	            		var confirm = Ext.create('PM.view.Setting.ConsoleConfirmView', {
		                    parentPanel : me.parentPanel
		                });
		                var text1 = stringSetting.app_setting.message.console_not_taken_over_histories;
		                confirm.sendParam(text1,stringSetting.app_setting.message.delete_continue,'wheatherContinue',me.responseObj);
		                confirm.show();
	            	}
	            }else if(me.doSomething == 'wheatherContinue'){
	            	me.parentPanel.title_select = stringSetting.app_setting.title.title_select;
	            	me.parentPanel.setConsoleState('continue',true,me.responseObj);
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
                    	if(me.doSomething == 'wheatherSave'){
//	                        me.parentPanel.parentPanel.initParam();
	                        me.parentPanel.close();
	                    }else if(me.doSomething == 'wheatherMove'){
			            	me.parentPanel.title_select = stringSetting.app_setting.title.move;
			            	me.parentPanel.setConsoleState('cancel',false);
			            }else if(me.doSomething == 'wheatherContinue'){
			            	me.parentPanel.title_select = stringSetting.app_setting.title.move;
			            	me.parentPanel.setConsoleState('cancel',false);
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
    initWin : function() {
        var me = this;
        me.panelConfirmCenter.removeAll(true);
        me.panelConfirmCenter.add({
                    xtype     : 'label',
                    region    : 'north',
                    forId     : 'myFieldId',
                    cls       : 'setting-text',
                    text      : me.warningText1,
                    margin    : '0 0 5 10'
                }, {
                    region    : 'center',
                    xtype     : 'label',
                    forId     : 'myFieldId',
                    cls       : 'setting-text',
                    text      : me.warningText2,
                    margin    : '15 0 0 10'
                });
    },
    sendParam : function(warningText1, warningText2, doSomething, responseObj) {
        this.warningText1 = warningText1;
        this.warningText2 = warningText2;
        this.doSomething = doSomething;
        this.responseObj = responseObj;
        if(responseObj){
        	this.dest = responseObj.dest;
            this.source = responseObj.source;
        }        
        this.initWin();
        this.setWidth(655);
        this.setHeight(210);
    }
});
