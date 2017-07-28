/*!
 * JS Menul View
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.menu.MenuItem
 * @extends Ext.menu.Item
 */

Ext.define("PM.view.menu.MenuItem",
{
    extend          : 'Ext.panel.Panel',
    height          : 30,
    width           : 255,
    layout          : 'fit',

    indexCombox     : 0,
    parentPanel     : null,
    styleTip        : styleMenuTipGlobal,
    textAlign       : "left",
    menuValue       : '---',
    tipVal          : '',
    cls             : 'panel-NoborderPadding',
    bodyCls         : 'menu-body-class',
    style           : 'margin-left:0px;',
        
    /* PUBLIC ATTRIBUTE BEGIN */
    colorModel      : '',        //skyblue
    mainPanel       : null,
    /* PUBLIC ATTRIBUTE END */
    
    initComponent: function () { 
        me = this;
        if(me.colorModel != '')
        {
            me.colorModel = '-' + me.colorModel;            
        }
        if(me.indexCombox == 0)
        {
            me.height = me.height + 1;
        }
        Ext.applyIf(me, {
            items:[{
                cls            : 'panel-NoborderPadding',
                bodyCls        : 'panel-NoborderPadding',
                html        : me.LoadData()        
            }]
        });               
        
        me.callParent(arguments);
        me.addEvents("click");
    },
    LoadData:function()
    {
        var me = this;

        var _html = new Array();
        _html.push('<table class="combox-menu-table" ');    
        if(me.indexCombox == 0)
        {
            _html.push('style = "border-top: 1px solid rgb(102, 116, 132) !important;"');
        }     
        _html.push('border="0" ');
        _html.push('width="'+ me.width +'" ');
        _html.push('height="'+ me.height +'">');
        _html.push('<tr class="menu-item' + me.colorModel + '-tr-class">');
        
        var _toolTips = '';
        if(me.tipVal != null && me.tipVal != '')
        {
            _toolTips = 'data-qtip="' +
                       me.tipVal +
                       '" ';
        }
        else if(getStringRealWidth(me.styleTip, me.menuValue) > me.width - 17)
        {
            _toolTips = 'data-qtip="' +
                       me.menuValue +
                       '" ';
        }
        
        var _style="text-align: " + me.textAlign + ";";  
        _html.push('<td class = "menu-item' + me.colorModel + '-td-class" style = "' + _style + '"');
        _html.push(_toolTips);
        _html.push('width="'+ me.width +'" ');
        if(me.indexCombox == 0)
        {
            _html.push('height="'+ (me.height - 1) +'">');
        }
        else
        {
            _html.push('height="'+ me.height +'">');
        }
        
        _html.push(me.menuValue);
        _html.push('</td>');
        _html.push('</tr>');
        _html.push('</table>');
        return _html.join('');        
    },
    getMenuValue: function () {
        return this.menuValue;
    },
    getParent:function()
    {
        return this.parentPanel;
    },
    getMenuValue:function()
    {
        return this.menuValue;
    },    
    setParent:function(val)
    {
        this.parentPanel = val;
    },

    onClick: function (e) {
        var me = this;
        me.getParent().hide();
        
        if(me.selectedFn != null)
        {
            me.selectedFn(me.mainPanel);            
        }
        this.fireEvent("click", e);
    },
    onRender: function (ct, position) {
        this.callParent(arguments);
        this.body.on("click", this.onClick, this);
    },
    getStyleTip: function (ct, position) {
        return this.styleTip;
    },
    selectedFn: function(mPanel)
    {
        return;
    }
});