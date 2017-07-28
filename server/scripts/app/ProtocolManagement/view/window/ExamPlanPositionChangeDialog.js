/*
 * ! JS Console Master
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.ExamPlanSetting
 * @extends PM.view.panel.Click
 */
Ext.define('PM.view.window.ExamPlanPositionChangeDialog', {
    /*extend          : 'PM.view.common.window.ModalDialog',*/
    extend :"Ext.panel.Panel",
    alias: 'widget.windowexamplanpositionchangedialog',
    cls             : 'panelTabView',
    bodyCls         : 'grid-Color-NoborderPadding',
    minWidth: 1024,
    width: 1368,
    modal:true,
    autoDestroy:true,

    patientTypeNum: 1,
    EPListNum: 4,
    selectNewNum: '',
    selectNumKey: null,
    patienttype: '',
    radioFlag: 0,
    organSelectedIndex: 0,
    protocolList: [],

    frameContent: null,
    westPanelTable: null,
    headerSouthPanel: null,
    tabsImgPanel: null,
    btnActiveChange: null,
    btnUndoChange: null,
    panelClientHeight: 704,
    organName: 'Head',
    addNewEPnumArray: [],
    adultOrganImages: ["body_part01_on.png",
        "body_part02_on.png",
        "body_part03_on.png",
        "body_part04_on.png",
        "body_part05_on.png",
        "body_part06_on.png",
        "body_part07_on.png",
        "body_part_on.png",
        "body_all_on.png"],
    childOrganImages: ["body_part01_on.png",
        "body_part02_on.png",
        "body_part03_on.png",
        "body_part04_on.png",
        "body_part05_on.png",
        "body_part06_on.png",
        "body_part07_on.png",
        "body_part_on.png",
        "body_all_on.png"],
    adultOrganLocations: ['148,10,226,58',
        '148,61,226,85',
        '148,88,226,132',
        '148,135,226,179',
        '148,182,226,226',
        '148,229,226,386',
        '228,81,273,275',
        '40,111,89,204',
        '40,15,89,101'],
    childOrganLocations: ['152,77,233,138',
        '152,139,233,155',
        '152,156,233,193',
        '152,195,233,229',
        '152,230,233,257',
        '152,258,233,344',
        '235,156,279,249',
        '31,116,74,192',
        '31,32,74,101'],
    organNewArray: ['Head',
        'Neck',
        'Chest',
        'Abdomen',
        'Pelvis',
        'Leg',
        'Other',
        'Chest To Pelvis',
        'All'],
    PatientTypeScope: {
        AdultOrganListNum: [0, 48, 96, 144, 192, 240, 288, 336, 384],
        ChildOrganListNum: [432, 480, 528, 576, 624, 672, 720, 768, 816],
        TraumaOrganListNum: [864, 912, 960, 1008, 1056, 1104, 1152, 1200, 1248],
        isAdult: function (data) {
            return data < this.ChildOrganListNum[0] && data >= 0;
        },
        isChild: function (data) {
            return data < this.TraumaOrganListNum[0] && data >= this.ChildOrganListNum[0];
        },
        isTrauma: function (data) {
            return data >= this.TraumaOrganListNum[0] && data <= 1283;
        }
    },
    title:'',
    examPlanList:[],
    examPlanChangeList:[],
    currentSelected:null,
    settingNameList:[],
    scannerIndex : 0,
    examPlanChangeListStore:null,
    hasSave:false,
    canSave:false,
    panelButtons:null,
    groupName:'',
    preGroupName:'',

    initComponent: function () {
        var me = this;

        me.initializeData();

        //me.title = stringSetting.menu.examplan_position_change;

        /*var titleP = Ext.create('Ext.panel.Panel', {
            region      : 'north',
            height      : 35,
            layout      : {
                type    : 'border'
            },
            bodyCls     : 'panelHeader-body',
            margin: '10 0 0 0',
            items       :[{
                region      : 'center',
                bodyCls     : 'panelHeader-body',
                cls         : 'panel-NoborderPadding',
                bodyStyle   : 'border:0;',
                html        : '<div>' +
                    '<span class="spanGridHeaderText"></span>' +
                    '</div>' +
                    '<div style="float:left;margin-left: 25px;margin-top: 4px;">' +
                    '<div class="icon-button-storerefresh-his">' +
                    '<span class="SpanTextView-smallbutton" style="margin-top: -1px;padding-left:12px;">' + stringSetting.request.button.refresh + '</span>' +
                    '</div>' +
                    '</div>'
            },{
                region      : 'east',
                bodyCls     : 'panelHeader-body',
                cls         : 'panel-NoborderPadding',
                bodyStyle   : 'border:0;',
                items : [{
                    height : 35,
                    bodyCls: 'panelHeader-body-panel',
                    layout : 'column',
                    width  : 490,
                    layoutConfig :
                    {
                        columns : 4
                    },
                    items:[]
                }]
            }]
        });*/

        me.headerSouthPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            cls: 'panel-NoborderPadding-transparent',
            bodyCls: 'panel-NoborderPadding-transparent',
            margin: '0 12 0 12',
            bodyStyle: 'padding-top:120px;padding-bottom:10px;',
            width: 700,
            html: ''
        });

        //me.createButtonArea();

        var panelConfirmButton = Ext.create('Ext.panel.Panel', {
            region: 'south',
            height: 80,
            minHeight: 60,
            maxHeight: 80,
            cls: 'panel-NoborderPadding',
            bodyCls: 'panel-NoborderPadding-transparent',
            layout: {
                type: 'hbox',
                padding: '0 0 0 0',
                align: 'middle',
                pack: 'end'
            },
            defaults: {
                padding: '0 0 0 0',
                margins: '0 20 0 0'
            },
            items: [me.btnMakeChange,me.btnActiveChange, me.btnUndoChange]
        });

        me.tabsImgPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            height: 35,
            html: me.createPanelTab(true)
        });

        me.frameContent = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            height: 446,
            bodyStyle: 'background-color:#edf0f7',
            html: ''
        });

        me.eastWestPanel = Ext.create('Ext.panel.Panel', {
            region: 'west',
            bodyCls: 'panel-NoborderPadding-transparent',
            layout: 'auto',
            margin: '0 70 0 12',
            width: 342,
            height: 456,
            items: [me.tabsImgPanel, me.frameContent]
        });

        /*me.panelEastTabs = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            width: 450,
            height: 35,
            style:'border:1px solid red',
            html: me.createPanelTab(false)
        });*/

        me.panelEastTabs = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            /*width: 900,*/
            height: 35,
            layout:'hbox',
            items:[
                {
                    bodyCls: 'panel-NoborderPadding-transparent',
                    width: 450,
                    height: 35,
                    html: me.createPanelTab(false)
                },
                {
                    bodyCls: 'panel-NoborderPadding-transparent',
                    /*width: 450,*/
                    flex:1,
                    height: 35,
                    items:[
                        me.getScannerCombobox()
                    ]
                }
            ]
        });
        me.frameEastContent = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            height: 416,
            margin: '0 0 0 0',
            bodyStyle: 'border:1px solid #99bce8;',
            html: ''
        });
        me.eastEastPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            bodyCls: 'panel-NoborderPadding-transparent',
            layout: 'auto',
            height: 456,
            margin: '0 12 0 0',
            items: [me.panelEastTabs,
                me.frameEastContent,
                panelConfirmButton]
        });
        me.createButton();
        me.eastPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'border',
            bodyCls: 'panel-NoborderPadding-transparent',
            /*width: '95%',*/
            /*height:660,*/
            items: [/*titleP,*/me.headerSouthPanel, me.eastWestPanel, me.eastEastPanel,me.panelButtons]
        });

        Ext.applyIf(this, {
            layout:'fit',
            items: [me.eastPanel]
        });
        this.callParent(arguments);

        this.addEvents("click");

        me.initStore();
        me.scannerGroupStore.load();

        me.panelUpdate();
        //me.loadData();
    },
    onRender: function (ct, position) {
        this.callParent(arguments);
        this.body.on("click", this.onClick, this);
        this.body.on("mouseover", this.onMouseOver, this);

        //this.bindRefreshEvent();
    },
    onMouseOver: function (e) {
        this.fireEvent("onmouseover", e);
    },
    getScannerCombobox:function()
    {
        var me = this;

        me.scannerCombobox = Ext.create('PM.view.combox.DropdownListView', {
            width       : 260,
            textAlign   : 'center',
            colorModel  : 'skyblue',
            defaultValue: me.getDefaultValue()
        });
        me.scannerCombobox.createMenu(['1','2'], me.scannerItemClickFn, me);
        return me.scannerCombobox.combinedIconPanel('scanner_combobox_icon');
    },

    getDefaultValue:function()
    {
        var me = this;
        var defaultV = '';
        if(me.settingNameList.length == 0 &&
            me.scannerGroupStore != null &&
            me.scannerGroupStore.data.items.length > 0)
        {
            for(var i = 0; i < me.scannerGroupStore.data.items.length;i++)
            {
                var lineData = me.scannerGroupStore.data.items[i];
                if(lineData.data.settingname != "")
                {
                    me.settingNameList.push(lineData.data.settingname);
                }
            }
        }
        if(me.settingNameList.length > 0)
        {
            var hasGroup = false;
            if(me.groupName != '') {
                for (var i = 0; i < me.settingNameList.length; i++) {
                    if(me.groupName == me.settingNameList[i]){
                        hasGroup = true;
                        me.scannerIndex = i;
                    }
                }
            }
            if(hasGroup){
                defaultV = me.groupName;
            }else {
                if (me.scannerIndex != -1) {
                    if (me.groupName == me.settingNameList[me.scannerIndex]) {
                        defaultV = me.groupName;
                    }
                    defaultV = me.settingNameList[me.scannerIndex];
                } else {
                    defaultV = me.settingNameList[0];
                    me.scannerIndex = 0;
                }
            }
        }
        me.preGroupName = defaultV;
        me.groupName = defaultV;
        return defaultV;
    },

    scannerItemClickFn:function(itemIndex, mPanel) {
        var me = this;
        if (mPanel.canSave && mPanel.examPlanChangeList.length > 0) {
            var _message = Ext.create('PM.view.common.window.ConfirmMessage', {
                labelText1: stringSetting.protocol_position.message.leave_page,
                labelText2: stringSetting.protocol_position.message.not_save,
                btn1Text: stringSetting.protocol_position.button.leave,
                btn2Text: stringSetting.protocol_position.button.stay,
                labelText1Height: 30,
                okEvent: function (result) {
                    var groupName = mPanel.settingNameList[itemIndex];
                    mPanel.initializeData();
                    mPanel.scannerIndex = itemIndex;
                    mPanel.preGroupName = mPanel.groupName;
                    mPanel.groupName = groupName;
                    mPanel.reloadData();
                    return true;
                },
                cancelEvent: function () {
                    mPanel.updateScannerCombobox();
                    return false;
                }
            });
            _message.show();
        } else {
            var groupName = mPanel.settingNameList[itemIndex];
            if(mPanel.canSave){
                mPanel.preGroupName = mPanel.groupName;
            }else{
                mPanel.preGroupName = groupName;
            }
            mPanel.initializeData();
            mPanel.scannerIndex = itemIndex;
            mPanel.groupName = groupName;
            mPanel.reloadData();
        }
    },

    loadData: function () {
        var me = this;
        /*console.log(me.patientTypeNum);
        console.log(me.EPListNum);
        console.log(me.organName);
        console.log(me.radioFlag);
        console.log(me.groupName);*/
        me.examPlanChangeListStore.load({
            params: {
                scanner_group: me.groupName,
                key_array: '[]'
            }
        });
        Ext.getBody().mask();
        createMask();
    },

    createButton: function()
    {
        var me = this;

        if(lockStartTime > 0){
            me.canSave = true;
        }
        me.btnMakeChange = Ext.create('Ext.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Cancel',
            overCls: 'icon-button-Cancel-over',
            pressedCls: 'icon-button-Cancel-pressed',
            focusCls: 'icon-button-Cancel-focus',
            disabledCls: 'icon-button-Cancel-disable',
            text: '<span class="SpanTextView">' + stringSetting.protocol_position.button.make_change + '<span>',
            hidden:me.canSave,
            handler: function () {
                //lock
                PM.data.Connection.requestSend({
                    method: "GET",
                    url: PROCESS_PATH_GLOBAL_ACTION + 'lockProtocolPoolAction.action',
                    timeout: 30000,
                    params: {
                        user_name: cacheLocalStorage.get(userInfo.UserName),
                        scanner_group : me.groupName
                    },
                    loadData: function (responseObj, success) {
                        if (responseObj && responseObj.result !== '-1') {
                            me.canSave = true;
                            me.changeButtonStatus();
                            me.loadData();
                        } else {
                            me.showMessage45();
                        }
                    }
                });
            }
        });
        me.btnActiveChange = Ext.create('Ext.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Cancel',
            overCls: 'icon-button-Cancel-over',
            pressedCls: 'icon-button-Cancel-pressed',
            focusCls: 'icon-button-Cancel-focus',
            disabledCls: 'icon-button-Cancel-disable',
            text: '<span class="SpanTextView">' + stringSetting.protocol_position.button.active_change + '<span>',
            disabled: false,
            hidden:!me.canSave,
            handler: function () {

                var errormessage = Ext.clone(stringSetting.error.ERR0029);
                errormessage.overview = '';

                errormessage.details = stringSetting.protocol_position.message.save_examplan_position;
                var _message = Ext.create('PM.view.common.window.ConfirmMessage', {
                    labelText1: stringSetting.protocol_position.message.save_examplan_position,
                    labelText2: stringSetting.protocol_position.message.confirmview_text2,
                    labelText1Height : 30,
                    okEvent: function (result) {
                        me.saveChange();
                    }
                });
                _message.show();

                return false;
            }
        });
        me.btnUndoChange = Ext.create('Ext.Button', {
            height: 32,
            width: 138,
            cls: 'icon-button-Cancel',
            overCls: 'icon-button-Cancel-over',
            pressedCls: 'icon-button-Cancel-pressed',
            focusCls: 'icon-button-Cancel-focus',
            disabledCls: 'icon-button-Cancel-disable',
            text: '<span class="SpanTextView">' + stringSetting.protocol_position.button.undo_change + '<span>',
            disabled: false,
            hidden:!me.canSave,
            handler: function () {
                //unlock
                PM.data.Connection.requestSend({
                    method: "GET",
                    url: PROCESS_PATH_GLOBAL_ACTION + 'unlockProtocolPoolAction.action',
                    timeout: 30000,
                    params: {
                        user_name: cacheLocalStorage.get(userInfo.UserName),
                        scanner_group : me.groupName
                    },
                    loadData: function (responseObj, success) {
                        if (responseObj && responseObj.result !== '-1') {
                            lockStartTime = 0;
                            me.canSave = false;
                            me.examPlanChangeList = [];
                            me.currentSelected = null
                            me.changeButtonStatus();
                            me.loadData();
                        } else {
                            me.showMessage45();
                        }
                    }
                });
            }
        });

        me.panelButtons = Ext.create('Ext.panel.Panel', {
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'button-Color-NoborderPadding',
            region      : 'south',
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
            items:[me.btnMakeChange,
                me.btnActiveChange,
                me.btnUndoChange]
        });

        return me.panelButtons;
    },

    showMessage45:function(){
        var errormessage = Ext.clone(stringSetting.error.ERR0045);

        var _message = Ext.create('PM.view.common.window.Message', {
            errorDetail: errormessage
        });
        _message.showWin();
    },

    changeButtonStatus:function() {
        var me = this;
        if (me.canSave) {
            lockStartTime = (new Date()).getTime();
            //setInterval(this.timeoutTask,3000);
            me.btnMakeChange.hide();
            me.btnActiveChange.show();
            me.btnUndoChange.show();
        } else {
            lockStartTime = 0;
            //clearInterval(this.timeoutTask);
            me.btnMakeChange.show();
            me.btnActiveChange.setDisabled(true);
            me.btnActiveChange.hide();
            me.btnUndoChange.hide();
        }
        me.updateTask();
    },

    saveChange:function(){
        var me = this;
        var examlist = [];
        if(me.examPlanChangeList.length > 0){
            for(var i=0;i<me.examPlanChangeList.length;i++){
                var isExist = false;
                for(var j=0;j<examlist.length;j++){
                    if(examlist[j].key === me.examPlanChangeList[i].key){
                        examlist[j] = me.examPlanChangeList[i];
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    examlist.push(me.examPlanChangeList[i]);
                }
            }
        } else {
            return;
        }

        for(var i=examlist.length-1;i>=0;i--){
            if(examlist[i].epno === examlist[i].oldepno){
                examlist.splice(i,1);
            }
        }

        if(examlist.length > 0) {
            var result = {
                'scanner_group': me.groupName,
                'save': 'true',
                'ep_number_list': JSON.stringify(examlist)
            }

            var win = Ext.create('PM.view.progressview.ChangePositionProgressView', {
                parentPanel: me,
                param:result
            });
            win.show();
/*
            var resultstore = new Ext.data.Store({
                proxy: new Ext.data.proxy.Ajax({
                    url: PROCESS_PATH_GLOBAL_ACTION + 'changeMasterListEPNumber.action',
                    reader: {
                        type: 'json',
                        totalProperty: 'total'
                    },
                    timeout: 600000,
                    getMethod: function () {
                        return 'POST';
                    }
                }),
                model: 'PM.model.MasterEvent'
            });
            resultstore.on("load", function () {
                if (resultstore.getAt(0).get("result") != '0') {
                    var errorList = [];
                    var resultErrorList = [];
                    if (resultstore.getAt(0).get("epnumberlist") && resultstore.getAt(0).get("epnumberlist").length > 0) {
                        resultErrorList = resultstore.getAt(0).get("epnumberlist");
                        for (var i = 0; i < resultErrorList.length; i++) {
                            errorList.push(resultErrorList[i].protocolname + '(' + resultErrorList[i].epno + ')');
                        }
                    }
                    var errormessage = Ext.clone(stringSetting.error.ERR0042);
                    errormessage.details = errormessage.details.format(errorList.join('<br>'));
                    var _message = Ext.create('PM.view.common.window.Message', {
                        errorDetail: errormessage
                    });
                    _message.showWin();
                }
                me.canSave = false;
                me.changeButtonStatus();
                me.examPlanChangeList = [];
                me.loadData();

                *//*me.btnActiveChange.setDisabled(true);
                 me.hasSave = true;*//*

            });

            resultstore.load({
                params: result
            });*/
        }else{
            PM.data.Connection.requestSend({
                method: "GET",
                url: PROCESS_PATH_GLOBAL_ACTION + 'unlockProtocolPoolAction.action',
                timeout: 30000,
                params: {
                    user_name: cacheLocalStorage.get(userInfo.UserName),
                    scanner_group : me.groupName
                },
                loadData: function (responseObj, success) {
                    if (responseObj && responseObj.result !== '-1') {
                        lockStartTime = 0;
                        me.canSave = false;
                        me.examPlanChangeList = [];
                        me.currentSelected = null;
                        me.changeButtonStatus();
                        me.loadData();
                    } else {
                        me.showMessage45();
                    }
                }
            });
        }
    },

    finishSave:function(){
        var me = this;
        PM.data.Connection.requestSend({
            method: "GET",
            url: PROCESS_PATH_GLOBAL_ACTION + 'unlockProtocolPoolAction.action',
            timeout: 30000,
            params: {
                user_name: cacheLocalStorage.get(userInfo.UserName),
                scanner_group : me.groupName
            },
            loadData: function (responseObj, success) {
                if (responseObj && responseObj.result !== '-1') {
                    me.canSave = false;
                    me.currentSelected = null;
                    me.changeButtonStatus();
                    me.examPlanChangeList = [];
                    me.loadData();
                } else {
                    me.showMessage45();
                }
            }
        });

    },

    /*bindRefreshEvent : function()
    {
        var me = this;
        var btn = document.getElementsByClassName("icon-button-storerefresh-his");

        if (btn != null && btn.length > 0)
        {
            btn[0].onclick = function()
            {
                me.initializeData();
                me.initStore();
                me.loadData();
                me.changeButtonStatus();
                me.tabsImgPanel.show();
                me.frameContent.show();
            };
        }
    },*/
    reloadData : function()
    {
        var me = this;
        if(lockStartTime > 0){
            PM.data.Connection.requestSend({
                method: "GET",
                url: PROCESS_PATH_GLOBAL_ACTION + 'unlockProtocolPoolAction.action',
                timeout: 30000,
                params: {
                    user_name: cacheLocalStorage.get(userInfo.UserName),
                    scanner_group : me.preGroupName
                },
                loadData: function (responseObj, success) {
                    if (responseObj && responseObj.result !== '-1') {
                        lockStartTime = 0;
                        me.loadData();
                        me.changeButtonStatus();
                        me.tabsImgPanel.show();
                        me.frameContent.show();
                    } else {
                        me.showMessage45();
                    }
                }
            });
        }else {
            //me.initializeData();
            //me.initStore();
            me.scannerGroupStore.load();
           /* me.loadData();
            me.changeButtonStatus();
            me.tabsImgPanel.show();
            me.frameContent.show();*/
        }
    },

    initStore: function () {
        var me = this;
        me.examPlanChangeListStore = new Ext.data.Store({
            proxy: new Ext.data.proxy.Ajax({
                url: PROCESS_PATH_GLOBAL_ACTION + 'getExistedEPNumbers.action',
                reader: {
                    type: 'json',
                    totalProperty: 'total'
                },
                getMethod: function () {
                    return 'POST';
                }
            }),
            model: 'PM.model.EPnumberData'
        });

        me.examPlanChangeListStore.on("load", function () {
            if(me.examPlanChangeListStore.getCount() > 0) {
                me.examPlanList = me.examPlanChangeListStore.getAt(0).data.epnumberlist;
                for(var i=0;i<me.examPlanList.length;i++){
                    me.examPlanList[i].oldepno = me.examPlanList[i].epno;
                }
            }else{
                me.examPlanList = [];
            }
            me.clearOriginEPNum();
            me.clearTabSelected(me.radioFlag);
            me.panelUpdate();
            me.clearTabBodySelected();
            Ext.getBody().unmask();
            clearMask();
        });

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

        me.scannerGroupStore.on("load", function() {
            if(me.scannerGroupStore.data.items && me.scannerGroupStore.data.items.length > 0) {
                me.updateScannerCombobox();
                me.loadData();
                me.changeButtonStatus();
                me.tabsImgPanel.show();
                me.frameContent.show()
            }
        });
    },

    updateScannerCombobox:function()
    {
        var me = this;
        var dv = me.getDefaultValue();
        me.scannerCombobox.removeAllItems();
        me.scannerCombobox.createMenu(me.settingNameList,
            me.scannerItemClickFn,
            me);
        me.scannerCombobox.setSelectValue(dv);
    },

    formatJson: function (Array) {
        var result = "[";
        for (var i = 0; i < Array.length; i++) {
            result += "\"" + Array[i].key + "\"";
            if (i != Array.length - 1) {
                result += ",";
            }
        }
        result += "]";
        return result;
    },

    setDefaultEpNum: function () {
        var me = this;
        me.selectNewNum = me.addNewEPnumArray[0].epno;
        me.selectNumKey = me.addNewEPnumArray[0].key;
        me.organName = me.addNewEPnumArray[0].organ;
        var ptype = me.addNewEPnumArray[0].patienttype;
        switch (ptype) {
            case 'Adult':
                me.patientTypeNum = 1;
                break;
            case 'Child':
                me.patientTypeNum = 2;
                break;
            default:
                me.patientTypeNum = 3;
                break;
        }
    },
    clearOriginEPNum: function () {
        var me = this;
        me.btnActiveChange.setDisabled(true);
    },

    createframeContent: function (flag) {
        var me = this;
        var tableArray = new Array();
        var trValue = document.getElementsByClassName("selected");

        tableArray.push('<table><tbody><tr><td  data-name="PicPanel" style="position:relative;">');
        if (flag == 0) {
            if (trValue.length == 0) {
                tableArray.push(me.updateAdultView(me.adultOrganImages));
            }
            for (var i = 0; i < trValue.length; i++) {
                var selectIndex = trValue[i].getAttribute('index');
                if (selectIndex <= 3) {
                    if (selectIndex == 1) {
                        tableArray.push(me.updateAdultView(me.adultOrganImages, flag));
                        tableArray.push(me.adultMouseOverStyle());
                    }
                    if (selectIndex == 2) {
                        tableArray.push(me.updateChildView(me.childOrganImages));
                        tableArray.push(me.childMouseOverStyle());
                    }
                    if (selectIndex == 3) {
                        tableArray.push(me.updateAdultView(me.adultOrganImages, flag));
                        tableArray.push(me.adultMouseOverStyle());
                    }
                }
            }
        }
        if (flag == 1) {
            for (var i = 0; i < trValue.length; i++) {
                var selectIndex = trValue[i].getAttribute('index');
                if (selectIndex <= 3) {
                    tableArray.push(me.updateAdultView(me.adultOrganImages, flag));
                }
            }
        }
        tableArray.push('</td></tr></tbody></table>');
        return tableArray.join('');
    },
    createHeaderSouthHtml: function () {
        var me = this;
        var tableArray = new Array();
        tableArray.push('<table>');
        tableArray.push('<tr class="radioSelected" height="40px">');
        tableArray.push('<td value="0" class="radioClickable">');
        tableArray.push('<img class="settingTable-icon" src=');
        if (this.radioFlag == 0) {
            tableArray.push(CheckedImg.checkedImg);
        } else {
            tableArray.push(CheckedImg.uncheckedImg);
        }
        tableArray.push(' > ');
        tableArray.push('<span  style="font-size:14pt">' + stringSetting.protocol_position.button.UserProtocol + '</span>');
        tableArray.push('</td>');

        tableArray.push('<td value="1" class="radioClickable">');
        tableArray.push('<img  class="settingTable-icon" src=');
        if (this.radioFlag != 0) {
            tableArray.push(CheckedImg.checkedImg);
        } else {
            tableArray.push(CheckedImg.uncheckedImg);
        }
        tableArray.push(' > ');
        tableArray.push('<span  style="font-size:14pt">' + stringSetting.protocol_position.button.ServiceProtocol + '</span>');
        tableArray.push('</td>');

        tableArray.push('<td style="border:0px;">');
        if(me.currentSelected !== null && me.currentSelected !== undefined){
            tableArray.push('<span class="display-selected" style="margin-left:120px;width:600px;display:inline-block">' + stringSetting.protocol_position.label.title_protocol_selected + ' :  ' + me.currentSelected.protocolname +'</span>');
        }else {
            tableArray.push('<span class="display-selected" style="margin-left:120px;width:600px;display:inline-block"></span>');
        }
        tableArray.push('</td>');
        tableArray.push('</tr>');
        tableArray.push('</table>');

        return tableArray.join('');
    },
    createEastTablePanel: function () {
        var tableArray = new Array();
        var trValue = document.getElementsByClassName("selected");
        tableArray.push('<table class="tabPanel-body" style="background-color:#EDF0F7;border-collapse:separate;border-spacing:15px 23px"><tbody>');
        if (trValue.length == 0) {
            this.innerTabNum(0, 0, tableArray).zero2eleven();
        }
        var listOriginNum = 0;
        if (this.organName == null) {
            var OrganIndex = this.getPicIndexByOrgan('Head');
            listOriginNum = this.PatientTypeScope.TraumaOrganListNum[OrganIndex];
        }
        for (var i = 0; i < trValue.length; i++) {
            var selectIndex = trValue[i].getAttribute('index');
            if (this.organName == null) {
                if (selectIndex == 2) {
                    listOriginNum = this.PatientTypeScope.ChildOrganListNum[0];
                }
                if (selectIndex == 3) {
                    listOriginNum = this.PatientTypeScope.TraumaOrganListNum[0];
                }
            }
            if (selectIndex == 1 && this.organName != null) {
                if (this.radioFlag == 0) {
                    var OrganIndex = this.getPicIndexByOrgan(this.organName);
                    listOriginNum = this.PatientTypeScope.AdultOrganListNum[OrganIndex];
                } else {
                    listOriginNum = 1632;
                }
            }
            if (selectIndex == 2 && this.organName != null) {
                var OrganIndex = this.getPicIndexByOrgan(this.organName);
                listOriginNum = this.PatientTypeScope.ChildOrganListNum[OrganIndex];
            }
            if (selectIndex == 3 && this.organName != null) {
                var OrganIndex = this.getPicIndexByOrgan(this.organName);
                listOriginNum = this.PatientTypeScope.TraumaOrganListNum[OrganIndex];
            }
            switch (true) {
                case selectIndex == 4:
                    this.innerTabNum(0, listOriginNum, tableArray).zero2eleven();
                    break;
                case selectIndex == 5:
                    this.innerTabNum(12, listOriginNum, tableArray).aftertwelve();
                    break;
                case selectIndex == 6:
                    this.innerTabNum(24, listOriginNum, tableArray).aftertwelve();
                    break;
            }
        }
        tableArray.push('</tbody></table>');
        var task = new Ext.util.DelayedTask(function () {
            var tabArr = document.getElementsByClassName("tabPanel-body");
            if (tabArr) {
                if (tabArr.length < 1) {
                    return;
                }
                var tdArr = tabArr[0].getElementsByTagName("div");

                if (tdArr && tdArr.length > 0) {
                    for (var i = 0; i < tdArr.length; i++) {
                        if (tdArr[i] && !Ext.isEmpty(tdArr[i].innerText) && !Ext.isEmpty(tdArr[i].innerText.trim()) && tdArr[i].innerText.length > 8) {
                            var text = tdArr[i].innerText;
                            var w = 0;
                            for (var s in text) {
                                if (text[s] === ' ') {
                                    w = w + 5;
                                }
                            }
                            var textWidth = Ext.util.TextMetrics.measure(tdArr[i], text.replace(/ /g, '')).width + w;

                            if (tdArr[i].clientWidth - 4 < textWidth && textWidth > 50) {
                                tdArr[i].setAttribute("data-qtip", text);
                            } else {
                                if (tdArr[i].hasAttribute("data-qtip")) {
                                    tdArr[i].removeAttribute("data-qtip");
                                }
                            }
                        }
                    }
                }
            }
        });

        task.delay(1000);
        return tableArray.join('');
    },
    innerTabNum: function (num, listOriginNum, tableArray) {
        var me = this;
        return {
            zero2eleven: function () {
                for (var i = num; i < num + 6; i++) {
                    var data = (listOriginNum + i).toString();
                    if ((listOriginNum + i) < 100) {
                        if (data.length == 1) {
                            data = '00' + data;
                        }
                        if (data.length == 2) {
                            data = '0' + data;
                        }
                    }
                    var protocolname = '';
                    var key = '';
                    var ishistory = 'false';
                    var status = '';
                    var machinenamelist=[];
                    for(var j= 0,len = me.examPlanList.length;j<len;j++){
                        if(data === me.examPlanList[j].epno){
                            protocolname = me.examPlanList[j].protocolname;
                            key = me.examPlanList[j].key;
                            ishistory = me.examPlanList[j].ishistory;
                            status = me.examPlanList[j].status;
                            machinenamelist = me.examPlanList[j].machinenamelist;
                            break;
                        }
                    }

                    tableArray.push('<tr><td epno="'+data+'" key="'+key+'" ishistory="'+ishistory+'">');

                    if(key !== '') {
                        tableArray.push('<div style = "position:relative;width:30px;height:28px;float:left;z-index:100;text-align: center;" '+me.getStatusTip(status)+'>'+me.getIcon(status)+'</div>');
                        tableArray.push('<div style = "width:70%;">'+protocolname + '</div>');
                        tableArray.push('<div style = "position:relative;width:80px;height:28px;float:right;z-index:100;text-align: end;padding-right:3px;">(' + data + ')'+me.getDestributeIcon(machinenamelist)+'</div>');
                    }else{
                        tableArray.push('<div style = "width:100%;">'+data + '</div>');
                    }

                    var data1 = (listOriginNum + i + 6).toString();
                    if ((listOriginNum + i + 6) < 100) {
                        if (data1.length == 1) {
                            data1 = '00' + data1;
                        }
                        if (data1.length == 2) {
                            data1 = '0' + data1;
                        }
                    }
                    protocolname = '';
                    key = '';
                    status = '';
                    ishistory = 'false';
                    machinenamelist=[];
                    for(var j= 0,len = me.examPlanList.length;j<len;j++){
                        if(data1 === me.examPlanList[j].epno){
                            protocolname = me.examPlanList[j].protocolname;
                            key = me.examPlanList[j].key;
                            ishistory = me.examPlanList[j].ishistory;
                            status = me.examPlanList[j].status;
                            machinenamelist = me.examPlanList[j].machinenamelist;
                            break;
                        }
                    }
                    if(key !== '') {
                        tableArray.push('</td><td epno="'+data1+'" key="'+key+'" ishistory="'+ishistory+'">');
                        tableArray.push('<div  '+me.getStatusTip(status)+' style = "position:relative;width:30px;height:28px;float:left;z-index:100;text-align: center;">'+me.getIcon(status)+'</div>');
                        tableArray.push('<div style = "width:70%;">'+protocolname + '</div>');
                        tableArray.push('<div style = "position:relative;width:80px;height:28px;float:right;z-index:100;margin-top:0px;margin-left:0px;text-align: end;padding-right:3px;">(' + data1 + ')'+me.getDestributeIcon(machinenamelist)+'</div>');
                    }else{
                        tableArray.push('</td><td epno=' + data1 + ' key=' + key + '>');
                        tableArray.push('<div style = "width:100%;">'+data1 + '</div>');
                    }
                    tableArray.push('</td></tr>');
                }
            },
            aftertwelve: function () {
                for (var i = num; i < num + 6; i++) {
                    var data = (listOriginNum + i).toString();
                    if ((listOriginNum + i) < 100) {
                        data = '0' + data;
                    }
                    var protocolname = '';
                    var key = '';
                    var status = '';
                    var ishistory = 'false';
                    var machinenamelist=[];
                    for(var j= 0,len = me.examPlanList.length;j<len;j++){
                        if(data === me.examPlanList[j].epno){
                            protocolname = me.examPlanList[j].protocolname;
                            key = me.examPlanList[j].key;
                            ishistory = me.examPlanList[j].ishistory;
                            status = me.examPlanList[j].status;
                            machinenamelist = me.examPlanList[j].machinenamelist;
                            break;
                        }
                    }
                    tableArray.push('<tr><td epno="'+data+'" key="'+key+'" ishistory="'+ishistory+'">');
                    if(key !== '') {
                        tableArray.push('<div  '+me.getStatusTip(status)+' style = "position:relative;width:30px;height:28px;float:left;z-index:100;text-align: center;">'+me.getIcon(status)+'</div>');
                        tableArray.push('<div style = "width:70%;">'+protocolname + '</div>');
                        tableArray.push('<div style = "position:relative;width:80px;height:28px;float:right;z-index:100;margin-top:0px;margin-left:0px;text-align: end;padding-right:3px;">(' + data + ')'+me.getDestributeIcon(machinenamelist)+'</div>');
                    }else{
                        tableArray.push('<div style = "width:100%;">'+data + '</div>');
                    }
                    var data1 = (listOriginNum + i + 6).toString();
                    if ((listOriginNum + i + 6) < 100) {
                        data1 = '0' + data1;
                    }
                    protocolname = '';
                    key = '';
                    status = '';
                    ishistory = 'false';
                    machinenamelist=[];
                    for(var j= 0,len = me.examPlanList.length;j<len;j++){
                        if(data1 === me.examPlanList[j].epno){
                            protocolname = me.examPlanList[j].protocolname;
                            key = me.examPlanList[j].key;
                            ishistory = me.examPlanList[j].ishistory;
                            status = me.examPlanList[j].status;
                            machinenamelist = me.examPlanList[j].machinenamelist;
                            break;
                        }
                    }
                    if(key !== '') {
                        tableArray.push('</td><td epno="'+data1+'" key="'+key+'" ishistory="'+ishistory+'">');
                        tableArray.push('<div  '+me.getStatusTip(status)+' style = "position:relative;width:30px;height:28px;float:left;z-index:100;text-align: center;">'+me.getIcon(status)+'</div>');
                        tableArray.push('<div style = "width:70%;">'+protocolname + '</div>');
                        tableArray.push('<div style = "position:relative;width:80px;height:28px;float:right;z-index:100;margin-top:0px;margin-left:0px;text-align: end;padding-right:3px;">(' + data1 + ')'+me.getDestributeIcon(machinenamelist)+'</div>');
                    }else{
                        tableArray.push('</td><td  epno="'+data1+'" key="'+key+'" ishistory="'+ishistory+'">');
                        tableArray.push('<div style = "width:100%;">'+data1 + '</div>');
                    }
                    tableArray.push('</td></tr>');
                }
            }
        }
    },

    getDestributeIcon:function(machinenamelist) {
        if (machinenamelist && machinenamelist.length > 0) {
            var type = 2;
            var count = 0;
            var total = 0;
            var destributeIcon = '';

            for (var i = 0; i < machinenamelist.length; i++) {
                if (machinenamelist[i].machinename === '2') {
                    continue;
                } else if (machinenamelist[i].machinename === '1') {
                    if (type === 2) {
                        type = 1;
                    }
                    count++;
                    total++;
                } else if (machinenamelist[i].machinename === '0') {
                    type = 0;
                    total++;
                }
                if(machinenamelist[i].machinename === '0'){
                    type = 0;
                    break;
                }
            }
            if (type == 0) {
                destributeIcon = '<img data-qtip="'+stringSetting.protocol_position.tips.not_distributed+'" src='+ ProtocolShared.IN_DELIVERY + ' style="width:22px;margin-bottom: -4px;"/>';
            }
            if (type == 1) {
                //destributeIcon = '<img src='+ ProtocolShared.DELIVERIED +' style="width:22px;margin-bottom: -4px;"/>';
            }
            /*if (type == 2 || type == -1) {
                shareHtml = ProtocolShared.NOT_TO_DELIVERY;
            }*/
            if(destributeIcon === ''){
                destributeIcon = '<div style="width:30px;" ></div>';
            }
            return destributeIcon;
        } else {
            return '<div style="width:30px;" ></div>';
        }
    },

    getStatusTip : function(status, isTransfer)
    {
        var _array = new Array();
        _array.push(' data-qtip="');

        if (ProtocolStatus.approvalRequested == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.ApprovalRequested);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.ApprovalRequestedValue);
        } else if (ProtocolStatus.deletionRequested == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionRequested);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionRequestedValue);
        } else if (ProtocolStatus.approvalAccepted == status) {
            if(isTransfer)
            {
                _array.push("<strong>");
                _array.push(stringSetting.status_tip.Transferred);
                _array.push("</strong>");
                _array.push("<Br>");
                _array.push(stringSetting.status_tip.TransferredValue);
            }
            else
            {
                _array.push("<strong>");
                _array.push(stringSetting.status_tip.ApprovalAccepted);
                _array.push("</strong>");
                _array.push("<Br>");
                _array.push(stringSetting.status_tip.ApprovalAcceptedValue);
            }
        } else if (ProtocolStatus.localUseAccepted == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.LocalUseAccepted);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.LocalUseAcceptedValue);
        } else if (ProtocolStatus.approvalRejected == status)
        {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.ApprovalRejected);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.ApprovalRejectedValue);
        } else if (ProtocolStatus.deletionRejected == status)
        {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionRejected);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionRejectedValue);
        } else if (ProtocolStatus.deletionAccepted == status) {
            _array.push("<strong>");
            _array.push(stringSetting.status_tip.DeletionAccepted);
            _array.push("</strong>");
            _array.push("<Br>");
            _array.push(stringSetting.status_tip.DeletionAcceptedValue);
        }
        _array.push('" ');
        return _array.join('');
    },

    getIcon:function(type){
        switch (type){
            case ProtocolStatus.approvalRequested:
                return '<img src='+ProtocolStatusSrc.approvalRequested+' height="22px">';
                break;
            case ProtocolStatus.approvalAccepted:
                return '<img src='+ProtocolStatusSrc.approvalAccepted+' height="22px">';
                break;
            case ProtocolStatus.localUseAccepted:
                return '<img src='+ProtocolStatusSrc.localUseAccepted+' height="22px">';
                break;
            case ProtocolStatus.deletionRequested:
                return '<img src='+ProtocolStatusSrc.deletionRequested+' height="22px">';
                break;
            default :
                return '';
                break;

        }
    },

    createPanelTab: function (flag) {
        var tableArray = new Array();

        tableArray.push('<table class="tabPanel-header"><tr>');
        if (flag) {
            tableArray.push('<td index="1" type="Adult" class="selected">' + stringSetting.protocol_position.tab.Adult + '</td>');
            tableArray.push('<td index="2" type="Child" class="no-selected">' + stringSetting.protocol_position.tab.Child + '</td>');
            tableArray.push('<td index="3" type="Trauma" class="no-selected">' + stringSetting.protocol_position.tab.Trauma + '</td>');
        } else {
            tableArray.push('<td index="4" class="selected">' + stringSetting.protocol_position.tab.GroupA + '</td>');
            tableArray.push('<td index="5" class="no-selected">' + stringSetting.protocol_position.tab.GroupB + '</td>');
            tableArray.push('<td index="6" class="no-selected">' + stringSetting.protocol_position.tab.GroupC + '</td>');
        }
        tableArray.push('</tr></table>');
        return tableArray.join('');
    },

    panelUpdate: function () {
        var me = this;

        me.headerSouthPanel.update({
            html: me.createHeaderSouthHtml()
        });

        me.frameContent.update({
            style: 'border:1px solid #99bce8;background:edf0f7;',
            html: me.createframeContent(me.radioFlag),

        });

        me.frameEastContent.update({
            html: me.createEastTablePanel()
        });

    },

    clearTabSelected: function (flag) {
        var me = this;
        var tabArr = document.getElementsByClassName("tabPanel-header");
        for (var j = 0; j < tabArr.length; j++) {
            var tdArr = tabArr[j].getElementsByTagName("td");
            if (flag == 0 && tdArr != null) {
                for (var i = 0; i < tdArr.length; i++) {

                    if (tdArr[i].getAttribute("index") == me.patientTypeNum || tdArr[i].getAttribute("index") == me.EPListNum) {
                        tdArr[i].className = "selected";
                    } else {
                        tdArr[i].className = "no-selected";
                    }
                }
            }
            if (flag == 1 && tdArr != null) {
                for (var i = 0; i < tdArr.length; i++) {
                    if (tdArr[i].getAttribute("index") == me.patientTypeNum || tdArr[i].getAttribute("index") == me.EPListNum) {
                        tdArr[i].className = "selected";
                    } else {
                        tdArr[i].className = "no-selected";
                    }

                    if (tdArr[i].getAttribute("index") == 2 || tdArr[i].getAttribute("index") == 3) {
                        tdArr[i].className = "forbid";
                    }
                }
            }
        }
    },

    clearTabBodySelected: function () {
        var me = this;
        var tabArr = document.getElementsByClassName("tabPanel-body");

        if (tabArr.length < 1) {
            return;
        }
        var tdArr = tabArr[0].getElementsByTagName("td");

        if (me.currentSelected == null) {
            for (var i = 0; i < tdArr.length; i++) {
                //tdArr[i].className = "forbid";
                var key = tdArr[i].getAttribute("key");
                var ishistory = tdArr[i].getAttribute("ishistory");
                if (key === '' || ishistory === 'true') {
                    tdArr[i].className = "no-selectedTd";
                }
            }
            Ext.fly(me.headerSouthPanel.id).down('span[class=display-selected]').dom.innerText = '';
        } else {
            for (var i = 0; i < tdArr.length; i++) {
                if (tdArr[i].className != "childTdTr") {
                    //var tdEl = me.unshiftText(tdArr[i].innerText);
                    if (me.currentSelected.epno == tdArr[i].getAttribute("epno")) {
                        tdArr[i].className = "selectedTd add-highlight";
                        Ext.fly(me.headerSouthPanel.id).down('span[class=display-selected]').dom.innerText = stringSetting.protocol_position.label.title_protocol_selected + ' :  '+ tdArr[i].innerText;
                    } else {
                        var key = tdArr[i].getAttribute("key");
                        var ishistory = tdArr[i].getAttribute("ishistory");
                        if (key === '' || ishistory === 'true') {
                            tdArr[i].className = "no-selectedTd";
                        }
                    }
                }
            }
        }
        if (me.examPlanChangeList.length > 0) {
            me.btnActiveChange.setDisabled(false);
        } else {
            me.btnActiveChange.setDisabled(true);
        }
    },
    addSelectedStyle: function (elem) {
        /*elem.style.backgroundColor = 'deepskyblue';
        var tds = elem.getElementsByTagName("td");
        for (var z = 0, len = tds.length; z < len; z++) {
            tds[z].style.backgroundColor = 'deepskyblue';
            tds[z].style.color = 'white';
        }*/
    },
    unshiftText: function (str) {
        if (str.length > 4) {
            return str.substring(str.lastIndexOf("(") + 1, str.lastIndexOf(")"));
        } else {
            return str;
        }
    },
    shiftText: function (text1, text2, key) {
        var styleStr = ' style="width:90%;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;" ';
        text1 = text1.replace('"', '&quot');
        var qtip = ' data-qtip="' + text1 + '" ';
        return {
            listEPNum: '<table width="100%" class="table_in" key = "' + key + '"><tbody>'
            + '<tr  class="childTdTr"><td ' + qtip + styleStr
            + 'class="childTdTr">' + text1 + '</td><td class="childTdTr">(' + text2 + ')</td></tr>'
            + '</tbody></table>'
        };
    },

    arraySplice: function (key, array) {
        var index;
        for (var i = 0, data; data = array[i]; i++) {
            if (key === data.key) {
                index = i;
                break;
            }
        }
        if (typeof index == "number") {
            array.splice(index, 1);
        }
    },
    getPatientType:function(index) {
        if (index === 1) {
            return 'Adult';
        } else if (index === 2) {
            return 'Child';
        } else if (index === 3) {
            return 'Trauma';
        }
        return "";
    },

    timeoutTask:function() {
        var me = this;

        if (lockStartTime > 0) {
            if (((new Date()).getTime() - lockStartTime) > lockTotalTime) {
                var panels = Ext.ComponentQuery.query('windowexamplanpositionchangedialog');
                if (panels && panels.length > 0) {
                    Ext.TaskManager.stop(panels[0].taskObj);

                    PM.data.Connection.requestSend({
                        method: "GET",
                        url: PROCESS_PATH_GLOBAL_ACTION + 'unlockProtocolPoolAction.action',
                        timeout: 30000,
                        params: {
                            user_name: cacheLocalStorage.get(userInfo.UserName),
                            scanner_group : panels[0].groupName
                        },
                        loadData: function (responseObj, success) {
                            if (responseObj && responseObj.result !== '-1') {
                                lockStartTime = 0;
                                panels[0].initializeData();
                                panels[0].reloadData();
                            } else {
                               me.showMessage45();
                            }
                        }
                    });
                }
            }
        }
    },

    updateTask:function() {
        var me = this;
        if(!me.taskObj) {
            me.taskObj = {
                run: me.timeoutTask,
                interval: 5000
            }
        }
        if(me.canSave) {
            Ext.TaskManager.start(me.taskObj);
        }else{
            Ext.TaskManager.stop(me.taskObj);
        }
    },

    onClick: function (e) {
        var me = this;
        if(lockStartTime > 0) {
            lockStartTime = (new Date()).getTime();
        }
        var targetEl = e.target;
        if (targetEl == null) {
            return null;
        }
        var inputEl = e.target.parentElement.className.indexOf("radioClickable") > -1 ? e.target.parentElement : null;

        var tdElTabHead = me.getTdEl(e.target, "tabPanel-header");
        if (tdElTabHead != null) {
            if (me.patientTypeNum == tdElTabHead.getAttribute("index") || me.EPListNum == tdElTabHead.getAttribute("index") || tdElTabHead.getAttribute("index") == null) {
                return;
            }

            if (tdElTabHead.getAttribute("index") <= 3) {
                if (me.radioFlag == 1 && (tdElTabHead.getAttribute("index") == 2 || tdElTabHead.getAttribute("index") == 3)) {
                    me.patientTypeNum = 1;
                } else {
                    me.patientTypeNum = tdElTabHead.getAttribute("index");


                    me.clearTabSelected(me.radioFlag);
                    me.frameContent.update({
                        style: 'border:1px solid #99bce8;background:edf0f7;',
                        html: me.createframeContent(me.radioFlag),

                    });
                    me.updateFrameEastContent();
                }
            } else {
                me.EPListNum = tdElTabHead.getAttribute("index");

                me.clearTabSelected(me.radioFlag);
                me.frameContent.update({
                    style: 'border:1px solid #99bce8;background:edf0f7;',
                    html: me.createframeContent(me.radioFlag),

                });
                me.updateFrameEastContent();
            }
        }
        var tdElTabBody = me.getTdEl(e.target, "tabPanel-body");
        if (tdElTabBody != null && (!me.getTdEl(e.target, "forbid") || me.getTdEl(e.target, "add-highlight"))) {
            if(me.canSave) {
                var targetTd = e.target.tagName === 'DIV' ? e.target.parentNode : e.target;
                var key = targetTd.getAttribute('key');
                var epno = targetTd.getAttribute('epno');
                var ishistory = targetTd.getAttribute('ishistory');
                var epname = targetTd.innerText;

                if (ishistory !== 'true' && (key !== null && key !== '')) {
                    return;
                }
                if (key === null || key === '') {
                    if (me.currentSelected == null) {
                        return;
                    } else {
                        if (epno === me.currentSelected.epno) {
                            me.currentSelected = null;
                        } else {
                            //move ep to this position
                            for (var i = 0, len = me.examPlanList.length; i < len; i++) {
                                if (me.examPlanList[i].epno === me.currentSelected.epno) {
                                    me.examPlanList[i].epno = epno;
                                    var exam = {
                                        'oldepno': me.examPlanList[i].oldepno,
                                        'epno': epno, 'key': me.examPlanList[i].key,
                                        'patienttype': me.getPatientType(me.patientTypeNum),
                                        'organ': me.organName

                                    };
                                    //me.patientTypeNum
                                    //me.organName
                                    me.examPlanChangeList.push(exam);
                                    me.currentSelected.epno = epno;
                                    break;
                                }
                            }
                            me.currentSelected = null;
                        }
                    }
                } else if (me.currentSelected == null) {
                    me.currentSelected = {'key': key, 'epno': epno, protocolname: epname};
                } else {
                    if (epno === me.currentSelected.epno) {
                        me.currentSelected = null;
                    } else {
                        var labelText1Height = 70;
                        if(memoryLanguage == Language.JP){
                            labelText1Height = 30;
                        }
                        var _message = Ext.create('PM.view.common.window.ConfirmMessage', {
                            labelText1: stringSetting.protocol_position.message.move_down_position,
                            labelText2: stringSetting.protocol_position.message.confirmview_text2,
                            width: 600,
                            labelText1Height: labelText1Height,
                            okEvent: function (result) {
                                var ismove = me.moveProtocolList(me.currentSelected.epno, epno);
                                if (ismove) {
                                    me.currentSelected = null;//{'key': key, 'epno': epno,protocolname:epname };
                                }
                                me.updateFrameEastContent();
                            }
                        });
                        _message.show();

                    }
                }
                me.updateFrameEastContent();
            }
        }

        if (inputEl != null) {

            me.radioFlag = inputEl.getAttribute("value");
            if (me.radioFlag == 1) {

                me.patientTypeNum = 1;

                var data = 0;
                if (me.selectNewNum == '' && me.selectNumKey != null) {
                    me.patientTypeNum = 1;
                    me.EPListNum = 4;
                }
                if (me.selectNewNum != '') {
                    var data = Number(me.selectNewNum);
                    me.patientTypeNum = 1;
                    me.EPListNum = 4;
                    if (data >= 1632) {
                        me.getTabNum(data);
                    }
                }
            } else {
                if (me.selectNewNum == '') {
                    me.patientTypeNum = 1;
                    me.EPListNum = 4;
                }
                if (me.selectNewNum != '') {
                    var data = Number(me.selectNewNum);

                    me.getTabNum(data);
                    if (data >= 1632) {
                        me.radioFlag = 0;
                        me.patientTypeNum = 1;
                        me.EPListNum = 4;
                    }
                }
            }
            me.updatePanel();
        }
        var targetParent = targetEl.parentElement;
        var name =  null;
        if (targetParent !== null){
            name = targetParent.getAttribute('data-name');
        }
        if (name === "PicPanel") {
            if (targetEl.style.cursor == '') {
                return;
            }

            var evt = window.event;
            var x = evt.clientX;

            var y = evt.clientY;

            var img = targetParent.firstChild;
            var imgX = img.getBoundingClientRect().left;
            var imgY = img.getBoundingClientRect().top;

            var relativeX = x - imgX;
            var relativeY = y - imgY;

            var trValue = document.getElementsByClassName("selected");
            var selectIndex = trValue[0].getAttribute('index');
            if(selectIndex == 1 || selectIndex == 3) {
                var locations = me.adultOrganLocations;
                var picLocation = [];
                for (var i = 0; i < locations.length; i++) {
                    picLocation = locations[i].split(',');
                    if (relativeX >= picLocation[0] && relativeX <= picLocation[2] && relativeY >= picLocation[1] && relativeY <= picLocation[3]) {
                        me.organSelectedIndex = i;
                    }
                }
                me.organName = me.organNewArray[me.organSelectedIndex];

                var picIndex = me.getPicIndexByOrgan(me.organName);
                var imgName = me.adultOrganImages[picIndex];
                targetParent.firstChild.src = adultImgFloder + imgName;
            } else if (selectIndex == 2) {
                var locations = me.childOrganLocations;
                var picLocation = [];
                for (var i = 0; i < locations.length; i++) {
                    picLocation = locations[i].split(',');
                    if (relativeX >= picLocation[0] && relativeX <= picLocation[2] && relativeY >= picLocation[1] && relativeY <= picLocation[3]) {
                        me.organSelectedIndex = i;
                    }
                }
                me.organName = me.organNewArray[me.organSelectedIndex];

                var picIndex = me.getPicIndexByOrgan(me.organName);
                var imgName = me.childOrganImages[picIndex];
                targetParent.firstChild.src = childImgFloder + imgName;
            }

            me.updateFrameEastContent();
        }
    },

    moveProtocolList:function(firstepno,secondepno) {
        var me = this;
        var ifirst = parseInt(firstepno);
        var isecond = parseInt(secondepno);
        var movedown = true;
        var interval = 1;
        if (ifirst > isecond) {
            return me.moveUpProtocolList(firstepno,secondepno);
        }

        if (parseInt(ifirst / 36) === parseInt(isecond / 36)) {
            interval = isecond - ifirst;
            var number = isecond % 36;
            var epNoList = [ifirst];
            var allowMove = false;
            for (var i = number; i < 36; i++) {
                var iepno = -1;
                var key = '';
                for (var j = 0; j < me.examPlanList.length; j++) {
                    if (parseInt(me.examPlanList[j].epno) === (isecond - number + i)) {
                        if(!me.examPlanList[j].ishistory){
                            var errormessage = Ext.clone(stringSetting.error.ERR0043);
                            var _message = Ext.create('PM.view.common.window.Message', {
                                width :600,
                                errorDetail: errormessage
                            });
                            _message.showWin();
                            return false;
                        }
                        iepno = isecond - number + i;
                        epNoList.push(iepno);
                        break;
                    }
                }

                if (iepno < 0) {
                    if(epNoList.length > 1) {
                        epNoList.reverse();
                        allowMove = true;
                        break;
                    }
                }
            }
            //epNoList.reverse();

            if(epNoList.length < 2 ){
                allowMove = false;
            }
            if (!allowMove) {
                var errormessage = Ext.clone(stringSetting.error.ERR0044);
                var _message = Ext.create('PM.view.common.window.Message', {
                    width :600,
                    errorDetail: errormessage
                });
                _message.showWin();
                return false;
            }
            for (var i = 0; i < epNoList.length; i++) {
                for (var j = 0; j < me.examPlanList.length; j++) {
                    if (parseInt(me.examPlanList[j].epno) === epNoList[i]) {
                        var epno = '';
                        var iepno = epNoList[i];
                        if(i === epNoList.length - 1){
                            iepno = iepno + interval;
                        } else {
                            iepno = epNoList[i] + 1;
                        }

                        if (iepno < 100) {
                            if (iepno < 10) {
                                epno = '00' + iepno;
                            } else {
                                epno = '0' + iepno;
                            }
                        }else{
                            epno = ""+iepno;
                        }
                        key = me.examPlanList[j].key;


                        me.examPlanList[j].epno = epno;

                        var exam = {
                            'oldepno': me.examPlanList[j].oldepno,
                            'epno': epno, 'key': key,
                            'patienttype': me.getPatientType(me.patientTypeNum),
                            'organ': me.organName
                        };

                        me.examPlanChangeList.push(exam);
                        break;
                    }
                }
            }

        } else {
            var errormessage = Ext.clone(stringSetting.error.ERR0044);
            var _message = Ext.create('PM.view.common.window.Message', {
                width :600,
                errorDetail: errormessage
            });
            _message.showWin();
            return false;
        }
        return true;
    },

    moveUpProtocolList:function(firstepno,secondepno) {
        var me = this;
        var ifirst = parseInt(firstepno);
        var isecond = parseInt(secondepno);
        var interval = 1;

        if (parseInt(ifirst / 36) === parseInt(isecond / 36)) {
            interval = ifirst - isecond;
            var number = isecond % 36;
            var end_number = ifirst % 36;
            var epNoList = [];
            var allowMove = false;
            for (var i = number; i < end_number; i++) {
                var iepno = -1;
                var key = '';
                for (var j = 0; j < me.examPlanList.length; j++) {
                    if (parseInt(me.examPlanList[j].epno) === (isecond - number + i)) {
                        if(!me.examPlanList[j].ishistory){
                            var errormessage = Ext.clone(stringSetting.error.ERR0043);
                            var _message = Ext.create('PM.view.common.window.Message', {
                                width :600,
                                errorDetail: errormessage
                            });
                            _message.showWin();
                            return false;
                        }
                        iepno = isecond - number + i;
                        epNoList.push(iepno);
                        break;
                    }
                }

                if (iepno < 0) {
                    if(epNoList.length > 0) {
                        //allowMove = true;
                        break;
                    }
                }
            }

            epNoList.push(ifirst);

            if(epNoList.length < 1 ){
                allowMove = false;
            }else if(parseInt(ifirst % 36) < 36){
                allowMove = true;
            }
            if (!allowMove) {
                var errormessage = Ext.clone(stringSetting.error.ERR0044);
                var _message = Ext.create('PM.view.common.window.Message', {
                    width :600,
                    errorDetail: errormessage
                });
                _message.showWin();
                return false;
            }
            epNoList.reverse();
            var temp_index = -1;
            var temp_epno = '';
            for (var i = 0; i < epNoList.length; i++) {
                for (var j = 0; j < me.examPlanList.length; j++) {
                    if (parseInt(me.examPlanList[j].epno) === epNoList[i]) {
                        var epno = '';
                        var iepno = epNoList[i];
                        if(i === 0){
                            iepno = iepno - interval;
                            temp_index = j;
                        } else {
                            iepno = epNoList[i] + 1;
                        }

                        if (iepno < 100) {
                            if (iepno < 10) {
                                epno = '00' + iepno;
                            } else {
                                epno = '0' + iepno;
                            }
                        }else{
                            epno = ""+iepno;
                        }
                        key = me.examPlanList[j].key;



                        var exam = {
                            'oldepno': me.examPlanList[j].oldepno,
                            'epno': epno, 'key': key,
                            'patienttype': me.getPatientType(me.patientTypeNum),
                            'organ': me.organName
                        };

                        me.examPlanChangeList.push(exam);
                        if(i === 0) {
                            temp_epno = epno;
                            me.examPlanList[j].epno = '-1';
                        }else{
                            me.examPlanList[j].epno = epno;
                        }
                        break;
                    }
                }
            }
            me.examPlanList[temp_index].epno = temp_epno;

        } else {
            var errormessage = Ext.clone(stringSetting.error.ERR0044);
            var _message = Ext.create('PM.view.common.window.Message', {
                width :600,
                errorDetail: errormessage
            });
            _message.showWin();
            return false;
        }
        return true;
    },

    getTabNum: function (data) {
        var me = this;
        switch (true) {
            case me.PatientTypeScope.isAdult(data):
                me.radioFlag = 0;
                me.patientTypeNum = 1;
                me.clearTabSelected(me.radioFlag);
                me.selectListNumTab(data, me.PatientTypeScope.AdultOrganListNum);
                break;
            case me.PatientTypeScope.isChild(data):
                me.radioFlag = 0;
                me.patientTypeNum = 2;
                me.selectListNumTab(data, me.PatientTypeScope.ChildOrganListNum);
                break;
            case me.PatientTypeScope.isTrauma(data):
                me.radioFlag = 0;
                me.patientTypeNum = 3;
                me.selectListNumTab(data, me.PatientTypeScope.TraumaOrganListNum);
                break;
            case data >= 1632:
                me.radioFlag = 1;
                me.patientTypeNum = 1;
                if (data >= 1632 && data < 1644) {
                    me.EPListNum = 4;
                }
                if (data >= 1644 && data < 1656) {
                    me.EPListNum = 5;
                }
                if (data >= 1656 && data < 1667) {
                    me.EPListNum = 6;
                }
                break;
        }
    },

    updatePanel: function () {
        var me = this;
        me.clearTabSelected(me.radioFlag);

        if (me.radioFlag == 1) {
            me.tabsImgPanel.hide();
            me.frameContent.hide();
        }
        else {
            me.tabsImgPanel.show();
            me.frameContent.show();
        }
        me.headerSouthPanel.update({
            html: me.createHeaderSouthHtml()
        });

        me.frameContent.update({
            style: 'border:1px solid #99bce8;background:edf0f7;',
            html: me.createframeContent(me.radioFlag),
        });

        me.frameEastContent.update({
            html: me.createEastTablePanel()
        });

        me.clearTabBodySelected();

    },
    updateFrameEastContent: function () {
        var me = this;
        me.frameEastContent.update({
            html: me.createEastTablePanel()
        });
        me.clearTabBodySelected();
    },
    adultMouseOverStyle: function () {
        var me = this;
        var img = document.getElementById('organImg');
        if (img == null) {
            return;
        }
        var locations = me.adultOrganLocations;
        var picLocation = [];
        var tableArray = [];
        for (var i = 0; i < locations.length; i++) {
            picLocation = locations[i].split(',');

            tableArray.push('<div style="background:rgba(0,0,0,0);background:#000\0;filter:alpha(opacity=0)\0;*background:#FFF;-moz-opacity:0;opacity: 0;cursor:pointer;position:absolute;z-index:2;width:' + (picLocation[2] - picLocation[0]) + 'px;');
            tableArray.push('height:' + (picLocation[3] - picLocation[1]) + 'px;left:' + (parseInt(picLocation[0]) + 1) + 'px;');
            tableArray.push('top:' + (parseInt(picLocation[1]) + 1) + 'px;">');
            tableArray.push('</div>');
        }
        return tableArray.join('');
    },
    childMouseOverStyle: function () {
        var me = this;
        var img = document.getElementById('organImg');
        if (img == null) {
            return;
        }
        var locations = me.childOrganLocations;
        var picLocation = [];
        var tableArray = [];
        for (var i = 0; i < locations.length; i++) {
            picLocation = locations[i].split(',');
            tableArray.push('<div style="background:rgba(0,0,0,0);background:#000\0;filter:alpha(opacity=0)\0;*background:#FFF;-moz-opacity:0;opacity: 0;cursor:pointer;position:absolute;z-index:2;width:' + (picLocation[2] - picLocation[0]) + 'px;');
            tableArray.push('height:' + (picLocation[3] - picLocation[1]) + 'px;left:' + (parseInt(picLocation[0]) + 1) + 'px;');
            tableArray.push('top:' + (parseInt(picLocation[1]) + 1) + 'px;">');
            tableArray.push('</div>');
        }
        return tableArray.join('');
    },
    getTdEl: function (el, className) {
        var targetEl = el;
        for (var i = 0; i < 6; i++) {
            if (targetEl == null || targetEl.parentElement === null || targetEl.parentElement.parentElement === null) {
                return null;
            }
            if (targetEl.parentElement.parentElement.parentElement == null) {
                return null;
            }
            if (targetEl.parentElement.parentElement.parentElement.className.indexOf(className) >= 0) {
                return targetEl;
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },
    updateAdultView: function (organImage, flag) {
        var picIndex = this.getPicIndexByOrgan(this.organName);
        var imgName = organImage[picIndex];
        if (flag == 1) {
            var imgStr = '<img  id="organImg" / >';
        } else {
            var imgStr = '<img  id="organImg" style="width:334px;z-index:-1;" src=' + adultImgFloder + imgName + '/ >';
        }

        return imgStr;
    },
    updateChildView: function (organImage) {
        var picIndex = this.getPicIndexByOrgan(this.organName);
        var imgName = organImage[picIndex];

        var imgStr = '<img  id="organImg" style="width:334px;" src=' + childImgFloder + imgName + '/ >';
        return imgStr;
    },
    updateTraumaView: function (organImage) {
        var picIndex = this.getPicIndexByOrgan(this.organName);
        var imgName = organImage[picIndex];

        var imgStr = '<img  id="organImg" src=' + adultImgFloder + imgName + '/ >';
        return imgStr;
    },
    getPicIndexByOrgan: function (organ) {
        var me = this;
        for (var i = 0; i < me.organNewArray.length; i++) {
            if (me.organNewArray[i] == organ) {
                return i;
            }
        }
        return 0;
    },
    resize: function () {
        var me = this;
        var viewHeight = document.documentElement.clientHeight - 194;
        var padding = (viewHeight - 575) / 2;
        if (padding < 0) {
            padding = 0;
        }
        me.el.dom.style.marginTop = padding + "px";
        me.el.dom.style.marginBottom = padding + "px";

        me.clearTabSelected(me.radioFlag);

        if (me.radioFlag == 1) {
            me.tabsImgPanel.hide();
            me.frameContent.hide();
        } else {
            me.tabsImgPanel.show();
            me.frameContent.show();
        }
        me.panelUpdate()

        me.clearTabBodySelected();
    },
    checkOrgan: function (patientTypeList, epno) {
        var me = this;
        for (var i = 0; i < patientTypeList.length - 1; i++) {
            if (epno >= patientTypeList[i] &&
                epno < patientTypeList[i + 1]) {
                return me.organNewArray[i];
            }
        }
        return me.organNewArray[patientTypeList.length - 1];
    },
    setPatientTypeOrgan: function (ep) {
        var me = this;

        var epno = Number(ep.epno);
        switch (true) {
            case me.PatientTypeScope.isAdult(epno):
                ep.changePatientType = "Adult";
                ep.changeOrgan = me.checkOrgan(me.PatientTypeScope.AdultOrganListNum, epno);
                break;
            case me.PatientTypeScope.isChild(epno):
                ep.changePatientType = "Child";
                ep.changeOrgan = me.checkOrgan(me.PatientTypeScope.ChildOrganListNum, epno);
                break;
            case me.PatientTypeScope.isTrauma(epno):
                ep.changePatientType = "Trauma_Adult";
                ep.changeOrgan = me.checkOrgan(me.PatientTypeScope.TraumaOrganListNum, epno);
                break;
            case epno >= 1632:
                ep.changePatientType = "Adult";
                ep.changeOrgan = "Chest To Pelvis";
                break;
        }
    },

    initializeData: function () {
        var me = this;
        me.addNewEPnumArray = [];
        me.examPlanChangeList = [];
        me.settingNameList = [];
        me.hasSave = false;
        me.examPlanList = [];
        me.canSave = false;

        me.patientTypeNum = 1;
        me.EPListNum = 4;
        me.selectNewNum = '';
        me.selectNumKey = null;
        me.patienttype = '';
        me.radioFlag = 0;
        me.organSelectedIndex = 0;
        me.protocolList = [];

        me.organName = 'Head';

        me.addNewEPnumArray = [];
        me.currentSelected = null;
        me.scannerIndex = 0;
        //me.examPlanChangeListStore = null;
        //lockStartTime = 0;
        //me.initStore();

        /*me.examPlanList = [
            {'epno': '000', 'protocolname': 'protocolname000', 'key': 'key000', ishistory: true, status: ProtocolStatus.approvalAccepted},
            {'epno': '001', 'protocolname': 'protocolname001', 'key': 'key001', ishistory: true, status: ProtocolStatus.approvalAccepted},
            {'epno': '002', 'protocolname': 'protocolname002', 'key': 'key002', ishistory: true, status: ProtocolStatus.localUseAccepted},
            {'epno': '003', 'protocolname': 'protocolname003', 'key': 'key003', ishistory: true, status: ProtocolStatus.localUseAccepted},
            {'epno': '004', 'protocolname': 'protocolname004', 'key': 'key004', ishistory: true, status: ProtocolStatus.localUseAccepted},
            {'epno': '005', 'protocolname': 'protocolname005', 'key': 'key005', ishistory: true, status: ProtocolStatus.localUseAccepted},
            {'epno': '006', 'protocolname': 'protocolname006', 'key': 'key006', ishistory: false, status: ProtocolStatus.deletionRequested},
            {'epno': '007', 'protocolname': 'protocolname007', 'key': 'key007', ishistory: false, status: ProtocolStatus.approvalRequested},
            {'epno': '012', 'protocolname': 'protocolname012', 'key': 'key012', ishistory: true, status: ProtocolStatus.approvalAccepted},
            {'epno': '048', 'protocolname': 'protocolname048', 'key': 'key048', ishistory: false, status: ProtocolStatus.deletionRequested},
            {'epno': '049', 'protocolname': 'protocolname049', 'key': 'key049', ishistory: false, status: ProtocolStatus.deletionRequested},
            {'epno': '066', 'protocolname': 'protocolname066', 'key': 'key066', ishistory: false, status: ProtocolStatus.deletionRequested}
        ];*/
    }
});
