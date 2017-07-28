/*!
 * JS Tab View
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.tab.TabView
 * @extends Ext.panel.Panel
 */

Ext.define("PM.view.tab.TabView",
{
    extend: 'Ext.panel.Panel',
    parentPanel	: null,
    cls			: 'panel_tabs',
    bodyCls		: 'panel-NoborderPadding',
	height		: 30,
	width		: 260,
	tabValue	: 'Request List',
	selected	: false,
	hidden      : false,
    initComponent: function ()
    {
    	var me = this;
    	if(me.selected)
		{
			me.cls = 'panel_tabs_selected';
		}
    	var _html = me.loadData();
		Ext.applyIf(me, {
    		html:_html
    	});
        me.callParent(arguments);
        me.addEvents("click");
    },
    setIcon: function(bool, msg) {
    	var tdClassName = "";
    	if(this.selected == true)
    	{
    		tdClassName = "td_tabs_img_selected";
    	}
    	else
    	{
    		tdClassName = "td_tabs_img";
    	}
    	var tdAlert = this.body.dom.getElementsByClassName(tdClassName);
    	if(tdAlert.length > 0)
    	{
    		var tdImg = tdAlert.item(0);
    		if(bool)
    		{
    			tdImg.childNodes[0].src = TabAlertMarkImage.srcAlert;
    			Ext.create('Ext.tip.ToolTip', {
    							target	: tdImg.childNodes[0],
		   	 					html	: msg});
    		}
    		else
    		{
    			tdImg.childNodes[0].src = TabAlertMarkImage.srcBlank;
    		}
    	}
    },
    loadData: function() {
		var me = this;
		var data = new Array();
		data.push('<table class ="table_tabs">');
		data.push('<tr>');

		if(me.tabValue == stringSetting.tab.requestlist ||
		   me.tabValue == stringSetting.tab.history ||
           me.tabValue == stringSetting.tab.transfer ||
           me.tabValue == stringSetting.tab.master)
		{
			if(me.selected)
			{
				data.push('<td class="td_tabs_img_selected">');
				data.push(TabAlertMarkImage.blank);
				data.push('</td>');
				data.push('<td class="td_tabs_all_selected">');
				data.push('<span class="span_tabs_selected">');
			}
			else
			{
				data.push('<td class="td_tabs_img">');
				data.push(TabAlertMarkImage.blank);
				data.push('</td>');
				data.push('<td class="td_tabs_all">');
				data.push('<span class="span_tabs">');
	    	}
		}
		else
		{
			if(me.selected)
			{
				data.push('<td class="td_tabs_selected">');
				data.push('<span class="span_tabs_selected">');
			}
			else
			{
				data.push('<td class="td_tabs">');
				data.push('<span class="span_tabs">');
	    	}
		}

		data.push(me.tabValue);
		data.push('</span>');
		data.push('</td>');
		data.push('</tr>');
		data.push('</table>');

		return data.join('');
    },
    getParent:function()
    {
    	return this.parentPanel;
    },
    setSelected:function(bool)
    {
    	this.selected = bool;
    	var _html = this.loadData();
		this.update({
    			html:_html
	  	});
	  	if(bool)
	  	{
	  		this.removeCls('panel_tabs');
	  		this.addCls('panel_tabs_selected');
	  	}
	  	else
	  	{
	  		this.removeCls('panel_tabs_selected');
	  		this.addCls('panel_tabs');
	  	}

    },
    isSelectd:function()
    {
    	return this.selected;
    },
    onRender: function (ct, position) {
        this.callParent(arguments);
        this.body.on("click", this.onClick, this);
    },
    onClick: function (e) {
        this.fireEvent("click", e);
    }
});