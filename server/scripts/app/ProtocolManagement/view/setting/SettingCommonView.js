/*
 * ! JS setting common view 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
Ext.define('PM.view.Setting.SettingCommonView',{
    extend          :'PM.view.common.window.ModalDialog',
    layout          : {
            type     :'border' 
    },
    cls             : 'x-Confirm-window',
    northPanel      : null,
    centerPanel     : null,
    buttonPanel     : null,
    modal           : true,
    comboxPanel     : null,
    tablePanel      : null,
    
    settingType     : '',
    parentPanel     : null,
    
    settingname     : null,
    url             : null,
    store           : null,
    storeData       : new Array(),
    groupName       : null,
    listName        : null,
    groupStoreData  : new Array(),
    listStoreData   : new Array(),
    
    settingIndex    : null,
    displayingEp    : false,
    
    applyURL        : null,
    
    option          : null,
    
    initComponent : function() {
        var me = this;
        me.title=stringSetting.app_setting.title.distribution_setting;
        me.comboxPanel = Ext.create('PM.view.combox.DropdownListView',{
            width     : 522,
            region    :'center',
        });
        
        me.northPanel=Ext.create('Ext.panel.Panel',{
            region      : 'north',
            layout      : 'border',            
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'panel-Color-Padding',
            height      : 89,
            items       : [{
                    region    : 'center',
                    html      : ''
                }]
        });
        
        me.centerPanel=Ext.create('Ext.panel.Panel',{
            region      :'center',
            layout      :'border',
            cls         : 'panel-NoborderPadding',
            bodyCls     : 'grid-ColorPadding-Noborder',
            items       : [{
                    region  : 'center',
                    border  : 0,
                    html    : ''
                }]
        });
        

        me.btnApply=Ext.create('Ext.button.Button',{
            height         : 32,
            width          : 118,      
            cls            :'icon-button',
            overCls        :'icon-button-over',
            pressedCls     :'icon-button-pressed',
            focusCls       :'icon-button-focus',
            disabledCls    :'icon-button-disable',     
            text           :'<span class="SpanTextView" style="font-size:13pt;">'+ stringSetting.app_setting.button.apply + '<span>',
            handler        : function() {
                var settingname = me.settingname;
                var validationPanel = document.getElementsByClassName("button-Color-NoborderPadding")[1].firstChild.firstChild.firstChild;
                var validation = document.getElementsByClassName("Common-Setting-error-input-warning-icon")[0].parentElement.parentElement.parentElement.parentElement;
                if(me.option == 'add') {
                    settingname = me.comboxPanel.getSelectValue();                   
                    if (me.comboxPanel.getSelectValue() == '') {                  	
                        //document.getElementById("validation_panel_id").style.left='10px';
                        validationPanel.style.left='10px';
                        validation.style.display='block';
                        validationPanel.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50011));
                        validationPanel.getElementsByTagName('span')[2].innerText=stringSetting.error.ERR50011.details;
                        return; 
                    }
                }
                if (me.getSettingChildList() == '') {
                    validationPanel.style.left='10px';
                    validation.style.display='block';
                    validationPanel.getElementsByTagName('span')[0].setAttribute("data-qtip", getErrorTipMsg(stringSetting.error.ERR50012));
                    validationPanel.getElementsByTagName('span')[2].innerText=stringSetting.error.ERR50012.details;
                    return; 
                }
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
                                settingname      : settingname,
                                settingchildlist : me.getSettingChildList()
                            },
                            callback    : function(records, operation, success) {
                                me.close();
                                var resultJson = eval("("+operation.response.responseText+")");
                                var isSucceed = resultJson["result"][0]['flag'];
                                var errCode = resultJson["result"][0]['errcode'];
                                if(!isSucceed){
                                    var _message = Ext.create('PM.view.common.window.Message', {
                                         errorDetail        : stringSetting.error[errCode],
                                    });
                                    _message.OKLoad = function(){
                                        me.parentPanel.panelUpdate();
                                    }
                                    _message.showWin();
                                    return;
                                }else{
                                     me.parentPanel.initParam();
                                }
                            },
                            scope       : me
                        });
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
            }
        });
        
        me.buttonPanel=Ext.create('Ext.panel.Panel',{
            region       : 'south',
            height       : 60,
            cls          : 'panel-NoborderPadding',
            bodyCls      : 'button-Color-NoborderPadding',
            
            layout       : {
                   type      :'hbox',
                   padding   :'0 0 0 0',                
                   align     :'middle',
                   pack      :'end'
             },
            defaults    :
            {
                   padding  :'0 0 0 0',
                   margins  :'0 8 0 0'
            },
            items:[{
                        //id       : 'validation_panel_id',
                        width    : 270,
                        height   : 25,
                        html     : '<table style="height:25px;display:none;" id="validationid"><tr style="height:25px;">' +
                                   '<td><span style="display:block" class="Common-Setting-error-input-warning-icon" data-qtip="" ></span></td>'+
                                   '<td><div  class="Common-Setting-error-add-waring-default"><span style="width:240px;" data-qtip=""></span></div></td></tr></table>',
                        //bodyStyle: 'background-color:#D1DFF5;border:0;float:right;'
                        bodyCls    : 'Console-Setting-error-panel',
                    },me.btnApply,me.btnCancel]
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
        return Ext.create('Ext.panel.Header',{
            region    :'north',
            height    :30,
            title     :title,
            baseCls   :'setting-header-panel'
        });
    },
    
    createOreateTableHtml : function(_array){
        var tableArray=new Array();
        var tableHeight = 132;

        tableArray.push('<div style="height: '+tableHeight+'px;overflow-y: scroll;overflow-x: auto;"><table width=100% class="Setting-List-Table-distribution" id="setting_tableList">');
        var lineIndex = 0;
        for (var i = 0; i < this.listStoreData.length; i++) {
            var lineData = this.listStoreData[i];
            var groupIndex = lineData.groupindex;
            if(this.groupSelected != null && groupIndex != null){
                if(this.groupSelected != groupIndex){
                    continue;
                }
            }
            var _style='settingTable-Tr';
            if(lineIndex%2!=0){
                _style='settingTable-Tr-S';
            }
          
            
            tableArray.push('<tr class=');
            tableArray.push(_style);
            tableArray.push('  selelctFlag = "'+lineData.selectedflag+'">');
            tableArray.push('<td class="settingTable-Td-value">');
            tableArray.push(lineData.machinename);
            tableArray.push('</td>');
            
            tableArray.push('<td class="settingTable-Td-value">');
            tableArray.push('<img id="enable'+lineIndex+'" class="settingTable-icon" src=');
            if (lineData.selectedflag) {
                tableArray.push(CheckedImg.checkedImg);
            } else {
                tableArray.push(CheckedImg.uncheckedImg);
            }
            tableArray.push(' > ');
            tableArray.push('<span class="settingTable-iconMsg">'+stringSetting.app_setting.button.enable+'</span>');
            tableArray.push('</td>');

            tableArray.push('<td class="settingTable-Td-value">');
            tableArray.push('<img id="disable' + lineIndex
                    + '" class="settingTable-icon" selected="false" src=');
            if (!lineData.selectedflag) {
                tableArray.push(CheckedImg.checkedImg);
            } else {
                tableArray.push(CheckedImg.uncheckedImg);
            }
            tableArray.push(' > ');
            tableArray.push('<span class="settingTable-iconMsg">'+stringSetting.app_setting.button.disable+'</span>');
            tableArray.push('</td>');
            tableArray.push('</tr>');
            
            lineIndex ++;
        }
        tableArray.push('</table></div>');
        
        return tableArray.join('');
    },
    
    /* To get the data from store, save to the corresponding array, to operate*/
    pushData : function() {
    	var me = this;
        me.storeData = new Array();
        me.groupStoreData = new Array();    //Distribution Scanner
        me.listStoreData = new Array();     //Source Scanner
        for (var i = 0; i < this.store.getCount(); i++) {
            var lineData = this.store.data.getAt(i);
            var selectlist = lineData.get("selectlist");
            for (var j = 0; j < selectlist.length; j++) {
                var settingname = selectlist[j].settingname;
                var selectedflag = selectlist[j].selectedflag;
                var groupindex = selectlist[j].groupindex;
                me.groupStoreData[j] = {
                    'settingname' : settingname,
                    'selectedflag': selectedflag,
                    'groupindex'  : groupindex
                };
            }
            
            var machinenamelist = lineData.get("machinenamelist");
                for (var k = 0; k < machinenamelist.length; k++) {
                    var machinename = machinenamelist[k].machinename;
                    var selectedflag = machinenamelist[k].selectedflag;
                    var groupindex = machinenamelist[k].groupindex;
                    me.listStoreData[k] = {
                        'machinename' : machinename,
                        'selectedflag': selectedflag,
                        'groupindex'  : groupindex
                    };
                }
            }
    },
    /* Request data from the background, and stored in the store*/
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

        me.store.on("load", function() {
                    me.pushData();
                    me.panelUpdate();
                    me.show();
                    me.setDefaultValue();
                    me.bindClick();
                });
        if (me.option == 'add') {
            me.store.load();
        } else {
            me.store.load({
                params      : {settingname: me.settingname}
            });
        }
    }, 
    /* Component related data of rendering*/
    panelUpdate : function() {
        var me = this;       
        me.tablePanel = Ext.create('Ext.panel.Panel',{
            region:'center',
            items : [
                {
                    bodyStyle : 'border:0;background:#EDF0F7;',
                    html        :me.createOreateTableHtml()
                }
            ]
            
        });
        
        me.northPanel.removeAll(true);
        if (me.option == 'edit') {
            var settingname = '';
            for (var i = 0; i < this.groupStoreData.length; i++) {
                var lineData = this.groupStoreData[i];
                if (lineData.selectedflag) {
                    settingname = lineData.settingname;
                }
            }
            me.northPanel.add(me.createHeaderPanel(me.groupName),Ext.create('Ext.panel.Panel',{
                width     : 509,
                region    :'center',
                html      : '<table width="100%"><tr class="settingTable-Tr-single">' +
                            '<td class="settingTable-Td-value-single">'+settingname+'</td></tr></table>'
            }));
              me.northPanel.setHeight(89);

        } else {
            for (var i = 0; i < this.groupStoreData.length; i++) {
                var lineData = this.groupStoreData[i];
                var _item = Ext.create('PM.view.combox.ComboxMenuItemView', {
                    width         : 518,
                    height        : 32,
                    indexCombox   : i,
                    checked       : lineData.selectedflag,
                    menuValue     : lineData.settingname,
                    groupIndex    : lineData.groupindex,
                    listeners     :{
                        click : function(e){
                        	var validation = document.getElementsByClassName("Common-Setting-error-input-warning-icon")[0].parentElement.parentElement.parentElement.parentElement;
                            if(validation.style.display=='block'){
                                validation.style.display='none';
                            }
                            me.groupSelected = this.groupIndex;
                            me.tablePanel.removeAll(true);
                            
                            me.tablePanel.add({
                                //bodyStyle   : 'border:0;',
                                region      : 'center',
                                html        : me.createOreateTableHtml(),
                            });
                            me.bindClick();
                        }
                    }
                });
                me.comboxPanel.getMenu().add(_item);
            }
            me.northPanel.add(me.createHeaderPanel(me.groupName),me.comboxPanel);
        }
        me.centerPanel.removeAll(true);
        me.centerPanel.add(me.createHeaderPanel(me.listName),me.tablePanel);
    },
    /* Set the default values of comboxPanel, if for Eidt shows the chosen data, and disable comboxPanel*/
    setDefaultValue : function () {
        var me = this;
        for (var i = 0; i < this.groupStoreData.length; i++) {
           var lineData = this.groupStoreData[i];
           if (lineData.selectedflag) {
               me.comboxPanel.setSelectIndex(i);
           }
        }
        
        if (me.option == 'edit') {
            me.comboxPanel.setDisabled(true);
        }
    },
    bindClick : function () {
    	var me = this;
    	var trList = document.getElementsByClassName("Setting-List-Table-distribution")[0].getElementsByTagName('tr');
        var validation = document.getElementsByClassName("Common-Setting-error-input-warning-icon")[0].parentElement.parentElement.parentElement.parentElement;
        for (var i = 0; i < trList.length; i++) {
            var tdList = trList[i].getElementsByTagName("td");
            tdList[1].onclick = function() {
                if(validation.style.display=='block'){
                    validation.style.display='none';
                }    
                    var thisTDList = this.parentElement.getElementsByTagName('td');
                    for (var k = 0; k < thisTDList.length; k++) {
                        var imgList =  thisTDList[k].getElementsByTagName('img');
                        for (var h = 0; h < imgList.length; h++) {
                            imgList[h].src = CheckedImg.uncheckedImg;
                        }
                    }
                    this.parentElement.setAttribute("selelctflag",true);
                    this.getElementsByTagName('img')[0].src = CheckedImg.checkedImg;
            };
            tdList[2].onclick = function() {
                if(validation.style.display=='block'){
                    //document.getElementById("validationid").style.display='none';
                    validation.style.display='none';
                }    
                    var thisTDList = this.parentElement.getElementsByTagName('td');
                    for (var k = 0; k < thisTDList.length; k++) {
                        var imgList =  thisTDList[k].getElementsByTagName('img');
                        for (var h = 0; h < imgList.length; h++) {
                            imgList[h].src = CheckedImg.uncheckedImg;
                        }
                    }
                    this.parentElement.setAttribute("selelctflag",false);
                    this.getElementsByTagName('img')[0].src = CheckedImg.checkedImg;
            };
        }
    },
    getSettingChildList : function() {
    	
        var trList = document.getElementsByClassName("Setting-List-Table-distribution")[0].getElementsByTagName('tr');
        var list = new Array();
        for (var i = 0; i < trList.length; i++) {
            if (trList[i].getAttribute("selelctflag") == 'true') {
                list.push(trList[i].getElementsByTagName('td')[0].innerText);
            }
        }
        
        return list.join(",");
    },
    sendParam : function(groupName,listName,settingIndex,settingname,option) {
    	var me = this;
        me.groupName = groupName;
        me.listName = listName;
        me.settingIndex = settingIndex;
        if (option == 'add') {
            me.url = AppSettingWinAddUrlArray[settingIndex];
        } else {
            me.url = AppSettingWinEditUrlArray[settingIndex];
        }
        me.settingname = settingname;
        me.option = option;
        me.applyURL = AppSettingWinApplyUrlArray[settingIndex];
        me.initData();
        me.setWidth(550);
        me.setHeight(360);
    }
});
