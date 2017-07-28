/*!
 * JS Console Radlex
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.request.Radlex
 * @extends Ext.panel.Panel
 */
Ext.define('PM.view.request.Radlex', {
    extend      : 'Ext.panel.Panel',
    layout      : 'border',
    cls         : 'panel-NoborderPadding',
    bodyCls     : 'panel-comfirm-center-body',
    style       : 'border:0',

    store: [],
    RPIDsStore: [],
    checkStore: null,
    protocolConfirm: null,
    protocolAction: null,
    queryStore:null,
    modelPanel: null,
    organ: '',
    checkArray:[],
    tablePanel : null,
    selectedRpidData:[],

    initComponent: function() {
        var me = this;
        me.readRPIDs();
        this.queryStore = me.store;
        me.initStore();

        var searchCombox = Ext.create('Ext.form.field.Text', {
            width: 180,
            id: 'searchComboxId',
            height: 22,
            cls: 'radlex-View-Search-empty',
            emptyText: stringSetting.history.text_search,
            dirtyCls : '',
            fieldCls : 'radlex-View-Search-empty',
            clearCls : '',
            componentCls    : '',
            emptyCls: 'radlex-View-Search-empty',
            focusCls: 'radlex-View-Search-empty',
            requiredCls: 'radlex-View-Search-empty',
            noemptyCls: 'radlex-View-Search-empty',
            style:'border:1px solid #ABC0E2;border-right:0;margin-top:10px;margin-left:389px;',
//          xtype: 'textfieldview',
            hidden: false,
            listeners: {
                specialKey: function(field, e) {
                    if (e.keyCode == 13) {
                        me.updateTableData(field.getValue());
                    }
                }
            }
        });

        var txSearchImg = Ext.create('Ext.Img', {
            width: 24,
            height: 24,
            src: PROCESS_PATH_GLOBAL_RESOURCES + 'images/search/search.png',
            cls: 'radlex-View-Search-Img',
            xtype: 'img',
            draggable: false,
            listeners: {
                click: {
                    element: 'el',
                    fn: function() {
                        var searchStr = Ext.getCmp("searchComboxId").getValue();
                        me.updateTableData(searchStr);
                    }
                }
            }
        });

        var tableHeaderPanel = Ext.create('Ext.panel.Panel', {
            height: 33,
            region: 'north',
            cls: 'radlex-table-header',
            html: me.getTableHeader()
        });

        me.tablePanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'border',
 
            cls: 'panel-NoborderPadding',
            bodyCls: 'panel-comfirm-center-body table-body',
            html: '<span>' + me.loadData(me.store) + '</span>'
        });

        me.modelPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'border',
            cls: 'panel-NoborderPadding',
            bodyCls: 'panel-comfirm-center-body',
            items: [tableHeaderPanel, me.tablePanel],
        });


        var titlePanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            layout: 'column',
            height: 44,
            cls: 'panel-NoborderPadding',
            bodyCls: 'panel-comfirm-center-body',
            items: [searchCombox, txSearchImg]
        });

        var protocol = me.protocolConfirm;
        me.checkStore.load({
            params: {
                uid: protocol.get("uid"),
                type: protocol.get("type"),
                filepath: protocol.get('filepath'),
                epno: protocol.get('epno'),
                protocolname: protocol.get('protocolname'),
                version: protocol.get('version'),
                machinename: protocol.get('machinename'),
                status: protocol.get('status'),
                organ: protocol.get('organ'),
                patienttype: protocol.get('patienttype'),
            }
        });



        Ext.applyIf(me, {
            items: [
                titlePanel,
                me.modelPanel
            ]
        });
        me.callParent(arguments);


    },

    getTableHeader: function() {
        var _array = [];
        _array.push('<table class="Setting-List-Table-Radlex-Header" style="border-bottom:0;">');
        _array.push('<tbody>');
        _array.push('<thead>');
        _array.push('<tr>');
        _array.push('<td style="width:41px;border-right:1px solid #ABC0E2;"></td>');
        _array.push('<td style="width:117px;border-right:1px solid #ABC0E2;" class="start">' + stringSetting.radlex.rpid + '</td>');
        _array.push('<td style="">' + stringSetting.radlex.long_desc + '</td>');
        _array.push('</tr>');
        _array.push('</thead>');
        _array.push('</tbody>');
        _array.push('</table>');

        return _array.join('');
    },

    loadData: function(store) {
        var _array = [];
        _array.push('<table class="Setting-List-Table-win-Radlex" style="border:0;">');
        _array.push('<tbody style="cursor:normal;">');

        for (var i = 0; i < store.length; i++) {
            var trClass = '';
            var checkboxStyle = "margin-left:-8px;width:15px;height:15px;";
            var item = store[i];
            if (i % 2 == 0) {
                trClass = "even";
            } else {
                trClass = "odd";
            }

            var content = item['LongDescription'];
            var isChecked = false;
            if (this.RPIDsStore.indexOf(item['RPID']) != -1) {
                isChecked = true;
            }
            _array.push('<tr class=' + trClass + ' index="' + i + '" height="34" >');
            var tdClass = "class=\"start\"";
            if(store.length >= 4){
	            if(i == store.length - 1 && store.lenght != 1){
	                tdClass = "class=\"endline start\"";
	            }
            }
            var isCh = isChecked?'checked="true"':'';
            _array.push('<td ' + tdClass + ' style="width:19px">');
            _array.push('<input ' + isCh + 'class="rpidCheckbox" name="rpidCheckBox" style=' + checkboxStyle + ' type="checkbox" /></td>');
            _array.push('<td ' + tdClass + ' style="width:95px">' + item['RPID'] + '</td>');
            _array.push('<td ' + tdClass + ' data-qtip = "' + item['LongDescription'] + '" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">');
            _array.push(item['LongDescription'] + '</td></tr> ');
            
        }
        if(store.length < 4){
        	for (var i = store.length; i < 4; i++) {
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
	            if(i == 3){
	                tdClass = "class=\"endline start\"";
	            }
	            _array.push('<td ' + tdClass + ' style="width:19px">');
	            _array.push('</td>');
	            _array.push('<td ' + tdClass + ' style="width:95px"></td>');
	            _array.push('<td ' + tdClass + '>');
	            _array.push('</td></tr> ');
	            
	        }
        }
        _array.push('</tbody></table>');

        return _array.join('');

    },
    


    updateTableData: function(searchStr) {
        var searchStore = [];
        for (var i = 0; i < this.store.length; i++) {
            var obj = {};
            obj[i] = this.store[i]['RPID'] +"::"+ this.store[i]['LongDescription'];
            searchStore[i] = obj[i];
        }

        this.queryStore = [];
        var _searchStr = searchStr.toLowerCase();

        for (var i = 0; i < searchStore.length; i++) {
            if (searchStore[i].toLowerCase().indexOf(_searchStr) != -1) {
                this.queryStore.push(this.store[i]);
            }
        }

        var _html = this.loadData(this.queryStore);

        this.tablePanel.update(_html);
    },

    readRPIDs: function() {
        var chestToPelvis = "CHEST TO PELVIS";
        var _organ = this.organ;

        if (_organ.toUpperCase() == chestToPelvis) 
        {
            var chest = RPIDs['Chest'];
            var adbomen = RPIDs['Abdomen'];            
            var pelivs = RPIDs['Pelvis'];
            this.store = chest.concat(adbomen, pelivs);
        }
        else if(_organ == "Abdomen" || 
                _organ == "Chest" || 
                _organ == "Head" || 
                _organ == "Neck" || 
                _organ == "Pelvis")
        {
            this.store = RPIDs[_organ];
        }  
        else if(_organ == "ALL" || 
                _organ == "Leg")
        {
            this.store = new Array    ();
        }  
        else
        {
            this.store = RPIDs['Other'];
        }
    },

    initStore: function() {
        var me = this;
        me.checkStore = new Ext.data.Store({
            proxy: new Ext.data.proxy.Ajax({
                type: 'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'checkedradlex.action',
                getMethod: function() {
                    return "GET";
                },
                reader: {
                    type: 'json'
                }
            }),
            model: 'PM.model.CheckedRadlex'
        });

        me.checkStore.on("load", function() {
            me.setCheckStoreData();
            me.tablePanel.update(me.loadData(me.store));
        });

    },
    // this store is to set checked
    setCheckStoreData: function() {
        var me = this;
        if (me.checkStore.getCount() > 0) {
            var checked_rpids_str = me.checkStore.data.items[0].get('rpids_str');
            me.RPIDsStore = checked_rpids_str.split(",");

        }
    },
    getSelectedRpidData: function()
    {
        var me = this;
        me.selectedRpidData = new Array();
        var allCheckBox = this.tablePanel.body.dom.getElementsByClassName("rpidCheckbox");
        
        for (var i = 0; i < allCheckBox.length; i++) {
            if(allCheckBox[i].checked){
                me.selectedRpidData.push(me.queryStore[i]['RPID']);
            }
        }
        return me.selectedRpidData.join(",");
    }
    

});