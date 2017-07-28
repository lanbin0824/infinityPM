/*!
 * JS display setting view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Ext.define('PM.view.Setting.ProtocolShareSettingView', {
    extend        : 'PM.view.common.window.ModalDialog',
    layout        : {
         type  : 'border'
    },
    cls           : 'x-Confirm-window',
    minWidth      : 300,
    minHeight     : 100,
    width         : 700,
    height        : 160,
    bodyBorder    : false,
    border        : false,
    closable      : false, 
    modal         : true,
    frame         : false,
    resizable     : false,
   
    padding        : 0,
    bodyPadding    : 0,
    title          : null,
    groupList      : null,
    centerPanel    : null,
    buttonPanel    : null,
    sharemodel     : null,
    sharetype      : null,
    store          : null,

    initComponent : function() {
        var me = this;
        
        me.initStore();
        if(me.sharemodel == "false"){
            me.sharemodel = "False";
        }else{
            me.sharemodel = "True";
        }
        
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height      : 32,
            width       : 118,
            cls         : 'icon-button',
            overCls     : 'icon-button-over',
            pressedCls  : 'icon-button-pressed',
            focusCls    : 'icon-button-focus',
            disabledCls : 'icon-button-disable',

            text        : '<span class="SpanTextView">'
                        + stringSetting.app_setting.button.apply
                        + '<span>',
            disabled    : false,            
            handler     : function() {    
                var result = null;
                if( me.groupList.getSelectValue() == "False" ){
                    result = "false";
                }else{
                    result = "true";
                }
                
                var typevalue = AppSettingShareModelArray[me.sharetype];
                
                me.store.load({
                    params : {
                        sharemodel : result,
                        sharetype  : typevalue
                    }
                });
            }
        });

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
                            me.closeWin();
                        
                    }
                });

        me.buttonPanel = Ext.create('Ext.panel.Panel', {
            region     : 'south',
            height     : 60,
            minHeight  : 60,
            maxHeight  : 60,
            layout     : 'fit',
            cls        : 'panel-NoborderPadding',
            bodyCls    : 'button-Color-NoborderPadding',
            layout     : {
                type      : 'hbox',
                padding   : '0 0 0 0',
                align     : 'middle',
                pack      : 'end'
            },
            defaults   : {
                padding   : '0 0 0 0',
                margins   : '0 8 0 0'
            },
            items      : [{
                        id        : 'validation_panel_id',
                        html      : '<div id="validationid"><div>',
                        width     : 200,
                        height    : 20,
                        //bodyStyle : 'background-color:#D1DFF5;border:0;float:right;'
                        bodyCls   : 'Console-Setting-error-panel',
                    }, me.btnOKConfirm, me.btnCancelConfirm]
        });
        
        me.groupList = Ext.create('PM.view.combox.DropdownListView', {
            width    : 259,
            defaultValue:me.sharemodel
        });
        
        var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
            width        : 255,
            height       :32,
            indexCombox  : 0,
            menuValue    : 'True'
        });
        me.groupList.getMenu().add(_item);
        
        var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
            width         : 255,
            height        : 32,
            indexCombox   : 1,
            menuValue     : 'False'
        });
        me.groupList.getMenu().add(_item);
        
        me.groupList.setSelectValue(me.sharemodel);
    
        me.centerPanel=Ext.create('Ext.panel.Panel',{
            baseCls       : 'x-plain',
            bodyPadding   : 15,
            bodyCls       : 'panel-comfirm-center',
            region        : 'center',
            height        :60,
            layout        : 'hbox',
            items         :[{
                cls            : 'panel-NoborderPadding',
                bodyCls        : 'grid-Color-NoborderPadding',
                width          :350,
                html           :'<span class="group-text">'
                        + this.labelText
                        + ':</span>'
                        },me.groupList]
        });

        Ext.applyIf(me, {
                    items : [me.centerPanel, me.buttonPanel]
                });
        me.callParent(arguments);

    },
    
    initStore : function(){
        var me = this;
        
        me.store = Ext.create('Ext.data.Store', {
              model    :'PM.model.AppSetting' ,
              proxy    : new Ext.data.proxy.Ajax({
                type        : 'ajax',
                url         : PROCESS_PATH_GLOBAL_ACTION + 'setProtocolShareSetting.action',
                getMethod   :  function(){
                    return 'POST';
                },
                reader : {
                    type : 'json',
                }
            })
        });
        
        
        me.store.on("load",function(){
            if( me.store.getCount() > 0 ){
                me.closeWin();
                
                var isSucceed = me.store.getAt(0).get("flag");
                
                if (isSucceed) {
                    if(me.groupList.getSelectValue() == 'True'){
                        me.setMemoryShareValue(true);
                    }else{
                        me.setMemoryShareValue(false);
                    }
                    
                    me.parentPanel.initParam();
                }
            }
        });
    },
    
    setMemoryShareValue : function(res){
        var me = this;
        
        if(me.sharetype == 0){
            //memoryProtocolShare = res;
        }else if(me.sharetype == 1){
            memoryProtocolRpids = res;
        }else if(me.sharetype == 2){
            memoryReferenceShare = res;
        }
    }
});