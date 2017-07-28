/*
 * ! JS Console SureIQ Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.SureIQMaster
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.SureIQMaster', {
    extend              : 'PM.view.master.select.BaseMaster',

    MaxBodyCards        : 8,
    MinBodyCards        : 1,
    MaxNumberOfOrgans   : 16,
    initComponent : function() {
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
                var totalCards = responseObj.limitation.TotalCards;
                if (totalCards) {
                    me.masterCount = totalCards;
                }
                var maxCard = responseObj.limitation.MaxCard;
                if (maxCard) {
                    me.MaxBodyCards = maxCard;
                }
                var maxOrgan = responseObj.limitation.MaxOrgan;
                if (maxOrgan) {
                    me.MaxNumberOfOrgans = maxOrgan;
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
                    deepClone(temp, stringSetting.error.ERR0012);
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
                    deepClone(temp, stringSetting.error.ERR0025);
                    temp.details = temp.details.replace('{1}', me.masterCount);
                    errDetail.push(temp);
                    errorNameList.push(null);
                }
                if(me.errorStatus.PatientType)
                {
                    errDetail.push(stringSetting.error.ERR0009);
                    errorNameList.push(null);
                }
                if(me.errorStatus.MaxOrgans)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0011);
                    temp.details = temp.details.replace('{1}', me.MaxNumberOfOrgans);
                    errDetail.push(temp);
                    errorNameList.push(me.getBrListStr(me.errorStatus.Organs, me.MaxNumberOfOrgans));
                }

                if(me.errorStatus.RepeatList.length > 0)
                {
                    errDetail.push(stringSetting.error.ERR0006);
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

        var keyStr = "";
        var params = me.mainPanel.getMasterListParams(MasterProcessStatus.CreationEP);
        params = params.concat(me.mainPanel.getMasterListParams(MasterProcessStatus.CreationSureExp));
        sortArrayCommon(params, "seq", "ASC", "object");

        me.originalStore.requestSend({
            params:
            {
                scannerGroup : me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                protocolType : ProtocolType.SureIQ,
                masterList   : JSON.stringify(params)
            }
        });
        me.loading = true;
    },
    pushData : function()
    {
        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.SureIQ);

    },
    getScannerListData:function()
    {
        var me = this;
        return me.resObj.scannerlist;
    },
    getManualMasterData : function()
    {
        var me = this;
        return me.mainPanel.manualMasterData.SureIQ;
    },

    checkCorrectness : function(check, checkObj)
    {
        var me = this;

        if(checkObj.patienttype != PatientType.Adult)
        {
            me.errorStatus.PatientType = true;
            return true;
        }

        var checkKey  = checkObj.organ;
        if(check.EachMaxCard[checkKey] == null)
        {
            if(check.OrgansMaxCard + 1 > me.MaxNumberOfOrgans)
            {
                me.errorStatus.MaxOrgans = true;
                if(me.errorStatus.Organs.length == 0)
                {
                    for(var o in check.EachMaxCard)
                    {
                        me.errorStatus.Organs.push(o);
                    }
                }
                if(me.errorStatus.Organs.indexOf(checkKey) == -1)
                {
                    me.errorStatus.Organs.push(checkKey);
                }

                return true;
            }
            check.OrgansMaxCard++;
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
            var checkKey  = masterData[i].organ;
            if(check.EachMaxCard[checkKey] == null)
            {
                check.EachMaxCard[checkKey] = [];
                check.EachMaxCard[checkKey].push(me.getMaxCardErrName(masterData[i]));
                check.OrgansMaxCard++;
            }
            else
            {
                check.EachMaxCard[checkKey].push(me.getMaxCardErrName(masterData[i]));
            }
            check.TotallyMaxCard++;
        }
    },
    checkAdded : function(addedMaster, prepareMaster, addList)
    {
        var me = this;
        me.doOverWrite = false;
        me.doOverWriteList = [];
        me.initErrorStatus();
        var prepareOverWrite = {};

        var checkCorrectnessTemp = me.createCheckTemp();

        me.getCorrectnessByManual(checkCorrectnessTemp, addedMaster);

        for(var i = 0;i < addedMaster.length;i++)
        {
            var checkKey = addedMaster[i].protocolname + MasterSplitSign + addedMaster[i].organ;
            prepareOverWrite[checkKey] = me.getMaxCardErrName(addedMaster[i]);
        }
        for(var i = 0;i < prepareMaster.length;i++)
        {
            var _protocolname = prepareMaster[i].protocolname;
            var _patienttype = prepareMaster[i].patienttype;
            var _organ = prepareMaster[i].organ;

            var checkKey = _protocolname + MasterSplitSign + _organ;
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
                    deepClone(temp, stringSetting.error.ERR0012);
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
                    deepClone(temp, stringSetting.error.ERR0025);
                    temp.details = temp.details.replace('{1}', me.masterCount);
                    errMsg = temp;
                }
                else if(me.errorStatus.PatientType)
                {
                    errMsg = stringSetting.error.ERR0009;
                }
                else if(me.errorStatus.MaxOrgans)
                {
                    var temp = {};
                    deepClone(temp, stringSetting.error.ERR0011);
                    temp.details = temp.details.replace('{1}', me.MaxNumberOfOrgans);
                    errMsg = temp;
                    errMsg.namelist = me.getBrListStr(me.errorStatus.Organs, me.MaxNumberOfOrgans);
                }
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : errMsg
                });
                _message.showWin();
                return false;
            }
        }

        if(!me.doOverWrite)
        {
            return true;
        }
        Ext.create('PM.view.common.window.ConfirmMessage', {
            labelText1      : stringSetting.master.message.add_repeat_message_sureiq,
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
        var _organ = listA[indexA].organ;
        var __protocolname = listB[indexB].protocolname;
        var __organ = listB[indexB].organ;

        return (_protocolname == __protocolname &&
                _organ == __organ);
    },

    checkOriginalProperty : function(listA, indexA, listB, indexB, indexB2)
    {
        var _protocolname = listA[indexA].protocolname;
        var _organ = listA[indexA].organ;
        var __protocolname = listB[indexB].detail[indexB2].protocolname;
        var __organ = listB[indexB].organ;

        return (_protocolname == __protocolname &&
                _organ == __organ);
    },

    checkNextStatus :function()
    {
        var me = this;
        var isContainScano = false;
        if(me.masterTempData.length == 0)
        {
            return true;
        }

        for(var i = 0;i < me.masterTempData.length;i++)
        {
            var _organ = me.masterTempData[i].organ;

            if(_organ == BodyRegion.Scano)
            {
                isContainScano = true;
                break;
            }
        }
        if(!isContainScano)
        {
            var _message = Ext.create('PM.view.common.window.Message',{
                errorDetail : stringSetting.error.ERR0008
            });
            _message.showWin();
            return false;
        }

        if (me.MinBodyCards > 1) {
            var organ = [];
            for (var i = 0; i < me.masterTempData.length; i++) {
                var _patienttype = me.masterTempData[i].patienttype;
                var _organ = me.masterTempData[i].organ;
                organ.push(_organ);
            }
            var organFlg = true;
            var organArray = [];
            for (var i = 0, len = organ.length; i < len; i++) {
                var count = 0;
                for (var j = 0, len = organ.length; j < len; j++) {
                    if (organ[i] == organ[j]) {
                        count++;
                    }
                }
                if (count < me.MinBodyCards && count !== 0) {
                    organFlg = false;
                    organArray.push(organ[i]);
                }
            }
            var organArraySingle = [];
            for (var i = 0, len = organArray.length; i < len; i++) {
                var addFlg = true;
                for (var j = 0, len2 = organArraySingle.length; j < len2; j++) {
                    if (organArray[i] == organArraySingle[j]) {
                        addFlg = false;
                        break;
                    }
                }
                if (addFlg) {
                    organArraySingle.push(organArray[i]);
                }
            }
            if(!organFlg)
            {
                var temp = {};
                deepClone(temp, stringSetting.error.ERR0040);
                temp.details = temp.details.replace('{1}', me.MinBodyCards);
                var errDetail = [];
                var errorNameList = [];
                errDetail.push(temp);
                errorNameList.push(me.getBrListStr(organArraySingle, me.MaxNumberOfOrgans));
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetailList : errDetail,
                    errorNameList : errorNameList,
                    isSolutionShowName : false
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
            if(details.historyduplicate)
            {
                var _message = Ext.create('PM.view.common.window.Message',{
                    errorDetail : stringSetting.error.ERR0027
                });
                _message.showWin();
                return false;
            }
        }

        if(me.checkAdded(me.masterTempData, tempList, addList) == false)
        {
            return false;
        }

        me.mainPanel.manualMasterData.SureIQ =
                me.mainPanel.manualMasterData.SureIQ.concat(tempList);
        return true;
    },
    getKey : function(patienttype, organ, protocolname, machinename)
    {
        return organ + " " +
               protocolname +
               " (" + machinename + ")";
    },

    createCheckTemp : function()
    {
        return {
            EachMaxCard : {},
            TotallyMaxCard : 0,
            OrgansMaxCard : 0
        };
    },

    doRefreshEvent : function() {
        var me = this;
        Ext.getBody().mask();
        createMask();

        me.loadData();
        panelMasterList.setIcon(false);
    }
});
