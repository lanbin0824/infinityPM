/*
 * ! JS Console Compare
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.Setting.SettingView
 * @extends PM.view.panel.Click
 * @import SettingView.css
 */

Ext.define('PM.view.Setting.SettingView', {
    extend               : 'PM.view.panel.Click',
    cls                  : 'panelTabView',
    bodyCls              : 'grid-Color-NoborderPadding',
    width                : '100%',
    miniWidth            : 1024,
    modal                : true,
    westPanel            : null,
    centerPanel          : null,
    centerPanelTitle     : null,
    centerPanelList      : null,
    southPanel           : null,
    btnDelete            : null,
    btnEdit              : null,
    btnAdd               : null,
    btnAddFlag           : false,
    store                : null,
    storeURL             : PROCESS_PATH_GLOBAL_ACTION + 'getProtocolPoolSetting.action',
    storeData            : new Array(),
    deleteURL            : null,
    selectRowNum         : 0,
    selectListrRowNum    : -1,
    styleTip             : styleGridTipGlobal,
    layout:
    {
        type : 'border'
    },
	/* Initialization interface components used to construct the AppSettingView */
    initComponent : function() {
        var me = this;
        me.westPanel = Ext.create('Ext.panel.Panel', {
            region         : 'west',
            width          : 256,
            bodyStyle      : 'padding-right:0px;',
            bodyCls        : 'panel-body',
            border         : 0,
            items          : [{
                    bodyCls    : 'panelHeader-body',
                    region     : 'north',
                    height     : 35,
                    cls        : 'panel-NoborderPadding',
                    html       : '<div><span class="spanGridHeaderText">' + stringSetting.app_setting.title.setting + '</span></div>'
                        }, {
                            region    : 'center',
                            border    : 0,
                            html      : '<table class="Setting-Content-Table" id="id_table_setting_content">'
                                    + '<tr class="selected" index="0"><td>'+ stringSetting.app_setting.title.pool_setting+ '</td></tr>'
                                    + '<tr class="even" index="1"><td>'+ stringSetting.app_setting.title.console_setting+ '</td></tr>'
                                    + '<tr class="odd" index="2"><td>'+ stringSetting.app_setting.title.distribution_setting+ '</td></tr>'
                                    + '<tr class="even" index="5"><td>'+ stringSetting.app_setting.title.other_setting+ '</td></tr>'
                                    +'</table>'
                        }]
            });

        me.btnDelete = Ext.create('Ext.button.Button', {
                    height        : 32,
                    width         : 138,
                    style         : 'float:right;margin-right:8px;',
                    cls           : 'icon-button-Deleted',
                    overCls       : 'icon-button-Deleted-over',
                    pressedCls    : 'icon-button-Deleted-pressed',
                    focusCls      : 'icon-button-Deleted-focus',
                    disabledCls   : 'icon-button-Deleted-disable',
                    text          : '<span class="SpanTextView" style="padding-left:10px;" >'+ stringSetting.app_setting.button.deleted + '</span>',
                    hidden        : true,
                    disabled      : true
                });
        me.btnEdit = Ext.create('Ext.button.Button', {
                    height        : 32,
                    width         : 138,
                    style         : 'float:right;margin-right:8px;',
                    cls           : 'icon-button-Edit',
                    overCls       : 'icon-button-Edit-over',
                    pressedCls    : 'icon-button-Edit-pressed',
                    focusCls      : 'icon-button-Edit-focus',
                    disabledCls   : 'icon-button-Edit-disable',
                    text          : '<span class="SpanTextView" style="padding-left:10px;" >' + stringSetting.app_setting.button.edit + '</span>',
                    hidden        : true,
                    disabled      : true
                });
        me.btnAdd = Ext.create('Ext.button.Button', {
                    height        : 32,
                    width         : 138,
                    style         : 'float:right;margin-right:7px;',
                    cls           : 'icon-button-Add',
                    overCls       : 'icon-button-Add-over',
                    pressedCls    : 'icon-button-Add-pressed',
                    focusCls      : 'icon-button-Add-focus',
                    disabledCls   : 'icon-button-Add-disable',
                    text          : '<span class="SpanTextView" style="padding-left:10px;" >' + stringSetting.app_setting.button.add + '</span>',
                    hidden        : true,
                    disabled      : false
                });

        me.southPanel = Ext.create('Ext.panel.Panel', {
                    cls           : 'panel-NoborderPadding',
                    bodyCls       : 'button-Color-NoborderPadding',
                    region        : 'south',
                    height        : 60,
                    border        : 0,
                    bodyStyle     : 'padding:14px;padding-right:1px;',
                    items         : [me.btnAdd, me.btnEdit, me.btnDelete]
                });

        me.centerPanelTitle= Ext.create('Ext.panel.Panel', {
                    region        : 'north',
                    bodyCls       : 'panel-NoborderPadding',
                    items         : [{
                                     border        : 0,
                                     html          : ''
                            }]

                 });

        me.centerPanelList = Ext.create('Ext.panel.Panel', {
                    region        : 'center',
                    bodyCls       :'panel-NoborderPadding',
                    items         : [{
                                     border    : 0,
                                     html      : ''
                            }]

                });

        me.centerPanel = Ext.create('Ext.panel.Panel', {
                    region        : 'center',
                    bodyCls       : 'panel-body',
                    border        : 0,
                    items         : [me.centerPanelTitle, me.centerPanelList]
                });

        Ext.applyIf(me, {
                    items  : [me.westPanel, me.centerPanel, me.southPanel]
                });
        /*Inherit the parent component function*/
        var aliveCommandDelay = 10 * 1000;
        var aliveTask = {
            run: function() {
                if (panelTabMasterList &&
                    panelTabMasterList.isVisible() &&
                    panelTabMasterList.isSelectd()
                ) {
                    Ext.Ajax.request({
                        timeout: 120000,
                        url: PROCESS_PATH_GLOBAL_ACTION + 'ClientIsAlive',
                        success: function (response) {
                            //console.log("Client is Alive");
                        }
                    });
                }
            },
            interval: aliveCommandDelay
        };
        Ext.TaskManager.start(aliveTask);

        me.callParent(arguments);
    },
/*Load data model from the store*/
    pushData : function() {
        var me = this;
        me.storeData = new Array();
        var machineNameArray = new Array();
        if(me.store.data.length==0){
            me.btnAddFlag = true;
        }else{
            me.btnAddFlag = me.store.data.getAt(0).data.flag;
        }
        for (var i = 1; i < me.store.getCount(); i++) {
            var lineData = me.store.data.getAt(i);
            var protocolpoolname = lineData.get("protocolpoolname");
            var systemname = lineData.get("systemname");
            var softwareversion = lineData.get("softwareversion");
            var eptype = lineData.get("eptype");
            var type = lineData.get("type");
            var value = lineData.get("value");
            var machinenamelist = lineData.get("machinenamelist");
            var sourcemachinename = lineData.get("sourcemachinename");
            var dismachinenamelist = lineData.get("dismachinenamelist");
            var shareoption = lineData.get("shareoption");
            var displayroot = lineData.get("displayroot");
            var settingname = lineData.get("settingname");
            var interval = lineData.get("interval");
            var language = lineData.get("language");
            var sharemodel = memoryProtocolShare;//lineData.get("sharemodel");
            var backupsupport = backupProtocolDataEnabled;//lineData.get("backupsupport");
            var rpidmodel = lineData.get("rpidmodel");
            var referencemodel = lineData.get("referencemodel");
            me.storeData[i - 1] = new PM.model.AppSetting({
                        'settingname'          : settingname,
                        'protocolpoolname'     : protocolpoolname,
                        'systemname'           : systemname,
                        'softwareversion'      : softwareversion,
                        'eptype'                : eptype,
                        'type'                 : type,
                        'value'                : value,
                        'machinenamelist'      : machinenamelist,
                        'sourcemachinename'    : sourcemachinename,
                        'dismachinenamelist'   : dismachinenamelist,
                        'shareoption'          : shareoption,
                        'displayroot'          : displayroot,
                        'interval'             : interval,
                        'language'             : language,
                        'sharemodel'           : sharemodel,
                        'backupsupport'        : backupsupport,
                        'rpidmodel'            : rpidmodel,
                        'referencemodel'       : referencemodel,
                    });
         for(var j = 0 ; j < machinenamelist.length ; j++){
             machineNameArray.push(machinenamelist[j]);
         }
        }
        me.isRepeat(machineNameArray);
    },
    initTitle : function(title){
        var _array = new Array();
        _array.push('<div>');
        _array.push('<span class="spanGridHeaderText" id="id_table_setting_list_title" >' + title+ '</span>');
        _array.push('<div style="float:left;margin-top: 5px;">');
        _array.push('<div id="id_div_constitution_time" class="icon-button-storerefresh-his" style="text-align: center;display:none;">' + stringSetting.request.button.refresh + '</div>');
        _array.push(' </div>');
        _array.push(' </div>');
        return _array.join(' ');
    },
    /*Some of the parameters initialization panel Such as title, store, etc */
    initParam : function() {
        var me = this;
        var title = "";
        if (me.selectRowNum == 0)
        {
            title = stringSetting.app_setting.title.pool_setting;
        } else if (me.selectRowNum == 1)
        {
            title = stringSetting.app_setting.title.console_setting;
        } else if (me.selectRowNum == 2)
        {
            title = stringSetting.app_setting.title.distribution_setting;
        } else if (me.selectRowNum == 5)
        {
            title = stringSetting.app_setting.title.other_setting;
        } else
        {
        }
        var html=me.initTitle(title);
        me.centerPanelTitle.removeAll(true);
        me.centerPanelTitle.add([{
                    bodyCls         : ['panelHeader-body','panel-NoborderPadding'],
                    height          : 35,
                    html            : html
                }]);


        me.store = new Ext.data.Store({
                    proxy   : new Ext.data.proxy.Ajax({
                                type       : 'ajax',
                                url        : me.storeURL,
                                reader     : {
                                    type            : 'json',
                                    totalProperty   : 'total',
                                    root            : 'result'
                                }
                            }),
                                 model    : 'PM.model.AppSetting'
                });
        me.store.on("load", function() {
                    me.pushData();
                    me.initList();
                    me.addTips();
                    me.bindRefreshEvent();
                    me.bindApproveEvent();
                    me.bindImportorExportEvent();

                });
        me.store.load();
    },
	/*Initializes the different pages of the list interface*/
    initList : function()
    {

        var me = this;
        var tableArray=new Array();
        tableArray.push('<table class="Setting-List-Table" id="id_table_setting_list">');

        if (AppSettingContentArray[me.selectRowNum] == "Path") {
        }
        else if (AppSettingContentArray[me.selectRowNum] == "ProtocolPool")
        {
            tableArray.push('<thead>');
            tableArray.push('<tr index="-1">');
            tableArray.push('<td>');
            tableArray.push(stringSetting.app_setting.column.name);
            tableArray.push('</td>');
            tableArray.push('<td>');
            tableArray.push(stringSetting.app_setting.column.system_name);
            tableArray.push('</td>');
            tableArray.push('<td>');
            tableArray.push(stringSetting.app_setting.column.software_version);
            tableArray.push('</td>');
            tableArray.push('<td class="end">');
            tableArray.push(stringSetting.app_setting.column.ep_type);
            tableArray.push('</td>');
            tableArray.push('</tr>');
            tableArray.push('<thead>');
            tableArray.push('<tbody>');

            for (var i = 0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;
                var eptype = '';
                if (lineData.eptype === "0") {
                    eptype = stringSetting.app_setting.label.anatomical_landmark
                } else if (lineData.eptype === "1") {
                    eptype = stringSetting.app_setting.label.standard
                } else if (lineData.eptype === "2") {
                    eptype = stringSetting.app_setting.label.anatomical_landmark_plus
                }
                if (i == (me.storeData.length - 1)) {
                    tableArray.push('<tr index="' + i + '"><td class="endline">');
                    tableArray.push(lineData.protocolpoolname);
                    tableArray.push('</td><td class="endline">');
                    tableArray.push(lineData.systemname);
                    tableArray.push('</td><td class="endline">');
                    tableArray.push(lineData.softwareversion);
                    tableArray.push('</td><td class="endline end">');
                    tableArray.push(eptype);
                    tableArray.push('</td></tr>');
                } else {
                    tableArray.push('<tr index="' + i + '"><td>');
                    tableArray.push(lineData.protocolpoolname);
                    tableArray.push('</td><td>');
                    tableArray.push(lineData.systemname);
                    tableArray.push('</td><td>');
                    tableArray.push(lineData.softwareversion);
                    tableArray.push('</td><td class="end">');
                    tableArray.push(eptype);
                    tableArray.push('</td></tr>');
                }
            }
            tableArray.push('</tbody>');

             if(me.selectListrRowNum>=me.storeData.length)
             {
             	me.btnDelete.disable();
             	me.btnEdit.disable();
             }

            me.btnDisplay(true, true, true);
            me.btnAdd.enable();
        }
        else if (AppSettingContentArray[me.selectRowNum] == "Console")
        {
            tableArray.push('<thead>');
            tableArray.push('<tr index="-1">');
            tableArray.push('<td>');
            tableArray.push(stringSetting.app_setting.column.name);
            tableArray.push('</td>');
            tableArray.push('<td class="end">');
            tableArray.push(stringSetting.app_setting.column.scanner);
            tableArray.push('</td>');
            tableArray.push('</tr>');
            tableArray.push('<thead>');
            tableArray.push('<tbody>');
            for (var i = 0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;
                if (i == (me.storeData.length - 1)) {
                    tableArray.push('<tr index="' + i + '"><td class="endline">');
                    tableArray.push(lineData.settingname);
                    tableArray.push('</td><td class="endline end">');
                    tableArray.push(lineData.machinenamelist);
                    tableArray.push('</td></tr>');
                } else {
                    tableArray.push('<tr index="' + i + '"><td>');
                    tableArray.push(lineData.settingname);
                    tableArray.push('</td><td class="end">');
                    tableArray.push(lineData.machinenamelist);
                    tableArray.push('</td></tr>');
                }
            }
            tableArray.push('</tbody>');
            if(me.selectListrRowNum>=me.storeData.length)
             {
            	me.btnDelete.disable();
            	me.btnEdit.disable();
            }
            me.btnDisplay(true, true, true);
            if (me.btnAddFlag) {
                me.btnAdd.enable();
            } else {
                me.btnAdd.disable();
            }
        } else if (AppSettingContentArray[me.selectRowNum] == "Distribution")
        {
            tableArray.push('<thead>');
            tableArray.push('<tr index="-1">');
            tableArray.push('<td>');
            tableArray.push(stringSetting.app_setting.column.source_scanner);
            tableArray.push('</td>');
            tableArray.push('<td class="end">');
            tableArray.push(stringSetting.app_setting.column.distribution_scanner);
            tableArray.push('</td>');
            tableArray.push('</tr>');
            tableArray.push('<thead>');
            tableArray.push('<tbody>');
            for (var i = 0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;
                if (i == (me.storeData.length - 1)) {
                    tableArray.push('<tr index="' + i + '"><td class="endline">');
                    tableArray.push(lineData.sourcemachinename);
                    tableArray.push('</td><td class="endline end">');
                    tableArray.push(lineData.dismachinenamelist);
                    tableArray.push('</td></tr>');
                } else {
                    tableArray.push('<tr index="' + i + '"><td>');
                    tableArray.push(lineData.sourcemachinename);
                    tableArray.push('</td><td class="end">');
                    tableArray.push(lineData.dismachinenamelist);
                    tableArray.push('</td></tr>');
                }
            }
            tableArray.push('</tbody>');
            if(me.selectListrRowNum>=me.storeData.length)
            {
            	me.btnDelete.disable();
            	me.btnEdit.disable();
            }
            me.btnDisplay(true, true, true);
            if (me.btnAddFlag) {
                me.btnAdd.enable();
            } else {
                me.btnAdd.disable();
            }
        } else if (AppSettingContentArray[me.selectRowNum] == "Approval")
        {
            tableArray.push('<thead><tr index="-1">');
            tableArray.push('<td>Type</td>');
            tableArray.push('<td class="end">Value</td>');
            tableArray.push('</td><td class="endline end">Value</td>');
            tableArray.push('</tr><thead><tbody>');
            for (var i = 0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;
                if (i == (me.storeData.length - 1)) {
                    tableArray.push('<tr index="' + i + '">');
                    tableArray.push('<td class="endline">');
                    tableArray.push(lineData.type);
                    tableArray.push('</td><td class="endline end">');
                    tableArray.push(lineData.shareoption);
                    tableArray.push('</td></tr>');
                } else {
                    tableArray.push('<tr index="' + i + '">');
                    tableArray.push('<td>');
                    tableArray.push(lineData.type);
                    tableArray.push('</td><td class="end">');
                    tableArray.push(lineData.shareoption);
                    tableArray.push('</td></tr>');
                }
            }
            tableArray.push('</tbody>');
            me.btnDisplay(false, false, true);
            me.btnEdit.setDisabled(false);
        } else if (AppSettingContentArray[me.selectRowNum] == "Displaying")
        {
            tableArray.push('<thead><tr index="-1"><td>');
            tableArray.push(stringSetting.app_setting.column.name);
            tableArray.push('</td>');
            tableArray.push('<td class="end">Display Root</td>');
            tableArray.push('</tr><thead><tbody>');
            for (var i = 0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;
                if (i == (me.storeData.length - 1)) {
                    tableArray.push('<tr index="' + i + '">');
                    tableArray.push('<td class="endline">');
                    tableArray.push(lineData.type);
                    tableArray.push('</td><td class="endline end">');
                    tableArray.push(lineData.displayroot);
                    tableArray.push('</td></tr>');
                } else {
                    tableArray.push('<tr index="' + i + '">');
                    tableArray.push('<td>');
                    tableArray.push(lineData.type);
                    tableArray.push('</td><td class="end">');
                    tableArray.push(lineData.displayroot);
                    tableArray.push('</td></tr>');

                }
            }
            tableArray.push('</tbody>');
            me.btnDisplay(true, true, true);
            if (me.btnAddFlag)
            {
                me.btnAdd.enable();
            }
            else
            {
                me.btnAdd.disable();
            }
        } else if (AppSettingContentArray[me.selectRowNum] == "Other")
        {

            tableArray.push('<thead><tr index="-1"><td>');
            tableArray.push(stringSetting.app_setting.column.name);
            tableArray.push('</td>');
            tableArray.push('<td class="end">');
            tableArray.push(stringSetting.app_setting.column.value);
            tableArray.push('</td></tr><thead><tbody>');

            var index = 0;
            var shareDisplay = null;
            var backupSupport = null;
            var rpidDisplay = null;
            var referenceDisplay = null;

            for (var i=0; i < me.storeData.length; i++) {
                var lineData = me.storeData[i].data;

                if(!memoryProtocolShare){
                    shareDisplay = "False";
                    panelTabTransfer.hide();
                }else{
                    shareDisplay = "True";
                    panelTabTransfer.show();
                }

                if(!backupProtocolDataEnabled){
                    backupSupport = "False";
                    var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                    button.menu.items.items[1].hide();
                }else{
                    backupSupport = "True";
                    var button = panelTabs.items.items[0].down("button[cls=icon-button-menu]");
                    button.menu.items.items[1].show();
                }

                if(lineData.rpidmodel == "false"){
                    rpidDisplay = "False";
                }else{
                    rpidDisplay = "True";
                }

                if(lineData.referencemodel == "false"){
                    referenceDisplay = "False";
                }else{
                    referenceDisplay = "True";
                }
            }

            /*tableArray.push('<tr index="' + index++ + '"><td>');
            tableArray.push(stringSetting.app_setting.label.protocol_share_across_model);
            tableArray.push('</td><td class="end">');
            tableArray.push(shareDisplay);
            tableArray.push('</td></tr>');*/


            tableArray.push('<tr index="' + index++ + '"style="display:none;"><td>');
            tableArray.push(stringSetting.app_setting.label.rpid_display);
            tableArray.push('</td><td class="end">');
            tableArray.push(rpidDisplay);
            tableArray.push('</td></tr>');


            tableArray.push('<tr index="' + index++ + '"style="display:none;"><td>');
            tableArray.push(stringSetting.app_setting.label.reference_display);
            tableArray.push('</td><td class="end">');
            tableArray.push(referenceDisplay);
            tableArray.push('</td></tr>');


            tableArray.push('<tr index="' + index++ + '"><td>');
            tableArray.push(stringSetting.app_setting.label.batch_approving);
            tableArray.push('</td><td class="end">');
            tableArray.push('<div class="icon-button-Execute-OtherSetting" name="consoleSettingDeleteBtn">');
            tableArray.push(stringSetting.app_setting.button.execute);
            tableArray.push('</div>');

            tableArray.push('<tr index="' + index++ + '"><td>');
            tableArray.push(stringSetting.app_setting.label.initialize_setup);
            tableArray.push('</td><td class="end">');
            tableArray.push('<div class="icon-button-Execute-OtherSetting" name="Initialize_setupBtn">');
            tableArray.push(stringSetting.app_setting.button.execute);
            tableArray.push('</div>');
            tableArray.push('</td></tr>');

            tableArray.push('<tr index="' + index++ + '"><td>');
            tableArray.push(stringSetting.app_setting.label.clean_master_maker);
            tableArray.push('</td><td class="end">');
            tableArray.push('<div class="icon-button-Execute-OtherSetting" name="clean_master_makerBtn">');
            tableArray.push(stringSetting.app_setting.button.execute);
            tableArray.push('</div>');
            tableArray.push('</td></tr>');

            /*tableArray.push('<tr index="' + index++ + '"><td class="endline">');
            tableArray.push(stringSetting.app_setting.label.backup_protocol_data);
            tableArray.push('</td><td class="endline end">');
            tableArray.push(backupSupport);F
            tableArray.push('</td></tr>');*/


//            html += '<tr index="' + index++ + '"><td class="endline">'
//                         + stringSetting.app_setting.label.export_or_import
//                         + '</td><td class="endline end">'
//                         + '<div class="icon-button-Export-OtherSetting" style="width: 80px; display:inline-block; margin-right:12px">'
//                         + stringSetting.app_setting.button.export
//                         + ' </div> '
//                         + '<div class="icon-button-Import-OtherSetting" style="width: 80px; display:inline-block">'
//                         + stringSetting.app_setting.button.import
//                         + ' </div> '
//                         + '</td></tr>';
            tableArray.push('</tbody>');
            if(me.selectListrRowNum == 0 || me.selectListrRowNum == 1
                || me.selectListrRowNum == 2 || me.selectListrRowNum == 5){
                me.btnDisplay(false, false, true);
            }else{
                me.btnDisplay(false, false, false);
            }
        }
        tableArray.push('</table>');
        var html=tableArray.join(' ');
        me.centerPanelList.removeAll(true);
        me.centerPanelList.add({
                bodyCls      :'panel-NoborderPadding',
                html         : html
                });
        me.clearContentSlelected();
        me.clearListSlelected();
    },
    panelUpdate : function() {
        var me = this;
        me.initParam();
    },
    onClick : function(e)
    {
        var me =this;
        var rowContentEl = me.getTrEl(e.target, "Setting-Content-Table");

        if (rowContentEl != null) {
            if (rowContentEl.getAttribute("index") == me.selectRowNum) {
                return;
            }
            me.changeContent();
            me.selectRowNum = rowContentEl.getAttribute("index");
            me.storeURL = AppSettingURLArray[me.selectRowNum];
            me.panelUpdate();
            me.btnEdit.setDisabled(true);
            me.btnDelete.setDisabled(true);
            me.btnAdd.disable();
            me.selectListrRowNum = -1;
            return;
        }

        var rowListEl = me.getTrEl(e.target, "Setting-List-Table");
        if (rowListEl != null) {
            if (me.selectListrRowNum == rowListEl.getAttribute("index")    || rowListEl.getAttribute("index") == -1) {
                return;
            }
            me.deleteURL = AppSettingDeleteURLArray[me.selectRowNum];
            me.selectListrRowNum = rowListEl.getAttribute("index");

            me.btnEdit.setVisible(true);
            me.btnEdit.setDisabled(false);
            me.btnDelete.setDisabled(false);
            me.clearListSlelected();

            var btnExecute = document.getElementsByClassName("icon-button-Execute-OtherSetting");
            if (btnExecute.length != 0 && (me.selectListrRowNum == 3||me.selectListrRowNum == 4)) {
                me.btnEdit.setVisible(false);
            }

            var btnImport = document.getElementsByClassName("icon-button-Import-OtherSetting");
            if(btnImport.length != 0 && me.selectListrRowNum == 4){
                me.btnEdit.setVisible(false);
            }

            return;
        }

        var btnEdit = me.getTrEl(e.target, "icon-button-Edit");
        if (btnEdit != null) {
            if (me.btnEdit.disabled) {
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "ProtocolPool") {

                var confirm = Ext.create('PM.view.Setting.ProtocolPoolSettingConfirmView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        AppSettingContentArray[me.selectRowNum],
                        me.selectRowNum,
                        me.storeData[me.selectListrRowNum].get('protocolpoolname'),
                        PROCESS_PATH_GLOBAL_ACTION + 'editProtocolPoolSetting.action', 'edit');
                confirm.show();
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "Console") {
                var confirm = Ext.create('PM.view.Setting.ConsoleSettingView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.group_name,
                        stringSetting.app_setting.column.machine_name,
                        me.selectRowNum,
                        me.storeData[me.selectListrRowNum].get('settingname'),
                        'edit',me.store);
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "Distribution") {
                var confirm = Ext.create('PM.view.Setting.SettingCommonView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.source_machine_name,
                        stringSetting.app_setting.column.distribution_machine_name,
                        me.selectRowNum,
                        me.storeData[me.selectListrRowNum].get('sourcemachinename'),
                        'edit');
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "Other") {
                var modeltype = null;
                var confirm = null;
                if(me.selectListrRowNum == 0){
                    modeltype = memoryProtocolShare;
                    confirm = Ext.create('PM.view.Setting.ProtocolShareSettingView', {
                        parentPanel  : me,
                        sharetype    : 0,
                        sharemodel   : modeltype,
                        labelText    : stringSetting.app_setting.label.protocol_share_across_model,
                        title        : stringSetting.app_setting.title.display_setting,
                    });
                }else if(me.selectListrRowNum == 1){
                    modeltype = me.storeData[0].get('rpidmodel');
                    confirm = Ext.create('PM.view.Setting.ProtocolShareSettingView', {
                        parentPanel  : me,
                        sharetype    : 1,
                        sharemodel   : modeltype,
                        labelText    : stringSetting.app_setting.label.rpid_display,
                        title        : stringSetting.app_setting.title.rpid_setting,
                    });
                }else if(me.selectListrRowNum == 2){
                    modeltype = me.storeData[0].get('referencemodel');
                    confirm = Ext.create('PM.view.Setting.ProtocolShareSettingView', {
                        parentPanel  : me,
                        sharetype    : 2,
                        sharemodel   : modeltype,
                        labelText    : stringSetting.app_setting.label.reference_display,
                        title        : stringSetting.app_setting.title.reference_setting,
                    });
                }else if(me.selectListrRowNum == 5){
                    modeltype = backupProtocolDataEnabled;
                    confirm = Ext.create('PM.view.Setting.ProtocolShareSettingView', {
                        parentPanel  : me,
                        sharetype    : 3,
                        sharemodel   : modeltype,
                        labelText    : stringSetting.app_setting.label.backup_protocol_data,
                        title        : stringSetting.app_setting.title.backup_protocol_data_setting,
                    });
                }
                confirm.show();
                return;
            }
        }

        var btnAdd = me.getTrEl(e.target, "icon-button-Add");
        if (btnAdd != null) {
            if (me.btnAdd.disabled) {
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "ProtocolPool") {
                var confirm = Ext.create('PM.view.Setting.ProtocolPoolSettingConfirmView', {
                            parentPanel    : me,
                            isAdd          : true,
                        });
                confirm.sendParam(AppSettingContentArray[me.selectRowNum], me.selectRowNum,'', PROCESS_PATH_GLOBAL_ACTION + 'addProtocolPoolSetting.action','add');
                confirm.show();
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "Console")
            {
                var confirm = Ext.create('PM.view.Setting.ConsoleSettingView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.group_name,
                        stringSetting.app_setting.column.machine_name,
                        me.selectRowNum, '', 'add',me.store);
                return;
            }
            else if (AppSettingContentArray[me.selectRowNum] == "Distribution")
            {
                var confirm = Ext.create('PM.view.Setting.SettingCommonView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.source_machine_name,
                        stringSetting.app_setting.column.distribution_machine_name,
                        me.selectRowNum, '', 'add');
                return;
            }
            else if (AppSettingContentArray[me.selectRowNum] == "Approval")
            {
                var confirm = Ext.create('PM.view.Setting.SettingCommonView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.group_name,
                        stringSetting.app_setting.column.machine_name,
                        me.selectRowNum, '', 'add');
                return;
            }
            else if (AppSettingContentArray[me.selectRowNum] == "Displaying")
            {
                var confirm = Ext.create('PM.view.Setting.SettingCommonView', {
                            parentPanel : me
                        });
                confirm.sendParam(
                        stringSetting.app_setting.column.group_name,
                        stringSetting.app_setting.column.machine_name,
                        me.selectRowNum, '', 'add');
                return;
            }
        }
        var btnDelete = me.getTrEl(e.target, "icon-button-Delete");
        if (btnDelete != null) {
            if (me.btnDelete.disabled) {
                return;
            }
            var confirm = Ext.create('PM.view.Setting.WarningConfirmView', {
                        parentPanel : me
                    });

            var lineData = me.storeData[me.selectListrRowNum];
            if (lineData == null) {
                return;
            }
            if (AppSettingContentArray[me.selectRowNum] == "ProtocolPool") {
                deleteID = me.storeData[me.selectListrRowNum]    .get('protocolpoolname');
                confirm.sendParam(deleteID,  PROCESS_PATH_GLOBAL_ACTION + 'deleteProtocolPoolSetting.action',
                        stringSetting.app_setting.message.protocol_pool_deleted,
                        stringSetting.app_setting.message.delete_continue,
                        'protocol pool setting');
            } else if (AppSettingContentArray[me.selectRowNum] == "Console") {
                deleteID = lineData.get('settingname');
                confirm.sendParam(deleteID,  PROCESS_PATH_GLOBAL_ACTION + 'deleteConsoleSetting.action',
                        stringSetting.app_setting.message.sources_canner_deleted,
                        stringSetting.app_setting.message.delete_continue,
                        'console setting');
            } else if (AppSettingContentArray[me.selectRowNum] == "Distribution") {
                deleteID = lineData.get('sourcemachinename');
                confirm.sendParam(deleteID,  PROCESS_PATH_GLOBAL_ACTION + 'deleteDistributionSetting.action',
                        stringSetting.app_setting.message.distribution_scanner_deleted,
                        stringSetting.app_setting.message.delete_continue,
                        'distribution setting');
            }
            confirm.show();
            return;
        }

    },
    btnDisplay : function(addbln, delbln, editbln) {
        var me = this;
        me.btnDelete.setVisible(delbln);
        me.btnEdit.setVisible(editbln);
        me.btnAdd.setVisible(addbln);
    },
    getTrEl : function(el, className) {
        var targetEl = el;
        for (var i = 0; i < 6; i++) {
            if (targetEl == null) {
                return null;
            }
            if (targetEl.parentElement.parentElement.className.indexOf(className) >= 0) {
                return targetEl;
            }
            targetEl = targetEl.parentElement;
        }
        return null;
    },
    /*The tr in westPanel set selected ,even and odd style*/
    clearContentSlelected : function() {
        var me = this;
        var tdArr = Ext.get("id_table_setting_content").query("tr");
        for (var i = 0; i < tdArr.length; i++) {
            if (tdArr[i].getAttribute("index") == me.selectRowNum) {
                tdArr[i].className = "selected";
            } else {
                if (i % 2 == 0) {
                    tdArr[i].className = "even";
                } else {
                    tdArr[i].className = "odd";
                }
            }
        }
    },
    /*The tr in list set selected ,even and odd style*/
    clearListSlelected : function() {
        var me = this;
        var tdArr;
        if(document.getElementsByClassName("Setting-List-Table").length>0)
        {
        	tdArr = document.getElementsByClassName("Setting-List-Table")[0].getElementsByTagName("tr");
        }
        else{
        	return;
        }
        for (var i = 1; i < tdArr.length; i++) {
            if (tdArr[i].getAttribute("index") == me.selectListrRowNum) {
                tdArr[i].className = "selected";
            } else {
                if (i % 2 == 0) {
                    tdArr[i].className = "odd";
                } else {
                    tdArr[i].className = "even";
                }
            }
        }
    },
	/* Less than the entire string, to display tip*/
    addTips : function() {
        var me = this;
        if (document.getElementsByClassName("Setting-List-Table")[0] != null) {
            var tdArr = document.getElementsByClassName("Setting-List-Table")[0].getElementsByTagName('td');
            for (var i = 0; i < tdArr.length; i++) {
                var tdWidth = tdArr[i].offsetWidth;
                var text = tdArr[i].innerText;
                if (getStringRealWidth(me.styleTip, text) >= (tdWidth-25)) {
                    tdArr[i].setAttribute('data-qtip',text);
                } else {
                    tdArr[i].removeAttribute('data-qtip');
                }
            }
        }
    },
    initRefreshButton : function(displayable) {
        if (document.getElementsByClassName("icon-button-storerefresh-his")[0] != null) {
            if (displayable) {

                document.getElementsByClassName("icon-button-storerefresh-his")[0].className = "icon-button-storerefresh-his";
                document.getElementsByClassName("icon-button-storerefresh-his")[0].style.display = "";
            } else {
                //document.getElementById("id_div_constitution_time").style.display = "none";
                document.getElementsByClassName("icon-button-storerefresh-his")[0].style.display = "none";
            }
        }
    },
    bindRefreshEvent : function() {
        var me = this;
        if (document.getElementsByClassName("icon-button-storerefresh-his")[0] != null) {
            document.getElementsByClassName("icon-button-storerefresh-his")[0].onclick = function(e) {
                me.changeTab();
                me.initRefreshButton(false);
                panelTabSetting.setIcon(false);
            };
        }
    },
    bindApproveEvent:function(){
        var me = this;
        var btnExecute = document.getElementsByClassName("icon-button-Execute-OtherSetting");
        if (btnExecute != null) {
            for(var i = 0; i < btnExecute.length; i++){
            	if(btnExecute[i].getAttribute("name")=="consoleSettingDeleteBtn"){
            		btnExecute[i].onclick =  function(e) {
                    me.startApprove();
            	    }
            	}
            	 if(btnExecute[i].getAttribute("name")=="Initialize_setupBtn"){
            		btnExecute[i].onclick =  function(e) {
                               panelTabMasterList.fireEvent("click");
                               panelTabMasterList.show();

            	    }

                }
                if(btnExecute[i].getAttribute("name")=="clean_master_makerBtn"){
                    btnExecute[i].onclick =  function(e) {
                        var confirm = Ext.create('PM.view.Setting.CleanMasterMakerConfirmView', {
                            parentPanel : me,
                            executeFunction:me.cleanMasterMaker,
                        });
                        confirm.sendParam(
                            stringSetting.master.message.master_delete_machine_waring,
                            stringSetting.master.message.confirmview_text2);
                        confirm.show();

                    }

                }

            }
        }


    },

    cleanMasterMaker:function(){
        var me = this;
        var approve_begin = new Date().getTime();
        var approve = Ext.create('PM.view.Setting.CleanMasterMakerProgressView', {
            parentPanel : me,
            approve_date: approve_begin
        });
        approve.show();
    },
    bindImportorExportEvent:function(){
        var me = this;
        var btnExport = document.getElementsByClassName("icon-button-Export-OtherSetting");
        if (btnExport != null) {
            for(var i = 0; i < btnExport.length; i++){
                btnExport[i].onclick =  function(e) {
                    me.startExport();
                }
            }
        }

        var btnImport = document.getElementsByClassName("icon-button-Import-OtherSetting");
        if (btnImport != null) {
            for(var i = 0; i < btnImport.length; i++){
                btnImport[i].onclick =  function(e) {
                    me.startImport();
                }
            }
        }
    },

    changeContent: function() {
        var me = this;
        me.initRefreshButton(false);
        panelTabSetting.setIcon(false);
    },

    changeTab : function() {
        var me = this;
        me.initRefreshButton(false);
        me.storeURL = AppSettingURLArray[0];
        me.selectRowNum = 0;
        me.selectListrRowNum = -1;
        me.initParam();
    },
    /* check machineName repeat*/
    isRepeat :function(arr){
         var hash = {};
         for(var i in arr) {
              if(hash[arr[i]]){
                   var _message = Ext.create('PM.view.common.window.Message', {
                           errorDetail        : stringSetting.error.ERR50010,
                    });
                  _message.showWin();
              }
              hash[arr[i]] = true;
         }
         return false;
    },
    startApprove : function(){
        var me = this;
        var approve_begin = new Date().getTime();
        var approve = Ext.create('PM.view.Setting.BatchApprovingConfirmView', {
            parentPanel : me,
            approve_date: approve_begin
        });
        approve.show();
    }
});
