/*!
 * JS Menul View
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.combox.DropdownListView
 * @extends Ext.toolbar.Toolbar
 */

Ext.define("PM.view.combox.DropdownListView",
{
    extend              : 'Ext.toolbar.Toolbar',
    width               : 275,
    columnWidth         : 1,
    cls                 : 'DropdownListCls',
    height              : 32,
    layout              : 'fit',
    defaultValue        : '',
    textAlign           : "left",
    fontcss             : 'ComboxFont',
    menu                : null,
    item                : null,
    
    /* PUBLIC ATTRIBUTE BEGIN */
    colorModel        : '',        //skyblue
    /* PUBLIC ATTRIBUTE END */
    
    initComponent    : function () { 
        var me = this;                 
         
        if(me.menu == null)
        {
            me.menu = Ext.create('PM.view.combox.ComboxMenuView', {
                width:me.width,
                parentPanel : me
            });
        }

        var _baseCls = 'DropdownListView';
        if(me.colorModel != '')
        {
            _baseCls += '-' + me.colorModel;
        }
        me.item = {
            baseCls      : _baseCls,
            text        : me.LoadData(this.defaultValue),
            menu        : me.menu
        };
        Ext.applyIf(me, {
            items:me.item
        });
        
        me.callParent(arguments);
    },
    LoadData: function(val)
    {
        var array = new Array();
        
        var _style="text-align: " + this.textAlign + ";";
        
        array.push('<table class="combox-menu-table" width="' + (this.width - 24) + '">');
        array.push('<tr>');
        array.push('<td class = "combox-menu-td" style = "' + _style + '"');
        array.push(' height="'+ (this.height - 6) +'" >');
        array.push('<span class="'+this.fontcss+'">');
        array.push(val);
        array.push('</span>');
        array.push('</td>');
        array.push('</tr>');
        array.push('</table>');
        
        return array.join('');
    },
    setValue: function(val)
    {        
        var el = document.getElementById(this.items.get(0).id + '-btnInnerEl');
        if(el != null)
        {
            var span = el.getElementsByClassName(this.fontcss);
            
            if(span != null)
            {
                span[0].innerHTML = val;
            }
        }
    },
    /*public*/
    getMenu : function()
    {
        return this.menu;
    },
    /*public*/
    clearSelect: function()
    {
        this.getMenu().clearChecked();
        this.setValue("");
    },
    /*public*/
    getSelectValue: function()
    {
        return this.menu.getSelectValue();
    },
    /*public*/
    setSelectIndex: function(index)
    {
        this.clearSelect();
        this.menu.setSelectIndex(index);
        this.setValue(this.getSelectValue());
    },
    /*public*/
    setSelectByKey:function(key)
    {
        this.clearSelect();
        this.menu.setSelectByKey(key);
        this.setValue(this.getSelectValue());
    },
    /*public*/
    setSelectValue: function(val)
    {
        this.clearSelect();
        this.menu.setSelectValue(val);
        this.setValue(this.getSelectValue());
    },
    addItemObj: function(item)
    {
        this.menu.add(item);
    },
    removeAllItems : function()
    {        
        this.menu.removeAllItems();
    },
    combinedIconPanel:function(iconCls)
    {
        var iconPanel = Ext.create('Ext.panel.Panel',{
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : iconCls,
            width       : 30,
            height      : 30
        });
        
        var combined_panel = Ext.create('Ext.panel.Panel',{
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            layout      : {
                type   :'hbox',
                align  :'middle',
                pack   :'end'
            },
            items       : [iconPanel,this]
        });
        
        return combined_panel;
    },
    createMenu:function(itemsArray, clickFn, mainPanel, configs)
    {
        var me = this;
        if(itemsArray == null){
            return;
        }
        
        var tips = null;
        var config = null;
        var keys = null;
        if(configs != null){
            if(configs.tips != null){
                tips = configs.tips;
            }
            if(configs.keys != null){
                keys = configs.keys;
            }
            if(configs.config != null){
                config = configs.config;
            }
        }
    
        for(var i = 0; i < itemsArray.length; i++)
        {
            var _checked = false;
            var _tip = "";
            var _config = {};
            var _key = "";
            if(me.defaultValue == itemsArray[i])
            {
                _checked = true;
            }
            if(tips != null && tips.length > i)
            {
                _tip = tips[i];
            }
            if(keys != null && keys.length > i)
            {
                _key = keys[i];
            }
            if(config != null && config.length > i)
            {
                _config = config[i];
            }
            var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
                width           : me.width - 4,
                textAlign       : me.textAlign,
                colorModel      : me.colorModel,
                indexCombox     : i,
                menuValue       : itemsArray[i],
                mainPanel       : mainPanel,
                selectedFn      : clickFn,
                tipVal          : _tip,
                checked         : _checked,
                config          : _config,
                key             : _key
            });
            me.addItemObj(_item);
        }        
    },
    createMenuWithIcon:function(itemsArray, clickFn, iconArray, mainPanel, configs) {
        var me = this;
        if (itemsArray == null) {
            return;
        }

        var tips = null;
        var config = null;
        var keys = null;
        if (configs != null) {
            if (configs.tips != null) {
                tips = configs.tips;
            }
            if (configs.keys != null) {
                keys = configs.keys;
            }
            if (configs.config != null) {
                config = configs.config;
            }
        }

        for (var i = 0; i < itemsArray.length; i++) {
            var _checked = false;
            var _tip = "";
            var _config = {};
            var _key = "";
            if (me.defaultValue == itemsArray[i]) {
                _checked = true;
            }
            if (tips != null && tips.length > i) {
                _tip = tips[i];
            }
            if (keys != null && keys.length > i) {
                _key = keys[i];
            }
            if (config != null && config.length > i) {
                _config = config[i];
            }
            var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
                width: me.width - 4,
                textAlign: me.textAlign,
                colorModel: me.colorModel,
                indexCombox: i,
                menuValue: itemsArray[i],
                iconString: iconArray[i],
                mainPanel: mainPanel,
                selectedFn: clickFn,
                tipVal: _tip,
                checked: _checked,
                config: _config,
                key: _key
            });
            me.addItemObj(_item);
        }
    },
    getSelectIndex: function()
    {
        return this.menu.getSelectIndex();
    },
    getSelectKey: function()
    {
        return this.menu.getSelectKey();
    }
});