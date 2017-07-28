/*
 * ! JS Console EP Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.select.EPMaster
 * @extends PM.view.master.select.BaseMaster
 */

Ext.define('PM.view.master.select.EPMaster', {
    extend : 'PM.view.master.select.BaseMaster',
    alias: 'widget.masterselectepmaster',
    initComponent : function()
    {
        var me = this;
        me.callParent(arguments);
    },

    initStore : function()
    {
        var me = this;

        me.scannerGroupStore =  new Ext.data.Store({
            proxy   : new Ext.data.proxy.Ajax({
                type       : 'ajax',
                url        : PROCESS_PATH_GLOBAL_ACTION + 'getConsleSetting.action',
                reader     : {
                    type            : 'json',
                    totalProperty   : 'total',
                    root            : 'result'
                }
            }),
            model    : 'PM.model.AppSetting'
        });

        me.originalStore = Ext.create('PM.data.Ajax',
        {
            url: PROCESS_PATH_GLOBAL_ACTION + 'getmasterlistoriginallist.action',
            method : "POST",
            loadData: function(responseObj)
            {

                me.loading = false;
     			me.resObj = responseObj;
                me.pushData();
                me.resizeView(true);
                Ext.getBody().unmask();
            	clearMask();
            }
        });

        me.scannerGroupStore.on("load", function() {
            me.updateScannerCombobox();
            me.requestSend();
        });
    },
    loadData:function()
    {
        var me = this;
        me.scannerGroupStore.load();
    },

    reload:function()
    {
        var me = this;

        me.clearData();

        Ext.getBody().mask();
        createMask();

        me.requestSend();
    },

    requestSend: function()
    {
        var me = this;

        me.originalStore.requestSend({
            params:
            {
                scannerGroup : me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                protocolType : ProtocolType.ExamPlan,
                masterList   : ''
            }
        });
        me.loading = true;
    },

    pushData : function()
    {
        var me = this;

        me.originalData = [];

        me.initOriginalData(me.resObj, me.originalData, me.mainPanel.manualMasterData.EP);
    },

    changeDataAndPage : function()
    {
        var me = this;
        me.pushData();
        me.resizeView(true);
    },

    getManualMasterData : function()
    {
        var me = this;
        return me.mainPanel.manualMasterData.EP;
    },

    getScannerListData : function()
    {
        var me = this;
        return me.resObj.scannerlist;
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
                seq             : sequence
            });
            addList[i].seq = sequence;

            if(details.attachedduplicate)
            {
                attachedduplicate = true;
            }
        }
        if(attachedduplicate)
        {
            Ext.create('PM.view.common.window.ConfirmMessage', {
                labelText1     : stringSetting.master.message.add_message_ep,
                labelText2     : stringSetting.master.message.confirmview_text2,
                cancelEvent    : function()
                {
                    //TODO
                },
                okEvent        : function()
                {
                    me.mainPanel.manualMasterData.EP = me.mainPanel.manualMasterData.EP.concat(tempList);
                    me.updateTableAndData(addList);
                }
            });
            return false;
        }

        me.mainPanel.manualMasterData.EP = me.mainPanel.manualMasterData.EP.concat(tempList);
        return true;
    },

    doRefreshEvent : function() {
        var me = this;
        me.reload();
        panelMasterList.setIcon(false);
    }
});
