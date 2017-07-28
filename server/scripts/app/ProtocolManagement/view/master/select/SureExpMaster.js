/*
 * ! JS Console SureExp Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.SureExpMaster
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.SureExpMaster', {
    extend : 'PM.view.master.select.BaseMaster',

    MaxBodyCards : 5,
    MinBodyCards : 1,

    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    },

    initStore : function(){
        var me = this;

        me.originalStore = Ext.create('PM.data.Ajax',
        {
            url: PROCESS_PATH_GLOBAL_ACTION + 'getmasterlistoriginallist.action',
            method      : "POST",
            loadData: function(responseObj)
            {
                var totalCards = responseObj.limitation.TotalCards;
                if (totalCards) {
                    me.masterCount = totalCards;
                }
                var maxCard = responseObj.limitation.MaxCard;
                if (maxCard) {
                    me.MaxBodyCards = maxCard;
                }
                me.loading = false;

                me.resObj = responseObj;

                me.pushData();
                me.resizeView(true);
                me.updateScannerCombobox();
                Ext.getBody().unmask();
                clearMask();

                var errDetail = [];
                var errorNameList = [];

                if(me.errorStatus.MaxCards)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0016);
                    temp.details = temp.details.replace('{1}', me.MaxBodyCards);
                    errDetail.push(temp);
                    var cardList = [];
                    for(var o in me.errorStatus.OrganCards)
                    {
                        cardList.push(me.getBrListStr(me.errorStatus.OrganCards[o], me.MaxBodyCards));
                        cardList.push("")
                    }
                    errorNameList.push(me.getBrListStr(cardList));
                }
                if(me.errorStatus.TotallyMaxCards)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0013);
                    temp.details = temp.details.replace('{1}', me.masterCount);
                    errDetail.push(temp);
                    errorNameList.push(null);
                }
                if(me.errorStatus.PatientType)
                {
                    errDetail.push(stringSetting.error.ERR0014);
                    errorNameList.push(null);
                }
                if(me.errorStatus.OrganType)
                {
                    errDetail.push(stringSetting.error.ERR0015);
                    errorNameList.push(null);
                }

                if(me.errorStatus.RepeatList.length > 0)
                {
                    errDetail.push(stringSetting.error.ERR0005);
                    errorNameList.push(me.getBrListStr(me.errorStatus.RepeatList));
                }

                if(errDetail.length > 0)
                {
                    errDetail[0].status = "info";
                    var _message = Ext.create('PM.view.common.window.Message',{
                        errorDetailList : errDetail,
                        errorNameList : errorNameList,
                        isSolutionShowName : false
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
                protocolType : ProtocolType.SureExposure,
                masterList   : JSON.stringify(params)
            }
        });
        me.loading = true;
    },
    pushData : function()
    {
        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.SureExp);
    },
    getScannerListData:function()
    {
        var me = this;
        return me.resObj.scannerlist;
    },
    getManualMasterData : function()
    {
        var me = this;
        return me.mainPanel.manualMasterData.SureExp;
    },

    checkCorrectness : function(check, checkObj)
    {
        var me = this;

        if(checkObj.patienttype != PatientType.Adult &&
           checkObj.patienttype != PatientType.Child)
        {
            me.errorStatus.PatientType = true;
            return true;
        }
        if(checkObj.organ != BodyRegion.Head &&
           checkObj.organ != BodyRegion.Neck &&
           checkObj.organ != BodyRegion.All &&
           checkObj.organ != BodyRegion.ECG)
        {
            me.errorStatus.OrganType = true;
            return true;
        }
        var checkKey  = checkObj.patienttype + MasterSplitSign + checkObj.organ;
        if(check.EachMaxCard[checkKey] == null)
        {
            check.EachMaxCard[checkKey] = [];
            check.EachMaxCard[checkKey].push(me.getMaxCardErrName(checkObj));
        }
        else
        {
            var cardErrMessage = me.getMaxCardErrName(checkObj);
            check.EachMaxCard[checkKey].push(cardErrMessage);
            if(check.EachMaxCard[checkKey].length > me.MaxBodyCards)
            {
                me.errorStatus.MaxCards = true;

                if(me.errorStatus.OrganCards[checkKey] == null)
                {
                    me.errorStatus.OrganCards[checkKey] = [];
                    for(var i = 0;i < check.EachMaxCard[checkKey].length;i++)
                    {
                        me.errorStatus.OrganCards[checkKey].push(check.EachMaxCard[checkKey][i]);
                    }
                }
                else
                {
                    me.errorStatus.OrganCards[checkKey].push(cardErrMessage);
                }

                return true;
            }

        }

        check.TotallyMaxCard++;
        if(check.TotallyMaxCard > me.masterCount)
        {
            me.errorStatus.TotallyMaxCards = true;
            return true;
        }
        return false;
    },

    getCorrectnessByManual : function(check, masterData)
    {
        var me = this;
        for(var i = 0;i < masterData.length;i++)
        {
            var checkKey  = masterData[i].patienttype + MasterSplitSign + masterData[i].organ;
            if(check.EachMaxCard[checkKey] == null)
            {
                check.EachMaxCard[checkKey] = [];
                check.EachMaxCard[checkKey].push(me.getMaxCardErrName(masterData[i]));
            }
            else
            {
                check.EachMaxCard[checkKey].push(me.getMaxCardErrName(masterData[i]));

            }
            check.TotallyMaxCard++;
        }
    },

    checkAdded : function(addedMaster, prepareMaster)
    {
        var me = this;
        me.doOverWrite = false;
        me.doOverWriteList = [];
        me.initErrorStatus();
        var prepareOverWrite = [];

        var checkCorrectnessTemp = me.createCheckTemp();

        me.getCorrectnessByManual(checkCorrectnessTemp, addedMaster);

        for(var i = 0;i < addedMaster.length;i++)
        {
            var _protocolname = addedMaster[i].protocolname;
            var _patienttype = addedMaster[i].patienttype;
            var _organ = addedMaster[i].organ;

            var checkKey = _protocolname + MasterSplitSign + _patienttype + MasterSplitSign + _organ;
            prepareOverWrite[checkKey] = me.getMaxCardErrName(addedMaster[i]);
        }
        for(var i = 0;i < prepareMaster.length;i++)
        {
            var _protocolname = prepareMaster[i].protocolname;
            var _patienttype = prepareMaster[i].patienttype;
            var _organ = prepareMaster[i].organ;

            var checkKey = _protocolname + MasterSplitSign + _patienttype + MasterSplitSign + _organ;
            if(prepareOverWrite[checkKey] != null)
            {
                me.doOverWrite = true;
                me.doOverWriteList.push(prepareOverWrite[checkKey]);
                continue;
            }

            if(me.checkCorrectness(checkCorrectnessTemp, {
                    patienttype : _patienttype,
                    organ : _organ,
                    protocolname : _protocolname,
                    machinename : prepareMaster[i].machinename
                }))
            {
                var errMsg = {};
                if(me.errorStatus.MaxCards)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0016);
                    temp.details = temp.details.replace('{1}', me.MaxBodyCards);
                    errMsg = temp;
                    var cardList = [];
                    for(var o in me.errorStatus.OrganCards)
                    {
                        cardList.push(me.getBrListStr(me.errorStatus.OrganCards[o], me.MaxBodyCards));
                        cardList.push("")
                    }
                    errMsg.namelist = me.getBrListStr(cardList);
                }
                else if(me.errorStatus.TotallyMaxCards)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0013);
                    temp.details = temp.details.replace('{1}', me.masterCount);
                    errMsg = temp;
                }
                else if(me.errorStatus.PatientType)
                {
                    errMsg = stringSetting.error.ERR0014;
                }
                else if(me.errorStatus.OrganType)
                {
                    errMsg = stringSetting.error.ERR0015;
                }
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : errMsg
                });
                _message.showWin();
                return false;
            }
        }
        return true;
    },

    openOverWriteDialog : function(prepareMaster, addList)
    {
        var me = this;
        if(!me.doOverWrite)
        {
            return true;
        }

        Ext.create('PM.view.common.window.ConfirmMessage', {
            labelText1      : stringSetting.master.message.add_repeat_message_sureexp,
            nameList        : me.doOverWriteList,
            labelText2      : stringSetting.master.message.confirmview_text2,
            cancelEvent     : function()
            {

            },
            okEvent        : function()
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
        var _organ = listA[indexA].organ;
        var __protocolname = listB[indexB].protocolname;
        var __patienttype = listB[indexB].patienttype;
        var __organ = listB[indexB].organ;

        return (_protocolname == __protocolname &&
                _patienttype == __patienttype &&
                _organ == __organ);
    },

    checkOriginalProperty : function(listA, indexA, listB, indexB, indexB2)
    {
        var _protocolname = listA[indexA].protocolname;
        var _patienttype = listA[indexA].patienttype;
        var _organ = listA[indexA].organ;
        var __protocolname = listB[indexB].detail[indexB2].protocolname;
        var __patienttype = listB[indexB].patienttype;
        var __organ = listB[indexB].organ;

        return (_protocolname == __protocolname &&
                _patienttype == __patienttype &&
                _organ == __organ);
    },

    checkNextStatus :function()
    {
        var me = this;
        var containedPatientType = 0;
        var containedBodyRegion = 0;
        if(me.masterTempData.length == 0)
        {
            return true;
        }
        if (me.MinBodyCards === 1) {
            for (var i = 0; i < me.masterTempData.length; i++) {
                var _patienttype = me.masterTempData[i].patienttype;
                var _organ = me.masterTempData[i].organ;

                if (_patienttype == PatientType.Adult) {
                    containedPatientType = containedPatientType | 1;
                    if (_organ == BodyRegion.Head) {
                        containedBodyRegion = containedBodyRegion | 1;
                    }
                    else if (_organ == BodyRegion.Neck) {
                        containedBodyRegion = containedBodyRegion | 2;
                    }
                    else if (_organ == BodyRegion.All) {
                        containedBodyRegion = containedBodyRegion | 4;
                    }
                    else if (_organ == BodyRegion.ECG) {
                        containedBodyRegion = containedBodyRegion | 8;
                    }
                }
                else if (_patienttype == PatientType.Child) {
                    containedPatientType = containedPatientType | 2;
                    if (_organ == BodyRegion.Head) {
                        containedBodyRegion = containedBodyRegion | 16;
                    }
                    else if (_organ == BodyRegion.Neck) {
                        containedBodyRegion = containedBodyRegion | 32;
                    }
                    else if (_organ == BodyRegion.All) {
                        containedBodyRegion = containedBodyRegion | 64;
                    }
                    else if (_organ == BodyRegion.ECG) {
                        containedBodyRegion = containedBodyRegion | 128;
                    }
                }
            }
            if(containedPatientType != 3)
            {
                var temp = {};
                deepClone(temp, stringSetting.error.ERR0023);
                temp.details = temp.details.replace('{1}', me.MinBodyCards);
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : temp
                });
                _message.showWin();
                return false;
            }
            if(containedBodyRegion != 255)
            {
                var temp = {};
                deepClone(temp, stringSetting.error.ERR0024);
                temp.details = temp.details.replace('{1}', me.MinBodyCards);
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : temp
                });
                _message.showWin();
                return false;
            }
        } else {
            var adultCount = 0;
            var childCount = 0;
            var adultHead = 0;
            var adultNeck = 0;
            var adultAll = 0;
            var adultEcg = 0;
            var childHead = 0;
            var childNeck = 0;
            var childAll = 0;
            var childEcg = 0;
            for (var i = 0; i < me.masterTempData.length; i++) {
                var _patienttype = me.masterTempData[i].patienttype;
                var _organ = me.masterTempData[i].organ;

                if (_patienttype == PatientType.Adult) {
                    adultCount++;
                    if (_organ == BodyRegion.Head) {
                        adultHead++;
                    }
                    else if (_organ == BodyRegion.Neck) {
                        adultNeck++;
                    }
                    else if (_organ == BodyRegion.All) {
                        adultAll++;
                    }
                    else if (_organ == BodyRegion.ECG) {
                        adultEcg++;
                    }
                }
                else if (_patienttype == PatientType.Child) {
                    childCount++;
                    if (_organ == BodyRegion.Head) {
                        childHead++;
                    }
                    else if (_organ == BodyRegion.Neck) {
                        childNeck++;
                    }
                    else if (_organ == BodyRegion.All) {
                        childAll++;
                    }
                    else if (_organ == BodyRegion.ECG) {
                        childEcg++;
                    }
                }
            }
            if(adultCount < me.MinBodyCards || childCount < me.MinBodyCards)
            {
                var temp = {};
                deepClone(temp, stringSetting.error.ERR0023);
                temp.details = temp.details.replace('{1}', me.MinBodyCards);
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : temp
                });
                _message.showWin();
                return false;
            }
            if(adultHead < me.MinBodyCards || adultNeck < me.MinBodyCards
                && adultAll < me.MinBodyCards || adultEcg < me.MinBodyCards
                && childHead < me.MinBodyCards || childNeck < me.MinBodyCards
                && childAll < me.MinBodyCards || childEcg < me.MinBodyCards)
            {
                var temp = {};
                deepClone(temp, stringSetting.error.ERR0024);
                temp.details = temp.details.replace('{1}', me.MinBodyCards);
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : temp
                });
                _message.showWin();
                return false;
            }
        }

        return true;
    },

    addMasterList : function(addList)
    {
        var me = this;
        var tempList = [];
        var attachedduplicate = false;

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
                machinename     : details.machinename,
                seq             : sequence
            });
            addList[i].seq = sequence;

            if(details.attachedduplicate)
            {
                attachedduplicate = true;
            }
            if(details.historyduplicate)
            {
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR0028
                });
                _message.showWin();
                return false;
            }
        }

        if(me.checkAdded(me.masterTempData, tempList) == false)
        {
            return false;
        }
        if(attachedduplicate)
        {
            Ext.create('PM.view.common.window.ConfirmMessage', {
                labelText1     : stringSetting.master.message.add_message_sureexp,
                labelText2     : stringSetting.master.message.confirmview_text2,
                cancelEvent    : function()
                {

                },
                okEvent        : function()
                {
                    if(!me.openOverWriteDialog(tempList, addList))
                    {
                        return;
                    }
                    me.mainPanel.manualMasterData.SureExp = me.mainPanel.manualMasterData.SureExp.concat(tempList);
                    me.updateTableAndData(addList);
                }
            });
            return false;
        }
        if(!me.openOverWriteDialog(tempList, addList))
        {
            return false;
        }
        me.mainPanel.manualMasterData.SureExp = me.mainPanel.manualMasterData.SureExp.concat(tempList);
        return true;
    },

    getKey : function(patienttype, organ, protocolname, machinename)
    {
        return patienttype + " " +
               organ + " " +
               protocolname +
               " (" + machinename + ")";
    },

    createCheckTemp : function()
    {
        return {
            EachMaxCard : {},
            TotallyMaxCard : 0
        };
    },
    doRefreshEvent : function() {
        var me = this;
        Ext.getBody().mask();
        createMask();

        me.requestSend();
        panelMasterList.setIcon(false);
    }
});
