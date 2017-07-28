/*!
 * JS MessageView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.UserSpecificName.DialogView
 * @extends PM.view.window.ModalWinView
 */

Ext.define('PM.view.SpecificName.Dialog', {
    extend          : 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    cls             :'x-message-window',
    bodyCls         :'x-message-window-body',
    minWidth        : 400,
    minHeight       : 600,
    width           : 580,
    height          : 608,
    modal           : true, 
   
    title               : "Modality Identifying Name",    
    
    btnClose            : null,
    btnSave             : null,
    panelTable          : null,
    panelButton         : null,
    panelCenter         : null,
    
    storeGet            : null,
    storeSave           : null,
    storeDel            : null,
    storeGetData        : [],
    arrayPanel          : [],
    
    TOKEN_PERCENT       : '%,%',
    errorTip            : '',
    LimitationTip       : '',   
    
    initComponent: function() {
        var me = this;        
        
        me.title = stringSetting.UserSpecificName.title;
        
        me.errorTip = getErrorTipMsg(stringSetting.error.ERR0020);
        
        me.LimitationTip = getErrorTipMsg(stringSetting.error.ERR0021);
        
        // create the ModalityIdentifierModel store  
        me.storeGet = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getmodalityidentiferlist.action',
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
            model: 'PM.model.ModalityIdentifier'
        });  
       
        me.storeGet.on("load",function()
        {

            for(var i = 0;i < me.storeGet.getCount();i++)
            {
                if(me.storeGet.getAt(i).get("key") == "errmessage")
                {
                    var _msg = me.storeGet.getAt(i).get("errmessage");
                    if(_msg != "")
                    {                        
                        if(_msg[0] != null)
                        {
                            me.close();
                            var _message = Ext.create('PM.view.common.window.Message',{
                                errorDetail : stringSetting.error[_msg[0].message]
                            });
                            _message.showWin();                            
                            return;
                        }
                    }
                }
            }
        
            me.pushData();

            me.panelUpdate();
        });
     
        me.storeSave = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'savemodalityidentiferlist.action',
                getMethod : function() {
                    return 'POST';
                },
                reader:
                {
                    type: 'json'           
                }
            }),
            model: 'PM.model.SaveErrMessage'
        });  
        
        me.storeSave.on("load",function()
        {
            me.close();
            
            var ret = me.storeSave.getAt(0);
            if(ret != null)
            {
                if(ret.get("errmessage") == "" || 
                   ret.get("errmessage").length == 0)
                {
                    me.OKLoad();    
                }
                else
                {
                    var _msg = ret.get("errmessage")[0].message;
                    if(_msg != "")
                    {
                        var _message = Ext.create('PM.view.common.window.Message',{
                            errorDetail : stringSetting.error[_msg]
                        });
                        _message.showWin();    
                    }
                }
            }      
        }); 
  
        
        me.btnClose = Ext.create('Ext.Button', {
            height: 32,
            width:118,
            cls : 'icon-button',
            overCls : 'icon-button-over',
            pressedCls : 'icon-button-pressed',
            focusCls : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text : '<span class="SpanTextView">' + stringSetting.UserSpecificName.button.close + '<span>',
            disabled : false,
            handler : function() {
                me.close();
            }
        });
        
        me.btnSave = Ext.create('Ext.Button', {
            height: 32,
            width:118,
            cls : 'icon-button',
            overCls : 'icon-button-over',
            pressedCls : 'icon-button-pressed',
            focusCls : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text : '<span class="SpanTextView">' + stringSetting.UserSpecificName.button.save + '<span>',
            disabled : false,
            handler : function() {
                var _machinename = [];
                var _userspecificname = [];
           
                var checkRepeat = -1;
                for(var i = 0;i < me.storeGetData.length;i++)
                {
                    if (!me.arrayPanel[i].checkValidInput()) {
                        return;
                    }
                    _machinename.push(me.storeGetData[i].machinename);  
                    var txtNameValue = me.arrayPanel[i].txtName.getRawValue()
                    if(txtNameValue != null)
                    {
                        _userspecificname.push(Ext.util.Format.trim(txtNameValue));
                    }
                    else
                    {
                        _userspecificname.push("");
                    }
                    if(me.arrayPanel[i].checkRepeat())
                    {
                        if(checkRepeat == -1)
                        {
                            checkRepeat = i;                            
                        }
                    }
                }
                if(checkRepeat >= 0)
                {
                    var tableEl = me.panelTable.body.dom;
                    if(tableEl != null)
                    {
                        tableEl.scrollTop = checkRepeat * 80;
                    }
                    return;
                }               
      
                me.storeSave.load({
                    params: {
                        machinename:_machinename.join(me.TOKEN_PERCENT),                       
                        userspecificname:_userspecificname.join(me.TOKEN_PERCENT)
                    }
                });
            }
        });
                  //
        me.panelButton = Ext.create('Ext.panel.Panel', {         
            region      : 'south',
            height      : 50,
            minHeight   : 50,
            maxHeight   : 50,
            layout      : 'fit',
            cls            : 'panel-NoborderPadding-transparent',    
            bodyCls       : 'button-Color-NoborderPadding',
            layout: {
                type:'hbox',
                padding:'0 0 0 0',        
                align:'middle',
                pack:'end'
            },
            defaults:
            {            
                padding:'0 0 0 0',
                margins:'0 15 0 0'
            },
               items:[
                   me.btnSave,
                   me.btnClose
               ]
        });    
                
        me.panelTable = Ext.create('Ext.panel.Panel',
        {
            cls         : 'panel-NoborderPadding-transparent',    
            bodyCls     : 'UserSpecific-panel-ScrollBorder-NoPadding',    
            region      : 'center',
            layout      : 'column',
            items       : []
        });
                
        me.panelCenter = Ext.create('Ext.panel.Panel',
        {
            region  : 'center',
            cls        : 'panel-NoborderPadding-transparent',    
            bodyCls       : 'panel-message-body',
            defaults : {
                frame : false
            },
            layout: {
                type: 'border'
            },
            items : [
                me.panelTable
            ]

        });
        
        Ext.applyIf(me, {
            items:[
                me.panelCenter,
                me.panelButton               
            ]
        });
        me.callParent(arguments);   
        
        me.storeLoad();
//      me.panelUpdate();
    },
    storeLoad : function()
    {

        this.storeGet.load();
    },
    panelUpdate : function ()
    {
        this.panelTable.removeAll();
        this.arrayPanel = new Array();

        for(var i = 0;i < this.storeGetData.length;i++)
        {
            this.arrayPanel.push(
                Ext.create('PM.view.SpecificName.Item', {
                    LimitationTip       : this.LimitationTip,
                    errorTip            : this.errorTip,
                    machineName         : this.storeGetData[i].machinename,
                    modelName           : this.storeGetData[i].modelname,
                    softwareversion     : this.storeGetData[i].softwareversion,
                    systemname          : this.storeGetData[i].systemname,
                    userspecifiedname   : this.storeGetData[i].userspecifiedname,
                    parentPanel         : this,
                    index:i

                })        
            );            
        }
        this.panelTable.add(this.arrayPanel);
    },
    pushData : function ()
    {
        this.storeGetData = new Array();
        for(var i = 0;i < this.storeGet.getCount();i++)
        {
            if(this.storeGet.getAt(i).get("key") == "list")
            {
                this.storeGetData.push({
                    key: this.storeGet.getAt(i).get("key"),
                    errmessage: this.storeGet.getAt(i).get("errmessage"),
                    machinename: this.storeGet.getAt(i).get("machinename"),
                    modelname: this.storeGet.getAt(i).get("modelname"),
                    softwareversion: this.storeGet.getAt(i).get("softwareversion"),
                    systemname: this.storeGet.getAt(i).get("systemname"),
                    userspecifiedname: this.storeGet.getAt(i).get("userspecifiedname")
                });
            }
        }
    },    
    
    OKLoad : function ()
    {
        return;
    }
});