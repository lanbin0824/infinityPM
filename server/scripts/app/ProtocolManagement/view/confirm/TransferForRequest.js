/*!
 * JS Console TransferView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.confirm.Transfer
 * @extends Ext.panel.Panel
 */

Ext.define('PM.view.confirm.TransferForRequest', {
	extend: 'Ext.panel.Panel',
    layout      : 'border',
	width 		: 630,
	height		: 409,
    cls			: 'panel-NoborderPadding',	       
    bodyCls 	: 'panel-comfirm-center-body', 
    
    store		: null,   
    
    modelPanel	: null,

    scanlist	: [],
    groupName	: '',
	
    initComponent: function() {
    	var me = this;
 
    	me.scanlist = new Array();

		var tableHeaderPanel = Ext.create('Ext.panel.Panel', {
			height: 99,
			region: 'north',
			cls: 'radlex-table-header',
			border: 0,
			bodyCls: 'transfer-table-header-body',
			padding: '0 14 0 11',
			html: me.getTableHeader()
		});
    	
    	me.store  = new Ext.data.Store({
			model : 'PM.model.Transfer',
			proxy : new Ext.data.proxy.Ajax({
				type : 'ajax',
				url : PROCESS_PATH_GLOBAL_ACTION + 'getmodellist.action',			
				getMethod : function() {
					return 'GET';
				},
				reader : {
					type : 'json',
					root : 'result',
					totalProperty : 'total'
				}
			})
		});

    	me.store.on("load", function() {
			me.tablePanel.update(me.loadData(me.store));
    	});	    

		me.tablePanel = Ext.create('Ext.panel.Panel', {
			region: 'center',
			cls: 'panel-NoborderPadding',
			bodyCls: 'panel-comfirm-center-body table-body',
			padding: '0 14 0 11',
			html: '<span>' + me.loadData(me.store) + '</span>'
		});

		var tableBottomPanel = Ext.create('Ext.panel.Panel', {
			region: 'south',
			height: 200,
			cls: 'panel-comfirm-center-bottom',
			bodyCls: 'panel-comfirm-center-body',
			html: me.createComfirmTable()
		});
    		    	    
    	Ext.applyIf(me, {    		
    		items:[
				tableHeaderPanel,
				me.tablePanel,
				tableBottomPanel
			]
    	});
    	me.callParent(arguments);
		me.addEvents("click");
    	
    	me.store.load();
    },

	onRender: function (ct, position) {
		this.callParent(arguments);
		this.body.on("click", this.onClick, this);
	},

	onClick: function (e) {
		var me = this;
		var el = e.target;

		if(e.button == 0 && el.className.indexOf('transferCheckbox') != -1)
		{
			if(el.checked)
			{
				var groupName = el.getAttribute("groupName");
				me.scanlist.push(groupName);
			}
			else
			{
				for(var i = 0;i < me.scanlist.length;i++)
				{
					var groupName = el.getAttribute("groupName");
					if(me.scanlist[i] = groupName)
					{
						me.scanlist.splice(i, 1);
						break;
					}
				}
			}
			me.checkchange();
		}
	},

	loadData: function(store) {
		var me = this;
		var _array = [];
		_array.push('<table class="Setting-List-Table-win-Radlex" style="border:0;">');
		_array.push('<tbody style="cursor:normal;">');

		var storeArray = [];
		if(store != null && store.getCount() > 0) {
			for (var i = 0, len = store.getCount(); i < len; i++) {
				var name = store.data.getAt(i).get("key");
				if (me.groupName != name) {
					storeArray.push(store.data.getAt(i))
				}
			}
		}

		if(store != null && store.getCount() > 0) {
			for (var i = 0, len = storeArray.length; i < len; i++) {
				var trClass = '';
				var checkboxStyle = "margin-left:-8px;width:15px;height:15px;";
				var name = storeArray[i].get("key");
				var systemName = storeArray[i].get("systemname");
				var softwareVersion = storeArray[i].get("softwareversion");

				if (i % 2 == 0) {
					trClass = "even";
				} else {
					trClass = "odd";
				}
				_array.push('<tr class=' + trClass + ' index="' + i + '" height="34" >');
				var tdClass = "class=\"start\"";
				if (storeArray.length >= 3) {
					if (i == storeArray.length - 1 && storeArray.length != 1) {
						tdClass = "class=\"endline start\"";
					}
				}
				_array.push('<td ' + tdClass + ' style="width:19px">');
				_array.push('<input ' + 'class="transferCheckbox" name="transferCheckbox" groupName="' + name + '"style=' + checkboxStyle + ' type="checkbox"/></td>');
				_array.push('<td ' + tdClass + ' data-qtip = "' + name + '" style="width:168px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">' + name + '</td>');
				_array.push('<td ' + tdClass + ' data-qtip = "' + systemName + '" style="width:148px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">');
				_array.push(systemName + '</td>');
				_array.push('<td ' + tdClass + ' data-qtip = "' + softwareVersion + '" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">');
				_array.push(softwareVersion + '</td></tr> ');
			}
		}
		if(storeArray.length < 3){
			for (var i = storeArray.length; i < 3; i++) {
				var trClass = '';
				var checkboxStyle = "margin-left:-8px;width:15px;height:15px;";
				var item = store[i];
				if (i % 2 == 0) {
					trClass = "even";
				} else {
					trClass = "odd";
				}
				_array.push('<tr class=' + trClass + ' index="' + i + '" height="34" >');
				var tdClass = "class=\"start\"";
				if(i == 2){
					tdClass = "class=\"endline start\"";
				}
				_array.push('<td ' + tdClass + ' style="width:19px">');
				_array.push('</td>');
				_array.push('<td ' + tdClass + ' style="width:168px"></td>');
				_array.push('<td ' + tdClass + ' style="width:148px"></td>');
				_array.push('<td ' + tdClass + '>');
				_array.push('</td></tr> ');
			}
		}
		_array.push('</tbody></table>');

		return _array.join('');
	},

	getTableHeader: function() {
		var _array = [];
		_array.push('<table>');
		_array.push('<tr>');
		_array.push('<td class="transfer-table-header-body-label-request">' + stringSetting.comments.label.approveTransferlable + '</td>');
		_array.push('</tr>');
		_array.push('</table>');
		_array.push('<table class="Setting-List-Table-Radlex-Header" style="border-bottom:0;">');
		_array.push('<tbody>');
		_array.push('<thead>');
		_array.push('<tr>');
		_array.push('<td style="width:41px;border-right:1px solid #ABC0E2;"></td>');
		_array.push('<td style="width:190px;border-right:1px solid #ABC0E2;" class="start">' + stringSetting.comments.label.group + '</td>');
		_array.push('<td style="width:170px;border-right:1px solid #ABC0E2;">' + stringSetting.comments.label.model + '</td>');
		_array.push('<td style="">' + stringSetting.comments.label.softwarVersion + '</td>');
		_array.push('</tr>');
		_array.push('</thead>');
		_array.push('</tbody>');
		_array.push('</table>');

		return _array.join('');
	},

	createComfirmTable: function()
	{
		var table = '';
		table += '<table class="ComfirmTable">';
		table += '<tr>';
		table += '<td class="Comfirm-Reason-Label">';
		table += '<span id="transferSpanReason" class="spanComfirm">' + stringSetting.comments.label.comments + ' (255):</span>';
		table += '<span class="comfirmIsPalce" id="transferSpanWarning">' + '</span>';
		table += '</td>';
		table += '</tr>';
		table += '<tr>';
		table += '<td colspan="2">';
		table += '<textarea class = "Comfirm-input-request" autofocus></textarea>';
		table += '</td>';
		table += '</tr>';
		table += '</table>';
		return table;
	},
});
