/*
 * ! JS Console Compare
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.CheckParametersView
 * @extends Ext.panel.Panel
 */

Ext.define('PM.view.master.CheckParametersView', {
    extend: 'PM.view.common.window.ModalDialog',
    alias: 'widget.mastercheckparametersview',
    layout: {
        type: 'border'
    },
    cls: 'x-Confirm-window',
    bodyCls: 'x-Confirm-window-body',
    modal: true,
    btnPanel: null,
    btnCancel: null,
    centerPanel: null,
    centerNorthPanel: null,
    centerCenterPanel: null,
    parametersBody: null,
    compareStore: null,
    checkParam: null,

    store: null,
    uniqueid: 'uniqueid',
    onlyDiff: false,
    btnDiff: null,
    hasNotChanges: false,
    orderFlg: false,
    initComponent: function () {

        var me = this;
        me.title = stringSetting.master.title.Parameters;

        me.btnCancel = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.master.button.Cancel + '<span>',
            disabled: false,
            handler: function () {
                me.close();
            }
        });
        me.btnDiff = Ext.create('Ext.Button', {
            cls: 'icon-button-hidenochange',
            overCls: 'icon-button-hidenochange-over',
            pressedCls: 'icon-button-hidenochange-pressed',
            focusCls: 'icon-button-hidenochange-over',
            disabledCls: 'icon-button-hidenochange-disable',
            height: 32,
            width: 270,
            text: '<span class="SpanTextView"  style="font-size:13pt;">' + stringSetting.compare.button.showall + '<span>',
            style: 'margin-right:-12px',
            disabled: me.checkParam.length == 1,
            handler: function () {
                me.hideNoChange();
            }
        });
        me.btnPanel = Ext.create('Ext.panel.Panel', {
            region: 'south',
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            layout: 'fit',
            cls: 'panel-NoborderPadding',
            bodyCls: 'button-Color-NoborderPadding',
            hidden: true,
            layout: {
                type: 'hbox',
                padding: '0 0 0 0',
                align: 'middle',
                pack: 'end'
            },
            defaults: {
                padding: '0 0 0 0',
                margins: '0 8 0 0'
            },
            items: [me.btnDiff, me.btnCancel]
        });

        me.centerNorthPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            cls: 'panel-NoborderPadding',
            bodyStyle: 'padding: 0 0 0 0;background-color:#EDF0F7;border:0;',
            height: 50,
            hidden: true,
            items: [{region: 'center', html: ''}]
        });

        me.centerCenterPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            cls: 'panel-NoborderPadding',
            bodyStyle: 'padding: 0 0 0 0;background-color:#EDF0F7;border:0;',
            hidden: true,
            items: [{region: 'center', html: ''}]
        });

        me.centerPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            baseCls: 'x-plain',
            bodyCls: 'panel-comfirm-center',
            bodyPadding: 14,
            border: 0,
            layout: 'border',
            defaults: {
                frame: false
            },
            items: [
                me.centerNorthPanel, me.centerCenterPanel
            ]
        });
        me.initStore();
        Ext.applyIf(this, {
            items: [me.centerPanel, me.btnPanel]
        });
        this.callParent(arguments);


    },


    initStore: function () {
        var me = this;
        createMask(me.body);
        me.compareStore = new Ext.data.Store({
            proxy: new Ext.data.proxy.Ajax({
                type: 'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getMasterListCompare.action',
                getMethod: function () {
                    return 'GET';
                },
                reader: {
                    type: 'json',
                    totalProperty: 'total',
                    root: 'result'
                }
            }),
            model: 'PM.model.CompareMasterListParams'
        });
        me.compareStore.on("load", function () {
            me.updatePanel();
            me.btnPanel.show();
            clearMask();
            me.bindOnScroll();
            me.bindClickEvent();
            me.fillCompareBlankLine();
        });
        me.compareStore.load({
            params: {
                keyStr: me.getParamStrForCheck('key'),
                scannerNameStr: me.getParamStrForCheck('machinename')
            }
        });
    },

    getParamStrForCheck: function (attr) {
        var me = this;
        var paramStr = '';
        for (var i = 0; i < me.checkParam.length; i++) {
            if (i != me.checkParam.length - 1) {
                paramStr += me.checkParam[i][attr] + '<,>';
            } else {
                paramStr += me.checkParam[i][attr];
            }
        }
        return paramStr;

    },

    updatePanel: function () {

        var me = this;
        var parametersHeader = Ext.create('PM.view.panel.OnMouse', {
            region: 'center',
            items: [{
                bodyCls: '',
                bodyStyle: 'overflow:hidden;',
                border: 0,
                html: me.createParametersHeaderHtml()
            }
            ],
            onMouseUp: function (e) {
                me.originalMouseUp(e);
            }

        });

        me.parametersBody = Ext.create('Ext.panel.Panel', {
            region: 'center',
            items: [{
                bodyCls: '',
                bodyStyle: 'overflow:hidden;',
                border: 0,
                html: me.createTableElement()
            }
            ]

        });

        me.centerNorthPanel.removeAll(true);
        me.centerNorthPanel.add(parametersHeader);
        me.centerNorthPanel.show();

        me.centerCenterPanel.removeAll(true);
        me.centerCenterPanel.add(me.parametersBody);
        me.centerCenterPanel.show();

    },
    createParametersHeaderHtml: function () {
        var me = this;
        var columns = 2;
        if (me.checkParam != null) {
            columns = me.checkParam.length;
        }
        var tableArray = new Array();
        var _fixWidthStr = ' width="40%" ';
        var _scannerWidthStr = ' width="30%" ';
        var _lastWidthStr = ' width="30%" ';
        if (columns <= 3) {
            _fixWidthStr = ' width="' + Math.round(0.4 * 1230) + '" ';
            _scannerWidthStr = ' width="' + Math.round((1 - 0.4) * 1230 / columns) + '" ';
            _lastWidthStr = ' width="' + Math.round(((1 - 0.4) * 1230 / columns + 20)) + '" ';
        } else if (columns == 4) {
            _fixWidthStr = ' width="251" ';
            _scannerWidthStr = ' width="251" ';
            _lastWidthStr = ' width="270" ';
        } else {
            _fixWidthStr = ' width="250" ';
            _scannerWidthStr = ' width="250" ';
            _lastWidthStr = ' width="270" ';
        }
        tableArray.push('<div style="height:50px;width:1250px;border:0;overflow-x:hidden;overflow-y:hidden;" class="parameters-div-header-id"><table width=100% class="Master-List-Table originalTable">');
        tableArray.push('<thead><tr><td class="start"' + _fixWidthStr + '>' + stringSetting.master.title.Parameter_Name + '</td>');
        for (var i = 0; i < columns; i++) {
            if (me.orderFlg) {
                if (i != columns - 1) {
                    if (me.checkParam[i].protocoleptype === 'Service') {
                        tableArray.push('<td' + _scannerWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer;" align="center">'
                            + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                    } else {
                        tableArray.push('<td' + _scannerWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer" align="center">'
                            + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                    }
                } else {
                    if (columns === 1) {
                        if (me.checkParam[i].protocoleptype === 'Service') {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer;" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        } else {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        }
                    } else {
                        if (me.checkParam[i].protocoleptype === 'Service') {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer;" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        } else {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        }
                    }
                }
            } else {
                if (i != columns - 1) {
                    if (me.checkParam[i].protocoleptype === 'Service') {
                        tableArray.push('<td' + _scannerWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer;" align="center">'
                            + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                    } else {
                        tableArray.push('<td' + _scannerWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer" align="center">'
                            + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                    }
                } else {
                    if (columns === 1) {
                        if (me.checkParam[i].protocoleptype === 'Service') {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer;" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        } else {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="1" style="cursor: pointer" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="1">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        }
                    } else {
                        if (me.checkParam[i].protocoleptype === 'Service') {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer;" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        } else {
                            tableArray.push('<td' + _lastWidthStr + ' class="parameters-Scanner" index="2" style="cursor: pointer" align="center">'
                                + '<span class="parameters-Scanner-Protocolname" index="2">' + me.checkParam[i].protocolname + '</span><br>' + me.checkParam[i].machinename + '</td>');
                        }
                    }
                }
            }
        }
        tableArray.push('</tr></thead></table></div>');

        return tableArray.join('');

    },


    createTableElement: function () {
        var me = this;
        var columns = 2;
        if (me.checkParam != null) {
            columns = me.checkParam.length;
        }
        var _style = 'overflow-x:hidden ;';
        var list = [];
        if (!me.onlyDiff) {
            list = me.compareStore.data.items[0].data.list;
        } else if (me.checkParam.length > 1) {
            var templist = [];
            deepClone(templist, me.compareStore.data.items[0].data.list);
            for (var i = templist.length - 1; i >= 0; i--) {
                if (templist[i]["haschild"] == "true") {
                    templist[i]["childlist"] = this.filterChange(templist[i]["childlist"]);
                    if (templist[i]["childlist"].length == 0 && !me.isDifferentRow(templist[i])) {
                        templist.splice(i, 1);
                    }
                } else if (templist[i]["haschild"] == "false" && !me.isDifferentRow(templist[i])) {
                    templist.splice(i, 1);
                }
            }
            list = templist;
        }
        var row = 0;
        var _fixWidthStr = ' width="40%" ';
        var _scannerWidthStr = ' width="30%" ';
        var _lastWidthStr = ' width="30%" ';
        var _fixWidth = 400;
        var _scannerWidth = 400;
        var _lastWidth = 400;
        if (columns <= 3) {
            _fixWidthStr = 'width:' + 0.4 * 1230 + 'px;';
            _fixWidth = 0.4 * 1230;
            _scannerWidthStr = 'width:' + Math.round((1 - 0.4) * 1230 / columns) + 'px;';
            _scannerWidth = Math.round((1 - 0.4) * 1230 / columns);
            _lastWidthStr = 'width:' + Math.round(((1 - 0.4) * 1230 / columns + 20)) + 'px;';
            _lastWidth = Math.round((1 - 0.4) * 1230 / columns) + 20;
        } else {
            if (columns >= 4) {
                _style = 'overflow-x:scroll ;';
            }
            _fixWidthStr = ' width:250px;';
            _fixWidth = 250;
            _scannerWidthStr = ' width:250px;';
            _scannerWidth = 250;
            _lastWidthStr = ' width:230px;';
            _lastWidth = 230;
        }
        var div_node = document.createElement('div');

        div_node.setAttribute('style', _style);
        div_node.setAttribute('class', 'parameters-compare-div');
        var table_node = document.createElement("table");
        table_node.setAttribute("id", me.uniqueid + "compareTable");
        table_node.setAttribute("style", "border-bottom:0px solid #D5D7DF;width:100%;table-layout:fixed;padding:0px;border-spacing: 0px 0px;");

        //compare result
        if (list.length != 0) {
            me.hasNotChanges = false;
            for (var i = 0; i < list.length; i++) {

                var scanner_array = [];
                var sameFlag = true;
                for (var j = 0; j < columns; j++) {
                    scanner_array[j] = list[i][me.checkParam[j].machinename];
                }
                for (var j = 0; j < columns; j++) {
                    for (var k = 0; k < columns; k++) {
                        if (j != k) {
                            if (list[i][me.checkParam[j].machinename] != list[i][me.checkParam[k].machinename]) {
                                sameFlag = false;
                                break;
                            }
                        }
                    }
                    if (!sameFlag) {
                        break;
                    }
                }
                var tr_node = document.createElement("tr");

                var paracssclass = me.getRowStyle(row, !sameFlag, 0);

                tr_node.setAttribute("style", "height:30px;");
                tr_node.setAttribute("name", row);
                tr_node.id = me.uniqueid + '_tr_' + i;
                var tdText = ' ' + list[i]["name"];
                var image_right = null;
                if (list[i]["haschild"] == "true") {
                    image_right = document.createElement("img");
                    image_right.id = 'img_' + me.uniqueid + '_trchild_' + i;
                    image_right.src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
                }

                var td_node = me.createParaTdElement(me.uniqueid + "id_" + i, paracssclass, tdText, image_right, 10);
                td_node.setAttribute("style", "padding:0px;padding-left:10px;" + _fixWidthStr + "border-bottom:0px solid #ABC0E2;");
                if (list[i]["haschild"] == "true") {
                    td_node.setAttribute('class', 'compare-td-node ' + paracssclass);
                    td_node.setAttribute('tdId', me.uniqueid + '_trchild_' + i);
                }
                tr_node.appendChild(td_node);

                var _widthValue = (document.documentElement.clientWidth - 65) * 0.3;
                var valuecssclass = me.getRowStyle(row, !sameFlag, 1);
                var td_node_array = [];
                for (var j = 0; j < columns; j++) {
                    var tem_node;
                    if (j != columns - 1) {
                        tem_node = me.createCommonTd(valuecssclass, scanner_array[j]);
                        tem_node.setAttribute("style", _scannerWidthStr + "padding:0px;border-spacing: 0px 0px;");
                    } else {
                        tem_node = me.createCommonTd(valuecssclass, scanner_array[j]);
                        tem_node.setAttribute("style", _lastWidthStr + "padding:0px;border-spacing: 0px 0px;");
                    }
                    td_node_array.push(tem_node);
                }

                for (var j = 0; j < columns; j++) {
                    if (columns <= 3) {
                        if (getStringRealWidth(styleCompareTipGlobal, scanner_array[j]) > (1 - 0.4) * 1230 / columns) {
                            td_node_array[j].setAttribute("data-qtip", scanner_array[j]);
                        }
                    } else {
                        if (getStringRealWidth(styleCompareTipGlobal, scanner_array[j]) > 230) {
                            td_node_array[j].setAttribute("data-qtip", scanner_array[j]);
                        }
                    }
                    tr_node.appendChild(td_node_array[j]);
                }
                table_node.appendChild(tr_node);


                if (list[i]["haschild"] == "true") {
                    var tr_submain_node = me.createChiledTrElement(me, list[i]["childlist"], i, 20, row);
                    table_node.appendChild(tr_submain_node);
                    row += me.getChildRowCount(me, list[i]["childlist"]);
                }

                row++;
            }
        } else {
            me.hasNotChanges = true;
            for (var i = 0; i < 13; i++) {
                var tr_node = document.createElement("tr");
                var _style = "background-color: #EBF1FA;";
                if (i % 2 == 0) {
                    _style = "background-color: #F7F9FF;";
                }
                tr_node.setAttribute("style", "height:30px;" + _style);
                var td_node = document.createElement("td");
                td_node.setAttribute("style", "padding:0px;padding-left:10px;" + _fixWidthStr + "border-bottom:0px solid #ABC0E2;");
                tr_node.appendChild(td_node);
                var td_node_array = [];
                for (var j = 0; j < columns; j++) {
                    var tem_node;
                    if (j != columns - 1) {
                        tem_node = document.createElement("td");
                        tem_node.setAttribute("style", _scannerWidthStr + "padding:0px;border-spacing: 0px 0px;");
                    } else {
                        tem_node = document.createElement("td");
                        tem_node.setAttribute("style", _lastWidthStr + "padding:0px;border-spacing: 0px 0px;");
                    }
                    tr_node.appendChild(tem_node);
                }
                table_node.appendChild(tr_node);
            }
        }
        div_node.appendChild(table_node);
        return div_node.outerHTML;
    },
    createChiledTrElement: function (me, sublist, mainIndex, level, row) {
        var columns = 2;
        if (me.checkParam != null) {
            columns = me.checkParam.length;
        }

        var tr_submain_node = document.createElement("tr");
        tr_submain_node.id = me.uniqueid + '_trchild_' + mainIndex;
        var td_sub_main_node = document.createElement("td");
        td_sub_main_node.setAttribute("colspan", columns + 1);
        td_sub_main_node.setAttribute("style", "width:100%;padding:0px;border-spacing: 0px 0px;");
        var table_sub_node = document.createElement("table");
        table_sub_node.setAttribute("class", "CompareTableCommon");

        var _fixWidthStr = ' width="40%" ';
        var _scannerWidthStr = ' width="30%" ';
        var _lastWidthStr = ' width="30%" ';
        if (columns <= 3) {
            _fixWidthStr = 'width:' + Math.round(0.4 * 1230) + 'px;';
            _scannerWidthStr = 'width:' + Math.round((1 - 0.4) * 1230 / columns) + 'px;';
            _lastWidthStr = 'width:' + Math.round(((1 - 0.4) * 1230 / columns + 20)) + 'px;';
        } else {
            _fixWidthStr = ' width:250px;';
            _scannerWidthStr = ' width:250px;';
            _lastWidthStr = ' width:230px;';
        }
        for (var j = 0; j < sublist.length; j++) {

            row++;

            var scanner_array = [];
            var sameFlag = true;
            for (var p = 0; p < columns; p++) {
                scanner_array[p] = sublist[j][me.checkParam[p].machinename];
            }
            for (var p = 0; p < columns; p++) {
                for (var k = 0; k < columns; k++) {
                    if (p != k) {
                        if (sublist[j][me.checkParam[p].machinename] != sublist[j][me.checkParam[k].machinename]) {
                            sameFlag = false;
                            break;
                        }
                    }
                }
                if (!sameFlag) {
                    break;
                }
            }

            var tr_sub_node = document.createElement("tr");
            tr_sub_node.setAttribute("name", row);
            tr_sub_node.setAttribute("style", "height:30px;");
            tr_sub_node.id = me.uniqueid + '_tr_' + mainIndex + '_' + j;
            var paracssclass = '';
            paracssclass = me.getRowStyle(row, !sameFlag, 0);
            tdText = sublist[j]["name"];
            var image_right = null;
            if (sublist[j]["haschild"] == "true") {
                image_right = document.createElement("img");
                image_right.id = 'img_' + me.uniqueid + '_trchild_' + mainIndex + '_' + j;
                image_right.src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
            }

            var td_sub_node = me.createParaTdElement(me.uniqueid + "_td_" + mainIndex + '_' + j, paracssclass, tdText, image_right, level);

            tr_sub_node.appendChild(td_sub_node);
            td_sub_node.setAttribute("style", "padding-left:" + level + "px;" + _fixWidthStr + "border-bottom:0px solid #ABC0E2;");
            if (sublist[j]["haschild"] == "true") {
                td_sub_node.setAttribute('class', 'compare-td-sub-node ' + paracssclass);
                td_sub_node.setAttribute('tdId', me.uniqueid + '_trchild_' + mainIndex + '_' + j);
            }
            var valuecssclass = '';

            var td_node_array = [];
            valuecssclass = me.getRowStyle(row, !sameFlag, 1);
            for (var k = 0; k < columns; k++) {
                var tem_node;
                if (k != columns - 1) {
                    tem_node = me.createCommonTd(valuecssclass, scanner_array[k]);
                    tem_node.setAttribute("style", _scannerWidthStr + "padding:0px;border-spacing: 0px 0px;");
                } else {
                    tem_node = me.createCommonTd(valuecssclass, scanner_array[k]);
                    tem_node.setAttribute("style", _lastWidthStr + "padding:0px;border-spacing: 0px 0px;");
                }
                td_node_array.push(tem_node);
            }

            for (var k = 0; k < columns; k++) {
                if (columns <= 3) {
                    if (getStringRealWidth(styleCompareTipGlobal, scanner_array[k]) > (1 - 0.4) * 1230 / columns) {
                        td_node_array[k].setAttribute("data-qtip", scanner_array[k]);
                    }
                } else {
                    if (getStringRealWidth(styleCompareTipGlobal, scanner_array[k]) > 230) {
                        td_node_array[k].setAttribute("data-qtip", scanner_array[k]);
                    }
                }
                tr_sub_node.appendChild(td_node_array[k]);
            }


            table_sub_node.appendChild(tr_sub_node);


            if (sublist[j]["haschild"] == "true") {
                var tr = me.createChiledTrElement(me, sublist[j]["childlist"], mainIndex + '_' + j, level + 20, row);
                table_sub_node.appendChild(tr);
                row += me.getChildRowCount(me, sublist[j]["childlist"]);
            }
        }
        td_sub_main_node.appendChild(table_sub_node);
        tr_submain_node.appendChild(td_sub_main_node);

        return tr_submain_node;
    },
    createParaTdElement: function (id, cssclass, text, image, paddingleft) {

        var td_node = document.createElement("td");
        td_node.setAttribute("class", cssclass);
        var td_text = document.createTextNode(text);
        var _widthParaName = (document.documentElement.clientWidth - 65) * 0.3 - paddingleft - 20;
        if (image != null) {
            var table = document.createElement("table");
            table.setAttribute("class", "CompareTableCommon");
//          table.setAttribute("style","color:#FFFFFF;width: 100%;height: 100%;table-layout: fixed;border-spacing: 0px 0px;");
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.appendChild(image);
            td1.setAttribute("style", "width:20px;");
            var td2 = document.createElement("td");
            td2.appendChild(td_text);
            td1.setAttribute("class", cssclass);
            td2.setAttribute("class", cssclass);
            if (getStringRealWidth(styleCompareTipGlobal, text) > _widthParaName) {
                td2.setAttribute("data-qtip", text);
            }
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
            td_node.appendChild(table);
        } else {

            var table = document.createElement("table");
            table.setAttribute("class", "CompareTableCommon");
//          table.setAttribute("style","color:#FFFFFF;width: 100%;height: 100%;table-layout: fixed;border-spacing: 0px 0px;");
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(''));
            td1.setAttribute("style", "width:20px;");
            var td2 = document.createElement("td");
            td1.setAttribute("class", cssclass);
            td2.setAttribute("class", cssclass);
            td2.appendChild(td_text);
            if (getStringRealWidth(styleCompareTipGlobal, text) > _widthParaName) {
                td2.setAttribute("data-qtip", text);
            }
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
            td_node.appendChild(table);


        }

        return td_node;
    },
    getChildRowCount: function (me, list) {
        var count = 0;

        for (var i = 0; i < list.length; i++) {
            count++;
            if (list[i]["haschild"] == "true") {
                count += me.getChildRowCount(me, list[i]["childlist"]);
            }
        }
        return count;
    },

    getRowStyle: function (rowIndex, isDiff, columnIndex) {
        var cssclass = "";
        if (columnIndex == 0) {
            if (isDiff) {
                if (rowIndex % 2 == 0) {
                    cssclass = "CompareGridFontLeftEvenBold";
                } else {
                    cssclass = "CompareGridFontLeftOddBold";
                }

            } else {
                if (rowIndex % 2 == 0) {
                    cssclass = "CompareGridFontLeftEvenSmall";
                } else {
                    cssclass = "CompareGridFontLeftOddSmall";
                }
            }
        } else if (rowIndex % 2 == 0) {
            if (isDiff) {
                cssclass = "CompareGridFontCenterEvenBold";
            } else {
                cssclass = "CompareGridFontCenterEvenSmall";
            }
        } else {
            if (isDiff) {
                cssclass = "CompareGridFontCenterOddBold";
            } else {
                cssclass = "CompareGridFontCenterOddSmall";
            }
        }
        return cssclass;
    },
    createCommonTd: function (cssclass, text) {
        var td_node = document.createElement("td");
        td_node.setAttribute("class", cssclass);
        var td_text = document.createTextNode(text);
        td_node.appendChild(td_text);
        return td_node;
    },
    compareItemClick: function (tdid) {
        if (document.getElementById(tdid).style.display == "") {
            document.getElementById(tdid).style.display = "none";
            document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/collapse.png";
        } else {
            document.getElementById(tdid).style.display = "";
            document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
        }

        this.fillCompareBlankLine();
    },
    bindOnScroll: function () {
        var me = this;
        var scrollDiv = document.getElementsByClassName('parameters-compare-div');

        if (scrollDiv.length != 0) {
            scrollDiv[0].onscroll = function () {

                document.getElementsByClassName('parameters-div-header-id')[0].scrollLeft = this.scrollLeft;
            }
        }
    },
    bindClickEvent: function () {
        var me = this;
        var el_td_sub = document.getElementsByClassName('compare-td-sub-node');
        if (el_td_sub.length != 0) {
            for (var i = 0; i < el_td_sub.length; i++) {
                el_td_sub[i].onclick = function () {
                    me.compareItemClick(this.attributes['tdId'].value);
                }
            }
        }
        var el_td = document.getElementsByClassName('compare-td-node');
        if (el_td.length != 0) {
            for (var i = 0; i < el_td.length; i++) {
                el_td[i].onclick = function () {
                    me.compareItemClick(this.attributes['tdId'].value);
                }
            }
        }
    },
    fillCompareBlankLine: function () {
        var me = this;
        var columns = 2;
        if (me.checkParam != null) {
            columns = me.checkParam.length;
        }

        var table = document.getElementById(this.uniqueid + "compareTable");
        var panel = this.parametersBody.body.dom;
        var tableHeight = panel.scrollHeight;
        if (table == null || table == "undefined") {
            return;
        }

        var elements = table.getElementsByTagName("tr");
        for (var i = elements.length - 1; i >= 0; i--) {

            if (elements[i].getAttribute("name") == "addrow")
                table.removeChild(elements[i]);

        }

        var css = this.findlastclass(table.childNodes[0]);
        var n = 0;
        if (css.indexOf("Odd") > 0) {
            n = 1;
        }
        var displayCount = 0;
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].style.display != 'none') {
                displayCount++;
            }
        }
        var emptyHeight = tableHeight - (displayCount) * 30;
        if (panel.scrollHeight - table.offsetHeight > 0) {
            var rowSize = Math.ceil(emptyHeight / 30);
            var lastHeight = emptyHeight - 30 * (rowSize - 1);
            if (rowSize > 0) {
                for (var i = 0; i < rowSize; i++) {
                    var tr_header2 = document.createElement("tr");
                    tr_header2.setAttribute("style", "height:30px;");
                    if (i == rowSize - 1) {
                        tr_header2.setAttribute("style", "height:" + lastHeight + "px;");
                    }
                    tr_header2.setAttribute("name", "addrow");
                    var td_head_node2 = document.createElement("td");

                    if (i % 2 == n) {
                        td_head_node2.setAttribute("class", "CompareGridFontLeftOddSmall");
                    } else {
                        td_head_node2.setAttribute("class", "CompareGridFontLeftEvenSmall");
                    }

                    tr_header2.appendChild(td_head_node2);

                    for (var j = 0; j < columns; j++) {

                        var td = document.createElement("td");
                        if (i % 2 == n) {
                            td.setAttribute("class", "CompareGridFontCenterOddSmall");
                        } else {
                            td.setAttribute("class", "CompareGridFontCenterEvenSmall");
                        }
                        td.setAttribute("style", "width:30%");
                        tr_header2.appendChild(td);
                    }

                    table.appendChild(tr_header2);

                }

            }

        }
        me.bindOnScroll();
    },
    findlastclass: function (obj) {
        var elements = obj.childNodes;
        for (var i = elements.length - 1; i >= 0; i--) {
            if (elements[i].style != null && elements[i].style.display == "") {
                if (elements[i].getAttribute("class") != null && elements[i].getAttribute("class").indexOf("CompareGridFont") >= 0) {
                    return elements[i].getAttribute("class");
                } else {
                    return this.findlastclass(elements[i]);
                }
            }
        }
        return "";
    },
    hideNoChange: function () {
        var me = this;
        me.onlyDiff = !me.onlyDiff;
        if (me.onlyDiff) {
            me.btnDiff.setText('<span class="SpanTextView"  style="font-size:13pt;">' + stringSetting.compare.button.showall + '<span>');
        } else {
            me.btnDiff.setText('<span class="SpanTextView"  style="font-size:13pt;">' + stringSetting.compare.button.showdifferencesonly + '<span>');
        }
        me.updatePanel();
        me.bindOnScroll();
        me.bindClickEvent();
        if (!me.hasNotChanges) {
            me.fillCompareBlankLine();
        }
    },
    filterChange: function (list) {
        var me = this;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i]["haschild"] == "true") {
                list[i]["childlist"] = this.filterChange(list[i]["childlist"]);
                if ((list[i]["childlist"] == null || list[i]["childlist"].length == 0) && !me.isDifferentRow(list[i])) {
                    list.splice(i, 1);
                }
            } else if (list[i]["haschild"] == "false") {
                if (!me.isDifferentRow(list[i])) {
                    list.splice(i, 1);
                }
            }
        }
        return list;
    },
    isDifferentRow: function (obj) {
        var me = this;
        var start = obj[me.checkParam[0].machinename];
        var isDiff = false;
        for (var i = 1; i < me.checkParam.length; i++) {
            if (start != obj[me.checkParam[i].machinename]) {
                isDiff = true;
                break;
            }
        }
        return isDiff;
    },
    originalMouseUp: function (e) {
        var me = this;

        var index = me.clickForAddOrRemove(e);
        if (e.button != 2 || !index) {
            return;
        }
        var status = me.checkMenuStatus(e);
        if((status & 2) &&
            ((me.processStatus == MasterProcessStatus.CreationEP && (status & 4) == 0) ||
            (me.processStatus != MasterProcessStatus.CreationEP && ((status & 1) ||
            (status & 4) == 0))))
        {
            return;
        }
        var names = [];
        var fns = [];
        var clickAddFn = function(e)
        {
            me.addToMasterList(index);
        };
        if(((status & 1) == 0 ||
            me.processStatus == MasterProcessStatus.CreationEP) &&
            (status & 4) == 4
            && me.processStatus !== MasterProcessStatus.CreationVoice)
        {
            names.push(stringSetting.master.menu.addSelected);
            fns.push(clickAddFn);
        }

        var _menu = Ext.create('PM.view.menu.Menu', {
            width: 240
        });

        _menu.createMenu(names, fns);

        _menu.showByMouse(window.event, 3, 5);
    }
});
