/*!
 * JS Click Panel 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.panel.OnMouse
 * @extends Ext.panel.Panel
 */
 
Ext.define("PM.view.panel.OnMouse",
{
    extend: 'Ext.panel.Panel',
    parentPanel	: null,
    initComponent: function () {
 
        this.callParent(arguments);
        this.addEvents("click");
        this.addEvents("mousedown");
        this.addEvents("mouseup");
        this.addEvents("mousemove");
        this.addEvents("mouseover");
        this.addEvents("mouseout");
    },
    getParent:function()
    {
    	return this.parentPanel;
    },
    onRender: function (ct, position) {
        this.callParent(arguments);
        this.body.on("click", this.onClick, this);
        this.body.on("mousedown", this.onMouseDown, this);
        this.body.on("mouseup", this.onMouseUp, this);
        this.body.on("mousemove", this.onMouseMove, this);
        this.body.on("mouseover", this.onMouseOver, this);
        this.body.on("mouseout", this.onMouseOut, this);
    },
    onClick: function (e) {
        this.fireEvent("click", e);
    },
    onMouseDown: function (e) {
        this.fireEvent("onmousedown", e);
    },
    onMouseUp: function (e) {
        this.fireEvent("onmouseup", e);
    },
    onMouseMove: function (e) {
        this.fireEvent("onmousemove", e);
    },
	onMouseOver: function (e) {
        this.fireEvent("onmouseover", e);
    },
    onMouseOut: function (e) {
        this.fireEvent("onmouseout", e);
    }
});