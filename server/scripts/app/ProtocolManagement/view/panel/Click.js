/*!
 * JS Click Panel
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.panel.Click
 * @extends Ext.panel.Panel
 */

Ext.define("PM.view.panel.Click",
{
    extend: 'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    parentPanel	: null,
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
    }
});