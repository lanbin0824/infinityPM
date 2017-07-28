/*
 * ! JS Console CP Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.CPMaster
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.CPMaster', {
    extend : 'PM.view.master.select.BaseMaster',

    initComponent : function()
    {
        var me = this;
        me.callParent(arguments);
    },

    initStore : function()
    {
        var me = this;

        me.originalStore = Ext.create('PM.data.Ajax',
        {
            url: PROCESS_PATH_GLOBAL_ACTION + 'getmasterlistoriginallist.action',
            method      : "POST",
            loadData: function(responseObj)
            {
                me.loading = false;

                me.resObj = responseObj;

                me.pushData();
                me.resizeView(true);
                me.updateScannerCombobox();
                Ext.getBody().unmask();
                clearMask();

                if(me.errorStatus.RepeatList.length > 0)
                {
                    var errDetail = null;
                    errDetail = stringSetting.error.ERR0007;
                    errDetail.solution = me.getBrListStr(me.errorStatus.RepeatList);
                    var _message = Ext.create('PM.view.common.window.Message',{
                        errorDetail : errDetail
                    });
                    _message.showWin();
                }
            }
        });
    },
    loadData:function()
    {
        var me = this;
        me.updateScannerCombobox();
        me.requestSend();
    },
    requestSend: function()
    {
        var me = this;
        var params = me.mainPanel.getMasterListParams(MasterProcessStatus.CreationEP);

        me.originalStore.requestSend({
            params:
            {
                scannerGroup : me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                protocolType : ProtocolType.ContrastPreset,
                masterList   : JSON.stringify(params)
            }
        });
        me.loading = true;
    },
    pushData : function()
    {
        var me = this;

        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.CP);

    },
    getScannerListData:function()
    {
        var me = this;
        return me.resObj.scannerlist;
    },
    getManualMasterData : function()
    {
        var me = this;
        return me.mainPanel.manualMasterData.CP;
    },
    checkAdded : function(addedMaster, prepareMaster, addList)
    {
        var me = this;
        me.doOverWrite = false;
        me.doOverWriteList = [];

        var prepareOverWrite = {};

        for(var i = 0;i < addedMaster.length;i++)
        {
            var _protocolname = addedMaster[i].protocolname;
            var _patienttype = addedMaster[i].patienttype;
            var checkKey = _protocolname + MasterSplitSign + _patienttype;
            prepareOverWrite[checkKey] = me.getMaxCardErrName(addedMaster[i]);
        }

        for(var i = 0;i < prepareMaster.length;i++)
        {
            var _protocolname = prepareMaster[i].protocolname;
            var _patienttype = prepareMaster[i].patienttype;

            if(_patienttype != PatientType.Adult &&
               _patienttype != PatientType.Child)
            {
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR0017
                });
                _message.showWin();
                return false;
            }
            checkKey = _protocolname + MasterSplitSign + _patienttype;
            if(prepareOverWrite[checkKey] != null)
            {
                me.doOverWrite = true;
                me.doOverWriteList.push(prepareOverWrite[checkKey]);
                continue;
            }
        }

        if(!me.doOverWrite)
        {
            return true;
        }

        Ext.create('PM.view.common.window.ConfirmMessage', {
            labelText1      : stringSetting.master.message.add_repeat_message_contrastprest,
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
        var _patienttype = listA[indexA].patienttype;
        var __protocolname = listB[indexB].protocolname;
        var __patienttype = listB[indexB].patienttype;

        return (_protocolname == __protocolname &&
                _patienttype == __patienttype);
    },

    checkOriginalProperty : function(listA, indexA, listB, indexB, indexB2)
    {
        var _protocolname = listA[indexA].protocolname;
        var _patienttype = listA[indexA].patienttype;
        var __protocolname = listB[indexB].detail[indexB2].protocolname;
        var __patienttype = listB[indexB].patienttype;

        return (_protocolname == __protocolname &&
                _patienttype == __patienttype);
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
            var sequence = me.mainPanel.seq++;
            tempList.push({
                protocolname    : details.protocolname,
                patienttype     : data.patienttype,
                organ           : data.organ,
                key             : details.key,
                seq             : sequence
            });
            addList[i].seq = sequence;
            if(details.historyduplicate)
            {
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR0029
                });
                _message.showWin();
                return false;
            }
        }

        if(me.checkAdded(me.masterTempData, tempList, addList) == false)
        {
            return false;
        }

        me.mainPanel.manualMasterData.CP =
                me.mainPanel.manualMasterData.CP.concat(tempList);
        return true;
    },
    getKey : function(patienttype, organ, protocolname, machinename)
    {
        return patienttype + " " +
               protocolname +
               " (" + machinename + ")";
    },
    doRefreshEvent : function() {
        var me = this;
        Ext.getBody().mask();
        createMask();

        me.requestSend();
        panelMasterList.setIcon(false);
    }
});
