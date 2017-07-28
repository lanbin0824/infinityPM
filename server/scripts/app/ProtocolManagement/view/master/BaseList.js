/*!
 * JS Console Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.BaseList
 * @extends Ext.panel.Panel
 * @import MasterList.css
 */
Ext.define('PM.view.master.BaseList', {
    extend: 'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    cls             : 'panelTabView',
    bodyCls         : 'grid-Color-NoborderPadding',
    width           : '100%',
    minWidth        : 1260,
    minWinWidth     : 1170,

    headerPanel     : null,
    centerPanel     : null,
    buttonPanel     : null,

    rightButtonPanel    : null,
    leftStatusImgPanel  : null,
    contentPanel        : null,

    statusImage     : null,
    statusText      : null,

    btnBack         : null,
    btnNext         : null,
    isBack          : false,
    btnCancel       : null,

    manualMasterData    : {
        EP      : [],
        SureIQ  : [],
        SureExp : [],
        CP      : [],
        Voice   : [],
        Setting : [],
    },
    processStatus       : MasterProcessStatus.Start,
    cacheContentPanel   : [],
    settingNameList     : [],
    groupIconList     : [],
    scannerIndex        : -1,

    batchProtocolList   : [],
    seq                 : 0,

    /**
     * function init Component
     */
    initComponent    : function ()
    {
        var me = this;
        me.initCacheData();

        me.headerPanel = Ext.create('Ext.panel.Panel', {
            region          : 'north',
            height          : 50,
            layout          : {
                type : 'fit'
            },
            padding         : "12 0 0 0",
            cls             : 'panel-NoborderPadding-transparent',
            bodyCls         : 'Header-Color-NoborderPadding',
            items           : []
        });

        me.changeTitle();
        me.centerPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            region      : 'center',
            layout: {
                type: 'fit'
            },
            autoScroll  : false,
            items       : []
        });

        me.createButton();
        me.rightButtonPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            region      : 'east',
            height      : 60,
            minHeight   : 60,
            maxHeight   : 60,
            layout: {
                type:'hbox',
                padding:'0 0 0 0',
                align:'middle',
                pack:'end'
            },
            defaults:
            {
                padding:'0 0 0 0',
                margins:'0 8 0 0'
            },
            items:[
                   me.btnBack,
                   me.btnNext,
                   me.btnCancel
            ]
        });

        me.changeImage();

        me.leftStatusImgPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            layout: {
                type: 'vbox'
            },
            region      : 'center',
            minHeight   : 60,
            maxHeight   : 60,
            padding     : "7 0 0 20",
            items:[
                me.statusImage,
                me.statusText
            ]
        });
        me.buttonPanel = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'button-Color-NoborderPadding',
            region      : 'south',
            height      : 60,
            minHeight   : 60,
            maxHeight   : 60,
            layout: {
                type:'border'
            },
            items:[
                me.rightButtonPanel,
                me.leftStatusImgPanel
            ]
        });

        Ext.applyIf(me, {
            items:[
                me.headerPanel,
                me.centerPanel,
                me.buttonPanel
            ]
        });

        me.callParent(arguments);
    },

    createButton: function ()
    {
        var me = this;
        me.btnBack = Ext.create('Ext.button.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Back',
            overCls:'icon-button-Back-over',
            pressedCls:'icon-button-Back-pressed',
            focusCls:'icon-button-Back-focus',
            disabledCls:'icon-button-Back-disable',
            text:'<span class="SpanTextView" style="padding-left:10px;">' + stringSetting.master.button.Back + '</span>',
            disabled:true,
            hidden:false,
            handler: function() {
                me.processStatus -= 1;
                if (me.processStatus == MasterProcessStatus.CreationVoice && !workflowWithVoicePresetEnabled) {
                    me.processStatus -= 1;
                }
                me.changeTitle();
                me.isBack = true;
                me.showItemView();
                me.changeButton(true);
            }
        });

        me.btnNext = Ext.create('Ext.button.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Next',
            overCls:'icon-button-Next-over',
            pressedCls:'icon-button-Next-pressed',
            focusCls:'icon-button-Next-focus',
            disabledCls:'icon-button-Next-disable',
            text:'<span class="SpanTextView" style="padding-right:10px;">' + stringSetting.master.button.Next + '</span>',
            disabled:false,
            hidden:false,
            handler: function() {
            	me.processStatus += 1;
                if (me.processStatus == MasterProcessStatus.CreationVoice && !workflowWithVoicePresetEnabled) {
                    me.processStatus += 1;
                }
                if(!me.doNextAction())
                {
                    me.processStatus -= 1;
                    Ext.getBody().unmask();
                    clearMask();
                    return;
                }

                me.changeTitle();
                me.isBack = false;
                me.showItemView();
                me.changeButton(false);
            }
        });

        me.btnCancel = Ext.create('Ext.button.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Cancel',
            overCls:'icon-button-Cancel-over',
            pressedCls:'icon-button-Cancel-pressed',
            focusCls:'icon-button-Cancel-focus',
            disabledCls:'icon-button-Cancel-disable',
            text:'<span class="SpanTextView">' + stringSetting.master.button.Cancel + '</span>',
            disabled:false,
            hidden:false,
            handler: function() {
                panelTabRequestList.fireEvent("click");
                panelTabMasterList.hide();
                panelMasterList = null;
            }
        });
    },
    getBatchProtocolList : function()
    {
        var me = this;

        var ep = [];
        var sureiq = [];
        var sureexp = [];
        var cp = [];
        var voice = [];

        deepClone(ep, me.cacheContentPanel[MasterProcessStatus.CreationEP].masterTempData);
        deepClone(sureiq, me.cacheContentPanel[MasterProcessStatus.CreationSureIQ].masterTempData);
        deepClone(sureexp, me.cacheContentPanel[MasterProcessStatus.CreationSureExp].masterTempData);
        deepClone(cp, me.cacheContentPanel[MasterProcessStatus.CreationCP].masterTempData);
        if(workflowWithVoicePresetEnabled) {
            deepClone(voice, me.cacheContentPanel[MasterProcessStatus.CreationVoice].masterTempData);
        }

        var protocolListData = [].concat(ep);
        protocolListData = protocolListData.concat(sureiq);
        protocolListData = protocolListData.concat(sureexp);
        protocolListData = protocolListData.concat(cp);
        protocolListData = protocolListData.concat(voice);

        return protocolListData;
    },

    doNextAction: function()
    {
        var me = this;
        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:
                return true;
            case MasterProcessStatus.CreationEP:
                Ext.getBody().mask();
                createMask();
                return true;
            case MasterProcessStatus.CreationSureExp:
                Ext.getBody().mask();
                createMask();
                return true;
            case MasterProcessStatus.CreationSureIQ:
                if(me.contentPanel != null && me.contentPanel.checkNextStatus() == false)
                {
                    return false;
                }
                Ext.getBody().mask();
                createMask();
                return true;
            case MasterProcessStatus.CreationCP:
                if(me.contentPanel != null && me.contentPanel.checkNextStatus() == false)
                {
                    return false;
                }
                Ext.getBody().mask();
                createMask();
                return true;
            case MasterProcessStatus.CreationVoice:
                Ext.getBody().mask();
                createMask();
                return true;
            case MasterProcessStatus.Setting:
                if(me.contentPanel != null && me.contentPanel.checkNextStatus() == false)
                {
                    return false;
                }
                Ext.getBody().mask();
                createMask();
                me.batchProtocolList = me.getBatchProtocolList();

                return true;
            case MasterProcessStatus.SelectOther:
                Ext.getBody().mask();
                createMask();
                for(var i = 0;i < me.contentPanel.addNewEPnumArray.length;i++)
                {
                    me.contentPanel.setPatientTypeOrgan(me.contentPanel.addNewEPnumArray[i]);
                }

                return true;
            case MasterProcessStatus.Approving:
                me.contentPanel.saveMasterToServer();
                return true;
            case MasterProcessStatus.FinishProtocolList:
                if(me.batchProtocolList.length == 0)
                {
                    PM.data.Connection.requestSend({
                        url: PROCESS_PATH_GLOBAL_ACTION + 'deletemasterlistothersettingsfiles.action',
                        method      : "GET",
                        loadData: function(responseObj, success)
                        {
                            Ext.getBody().unmask();
                            clearMask();
                            me.processStatus += 1;
                            me.changeTitle();
                            me.changeButton(false);
                            me.showItemView();
                        }
                    });
                    Ext.getBody().mask();
                    createMask();
                    return true;
                }
                else
                {
                    var confirm = Ext.create('PM.view.master.ConfirmView', {
                        mainPanel       : me,
                        labelText1      : stringSetting.master.message.confirmview_text1,
                        labelText2      : stringSetting.master.message.confirmview_text2,
                        cancelEvent     : function()
                        {
                            me.showItemView();
                        },
                        okEvent        : function()
                        {
                            me.processStatus += 1;
                            me.changeTitle();
                            me.changeButton(false);
                            me.showItemView();
                        }
                    });
                    confirm.show();
                }
                return false;
            case MasterProcessStatus.FinishFinalizeSetup:
                return true;
            default:
                panelTabConstitution.fireEvent("click");
                panelTabMasterList.hide();
                panelMasterList = null;
        }

        return false;
    },

    changeItemView : function(status, name) {
        var me = this;
        if (me.cacheContentPanel[status] == null) {
            me.contentPanel = Ext.create(name, {
                mainPanel: me,
                processStatus: status,
            });
            me.cacheContentPanel[status] = me.contentPanel;
        }
        else {
            me.contentPanel = me.cacheContentPanel[status];
        }
        if (MasterProcessStatus.CreationEP == status) {
            me.settingNameList = [];
            me.groupIconList = [];
            me.contentPanel.loadData();
        }else {
            if (!me.isBack) {
                me.contentPanel.loadData();
            }
            else if (MasterProcessStatus.CreationEP == status) {
                me.contentPanel.changeDataAndPage();
            }
        }

        me.centerPanel.removeAll(false);
        me.centerPanel.add(me.contentPanel);
    },

    showItemView: function()
    {
        var me = this;
        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:

                me.centerPanel.removeAll(false);
                var contentPanel = Ext.create('PM.view.master.Information',{
                    parentPanel : me,
                    labelText1  : stringSetting.master.message.start_text1,
                    labelText2  : stringSetting.master.message.start_text2,
                });
                me.centerPanel.add(contentPanel);
                break;
            case MasterProcessStatus.CreationEP:
                me.changeItemView(me.processStatus, 'PM.view.master.select.EPMaster');
                break;
            case MasterProcessStatus.CreationSureIQ:
                me.changeItemView(me.processStatus, 'PM.view.master.select.SureIQMaster');
                break;
            case MasterProcessStatus.CreationSureExp:
                me.changeItemView(me.processStatus, 'PM.view.master.select.SureExpMaster');
                break;
            case MasterProcessStatus.CreationCP:
                me.changeItemView(me.processStatus, 'PM.view.master.select.CPMaster');
                break;
            case MasterProcessStatus.CreationVoice:
                me.changeItemView(me.processStatus, 'PM.view.master.select.VoiceMaster');
                break;
            case MasterProcessStatus.Setting:
                if(me.cacheContentPanel[me.processStatus] == null)
                {
                    me.contentPanel = Ext.create('PM.view.master.ExamPlanSetting',{
                        mainPanel       : me
                    });
                    me.cacheContentPanel[me.processStatus] = me.contentPanel;
                }
                else
                {
                    me.contentPanel = me.cacheContentPanel[me.processStatus];
                }
                if(!me.isBack)
                {
                    me.contentPanel.loadData(me.batchProtocolList);
                }

                me.centerPanel.removeAll(false);
                me.centerPanel.add(me.contentPanel);
                break;

            case MasterProcessStatus.SelectOther:
                me.changeItemView(me.processStatus, 'PM.view.master.select.OtherSettings');
                break;

            case MasterProcessStatus.Approving:
                me.centerPanel.removeAll(false);
                me.contentPanel = Ext.create('PM.view.master.ProtocolsListView',{
                    parentPanel    : me,
                    protocolList   : me.batchProtocolList
                });
                me.centerPanel.add(me.contentPanel);
                break;
            case MasterProcessStatus.FinishProtocolList:
                if(me.batchProtocolList.length == 0)
                {
                    break;
                }
                var confirm = Ext.create('PM.view.master.BatchProtocolsList', {
                    parentPanel     : me,
                    protocolList    : me.batchProtocolList,
                    cancelEvent     : function()
                    {
                        me.processStatus += 1;
                        me.changeTitle();
                        me.changeButton(false);
                        me.showItemView();
                    },
                });
                confirm.show();
                break;
            case MasterProcessStatus.FinishFinalizeSetup:

                me.centerPanel.removeAll(false);
                var contentPanel = Ext.create('PM.view.master.Information',{
                    parentPanel : me,
                    labelText1  : stringSetting.master.message.finish_text1,
                    labelText2  : stringSetting.master.message.finish_text2,
                });
                me.centerPanel.add(contentPanel);
                break;
        }
    },

    changeTitle: function()
    {
        var me = this;
        var titleVal = "";
        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:
                titleVal = stringSetting.master.title.Start;
                break;
            case MasterProcessStatus.CreationEP:
                titleVal = stringSetting.master.title.CreationEP;
                break;
            case MasterProcessStatus.CreationSureIQ:
                titleVal = stringSetting.master.title.CreationSureIQ;
                break;
            case MasterProcessStatus.CreationSureExp:
                titleVal = stringSetting.master.title.CreationSureExp;
                break;
            case MasterProcessStatus.CreationCP:
                titleVal = stringSetting.master.title.CreationCP;
                break;
            case MasterProcessStatus.CreationVoice:
                titleVal = stringSetting.master.title.CreationVoice;
                break;
            case MasterProcessStatus.Setting:
                titleVal = stringSetting.master.title.Setting;
                break;
            case MasterProcessStatus.SelectOther:
                titleVal = stringSetting.master.title.SelectOther;
                break;
            case MasterProcessStatus.Approving:
                titleVal = stringSetting.master.title.Approving;
                break;
            case MasterProcessStatus.FinishProtocolList:
                titleVal = stringSetting.master.title.FinishProtocolList;
                break;
            case MasterProcessStatus.FinishFinalizeSetup:
                titleVal = stringSetting.master.title.FinishFinalizeSetup;
                break;
        }

        me.headerPanel.removeAll();
        var lab = Ext.create('Ext.form.Label', {
            height          : 50,
            padding         : "0 0 0 0",
            cls             : 'panel-NoborderPadding-transparent',
            bodyCls         : 'panel-NoborderPadding-transparent',
            componentCls    : "labelHeader",
            html            : titleVal
        });
        me.headerPanel.add(lab)
    },

    setNextButtonText: function(val)
    {
        var me = this;
        me.btnNext.setText('<span class="SpanTextView" style="padding-left:10px;">' + val + '</span>');
    },

    getMasterListParams : function(status)
    {
        var me = this;

        return me.cacheContentPanel[status].getMasterListParams();
    },

    changeImage: function()
    {
        var me = this;

        var _w = 900;
        if(document.documentElement.scrollWidth == 1280)
        {
            _w = 780;
        }
        else
        {
            _w = document.documentElement.scrollWidth - 1280 + 780;
        }
        if(_w > 960)
        {
            _w = 960;
        }

        var _src = "";
        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard1.png';
                break;
            case MasterProcessStatus.CreationEP:
            case MasterProcessStatus.CreationSureIQ:
            case MasterProcessStatus.CreationSureExp:
            case MasterProcessStatus.CreationCP:
            case MasterProcessStatus.CreationVoice:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard2.png';
                if(me.contentPanel != null && !me.contentPanel.loading)
                {
                    me.contentPanel.resizeView(false);
                }
                break;
            case MasterProcessStatus.Setting:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard3.png';
                if(me.contentPanel != null){
                    me.contentPanel.resize();
                }
                break;
            case MasterProcessStatus.SelectOther:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard4.png';

                break;
            case MasterProcessStatus.Approving:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard5.png';
                if(me.contentPanel != null){
                    me.contentPanel.resize();
                }
                break;
            case MasterProcessStatus.FinishProtocolList:
            case MasterProcessStatus.FinishFinalizeSetup:
                _src = PROCESS_PATH_GLOBAL_RESOURCES + 'images/process/wizard6.png';
                break;
        }
        if(me.statusImage == null)
        {
            me.statusImage = Ext.create('Ext.Img', {
                height:48,
                width:_w,
                src: _src
            });
        }
        else
        {
            me.statusImage.setWidth(_w);
            me.statusImage.setSrc(_src);
        }

        var _statusTxt = document.getElementsByClassName("master-status-text");
        if(_statusTxt != null && _statusTxt.length > 0)
        {
            var divTxt = _statusTxt[0];
            divTxt.style.width = _w + "px";
            divTxt.innerHTML = me.getStatusText(_w - 60);
            me.leftStatusImgPanel.setWidth(_w);
        }
        else
        {
            me.statusText = {
                cls         : 'panel-NoborderPadding-transparent',
                bodyCls     : 'panel-NoborderPadding-transparent',
                style       : "margin-top:-48px",
                width       : _w,
                html        : "<div class='master-status-text'>" + me.getStatusText(_w - 60) + "</div>"
            };
        }
    },

    getStatusText: function(_w)
    {
        var me = this;
        var tdWidth = _w/6;
        var ary = new Array();
        var tdCls = ["master-status-black",
                     "master-status-black",
                     "master-status-black",
                     "master-status-black",
                     "master-status-black",
                     "master-status-black"];
        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:
                tdCls[0] = "master-status-white";
                break;
            case MasterProcessStatus.CreationEP:
            case MasterProcessStatus.CreationSureIQ:
            case MasterProcessStatus.CreationSureExp:
            case MasterProcessStatus.CreationCP:
            case MasterProcessStatus.CreationVoice:
                tdCls[1] = "master-status-white";
                break;
            case MasterProcessStatus.Setting:
                tdCls[2] = "master-status-white";
                break;
            case MasterProcessStatus.SelectOther:
                tdCls[3] = "master-status-white";
                break;
            case MasterProcessStatus.Approving:
                tdCls[4] = "master-status-white";
                break;
            case MasterProcessStatus.FinishProtocolList:
            case MasterProcessStatus.FinishFinalizeSetup:
                tdCls[5] = "master-status-white";
                break;
        }
        ary.push("<table>");
        ary.push("<tr>");
        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[0] + "' >");
        ary.push(stringSetting.master.statusLab.Start);
        ary.push("</span>");
        ary.push("</td>");

        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[1] + "' >");
        ary.push(stringSetting.master.statusLab.Creation);
        ary.push("</span>");
        ary.push("</td>");

        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[2] + "' >");
        ary.push(stringSetting.master.statusLab.Setting);
        ary.push("</span>");
        ary.push("</td>");

        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[3] + "' >");
        ary.push(stringSetting.master.statusLab.SelectOther);
        ary.push("</span>");
        ary.push("</td>");

        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[4] + "' >");
        ary.push(stringSetting.master.statusLab.Approving);
        ary.push("</span>");
        ary.push("</td>");

        ary.push("<td class = 'master-status-text-td' width=" + tdWidth + ">");
        ary.push("<span class='" + tdCls[5] + "' >");
        ary.push(stringSetting.master.statusLab.Finish);
        ary.push("</span>");
        ary.push("</td");
        ary.push("</tr>");
        ary.push("</table>");
        return ary.join('');
    },

    changeButton: function(isBack)
    {
        var me = this;

        switch (me.processStatus)
        {
            case MasterProcessStatus.Start:
                me.setNextButtonText(stringSetting.master.button.Next);
                me.btnBack.setDisabled(true);
                break;
            case MasterProcessStatus.CreationEP:
            case MasterProcessStatus.CreationSureExp:
            case MasterProcessStatus.CreationSureIQ:
            case MasterProcessStatus.CreationCP:
            case MasterProcessStatus.CreationVoice:
                me.setNextButtonText(stringSetting.master.button.Next);
                me.btnBack.setDisabled(false);
                break;
            case MasterProcessStatus.Setting:
                me.setNextButtonText(stringSetting.master.button.Next);
                me.btnBack.setDisabled(false);
                break;
            case MasterProcessStatus.SelectOther:
                me.setNextButtonText(stringSetting.master.button.Next);
                me.btnBack.setDisabled(false);
                me.btnNext.setDisabled(true);
                break;
            case MasterProcessStatus.Approving:
                me.setNextButtonText(stringSetting.master.button.Approve);
                me.btnBack.setDisabled(false);
                break;
            case MasterProcessStatus.FinishProtocolList:
                me.setNextButtonText(stringSetting.master.button.Next);
                me.btnBack.setDisabled(false);
                break;
            case MasterProcessStatus.FinishFinalizeSetup:
                me.setNextButtonText(stringSetting.master.button.Finish);
                me.btnBack.setDisabled(true);
                me.btnCancel.setDisabled(true);
                break;
        }
        if(isBack)
        {
            me.btnNext.setDisabled(false);
        }
        me.changeImage();
    },

    initCacheData:function()
    {
        var me = this;
        me.cacheContentPanel = [];
        me.settingNameList = [];
        me.groupIconList = [];
        me.manualMasterData = {
            EP      : [],
            SureIQ  : [],
            SureExp : [],
            CP      : [],
            Voice   : [],
            Setting : []
        };
        me.batchProtocolList = [];
        me.seq = 0;
    },

    doRefreshEvent:function() {
        var me = this;
        me.contentPanel.doRefreshEvent();
    }
});