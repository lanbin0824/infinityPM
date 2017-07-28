/*!
 * JS Click Panel 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.userspecifiedname.ItemView
 * @extends PM.view.ClickPanelView
 */
 
Ext.define("PM.view.SpecificName.Item",
{
    extend: 'PM.view.panel.Click',
        
    minHeight   : 30,
    height      : 80,
    width       : 561,
    cls         : 'x-message-window',
    bodyCls     : 'x-message-window-body',
    
    txtName             : null,
    
    parentPanel         : null,
    
    panelLeft           : null,
    panelCenter         : null,
    panelRight          : null,
    softwareversion             : "",
    machineName         : "",
    canbeDeleted        : "",
    userspecifiedname   : "",
    modelName           : "",
    index               : 0,
    errorTip            : '',
        
    initComponent: function () {
        var me = this;  

        me.panelLeft = Ext.create('Ext.panel.Panel',
        { 
        	
            region  : 'west',
            width      : 300,
            cls        : 'panel-NoborderPadding-transparent',    
            bodyCls       : 'panel-message-body',
            defaults : {
                frame : false
            },
            layout: {
                type: 'border'
            },
            items: [
                {
                	margin  : '0 0 0 70',
                    region  : 'center',
                    layout: {
                        type: 'fit'
                    },
                    cls            : 'panel-NoborderPadding-transparent',    
                    bodyCls        : 'panel-message-body',
                    bodyStyle      : "padding-top:9px;",
                    html           : me.getModalityName()
                }
            ]

        });
        
        me.setNameItem();
        
        me.panelCenter = Ext.create('Ext.panel.Panel',
        { 
            region      : 'center',
            cls         : 'UserSpecific_Item_text',    
            bodyCls     : 'UserSpecific_Item_Body_Text',
            defaults : {
                frame : false
            },
            items:[me.txtName]

        });        
        
        me.panelRight = Ext.create('Ext.panel.Panel',
        { 
            region  : 'east',
            width      : 70,
            margin     :'8 0 0 0',
            cls        : 'panel-NoborderPadding-transparent',    
            bodyCls       : 'UserSpecific_Item_Body_Img',            
            defaults : {
                frame : false
            },
            layout: {
                type: 'fit'
            },
            html : me.getImg(ModalityIdentifyingImg.Error)
            
        });
        
 
         Ext.applyIf(me, {
            items:[
                me.panelLeft,
                me.panelCenter,
                me.panelRight               
            ]
        });
        this.callParent(arguments);
    },
    getImg    : function(err)
    {
        var _ary = new Array();
        _ary.push('<table onselectstart="return false" ');
        _ary.push('ondrag="return false" ');
        _ary.push('class = "UserSpecific-Item-Table">');
        _ary.push('<tr>');
        _ary.push('<td width="21">');
        _ary.push(err);
        _ary.push('</td>');
        _ary.push('</tr>');
        _ary.push('</table>');
        return _ary.join("");

    },
    setNameItem    : function()
    { 
        var me = this;
        me.txtName = Ext.create('PM.view.field.SearchText',
        {
        	margin     : '10 0 0 0',
            width      : 190,
            height     : 30,
            style      : '',
            bodyCls    : 'x-form-text',
            cls      : 'UserSpecific_Name_Text',
            emptyText: stringSetting.UserSpecificName.emptyText,
            dirtyCls : '',
            fieldCls : '',
            clearCls : '',
            componentCls    : '',
            noemptyCls : 'UserSpecific_Name_Text',  
            value : me.userspecifiedname,

            listeners:{
                'render': {    
                    fn: function( c ) {

                        c.getEl().on(
                            'keyup',
                            function() {
                                if (me.checkValidInput()) {
                                    me.checkRepeat();
                                }
                            }
                        );
                    },
                    scope: this
             
                },
                specialKey :function(field, e) {}
            }
        });        
    },
    checkRepeat : function()
    {
        var me = this;
        var el = me.getEl().dom.getElementsByClassName("UserSpecific_Img_Error");
        var _val = Ext.util.Format.trim(me.txtName.getRawValue());        
        
        if(_val == '')
        {
            if(el!= null &&
               el.length > 0)
            {
                el[0].style.display = 'none';
            }
            me.parentPanel.btnSave.setDisabled(false);
            return false;
        }
        
        if(me.parentPanel.arrayPanel != null &&
           me.parentPanel.arrayPanel.length > 0)
        {
            var _panels = me.parentPanel.arrayPanel;
            var isSame = false;
  
            
            if(_val.length > 40)
            {
                el[0].style.display = '';
                el[0].dataset.qtip = me.LimitationTip;
                me.parentPanel.btnSave.setDisabled(true);
                return true;
            }
            else if(_val.length > 20)
            {
                var len = 0;
                for(var i = 0;i < _val.length;i++)
                {
                    if(IsUnicode(_val[i]))
                    {
                        len += 2;
                    }
                    else
                    {
                        len++;
                    }
                    if(len > 40)
                    {
                        el[0].style.display = '';
                        el[0].dataset.qtip = me.LimitationTip;
                        me.parentPanel.btnSave.setDisabled(true);
                        return true;
                    }
                }
            }
            
            for(var i = 0;i < _panels.length;i++)
            {
                if(_panels[i].index != me.index &&
                   _val == _panels[i].txtName.getRawValue())
                {
                    isSame = true;
                }
            }
            if(isSame)
            {
                el[0].style.display = '';
                el[0].dataset.qtip = me.errorTip;
                me.parentPanel.btnSave.setDisabled(true);
                return true;
            }

            el[0].style.display = 'none';
            me.parentPanel.btnSave.setDisabled(false);
            return false;
        }                                

    },
    getModalityName : function()
    {
        var _ary = new Array();
        _ary.push('<table onselectstart="return false" ');
        _ary.push('ondrag="return false" ');
        _ary.push('class = "UserSpecific-Item-Table">');
        _ary.push('<tr>');
                        
        _ary.push('<td class = "UserSpecific-Item-Td" ');
        if(getStringRealWidth('13pt', this.machineName) > 225)
        {
            _ary.push('data-qtip="');
            _ary.push(Ext.util.Format.htmlEncode(this.machineName));
            _ary.push('" ');
        } 
        _ary.push(' >');
        
        _ary.push('<span class= "UserSpecific_Name_Span">');
        _ary.push(this.machineName);
        _ary.push('</span>');
        _ary.push('</td>');
        _ary.push('</tr>');
        
        _ary.push('<tr>');
        _ary.push('<td class = "UserSpecific-Item-Td" ');
        
        if(getStringRealWidth('12pt', this.modelName) > 225)
        {
            _ary.push('data-qtip="');
             _ary.push(Ext.util.Format.htmlEncode(this.modelName));
             _ary.push('" ');
        } 
        _ary.push(' >');
        
        _ary.push('<span class= "UserSpecific_OtherName_Span">');
        _ary.push(this.modelName);
        _ary.push('</span>');
        _ary.push('</td>');
        _ary.push('</tr>');
        
        _ary.push('<tr>');
        _ary.push('<td class = "UserSpecific-Item-Td" ');
        
        if(getStringRealWidth('12pt', this.softwareversion) > 225)
        {
            _ary.push('data-qtip="');
             _ary.push(Ext.util.Format.htmlEncode(this.softwareversion));
             _ary.push('" ');
        } 
        _ary.push(' >');
        
        _ary.push('<span class= "UserSpecific_OtherName_Span">');
        _ary.push(this.softwareversion);
        _ary.push('</span>');
        _ary.push('</td>');
        _ary.push('</tr>');

        _ary.push('</table>');
        return _ary.join('');
    },

    checkValidInput: function(){
        var me = this;
        var valid = false;
        var el = me.getEl().dom.getElementsByClassName("UserSpecific_Img_Error");
        var _val = Ext.util.Format.trim(me.txtName.getRawValue());
        if (/^[\w\-\s]+$/.test(_val) || _val === "") {
            valid = true;
            el[0].style.display = 'none';
            me.parentPanel.btnSave.setDisabled(false);
        } else {
            valid = false;
            el[0].style.display = '';
            el[0].dataset.qtip = getErrorTipMsg(stringSetting.error.ERR50013);
            me.parentPanel.btnSave.setDisabled(true);            
        }
        return valid;
    },

});