/*!
 * JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class Ext.view.ProtocolPoolSettingConfirmView
 * @extends Ext.view.ModalWinView
 */

Ext.define('PM.view.master.ProtocolsListView', {
    extend               : 'Ext.panel.Panel',
    alias: 'widget.masterprotocolslistview',
    layout               : {
        type    : 'border'
    },
    margin               : '10 20',
    selectRowNum         : -1,
    cellHeight           : 31,
    aryColumnData        : null,
    labelText            : null,
    columnIndex     : {
        Type        : 0,
        PatientType : 1,
        Name        : 2,
        Date        : 3,
        Machine     : 4,
    },
    protocolList        : [],
    store               : null,
    storeData           : [],
    btnApplyConfirm     : null,
    btnCancelConfirm    : null,
    panelDataCenter     : null,
    border              : 0,

    initComponent : function() {
        var me = this;

        me.aryColumnData = new Array();
        me.aryColumnData[this.columnIndex.Type] = {
                                cls         : 'Td-ProtocolsColumn-Type',
                                value       : stringSetting.master.column.type,
                                width       : 161,
                                minWidth    : 75};

        me.aryColumnData[this.columnIndex.PatientType] = {
                                cls         : 'Td-ProtocolsColumn-PatientType',
                                value       : stringSetting.master.column.patienttype,
                                width       : 150,
                                minWidth    : 80};

        me.aryColumnData[this.columnIndex.Name] = {
                                cls         : 'Td-ProtocolsColumn-Name',
                                value       : stringSetting.master.column.name,
                                width       : '',
                                minWidth    : 150};


        me.aryColumnData[this.columnIndex.Date] = {
                                cls         : 'Td-ProtocolsColumn-Time',
                                value       : stringSetting.master.column.date,
                                width       : 186,
                                minWidth    : 100};

        me.aryColumnData[this.columnIndex.Machine] = {
                                cls         : 'Td-ProtocolsColumn-Machine',
                                value       : stringSetting.master.column.scanner,
                                width       : 186,
                                minWidth    : 100};


        me.countPanel = Ext.create('Ext.panel.Panel', {
            cls           : 'panel-NoborderPadding-transparent',
            bodyCls       : 'grid-Color-NoborderPadding',
            region        : 'north',
            height        : 80,
            html          : '<div id="id_div_requestlist_count" ' +
                              'class="divGridHeaderCount"><br/><br/>' +
                              '<span class="spanGridColumn-header" style="color:black;">'+stringSetting.master.message.confirm_to_approve +'</span>' +
                          '</div>'
        });

        me.panelHeaderCenter = Ext.create('Ext.panel.Panel', {
                    region         : 'center',
                    bodyCls        : 'panel-NoborderPadding-transparent',
                    html           : this.initHeaderHtml()
                });
        me.headerPanel = Ext.create('Ext.panel.Panel', {
            bodyCls       : 'panel-NoborderPadding',
            region        : 'north',
            layout        : {
                type    : 'border'
            },
            height        : 115,

            items        : [
             me.countPanel,me.panelHeaderCenter
            ]
        });
        me.panelDataCenter = Ext.create('Ext.panel.Panel', {
                    region         : 'center',
                    bodyCls        : 'panel-ScrollBorder-NoPadding',
                    bodyStyle      : 'border-left:0;',
                    defaults       : {
                            frame    : true
                    },
                    html           : ''
                });



          me.panelUpdate();
          Ext.applyIf(this, {
                    items    : [me.headerPanel,me.panelDataCenter]
                });
          me.callParent(arguments);

    },
    resize:function(){

    	this.panelUpdate();
    },


    initHeaderHtml : function(){
	    var _array = new Array();

    	_array.push('<table class = "ProtocolsList-Table">');

        _array.push('<tr class = "ProtocolsList-ColumnHeader">');

    	for(var i = 0;i < this.aryColumnData.length;i++)
    	{
	        _array.push('<td ');

	        if(this.aryColumnData[i].width != '')
	        {
	        	var _width = this.aryColumnData[i].width;
	            _array.push('width = "' + _width + '" ');
	        }
	        else{
	        	var _widthName = this.getSpaceCellWidth();
                if(_widthName < this.aryColumnData[this.columnIndex.Name].minWidth)
                {
                    _array.push('width = "' + this.aryColumnData[this.columnIndex.Name].minWidth + '" ');
                }
                _array.push('width = "' + this.aryColumnData[this.columnIndex.Name].width + '" ');
	        }


	        _array.push('class = "' + this.aryColumnData[i].cls + '">');
	        _array.push('<span unselectable="on" class ="spanGridColumn-header">');
	        _array.push(this.aryColumnData[i].value);
	        _array.push('</span>');
	        _array.push('</td>');


    	}

        var _scrollBarWidth = (document.documentElement.clientWidth > 2000) ? 12 : 18;
        _array.push('<td ');
        _array.push('width = "' + _scrollBarWidth + '" ');
        _array.push('class = "' + this.aryColumnData[0].cls + '">');
        _array.push('</td>');


        _array.push('</tr>');
        _array.push('</table>');

        return _array.join('');
    },


    loadData : function() {
        var me = this;

        var _style = "";
        var viewDataHeight = 0;

        var store = me.protocolList;
        if (this.selectRowNum == -1) {
            viewDataHeight = document.documentElement.clientHeight - 331;
            if (viewDataHeight < 436) {
                viewDataHeight = 436;
            }

        }

        var maxCount = 0;
        var cellEndHeight = viewDataHeight % this.cellHeight;
        maxCount = (viewDataHeight - cellEndHeight) / this.cellHeight;
        if (viewDataHeight % this.cellHeight > 0) {
            maxCount++;
        }

        var lenMax = maxCount;
        if (store.length > maxCount) {
            lenMax = store.length;
        }
        var _array = new Array();

        _array.push('<table class="ProtocolsList-Table">');

        for (var i = 0; i < lenMax; i++) {

            if (i % 2 == 0) {
                _style = "ProtocolsList-Tr";
            }
            else {
                _style = "ProtocolsList-Tr-S";
            }

            if (i >= store.length) {
                _array.push('<tr class = "' + _style + '"');
                var _cellHeight = 0;
                if (i == lenMax - 1) {

                    if (cellEndHeight == 0) {
                        _cellHeight = this.cellHeight;
                    }
                    else {
                        _cellHeight = cellEndHeight + 1;
                    }
                }
                else {
                    _cellHeight = this.cellHeight;
                }
                _array.push('>');
                _array.push('<td class = "Td-ProtocolsList-Cell-Space" ');
                _array.push('width = "' + this.aryColumnData[this.columnIndex.Type].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-ProtocolsList-Cell-Space" ');
                _array.push('width = "' + this.aryColumnData[this.columnIndex.PatientType].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-ProtocolsList-Cell-Space" ');

                var _widthName = this.getSpaceCellWidth();
                if (_widthName < this.aryColumnData[this.columnIndex.Name].minWidth) {
                    _array.push('width = "' + this.aryColumnData[this.columnIndex.Name].minWidth + '" ');
                }
                _array.push('width = "' + this.aryColumnData[this.columnIndex.Name].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

                _array.push('<td class = "Td-ProtocolsList-Cell-Space" ');
                _array.push('width = "' + this.aryColumnData[this.columnIndex.Date].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
                _array.push('<td class = "Td-ProtocolsList-Cell-Space" ');
                _array.push('width = "' + this.aryColumnData[this.columnIndex.Machine].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

            }
            else {
                _array.push('<tr class = "' + _style + '">');
                var protocoleptype = store[i].protocoleptype;
                _array.push(this.createTdString(store[i].type,
                    this.columnIndex.Type,
                    "Td-ProtocolsList-Type",
                    null,
                    protocoleptype
                ));
                if (store[i].type != "SureIQ") {
                    _array.push(this.createTdString(store[i].patienttype,
                        this.columnIndex.PatientType,
                        "Td-ProtocolsList-PatientType",
                        null,
                        protocoleptype
                    ));
                }
                else {
                    _array.push(this.createTdString("",
                        this.columnIndex.PatientType,
                        "Td-ProtocolsList-PatientType",
                        null,
                        protocoleptype
                    ));
                }

                var _name = store[i].protocolname;
                var _type = store[i].type;
                if(_type === ProtocolType.SureIQ || _type === ProtocolType.SureExposure) {
                    _name = store[i].organ + ' ' + _name;
                }

                var _widthName = this.getSpaceCellWidth();
                var _widthNameHtml = "";
                if (_widthName < this.aryColumnData[this.columnIndex.Name].minWidth) {
                    _widthName = this.aryColumnData[this.columnIndex.Name].minWidth;
                    _widthNameHtml = 'width = "' + _widthName + '" ';
                }
                _array.push('<td class = "Td-ProtocolsList-Name" ');


                if (getStringRealWidth(this.styleTip, _name) > _widthName - 13) {
                    _array.push('data-qtip="');
                    _array.push(Ext.util.Format.htmlEncode(Ext.util.Format.htmlEncode(_name)));
                    _array.push('" ');
                }
                ;


                _array.push(_widthNameHtml);
                _array.push('>');
                var protocoleptype = store[i].protocoleptype;
                if (protocoleptype === 'Service') {
                    _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
                } else {
                    _array.push('<span unselectable="on" class ="spanGridValue">');
                }
                _array.push(Ext.util.Format.htmlEncode(_name));
                _array.push('</span>');
                _array.push('</td>');


                _array.push(this.createTdString(DateFormatByExt(store[i].lastupddt, 'Y M d H:i'),
                    this.columnIndex.Date,
                    "Td-ProtocolsList-Time",
                    null,
                    protocoleptype
                ));
                _array.push(this.createTdString(store[i].machinename,
                    this.columnIndex.Machine,
                    "Td-ProtocolsList-Machine",
                    null,
                    protocoleptype));

            }
            _array.push('</tr>');
        }

        _array.push('</table>');
        return _array.join(' ');
    },
    createTdString  : function (val, columnIndex, tdCls, allLenFlg, protocoleptype)
    {
    	var _array = new Array();
        _array.push('<td ');
        if(allLenFlg)
        {
            if(getStringWidth(this.styleTip, val, true) >
               this.aryColumnData[columnIndex].width - 13)
            {
                _array.push('data-qtip="');
                _array.push(val);
                _array.push('" ');
            }
        }
        else
        {
            if(getStringRealWidth(this.styleTip, val) >
               this.aryColumnData[columnIndex].width - 13)
            {
                _array.push('data-qtip="');
                _array.push(val);
                _array.push('" ');
            }
        }

        _array.push('width = "' + this.aryColumnData[columnIndex].width + '" ');
        _array.push('class = "' + tdCls +'">');
        if (protocoleptype === 'Service') {
            _array.push('<span unselectable="on" class ="spanGridValueForNewColor">');
        } else {
            _array.push('<span unselectable="on" class ="spanGridValue">');
        }
        _array.push(val);

        _array.push('</span>');
        _array.push('</td>');

        return _array.join('');

    },



    getSpaceCellWidth: function(min)
    {
    	var cellWidth = 0;

		for(var i = 0;i < this.aryColumnData.length;i++)
    	{
    		if(this.aryColumnData[i].width != '')
    		{
    			cellWidth = cellWidth + this.aryColumnData[i].width;
    		}
    	}


		if(min != null && cellWidth < min)
    	{
    		cellWidth = min;
    	}

    	return cellWidth;
    },
    panelUpdate  : function ()
    {

        var _html = this.loadData();

        if(this.selectRowNum == -1)
        {

            this.panelDataCenter.update({
            	  region         : 'center',
                  cls            : 'panel-NoborderPadding',
                  bodyCls        : 'panel-ScrollBorder-NoPadding',
                  border         : 0,
                  autoScroll     : false,
                  minWidth       : this.minWinWidth,
                  html           : _html
            });

        }
    },



});

