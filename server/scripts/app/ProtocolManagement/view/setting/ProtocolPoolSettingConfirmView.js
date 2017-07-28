/*! 
 * JS Console ConfirmView 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights 
 *  
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.Setting.ProtocolPoolSettingConfirmView
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.Setting.ProtocolPoolSettingConfirmView', {
    extend               : 'PM.view.common.window.ModalDialog',
    layout               : {
        type    : 'border'
    },
    cls                  : 'x-Confirm-window',
    bodyCls              :'x-Confirm-window-body',
    modal                : true,
    url                  : null,
    applyURL             : null,
    option               : null,
    headerText           : null,
    store                : null,
    storeData            : new Array(),
    protocolPoolName     : null,
    btnApplyConfirm      : null,
    btnCancelConfirm     : null,
    panelConfirmCenter   : null,
    panelConfirmSouth    : null,
    panelConfirmButton   : null,
    filePath             : null,
    machineName          : null,
    settingType          : null,
    parentPanel          : null,
    isAdd                : false,
    initComponent : function() {
        var me = this;
        me.title = stringSetting.app_setting.title.pool_setting;
        me.btnApplyConfirm = Ext.create('Ext.Button', {
            height         : 32,
            width          : 118,
            cls            : 'icon-button',
            overCls        : 'icon-button-over',
            pressedCls     : 'icon-button-pressed',
            focusCls       : 'icon-button-focus',
            disabledCls    : 'icon-button-disable',
            text           : '<span class="SpanTextView">'+ stringSetting.app_setting.button.apply + '<span>',
            disabled       : false,
            
            handler        : function() {
                if (!me.protocolInfoValidation()) {
                    return;
                }
                 function inputTrim(str)
                 { 
      	               return str.replace(/(^\s*)|(\s*$)/g, "");
  	             }
                var resultstore = new Ext.data.Store({
                                  proxy    :   new Ext.data.proxy.Ajax({
                                        url            : me.applyURL,
                                        reader         : {
                                            type            : 'json',
                                            totalProperty   : 'total',
                                            root            : 'result'
                                        },
                                        getMethod      : function() {
                                            return 'POST';
                                        }
                                  }),
                                  model    :    'PM.model.AppSetting'
                        });
                resultstore.load({
                            params    : {
                                        protocolpoolname  : Ext.get('protocolpool_name_text')==null?'':Ext.get('protocolpool_name_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        vendor            : Ext.get('protocolpool_vendor_text')==null?'':Ext.get('protocolpool_vendor_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        modality          : Ext.get('protocolpool_modality_text')==null?'':Ext.get('protocolpool_modality_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        systemname        : Ext.get('protocolpool_systemname_text')==null?'':Ext.get('protocolpool_systemname_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        modelname         : me.getModelName(),
                                        xraymod           : Ext.get('protocolpool_xraymod_text')==null?'':Ext.get('protocolpool_xraymod_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        softwareversion   : Ext.get('protocolpool_softwareversion_text')==null?'':Ext.get('protocolpool_softwareversion_text').dom.value.replace(/(^\s*)|(\s*$)/g, ""),
                                        eptype            : Ext.get('protocolpool_ep_type_value')==null?'':Ext.get('protocolpool_ep_type_value').dom.value,
                                        option            : me.option
                            },
                            callback : function(records, operation, success){
                                var errormessage = '';
                                var restoreFlag = records[0].data.flag;
                                if (restoreFlag){
                                    me.close();
                                    me.parentPanel.initParam();
                                } else {
                                    if( records[0].data.errcode === "ERR0045" ) {
                                        var errormessage = Ext.clone(stringSetting.error.ERR0045);

                                        var _message = Ext.create('PM.view.common.window.Message', {
                                            errorDetailList: [errormessage],
                                            errorNameList: []
                                        });

                                        _message.showWin();
                                        return;
                                    }
                                    if( records[0].data.errcode != "" ){
                                        me.close();
                                         var _message = Ext.create('PM.view.common.window.Message', {
                                             errorDetail        : stringSetting.error[records[0].data.errcode],
                                          });
                                        _message.OKLoad = function(){
                                            me.parentPanel.panelUpdate();
                                        }
                                        _message.showWin();
                                        return;
                                    }else{
                                        
                                        var errorMessage =records[0].data.request;
                                        if (errorMessage == 'sameerr'){
                                            me.close();
                                             var _message = Ext.create('PM.view.common.window.Message', {
                                                 errorDetail        : stringSetting.error.ERR50025,
                                              });
                                            _message.showWin();
                                            return;
                                        }else if(errorMessage =="repeaterr"){
                                         me.errorTip(getErrorTipMsg(stringSetting.error.ERR50024));
                                            return;
                                        }
                                        var _message = Ext.create('PM.view.common.window.Message', {
                                             errorDetail        : errormessage,
                                          });
                                        _message.showWin();
                                        return;                                      
                                       }
                                        
                                    }
                                    
                                    
                                 },
                             scope : me
                        });
            }
        });

        me.btnCancelConfirm = Ext.create('Ext.Button', {
                    height         : 32,
                    width          : 118,
                    cls            : 'icon-button',
                    overCls        : 'icon-button-over',
                    pressedCls     : 'icon-button-pressed',
                    focusCls       : 'icon-button-focus',
                    disabledCls    : 'icon-button-disable',
                    text           : '<span class="SpanTextView">'+stringSetting.app_setting.button.cancel+'<span>',
                    disabled       : false,
                    handler        : function() {
                        me.close();
                    }
                });

        me.panelConfirmButton = Ext.create('Ext.panel.Panel', {
                    region        : 'south',
                    height        : 60,
                    minHeight     : 60,
                    maxHeight     : 60,
                    layout        : 'fit',
                    cls           : 'panel-NoborderPadding',
                    bodyCls       : 'button-Color-NoborderPadding',
                    layout        : {
                            type        : 'hbox',
                            padding     : '0 0 0 0',
                            align       : 'middle',
                            pack        : 'end'
                    },
                    defaults      : {
                            padding     : '0 0 0 0',
                            margins     : '0 8 0 0'
                    },
                    items        : [{
                            id          : 'validation_panel_id',
                            html        : '<div id="validationid"><div>',
                            width       : 200,
                            height      : 20,
                            bodyStyle   : 'background-color:#D1DFF5;border:0;float:rigth;'
                    },me.btnApplyConfirm, me.btnCancelConfirm]
                });
        me.panelConfirmCenter = Ext.create('Ext.panel.Panel', {
                    region         : 'center',
                    baseCls        : 'x-plain',
                    bodyCls        : 'panel-comfirm-center',
                    bodyPadding    : 12,
                    border         : 1,
                    defaults       : {
                            frame    : false
                    },
                    html           : ''
                });

        Ext.applyIf(this, {
                    items    : [me.panelConfirmCenter, me.panelConfirmButton]
                });
        this.callParent(arguments);
    },
    
    inputTrim : function(str)
    { 
      	return str.replace(/(^\s*)|(\s*$)/g, "");
  	},

    initTableHtml : function() {
        var _array = new Array();
        _array.push('<table class="Setting-List-Table-win-head"><thead><tr><td class="start">'+stringSetting.app_setting.column.key+'</td><td class="value">'+stringSetting.app_setting.column.value+'</td><td class="warning">&nbsp</td><td class="start end">'+stringSetting.app_setting.column.description+'</td></tr></thead></table>');
        
        var _readonlyStyle = 'readonly style="background-color:#F8FAFC;border:0px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;"';
        
        _array.push('<table class="Setting-List-Table-win" id="id_table_setting_list">');
        _array.push('<thead><tr class="even" index="0"><td class="start">'+stringSetting.app_setting.label.name+'</td><td id="protocolpool_name"><input class="Setting-error-input-default" onKeyPress="keyPressSpelChar(this);" onchange="cleanSpelChar(this)" type="text" id="protocolpool_name_text" ');
        _array.push((this.option == "edit" ? _readonlyStyle : ''));
        var _proName = this.storeData[0].get("protocolpoolname");
        if(getStringRealWidth('13pt',_proName) > 250){
            _array.push(" data-qtip='"+_proName+"'");
        }
        _array.push(' value="');
        _array.push(_proName);
        _array.push('"/></td><td class="warning"><span id="protocolpool_name_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.name_desc+'</td></tr></thead>');
        _array.push('<tbody style="cursor:normal;"><tr class="odd" index="1"><td class="start">'+stringSetting.app_setting.label.vendor+'</td><td id="protocolpool_vendor"><input class="Setting-error-input-default" type="text" id="protocolpool_vendor_text" value="');
        _array.push(this.storeData[0].get("vendor"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_vendor_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.vendor_desc+'</td></tr>');
        _array.push('<tr class="even" index="2"><td class="start">'+stringSetting.app_setting.label.modality+'</td><td id="protocolpool_modality"><input class="Setting-error-input-default" type="text" id="protocolpool_modality_text" value="');
        _array.push(this.storeData[0].get("modality"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_modality_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.modality_desc+'</td></tr>');
        _array.push('<tr class="odd" index="3"><td class="start">'+stringSetting.app_setting.label.system_name+'</td><td id="protocolpool_systemname"><input class="Setting-error-input-default" type="text" id="protocolpool_systemname_text" value="');
        _array.push(this.storeData[0].get("systemname"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_systemname_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.system_name_desc+'</td></tr>');
        _array.push('<tr class="even" index="4"><td class="start">'+stringSetting.app_setting.label.model_name+'</td><td id="protocolpool_modelname"><input class="Setting-error-input-default" type="text" id="protocolpool_modelname_text" value="');
        _array.push(this.storeData[0].get("modelname"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_modelname_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.model_name_desc+'</td></tr>');
        _array.push('<tr class="odd" index="5"><td class="start">'+stringSetting.app_setting.label.x_ray_mode+'</td><td id="protocolpool_xraymod"><input class="Setting-error-input-default" type="text" id="protocolpool_xraymod_text" value="');
        _array.push(this.storeData[0].get("xraymode"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_xraymod_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.x_ray_mode_desc+'</td></tr>');
        _array.push('<tr class="even" index="6"><td class="start">'+stringSetting.app_setting.label.software_version+'</td><td id="protocolpool_softwareversion"><input class="Setting-error-input-default" type="text" id="protocolpool_softwareversion_text" value="');
        _array.push(this.storeData[0].get("softwareversion"));
        _array.push('"/></td><td class="warning"><span id="protocolpool_modelname_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="end">'+stringSetting.app_setting.label.software_version_desc+'</td></tr>');
        var eptype = this.storeData[0].get("eptype");
        _array.push('<tr class="odd" index="7"><td class="endline start">'+stringSetting.app_setting.label.ep_type+'</td><td class="endline" id="protocolpool_ep_type">' +
            '<select id="protocolpool_ep_type_value" style="width:250px;height:35px;">');
        if (eptype === '0') {
            _array.push('<option value="0" selected = "selected">' + stringSetting.app_setting.label.anatomical_landmark + '</option>' +
                '<option value="1">' + stringSetting.app_setting.label.standard +
                '</option><option value="2">' + stringSetting.app_setting.label.anatomical_landmark_plus + '</option>');
        } else if (eptype === '1') {
            _array.push('<option value="0">' + stringSetting.app_setting.label.anatomical_landmark + '</option>' +
                '<option value="1" selected = "selected">' + stringSetting.app_setting.label.standard +
                '</option><option value="2">' + stringSetting.app_setting.label.anatomical_landmark_plus + '</option>');
        } else if (eptype === '2') {
            _array.push('<option value="0">' + stringSetting.app_setting.label.anatomical_landmark + '</option>' +
                '<option value="1">' + stringSetting.app_setting.label.standard +
                '</option><option value="2" selected = "selected">' + stringSetting.app_setting.label.anatomical_landmark_plus + '</option>');
        } else {
            _array.push('<option value="0" selected = "selected">' + stringSetting.app_setting.label.anatomical_landmark + '</option>' +
                '<option value="1">' + stringSetting.app_setting.label.standard +
                '</option><option value="2">' + stringSetting.app_setting.label.anatomical_landmark_plus + '</option>');
        }
        _array.push('</select>' + '</td><td class="warning endline"><span id="protocolpool_ep_type_text_warning" class="Setting-error-input-warning-icon" data-qtip="" ></span></td><td class="endline end">' +
            stringSetting.app_setting.label.ep_type_desc + '</td></tr></tbody>'+ '</table>');
        return _array.join('');
    },
    initWin : function() {
        var me = this;
        me.uploadStyle();
        if (this.settingType == "ProtocolPool") {
            me.panelConfirmCenter.removeAll(true);
            me.panelConfirmCenter.add({
                region    : 'center',
                border    : 0,
                html      : me.initTableHtml()
            });
            me.setWidth(1000);
            me.setHeight(423);
        }
    },
    initStore : function() {
        var me = this;
        me.store = new Ext.data.Store({
                    proxy    : new Ext.data.proxy.Ajax({
                            type      : 'ajax',
                            url       : me.url,
                            reader    : {
                                    type           : 'json',
                                    totalProperty  : 'total',
                                    root           : 'result'
                                }
                            }),
                    model    : 'PM.model.AppSetting'
                });
        me.store.on("load", function() {
                    me.pushStoreData();
                    me.initWin();
                    me.bindClick();
                    me.resetWinPosition();
                });
        me.store.load({
                    params    : {
                        protocolpoolname    : me.protocolPoolName
                    }
                });
    },
    pushStoreData : function() {
        var me = this;
        if ('add' == me.option) {
            me.storeData[0] = new PM.model.AppSetting({
                        'protocolpoolname'  : '',
                        'systemname'        : '',
                        'softwareversion'   : '',
                        'eptype'            : '',
                        'vendor'            : '',
                        'modality'          : '',
                        'modelname'         : '',
                        'xraymode'          : ''
                    });
        } else {
            for (var i = 0; i < me.store.getCount(); i++) {
                var lineData = me.store.getAt(i);
                if( !lineData.data.flag){
                     me.close();
                     var _message = Ext.create('PM.view.common.window.Message', {
                         errorDetail        : stringSetting.error[lineData.data.errcode],
                      });
                    _message.OKLoad = function(){
                        me.parentPanel.panelUpdate();
                    }
                    _message.showWin();
                }
                var protocolpoolname = lineData.data.protocolpoolname;
                var systemname = lineData.data.systemname;
                var softwareversion = lineData.data.softwareversion;
                var eptype = lineData.data.eptype;
                var vendor = lineData.data.vendor;
                var modality = lineData.data.modality;
                var modelname = lineData.data.modelname;
                var xraymode = lineData.data.xraymode;
                me.storeData[i] = new PM.model.AppSetting({
                            'protocolpoolname'    : protocolpoolname,
                            'systemname'          : systemname,
                            'softwareversion'     : softwareversion,
                            'eptype'              : eptype,
                            'vendor'              : vendor,
                            'modality'            : modality,
                            'modelname'           : modelname,
                            'xraymode'            : xraymode
                        });
            }
        }
    },
    uploadStyle : function() {
        this.btnApplyConfirm.disable();
    },
    bindClick : function() {
        var me = this;
        if (document.getElementById('protocolpool_name_text') != null) {
            document.getElementById('protocolpool_name_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_vendor_text') != null) {
            document.getElementById('protocolpool_vendor_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_modality_text') != null) {
            document.getElementById('protocolpool_modality_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_systemname_text') != null) {
            document.getElementById('protocolpool_systemname_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_modelname_text') != null) {
            document.getElementById('protocolpool_modelname_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_xraymod_text') != null) {
            document.getElementById('protocolpool_xraymod_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_softwareversion_text') != null) {
            document.getElementById('protocolpool_softwareversion_text').onkeyup = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
        if (document.getElementById('protocolpool_ep_type_value') != null) {
            document.getElementById('protocolpool_ep_type_value').onchange = function(e) {
                me.btnApplyConfirm.setDisabled(false);
                me.protocolInfoValidation(this);
            };
        }
    },
    protocolInfoValidation : function(obj) {
        var inputArr = this.panelConfirmCenter.getEl().query('input');
        var nullFlag = true;
        
        for (var i = 0; i < inputArr.length; i++) {
            var msgObj = stringSetting.error['ERR5000'+(i+1)];
            var tipStr = getErrorTipMsg(msgObj);
            if (null != obj) {
                var index = obj.parentElement.parentElement.getAttribute('index');
                if (index == i) {
                    if (inputArr[i].value.replace(/(^\s*)|(\s*$)/g, "") == '') {
                        inputArr[i].className = "Setting-error-input-warning x-form-invalid-field";
                        obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",tipStr);
                        obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("style","display:block");
                        nullFlag = false;
                    } else {
                        inputArr[i].className = "Setting-error-input-default";
                        obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip","");
                        obj.parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("style","display:none");
                    }
                    return;
                }
            } else {
                if (inputArr[i].value.replace(/(^\s*)|(\s*$)/g, "") == '') {
                    inputArr[i].className = "Setting-error-input-warning x-form-invalid-field";
                    inputArr[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip",tipStr);
                    inputArr[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("style","display:block");
                    nullFlag = false;
                } else {
                    inputArr[i].className = "Setting-error-input-default";
                    inputArr[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("data-qtip","");
                    inputArr[i].parentElement.parentElement.getElementsByTagName('span')[0].setAttribute("style","display:none");
                }
            }
        }
        return nullFlag;
    },
    sendParam : function(settingType, selectIndex, protocolPoolName, applyURL, option) {
        this.url = AppSettingListURLArray[selectIndex];
        this.protocolPoolName = protocolPoolName;
        this.settingType = settingType;
        this.applyURL = applyURL;
        this.option = option;
        this.initStore();
    },
    errorTip : function (result) {
        document.getElementById('protocolpool_name_text').className = "Setting-error-input-warning x-form-invalid-field";
        document.getElementById('protocolpool_name_text_warning').setAttribute("data-qtip",result);
        document.getElementById('protocolpool_name_text_warning').style.display = "block";
    },
    getModelName : function(){
        var modelName = Ext.get('protocolpool_modelname_text')==null?'':Ext.get('protocolpool_modelname_text').dom.value.replace(/(^\s*)|(\s*$)/g, "");
        var lastIndex = modelName.lastIndexOf('/');
        if(this.isAdd && lastIndex > 0){
            modelName = modelName.substring(0,lastIndex);    
        }
        return modelName;
    }
});
