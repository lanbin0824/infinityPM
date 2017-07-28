/*
 * ! JS Console Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.BaseMaster
 * @extends Ext.panel.Panel
 */

Ext.define('PM.view.master.select.BaseMaster', {
    extend              : 'Ext.panel.Panel',
    cls                 : 'panel-NoborderPadding-transparent',
    bodyCls             : 'grid-Color-NoborderPadding',
    width               : '100%',
    layout :
    {
        type : 'border'
    },

    originalStore       : null,
    scannerGroupStore   : null,
    scannerCombobox     : null,
    westCenterPanel     : null,
    westNorthPanel      : null,

    eastCenterPanel     : null,
    eastNorthPanel      : null,
    mainPanel           : null,
    processStatus       : 1,
    loading             : true,

    masterCount         : 80,
    masterColumnIndex   : {
        patienttype     : 0,
        organ           : 1,
        protocolname    : 2,
        machinename     : 3,
        names   : [
            "patienttype",
            "organ",
            "protocolname",
            "machinename"
        ]
    },

    scannersWidth       : 280,
    panelHeight         : 600,

    cellHeight          : 33,
    originalTableWidth  : 1000,

    prepareToAdd        : [],
    originalData        : [],
    masterTempData      : [],
    resObj              : {},
    sortHistoryMaster   : [],
    sortHistoryOriginal : [],
    errorStatus         : {},

    doOverWrite         : false,
    doOverWriteList     : [],

    initComponent : function()
    {
        var me = this;

        me.clearData();
        var northPanel = Ext.create('Ext.panel.Panel',{
            cls             : 'panel-NoborderPadding',
            region          : 'north',
            height          : 60,
            minWidth        : 1584,
            layout: {
                type:'border',
            },
            bodyCls         : 'grid-Color-NoborderPadding',
            items           : [
                {
                    xtype     : 'label',
                    style     : 'padding-left:30px;',
                    cls       : 'master-list-label',
                    width     : 652,
                    height    : 30,
                    text      : stringSetting.master.title.MasterList,
                    region    : 'west'
                },
                {
                    xtype     : 'label',
                    style     : 'padding-left:12px;',
                    cls       : 'master-list-label',
                    height    : 30,
                    text      : stringSetting.master.title.OriginalList,
                    region    : 'center'
                },{
                    xtype       : 'panel',
                    height      : 60,
                    width       : 320,
                    region      : 'east',
                    cls         : 'panel-NoborderPadding',
                    bodyCls     : 'grid-Color-NoborderPadding',
                    style       : 'padding-top:20px;padding-right:12px;',
                    items       : [me.getScannerCombobox()]
                }
            ]
        });

        me.createMasterPanel();

        me.westCenterPanel = Ext.create('PM.view.panel.OnMouse', {
            region      : 'center',
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'panel-ScrollBorder-NoPadding',
            html        : "",
            onMouseUp   : function (e)
            {
                me.masterMouseUp(e);
            }
        });
        me.createOriginalPanel();

        me.eastCenterPanel = Ext.create('PM.view.panel.OnMouse', {
            region      : 'center',
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'panel-ScrollBorder-NoPadding',
            html        : "",
            onMouseUp   : function (e)
            {
                me.originalMouseUp(e);
            }
        });

        var centerPanel = Ext.create('Ext.panel.Panel',
        {
            region        : 'center',
            layout        : 'border',
            cls           : 'panel-NoborderPadding',
            bodyCls       : 'grid-Color-NoborderPadding',
            bodyStyle     : 'padding:0px;background-color:#EDF0F7;',
            items         : [
            {
                region      : 'west',
                cls         : 'panel-NoborderPadding',
                bodyCls     : 'Master-Left-panel',
                width       : 652,
                layout      : 'border',
                items       : [me.westNorthPanel, me.westCenterPanel]
            },
            {
                region      : 'center',
                cls         : 'panel-NoborderPadding',
                bodyCls     : 'Master-right-panel',
                layout      : 'border',
                items       : [me.eastNorthPanel, me.eastCenterPanel]
            }]
        });

        me.initStore();

        Ext.applyIf(me, {
            items : [
                northPanel,
                centerPanel
            ]
        });

        me.callParent(arguments);
    },

    resizeView: function(flag)
    {
        var me = this;
        var sh = document.documentElement.scrollHeight;
        var sw = document.documentElement.scrollWidth;
        me.allPanelUpdate(flag, sh, sw);
    },

    masterMouseUp : function(e)
    {
        var me = this;

        var selectIndex = me.rightClickMaster(e);
        if(selectIndex == -1 || selectIndex == null)
        {
            return;
        }
        var _menu = Ext.create('PM.view.menu.Menu', {
            width       : 240
        });
        var removeFormMaster = function()
        {
            var key = me.masterTempData[selectIndex].key;
            me.removeMaster(key);
            me.removeOriginal(key);
            me.masterTempData.splice(selectIndex, 1);
            me.westCenterPanel.update(me.createMasterListTabelHtml(me.panelHeight, true));

            me.setNextButtonStauts();
        }

        _menu.createMenu([stringSetting.master.menu.removeFromList], [removeFormMaster]);

        _menu.showByMouse(window.event, 3, 5);
    },

    mergeManualMasterData : function(prepareMaster)
    {
        var me = this;
        var list = me.getManualMasterData();
        var removeList = [];
        for(var i = 0;i < prepareMaster.length;i++)
        {
            var added = false;
            for(var j = 0;j < list.length;j++)
            {
                if(me.checkProperty(prepareMaster, i, list, j))
                {
                    removeList.push(list[j].key);
                    list[j].protocolname = prepareMaster[i].protocolname;
                    list[j].patienttype = prepareMaster[i].patienttype;
                    list[j].organ = prepareMaster[i].organ;
                    list[j].key = prepareMaster[i].key;
                    added = true;
                    break;
                }
            }
            if(!added)
            {
                list.push(prepareMaster[i]);
                for(var j = 0;j < me.originalData.length;j++)
                {
                    for(var k = 0;k < me.originalData[j].detail.length;k++)
                    {
                        if(me.checkOriginalProperty(prepareMaster, i, me.originalData, j, k) &&
                           me.originalData[j].detail[k].autoSelectd)
                        {
                            me.originalData[j].detail[k].autoSelectd = false;
                            removeList.push(me.originalData[j].detail[k].key);
                            added = true;
                            break;
                        }
                    }
                    if(added)
                    {
                        break;
                    }
                }
            }
        }
        return removeList;
    },

    removeOriginal : function(selectKey)
    {
        var me = this;
        var tableEls = me.eastCenterPanel.body.dom.getElementsByClassName("Master-Grid-Table");

        for(var i = 0;i < me.originalData.length;i++)
        {
            for(var j = 0;j < me.originalData[i].detail.length;j++)
            {
                if (me.prepareToAdd[j]) {
                    me.prepareToAdd[j].added = null;
                }
                if(me.originalData[i].detail[j].key == selectKey)
                {
                    me.originalData[i].detail[j].selectd = false;
                    me.originalData[i].detail[j].autoSelectd = false;

                    if(tableEls != null && tableEls.length > 0)
                    {
                        var trEls = tableEls[0].getElementsByTagName("TR");
                        var tdEl = trEls[me.originalData[i].displayIndex].childNodes[j + 2];
                        if(tdEl.className.indexOf('onselect') == -1)
                        {
                            tdEl.className = tdEl.className.replace('added','unselect');
                        }
                        else
                        {
                            tdEl.className = tdEl.className.replace('onselect','unselect');
                        }
                    }
                    return;
                }
            }
        }
    },

    originalMouseUp : function(e)
    {
        var me = this;

        var check = me.clickForAddOrRemove(e);
        if(e.button != 2 || !check)
        {
            return;
        }

        var status = me.checkMenuStatus(me.prepareToAdd);
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
            me.addMultOriginals();

        };
        var clickCheckParametersFn = function(e)
        {
            me.checkParameters();
        };
        if(((status & 1) == 0 ||
            me.processStatus == MasterProcessStatus.CreationEP) &&
           (status & 4) == 4
            && me.processStatus !== MasterProcessStatus.CreationVoice)
        {
            names.push(stringSetting.master.menu.addSelected);
            fns.push(clickAddFn);
        }
        if((status & 2) == 0 && me.processStatus != MasterProcessStatus.SelectOther)
        {
            names.push(stringSetting.master.menu.checkParameters);
            fns.push(clickCheckParametersFn);
        }

        var _menu = Ext.create('PM.view.menu.Menu', {
            width       : 240
        });

        _menu.createMenu(names, fns);

        _menu.showByMouse(window.event, 3, 5);
    },

    checkMenuStatus : function(list)
    {
        var status = 0;
        var scan = {count:0};
        for(var i = 0;i < list.length;i++)
        {
            if(scan[list[i].x] == null)
            {
                scan[list[i].x] = 1;
                scan.count++;
                if(scan.count > 1)
                {
                    status = status | 1;
                }
            }
            else
            {
                scan[list[i].x]++;
                status = status | 2;
            }
            if(list[i].added == null || !list[i].added)
            {
                status = status | 4;
            }
        }
        return status;
    },

    createOriginalPanel : function()
    {
        var me = this;

        var aryColumnData = [];

        aryColumnData[me.masterColumnIndex.patienttype] = {
            cls         : 'Master-Column-patienttype',
            value       : stringSetting.master.columns.patientType,
            sort        : true,
            filter      : {
                list    : [],
                key     : me.masterColumnIndex.names[me.masterColumnIndex.patienttype],
            },
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueUp,
            width       : 200,
            minWidth    : 40
        };
        if(me.processStatus == MasterProcessStatus.CreationSureIQ ||
           me.processStatus == MasterProcessStatus.SelectOther)
        {
            aryColumnData[me.masterColumnIndex.patienttype].filter = null;
        }
        else if(me.processStatus == MasterProcessStatus.CreationVoice)
        {
            aryColumnData[me.masterColumnIndex.patienttype].value = stringSetting.master.columns.language;
        }

        aryColumnData[me.masterColumnIndex.organ] = {
            cls         : 'Master-Column-organ',
            value       : stringSetting.master.columns.bodyRegion,
            sort        : true,
            filter      : {
                list    : [],
                key     : me.masterColumnIndex.names[me.masterColumnIndex.organ],
            },
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueNone,
            width       : '',
            minWidth    : 40
        };
        if(me.processStatus == MasterProcessStatus.CreationCP ||
           me.processStatus == MasterProcessStatus.SelectOther ||
           me.processStatus == MasterProcessStatus.CreationVoice)
        {
            aryColumnData[me.masterColumnIndex.organ].filter = null;
        }

        me.eastNorthPanel = Ext.create('PM.view.header.ResizeView', {
            minWidth            : 582,
            region              : 'north',
            cls                 : getChromeScrollCss(),
            bodyCls             : "columnHeader-body-Chrome-Master",
            style               : 'background-color:#4F81BD;',
            tableCls            : 'Master-Header',
            tdResizeCss         : 'master-resize-line',
            spanCls             : 'spanGridColumn-header-small',
            columnData          : aryColumnData,
            parentPanel         : me,
            resizeColumn        : false,
            pageType            : "Original",
            getSortIndexFn      : me.getHeaderSortIndex,
            updateIconFn        : me.updateHeaderIcon,
            getOterAreaIndexFn  : me.getOterAreaIndexFn,
            oterAreaFn          : me.oterAreaFn,
            doFilterData        : function()
            {
                me.panelUpdateOriginal();
            },
            dataUpdate          : function()
            {
                me.panelUpdateOriginal();
            }
        });
    },

    oterAreaFn: function (headerIndex, mainPanel)
    {
        var me = this;

        var scannerIndex = headerIndex - 2;
        var originalData = mainPanel.originalData;
        var addList = [];

        if(originalData.length == 0 ||
           scannerIndex >= originalData[0].detail.length)
        {
            return;
        }
        for(var i = 0;i < originalData.length;i++)
        {
            if(originalData[i].detail[scannerIndex] != null &&
               originalData[i].detail[scannerIndex].key != null &&
               originalData[i].detail[scannerIndex].key != "" &&
               originalData[i].detail[scannerIndex].autoSelectd != true &&
               originalData[i].detail[scannerIndex].selectd != true)
            {
                addList.push({
                    x : scannerIndex + 2,
                    y : i,
                    seq : mainPanel.mainPanel.seq++
//                  el_y : i
                });
            }
        }
        if(addList.length == 0){
            return;
        }
        if(mainPanel.addMasterList(addList))
        {
            mainPanel.updateTableAndData(addList, true);
        }
        return true;
    },

    getOterAreaIndexFn: function (el, mainPanel)
    {
        var targetEl = el;

        if(targetEl == null)
        {
            return null;
        }

        if((el.tagName == "DIV") &&
           el.parentElement != null &&
           el.parentElement.getAttribute('colKey') != null)
        {
            return el.parentElement.getAttribute('colKey');
        }
        return null;
    },

    createMasterPanel : function()
    {
        var me = this;

        var aryColumnData = [];

        var organWidth = 130;
        var patienttypeWidth = 125;
        var machineNameWidth = 147;
        if(memoryLanguage == 'IT' || memoryLanguage == 'DE')
        {
            organWidth = 172;
            patienttypeWidth = 130;
        } else if (memoryLanguage == 'ES') {
            organWidth = 172;
            machineNameWidth = 160;
        } else if (memoryLanguage == 'PT') {
            patienttypeWidth = 140;
        }
        aryColumnData[me.masterColumnIndex.patienttype] =
        {
            cls         : 'Master-Column-patienttype',
            value       : stringSetting.master.columns.patientType,
            sort        : true,
            filter      : {
                list    : [],
                key     : me.masterColumnIndex.names[me.masterColumnIndex.patienttype],
            },
            width       : patienttypeWidth,
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueUp,
            minWidth    : 40
        };
        if(me.processStatus == MasterProcessStatus.CreationSureIQ ||
           me.processStatus == MasterProcessStatus.SelectOther)
        {
            aryColumnData[me.masterColumnIndex.patienttype].filter = null;
        }
        else if(me.processStatus == MasterProcessStatus.CreationVoice)
        {
            aryColumnData[me.masterColumnIndex.patienttype].value = stringSetting.master.columns.language;
        }

        aryColumnData[me.masterColumnIndex.organ] =
        {
            cls         : 'Master-Column-organ',
            value       : stringSetting.master.columns.bodyRegion,
            sort        : true,
            filter      : {
                list    : [],
                key     : me.masterColumnIndex.names[me.masterColumnIndex.organ],
            },
            width       : organWidth,
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueNone,
            minWidth    : 40
        };
        if(me.processStatus == MasterProcessStatus.CreationCP ||
           me.processStatus == MasterProcessStatus.SelectOther ||
           me.processStatus == MasterProcessStatus.CreationVoice)
        {
            aryColumnData[me.masterColumnIndex.organ].filter = null;
        }

        aryColumnData[me.masterColumnIndex.protocolname] =
        {
            cls         : 'Master-Column-protocolname',
            value       : stringSetting.master.columns.masterList,
            sort        : true,
            width       : '',
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueNone,
            minWidth    : 40
        };

        aryColumnData[me.masterColumnIndex.machinename] =
        {
            cls         : 'Master-Column-machinename',
            value       : stringSetting.master.columns.machineName,
            sort        : true,
            width       : machineNameWidth,
            arrowsCls   : "Master-Column-Sort",
            arrowsValue : MasterListArrows.ValueNone,
            minWidth    : 40
        };

        me.westNorthPanel = Ext.create('PM.view.header.ResizeView', {
            minWidth            : 640,
            region              : 'north',
            cls                 : getChromeScrollCss(),
            bodyCls             : "columnHeader-body-Chrome-Master",
            style               : 'background-color:#4F81BD;',
            tableCls            : 'Master-Header',
            tdResizeCss         : 'master-resize-line',
            spanCls             : 'spanGridColumn-header-small',
            columnData          : aryColumnData,
            resizeColumn        : false,
            parentPanel         : me,
            pageType            : "Master",
            getSortIndexFn      : me.getHeaderSortIndex,
            updateIconFn        : me.updateHeaderIcon,
            doFilterData        : function()
            {
                me.panelUpdateMaster();
            },
            dataUpdate          : function()
            {
                me.panelUpdateMaster();
            }
        });
    },

    updateHeaderIcon: function(headerSortIndex, mainPanel, sortFlg)
    {
        var panel = this;

        for(var i = 0;i < panel.columnData.length;i++)
        {
            if(i != headerSortIndex)
            {
                panel.getColumnData(i).arrowsValue = MasterListArrows.ValueNone;
            }
        }

        var newSorter = [];
        if(sortFlg != null)
        {
            if(sortFlg == 'up')
            {
                panel.getColumnData(headerSortIndex).arrowsValue = MasterListArrows.ValueUp;
                newSorter.push({col:headerSortIndex, val:"ASC"});
            }
            else
            {
                panel.getColumnData(headerSortIndex).arrowsValue = MasterListArrows.ValueDown;
                newSorter.push({col:headerSortIndex, val:"DESC"});
            }
        }
        else
        {
            if(panel.getColumnData(headerSortIndex).arrowsValue != MasterListArrows.ValueDown)
            {
                panel.getColumnData(headerSortIndex).arrowsValue = MasterListArrows.ValueDown;
                newSorter.push({col:headerSortIndex, val:"DESC"});
            }
            else
            {
                panel.getColumnData(headerSortIndex).arrowsValue = MasterListArrows.ValueUp;
                newSorter.push({col:headerSortIndex, val:"ASC"});
            }
        }

        if(panel.pageType == "Master")
        {
            if(newSorter[0].col == mainPanel.masterColumnIndex.patienttype &&
               newSorter[0].val == "ASC")
            {
                mainPanel.sortHistoryMaster = [
                    {col    : mainPanel.masterColumnIndex.patienttype,
                     val    : 'ASC'},
                    {col    : mainPanel.masterColumnIndex.organ,
                     val    : 'ASC'},
                    {col    : mainPanel.masterColumnIndex.protocolname,
                     val    : 'ASC'}
                ];
            }
            else
            {
                for(var i = 0;i < mainPanel.sortHistoryMaster.length;i++)
                {
                    if(mainPanel.sortHistoryMaster[i].col != headerSortIndex)
                    {
                        newSorter.push({col:mainPanel.sortHistoryMaster[i].col,
                                        val:mainPanel.sortHistoryMaster[i].val});
                    }
                }
                mainPanel.sortHistoryMaster = newSorter;
            }
        }
        else
        {
            if(newSorter[0].col == mainPanel.masterColumnIndex.patienttype &&
               newSorter[0].val == "ASC")
            {
                mainPanel.sortHistoryOriginal = [
                    {col    : mainPanel.masterColumnIndex.patienttype,
                     val    : 'ASC'},
                    {col    : mainPanel.masterColumnIndex.organ,
                     val    : 'ASC'},
                    {col    : mainPanel.masterColumnIndex.protocolname,
                     val    : 'ASC'}
                ];
            }
            else
            {
                for(var i = 0;i < mainPanel.sortHistoryOriginal.length;i++)
                {
                    if(mainPanel.sortHistoryOriginal[i].col != headerSortIndex)
                    {
                        newSorter.push({col:mainPanel.sortHistoryOriginal[i].col,
                                        val:mainPanel.sortHistoryOriginal[i].val});
                    }
                }
                mainPanel.sortHistoryOriginal = newSorter;
            }
        }

        panel.panelUpdate();
    },

    getHeaderSortIndex: function (el, mainPanel)
    {
        var targetEl = el;

        if(targetEl == null)
        {
            return null;
        }

        if((el.tagName == "IMG" || el.tagName == "SPAN") &&
           el.parentElement != null &&
           el.parentElement.getAttribute('colKey') != null)
        {
            return el.parentElement.getAttribute('colKey');
        }

        if(el.tagName == "TD" &&
           el.getAttribute('colKey') != null)
        {
            return el.getAttribute('colKey');
        }
        return null;
    },

    setMasterByOriginal: function(originalData)
    {
        var me = this;
        me.masterTempData = [];

        for(var i = 0;i < originalData.length;i++)
        {
            for(var j = 0;j < originalData[i].detail.length;j++)
            {
                if(originalData[i].detail[j].autoSelectd ||
                   originalData[i].detail[j].selectd)
                {
                    me.masterTempData.push({
                        epno : originalData[i].detail[j].epno,
//                      epno : originalData[i].epno,
                        type : originalData[i].type,
                        organ : originalData[i].organ,
                        patienttype : originalData[i].patienttype,
                        sameparameters : originalData[i].sameparameters,
                        machinename : originalData[i].detail[j].machinename,
                        protocolname : originalData[i].detail[j].protocolname,
                        key : originalData[i].detail[j].key,
                        lastupddt : originalData[i].detail[j].lastupddt,
                        autoSelectd : originalData[i].detail[j].autoSelectd,
                        selectd : originalData[i].detail[j].selectd,
                        seq : originalData[i].detail[j].seq,
                        vindex : originalData[i].detail[j].vindex,
                        voiceindex : originalData[i].detail[j].voiceindex,
                        protocoleptype : originalData[i].protocoleptype
                    });
                }
            }
        }
    },

    sortList : function(list, sortHistory, isOriginal)
    {
        var me = this;
        var names = [];
        var sequencing = [];
        for(var i = 0;i < sortHistory.length;i++)
        {
            if(isOriginal && sortHistory[i].col > 2)
            {
                names.push(me.masterColumnIndex.names[me.masterColumnIndex.protocolname] + (sortHistory[i].col - 2));
            }
            else
            {
                names.push(me.masterColumnIndex.names[sortHistory[i].col]);
            }
            sequencing.push(sortHistory[i].val);
        }
        sortObjectArray(list, names, sequencing, "object");
    },

    getFilterData : function(dataTemp, columnInfo)
    {
        var me = this;

        var filterList = [];
        var filterCheckedBak = {};
        var filterCheckedUsed = {};
        for(var j = 0;j < columnInfo.length;j++)
        {

            if(columnInfo[j].filter != null && columnInfo[j].filter.list.length > 0)
            {
                me.filterArrrayToObject(filterCheckedBak, columnInfo[j].filter.list, columnInfo[j].filter.key);
                columnInfo[j].filter.list = [];
            }
        }
        for(var i = 0;i < dataTemp.length;i++)
        {
            var filterFlg = false;
            for(var j = 0;j < columnInfo.length;j++)
            {
                if(columnInfo[j].filter == null)
                {
                    continue;
                }
                var key = columnInfo[j].filter.key;
                var keyVal = dataTemp[i][key];

                var checkKey = key + MasterSplitSign + keyVal;
                if(filterCheckedBak[checkKey] == null)
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : true
                    });
                    filterCheckedBak[checkKey] = true;
                    filterCheckedUsed[checkKey] = true;
                }
                else if(!filterCheckedUsed[checkKey])
                {
                    columnInfo[j].filter.list.push({
                        value   : keyVal,
                        check   : filterCheckedBak[checkKey]
                    });
                    filterCheckedUsed[checkKey] = true;
                }
                if(!filterCheckedBak[checkKey])
                {
                    filterFlg = true;
                }
            }
            if(filterFlg)
            {
                continue;
            }
            dataTemp[i].index = i;
            dataTemp[i].displayIndex = filterList.length;
            filterList.push(dataTemp[i]);
        }
        return filterList;
    },

    filterArrrayToObject : function(obj, ary, name)
    {
        var me = this;
        for(var i = 0;i < ary.length;i++)
        {
            var _key = name + MasterSplitSign + ary[i].value;
            obj[_key] = ary[i].check;
        }
    },

    createMasterListTabelHtml : function(ph, sortFlg)
    {
        var me = this;
        if(sortFlg)
        {
            me.setMasterByOriginal(me.originalData);
            me.sortList(me.masterTempData, me.sortHistoryMaster);
        }

        var masterDisplay = me.getFilterData(me.masterTempData, me.westNorthPanel.columnData);

        var maxCount = 0;
        var cellEndHeight = ph % this.cellHeight;
        maxCount = (ph - cellEndHeight) / this.cellHeight;
        if(cellEndHeight > 0)
        {
            maxCount++;
        }

        if(masterDisplay.length > maxCount)
        {
            maxCount = masterDisplay.length;
        }

        var _array = new Array();

        _array.push('<table onselectstart="return false" ');
        _array.push('ondrag="return false" ');
        _array.push('class = "Master-Grid-Table">');

        var columnInfo = me.westNorthPanel.columnData;
        for(var i = 0;i < maxCount;i++)
        {
            var _css = "odd";
            if(i % 2 == 0)
            {
                _css = "even";
            }

            if(i >= masterDisplay.length)
            {
                var _cellHeight = 0;
                if(i == maxCount - 1)
                {
                    if(cellEndHeight == 0)
                    {
                        _cellHeight = this.cellHeight;
                    }
                    else
                    {
                        _cellHeight = cellEndHeight - 1;
                    }
                }
                else
                {
                    _cellHeight = this.cellHeight;
                }

                _array.push('<tr class = "' + _css + '">');
                //patienttype
                _array.push('<td width = "' + columnInfo[me.masterColumnIndex.patienttype].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

                //organ
                _array.push('<td width = "' + columnInfo[me.masterColumnIndex.organ].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

                //protocolname
                _array.push('<td width = "' + columnInfo[me.masterColumnIndex.protocolname].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');

                //machinename
                _array.push('<td class = "end" ');
                _array.push('width = "' + columnInfo[me.masterColumnIndex.machinename].width + '" ');
                _array.push('height = "' + _cellHeight + '"></td>');
            }
            else
            {
                var tdCls = "unselect";
                if(masterDisplay[i].autoSelectd != null &&
                   masterDisplay[i].autoSelectd == true)
                {
                    tdCls = "added";
                }

                _array.push('<tr class = "' + _css + '" ');
                _array.push('index = ' + masterDisplay[i].index + '>');

                var _patienttype = masterDisplay[i].patienttype;
                var protocoleptype = masterDisplay[i].protocoleptype;
                if(me.processStatus == MasterProcessStatus.CreationSureIQ)
                {
                    _patienttype = "";
                }
                //patienttype
                me.createTdHtml(
                    _array,
                    _patienttype,
                    columnInfo[me.masterColumnIndex.patienttype].width,
                    33,
                    tdCls,
                    null,
                    protocoleptype
                );

                //organ
                me.createTdHtml(
                    _array,
                    masterDisplay[i].organ,
                    columnInfo[me.masterColumnIndex.organ].width,
                    33,
                    tdCls,
                    null,
                    protocoleptype
                );

                var protocolnameWidth = columnInfo[me.masterColumnIndex.protocolname].width;
                if(protocolnameWidth == "")
                {
                    protocolnameWidth = me.westNorthPanel.getSpaceCellWidth();
                }
                //protocolname
                me.createTdHtml(
                    _array,
                    masterDisplay[i].protocolname,
                    protocolnameWidth,
                    33,
                    tdCls,
                    null,
                    protocoleptype
                );

                //machinename
                me.createTdHtml(
                    _array,
                    masterDisplay[i].machinename,
                    columnInfo[me.masterColumnIndex.machinename].width,
                    33,
                    tdCls + ' end',
                    null,
                    protocoleptype
                );
            }
            _array.push('</tr>');
        }

        _array.push('</table>');

        return _array.join('');

    },

    createSpaceTdHtml : function(_array, width, cellHeight, tdCls)
    {
        _array.push('<td width = "' + width + '" ');
        _array.push('height = "' + cellHeight + '"></td>');
    },

    createTdHtml    : function (_array, val, width, height, tdCls, spanCls, protocoleptype)
    {
        _array.push('<td ');
        if(getStringWidth('12pt', val, true) > width - 15)
        {
            _array.push('data-qtip="');
            _array.push(val.replace('"', '&quot'));
            _array.push('" ');
        }

        if(width != "")
        {
            _array.push('width = "' + width + '" ');
        }
        _array.push('height = "' + height + '" ');
        if(tdCls != null)
        {
            _array.push('class = "' + tdCls +'"');
        }
        _array.push('>');

        _array.push('<span ');
        if(spanCls != null)
        {
            _array.push('class = "' + spanCls +'" ');
        }
        _array.push('unselectable="on">');

        if (protocoleptype === 'Service') {
            //_array.push('<span class="serviceStyle">');
            _array.push(val);
            //_array.push('</span>');
        } else {
            _array.push(val);
        }

        _array.push('</span>');
        _array.push('</td>');
    },

    createTdHtmlExamPlan    : function (_array, val, width, height, tdCls, spanCls, protocoleptype, tooltip)
    {
        _array.push('<td ');
        // if(getStringWidth('12pt', val, true) > width - 15)
        // {
        //     _array.push('data-qtip="');
        //     _array.push(tooltip);
        //     _array.push('" ');
        // }
        var temp
        if (tooltip) {
            temp = tooltip.replace('"', '&quot');
        }

        _array.push('data-qtip="');
        _array.push(temp);
        _array.push('" ');

        if(width != "")
        {
            _array.push('width = "' + width + '" ');
        }
        _array.push('height = "' + height + '" ');
        if(tdCls != null)
        {
            _array.push('class = "' + tdCls +'"');
        }
        _array.push('>');

        _array.push('<span ');
        if(spanCls != null)
        {
            _array.push('class = "' + spanCls +'" ');
        }
        _array.push('unselectable="on">');

        if (protocoleptype === 'Service') {
            //_array.push('<span class="serviceStyle">');
            _array.push(val);
            //_array.push('</span>');
        } else {
            _array.push(val);
        }

        _array.push('</span>');
        _array.push('</td>');
    },

    createOriginalListTableHtml : function(ph, sortFlg)
    {
        var me = this;

        me.prepareToAdd = [];
        if(sortFlg)
        {
            me.sortList(me.originalData, me.sortHistoryOriginal, true);
        }

        var originalDisplay = me.getFilterData(me.originalData, me.eastNorthPanel.columnData);

        var maxCount = 0;
        var cellEndHeight = ph % me.cellHeight;
        maxCount = (ph - cellEndHeight) / me.cellHeight;
        if(cellEndHeight > 0)
        {
            maxCount++;
        }

        if(originalDisplay.length > maxCount)
        {
            maxCount = originalDisplay.length;
        }

        var _array = [];

        _array.push('<table onselectstart="return false" ');
        _array.push('ondrag="return false" ');
        _array.push('style="width: ' + me.originalTableWidth + 'px;" ');
        _array.push('class = "Master-Grid-Table">');

        var columnInfo = me.eastNorthPanel.columnData;

        for(var i = 0;i < maxCount;i++)
        {
            var _css = "odd";
            if(i % 2 == 0)
            {
                _css = "even";
            }

            if (originalDisplay[i] && originalDisplay[i].sameparameters === false) {
                var _css = "odddiff";
                if (i % 2 === 0) {
                    _css = "evendiff"
                }
            }

            if(i >= originalDisplay.length)
            {
                _array.push('<tr class = "' + _css + '">');

                var _cellHeight = 0;
                if(i == maxCount - 1)
                {
                    if(cellEndHeight == 0)
                    {
                        _cellHeight = this.cellHeight;
                    }
                    else
                    {
                        _cellHeight = cellEndHeight - 1;
                    }
                }
                else
                {
                    _cellHeight = this.cellHeight;
                }

                for(var j = 0;j < columnInfo.length;j++)
                {
                    me.createSpaceTdHtml(_array, columnInfo[j].width, _cellHeight);
                }
            }
            else
            {
                var protocoleptype = originalDisplay[i].protocoleptype;
                _array.push('<tr class = "' + _css + '" ');
                _array.push('index = ' + originalDisplay[i].index + '>');
                var _patienttype = originalDisplay[i].patienttype;
                if(me.processStatus == MasterProcessStatus.CreationSureIQ)
                {
                    _patienttype = "";
                }
                //patienttype
                me.createTdHtml(
                    _array,
                    _patienttype,
                    columnInfo[me.masterColumnIndex.patienttype].width,
                    me.cellHeight,
                    null,
                    'no-mouse',
                    protocoleptype
                );

                //organ
                var organWidth = columnInfo[me.masterColumnIndex.organ].width;
                if(organWidth == "")
                {
                    organWidth = me.eastNorthPanel.getSpaceCellWidth();
                }
                me.createTdHtml(
                    _array,
                    originalDisplay[i].organ,
                    organWidth,
                    me.cellHeight,
                    null,
                    'no-mouse',
                    protocoleptype
                );

                for(var j = 0;j < originalDisplay[i].detail.length;j++)
                {
                    var tdCls = 'unselect';
                    var spanCls = null;
                    if(originalDisplay[i].detail[j].selectd == true ||
                       originalDisplay[i].detail[j].autoSelectd == true)
                    {
                        tdCls = "added";
                    }
                    if(originalDisplay[i].detail[j].protocolname == null ||
                       originalDisplay[i].detail[j].protocolname == "")
                    {
                        tdCls = "";
                        spanCls = 'no-mouse';
                    }
                    if(j == originalDisplay[i].detail.length - 1)
                    {
                        tdCls += ' end';
                    }
                    var temp = '';
                    if (originalDisplay[i].detail[j].protocolname && originalDisplay[i].detail[j].epno) {
                        temp = originalDisplay[i].detail[j].protocolname + ' (' + originalDisplay[i].detail[j].epno + ")";
                    } else if(originalDisplay[i].detail[j].voiceindex){
                        temp = originalDisplay[i].detail[j].protocolname+ ' (' + originalDisplay[i].detail[j].voiceindex + ")";
                    } else {
                        temp = originalDisplay[i].detail[j].protocolname;
                    }
                    me.createTdHtmlExamPlan(
                        _array,
                        originalDisplay[i].detail[j].protocolname,
                        columnInfo[2 + j].width,
                        me.cellHeight,
                        tdCls,
                        spanCls,
                        protocoleptype,
                        temp
                    );
                }

            }
            _array.push('</tr>');
        }

        _array.push('</table>');

        return _array.join('');
    },

    checkParameters : function()
    {
        var me = this;
        if(me.prepareToAdd.length == 0){
            return;
        }
        var checkParam = [];

        for(var i = 0;i < me.prepareToAdd.length;i++)
        {
            var data = me.originalData[me.prepareToAdd[i].y];
            var details = data.detail[me.prepareToAdd[i].x - 2];
            checkParam.push({
                machinename : details.machinename,
                key         : details.key,
                protocolname: details.protocolname,
                protocoleptype: data.protocoleptype
            });
        }
        var orderFlg = false;
        if (checkParam.length == 2) {
            if (compareString(checkParam[0].machinename,checkParam[1].machinename) == 0) {
                orderFlg = true;
            }
        }

        checkParam.sort(function(a, b) {
            return compareString(a.machinename,b.machinename);
        });
        var onlyDiff = true;
        if (me.prepareToAdd.length === 1) {
            onlyDiff = false;
        }

        var tableEls = me.eastCenterPanel.body.dom.getElementsByClassName("Master-Grid-Table");
        var checkParametersPanel = Ext.create('PM.view.master.CheckParametersView',{
            mainPanel       : me,
            width           : 1280,
            height          : 567,
            checkParam      : checkParam,
            onlyDiff        : onlyDiff,
            processStatus    : me.processStatus,
            orderFlg        : orderFlg,
            clickForAddOrRemove : function (e) {
                var el = e.target;
                if (el.className.indexOf('parameters-Scanner') !== -1) {
                    var data = me.originalData[me.prepareToAdd[el.attributes.index.value - 1].y];
                    var trEls = tableEls[0].getElementsByTagName("TR");
                    var tdEl = trEls[data.displayIndex].childNodes;
                    var machinename = [];
                    for (var i = 0, len = data.detail.length; i < len; i++) {
                        machinename.push(data.detail[i].machinename);
                    }
                    var index = machinename.indexOf(el.childNodes[0].wholeText);
                    if (el.attributes.index.value === '1') {
                        if (tdEl[2 + index].className.indexOf('add') !== -1) {
                            return false;
                        }

                    } else if (el.attributes.index.value === '2') {
                        if (tdEl[2 + index].className.indexOf('add') !== -1) {
                            return false;
                        }
                    } else {
                            return el.attributes.index.value;
                    }
                    return el.attributes.index.value;
                } else {
                    return false;
                }
            },
            checkMenuStatus  : function (e) {
                var el = e.target;
                var temp = [];
                temp.push(me.prepareToAdd[el.attributes.index.value - 1]);
                return me.checkMenuStatus(temp);

            },
            addToMasterList  :function(addIndex){
                me.addToMasterList(addIndex);
            }
        });
        checkParametersPanel.show();
    },

    setOriginalDataByManual: function(originalData, masterData, checkRepeat)
    {
        var me = this;
        for(var i = 0;i < originalData.length;i++)
        {
            for(var j = 0;j < originalData[i].detail.length;j++)
            {
                for(var k = 0;k < masterData.length;k++)
                {
                    if(masterData[k].protocolname == originalData[i].detail[j].protocolname &&
                       masterData[k].patienttype == originalData[i].patienttype &&
                       masterData[k].organ == originalData[i].organ &&
                       masterData[k].key == originalData[i].detail[j].key)
                    {
                        var checkKey = masterData[k].protocolname + MasterSplitSign +
                                       masterData[k].patienttype + MasterSplitSign +
                                       masterData[k].organ;

                        originalData[i].detail[j].selectd = true;
                        originalData[i].detail[j].seq = masterData[k].seq;
                        checkRepeat[checkKey] = {
                            key : masterData[k].key,
                            machinename : originalData[i].detail[j].machinename
                        };
                        break;
                    }
                }
            }
        }
    },

    initOriginalData : function(responseObj, originalData, masterData)
    {
        var me = this;

        me.initErrorStatus();

        if(responseObj.scannerlist.length == 0)
        {
            return;
        }
        if(responseObj.conflictnamelist != null && responseObj.conflictnamelist.length > 0)
        {
            for(var i = 0;i < responseObj.conflictnamelist.length;i++)
            {
                me.errorStatus.RepeatList.push(responseObj.conflictnamelist[i]);
            }
        }
        deepClone(originalData, responseObj.originallist);

        if(me.processStatus == MasterProcessStatus.CreationVoice)
        {
            for(var i = 0;i < originalData.length;i++)
            {
                originalData[i].patienttype = originalData[i].language;
            }
        }

        var checkRepeat = {};
        var checkCorrectnessTemp = me.createCheckTemp();

        if(masterData != null && masterData.length != 0)
        {
            me.setOriginalDataByManual(originalData, masterData, checkRepeat);

            me.getCorrectnessByManual(checkCorrectnessTemp, masterData);
        }

        for(var i = 0;i < originalData.length;i++)
        {
            for(var j = 0;j < originalData[i].detail.length;j++)
            {
                var _protocolName = originalData[i].detail[j].protocolname;

                var _protocolNameColumn = me.masterColumnIndex.names[me.masterColumnIndex.protocolname];
                if(j != 0)
                {
                    _protocolNameColumn = _protocolNameColumn + j;
                }
                if(_protocolName != null &&
                   _protocolName != "")
                {
                    originalData[i][_protocolNameColumn] = _protocolName;
                }
                else
                {
                    originalData[i][_protocolNameColumn] = ""
                }

                if(originalData[i].detail[j].attachtolist != null &&
                   originalData[i].detail[j].attachtolist.length > 0)
                {
                    var checkKey = _protocolName + MasterSplitSign +
                                   originalData[i].patienttype + MasterSplitSign +
                                   originalData[i].organ;
                    if(originalData[i].detail[j].vindex !== undefined){
                        checkKey+=originalData[i].detail[j].vindex;
                    }
                    if(checkRepeat[checkKey] != null &&
                       checkRepeat[checkKey].key != originalData[i].detail[j].key)
                    {
                        var _key = me.getKey(originalData[i].patienttype,
                                             originalData[i].organ,
                                             _protocolName,
                                             checkRepeat[checkKey].machinename);

                        if(me.errorStatus.RepeatList.indexOf(_key) != -1)
                        {
                            me.errorStatus.RepeatList.push(_key);
                        }
                        originalData[i].detail[j].autoSelectd = false;
                    }
                    else
                    {
                        checkRepeat[checkKey] = {
                            key : originalData[i].detail[j].key,
                            machinename : originalData[i].detail[j].machinename
                        };
                        originalData[i].detail[j].autoSelectd = true;
                    }

                    if(me.processStatus == MasterProcessStatus.CreationSureIQ ||
                       me.processStatus == MasterProcessStatus.CreationSureExp ||
                       me.processStatus == MasterProcessStatus.CreationVoice)
                    {
                        if((originalData[i].detail[j].selectd == null ||
                            originalData[i].detail[j].selectd == false) &&
                            originalData[i].detail[j].autoSelectd &&
                            me.checkCorrectness(
                                checkCorrectnessTemp,
                                {
                                    patienttype : originalData[i].patienttype,
                                    organ : originalData[i].organ,
                                    protocolname : _protocolName,
                                    machinename : originalData[i].detail[j].machinename
                                }))
                        {
                            originalData[i].detail[j].autoSelectd = false;
                        }
                    }
                }
            }
        }
    },

    updateOriginalHeader : function(change, sw, ph)
    {
        var me = this;
        if(change)
        {
            //remove all scanner
            me.eastNorthPanel.columnData.splice(2, me.eastNorthPanel.columnData.length - 2);
        }

        var scanners = me.getScannerListData();
        var columnWidth = 400;
        if(scanners.length >= 2)
        {
            var cWidth = 160;
            var _4k_organ_width = '';
            if(memoryLanguage == 'IT')
            {
                cWidth = 160;
                _4k_organ_width = 172;
            }
            me.eastNorthPanel.columnData[me.masterColumnIndex.patienttype].width = cWidth;
            //me.eastNorthPanel.columnData[me.masterColumnIndex.organ].width = me.westNorthPanel.columnData[me.masterColumnIndex.organ].width;
            _4k_organ_width = (document.documentElement.clientWidth > 2000) ? 172 : _4k_organ_width;
            me.eastNorthPanel.columnData[me.masterColumnIndex.organ].width = _4k_organ_width;
            columnWidth = cWidth * 2;
        }
        var minScannerWidth = 250;
        var otherWidth = 695;

        var panelWidth = sw - otherWidth;
        var divWidth = columnWidth + scanners.length * minScannerWidth + chromeScrollWidth;
        if(divWidth > panelWidth)
        {
            me.scannersWidth = (divWidth - chromeScrollWidth - columnWidth) / scanners.length;
            me.originalTableWidth = divWidth - chromeScrollWidth;
            me.eastCenterPanel.body.removeCls("panel-ScrollBorder-NoPadding");
            me.eastCenterPanel.body.addCls("panel-ScrollBorder-xy-NoPadding");
            me.eastNorthPanel.setPrivateScrollWidth(divWidth - chromeScrollWidth);

            me.eastCenterPanel.body.dom.onscroll = function()
            {
                me.eastNorthPanel.body.dom.scrollLeft = this.scrollLeft;
            }
            ph = ph - chromeScrollWidth;
        }
        else
        {
            me.scannersWidth = (panelWidth - chromeScrollWidth - columnWidth) / scanners.length;
            me.originalTableWidth = panelWidth - chromeScrollWidth;
            me.eastCenterPanel.body.removeCls("panel-ScrollBorder-xy-NoPadding");
            me.eastCenterPanel.body.addCls("panel-ScrollBorder-NoPadding");
            me.eastNorthPanel.setPrivateScrollWidth(panelWidth - chromeScrollWidth);
        }
        for(var i = 0;i < scanners.length;i++)
        {
            if(change)
            {
                me.eastNorthPanel.columnData.push({
                    cls         : 'Master-Column-machinename',
                    value       : scanners[i],
                    sort        : true,
                    width       : me.scannersWidth,
                    minWidth    : 40,
                    arrowsCls   : "Master-Column-Sort",
                    otherArea   : {
                        width   : 40,
                        val     : '<div class="icon-button-addAll-Master" data-qtip="' + stringSetting.master.menu.addAll + '"></div>',
                        cls     : 'addbutton'

                    },
                    arrowsValue : MasterListArrows.ValueNone
                });
            }
            else
            {
                me.eastNorthPanel.columnData[i + 2].width = me.scannersWidth;
            }
        }
        me.eastNorthPanel.panelUpdate();
        return ph;
    },

    panelUpdateMaster : function()
    {
        var me = this;
        me.westCenterPanel.update(me.createMasterListTabelHtml(me.panelHeight, true));
    },

    panelUpdateOriginal : function()
    {
        var me = this;
        me.eastCenterPanel.update(me.createOriginalListTableHtml(me.panelHeight, true));
    },

    rightClickMaster : function(e)
    {
        var me = this;
        var el = e.target;

        if(e.button != 2)
        {
            return -1;
        }

        if(el.nodeName == 'SPAN')
        {
            el = el.parentElement;
            if (el.nodeName != 'TD') {
                el = el.parentElement;
            }
        }
        else if(el.nodeName != 'TD')
        {
            return -1;
        }
        if(el.className.indexOf('added') != -1)
        {
            return -1;
        }

        return el.parentElement.getAttribute("index");
    },

    removeMaster : function(key)
    {
        var me = this;
        var master = me.getManualMasterData();
        for(var i = 0;i < master.length;i++)
        {
            if(master[i].key == key)
            {
                master.splice(i, 1);
                break;
            }
        }
    },

    updateTableAndData : function(addList, state)
    {
        var me = this;
        me.updateOriginlData(addList);
        me.panelUpdateMaster();
        me.panelUpdateOriginal();
        me.setOriginalTable();
        if (state === true) {
            me.prepareToAdd = [];
        }
        me.setNextButtonStauts();
    },

    allPanelUpdate : function(flag, sh, sw)
    {
        var me = this;
        var ph = 0;
        if(sh != null && sh - 299 > ph)
        {
            ph = sh - 299;
        }
        if(sw != null && sh != null)
        {
            ph = me.updateOriginalHeader(flag, sw, ph);
            me.panelHeight = ph;
        }

        me.westCenterPanel.update(me.createMasterListTabelHtml(me.panelHeight, flag));
        me.eastCenterPanel.update(me.createOriginalListTableHtml(me.panelHeight, flag));
    },

    removeSelected : function(x, y, el)
    {
        var me = this;
        for(var i = 0;i < me.prepareToAdd.length;i++)
        {
            var _x = me.prepareToAdd[i].x;
            var _y = me.prepareToAdd[i].el_y;
            if(_x == x && y == _y)
            {
                var added = me.prepareToAdd[i].added;
                if(added)
                {
                    el.className = el.className.replace('onselect','added');

                }
                else
                {
                    el.className = el.className.replace('onselect','unselect');
                }
                me.prepareToAdd.splice(i, 1);
                break;
            }
        }
    },

    addSelectedTD : function(el)
    {
        var me = this;

        var x = el.cellIndex;
        var el_y = el.parentElement.rowIndex;
        var y = el.parentElement.getAttribute("index");
        if(el.className.indexOf('unselect') != -1)
        {
            me.prepareToAdd.push({
                x : x,
                y : y,
                el_y : el_y
            });
            el.className = el.className.replace('unselect','onselect');
        }
        else if(el.className.indexOf('added') != -1)
        {
            me.prepareToAdd.push({
                x : x,
                y : y,
                el_y : el_y,
                added : true
            });
            el.className = el.className.replace('added','onselect');
        }
        else
        {
            me.removeSelected(x, el_y, el);
        }
    },

    clickForAddOrRemove : function(e)
    {
        var me = this;

        var el = e.target;
        if(el.nodeName == 'SPAN')
        {
            el = el.parentElement;
            if (el.nodeName != 'TD') {
                el = el.parentElement;
            }
        }
        else if(el.nodeName != 'TD')
        {
            return false;
        }

        var _event = event || window.event;
        var keyFlag = _event.ctrlKey;

        if(el.className.indexOf('onselect') == -1 &&
           el.className.indexOf('unselect') == -1 &&
           el.className.indexOf('added') == -1)
        {
            return false;
        }

        if(e.button == 2 && el.className.indexOf('onselect') != -1)
        {
            return true;
        }
        else if(keyFlag && e.button != 2)
        {
            me.addSelectedTD(el);
        }
        else
        {
            for(var i = 0;i < me.prepareToAdd.length;i++)
            {
                var x = me.prepareToAdd[i].x;
                var el_y = me.prepareToAdd[i].el_y;
                var added = me.prepareToAdd[i].added;
                var tdEl = el.parentElement.parentElement.childNodes[el_y].childNodes[x];
                if(added)
                {
                    tdEl.className = tdEl.className.replace('onselect','added');
                }
                else
                {
                    tdEl.className = tdEl.className.replace('onselect','unselect');
                }
            }
            me.prepareToAdd = [];
            me.addSelectedTD(el);
        }
        return true;
    },

    setOriginalTable : function()
    {
        var me = this;
        var tableEls = me.eastCenterPanel.body.dom.getElementsByClassName("Master-Grid-Table");
        if(tableEls != null && tableEls.length > 0)
        {
            var unselectEl = tableEls[0].getElementsByClassName("unselect");
            for(var i = unselectEl.length - 1;i >= 0;i--)
            {
                var el = unselectEl[i];
                var rowIndex = el.parentElement.getAttribute("index");
                var cellIndex = el.cellIndex - 2;
                if(me.originalData[rowIndex].detail[cellIndex].autoSelectd ||
                   me.originalData[rowIndex].detail[cellIndex].selectd)
                {
                    el.className = el.className.replace('unselect','added');
                }
            }
            var selectEl = tableEls[0].getElementsByClassName("onselect");
            for(var i = selectEl.length - 1;i >= 0;i--)
            {
                var el = selectEl[i];
                var rowIndex = el.parentElement.getAttribute("index");
                var cellIndex = el.cellIndex - 2;
                if(me.originalData[rowIndex].detail[cellIndex].autoSelectd ||
                   me.originalData[rowIndex].detail[cellIndex].selectd)
                {
                    el.className = el.className.replace('onselect','added');
                }
                else
                {
                    el.className = el.className.replace('onselect','unselect');
                }
            }
        }
    },

    addMultOriginals : function()
    {
        var me = this;
        if(me.prepareToAdd.length == 0)
        {
            return;
        }

        if(me.addMasterList(me.prepareToAdd))
        {
            me.updateTableAndData(me.prepareToAdd, true);
        }
    },

    addMultOriginalsForSingle : function(addIndex)
    {
        var me = this;
        if(me.prepareToAdd.length == 0)
        {
            return;
        }
        var temp = [];
        temp.push(me.prepareToAdd[addIndex - 1]);
        if(me.addMasterList(temp))
        {
            me.updateTableAndData(temp, false);
        }
    },

    updateOriginlData : function(addList)
    {
        var me = this;
        for(var i = 0;i < addList.length;i++)
        {
            if(addList[i].added)
            {
                continue;
            }
            var data = me.originalData[addList[i].y];
            var details = data.detail[addList[i].x - 2];
            details.selectd = true;
            details.seq = addList[i].seq;
        }
    },

    scannerItemClickFn:function(itemIndex, mPanel)
    {
        if(mPanel == null)
        {
            return;
        }
        if(mPanel.mainPanel.scannerIndex == itemIndex)
        {
            return;
        }
        mPanel.mainPanel.scannerIndex = itemIndex;
        mPanel.reload();
    },

    getDefaultValue:function()
    {
        var me = this;
        var defaultV = '';
        if(me.mainPanel.settingNameList.length == 0 &&
           me.scannerGroupStore != null &&
           me.scannerGroupStore.data.items.length > 0)
        {
            for(var i = 0; i < me.scannerGroupStore.data.items.length;i++)
            {
                var lineData = me.scannerGroupStore.data.items[i];
                if(lineData.data.settingname != "")
                {
                    me.mainPanel.settingNameList.push(lineData.data.settingname);
                    me.mainPanel.groupIconList.push(lineData.data.hasapprovedprotocols);
                }
            }
        }
        if(me.mainPanel.settingNameList.length > 0)
        {
            if(me.mainPanel.scannerIndex != -1)
            {
                defaultV = me.mainPanel.settingNameList[me.mainPanel.scannerIndex];
            }else
            {
                defaultV = me.mainPanel.settingNameList[0];
                me.mainPanel.scannerIndex = 0;
            }
        }
        return defaultV;
    },

    getScannerCombobox:function()
    {
        var me = this;

        me.scannerCombobox = Ext.create('PM.view.combox.DropdownListView', {
            width       : 260,
            textAlign   : 'center',
            colorModel  : 'skyblue',
            disabled    : me.processStatus != MasterProcessStatus.CreationEP,
            defaultValue: me.getDefaultValue()
        });
        me.scannerCombobox.createMenu(me.mainPanel.settingNameList, me.scannerItemClickFn, me);
        return me.scannerCombobox.combinedIconPanel('scanner_combobox_icon');
    },

    updateScannerCombobox:function() {
        var me = this;
        var dv = me.getDefaultValue();
        me.scannerCombobox.removeAllItems();
        me.scannerCombobox.createMenuWithIcon(me.mainPanel.settingNameList,
            me.scannerItemClickFn,
            me.mainPanel.groupIconList,
            me);
        me.scannerCombobox.setSelectValue(dv);
    },

    getMasterListParams : function()
    {
        var me = this;

//      var aryKey = [];
//      for(var i = 0;i < me.masterTempData.length;i++)
//      {
//          aryKey.push(me.masterTempData[i].key);
//      }
//      return aryKey.join('<,>');

        var aryKey = [];
        for(var i = 0;i < me.masterTempData.length;i++)
        {
            aryKey.push({
                filepath : me.masterTempData[i].key,
                seq : me.masterTempData[i].seq
            });
        }
        sortArrayCommon(aryKey, "seq", "ASC", "object");
        return aryKey;
    },

    clearData : function()
    {
        var me = this;
        me.sortHistoryMaster = [
            {col    : me.masterColumnIndex.patienttype,
             val    : 'ASC'},
            {col    : me.masterColumnIndex.organ,
             val    : 'ASC'},
            {col    : me.masterColumnIndex.protocolname,
             val    : 'ASC'}
        ];
        me.sortHistoryOriginal = [
            {col    : me.masterColumnIndex.patienttype,
             val    : 'ASC'},
            {col    : me.masterColumnIndex.organ,
             val    : 'ASC'},
            {col    : me.masterColumnIndex.protocolname,
             val    : 'ASC'}
        ];
        me.prepareToAdd = [];
        me.originalData = [];
        me.masterTempData = [];
        me.resObj = {};
        me.initErrorStatus();
    },

    initErrorStatus : function()
    {
        var me = this;

        me.errorStatus = {
            RepeatList : [],
            TotallyMaxCards : false,
            OrganType : false,
            PatientType : false,
            MaxOrgans : false,
            Organs:[],
            MaxCards : false,
            OrganCards:{},
            MaxLanguage : false,
            Languages : [],
            MaxCommandOfLanguage : false,
            Commands : {}
        };
    },

    getBrListStr : function(list, max)
    {
        var me = this;
        if(max != null)
        {
            var ret = [];

            for(var i = 0;i < list.length;i++)
            {
                if(i >= max)
                {
                    ret.push(list[i]);
                }
                else
                {
                    ret.push('<SPAN style="color:Grey;">' + list[i] + "</SPAN>");
                }
            }
            return ret.join('<br>');
        }
        else
        {
            return list.join('<br>');
        }
    },

    getMaxCardErrName : function(o)
    {
        var me = this;
        var ary = [];

        if(me.processStatus != MasterProcessStatus.CreationSureIQ)
        {
            ary.push(o.patienttype);
        }
        ary.push(o.organ);
        ary.push(o.protocolname);
        ary.push("(" + o.machinename + ")");
        return ary.join(' ');
    },

    createCheckTemp : function()
    {
        return {};
    },

    addToMasterList : function(addIndex){
        var me = this;
        me.addMultOriginalsForSingle(addIndex);
    },

    //interface
    getCorrectnessByManual : function(){},
    checkCorrectness : function(){},
    checkProperty : function(){},
    checkOriginalProperty : function(){},
    checkAdded : function(){},
    checkNextStatus : function(){ return true; },
    initStore : function(){},
    loadData : function(){},
    reload : function(){},
    pushData : function(){},
    getScannerListData : function(){},
    addMasterList : function(){},
    getManualMasterData : function(){},
    setNextButtonStauts : function(){},
    doRefreshEvent : function(){}
});
