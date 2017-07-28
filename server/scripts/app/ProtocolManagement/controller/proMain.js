/*!
 * ProtocolSelect JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

//************ Html Data ********BEGIN**********************
var frameMain = null;
var panelTabs = null;

var panelTabRequestList = null;
var panelTabConstitution = null;
var panelTabTransfer = null;
var panelTabSetting = null;
var panelTabMasterList = null;
var panelTabProtocolPosition = null;

var panelRequestList = null;
var panelConstitution = null;
var panelTransfer = null;
var panelSetting = null;
var panelMasterList = null;
var panelProtocolPosition = null;
var columnInfoForRequestListFilter = [];
var columnInfoForHistoryListFilter = [];
var columnInfoForTransferListFilter = [];
var headerDataForHistoryList = [];
var headerDataForHistoryListFlg = false;
var headerDataForTransferList = [];
var headerDataForTransferListFlg = false;

var memoryLanguage = "EN";
var memoryProtocolShare = true;
var memoryProtocolRpids = true;
var memoryReferenceShare = true;
var menuShowMemory = null;
var showDelay = 0;
var workflowWithVoicePresetEnabled = false;
var backupProtocolDataEnabled = true;
var transferPresetEnabled = false;
var positionChangeTimeout = 300;
var protocolPositionSettingsEnabled = false;

var timeout = 10000;
var coSort = new Intl.Collator(["ja-JP"]);
/*var coSort = {
    compare : function(a,b) {
        if(a !== b && a!== undefined) {
            if(!isNaN(a) && !isNaN(b)){
                if(parseFloat(a) > parseFloat(b)){
                    return 1;
                }else{
                    return -1;
                }
            }else {
                return ('' + a).localeCompare(('' + b), 'ja-JP');
            }
        }
        return 0;
    }
}*/

var lockStartTime = 0;
var lockTotalTime = 300000;
//************ Html Data ********END**********************

Ext.onReady(function() {
    createMainpage();
    Ext.QuickTips.init();

    var panelPageShow = null;
    var licensing = true;

    var displayConfig = [];
    var arrayTabItems = [];
    var btnMenu = null;

    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    /**
     * change to tab Panel
     * @param {Object} config
     *
     */
    function changePanel(config)
    {
        frameMain.remove(0, false);
        frameMain.add(Ext.apply(config));
    }

    /**
     * change to tab Line Panel
     * @param {string} config
     *
     */
    function changePanelLine(selectAry)
    {
        if(selectAry != null && Ext.isArray(selectAry))
        {
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.Request].body, selectAry[PageIndex.Request]);
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.History].body, selectAry[PageIndex.History]);
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.Transfer].body, selectAry[PageIndex.Transfer]);
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.ProtocolPosition].body, selectAry[PageIndex.ProtocolPosition]);
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.AppSettings].body, selectAry[PageIndex.AppSettings]);
            updElementCls(panelTabs.items.items[1].items.items[PageIndex.Master].body, selectAry[PageIndex.Master]);
        }
    }

    function updElementCls(element, bool)
    {
        if(element !== null)
        {
            if(bool)
            {
                element.removeCls("panelTab-Line");
                element.addCls("panelTab-select-Line");
            }
            else
            {
                element.removeCls("panelTab-select-Line");
                element.addCls("panelTab-Line");
            }
        }
    }

    function createRequest()
    {
        panelRequestList = Ext.create('PM.view.request.Base',{
            hidden          : false,
            minHeight       : 300,
            minWidth        : 1260,
            minWinWidth     : 1170
        });
    }

    function createConstitution()
    {
        panelConstitution = Ext.create('PM.view.history.HistoryList',{
            hidden      : false,
            minHeight   : 300
        });
    }

    function createTransfer()
    {
        panelTransfer = Ext.create('PM.view.history.TransferList',{
            hidden      : false,
            minHeight   : 300
        });
    }

    function createSetting()
    {
        panelSetting = Ext.create('PM.view.Setting.SettingView',{
            hidden      : false,
            minHeight   : 300
        });
    }

    function createMasterList()
    {
        panelMasterList = Ext.create('PM.view.master.BaseList',{
            hidden      : false,
            minHeight   : 300
        });
    }

    function createProtocolPosition()
    {
        panelProtocolPosition = Ext.create('PM.view.window.ExamPlanPositionChangeDialog',{
            hidden      : false,
            minHeight   : 300
        });
    }

    /**
     * change to Main Page
     * @param {Object} config
     *
     */
    function changeMainPage(config)
    {
        cacheLocalStorage.set(StoragePage.name, config);

        if(panelRequestList != null)
        {
            if(panelTabRequestList.isSelectd())
            {
                panelRequestList.compCenterPanel.update("");
                panelRequestList.clearMenuDiv();
            }
            panelRequestList.hide();
        }
        if(panelConstitution != null)
        {
            if(panelTabConstitution.isSelectd())
            {
                panelConstitution.centerPanel.update("");
            }
            panelConstitution.hide();
        }
        if(panelTransfer != null)
        {
            if(panelTabTransfer.isSelectd())
            {
                panelTransfer.centerPanel.update("");
            }
            panelTransfer.hide();
        }
        if(panelSetting != null)
        {
            panelSetting.hide();
        }

        if(panelMasterList != null)
        {
            panelMasterList.hide();
        }

        if(panelProtocolPosition != null){
            panelProtocolPosition.hide();
        }

        if(config == StoragePage.Request)
        {
            if(panelRequestList == null)
            {
                createRequest();
            }
            else
            {
                panelRequestList.show();
                panelRequestList.cleanPanel();
            }
            setTabStatus(config);
            panelPageShow = panelRequestList;
        }
        else if(config == StoragePage.History)
        {
            if(panelConstitution == null)
            {
                createConstitution();
            }
            else
            {
                headerDataForHistoryListFlg = false;
                createConstitution();
                panelConstitution.show();
            }
            setTabStatus(config);
            panelPageShow = panelConstitution;
        }
        else if(config == StoragePage.Transfer)
        {
            if(panelTransfer == null)
            {
                createTransfer();
            }
            else
            {
                headerDataForTransferListFlg = false;
                createTransfer();
                panelTransfer.show();
            }
            setTabStatus(config);
            panelPageShow = panelTransfer;
        }
        else if(config == StoragePage.AppSettings)
        {
            if(panelSetting == null)
            {
                createSetting();
            }
            else
            {
                panelSetting.show();
            }
            setTabStatus(config);
            panelPageShow = panelSetting;
        }
        else if(config == StoragePage.Master)
        {
            if(panelMasterList == null)
            {
                createMasterList();
            }
            else
            {
                panelMasterList.show();
            }
            setTabStatus(config);
            panelPageShow = panelMasterList;
        }
        else if(config == StoragePage.ProtocolPosition)
        {
            if(panelProtocolPosition == null)
            {
                createProtocolPosition();
            }
            else
            {
                panelProtocolPosition.show();
            }
            setTabStatus(config);
            panelPageShow = panelProtocolPosition;
        }
    }

    var setTabStatus = function(sel) {
        var request = false;
        var history = false;
        var transfer = false;
        var setting = false;
        var master = false;
        var position = false;
        if (sel == StoragePage.Request) {
            request = true;
        }
        else if (sel == StoragePage.History) {
            history = true;
        }
        else if (sel == StoragePage.Transfer) {
            transfer = true;
        }
        else if (sel == StoragePage.AppSettings) {
            setting = true;
        }
        else if (sel == StoragePage.Master) {
            master = true;
        }
        else if (sel == StoragePage.ProtocolPosition) {
            position = true;
        }
        panelTabRequestList.setSelected(request);
        panelTabConstitution.setSelected(history);
        panelTabTransfer.setSelected(transfer);
        panelTabSetting.setSelected(setting);
        panelTabMasterList.setSelected(master);
        panelTabProtocolPosition.setSelected(position);

        changePanelLine([request, history, transfer, position, setting, master]);
    }

    /**
     * click RequestList tab
     *
     */
    function clickRequestList()
    {
        var checkChangePositon = checkChangePosition(clickRequestList);
        if(!checkChangePositon){
            return;
        }
        if(panelTabRequestList.isSelectd())
        {
            return;
        }
        changeMainPage(StoragePage.Request);

        panelRequestList.selectRowNum = -1;
        panelRequestList.panelInit();

        Ext.getBody().mask();
        createMask();

        if(btnMenu != null)
        {
            if(btnMenu.menu.items.items.length >2) {
                btnMenu.menu.items.items[2].hide();
            }
            btnMenu.show();
        }

        panelRequestList.store.load({
                            params: {refresh_flg : ""}});
        changePanel(panelRequestList);
        setTimeout(runTask, timeout);
    }

    /**
     * click Constitution tab
     *
     */
    function clickConstitution()
    {
        var checkChangePositon = checkChangePosition(clickConstitution);
        if(!checkChangePositon){
            return;
        }

        if(panelTabConstitution.isSelectd())
        {
            return;
        }
        var _refresh_flg = "";
        if(panelConstitution == null)
        {
            _refresh_flg = "refresh"
        }
        changeMainPage(StoragePage.History);

        Ext.getBody().mask();
        createMask();

        if (panelConstitution.selectRowNum != -1) {
            panelConstitution.backList(false);
        }

        if(btnMenu != null)
        {
            if(btnMenu.menu.items.items.length >2) {
                btnMenu.menu.items.items[2].show();
            }
            btnMenu.show();
        }

        panelConstitution.store.load({
                params: {refresh_flg : _refresh_flg}});

        panelConstitution.hideHistoryFlag = false;
        changePanel(panelConstitution);

        setTimeout(runTask, timeout);

    }

    /**
     * click Transfer tab
     *
     */
    function clickTransfer()
    {
        var checkChangePositon = checkChangePosition(clickTransfer);
        if(!checkChangePositon){
            return;
        }
        if(panelTabTransfer.isSelectd())
        {
            return;
        }
        var _refresh_flg = "";
        if(panelTransfer == null)
        {
            _refresh_flg = "refresh"
        }
        changeMainPage(StoragePage.Transfer);

        Ext.getBody().mask();
        createMask();

        if (panelTransfer.selectRowNum != -1) {
            panelTransfer.backList(false);
        }

        if(btnMenu != null)
        {
            if(btnMenu.menu.items.items.length >2) {
                btnMenu.menu.items.items[2].hide();
            }
            btnMenu.show();
        }
        panelTransfer.store.load({
                params: {refresh_flg : _refresh_flg}});

        panelTransfer.hideHistoryFlag = false;
        changePanel(panelTransfer);

        setTimeout(runTask, timeout);
    }

    function checkChangePosition(fn){
        if(panelProtocolPosition) {
            if (panelProtocolPosition.examPlanChangeList.length > 0) {
                var errormessage = Ext.clone(stringSetting.error.ERR0029);
                errormessage.overview = '';

                var _message = Ext.create('PM.view.common.window.ConfirmMessage', {
                    labelText1: stringSetting.protocol_position.message.leave_page,
                    labelText2: stringSetting.protocol_position.message.not_save,
                    btn1Text:stringSetting.protocol_position.button.leave,
                    btn2Text:stringSetting.protocol_position.button.stay,
                    labelText1Height: 30,
                    okEvent: function (result) {
                        panelProtocolPosition.initializeData();
                        panelProtocolPosition.reloadData();
                        fn();
                        return true;
                    },
                    cancelEvent: function () {
                        return false;
                    }
                });
                _message.show();
                return false;
            }else if(panelProtocolPosition.canSave) {
                panelProtocolPosition.initializeData();
                panelProtocolPosition.reloadData();
            }
        }
        return true;
    }

    function clickSetting()
    {
        var checkChangePositon = checkChangePosition(clickSetting);
        if(!checkChangePositon){
            return;
        }
        if(panelTabSetting.isSelectd())
        {
            return;
        }

        if(btnMenu != null)
        {
            btnMenu.hide();
        }

        changeMainPage(StoragePage.AppSettings);
        changePanel(panelSetting);
        panelSetting.changeTab();
        setTimeout(runTask, timeout);
    }

    function clickMasterList()
    {
        var checkChangePositon = checkChangePosition(clickMasterList);
        if(!checkChangePositon){
            return;
        }
        if(panelTabMasterList.isSelectd())
        {
            return;
        }

        if(btnMenu != null)
        {
            btnMenu.show();
        }

        changeMainPage(StoragePage.Master);
        changePanel(panelMasterList);
        panelMasterList.showItemView();

        setTimeout(runTask, timeout);
    }

    function clickProtocolPostion()
    {
        if(panelTabProtocolPosition.isSelectd())
        {
            return;
        }

        if(btnMenu != null)
        {
            btnMenu.show();
        }

        changeMainPage(StoragePage.ProtocolPosition);
        changePanel(panelProtocolPosition);
        panelProtocolPosition.initializeData();
        panelProtocolPosition.reloadData();

        setTimeout(runTask, timeout);
    }

    function checkShowPage()
    {
        var _flgShow = cacheLocalStorage.get(StoragePage.name);
        displayConfig = [];
        for(var i = 0;i < 6;i++)
        {
            displayConfig[i] = {select : false,
                                style : 'panelTab-Line'};
        }

        if(_flgShow == StoragePage.Request)
        {
            createRequest();
            panelPageShow = panelRequestList;
            displayConfig[0].style = 'panelTab-select-Line';
            displayConfig[0].select = true;
            setTimeout(runTask, timeout);
        }
        else if(_flgShow == StoragePage.History)
        {
            createConstitution();
            panelPageShow = panelConstitution;
            displayConfig[1].style = 'panelTab-select-Line';
            displayConfig[1].select = true;
            setTimeout(runTask, timeout);
        }
        else if(_flgShow == StoragePage.Transfer)
        {
            createTransfer();
            panelPageShow = panelTransfer;
            displayConfig[2].style = 'panelTab-select-Line';
            displayConfig[2].select = true;
            setTimeout(runTask, timeout);
        }
        else if(_flgShow == StoragePage.ProtocolPosition)
        {
            createProtocolPosition();
            panelPageShow = panelProtocolPosition;
            displayConfig[3].style = 'panelTab-select-Line';
            displayConfig[3].select = true;
            setTimeout(runTask, timeout);
        }
        else if(_flgShow == StoragePage.AppSettings)
        {
            createSetting();
            panelPageShow = panelSetting;
            displayConfig[4].style = 'panelTab-select-Line';
            displayConfig[4].select = true;
            setTimeout(runTask, timeout);
        }
        else if(_flgShow == StoragePage.Master)
        {
            createMasterList();
            panelPageShow = panelMasterList;
            displayConfig[5].style = 'panelTab-select-Line';
            displayConfig[5].select = true;
            setTimeout(runTask, timeout);
        }
        else
        {
            createRequest();
            panelPageShow = panelRequestList;
            displayConfig[0].style = 'panelTab-select-Line';
            displayConfig[0].select = true;
            setTimeout(runTask, timeout);
        }
    }

    var loadSettingLanguage = function()
    {
        var storeLanguage = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getLanguage.action',
                getMethod : function() {
                    return 'GET';
                },
                reader:
                {
                    type: 'json'
                }
            }),
            model: 'PM.model.Language'
        });

        storeLanguage.on("load",function()
        {
            var css = document.createElement('link');
            css.rel = "stylesheet";
            css.type = "text/css";

            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", "UTF-8");
            var lan = storeLanguage.getAt(0).data.language;
            licensing = storeLanguage.getAt(0).data.licensing;
            memoryProtocolShare = storeLanguage.getAt(0).data.crossModelSharingEnabled;
            memoryProtocolRpids = storeLanguage.getAt(0).data.rpidmodel;
            memoryReferenceShare = storeLanguage.getAt(0).data.referencemodel;
            showDelay = storeLanguage.getAt(0).data.showdelay;
            workflowWithVoicePresetEnabled = storeLanguage.getAt(0).data.workflowWithVoicePresetEnabled;
            backupProtocolDataEnabled = storeLanguage.getAt(0).data.backupProtocolDataEnabled;
            transferPresetEnabled = storeLanguage.getAt(0).data.transferPresetEnabled;
            if(storeLanguage.getAt(0).data.positionChangeTimeout !== undefined) {
                positionChangeTimeout = storeLanguage.getAt(0).data.positionChangeTimeout;
            }
            lockTotalTime = positionChangeTimeout * 1000;
            protocolPositionSettingsEnabled = storeLanguage.getAt(0).data.protocolPositionSettingsEnabled;
            Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
                showDelay: showDelay
            });
//lan = "EN"
            if(lan != null && lan != "undefined")
            {
                css.href = PROCESS_PATH_GLOBAL_RESOURCES + "css/other/FontFamilyBy" + lan + ".css";
                script.setAttribute("src", PROCESS_PATH_GLOBAL_SCRIPTS + "other/StringSettingBy" + lan + ".js");
                memoryLanguage = lan;
            }
            else
            {
                css.href = PROCESS_PATH_GLOBAL_RESOURCES + "css/other/FontFamilyByEN.css";
                script.setAttribute("src", PROCESS_PATH_GLOBAL_SCRIPTS + "other/StringSettingByEN.js");
                memoryLanguage = "EN";
            }

            var loadFlg = false;
            if(css.readyState)
            {
                css.onreadystatechange = function()
                {
                    if(css.readyState=="loaded" ||
                          css.readyState=="complete")
                       {
                        css.onreadystatechange = null;
                        if(loadFlg)
                        {
                               loadMainPage();
                        }
                        else
                        {
                            loadFlg = true;
                        }
                       }
                  };
             } else {
                  css.onload = function()
                  {
                       if(loadFlg)
                    {
                           loadMainPage();
                    }
                    else
                    {
                        loadFlg = true;
                    }
                  };
             }


            if(script.readyState){

                script.onreadystatechange = function()
                {
                    if(script.readyState=="loaded" ||
                          script.readyState=="complete")
                       {
                        script.onreadystatechange = null;
                           if(loadFlg)
                        {
                               loadMainPage();
                        }
                        else
                        {
                            loadFlg = true;
                        }
                       }
                  };
             } else {
                  script.onload = function()
                  {
                       if(loadFlg)
                    {
                           loadMainPage();
                    }
                    else
                    {
                        loadFlg = true;
                    }
                  };
             }

            document.getElementsByTagName("head")[0].appendChild(css);
            document.getElementsByTagName("head")[0].appendChild(script);
        });
        storeLanguage.load();
    };

    var mainPageResize = function()
    {
        var cW = document.documentElement.clientWidth;
        var cH = document.documentElement.clientHeight;
        var _mainP = Ext.getCmp('mainPanel');

        if(cW < 1600 && cH < 789)
        {
            _mainP.setWidth(cW - 17);
            _mainP.setHeight(cH - 51);
        }
        else if(cW < 1600 && cH >= 789)
        {
            _mainP.setWidth(cW);
            _mainP.setHeight(cH - 51);
        }
        else if(cH < 769 && cW < 1300)
        {
            _mainP.setWidth(cW - 17);
            _mainP.setHeight(cH - 51);
        }
        else if(cH < 769 && cW >= 1300)
        {
            _mainP.setWidth(cW);
            _mainP.setHeight(cH - 51);
        }
        else
        {
            _mainP.setWidth(cW);
            _mainP.setHeight(cH - 51);
        }
    };

    var setCheLocalAscii = function()
    {
        var chWidthCheTip13 = new Array();
        var chWidthCheTip14 = new Array();
        if (cacheLocalStorage.getObject('13pt') == null ||
            cacheLocalStorage.getObject('14pt') == null)
        {
            var str = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            chWidthCheTip13 = getAsciiWidth('13pt', str);
            chWidthCheTip14 = getAsciiWidth('14pt', str);
            cacheLocalStorage.setObject(memoryLanguage + '13pt', chWidthCheTip13);
            cacheLocalStorage.setObject(memoryLanguage + '14pt', chWidthCheTip14);
        }

    };

    var getMenu = function()
    {
        if(cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Reviewer)
        {
            return null;
        }
        var btnStatus = true;
        if(panelTabRequestList.isSelectd() ||
           panelTabConstitution.isSelectd() ||
           panelTabTransfer.isSelectd() ||
            panelTabMasterList.isSelectd() ||
            panelTabProtocolPosition.isSelectd()
        )
        {
            btnStatus = false;
        }
        var _width = 290;
        if(memoryLanguage != "EN" && memoryLanguage != "JP")
        {
            _width = 320;
        }
        var _menu = Ext.create('PM.view.menu.Menu', {
            width       : _width
        });
        var clickFn = function()
        {
            var userSpecificView = Ext.create('PM.view.SpecificName.Dialog',{
                OKLoad  : function()
                {
                    panelPageShow.doRefreshEvent();
                }
            });
            userSpecificView.show();
        }
        var backupBtnFn = function() {
            var userSpecificView = Ext.create('PM.view.window.BackupDialog');
            userSpecificView.show();
        };


        var nameList = [stringSetting.menu.identifing, stringSetting.backupDialog.menuItem];
        var fnList = [clickFn, backupBtnFn];
        if(protocolPositionSettingsEnabled){
            /*var epPositionChangeFn = function(){
               *//* var dialog = Ext.create('PM.view.window.ExamPlanPositionChangeDialog');
                dialog.showWin();*//*
                panelTabProtocolPosition.fireEvent("click");
                panelTabProtocolPosition.show();
            }
            nameList.push(stringSetting.menu.examplan_position_change);
            fnList.push(epPositionChangeFn);*/
        }
        _menu.createMenu(nameList,fnList);
        btnMenu = Ext.create('Ext.Button',{
            width:28,
            height:28,
            cls         : 'icon-button-menu',
            overCls     : 'icon-button-menu-over',
            pressedCls  : 'icon-button-menu-pressed',
            arrowCls    : 'icon-button-menu',
            menu        : _menu,
            hidden      : btnStatus
        });
        if(protocolPositionSettingsEnabled) {
            /*if (panelTabConstitution.isSelectd()) {
                btnMenu.menu.items.items[2].show();
            } else {
                btnMenu.menu.items.items[2].hide();
            }*/
        }
        return btnMenu;
    }

    var loadMainPage = function()
    {
        document.getElementById("id-main-title").textContent = stringSetting.protocolmanagement;

        if (!licensing) {
            var _message = Ext.create('PM.view.common.window.Message', {
                errorDetail: stringSetting.error.ERR01002,
                closeWin: function () {
                    this.close();
                    this.hideWin();
                    Ext.Ajax.request({
                        timeout: 120000,
                        url: PROCESS_PATH_GLOBAL_ACTION + 'kill',
                        success: function (response) {
                            console.log("kill success");
                        }
                    });
                    return;
                }
            });
            _message.showWin();
            return;
        }

        setCheLocalAscii();

        // create the UserInfo store
        var store = new Ext.data.Store(
        {
            proxy: new Ext.data.proxy.Ajax({
                type:'ajax',
                url: PROCESS_PATH_GLOBAL_ACTION + 'getUserGroup.action',
                getMethod : function() {
                    return 'GET';
                },
                reader:
                {
                    type: 'json',
                    root: 'result',
                    totalProperty:'total'
                }
            }),
            model: 'PM.model.UserInfo'
        });

        store.on("load",function()
        {
            if(store.getAt(0).get("visit") == false)
            {
                cacheLocalStorage.remove(StoragePage.name);
                cacheLocalStorage.remove(userInfo.UserName);
                cacheLocalStorage.remove(userInfo.IsAdmin);
                cacheLocalStorage.set(StoragePage.name, StoragePage.Request);
                cacheLocalStorage.set(userInfo.UserName, store.getAt(0).get("username"));
                cacheLocalStorage.set(userInfo.IsAdmin, store.getAt(0).get("usergroup"));
            }

            createTask();

            checkShowPage();

            panelTabRequestList = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.requestlist,
                selected    : displayConfig[0].select,
                listeners: {
                    click: clickRequestList
                }
            });

            panelTabConstitution = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.history,
                selected    : displayConfig[1].select,
                listeners: {
                    click: clickConstitution
                }
            });

            panelTabTransfer = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.transfer,
                selected    : displayConfig[2].select,
                listeners: {
                    click: clickTransfer
                }
            });

            panelTabProtocolPosition = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.position,
                selected    : displayConfig[3].select,
                hidden      : !protocolPositionSettingsEnabled,
                listeners: {
                    click: clickProtocolPostion
                }
            });

            panelTabSetting = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.app_setting,
                selected    : displayConfig[4].select,
                listeners: {
                    click: clickSetting
                }
            });

            panelTabMasterList = Ext.create('PM.view.tab.TabView',{
                tabValue    : stringSetting.tab.master,
                selected    : displayConfig[5].select,
                hidden      : !displayConfig[5].select,
                listeners: {
                    click: clickMasterList
                }
            });

            if(cacheLocalStorage.get(userInfo.IsAdmin) == UserAuthority.Administrator)
            {
                arrayTabItems.push(panelTabRequestList);
                arrayTabItems.push(panelTabConstitution);
                arrayTabItems.push(panelTabTransfer);
                arrayTabItems.push(panelTabProtocolPosition);
                arrayTabItems.push(panelTabSetting);
                arrayTabItems.push(panelTabMasterList);
            }
            else
            {
                arrayTabItems.push(panelTabRequestList);
                arrayTabItems.push(panelTabConstitution);
                arrayTabItems.push(panelTabTransfer);
                arrayTabItems.push(panelTabProtocolPosition);
            }

            panelTabs = Ext.create('Ext.panel.Panel',{
                region        : 'north',
                cls            : 'panel-NoborderPadding',
                bodyCls        : 'panel-Color-NoborderPadding',
                height        : 31,
                layout        :
                {
                    type    : 'border'
                },
                items: [{
                    cls             : 'panel-NoborderPadding',
                    bodyCls         : 'panel-Color-NoborderPadding',
                    region          : 'north',
                    height          : 30,
                    layout        :
                    {
                        type    : 'border'
                    },
                    items:[{
                        cls             : 'panel-NoborderPadding',
                        bodyCls         : 'panel-Color-NoborderPadding',
                        region          : 'center',
                        height          : 30,
                        layout:
                        {
                            type: 'hbox',
                            align:'left'
                        },
                        defaults:
                        {
                            padding:'0 0 0 0',
                            margins:'0 3 0 0'
                        },
                        items: arrayTabItems
                    },
                    {
                        cls             : 'panel-NoborderPadding',
                        bodyCls         : 'panel-Color-NoborderPadding',
                        region          : 'east',
                        height          : 30,
                        width           : 28,
                        items           : [getMenu()]
                    }]
                },{
                    region        : 'center',
                    cls            : 'panelTab-Line',
                    bodyCls        : 'panelTab-Line-body',
                    layout        :
                    {
                        type: 'hbox',
                        align:'left'
                    },
                    defaults:
                    {
                        padding:'0 0 0 0',
                        margins:'0 6 0 0'
                    },
                    items: [{
                                height    : 1,
                                width    : 257,
                                bodyCls    : displayConfig[0].style
                            },
                            {
                                width    : 257,
                                height    : 1,
                                bodyCls    : displayConfig[1].style
                            },
                            {
                                width    : 257,
                                height    : 1,
                                bodyCls    : displayConfig[2].style
                            },
                            {
                                width   : 257,
                                height  : 1,
                                bodyCls : displayConfig[3].style
                            },
                            {
                                width   : 257,
                                height  : 1,
                                bodyCls : displayConfig[4].style
                            },
                            {
                            width   : 257,
                            height  : 1,
                            bodyCls : displayConfig[5].style
                        }]
                }]
            });

            frameMain = Ext.create('Ext.panel.Panel',{
                cls             : 'panel-NoborderPadding',
                bodyCls         : 'panelframeMain_body',
                region          : 'center',
                minHeight       : 300,
                layout          : 'fit',
                defaults        : {
                    bodyPadding:0
                },
                items           : [panelPageShow]
            });

            Ext.create('Ext.panel.Panel',{
                id            : 'mainPanel',
                renderTo    : 'id-tab-main',
                layout        :
                {
                    type    : 'border'
                },
                minHeight    : 718,
                minWidth    : 1600,
                width        : '100%',
                cls            : 'panel-NoborderPadding',
                style        : 'padding-left: 8px;padding-right: 8px;',
                bodyCls        : 'panel-Color-NoborderPadding',
                items        : [ panelTabs,
                                frameMain]
            });

           /* var protocolShareStore = new Ext.data.Store({
                proxy   : new Ext.data.proxy.Ajax({
                    type       : 'ajax',
                    url        : PROCESS_PATH_GLOBAL_ACTION + 'getProtocolShareSetting.action',
                    reader     : {
                        type            : 'json',
                        totalProperty   : 'total',
                        root            : 'result'
                    }
                }),
                model    : 'PM.model.AppSetting'
            });
            protocolShareStore.on("load", function() {
                for (var i = 1; i < protocolShareStore.getCount(); i++) {
                    var lineData = protocolShareStore.data.getAt(i);
                    var backupsupport = lineData.get("backupsupport");
                    if (backupsupport == "false") {
                        var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                        button.menu.items.items[1].hide();
                    } else {
                        var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                        button.menu.items.items[1].show();
                    }
                }
            });
            protocolShareStore.load();*/
            if(cacheLocalStorage.get(userInfo.IsAdmin) !== UserAuthority.Reviewer){
                if(backupProtocolDataEnabled){
                    var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                    button.menu.items.items[1].show();
                }else{
                    var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                    button.menu.items.items[1].hide();
                }
            }

            if(cacheLocalStorage.get(StoragePage.name) == StoragePage.AppSettings)
            {
                panelPageShow.initParam();
            }
            else if(cacheLocalStorage.get(StoragePage.name) == StoragePage.Request)
            {
                panelPageShow.store.load({
                            params: {refresh_flg : "refresh"}});
            }
            else if(cacheLocalStorage.get(StoragePage.name) == StoragePage.History)
            {
                Ext.getBody().mask();
                createMask();
                panelPageShow.transferGroupName = "";
                panelPageShow.transferCount = 0;
                panelPageShow.store.load({
                            params: {refresh_flg : "refresh"}});
            }
            else if(cacheLocalStorage.get(StoragePage.name) == StoragePage.Transfer)
            {
                panelPageShow.transferGroupName = "";
                panelPageShow.transferCount = 0;
                panelPageShow.store.load({
                    params: {refresh_flg : "refresh"}});
            }
            else if(cacheLocalStorage.get(StoragePage.name) == StoragePage.Master)
            {
                panelPageShow.showItemView()
            }
            else if(cacheLocalStorage.get(StoragePage.name) == StoragePage.ProtocolPosition)
            {
                panelPageShow.loadData();
            }
            else {
                panelPageShow.store.load();
            }

            mainPageResize();
            
            if(cacheLocalStorage.get(userInfo.IsAdmin) != UserAuthority.Reviewer && memoryProtocolShare) {
                panelTabTransfer.show();
            } else {
                panelTabTransfer.hide();
            }
        });
        store.load();
    };

    //window localStorage check
    if(!window.localStorage)
    {
        alert('This browser does not support localStorage.');
    }

    loadSettingLanguage();

    Ext.EventManager.onWindowResize(function(width,height)
    {

        if(panelTabRequestList.isSelectd())
        {
            if(panelRequestList.selectRowNum != -1)
            {
                panelRequestList.resizeFlg = true;
            }
        }
        if(panelTabConstitution.isSelectd())
        {
            if (!panelConstitution.historyShow) {
                panelConstitution.centerPanel.update("");
            }
        }
        if(panelTabTransfer.isSelectd())
        {
            if (!panelTransfer.historyShow) {
                panelTransfer.centerPanel.update("");
            }
        }
        mainPageResize();

        if(panelTabRequestList.isSelectd())
        {
            panelRequestList.panelUpdate();
            panelRequestList.resizeFlg = false;
            panelRequestList.columnHeaderPanel.panelUpdate();
            if(panelRequestList.comparePanel != null){
                panelRequestList.comparePanel.refrush();
            }
        }

        if(panelTabConstitution.isSelectd())
        {
            if (panelConstitution.historyShow) {
               panelConstitution.resizeWin();
            } else {
                panelConstitution.panelUpdate(true);
            }
        }
        if(panelTabTransfer.isSelectd())
        {
            if (panelTransfer.historyShow) {
               panelTransfer.resizeWin();
            } else {
                panelTransfer.panelUpdate(true);
            }
        }

        if(panelTabSetting != null && panelTabSetting.isSelectd())
        {
            panelSetting.addTips();
        }

        if(panelTabMasterList != null && panelTabMasterList.isSelectd())
        {
            panelMasterList.changeImage();
        }

        if(panelTabProtocolPosition != null && panelTabProtocolPosition.isSelectd())
        {
            //panelProtocolPosition.loadData();
        }



        if(menuShowMemory != null && !menuShowMemory.isHidden())
        {
            menuShowMemory.hide();
        }

        setTimeout(function(){
            mainPageResize();
        }, 1000);
    });
});
