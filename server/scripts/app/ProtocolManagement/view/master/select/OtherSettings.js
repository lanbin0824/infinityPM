/*
 * ! JS Console EP Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.OtherSettings
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.OtherSettings', {
    extend              : 'PM.view.master.select.BaseMaster',
    alias: 'widget.masterselectothersettings',
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    },

    initStore : function()
    {
        var me = this;

        me.originalStore = Ext.create('PM.data.Ajax',
        {
            url: PROCESS_PATH_GLOBAL_ACTION + 'getmasterlistothersettings.action',
            method      : "GET",
            loadData: function(responseObj)
            {
                me.loading = false;

                me.resObj = responseObj;

                me.pushData();
                me.resizeView(true);

                me.setNextButtonStauts();

                Ext.getBody().unmask();
                clearMask();
            }
        });
    },
    loadData:function()
    {
        var me = this;

        me.originalStore.requestSend({
            params:
            {
                scannerGroup : me.mainPanel.settingNameList[me.mainPanel.scannerIndex]
            }
        });
        me.loading = true;
    },
    pushData : function()
    {
        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.Setting);
    },
    getScannerListData:function()
    {
        var me = this;
        return me.resObj.scannerlist;
    },
    getManualMasterData : function()
    {
        var me = this;
        return me.mainPanel.manualMasterData.Setting;
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
                       masterData[k].key == originalData[i].detail[j].key)
                    {
                        originalData[i].detail[j].selectd = true;
                        checkRepeat[masterData[k].protocolname] = masterData[k].key;
                        break;
                    }
                }
            }
        }
    },

    initOriginalData : function(responseObj, originalData, masterData)
    {
        var me = this;

        if(responseObj.scannerlist.length == 0)
        {
            return;
        }

        deepClone(originalData, responseObj.originallist);

        var checkRepeat = {};

        me.originalData = originalData.map(function(currentValue, index, array)
        {
//          console.log(currentValue, index, array)
            var _data = {};

            _data.detail = currentValue.detail.map(function(currentValue_in, index_in, array_in)
            {
                var detail = {
                    key : currentValue_in.filename,
                    machinename: responseObj.scannerlist[index_in]
                };
                if(currentValue_in.filename == null || currentValue_in.filename == "")
                {
                    detail.protocolname = "";
                }
                else
                {
                    detail.protocolname = currentValue.name;
                }
                var _protocolNameColumn = me.masterColumnIndex.names[me.masterColumnIndex.protocolname];
                if(0 != index_in)
                {
                    _protocolNameColumn = _protocolNameColumn + index_in;
                }
                _data[_protocolNameColumn] = detail.protocolname;
                return detail;
            })
            return _data;
        });

        if(masterData != null && masterData.length != 0)
        {
            me.setOriginalDataByManual(me.originalData, masterData, checkRepeat);
        }
    },

    checkAdded : function(addedMaster, prepareMaster, addList)
    {
        var me = this;
        me.doOverWrite = false;
        me.doOverWriteList = [];

        var prepareOverWrite = {};
        for(var i = 0;i < addedMaster.length;i++)
        {
            var checkKey = addedMaster[i].protocolname;
            prepareOverWrite[checkKey] = me.getMaxCardErrName(addedMaster[i]);
        }
        for(var i = 0;i < prepareMaster.length;i++)
        {
            var _protocolname = prepareMaster[i].protocolname;

            if(prepareOverWrite[_protocolname] != null)
            {
                me.doOverWrite = true;
                me.doOverWriteList.push(prepareOverWrite[_protocolname]);
                continue;
            }
        }

        if(!me.doOverWrite)
        {
            return true;
        }
        Ext.create('PM.view.common.window.ConfirmMessage', {
            labelText1      : stringSetting.master.message.add_repeat_message_other,
            labelText2      : stringSetting.master.message.confirmview_text2,
            nameList        : me.doOverWriteList,
            cancelEvent     : function()
            {

            },
            okEvent         : function()
            {
                var removeList = me.mergeManualMasterData(prepareMaster);
                for(var i = 0;i < removeList.length;i++)
                {
                    me.removeOriginal(removeList[i])
                }
                me.updateTableAndData(addList);
            }
        });
        return false;
    },

    checkProperty : function(listA, indexA, listB, indexB)
    {
        var _protocolname = listA[indexA].protocolname;
        var __protocolname = listB[indexB].protocolname;
        return (_protocolname == __protocolname);
    },

    checkOriginalProperty : function(listA, indexA, listB, indexB, indexB2)
    {
        var _protocolname = listA[indexA].protocolname;
        var __protocolname = listB[indexB].detail[indexB2].protocolname;
        return (_protocolname == __protocolname);
    },

    setNextButtonStauts :function()
    {
        var me = this;

        if(me.originalData.length == me.masterTempData.length)
        {
            me.mainPanel.btnNext.setDisabled(false);
        }
        else
        {
            me.mainPanel.btnNext.setDisabled(true);
        }
    },

    addMasterList : function(addList)
    {
        var me = this;
        var tempList = [];

        for(var i = 0;i < addList.length;i++)
        {
            if(addList[i].added)
            {
                continue;
            }
            var data = me.originalData[addList[i].y];
            var details = data.detail[addList[i].x - 2];
            tempList.push({
                protocolname    : details.protocolname,
                key             : details.key
            });
        }

        if(me.checkAdded(me.masterTempData, tempList, addList) == false)
        {
            return false;
        }

        me.mainPanel.manualMasterData.Setting =
                me.mainPanel.manualMasterData.Setting.concat(tempList);
        return true;
    },
    saveMasterToServer : function()
    {
        var me = this;
        var params = me.masterTempData.map(function(currentValue, index, array)
        {
            return currentValue.key;
        });
        PM.data.Connection.requestSend({
            url: PROCESS_PATH_GLOBAL_ACTION + 'setmasterlistothersettingsfiles.action',
            method      : "POST",
            params:
            {
                keepfilelist    : JSON.stringify(params)
            },
            loadData: function(responseObj, success)
            {
//              console.log(responseObj);
            }
        });
    },

    reload:function()
    {
        var me = this;

        me.clearData();

        Ext.getBody().mask();
        createMask();

        me.loadData();
    },

    doRefreshEvent : function() {
        var me = this;
        me.reload();
        panelMasterList.setIcon(false);
    }
});
