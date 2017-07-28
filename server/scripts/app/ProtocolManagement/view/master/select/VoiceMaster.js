/**
 * ! JS Console SureIQ Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.VoiceMaster
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.VoiceMaster', {
    extend: 'PM.view.master.select.BaseMaster',
    alias: 'widget.masterselectbasemaster',
    MaxLanguage: 20,
    MaxCommandOfLanguage: 10,
    Languages: {
        Japanese: "Japanese",
        English: "English",
        Chinese: "Chinese",
        Korean: "Korean",
        Spanish: "Spanish",
        Portuguese: "Portuguese"
    },
    Commands: [
        "Breathe In & Hold",
        "Don't Swallow",
        "Expiration",
        "Don't Move",
        "Breathe Normally"
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },

    initStore: function () {
        var me = this;

        me.originalStore = Ext.create('PM.data.Ajax',
            {
                url: PROCESS_PATH_GLOBAL_ACTION + 'getmasterlistoriginallist.action',
                method: "POST",
                loadData: function (responseObj) {
                    me.loading = false;

                    me.resObj = responseObj;
                    if(me.resObj.limitation && me.resObj.limitation.MaxCommandPerLanguage !== undefined){
                        me.MaxCommandOfLanguage = me.resObj.limitation.MaxCommandPerLanguage;
                    }

                    if(me.resObj.limitation && me.resObj.limitation.MaxLanguage   !== undefined){
                        me.MaxLanguage = me.resObj.limitation.MaxLanguage  ;
                    }

                    me.pushData();
                    me.resizeView(true);
                    me.updateScannerCombobox();
                    Ext.getBody().unmask();
                    clearMask();

                    var errDetail = [];
                    var errorNameList = [];

                    if (me.errorStatus.MaxCommandOfLanguage) {
                        errDetail.push(stringSetting.error.ERR0036);
                        var cardList = [];
                        for (var o in me.errorStatus.Commands) {
                            cardList.push(me.getBrListStr(me.errorStatus.Commands[o], me.MaxCommandOfLanguage));
                            cardList.push("")
                        }
                        errorNameList.push(me.getBrListStr(cardList));
                    }
                    if (me.errorStatus.MaxLanguage) {
                        errDetail.push(stringSetting.error.ERR0035);
                        errorNameList.push(me.getBrListStr(me.errorStatus.Languages, me.MaxLanguage));
                    }

                    if (me.errorStatus.RepeatList.length > 0) {
                        errDetail.push(stringSetting.error.ERR0034);
                        errorNameList.push(me.getBrListStr(me.errorStatus.RepeatList));
                    }

                    if (errDetail.length > 0) {
                        errDetail[0].status = "info";
                        var _message = Ext.create('PM.view.common.window.Message', {
                            errorDetailList: errDetail,
                            errorNameList: errorNameList,
                            isSolutionShowName: false
                        });
                        _message.showWin();
                    }
                }
            });
    },
    
    loadData: function () {
        var me = this;

        var keyStr = "";
        var params = me.mainPanel.getMasterListParams(MasterProcessStatus.CreationEP);
        sortArrayCommon(params, "seq", "ASC", "object");

        me.originalStore.requestSend({
            params: {
                scannerGroup: me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                protocolType: ProtocolType.VoicePreset,
                masterList: JSON.stringify(params)
            }
        });
        me.loading = true;
    },

    pushData: function () {
        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.Voice);
    },

    getScannerListData: function () {
        var me = this;
        return me.resObj.scannerlist;
    },

    getManualMasterData: function () {
        var me = this;
        return me.mainPanel.manualMasterData.Voice;
    },

    checkCorrectness: function (check, checkObj) {
        var me = this;
        var checkKey = checkObj.patienttype;
        if (check.CommandOfLanguage[checkKey] == null) {
            if (check.Languages + 1 > me.MaxLanguage) {
                me.errorStatus.MaxLanguage = true;
                if (me.errorStatus.Languages.length == 0) {
                    for (var o in check.CommandOfLanguage) {
                        me.errorStatus.Languages.push(o);
                    }
                }
                if (me.errorStatus.Languages.indexOf(checkKey) == -1) {
                    me.errorStatus.Languages.push(checkKey);
                }

                return true;
            }
            check.Languages++;
            check.CommandOfLanguage[checkKey] = [me.getMaxCardErrName(checkObj)];
        }
        else {
            var cardErrMessage = me.getMaxCardErrName(checkObj);
            var hasExist = false;
            for(var j=0;j<check.CommandOfLanguage[checkKey].length;j++){
                if(check.CommandOfLanguage[checkKey][j].indexOf(cardErrMessage) > -1){
                    hasExist = true;
                    continue;
                }
            }
            if(!hasExist) {
                check.CommandOfLanguage[checkKey].push(cardErrMessage);
            }

            /*if (check.CommandOfLanguage[checkKey].length > me.MaxCommandOfLanguage) {
                me.errorStatus.MaxCommandOfLanguage = true;

                if (me.errorStatus.Commands[checkKey] == null) {
                    me.errorStatus.Commands[checkKey] = [];
                    for (var i = 0; i < check.CommandOfLanguage[checkKey].length; i++) {
                        me.errorStatus.Commands[checkKey].push(check.CommandOfLanguage[checkKey][i]);
                    }
                }
                else {
                    me.errorStatus.Commands[checkKey].push(cardErrMessage);
                }

                return true;
            }*/
        }

        return false;
    },

    getCorrectnessByManual: function (check, masterData) {
        var me = this;
        for (var i = 0; i < masterData.length; i++) {
            var checkKey = masterData[i].patienttype;
            if (check.CommandOfLanguage[checkKey] == null) {
                check.CommandOfLanguage[checkKey] = [me.getMaxCardErrName(masterData[i])];
                check.Languages++;
            }
            else {
                var record = me.getMaxCardErrName(masterData[i]);
                var hasExist = false;
                for(var j=0;j<check.CommandOfLanguage[checkKey].length;j++){
                    if(check.CommandOfLanguage[checkKey][j].indexOf(record) > -1){
                        hasExist = true;
                        continue;
                    }
                }
                if(!hasExist) {
                    check.CommandOfLanguage[checkKey].push(record);
                }
            }
        }
    },

    checkAdded: function (addedMaster, prepareMaster, addList) {
        var me = this;
        me.doOverWrite = false;
        me.doOverWriteList = [];
        me.initErrorStatus();
        var prepareOverWrite = {};

        var checkCorrectnessTemp = me.createCheckTemp();

        me.getCorrectnessByManual(checkCorrectnessTemp, addedMaster);

        for (var i = 0; i < addedMaster.length; i++) {
            var checkKey = addedMaster[i].protocolname + MasterSplitSign + addedMaster[i].patienttype;
            prepareOverWrite[checkKey] = me.getMaxCardErrName(addedMaster[i]);
        }
        for (var i = 0; i < prepareMaster.length; i++) {
            var _protocolname = prepareMaster[i].protocolname;
            var _patienttype = prepareMaster[i].patienttype;

            var checkKey = _protocolname + MasterSplitSign + _patienttype;
            /*if (prepareOverWrite[checkKey] != null) {
             me.doOverWrite = true;
             me.doOverWriteList.push(prepareOverWrite[checkKey]);
             continue;
             }*/

            if (me.checkCorrectness(checkCorrectnessTemp, {
                patienttype: _patienttype,
                organ: "",
                protocolname: _protocolname,
                voiceindex : prepareMaster[i].voiceindex,
                vindex : prepareMaster[i].vindex,
                machinename: prepareMaster[i].machinename
            })) {
                var errMsg = {};
                if (me.errorStatus.MaxCommandOfLanguage) {
                    errMsg = stringSetting.error.ERR0036;
                    var cardList = [];
                    for (var o in me.errorStatus.Commands) {
                        cardList.push(me.getBrListStr(me.errorStatus.Commands[o], me.MaxCommandOfLanguage));
                        cardList.push("")
                    }
                    errMsg.namelist = me.getBrListStr(cardList);
                }
                else if (me.errorStatus.MaxLanguage) {
                    errMsg = stringSetting.error.ERR0035;
                    errMsg.namelist = me.getBrListStr(me.errorStatus.Languages, me.MaxLanguage);
                }
                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetail: errMsg
                });
                _message.showWin();
                return false;
            }
        }

        if (!me.doOverWrite) {
            return true;
        }
        Ext.create('PM.view.common.window.ConfirmMessage', {
            labelText1: stringSetting.master.message.add_repeat_message_voice,
            labelText2: stringSetting.master.message.confirmview_text2,
            nameList: me.doOverWriteList,
            cancelEvent: function () {

            },
            okEvent: function () {
                var removeList = me.mergeManualMasterData(prepareMaster);
                for (var i = 0; i < removeList.length; i++) {
                    me.removeOriginal(removeList[i])
                }
                me.updateTableAndData(addList);
            }
        });
        return false;
    },

    checkProperty: function (listA, indexA, listB, indexB) {
        var _protocolname = listA[indexA].protocolname;
        var _patienttype = listA[indexA].patienttype;
        var __protocolname = listB[indexB].protocolname;
        var __patienttype = listB[indexB].patienttype;

        return (_protocolname == __protocolname &&
            _patienttype == __patienttype);
    },

    checkOriginalProperty: function (listA, indexA, listB, indexB, indexB2) {
        var _protocolname = listA[indexA].protocolname;
        var _patienttype = listA[indexA].patienttype;
        var __protocolname = listB[indexB].detail[indexB2].protocolname;
        var __patienttype = listB[indexB].patienttype;

        return (_protocolname == __protocolname &&
            _patienttype == __patienttype);
    },

    checkNextStatus: function () {
        var me = this;
        var mustLanguages = 0;
        var mustCommands = {};

        if (me.masterTempData.length == 0) {
            return true;
        }

        //1+2+4+8+16+32
        me.masterTempData.map(function (currentValue, index, array) {
            switch (currentValue.patienttype) {
                case me.Languages.Japanese:
                    mustLanguages = mustLanguages | 1;
                    break;
                case me.Languages.English:
                    mustLanguages = mustLanguages | 2;
                    break;
                case me.Languages.Chinese:
                    mustLanguages = mustLanguages | 4;
                    break;
                case me.Languages.Korean:
                    mustLanguages = mustLanguages | 8;
                    break;
                case me.Languages.Spanish:
                    mustLanguages = mustLanguages | 16;
                    break;
                case me.Languages.Portuguese:
                    mustLanguages = mustLanguages | 32;
                    break;
            }

            if (mustCommands[currentValue.patienttype] == null) {
                mustCommands[currentValue.patienttype] = 0;
            }
            switch (currentValue.protocolname) {
                case me.Commands[0]:
                    mustCommands[currentValue.patienttype] = mustCommands[currentValue.patienttype] | 1;
                    break;
                case me.Commands[1]:
                    mustCommands[currentValue.patienttype] = mustCommands[currentValue.patienttype] | 2;
                    break;
                case me.Commands[2]:
                    mustCommands[currentValue.patienttype] = mustCommands[currentValue.patienttype] | 4;
                    break;
                case me.Commands[3]:
                    mustCommands[currentValue.patienttype] = mustCommands[currentValue.patienttype] | 8;
                    break;
                case me.Commands[4]:
                    mustCommands[currentValue.patienttype] = mustCommands[currentValue.patienttype] | 16;
                    break;
            }
        });

        if (63 != mustLanguages) {
            var _message = Ext.create('PM.view.common.window.Message', {
                errorDetail: stringSetting.error.ERR0037
            });
            _message.showWin();
            return false;
        }
        /*for (var o in mustCommands) {
            if (31 != mustCommands[o]) {
                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetail: stringSetting.error.ERR0038
                });
                _message.showWin();
                return false;
            }
        }*/
        return true;
    },

    addMasterList: function (addList) {
        var me = this;
        var tempList = [];
        var repeatList = [];
        for (var i = 0; i < addList.length; i++) {
            if (addList[i].added) {
                continue;
            }

            var data = me.originalData[addList[i].y];
            var details = data.detail[addList[i].x - 2];

            var command = details.protocolname;
            var vindex = details.vindex;
            var detailIndex = addList[i].x - 2;
            var sequence = me.mainPanel.seq++;
            for (var record in me.originalData) {

                for (var d in me.originalData[record].detail) {

                    if (me.originalData[record].detail[d].protocolname === command
                        && me.originalData[record].detail[d].vindex === vindex) {
                        if (parseInt(d) === detailIndex) {
                            if (repeatList.indexOf(me.originalData[record].detail[d].protocolname + me.originalData[record].detail[d].voiceindex + detailIndex + me.originalData[record].patienttype) < 0) {
                                tempList.push({
                                    protocolname: me.originalData[record].detail[d].protocolname,
                                    patienttype: me.originalData[record].patienttype,
                                    organ: '',
                                    key: me.originalData[record].detail[d].key,
                                    machinename: me.originalData[record].detail[d].machinename,
                                    vindex: me.originalData[record].detail[d].vindex,
                                    voiceindex: me.originalData[record].detail[d].voiceindex,
                                    historyduplicate: me.originalData[record].detail[d].historyduplicate,
                                    seq: sequence
                                });
                                repeatList.push(me.originalData[record].detail[d].protocolname + me.originalData[record].detail[d].voiceindex + detailIndex + me.originalData[record].patienttype);
                                sequence = me.mainPanel.seq++;
                            }
                        }
                    }
                }
            }
            addList[i].seq = sequence;
        }
        var confirmList = [];
        var duplicatedList = [];
        var confirmProtocol = '';
        if (me.masterTempData && me.masterTempData.length > 0 && tempList && tempList.length > 0) {
            for (var i = 0; i < me.masterTempData.length; i++) {
                for (var j = 0; j < tempList.length; j++) {
                    if (me.masterTempData[i].voiceindex === tempList[j].voiceindex) {
                        confirmProtocol = tempList[j].machinename;
                        confirmList.push(tempList[j].protocolname + '(' + tempList[j].voiceindex + ')');
                    }
                }
            }
        }

        for (var j = 0; j < tempList.length; j++) {
            if (tempList[j].historyduplicate) {
                duplicatedList.push(tempList[j].protocolname + '(' + tempList[j].voiceindex + ')');
            }
        }

        if (confirmList.length > 0) {
            var labelText1 = stringSetting.master.message.add_duplicated_protocol_message_voice.format(confirmProtocol);
            Ext.create('PM.view.common.window.ConfirmMessage', {
                labelText1: labelText1,
                labelText2: stringSetting.master.message.confirmview_text2,
                nameList: [],
                cancelEvent: function () {

                },
                okEvent: function () {
                    if (duplicatedList.length > 0) {
                        var errormessage = Ext.clone(stringSetting.error.ERR0041);
                        errormessage.details = errormessage.details.format(duplicatedList.join('<br>'));
                        var _message = Ext.create('PM.view.common.window.Message', {
                            errorDetail: errormessage,
                            OKLoad: function () {
                                if (me.checkAdded(me.masterTempData, tempList, addList) == false) {
                                    return;
                                }
                                me.updateTableAndData(addList, true);
                            }
                        });
                        _message.showWin();

                        return;
                    }
                    if (me.checkAdded(me.masterTempData, tempList, addList) == false) {
                        return;
                    }
                    me.updateTableAndData(addList, true);
                }
            });

            return false;
        }

        /*if (duplicatedList.length > 0) {
            var errormessage = Ext.clone(stringSetting.error.ERR0041);
            errormessage.details = errormessage.details.format(duplicatedList.join('<br>'));
            var _message = Ext.create('PM.view.common.window.Message', {
                errorDetail: errormessage,
                OKLoad: function () {
                    if (me.checkAdded(me.masterTempData, tempList, addList) == false) {
                        return;
                    }
                    me.updateTableAndData(addList, true);
                }
            });
            _message.showWin();

            return false;
        }*/

        if (me.checkAdded(me.masterTempData, tempList, addList) == false) {
            return false;
        }

        /*me.mainPanel.manualMasterData.Voice =
         me.mainPanel.manualMasterData.Voice.concat(tempList);*/

        return true;
    },

    getKey: function (patienttype, organ, protocolname, machinename) {
        return patienttype + " " +
            protocolname +
            " (" + machinename + ")";
    },

    createCheckTemp: function () {
        return {
            Languages: 0,
            CommandOfLanguage: {}
        };
    },

    doRefreshEvent: function () {
        var me = this;
        Ext.getBody().mask();
        createMask();

        me.loadData();
        panelMasterList.setIcon(false);
    },

    updateOriginlData: function (addList) {
        var me = this;
        var seq = 0;
        for (var i = 0; i < addList.length; i++) {
            if (addList[i].added) {
                continue;
            }
            if (seq === 0) {
                //seq = addList[i].seq;
            }
            var data = me.originalData[addList[i].y];
            var details = data.detail[addList[i].x - 2];

            var command = details.protocolname;
            var vindex = details.vindex;
            var detailIndex = addList[i].x - 2;

            for (var record in me.originalData) {

                for (var d in me.originalData[record].detail) {

                    if (me.originalData[record].detail[d].protocolname === command
                        && me.originalData[record].detail[d].vindex === vindex) {
                        if (parseInt(d) === detailIndex && !me.originalData[record].detail[d].historyduplicate) {
                            me.originalData[record].detail[d].selectd = true;
                            if(me.originalData[record].detail[d].overAutoSelectd) {
                                me.originalData[record].detail[d].overAutoSelectd = false;
                                me.originalData[record].detail[d].autoSelectd = true;
                            }
                            //me.originalData[record].detail[d].seq = seq;
                            seq++;
                        } else {
                            me.originalData[record].detail[d].selectd = false;
                            if(me.originalData[record].detail[d].autoSelectd) {
                                me.originalData[record].detail[d].autoSelectd = false;
                                me.originalData[record].detail[d].overAutoSelectd = true;
                            }
                        }
                    }
                }
            }
            me.mainPanel.manualMasterData.Voice = voiceList;
        }
        var voiceList = [];
        for (var record in me.originalData) {
            for (var d in me.originalData[record].detail) {
                if (me.originalData[record].detail[d].selectd === true) {
                    me.originalData[record].detail[d].selectd = true;
                    voiceList.push({
                        protocolname: me.originalData[record].detail[d].protocolname,
                        patienttype: me.originalData[record].patienttype,
                        organ: '',
                        key: me.originalData[record].detail[d].key,
                        machinename: me.originalData[record].detail[d].machinename,
                        vindex: me.originalData[record].detail[d].vindex,
                        voiceindex: me.originalData[record].detail[d].voiceindex,
                        seq: me.mainPanel.seq++
                    });
                }
            }
        }
        me.mainPanel.manualMasterData.Voice = voiceList;
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
                if(originalData[i].detail[j].voice_index) {
                    originalData[i].detail[j].voiceindex = originalData[i].detail[j].voice_index;
                    var index = parseInt(originalData[i].detail[j].voice_index);
                    while(index > me.MaxCommandOfLanguage){
                        index = index - me.MaxCommandOfLanguage;
                    }
                    //voice_index
                    originalData[i].detail[j].vindex = index;

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
                        if(!originalData[i].detail[j].overAutoSelectd) {
                            originalData[i].detail[j].autoSelectd = true;
                        }
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

    setOriginalDataByManual: function(originalData, masterData, checkRepeat)
    {
        var me = this;
        for(var i = 0;i < originalData.length;i++)
        {
            for(var j = 0;j < originalData[i].detail.length;j++)
            {
                if(originalData[i].detail[j].vindex == undefined && originalData[i].detail[j].voice_index !== undefined) {
                    originalData[i].detail[j].voiceindex = originalData[i].detail[j].voice_index;
                    var index = parseInt(originalData[i].detail[j].voice_index);
                    while(index > me.MaxCommandOfLanguage){
                        index = index - me.MaxCommandOfLanguage;
                    }
                    //voice_index
                    originalData[i].detail[j].vindex = index;

                }

                if(originalData[i].detail[j].attachtolist != null &&
                    originalData[i].detail[j].attachtolist.length > 0){
                    var hasExist = false;
                    for(var k = 0;k < masterData.length;k++)
                    {
                        if(masterData[k].vindex == originalData[i].detail[j].vindex &&
                            masterData[k].patienttype == originalData[i].patienttype &&
                            masterData[k].organ == originalData[i].organ )
                        {
                            if(masterData[k].protocolname == originalData[i].detail[j].protocolname) {
                                hasExist = true;
                                break;
                            }
                        }
                    }
                    if(hasExist){
                        originalData[i].detail[j].overAutoSelectd = true;
                        originalData[i].detail[j].autoSelectd = false;
                    }else{
                        for (var k = 0; k < masterData.length; k++) {
                            if (masterData[k].protocolname == originalData[i].detail[j].protocolname &&
                                masterData[k].patienttype == originalData[i].patienttype &&
                                masterData[k].organ == originalData[i].organ &&
                                masterData[k].key == originalData[i].detail[j].key) {

                                var checkKey = masterData[k].protocolname + MasterSplitSign +
                                    masterData[k].patienttype + MasterSplitSign +
                                    masterData[k].organ;
                                originalData[i].detail[j].selectd = true;
                                originalData[i].detail[j].seq = masterData[k].seq;
                                checkRepeat[checkKey] = {
                                    key: masterData[k].key,
                                    machinename: originalData[i].detail[j].machinename
                                };
                                break;
                            }
                        }
                    }

                } else {
                    for (var k = 0; k < masterData.length; k++) {
                        if (masterData[k].protocolname == originalData[i].detail[j].protocolname &&
                            masterData[k].patienttype == originalData[i].patienttype &&
                            masterData[k].organ == originalData[i].organ &&
                            masterData[k].key == originalData[i].detail[j].key) {

                            var checkKey = masterData[k].protocolname + MasterSplitSign +
                                masterData[k].patienttype + MasterSplitSign +
                                masterData[k].organ;
                            originalData[i].detail[j].selectd = true;
                            originalData[i].detail[j].seq = masterData[k].seq;
                            checkRepeat[checkKey] = {
                                key: masterData[k].key,
                                machinename: originalData[i].detail[j].machinename
                            };
                            break;
                        }
                    }
                }
            }
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
        ary.push(o.vindex);
        return ary.join(' ');
    },

    masterMouseUp : function(e)
    {
        return;
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
            var command = me.masterTempData[selectIndex].protocolname;
            var vindex = me.masterTempData[selectIndex].vindex;
            for(var i = me.masterTempData.length-1; i>=0; i--) {
                if (me.masterTempData[i].protocolname === command
                    && me.masterTempData[i].vindex === vindex) {

                    var key = me.masterTempData[i].key;
                    me.removeMaster(key);
                    me.removeOriginal(key);
                    me.masterTempData.splice(i, 1);
                }
            }
            /*var data = me.originalData[addList[i].y];
            var details = data.detail[addList[i].x - 2];

            var command = details.protocolname;
            var index = details.index;
            var detailIndex = addList[i].x - 2;*/

            me.westCenterPanel.update(me.createMasterListTabelHtml(me.panelHeight, true));

            me.setNextButtonStauts();
        }

        _menu.createMenu([stringSetting.master.menu.removeFromList], [removeFormMaster]);

        _menu.showByMouse(window.event, 3, 5);
    }
});
