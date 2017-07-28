/*!
 * JS Menul View
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.menu.Menu
 * @extends Ext.menu.Menu
 */
Ext.define("PM.view.menu.Menu",
{
    extend          : 'Ext.menu.Menu',
    alias           : 'widget.menu',
    cls             : 'panel-NoborderPadding-transparent',
    bodyCls         : 'panel-NoborderPadding-transparent',
    plain           : true,
    shadow          : false,
    showSeparator   : false,
    padding         : 0,

    itemEl          : null,
    parentPanel     : null,

    colorModel      : 'skyblue-noneselect',
    textAlign       : "center",

    initComponent: function () {
        var me = this;
        me.itemEl = new Array();

        me.callParent(arguments);
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

    showByMouse : function(winEvent, offsetX, offsetY) {
        var me = this;
        var _x = 0;
        var scrollY = window.scrollY === undefined ? window.pageYOffset : window.scrollY;
        var scrollX = window.scrollX === undefined ? window.pageXOffset : window.scrollX;
        var _w = document.documentElement.scrollWidth;
        var _y = winEvent.clientY + offsetY + scrollY;

        var mouse_x = winEvent.clientX + offsetX;
        if (_w - mouse_x < me.width) {
            _x = _w - me.width + scrollX - 10;
        }
        else {
            _x = mouse_x + scrollX;
        }
        if (_x < 1) {
            _x = 1;
        }
        me.showAt(_x, _y);
    },

    setVerticalPosition: function()
    {
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
    },

    createMenu:function(itemsArray, clickFn, mainPanel, config)
    {
        var me = this;
        if(itemsArray == null){
            return;
        }

        var tips = null;
        if(config != null){
            if(config.tips != null){
                tips = config.tips;
            }
        }

        for(var i = 0; i < itemsArray.length; i++)
        {
            var _tip = "";
            if(tips != null && tips.length > i)
            {
                _tip = tips[i];
            }
            var _item = Ext.create('PM.view.menu.MenuItem', {
                width           : me.width - 4,
                textAlign       : me.textAlign,
                colorModel      : me.colorModel,
                indexCombox     : i,
                menuValue       : itemsArray[i],
                mainPanel       : mainPanel,
                selectedFn      : clickFn[i],
                tipVal          : _tip
            });
            me.add(_item);
        }
    },
    showBy: function(cmp, pos, off) {
        var me = this,
            xy,
            region;

        if (me.floating && cmp) {
            me.layout.autoSize = true;

            // show off-screen first so that we can calc position without causing a visual jump
            me.doAutoRender();
            delete me.needsLayout;

            // Component or Element
            cmp = cmp.el || cmp;

            // Convert absolute to floatParent-relative coordinates if necessary.
            xy = me.el.getAlignToXY(cmp, pos || me.defaultAlign, off);
            if (me.floatParent) {
                region = me.floatParent.getTargetEl().getViewRegion();
                xy[0] -= region.x;
                xy[1] -= region.y;
            }
            xy[0] -= 10;
            me.showAt(xy);
        }
        return me;
    },
});