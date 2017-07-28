/*!
 * JS setting common view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
Ext.define('PM.view.Setting.ConsoleSettingView',{
    extend              :'PM.view.common.window.ModalDialog',
    alias: 'widget.consolesettingview',
    layout              : {
           type  :  'border'
    },
    modal               : true,
    cls                 :'x-Confirm-window',
    bodyCls             :'x-Confirm-window-body',
    northPanel          : null,
    centerPanel         : null,
    buttonPanel         : null,
    comboxPanel         : null,
    tablePanel          : null,
    settingType         : '',
    parentPanel         : null,
    index               : null,
    settingMachineName  : null,
    settingname         : null,
    url                 : null,
    store               : null,
    groupName           : null,
    listName            : null,
    groupStoreData      : new Array(),
    listStoreData       : new Array(),
    listStoreDataCompare: new Array(),
    allMachineName      : new Array(),
    otherMachineName    : new Array(),
    settingIndex        : null,
    btnOkAction         : false,
    applyURL            : null,
    option              : null,
    newTrSum            : 0,
    scrollWidth         : 17,
    checkMoveArray        : [],
    modifyParamsStrs    : '',
    currentMove            : null,
    modifyConsoleSettingStore    : null,
    checkScannerMovedStore    : null,
    checkMovingTask    : null,
    setScannerMovedStore    : null,
    movePro                    : null,
    groupScannerstore        : null,
    cancelClicked			:false,
    title_select            : null,
    initComponent : function() {
        var me = this;

        me.title=stringSetting.app_setting.title.console_setting,
        me.comboxPanel = Ext.create('PM.view.combox.DropdownListView',{
            width     : 574,
            region    :'center',
        });

        me.northPanel=Ext.create('Ext.panel.Panel',{
            region         : 'north',
            layout         : 'border',
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-Color-Padding',
            height         : 90,
            items          : [{
                    region   :'center',
                    html     :''
                }]
        });

        me.centerPanel=Ext.create('Ext.panel.Panel',{
            region         :'center',
            autoScroll     : false,
            layout         :'border',
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'grid-ColorPadding-Noborder',
            items          : [{
                    region    : 'center',
                    html      :''}]
        });
        me.btnOk=Ext.create('Ext.button.Button',{
            height        : 32,
            width         : 118,
            left          :'418px',
            cls           :'icon-button',
            overCls       :'icon-button-over',
            pressedCls    :'icon-button-pressed',
            focusCls      :'icon-button-focus',
            disabledCls   :'icon-button-disable',
            text          : '<span class="SpanTextView" style="font-size:13pt;">'+stringSetting.app_setting.button.ok+'<span>',
            handler : function() {

                me.btnOkAction = true;
                //var settingChildListArr = document.getElementById('setting_tableList').getElementsByTagName('input');
                var settingChildListArr = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
                if(me.option == 'add'){
                   me.settingname = me.comboxPanel.getSelectValue();
                      if (me.comboxPanel.getSelectValue() == '') {
                       //document.getElementById("validationid").style.display='inherit';
                       document.getElementsByClassName("Setting-Content-Table-noselected")[0].style.display='inherit';
                       return;
                    }
                }
                //var inputArr = document.getElementById('consoleListDiv').getElementsByTagName('input');
                var btnUpdateArr = document.getElementsByClassName("icon-button-Update-ConsoleSetting");

                me.btnOk.setDisabled(true);
                me.btnCancel.setDisabled(true);
                var inputArr = document.getElementsByClassName("Setting-List-Table-consol")[0].parentElement.getElementsByTagName('input');
                if (me.validataOtherFun(inputArr)) {
                	me.btnOk.setDisabled(false);
                    me.btnCancel.setDisabled(false);
                    return;
                }
                me.checkMoveArray = new Array();
                if(me.otherMachineName.length>0){
                    for(var i = 0, len = inputArr.length; i < len; i++){
                        for(var j in me.otherMachineName){
                            if(inputArr[i].value.toLowerCase() == me.otherMachineName[j].data.machinename.toLowerCase()){
                                me.checkMoveArray.push(me.otherMachineName[j]);
                            }
                        }
                    }
                }
                var oldStoreDataArray = new Array();
                var newStoreDataArray = new Array();
                var addStoreDataArray = new Array();
                for(var j =0 ; j< me.listStoreDataCompare.length;j++){
                    var isSame = false;
                    for(var i=0;i<me.checkMoveArray.length;i++){
                        if(me.checkMoveArray[i].data.machinename.toLowerCase() == settingChildListArr[j].value.toLowerCase()){
                            isSame = true;
                            break;
                        }
                    }
                    if(isSame){
                        continue;
                    }
                    if(me.listStoreDataCompare[j].data.machinename == ''){
                        addStoreDataArray.push(settingChildListArr[j].value);
                    }else if(me.listStoreDataCompare[j].data.machinename.toLowerCase() != settingChildListArr[j].value.toLowerCase()){
                        oldStoreDataArray.push(me.listStoreDataCompare[j].data.machinename);
                        newStoreDataArray.push(settingChildListArr[j].value);
                    }
                }
//              var checkMoveParamsStr = '';
                me.modifyParamsStrs = '';
                if(oldStoreDataArray.length != 0){
                        for(var i=0;i<oldStoreDataArray.length;i++){
                            me.modifyParamsStrs += oldStoreDataArray[i] + ',' +
                                newStoreDataArray[i] + ',' +
                                me.settingname + ',' +
                                '' + ',' +
                                'update';
                                if(i != oldStoreDataArray.length - 1){
                                    me.modifyParamsStrs += '%,%';
                                }
                        }
                    }
                if(addStoreDataArray.length != 0){
                    if(oldStoreDataArray.length != 0){
                        me.modifyParamsStrs += '%,%';
                    }
                    for(var i=0;i<addStoreDataArray.length;i++){
                        me.modifyParamsStrs += '' + ',' +
                                    addStoreDataArray[i] + ',' +
                                    me.settingname + ',' +
                                    '' + ',' +
                                    'add';
                            if(i != addStoreDataArray.length - 1){
                                me.modifyParamsStrs += '%,%';
                            }
                    }
                }

                if(me.checkMoveArray.length > 0){
                    me.doScannerMoved();

                }else if(me.modifyParamsStrs == ''){
                    me.close();
                }else{
                    var confirm = Ext.create('PM.view.Setting.ConsoleConfirmView', {
                        parentPanel : me
                    });
                    confirm.sendParam(
                            stringSetting.app_setting.message.console_ok_save_warningone,
                            stringSetting.app_setting.message.console_ok_save_warningtwo,'wheatherSave',null);
                    confirm.show();
                }
            }
        });

        me.btnCancel=Ext.create('Ext.button.Button',{
            height         : 32,
            width          : 118,
            cls            :'icon-button',
            overCls        :'icon-button-over',
            pressedCls     :'icon-button-pressed',
            focusCls       :'icon-button-focus',
            disabledCls    :'icon-button-disable',
            text           : '<span class="SpanTextView" style="font-size:13pt;">'+stringSetting.app_setting.button.cancel+'<span>',
            handler        : function() {
                    me.close();
                    me.parentPanel.initParam();
            }
        });

        var dataTipStr = '';
        dataTipStr = " data-qtip='"+getErrorTipMsg(stringSetting.error.ERR50008)+"'";

        me.buttonPanel=Ext.create('Ext.panel.Panel',{
            region        : 'south',
            height        : 60,
            cls           : 'panel-NoborderPadding',
            bodyCls       : 'button-Color-NoborderPadding',

            layout        : {
                    type     : 'hbox',
                    padding  : '0 0 0 0',
                    align    : 'middle',
                    pack     : 'end'
             },
            defaults      :
            {
                    padding  : '0 0 0 0',
                    margins  : '0 8 0 0'
            },
            items:[{
                    html       : '<table style="height:25;display:none;" id="validationid" class="Setting-Content-Table-noselected" onselectstart="return false" ondrag="return false"><tr style="height:25px;">' +
                                 '<td><span style="display:block" class="Common-Setting-error-input-warning-icon" ></span></td>'+
                                 '<td><div class="Common-Setting-error-add-waring-default" '+dataTipStr+'>'+stringSetting.error.ERR50008.details+'</div></td></tr></table>',
                    width      : 270,
                    height     : 25,
                    bodyCls    : 'Console-Setting-error-panel',
                    bodyStyle  : 'left:12px;'
                    }, me.btnOk, me.btnCancel]
        });

        Ext.applyIf(me, {
            items : [
                me.northPanel,
                me.centerPanel,
                me.buttonPanel
            ]
        });
        me.callParent(arguments);
    },

    createHeaderPanel:function(title){
        return Ext.create('Ext.panel.Panel',{
            region:'north',
            height:30,
            html:'<span>' + title + '</span>',
            baseCls:'setting-header-panel'
        });
    },
    /* Add the tablePanel header*/
    createListHeaderPanel:function(title){
        var me= this;
        me.getScrollWidth();
        return Ext.create('Ext.panel.Panel',{
            region    :'north',
            height    :30,
            baseCls   :'setting-header-panel',
            html      : '<div style="white-space: nowrap;"><div style="float:left;"><span>'+title+'</span></div>' +
                        '<div id="id_consoleSetting_add" class="icon-button-Delete-ConsoleSetting" name="consoleSettingDeleteBtn" ' +
                        'style="float:right;margin-right: ' + me.scrollWidth + 'px;">' +stringSetting.app_setting.button.add+' </div> '
        });
    },
    /* Create the format of the list in the tablePanel*/
    createOreateTableHtml : function(_array) {
        var tableArray = new Array();
        tableArray.push('<div style="height: 154px;" id="consoleListDiv"><table width=100% class="Setting-List-Table-consol" id="setting_tableList">');
        for (var i = 0; i < this.listStoreData.length; i++) {
            var lineData = this.listStoreData[i];
            var _style = 'even';
            if (i % 2 != 0) {
                _style = 'odd';
            }
            tableArray.push('<tr class=');
            tableArray.push(_style);
            tableArray.push('  selelctFlag = "' + lineData.data.selectedflag + '" index=' + i + '>');
            tableArray.push('<td class="settingTable-Td-value">');
            tableArray.push('<input type="text"  onKeyPress="keyPressSpelChar(this);" onchange="cleanSpelChar(this)"  class="Console-Setting-error-input-default" value="' + lineData.data.machinename + '"/>');
            tableArray.push('</td>');
            tableArray.push('<td  class="settingTable-Td-value" style="width:70px;border-top:0px;border-bottom:0px;"><span class="Console-Setting-error-input-warning-icon"></span></td>');
            tableArray.push('<td  class="settingTable-Td-value" style="border-top:0px;border-bottom:0px;">');
            tableArray.push('<button type="button" class="icon-button-Update-ConsoleSetting " name="consoleSettingUpdateBtn" disabled="disabled">'+stringSetting.app_setting.button.save+' </button> ');
            tableArray.push('</td>');
            tableArray.push('<td  class="settingTable-Td-value" style="border-top:0px;border-bottom:0px;">');
            tableArray.push('<div class="icon-button-Delete-ConsoleSetting" name="consoleSettingDeleteBtn">'+stringSetting.app_setting.button.deleted+' </div> ');
            tableArray.push('</td>');
            tableArray.push('</tr>');
        }
        tableArray.push('</table></div>');

        return tableArray.join('');
    },
     /* Read the data in the store, manipulate the data*/
    pushData : function() {
        this.groupStoreData = new Array();
        this.listStoreData = new Array();
        this.listStoreDataCompare = new Array();
        this.allMachineName = new Array();
        this.otherMachineName = new Array;

        if(this.store!=null){
            for (var i = 0; i < this.store.getCount(); i++) {

//              var line_data = this.groupScannerstore.data.getAt(i);

                var lineData = this.store.data.getAt(i);
                if(lineData==null){
                    break;
                }
                var selectlist = lineData.get("selectlist");
                for (var j = 0; j < selectlist.length; j++) {
                    var settingname = selectlist[j].settingname;
                    var selectedflag = selectlist[j].selectedflag;
                    this.groupStoreData[j] = new PM.model.SettingWin({
                              'settingname' : settingname,
                              'selectedflag': selectedflag
                    });
                }
               var machinenamelist = lineData.get("machinenamelist");
               if(machinenamelist==null){
                     break;
               }
               for (var k = 0; k < machinenamelist.length; k++) {
                   var machinename = machinenamelist[k].machinename;
                   var selectedflag = machinenamelist[k].selectedflag;
                   var _settingname = '';
                   for(var s = 1; s < this.groupScannerstore.getCount();s++){
                          var data_line = this.groupScannerstore.data.getAt(s);
                          var mlist = data_line.get("machinenamelist");
                          for(var h = 0;h<mlist.length;h++){
                                  if(machinename == mlist[h]){
                                      _settingname = data_line.get("settingname");
                                      break;
                                  }
                          }
                          if(_settingname != ''){
                                 break;
                          }
                   }
                   if (this.option == 'edit') {
                       if (selectedflag || selectedflag == 'true') {
                           this.listStoreData.push(new PM.model.SettingWin({
                               'machinename' : machinename,
                               'selectedflag': selectedflag
                           }));
                           this.listStoreDataCompare.push(new PM.model.SettingWin({
                               'machinename' : machinename,
                               'selectedflag': selectedflag
                           }));
                      }else{
                          this.otherMachineName.push(new PM.model.SettingWin({
                            'machinename' : machinename,
                            'settingname' : _settingname,
                            'selectedflag': selectedflag
                           }));
                      }
                  } else {
                    this.listStoreData[0] = new PM.model.SettingWin({
                        'machinename' : '',
                        'selectedflag': ''
                    });
                    this.listStoreDataCompare[0] = new PM.model.SettingWin({
                        'machinename' : '',
                        'selectedflag': ''
                    });
                    this.otherMachineName.push(new PM.model.SettingWin({
                        'machinename' : machinename,
                        'settingname' : _settingname,
                        'selectedflag': selectedflag
                    }));

                }
                this.allMachineName[k] = new PM.model.SettingWin({
                    'machinename' : machinename,
                    'selectedflag': selectedflag
                });
            }
          }
        }
        if (this.listStoreData.length == 0) {
            this.listStoreData[0] = new PM.model.SettingWin({
                    'machinename' : '',
                    'selectedflag': ''
            });
           this.listStoreDataCompare[0] = new PM.model.SettingWin({
                    'machinename' : '',
                    'selectedflag': ''
           });
        }


    },
    /* Receive from AppSetting incoming data, load data*/
    initData : function () {
        var me = this;
        me.store = new Ext.data.Store({
                    proxy   : new Ext.data.proxy.Ajax({
                                type    : 'ajax',
                                url     : me.url,
                                reader  : {
                                    type            : 'json',
                                    totalProperty   : 'total',
                                    root            : 'result'
                                },
                                getMethod   : function() {
                                            return 'GET';
                                        }
                            }),
                    model   : 'PM.model.SettingWin'
                });

        me.modifyConsoleSettingStore = Ext.create('PM.data.Ajax',
                {
                    url: ConsoleSettingUrl.modifyConsoleSetting,
                    method      : "POST",
                    loadData: function(responseObj)
                    {
                        me.modifyConsoleSetting(responseObj);

                    }
                });

        me.checkMovingHistoryWithScannerStore = Ext.create('PM.data.Ajax',
                {
                    url: ConsoleSettingUrl.checkMovingHistoryWithScanner,
                    method      : "POST",
                    loadData: function(responseObj)
                    {
                        me.checkMovingHistoryWithScanner(responseObj);
                        if(me.isVisible())
                        {
                            me.unmask();
                        }

                        clearMask();
                    }
                });
        me.setScannerMovedStore = Ext.create('PM.data.Ajax',
                {
                    url: ConsoleSettingUrl.setScannerMoved,
                    method      : "POST",
                });


        me.store.on("load", function() {
                    me.pushData();
                    me.panelUpdate();
                    me.show();
                    me.setDefaultValue();
                    me.bindAdd();
                    me.bindDelete();
                    me.bindBlur();
                    me.bindUpdate();
                });
//      me.groupScannerstore.on("load", function() {
//
//      });
//      me.groupScannerstore.load();
        if (me.option == 'add') {
            me.store.load();
        } else {
            me.store.load({
                params      : {settingname: me.settingname}
            });
        }
    },

    doScannerMoved:function(){
        var me = this;
        if(me.btnOkAction){
            var confirm = Ext.create('PM.view.Setting.ConsoleConfirmView', {
                parentPanel : me
            });
            confirm.sendParam(stringSetting.app_setting.message.console_ok_save_warningone,
                    stringSetting.app_setting.message.console_ok_save_warningtwo,'wheatherSave',null);
            confirm.show();
        }else{
            me.okOption();
        }
        me.btnOk.setDisabled(false);
        me.btnCancel.setDisabled(false);
        me.bindAdd();
        me.parentPanel.initParam();
    },

    checkScannerMoved : function(responseObj){
        var btnUpdateArr = document.getElementsByClassName("icon-button-Update-ConsoleSetting");
        var _i = 0;
        var errMachineNameList = [];
        for(var i=0;i<responseObj.errorList.length;i++){
            var gn = responseObj.errorList[i].protocolpoolname;
            for(var j=0;j<me.otherMachineName.length;j++){
                if(gn == me.otherMachineName[j].data.settingname){
                    errMachineNameList.push(me.otherMachineName[j].data.machinename);
                }
            }
        }
        var indexArray = [];
        for(var i=0;i<errMachineNameList.length;i++){
            for(var j=0;j<btnUpdateArr.length;j++){
                if(btnUpdateArr[j].parentElement.parentElement.getElementsByTagName('input')[0].value == errMachineNameList[i]){
                    indexArray.push(j);
                    break;
                }
            }
        }
        for(var i=0;i<indexArray.length;i++){
            var _btnUpdateArr = btnUpdateArr[indexArray[i]].parentElement.parentElement.getElementsByTagName('input')[0];
            _btnUpdateArr.className = "Console-Setting-error-input-warning x-form-invalid-field";
            _btnUpdateArr.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50010));
            _btnUpdateArr.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
        }
        me.btnOk.setDisabled(false);
        me.btnCancel.setDisabled(false);
        me.bindAdd();
        me.parentPanel.initParam();
    },
    modifyConsoleSetting : function(responseObj){
        var me = this;
        if(responseObj.flag){
            function taskFunction(){
                me.checkProcess();
            }
            var runner = new Ext.util.TaskRunner();
            me.checkMovingTask = runner.newTask({
                 run: taskFunction,
                 interval: 250
            });
            me.checkMovingTask.start();
        }else{
        	var _message = Ext.create('PM.view.common.window.Message', {
               errorDetail        : stringSetting.error[responseObj.errorCode],
            });
            me.close();
            _message.showWin();
        }
    },
    checkProcess:function(){
        var me = this;
        me.checkMovingHistoryWithScannerStore.requestSend({params: {}});
    },
    checkMovingHistoryWithScanner:function(responseObj){
        var me = this;
        if(responseObj.allfinish){
            me.checkMovingTask.stop();
            Ext.getBody().unmask();
            if(responseObj.errorList && responseObj.errorList != null && responseObj.errorList != ''){
                var errList = [];
                var errNameList = [];
                for(var i=0;i<responseObj.errorList.length;i++){
                	var errCode = responseObj.errorList[i]["errorCode"];
		            var errName = responseObj.errorList[i]["errorName"];
		            var errormessage = Ext.clone(stringSetting.error[errCode]);

		            errList.push(errormessage);
//		            errNameList.push(errName);
                    if(errCode == 'ERR0045'){
                        break;
                    }
                }

                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetailList       : errList,
                    errorNameList         : errNameList,
                });
                me.close();
                _message.showWin();
            }else{
                if(!me.btnOkAction){
                    me.updateBtn();
                }else{
                    me.parentPanel.initParam();
                    me.close();
                }
            }
        }else{
            if(responseObj.flag == 1){
                me.checkMovingTask.stop();
                var confirm = Ext.create('PM.view.Setting.ConsoleConfirmView', {
                    parentPanel : me
                });
                var text1 = stringSetting.app_setting.message.console_wheather_move_scanner.replace('{1}',responseObj.scanner);
                confirm.sendParam(text1,stringSetting.app_setting.message.move_continue,'wheatherMove',responseObj);
                confirm.show();
            }else if(responseObj.flag == 2){
            	if(responseObj.currentNumber != responseObj.totalNumber){
	            	me.checkMovingTask.stop();
	            	me.title_select = stringSetting.app_setting.title.title_select;
	                me.startMove(responseObj,true);
	            }else{
	            	me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
	            }
            }
        }
    },
    updateBtn:function(){
        var me = this;
        if(!me.btnOkAction){
        	if(!me.cancelClicked){
            	document.getElementsByClassName("icon-button-Update-ConsoleSetting")[me.index].disabled = "disabled";
            	for(var i=0;i<me.otherMachineName.length;i++){
            		if(me.otherMachineName[i].data.machinename.toLowerCase() == me.settingMachineName.toLowerCase()){
	            		me.otherMachineName.splice(i,1);
	            		break;
	            	}
	            }

	            me.listStoreDataCompare[me.index].data.selectedflag = 'true';
	            me.listStoreDataCompare[me.index].data.machinename = me.settingMachineName;
	            me.bindAdd();
	            me.btnOk.setDisabled(false);
	            me.btnCancel.setDisabled(false);
	            me.parentPanel.initParam();
            }else{
            	document.getElementsByClassName("icon-button-Update-ConsoleSetting")[me.index].disabled = "";
            }
       }else{
               me.close();
       }
    },
    startMove : function(responseObj,isAdd){
        var me = this;
//      me.checkMovingTask.stop();
        var move_begin = new Date().getTime();
        var _name = '';
        var _scanner = '';
        var _totalNumber = 0;
        var _currentNumber = 0;
        if(responseObj){
            if(responseObj.name){
                _name = responseObj.name;
            }
            if(responseObj.totalNumber){
                _totalNumber = responseObj.totalNumber;
            }
            if(responseObj.currentNumber){
                _currentNumber = responseObj.currentNumber;
            }

            if(responseObj.scanner){
                _scanner = responseObj.scanner;
            }
        }
        me.movePro = Ext.create('PM.view.Setting.MovingConfirmView', {
            parentPanel : me,
            name:_name,
            totalNumber:_totalNumber,
            currentNumber:_currentNumber,
            scanner : _scanner,
            move_begin: move_begin,
            isAdd	  : isAdd,
            title_select   :me.title_select
        });
        me.movePro.showWin();
    },
    okOption:function(){
        var me = this;
        if(me.btnOkAction){
            var modifyConsoleStr = '';
            for(var i=0;i<me.checkMoveArray.length;i++){
                modifyConsoleStr +=  me.checkMoveArray[i].data.machinename + "," +
                                 "" + "," +
                                 me.checkMoveArray[i].data.settingname + "," +
                                 me.settingname + ',' +
                                 "move";
                if(i != me.checkMoveArray.length - 1){
                    modifyConsoleStr += "%,%";
                }
            }
            if(me.modifyParamsStrs != '' && modifyConsoleStr != ''){
                modifyConsoleStr =modifyConsoleStr + '%,%' + me.modifyParamsStrs;
            }else if(me.modifyParamsStrs != ''){
                modifyConsoleStr = me.modifyParamsStrs;
            }
        }else{
            modifyConsoleStr =   me.currentMove.data.machinename + "," +
                                 "" + "," +
                                 me.currentMove.data.settingname + "," +
                                 me.settingname + ',' +
                                 "move";
        }
        me.modifyConsoleSettingStore.requestSend({
            params:
            {
                modifyParamsStr    : modifyConsoleStr
            }
       });
    },
    setConsoleState:function(operating,flag,responseObj){
        var me = this;
        if(operating == 'continue'){
            if(flag){
                me.startMove(responseObj,false);
                me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});

            }else{
                me.setScannerMovedStore.requestSend({params:{feedback:'continue'}});
                me.checkMovingTask.start();
            }
            me.cancelClicked = false;
        }else{
            me.setScannerMovedStore.requestSend({params:{feedback:'cancel'}});
            me.cancelClicked = true;
            me.checkMovingTask.start();
        }
    },
    panelUpdate : function() {
        var me = this;
        me.tablePanel = Ext.create('Ext.panel.Panel',{
            region     :'center',
            items      : [{
                    bodyCls     : 'panel-ScrollBorder-NoPadding',
                    bodyStyle   : 'border:0;',
                    width       :572,
                    html        :me.createOreateTableHtml()
                }
            ]

        });
        /* Set in the form of northPanel*/
        me.northPanel.removeAll(true);
        if (me.option == 'edit') {
            for (var i = 0; i < this.groupStoreData.length; i++) {
                var lineData = this.groupStoreData[i];
                if (lineData.data.selectedflag) {
                    me.settingname = lineData.data.settingname;
                }
            }
            me.northPanel.add(me.createHeaderPanel(me.groupName),Ext.create('Ext.panel.Panel',{
                width     : 559,
                region    :'center',
                html      : '<table width="100%"><tr class="settingTable-Tr-single">' +
                            '<td class="settingTable-Td-value-single">'+me.settingname+'</td></tr></table>'
            }));
            me.northPanel.setHeight(85);
        }/* When adding combox set*/
    else {
            for (var i = 0; i < this.groupStoreData.length; i++) {
                var lineData = this.groupStoreData[i];
                var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
                    width       : 570,
                    height      : 32,
                    indexCombox : i,
                    checked     : lineData.data.selectedflag,
                    menuValue   : lineData.data.settingname,
                    listeners   : {
                            click : function(e){
                            if(document.getElementsByClassName("Setting-Content-Table-noselected")[0].style.display=='inherit'){
                                document.getElementsByClassName("Setting-Content-Table-noselected")[0].style.display='none';
                            }

//                          if(!me.currentItem){
//
//                          }
                            me.currentItem = this;
                            var Data = me.parentPanel.store.data.items;
                            for(var i=0; i< Data.length;i++){
                            	if(this.menuValue!=me.settingname && me.settingname != "" && Data[i].data.settingname == me.settingname){
                                    var itemCombox = me.comboxPanel.getMenu();
                                    for(var j = 0;j<itemCombox.itemEl.length;j++){
                                    	if(itemCombox.itemEl[j].menuValue == Data[i].data.settingname)
                                    	{
                                    		itemCombox.remove(itemCombox.itemEl[j]);
                                    	}
                              		}
                                    me.tablePanel.removeAll(true);
                                    me.listStoreData = [];
                                    me.listStoreData.push(new PM.model.SettingWin({
                                        'machinename' : '',
                                        'selectedflag': ''
                                    }));
                                    me.tablePanel.add({
							                    bodyCls     : 'panel-ScrollBorder-NoPadding',
							                    bodyStyle   : 'border:0;',
							                    width       :572,
							                    html        :me.createOreateTableHtml()
							                });
							        me.listStoreDataCompare = [];
							        me.listStoreDataCompare.push(new PM.model.SettingWin({
                                        'machinename' : '',
                                        'selectedflag': ''
                                    })
							        )
							        me.otherMachineName = [];
							        for(var k = 0;k < Data.length ;k++){
							        	for(var q = 0;q < Data[k].data.machinenamelist.length;q++)
							        	{
							        		me.otherMachineName.push(new PM.model.SettingWin({
					                            'machinename' : Data[k].data.machinenamelist[q],
					                            'settingname' : Data[k].data.settingname,
					                            'selectedflag': ''
			                           		}));
							        	}
							        }

							        me.checkSaveBtn();
							        //me.bindAdd();
                                    me.bindDelete();
                                    me.bindBlur();
                                    me.bindUpdate();
                                }
                            }
                        }
                    }

                });
                me.comboxPanel.getMenu().add(_item);
            }
            me.northPanel.add(me.createHeaderPanel(me.groupName),me.comboxPanel);
        }
        me.centerPanel.removeAll(true);
        me.centerPanel.add(me.createListHeaderPanel(me.listName),me.tablePanel);
    },
    /* Set the default values of comboxPanel, if for Eidt shows the chosen data, and disable comboxPanel*/
    setDefaultValue : function () {
        var me = this;
        for (var i = 0; i < this.groupStoreData.length; i++) {
           var lineData = this.groupStoreData[i];
           if (lineData.data.selectedflag) {
               me.comboxPanel.setSelectIndex(i);
           }
        }

        if (me.option == 'edit') {
            me.comboxPanel.setDisabled(true);
        }
    },

    getSettingChildList : function() {
        var inputList = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
        var listStr = '';
        for (var i = 0; i < inputList.length; i++) {
              listStr += inputList[i].value + ',';
        }
        return listStr;
    },

    bindAdd : function() {
        var me = this;
        var btnAddArr = document.getElementsByClassName("icon-button-Delete-ConsoleSetting")[0];
        btnAddArr.onclick = function() {
            //var inputArr = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
            var inputArr = Ext.fly(document.getElementsByClassName("Setting-List-Table-consol")[0]).query('input');

            me.listStoreData = new Array();
            for (var i = 0; i < inputArr.length; i++) {
                me.listStoreData[i] = new PM.model.SettingWin({
                            'machinename'     : inputArr[i].value,
                            'selectedflag'    : ''
                        });
            }
            me.listStoreData[me.listStoreData.length] = new PM.model.SettingWin({
                        'machinename'     : '',
                        'selectedflag'    : ''
                    });
            me.listStoreDataCompare[me.listStoreDataCompare.length] = new PM.model.SettingWin({
                'machinename'     : '',
                'selectedflag'    : ''
            });
            me.tablePanel.removeAll(true);

            me.tablePanel.add({
                        bodyCls        : 'panel-ScrollBorder-NoPadding',
                        bodyStyle      : 'border:0;',
                        html           : me.createOreateTableHtml()
                    });

            document.getElementsByClassName("Setting-List-Table-consol")[0].parentElement.getElementsByTagName('input')[inputArr.length].focus();


            //document.getElementById('consoleListDiv').getElementsByTagName('input')[inputArr.length].focus();
            me.checkSaveBtn();
            me.bindDelete();
            me.bindBlur();
            me.bindUpdate();
            var inputList = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
            for(var i=0;i<inputList.length;i++){
            	me.validataCurrentFun(inputList[i],inputList);
            }
            //me.validataCurrentFun(this,inputList);
            me.blurFun(inputList,me.listStoreDataCompare,me.otherMachineName);

        };
    },
    bindDelete : function() {
        var me = this;
        var btnDeleteArr =  document.getElementsByClassName("icon-button-Delete-ConsoleSetting");
        for ( var i = 1; i < btnDeleteArr.length; i++) {
            btnDeleteArr[i].onclick = function(e) {
                me.index = this.parentElement.parentElement.getAttribute('index');
                var confirm = Ext.create('PM.view.Setting.ConsoleDeleteView', {
                    parentPanel : me
                });
                confirm.sendParam(
                        stringSetting.app_setting.message.console_delete_machine_waring,
                        stringSetting.app_setting.message.delete_continue);
                confirm.show();
            };
        };
    },
    deleteOption : function(){
        var me =this;
        me.applyURL = ConsoleSettingUrl.deleteMachineNameUrl;
        if(me.option == 'add'){
            me.settingname = me.comboxPanel.getSelectValue();
        };
        if(me.listStoreDataCompare.length >0){
            me.settingMachineName = me.listStoreDataCompare[me.index].data.machinename;
        };
        if( me.settingMachineName == ''){
             me.listStoreDataCompare.splice(me.index, 1);
             var inputArr = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
             me.listStoreData = new Array();
                for (var i = 0; i < inputArr.length; i++) {
                    me.listStoreData[i] = new PM.model.SettingWin({
                                'machinename'     : inputArr[i].value,
                                'selectedflag'    : ''
                            });
                }
             me.listStoreData.splice(me.index, 1);
             me.tablePanel.removeAll(true);
             me.tablePanel.add({
                    bodyCls     : 'panel-ScrollBorder-NoPadding',
                    bodyStyle   : 'border:0;',
                    width       : 572,
                    html        : me.createOreateTableHtml()
                });
                me.bindDelete();
                me.bindBlur();
                me.bindUpdate();
                me.checkSaveBtn();
        }else{
        	me.mask();
            createMask();
            var resultstore = new Ext.data.Store({
                proxy   : new Ext.data.proxy.Ajax({
                            url         : me.applyURL,
                            reader      : {
                                type            : 'json',
                                totalProperty   : 'total',
                                root            : 'result'
                            },
                            getMethod   : function() {
                                return 'POST';
                            }
                        }),
                model   : 'PM.model.AppSetting'
            });
            resultstore.load({
                 params      : {
                     settingname    : me.settingname,
                     machinename    : me.settingMachineName
                 },
                 callback    : function(records, operation, success) {

                    var resultJson = eval("("+operation.response.responseText+")");
                    var isSucceed = resultJson["result"][0]['flag'];
                    var errCode = resultJson["result"][0]['errcode'];

                    if(!isSucceed){
                        var _message = Ext.create('PM.view.common.window.Message', {
                           errorDetail        : stringSetting.error[errCode],
                        });
                        me.close();

                        _message.OKLoad = function(){
                            me.parentPanel.panelUpdate();
                        }
                        _message.showWin();
                        clearMask();
                    }else{
                        for ( var i = 0; i < me.allMachineName.length; i++) {
                                   if (me.allMachineName[i].data.machinename.toLowerCase() == me.settingMachineName.toLowerCase()) {
                                       me.allMachineName.splice(i, 1);
                                       break;
                                 };
                          }
                        me.listStoreDataCompare.splice(me.index, 1);
                        var inputArr = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
                        me.listStoreData = new Array();
                        for (var i = 0; i < inputArr.length; i++) {
                            me.listStoreData[i] = new PM.model.SettingWin({
                                        'machinename'     : inputArr[i].value,
                                        'selectedflag'    : ''
                                    });
                        }
                        me.listStoreData.splice(me.index, 1);
                        me.tablePanel.removeAll(true);

                        me.tablePanel.add({
                                    bodyCls        : 'panel-ScrollBorder-NoPadding',
                                    bodyStyle      : 'border:0;',
                                    width          : 572,
                                    html           : me.createOreateTableHtml()
                                });
                        me.bindDelete();
                        me.bindBlur();
                        me.bindUpdate();
                        me.checkSaveBtn();
                        me.parentPanel.initParam();
                        if(me.isVisible())
                        {
                            me.unmask();
                        }
                        clearMask();
                    }
                 },
                 scope       : me
            });
        };
    },

    bindBlur : function() {
        var me = this;
        var inputList = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');
        for (var i = 0; i < inputList.length; i++) {
            inputList[i].onkeyup = function() {
                me.btnOkAction = false;
                me.validataCurrentFun(this,inputList);
                me.blurFun(inputList,me.listStoreDataCompare,me.otherMachineName);

            };
        }
    },
    blurFun : function(inputList,store,otherStore){
            var currentInput;
            for(var j=0;j<inputList.length;j++){
                currentInput = inputList[j];
                var _index = currentInput.parentElement.parentElement.getAttribute('index');

                /*if (!/^[\w\-\s]+$/.test(currentInput.value.trim()) && currentInput.value !== "") {
                    currentInput.parentElement.parentElement.getElementsByTagName('button')[0].disabled = true;
                    continue;
                }*/
                if(currentInput.value != store[_index].data.machinename ||currentInput.value === '' ){
                    currentInput.parentElement.parentElement.getElementsByTagName('button')[0].disabled = false;
                    if(store[_index].data.machinename != ''){
                        for(var i=0;i<otherStore.length;i++){
                            if(currentInput.value.toLowerCase().trim() == otherStore[i].data.machinename.toLowerCase().trim()){
                                currentInput.parentElement.parentElement.getElementsByTagName('button')[0].disabled = true;
                                currentInput.className = "Console-Setting-error-input-warning x-form-invalid-field";
                                currentInput.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50010));
                                currentInput.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                            }
                        }
                    }
                }else{

                    currentInput.parentElement.parentElement.getElementsByTagName('button')[0].disabled = true;
                }
            }
    },
    bindUpdate : function(){
        var me = this;
        var btnUpdateArr = document.getElementsByClassName("icon-button-Update-ConsoleSetting");
        for ( var j = 0; j < btnUpdateArr.length; j++) {
            btnUpdateArr[j].onclick = function(e) {
                me.btnOkAction = false;

                if(me.option == 'add') {
                    me.settingname = me.comboxPanel.getSelectValue();
                    if (me.comboxPanel.getSelectValue() == '') {
                        document.getElementsByClassName("Setting-Content-Table-noselected")[0].style.display='inherit';
                        return;
                    }
                }

                if(me.btnOk.disabled){
                    return;
                }
                me.btnOk.setDisabled(true);
                me.btnCancel.setDisabled(true);

                var settingInputElement = this.parentElement.parentElement.getElementsByTagName('input')[0];
                me.settingMachineName = settingInputElement.value.replace(/(^\s*)|(\s*$)/g, "");
                if (me.settingMachineName == '') {
                    sameFlag = true;
                    settingInputElement.className = "Console-Setting-error-input-warning x-form-invalid-field";
                    settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50009));
                    settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                    me.btnOk.setDisabled(false);
                    me.btnCancel.setDisabled(false);
                    return;
                }
                me.index =this.parentElement.parentElement.getAttribute('index');
                for( var i = 0; i<me.listStoreDataCompare.length;i++){
                    if( i == me.index ){
                        continue;
                    }
                    if( me.settingMachineName.toLowerCase() == me.listStoreDataCompare[i].data.machinename.toLowerCase() ){
                        settingInputElement.className = "Console-Setting-error-input-warning x-form-invalid-field";
                        settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50010));
                        settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                        me.btnOk.setDisabled(false);
                        me.btnCancel.setDisabled(false);
                        return;
                    };
                    /*if (!/^[\w\-\s]+$/.test(me.settingMachineName) && me.settingMachineName !== "") {
                        settingInputElement.className = "Console-Setting-error-input-warning x-form-invalid-field";
                        settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50013));
                        settingInputElement.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                        me.btnOk.setDisabled(false);
                        me.btnCancel.setDisabled(false);
                        return;
                    } */


                }
                this.disabled = true;
                var moveFlag = false;
                for ( var i = 0; i < me.otherMachineName.length; i++) {
                    if (me.otherMachineName[i].data.machinename.toLowerCase() == me.settingMachineName.toLowerCase()){
                        moveFlag = true;
                        me.currentMove = me.otherMachineName[i];
                        break;
                    }
                }
                var modifyParamsStr = '';
                if(moveFlag){
                    me.doScannerMoved();
                }else{
                    var flag = 'update';
                    if(me.listStoreDataCompare[me.index].data.machinename == ''){
                        flag = 'add';
                        modifyParamsStr = '' + ',' +
                                        me.settingMachineName + ',' +
                                        me.settingname + ',' +
                                        '' + ',' +
                                        'add';
                    }else{
                        flag = 'update';
                        modifyParamsStr = me.listStoreDataCompare[me.index].data.machinename + ',' +
                                        me.settingMachineName + ',' +
                                        me.settingname + ',' +
                                        '' + ',' +
                                        'update';
                    }
                    me.mask();
                    createMask();
                    me.modifyConsoleSettingStore.requestSend({
                        params:
                        {
                            modifyParamsStr    : modifyParamsStr
                        }
                   });
                }

            }
        }
    },
    validataCurrentFun : function(obj, inputList) {
        var sameFlag = false;
        for (var h = 0; h < inputList.length; h++) {
            if (obj.parentElement.parentElement.getAttribute('index') == h) {
                continue;
            }
            if (obj.value.toLowerCase().trim() == inputList[h].value.toLowerCase().trim()) {
                sameFlag = true;
                obj.className = "Console-Setting-error-input-warning x-form-invalid-field";
                obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50010));
                obj.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
            }
        }
        if (!sameFlag) {
            obj.className = "Console-Setting-error-input-default";
            obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip","");
            obj.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "none";
        }
        this.validataOtherFun(inputList);
        /*if (!/^[\w\-\s]+$/.test(obj.value.toLowerCase().trim()) && obj.value !== "") {
            obj.className = "Console-Setting-error-input-warning x-form-invalid-field";
            obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50013));
            obj.parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
            return;   
        }*/
    },
    validataOtherFun : function(inputList) {
        var sameFlag = false;
        var me =this;
        for (var k = 0; k < inputList.length; k++) {
        	sameFlag = false;
            if (inputList[k].value == '' && me.btnOkAction) {
                sameFlag = true;
                inputList[k].className = "Console-Setting-error-input-warning x-form-invalid-field";
                inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50009));
                inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                continue;
            }
            for (var h = 0; h < inputList.length; h++) {
                if (k == h) {
                    continue;
                }
                if (inputList[k].value.toLowerCase().trim() == inputList[h].value.toLowerCase().trim() && inputList[k].value!='') {
                    sameFlag = true;
                    inputList[k].className = "Console-Setting-error-input-warning x-form-invalid-field";
                    inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",getErrorTipMsg(stringSetting.error.ERR50010));
                    inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                    inputList[h].className = "Console-Setting-error-input-warning x-form-invalid-field";
                    inputList[h].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50010));
                    inputList[h].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                }
            }
            if (!sameFlag) {
                inputList[k].className = "Console-Setting-error-input-default";
                inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip","");
                inputList[k].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "none";
            }
        }

        /*for (var i = 0; i < inputList.length; i++) {
            if (!/^[\w\-\s]+$/.test(inputList[i].value.toLowerCase().trim())*//* && inputList[i].value !== ""*//*) {
                inputList[i].className = "Console-Setting-error-input-warning x-form-invalid-field";
                inputList[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50013));
                inputList[i].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "inherit";
                sameFlag = true;   
            }
        }*/

//      if (!sameFlag) {
//          for (var i = 0; i < inputList.length; i++) {
//              inputList[i].className = "Console-Setting-error-input-default";
//              inputList[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip","");
//              inputList[i].parentElement.parentElement.getElementsByTagName('span')[0].style.display = "none";
//          }
//      }
        return sameFlag;
    },
    sendParam : function(groupName,listName,settingIndex,settingname,option,groupScannerstore) {
        this.groupName = groupName;
        this.listName = listName;
        this.settingIndex = settingIndex;
        if (option == 'add') {
            this.url = AppSettingWinAddUrlArray[settingIndex];
            this.applyURL = ConsoleSettingUrl.addConsoleSettingUrl;
        } else {
            this.url = AppSettingWinEditUrlArray[settingIndex];
            this.applyURL = ConsoleSettingUrl.updateConsoleSettingUrl;
        }
        this.settingname = settingname;
        this.option = option;
        this.groupScannerstore = groupScannerstore;
        this.initData();
    },
/* In the screen shows the location of the Settings dialog*/
    getScrollWidth : function () {
        var noScroll, scroll, oDiv = document.createElement("DIV");
        oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
        noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = "scroll";
        scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        this.scrollWidth = noScroll-scroll + 2;
        if(navigator.userAgent.indexOf("MSIE 9")>0)
        {
           this.scrollWidth = 19;
        }
        this.setWidth(600);
        this.setHeight(380);
    },
    /* Check whether there is any change, on input set of save disabled*/
    checkSaveBtn :function(){
        var me = this;
        for(var i =0;i< me.listStoreData.length;i++){
            if(me.listStoreData[i].data.machinename.toLowerCase()!=me.listStoreDataCompare[i].data.machinename.toLowerCase()){
                document.getElementsByClassName("icon-button-Update-ConsoleSetting")[i].disabled = false;
            }
        }
        var inputList = document.getElementsByClassName("Setting-List-Table-consol")[0].getElementsByTagName('input');

        me.blurFun(inputList,me.listStoreDataCompare,me.otherMachineName);


    }

});