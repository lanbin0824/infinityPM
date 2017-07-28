/*!
 * JS Menul View
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.combox.ComboxMenuView
 * @extends Ext.menu.Menu
 */
Ext.define("PM.view.combox.ComboxMenuView",
{
    extend          : 'Ext.menu.Menu',
    alias           : 'widget.menu',
    cls             : 'panel-NoborderPadding-transparent',
    bodyCls         : 'panel-NoborderPadding-transparent',
    plain           : true,
    shadow          : false,
    showSeparator   : false,
    padding         :0,

    itemEl        : null,
    parentPanel    : null,
    initComponent: function () { 
        var me = this;
        me.itemEl = new Array();
         
        me.callParent(arguments);
    },
    setZIndex: function(index) {
        var me = this;
        me.el.setZIndex(index + 100);  

        index += 10;
        
        if (me.floatingDescendants) {
            index = Math.floor(me.floatingDescendants.setBase(index) / 100) * 100 + 10000;
        }
        return index;
    },
    add: function (key, o) { 
        var me = this;
        key.setParent(me);
        me.itemEl.push(key);
        me.callParent(arguments);
    },
    getItemData: function (index) { 
        var me = this;
        if(me.itemEl == null || me.itemEl.length <= index)
        {
            return null;
        }
        return me.itemEl[index];
    },
    clearChecked: function () { 
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                me.itemEl[i].setChecked(false);
            }            
        }
    },
    getSelectValue: function () { 
        var me = this;
        var ret = "";
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(me.itemEl[i].isChecked())
                {
                    ret = me.itemEl[i].getMenuValue();
                    break;
                }
            }            
        }
        return ret;
    },
    getParent:function()
    {
        return this.parentPanel;
    },
    setSelectIndex:function(index)
    {
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(i == index)
                {
                    me.itemEl[i].setChecked(true);
                    break;
                }
            }            
        }
    },
    setSelectByKey:function(key)
    {
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(me.itemEl[i].key == key)
                {
                    me.itemEl[i].setChecked(true);
                    break;
                }
            }            
        }
    },
    getSelectIndex:function()
    {
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(me.itemEl[i].isChecked())
                {
                    return i;
                }
            }            
        }
        return 0;
    },
    getSelectKey:function()
    {
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(me.itemEl[i].isChecked())
                {
                    return me.itemEl[i].key;
                }
            }            
        }
        return 0;
    },
    setSelectValue:function(val)
    {
        var me = this;
        if(me.itemEl != null &&
           me.itemEl.length > 0)
        {
            var _count = me.itemEl.length;
            for(var i = 0;i < _count;i++)
            {
                if(val == me.itemEl[i].getMenuValue())
                {
                    me.itemEl[i].setChecked(true);
                    break;
                }
            }            
        }
    },
    hide : function()
    {
        this.setX(0);
        this.setY(0);
        this.callParent(arguments);  
    },
    show : function()
    {
        this.callParent(arguments);  
        menuShowMemory = this;
    },
    setVerticalPosition: function() {
        var me = this,
            max,
            y = me.getY(),
            returnY = y,
            height = me.getHeight(),
            viewportHeight = Ext.Element.getViewportHeight().height,
            parentEl = me.el.parent(),
            viewHeight = parentEl.getViewSize().height,
            normalY = y - parentEl.getScroll().top; 

        parentEl = null;

        var _clientH = document.documentElement.clientHeight;
        if(viewHeight > _clientH)
        {
            viewHeight = _clientH; 
        }
        if (me.floating) {
            max = me.maxHeight ? me.maxHeight : viewHeight - normalY;
            if (height > viewHeight) {
                returnY = y - normalY;
            } else if (max < height) {
                returnY = y - (height - max);
            } else if((y + height) > viewportHeight){ 
                returnY = viewportHeight - height;
            }
        }
        me.setY(returnY);
    },
    removeAllItems : function()
    {
        this.itemEl = new Array();
        this.removeAll();
    }
});