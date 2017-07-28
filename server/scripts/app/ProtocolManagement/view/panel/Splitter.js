/*!
 * JS Click Panel 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.panel.Splitter
 * @extends Ext.panel.Panel
 */
 
Ext.define("PM.view.panel.Splitter",
{
    extend: 'Ext.panel.Panel',
    parentPanel	: null,
    split		: true, 
    initComponent: function () {
 
        this.callParent(arguments);
        this.addEvents("click");
    },
    getParent:function()
    {
    	return this.parentPanel;
    },
    onRender: function (ct, position) {
        this.callParent(arguments);
        this.body.on("click", this.onClick, this);
    },
    onClick: function (e) {
        this.fireEvent("click", e);
    },
    setSplit: function(bool)
    {
    	this.split = bool;
    }
});