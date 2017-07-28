/*!
 * JS Others protocol view
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

/**
 * @class PM.view.compare.ProtocolSelect
 * @extends PM.view.common.window.ModalDialog
 * 
 * @param
 *  uid            :  selected uid,
    version        :  selected version,
    proName        :  selected proName,
    proType        :  selected proType,
    proStatus    :  selected proStatus,
    
    otherUid    :  other uid,
    otherVersion:  other version,
    otherEpName    :  other proName,
    otherProType:  other proType,
    otherStatus    :  other status,

    isleft        : flag of selected protocol is left or not,
 */
Ext.define('PM.view.compare.ProtocolSelect', {
    extend: 'PM.view.common.window.ModalDialog',
    layout: {
        type: 'border'
    },
    cls:'x-repeatSelect-window',
    minWidth     : 1024,
    minHeight     : 768,
    width         : 1024,
    height         : 768,
    resizable     : true, 
    closeAction    :'destroy',
    
    id            : 'id_window_others',

    northPanel     : null,
    centerPanel : null,
    buttonPanel : null,

    imagePanel     : null,
    protocolPanel : null,
    detailPanel : null,
    detailHeader: null,
    detailText    : null,
    
    paramsPanel : null,
    compareModeSelectPanel:null,
    btnParam    : null,

    btnOK         : null,
    btnCancel     : null,    
    parentPanel    : null,
    
    displayStore: null,
    
    store         : "Ext.data.Store",
    paramStore     : "Ext.data.Store",

    uid            : '',
    version        : '',
    epno        : '',
    proName        : '',
    proType        : '',
    proStatus    : '',
    organ        : '',
    patienttype : '',
    filepath    : '',
    otherUid    : '',
    otherVersion: '',
    otherEpNo    : '',
    otherEpName    : '',
    otherProType: '',
    otherStatus    : '',
    otherOrgan        : '',
    otherPatientType : '',
    otherFilePath:'',
    protocolOrgan:null,
    protocoleptype : '',

    isleft        :true,
    isInit        :true,
    initParam    :true,
    loadCompleted : true,
    isShowCompareMode:false,
    
    selectedUid        :'',
    selectedFilePath   : '',
    selectedVersion    :'',
    selectedProName    :'',
    selectedEPNo    :'',
    selectedProType    :'',
    selectedStatus    :'',
    selectedOrgan    :'',
    selectedPicOrgan:'',
    selectedPatientType    :'',
    
    organSelectedIndex    :0,
    
    leftArray : [],
    rightArray : [],
    initComponent : function() {
        var me = this;
        me.addListener('resize', me.fireWindowResize);
          
        me.title = stringSetting.comparison.title.selection;
        me.selectedUid=me.uid;
        me.selectedEPNo = me.epno;
        me.selectedVersion=me.version;
        me.selectedProName=me.proName;
        me.selectedProType=me.proType;
        me.selectedStatus=me.proStatus;
        me.selectedFilePath = me.filepath;
        
        
         
        me.store = new Ext.data.Store({
            model : 'PM.model.OthersProtocol',
            proxy : new Ext.data.proxy.Ajax({
                type : 'ajax',
                url :  PROCESS_PATH_GLOBAL_ACTION + 'getOtherProtocols.action',
                getMethod : function() {
                    return 'GET';
                },
                reader : {
                    type : 'json',
                }
            })
        });

        me.store.load({
            params : { 
            	filepath   :me.filepath,
                uid        :me.uid,
                epno    :me.epno,
                proname    :me.proName,
                version    :me.version,
                status    :me.proStatus,
                protype    :me.proType,
                patienttype    :me.patienttype,
                protocolorgan    :me.organ,
                organtype:'',
                rightstatus: me.otherStatus,
                eventFlag:me.eventFlag,
                protocoleptype: me.protocoleptype
            }
        });
        
        me.store.on("load",function() {
            Ext.getBody().unmask();
            if (me.store.getCount() == 1 && me.store.getAt(0).get("errorcode") != "") {
                var errCode = me.store.getAt(0).get("errorcode");

                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetail: stringSetting.error[errCode],

                });
                _message.OKLoad = function () {
                    me.parentPanel.parentPanel.doRefreshEvent();
                }
                _message.showWin();
                return;
            }

            me.showWin();
            me.updateDefaultValues();
            if (me.isInit) {
                me.FirstOthersView();
            }
            me.updateOthersView();
            me.bindClickProtocolParams();
            me.bindClickChangePic();

            me.isInit = false;
        });
        
        me.paramStore = new Ext.data.Store({
            model : 'PM.model.Param',
            proxy : new Ext.data.proxy.Ajax({
                type : 'ajax',
                url :  PROCESS_PATH_GLOBAL_ACTION + 'getParameters.action',
                getMethod : function() {
                    return 'GET';
                },
                reader : {
                    type : 'json',
                    root :'result',
                }
            })
        });
        
        me.paramStore.on("load",function(){
            
            if(me == null || me.btnOK.btnEl == null){
                return;
            }
            
            me.getParameterTable();
            
            me.bindClickParamTable();
            me.btnOK.setDisabled(true);
            me.btnParam.setDisabled(true);            
            
            if(me.isleft){
                me.compareModeSelectPanel.storeLoad(                       
                        me.selectedFilePath,                        
                        me.otherFilePath                        
                );
            }else{            
                me.compareModeSelectPanel.storeLoad( 
                        me.otherFilePath,
                        me.selectedFilePath                       
                );
            }
        });
        
        me.imagePanel = Ext.create('Ext.panel.Panel', {
            region         : 'west',
            cls            : 'panel-NoborderPadding',
            bodyCls        : 'panel-NoborderPadding',
            width          : 302,
            layout         : 'fit',
            html         : '',

        });
        
        me.protocolPanel=Ext.create('Ext.panel.Panel',{
            region        : 'center',
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'othersScrollPanel',
            html        : '',
        });

        me.northPanel = Ext.create('Ext.panel.Panel', {
            region         : 'north',
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            height         : 390,
            layout         : 'border',
            items : [
                     me.imagePanel,
                  me.protocolPanel,
            ]

        });
        var buttonText=stringSetting.comparison.button.select_scan_mode;
        var detailText=stringSetting.comparison.title.detail;
        me.btnParam = Ext.create('Ext.Button', {                                                
            height : 32,
            name : 'checkParameters',
            cls : 'icon-button-selectcomparedmode',
            overCls : 'icon-button-selectcomparedmode-over',
            pressedCls : 'icon-button-selectcomparedmode-pressed',
            disabledCls : 'icon-button-selectcomparedmode-disable',
            
            text        :'<span class="SpanTextView">'+buttonText+'<span>',
            disabled : true,
            handler : function() {
                me.chageParamPanel(me.isShowCompareMode);
            }
        });    

        me.detailText=Ext.create('Ext.panel.Panel',{
            baseCls: "othersHeaderPanel",
            region : "center",
            html : detailText,
        });
        
        me.detailHeader=Ext.create('Ext.panel.Panel', {
            region         : 'north',
            bodyCls     : 'detail-header-cls',
            height         : 34,
            layout         :'border',
            
            items        :[me.detailText,
                {
                    xtype : 'panel',
                    bodyCls : "othersButtonPanelCls",
                    region : "east",
                    width : 280,
                    layout : {
                        type : 'hbox',
                        pack  : 'end',
                    },
                    defaults : {
                        margins : '0 5 0 0'
                    },
                    items : [ me.btnParam ]
                }]
            });
        
        me.paramsPanel=Ext.create('Ext.panel.Panel',{
            id            : 'paramsPanel',
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'othersScrollPanel',
        });
            
        if(me.isleft){
            me.compareModeSelectPanel=Ext.create('PM.view.compare.ScanSelect',{
//              leftUid         : me.uid,
//              leftVersion     : me.version,
//              leftEpno        : me.epno,
//              leftEpname         : me.proName,
//              leftProType     : me.proType,
//              leftStatus         : me.proStatus,
//              leftOrgan        : me.organ,
//              leftPatientType : me.patienttype,
                leftFilePath    : me.filepath,
//              rightUid         : me.otherUid,
//              rightVersion     : me.otherVersion,
//              rightEpno        : me.otherEpNo,
//              rightEpname     : me.otherEpName,
//              rightProType     : me.otherProType,
//              rightStatus     : me.otherStatus,
//              rightOrgan         : me.otherOrgan,
//              rightPatientType : me.otherPatientType,
                rightFilePath    : me.otherFilePath
                
            });
        }else{
            me.compareModeSelectPanel=Ext.create('PM.view.compare.ScanSelect',{
//              leftUid         : me.otherUid,
//              leftVersion     : me.otherVersion,
//              leftEpno        : me.otherEpNo,
//              leftEpname         : me.otherEpName,
//              leftProType     : me.otherProType,
//              leftStatus         : me.otherStatus,
//              leftOrgan        : me.otherOrgan,
//              leftPatientType : me.otherPatientType,
                leftFilePath    : me.otherFilePath,
//              rightUid         : me.uid,
//              rightVersion     : me.version,
//              rightEpno         : me.epno,
//              rightEpname     : me.proName,
//              rightProType     : me.proType,
//              rightStatus     : me.proStatus,
//              rightOrgan         : me.organ,
//              rightPatientType: me.patienttype,
                rightFilePath    :me.filepath
            });
        }
            
        me.detailPanel=Ext.create('Ext.panel.Panel',{
            region        : 'center',
            cls            : 'panel-NoborderPadding',
            bodyCls       : 'panel-NoborderPadding',
            layout        : 'card',
            items : [me.paramsPanel,me.compareModeSelectPanel]
            });
        
        me.centerPanel = Ext.create('Ext.panel.Panel', {
            region         : 'center',
            baseCls     : 'panelNoBorder',
            layout         : 'border',
            items : [me.detailHeader,me.detailPanel]
        });

        
        me.btnOK = Ext.create('Ext.button.Button', {
            height        : 32,
            width        :118,      
            cls            : 'icon-button',
            overCls        :'icon-button-over',
            pressedCls    :'icon-button-pressed',
            focusCls    :'icon-button-focus',
            disabledCls    :'icon-button-disable',           
            text        :'<span class="SpanTextView">'+stringSetting.comparison.button.ok+'<span>',
            disabled    :true,
            handler        : function() {
                var json=me.compareModeSelectPanel.getDataJosn();
                if(me.parentPanel!=null){
                    if(me.isleft){
                        me.parentPanel.checkCompareResult(true,'left',
                                me.selectedFilePath,
                                me.otherVersion,
                                me.otherStatus,
                                me.otherFilePath,                                
                                json,me.isleft);
                    }else{
                        me.parentPanel.checkCompareResult(true,'right',
                                me.otherFilePath,
                                me.selectedVersion,
                                me.selectedStatus,
                                me.selectedFilePath,
                                json,me.isleft);
                    }
                    me.parentPanel.refrush();
                }
                me.closeWin();
            }
        });

        me.btnCancel = Ext.create('Ext.button.Button', {
            height        : 32,
            width        : 118,      
            cls            :'icon-button',
            overCls        :'icon-button-over',
            pressedCls    :'icon-button-pressed',
            focusCls    :'icon-button-focus',
            disabledCls    :'icon-button-disable',            
            text        :'<span class="SpanTextView">'+stringSetting.comparison.button.cancel+'<span>',
            disabled    :false,
            handler        : function() {                        
                me.closeWin();
            }
        });
        
        me.buttonPanel = Ext.create('Ext.panel.Panel', {
            region         : 'south',
            baseCls     : 'x-plain',
            height        : 50,

            layout : {
                type     : 'hbox',
                align     : 'right',
                pack     : 'end'
            },
            defaults : {
                padding : '0 0 0 0',
                margins : '8 8 0 0'
            },
            items         : [ me.btnOK, me.btnCancel ]
        });
        
        Ext.applyIf(me, {
            items:[
                me.northPanel,
                me.centerPanel,
                me.buttonPanel
            ]
        });
        
        me.compareModeSelectPanel.updateButtonStatus = function(){
            if(me == null || me.btnOK.btnEl == null){
                return;
            }
            me.btnParam.setDisabled(false);
            me.btnOK.setDisabled(false);
            me.loadCompleted = true;
        };    
        
        me.callParent(arguments);
    },
    
    chageParamPanel: function(showCompareMode){
        
        var buttonText=stringSetting.comparison.button.check_params;
        var detailText=stringSetting.comparison.title.scan_mode;
        this.isShowCompareMode=true;
        
        if(showCompareMode){
            buttonText=stringSetting.comparison.button.select_scan_mode;
            detailText=stringSetting.comparison.title.detail;
            this.isShowCompareMode=false;
        }
        
        this.detailText.update(detailText);
        this.btnParam.setText('<span class="SpanTextView">'+buttonText+'<span>');
        this.showComparedScanModePanel(this.isShowCompareMode);
    },    
   
    updateDefaultValues: function(){
        for(var i=0; i<this.store.getCount(); i++){
            if(this.store.getAt(i).get("uid")==this.uid
                    &&(this.store.getAt(i).get("uid").length > 0 || this.store.getAt(i).get("protocolname").trim()==this.proName)){
                if(this.isInit){
                    this.selectedPicOrgan=this.getDefaultOrgan(this.store.getAt(i).get("organ"));
                    
                    this.selectedPatientType=this.store.getAt(i).get("patienttype");
                }
                this.updateOrganSelectedIndex(this.selectedPicOrgan);
                break;
            }
        }
    },    
    
    getOtherProtocols : function(organ,isKeepSelected){
        var me = this;
        var _array = new Array();
        _array.push("<table id = 'othersProtocol-Table' width=100% >");
        othersWindowWidth=document.getElementById('id_window_others').offsetWidth;
        
        protocolCount = 0;
        this.pushData(organ);
        var _style ='';
        if(organ==null){
            for(var i=0; i<this.displayStore.length; i++){
                if(i % 2 == 0){
                    _style = "othersProtocol-Tr";
                } else{
                    _style = "othersProtocol-Tr-S";
                }
                
                if(this.checkIsSeclected(this.store.getAt(i))){
                    this.initParam=true;
                    me.getProtocolParams(i);
                    _style = "othersProtocol-Tr-Select";
                }
                
                if(this.checkIsSameProtocol(this.store.getAt(i))){
                    _style += ' same-protocol';
                }
                
                this.createProtocolTable(this.displayStore[i],i,_array,_style);
            }
        }else{
            for(var i=0; i<this.displayStore.length; i++){
                
                if(i % 2 == 0){
                    _style = 'othersProtocol-Tr';
                }  else{
                    _style = 'othersProtocol-Tr-S';
                }
                
                if(isKeepSelected&&this.checkIsSeclected(this.displayStore[i])){                        
                    this.initParam=true;
                    me.getProtocolParams(i);
                    _style = 'othersProtocol-Tr-Select';
                }
                
                if(this.checkIsSameProtocol(this.displayStore[i])){
                    _style += ' same-protocol';
                }
                
                this.createProtocolTable(this.displayStore[i],i,_array,_style);
            }
        }
        
        this.createEmptyTable(this.displayStore.length,_array);
        
        _array.push("</table>");
        
        return _array.join('');
    },
    
    // push display data
    pushData: function (organ)
        {
            this.displayStore = new Array();
            if(organ==null){
                for(var i = 0;i < this.store.getCount();i++)
                {
                    var _uid = this.store.getAt(i).get("uid");
                    var _version = this.store.getAt(i).get("version");
                    var _strType = this.store.getAt(i).get("type");
                    var _protocolname = this.store.getAt(i).get("protocolname");
                    var _status = this.store.getAt(i).get("status");
                    var _patientType = this.store.getAt(i).get("patienttype");
                    var _organ = this.store.getAt(i).get("organ");
                    var _epno = this.store.getAt(i).get("epno");
                    var _lastupddt = DateFormatByExt(new Date(this.store.getAt(i).get("lastupddt")), "Y M d H:i");
                    var _modelname = this.store.getAt(i).get("modelname");
                    var _filepath = this.store.getAt(i).get("filepath");
                    var _protocoleptype = this.store.getAt(i).get("protocoleptype");
                    
                    this.displayStore[i] = new PM.model.OthersProtocol(                         
                                    {
                                     'uid':_uid,
                                     'epno':_epno,
                                     'version':_version,
                                     'type':_strType,
                                     'protocolname':_protocolname,
                                     'status':_status,
                                     'patienttype':_patientType,
                                     'organ':_organ,
                                     'lastupddt':_lastupddt,
                                     'modelname':_modelname,
                                     'filepath':_filepath,
                                     'protocoleptype':_protocoleptype
                                 });        
                }     
            }else{
                var dataIndex=0;
                for(var i=0; i<this.store.getCount(); i++){
                    if(this.matchSelectedOrgan(this.store.getAt(i).get("organ")) || this.store.getAt(i).get("protocoleptype") === 'Service'){
                        var _uid = this.store.getAt(i).get("uid");
                         var _version = this.store.getAt(i).get("version");
                         var _strType = this.store.getAt(i).get("type");
                         var _protocolname = this.store.getAt(i).get("protocolname");
                         var _status = this.store.getAt(i).get("status");
                         var _patientType = this.store.getAt(i).get("patienttype");
                         var _organ = this.store.getAt(i).get("organ");
                        var _epno = this.store.getAt(i).get("epno");
                         var _lastupddt = DateFormatByExt(new Date(this.store.getAt(i).get("lastupddt")), "Y M d H:i");
                         var _modelname = this.store.getAt(i).get("modelname");
                         var _filepath = this.store.getAt(i).get("filepath");
                        var _protocoleptype = this.store.getAt(i).get("protocoleptype");
                
                         this.displayStore[dataIndex] = new PM.model.OthersProtocol(                         
                                         {
                                          'uid':_uid,
                                          'epno':_epno,
                                          'version':_version,
                                          'type':_strType,
                                          'protocolname':_protocolname,
                                          'status':_status,
                                          'patienttype':_patientType,
                                          'organ':_organ,
                                          'lastupddt':_lastupddt,
                                          'modelname':_modelname,
                                          'filepath':_filepath,
                                          'protocoleptype':_protocoleptype
                                      });  
                        dataIndex++;
                    }
                }
            }
        },
    
    createProtocolTable:function(protocolData,index,_array,_style){
        
        _array.push("<tr class ='");
        _array.push(_style);
        _array.push("'  dataIndex='");
        _array.push(index);
        _array.push("'>");
       
        
//      var modelStr=protocolData.get("modelname");
//      
//      _array.push("<td class='othersProtocol-td-ModelName'");
//      if(getStringRealWidth(otherTableTips,modelStr)>219){
//          _array.push(" data-qtip='"+modelStr+"'");
//      }    
//      _array.push(">");
//      _array.push(modelStr);
//      _array.push("</td>");
        
//        _array.push("<td class='othersProtocol-td-Type'>");
//        _array.push(convertSupFont(protocolData.get("type")));
//        _array.push("</td>");

        if (protocolData.get("protocoleptype") !== 'Service') {
            var _patienttype = protocolData.get("patienttype");
            _array.push("<td class='othersProtocol-td-PatientType'");
            if(getStringRealWidth(otherTableTips, _patienttype)>114){
                _array.push(" data-qtip='"+ _patienttype +"'");
            }
            _array.push(">");
            _array.push(_patienttype);
            _array.push("</td>");
        } else {
            var service = 'Service';
            _array.push("<td class='othersProtocol-td-PatientType'");
            if(getStringRealWidth(otherTableTips, service)>114){
                _array.push(" data-qtip='"+ service +"'");
            }
            _array.push(">");
            _array.push(service);
            _array.push("</td>");
        }

        
        var nameStr=protocolData.get("protocolname");
        nameStr = Ext.htmlEncode(nameStr);
        _array.push("<td class='othersProtocol-td-Name'");
        
        if(getStringRealWidth(otherTableTips,nameStr)>othersWindowWidth-scrollWidth-exceptNameWidth){
            _array.push(" data-qtip='"+nameStr+"'");
        }                    
        _array.push(">");
        _array.push(nameStr);
        _array.push("</td>");
        
        _array.push("<td class='othersProtocol-td-Version'>");
        _array.push(protocolData.get("version"));
        _array.push("</td>");
        
        _array.push("<td class='othersProtocol-td-Time'>");
        _array.push(protocolData.get("lastupddt"));
        _array.push("</td>");
        
        _array.push("</tr>");
    },
    bindClickProtocolParams:function(index){
        var me = this;
        var ProtocolTr = document.getElementById("othersProtocol-Table").getElementsByTagName("tr");
        if(ProtocolTr==undefined)
        {
            return;
        }
        for(var i=0;i<ProtocolTr.length;i++)
        {
            
            ProtocolTr[i].onclick = function(e){
                var dataIndex = e.target.parentElement.getAttribute("dataIndex");
                 if(me != null && me.loadCompleted){    
                    var protocolInfo=me.displayStore[dataIndex];
                     if (!protocolInfo) {
                         return ;
                     }
                    if(!me.initParam&&protocolInfo.get('uid')==me.selectedUid
                            &&protocolInfo.get('version')==me.selectedVersion
                            &&protocolInfo.get('protocolname')==me.selectedProName
                            &&protocolInfo.get('epno')==me.selectedEPNo
                            &&protocolInfo.get('type')==me.selectedProType
                            &&protocolInfo.get('organ')==me.selectedOrgan
                            &&protocolInfo.get('patienttype')==me.selectedPatientType
                            &&protocolInfo.get('status')==me.selectedStatus
                            &&protocolInfo.get('filepath')==me.selectedFilePath){
                        return;
                    }
                    me.loadCompleted = false;
                            
                    me.paramsPanel.update("");
                    me.btnOK.setDisabled(true);
                    me.btnParam.setDisabled(true);
                    
                    me.selectedUid=protocolInfo.get('uid');
                    me.selectedEPNo = protocolInfo.get('epno');
                    me.selectedVersion=protocolInfo.get('version');
                    me.selectedProName=protocolInfo.get('protocolname');
                    me.selectedProType=protocolInfo.get('type');
                    me.selectedStatus=protocolInfo.get('status');
                    me.selectedOrgan=protocolInfo.get('organ');
                    me.selectedPatientType=protocolInfo.get('patienttype');
                    me.selectedFilePath=protocolInfo.get('filepath');
                    if(!me.initParam){
                        me.refreshOthersProtocolTable(dataIndex);
                    }
                    me.initParam = false;
            
                    me.paramStore.load({
                        params:{uid        :me.selectedUid,
                            epno     :me.selectedEPNo,
                            proname    :me.selectedProName,
                            version    :me.selectedVersion,
                            status    :me.selectedStatus,
                            patienttype:me.selectedPatientType,
                            protocolorgan:me.selectedOrgan,
                            },
                    });
                }
            }
        }
    },
    createEmptyTable:function(userCount,_array){
        var me = this;
        var panelHeight=390;
        var emptyCount=Math.ceil(panelHeight/30)-userCount;
        
        if(emptyCount<=0){
            return;
        }
        var lastHeight=panelHeight-30*(userCount+emptyCount-1);
        
        var _style ='';
        for(var i=0; i<emptyCount; i++){
            if(userCount%2==0){
                if(i % 2 == 0){
                    _style = 'othersProtocol-Tr-empty';
                } else {
                    _style = 'othersProtocol-Tr-empty-S';
                }
            }else{
                if(i % 2 == 0){
                    _style = 'othersProtocol-Tr-empty-S';
                } else {
                    _style = 'othersProtocol-Tr-empty';
                }
            }
            
            
            _array.push("<tr class=");
            _array.push(_style);
            _array.push(" >");
            
            if(i==emptyCount-1){
               // _array.push("<td class='othersProtocol-td-ModelName' style='height:"+lastHeight+"px; border-right:1px solid #ABC0E2; '/>");
//                _array.push("<td class='othersProtocol-td-Type' style='height:"+lastHeight+"px; border-right:1px solid #ABC0E2; '/>");
                _array.push("<td class='othersProtocol-td-PatientType' style='height:"+lastHeight+"px; border-right:1px solid #ABC0E2; '/>");
                _array.push("<td class='othersProtocol-td-Name' style='height:"+lastHeight+"px; border-right:1px solid #ABC0E2; '/>");
                _array.push("<td class='othersProtocol-td-Version' style='height:"+lastHeight+"px;'/>");
                _array.push("<td class='othersProtocol-td-Time' style='height:"+lastHeight+"px;'/>");
            }else{
               // _array.push("<td class='othersProtocol-td-ModelName' />");
//                _array.push("<td class='othersProtocol-td-Type' />");
                _array.push("<td class='othersProtocol-td-PatientType' />");
                _array.push("<td class='othersProtocol-td-Name' />");
                _array.push("<td class='othersProtocol-td-Version' />");
                _array.push("<td class='othersProtocol-td-Time' />");
            }

            _array.push("</tr>");
            
        }
    },
    
    checkIsSeclected: function(data){
//      if(data.get("uid")==this.selectedUid&&
//              data.get("protocolname")==this.selectedProName&&
//              data.get("version")==this.selectedVersion&&
//              data.get("patienttype")==this.selectedPatientType&&
//              data.get("status")==this.selectedStatus){
//          return true;
//          }
        if(data.get("filepath")==this.selectedFilePath){
        	return true;
        }
        return false;
    },
    
    checkIsSameProtocol:function(data){
        if(data==null){
            return false;
        }
        if(this.uid != ""){
            if(data.get("uid")==this.uid){
                return true;
            }
        }else{
            if(data.get('epno')==this.epno){
                return true;
            }
        }
        
        return false;
    },
    FirstOthersView: function() {
        var me = this;
        var picIndex = this.getPicIndexByOrgan(this.selectedPicOrgan);
        var imgName = organImages[picIndex];

        if (this.isInit) {
            var imgStr = '';
            var patienttype = this.store.data.items[0].data.patienttype;
            if (patienttype === "Adult" || patienttype ===  "Trauma_Adult") {
                imgStr = '<img id="organImg" style="width:302px;" src=' + adultImgFloder + imgName + ' " / >';
            } else if (patienttype === "Child") {
                imgStr = '<img id="organImg" style="width:302px;" src=' + childImgFloder + imgName + ' " / >';
            }
            this.imagePanel.update(imgStr);
        }
    },
    updateOthersView : function() {
        var me = this;
        var picIndex = this.getPicIndexByOrgan(this.selectedPicOrgan);
        var imgName = organImages[picIndex];

        if (this.isInit) {
            var protocoleptype = me.store.data.items[0].data.protocoleptype;
            if (protocoleptype !== 'Service') {
                var imgStr = '';
                var patienttype = this.store.data.items[0].data.patienttype;

                if (patienttype === "Adult" || patienttype === "Trauma_Adult") {
                    imgStr = '<img id="organImg" style="width:302px;" src=' + adultImgFloder + imgName + ' " / >';
                } else if (patienttype === "Child") {
                    imgStr = '<img id="organImg" style="width:302px;" src=' + childImgFloder + imgName + ' " / >';
                }
                imgStr = imgStr + me.updateImgCursor();
                this.imagePanel.update(imgStr);
            } else {
                this.imagePanel.update('<div style="width:302px;height:392px;background-color:#ebf1fa"></div>');
            }
        }

        this.protocolPanel.update(this.getOtherProtocols(this.selectedPicOrgan, true));
    },
    getPicIndexByOrgan: function(organ){
        for(var i=0;i<organArray.length;i++){
            if(organArray[i] == organ){
                return i;
            }
        }
        return 0;
    },
    
    showComparedScanModePanel:function(isShow){            
        var active=0;
        if(isShow){
            active=1;
        }
        var layout = this.detailPanel.getLayout();
        layout.setActiveItem(active);
    },
    
    getParameterTable:function(){
        var me = this;
        
        var paramTable=new Array();
        paramTable.push("<table width=100% id='parameterTable' cellpadding='0' cellspacing='0'>");
        
        recordStr="";
        idFlag=0;
        
        var paraItem = this.paramStore.getAt(0);
        var errCode = paraItem.get("errorcode");
        if( errCode != ""){
            var _message = Ext.create('PM.view.common.window.Message', {
               errorDetail        : stringSetting.error[errCode],
               
            });
            _message.OKLoad = function(){
                me.parentPanel.parentPanel.doRefreshEvent();
                me.closeWin();
            }
            _message.showWin();
            return;
        }
        var paramResult = paraItem.get("result");
        
        
        for(var j = 0; j < paramResult.length; j++){
            var paramRe = paramResult[j];
            var paramList = paramRe["paramlist"];
            if(paramList == null ||paramList.length == 0) {
                continue;
            }
            var rootId=idFlag;
            
            var paramType = paramRe["paramtype"];
            if(paramRe["displaytype"] != null && paramRe["displaytype"] != '') {
                paramType = paramRe["displaytype"];
            }
            
            me.getParentTrHTML(paramTable,idFlag,0,paramType);
            
            paramTable.push(me.getparamListHtml(paramRe["paramtype"],paramList));
            
            recordStr+=rootId+","+idFlag+","+false+";";
            idFlag++;
        }
            
        paramTable.push("<tr id='emptyParamTr'>");
        recordArray=recordStr.split(";");
        paramTable.push("</table>");
        
        if(this.paramsPanel.body != null){
            this.paramsPanel.body.dom.scrollTop=0;    
        }
        this.paramsPanel.update(paramTable.join(''));
        
        me.createParamEmptyTable();
        me.refreshParamTable();
        
    },
    
    refreshOthersProtocolTable:function(dataIndex){
        var othersTable=document.getElementById("othersProtocol-Table");

        
        if(othersTable!=null){
            var _style ='';
            for(var i=0; i < this.displayStore.length; i++){
                var protocolData = this.displayStore[i];
                
                if(i % 2 == 0){
                    _style = "othersProtocol-Tr";
                } else{
                    _style = "othersProtocol-Tr-S";
                }
                
                if(i==dataIndex){
                    _style = "othersProtocol-Tr-Select";
                }
                if(this.checkIsSameProtocol(protocolData)){
                    _style += " same-protocol";
                }
                
                othersTable.rows[i].className=_style;                
            }    
        }
    },
    
    // reset table tips when window resize
    fireWindowResize:function(win, width, height){
    var me= this;
        // reset protocol name tips        
        var windowWidthTemp=document.getElementById('id_window_others').offsetWidth;
        if(othersWindowWidth == windowWidthTemp){
            me.createParamEmptyTable();
            return;
        }else {
            othersWindowWidth = windowWidthTemp;
        }

        nameColWidth = othersWindowWidth - scrollWidth - exceptNameWidth;
        
        var othersTable=document.getElementById('othersProtocol-Table');
        if(othersTable!=null){
            for(var i = 0;i < this.displayStore.length;i++)
            {
                var nameStr = othersTable.rows[i].cells[3].textContent;
                if(getStringRealWidth(otherTableTips,nameStr)>nameColWidth){
                    othersTable.rows[i].cells[3].setAttribute("data-qtip",nameStr);
                }else{
                    othersTable.rows[i].cells[3].removeAttribute("data-qtip");
                }
            }
        }

        // reset parameter table tips
        me.updateParamTableTips();

        
    },
    
    // update organ index
    updateOrganSelectedIndex:function(organName){
        if(organName!=""){
            for(var i=0;i<organArray.length;i++){
                if(organArray[i]==organName){
                    this.organSelectedIndex=i;
                    break;
                }
            }
        }
    },
    
    getDefaultOrgan:function(organName){
        
        for(var i=0;i<organArray.length-1;i++){
            if(organArray[i]==organName){
                return organName;
            }
        }
        
        return organArray[8];
    },
    
    //match selected organ with protocol organ
    matchSelectedOrgan:function(organ){
        if(organ == this.selectedPicOrgan){
            return true;
        }
        
        return false;
    },
    getparamListHtml:function(paraType,paramList){
        var me = this;
        var paramListHtml="";
        if(paramList!=null){
            switch(paraType){
            case ParameterTag.ScanList:
                paramListHtml=me.getScanListHtml(paramList);
                break;
            case ParameterTag.SureIQList:
                paramListHtml = me.getSureParamListHtml(paramList, true);
                break;
            case ParameterTag.SureExposureList:
                paramListHtml = me.getSureParamListHtml(paramList, false);
                break;
            case ParameterTag.ContrastPresetList:
                paramListHtml=me.getContrastListHtml(paramList);
                break;
            case ParameterTag.VoicePresetList:
                paramListHtml=me.getVoicePresetListHtml(paramList);
                break;
            default:
                paramListHtml=me.getDefaultListHtml(paramList);
                break;
            }
        }
    
        return paramListHtml;
    },
    getVoicePresetListHtml:function(paramList)
    {
        var me =this;
        var VoiceParamHtml = [];
        var rootId = idFlag;
        var language = "";
        paramList = me.sortParamList(paramList);
        for(var i = 0;i < paramList.length;i++)
        {
            var level = 2;
            if(paramList[i]["language"] != language){
                level = 1;
                idFlag++;
                language = paramList[i]["language"];
                me.getParentTrHTML(VoiceParamHtml, idFlag, level, language);
                level++;
                rootId = idFlag;
            }
            idFlag++;
            var sureId = idFlag;
            var nameValue=paramList[i]["name"];
            me.getParentTrHTML(VoiceParamHtml, idFlag, level, nameValue);
            var parameterList = paramList[i]["parameterList"];
            VoiceParamHtml.push(me.getParamters(parameterList, level));
            recordStr+=sureId+","+idFlag+","+false+";";
            if(paramList[i+1]!=null && paramList[i+1]["language"] != language){
                recordStr+=rootId+","+idFlag+","+false+";";
            } else if (paramList[i+1]==null) {
                recordStr+=rootId+","+idFlag+","+false+";";
            }
        }
        return VoiceParamHtml.join('');
    },
    getScanListHtml:function(paramList){
        var me =this;
        var scanHtml=new Array();
        for(var i=0;i<paramList.length;i++){
            idFlag++;
            var subRootId=idFlag;
            var level=1;
            var scanName = paramList[i]["name"];
            me.getParentTrHTML(scanHtml,idFlag,level,scanName);
    
            // add scan parameter list
            var scanParams = paramList[i]["scanParameter"];
            
            if(scanParams!=null){        
                var scanParamName = scanParams["name"];
                if(scanParams["display"] != null && scanParams["display"] != ''){
                    scanParamName = scanParams["display"];
                }
                
                idFlag++;
                var scanRootId=idFlag;
                level++;
                
                me.getParentTrHTML(scanHtml,idFlag,level,scanParamName);
                
                var scanParamList=paramList[i]["scanParameter"]["scanParameterList"];
                scanHtml.push(me.getParamters(scanParamList,level));
                recordStr+=scanRootId+","+idFlag+","+false+";";
            
            }
            
            // add recon mode list
            var reconParams=paramList[i]["reconParameter"];
            if(reconParams!=null){
                var reconParamList=reconParams["reconParameters"];
                var reconName = reconParams["name"];
                if(reconParams["display"] != null && reconParams["display"] != ''){
                    reconName = reconParams["display"];
                }
                
                idFlag++;
                var reconRootId=idFlag;
                
               me.getParentTrHTML(scanHtml,idFlag,level,reconName);
                
                scanHtml.push(me.getRecursiveParameterHtml(reconParamList,level));
                recordStr+=reconRootId+","+idFlag+","+false+";";
            }
            
            // add roi setup list
            var roiParams = paramList[i]["roiSetupParameter"];
    
            if(roiParams!=null){
                
                var roiName = roiParams["name"];
                if(roiParams["display"] != null && roiParams["display"] != ''){
                    roiName = roiParams["display"];
                }
                
                idFlag++;
                var roiId=idFlag;
                var level=2;
                
                me.getParentTrHTML(scanHtml,idFlag,level,roiName);
                    
                var rioParamList=roiParams["parameterList"];
                
                if(rioParamList!=null){
                    
                    scanHtml.push(me.getParamters(rioParamList,level));
                }
                
                var rioGroupParamList=roiParams["subGroupParameters"];
                
                if(rioGroupParamList!=null){
                    scanHtml.push(me.getRecursiveParameterHtml(rioGroupParamList,level));
                }
                recordStr+=roiId+","+idFlag+","+false+";";
            }
            recordStr+=subRootId+","+idFlag+","+false+";";
        }
        return scanHtml.join('');
    },
    getSureParamListHtml:function(paramList, isSureIQ){
        var me =this;
        var sureParamHtml=new Array();
        var paramOrgan ='';     
        var rootId = idFlag;
        
        paramList = me.sortParamList(paramList);
        for(var i=0;i<paramList.length;i++){
            var level=2;
            
            if(paramList[i] != null && paramList[i]["patientType"]!=null && paramList[i]["organ"] != paramOrgan){
                level=1;
                
                idFlag++;
                paramOrgan = paramList[i]["organ"];
                
                var trValue = "";
                if(isSureIQ != null && isSureIQ)
                {
                    paramList[i]["patientType"] = paramList[i]["organ"];
                }
                else
                {
                    paramList[i]["patientType"] = paramList[i]["patientType"] + "_" + paramList[i]["organ"];
                }            
                trValue = paramList[i]["patientType"];
                me.getParentTrHTML(sureParamHtml,idFlag,level,trValue);
                
                level++;
                rootId = idFlag;
            }
                
            idFlag++;
            var sureId=idFlag;
    
            var nameValue=paramList[i]["name"];
            
            me.getParentTrHTML(sureParamHtml,idFlag,level,nameValue);
            
            var parameterList=paramList[i]["parameterList"];
            sureParamHtml.push(me.getParamters(parameterList,level));
            
            recordStr+=sureId+","+idFlag+","+false+";";
            if(paramList[i+1]!=null && paramList[i+1]["organ"] != paramOrgan){
                recordStr+=rootId+","+idFlag+","+false+";";    
            } else if (paramList[i+1]==null) {
                recordStr+=rootId+","+idFlag+","+false+";";    
            }
        }
        return sureParamHtml.join('');
    },
    getContrastListHtml:function(paramList){
        var me =this;
        var constrastHtml=new Array();;
        for(var i=0; i<paramList.length;i++){
            var level=1;
            idFlag++;
            var subRootId=idFlag;
            var trValue=paramList[i]["patientType"]==null?paramList[i]["name"]:paramList[i]["patientType"]+"_"+paramList[i]["name"];
            
            me.getParentTrHTML(constrastHtml,idFlag,level,trValue);
            
            var subParamsList=paramList[i]["parameters"];
            if(subParamsList!=null){
                constrastHtml.push(me.getRecursiveParameterHtml(subParamsList,level));
            }
            recordStr+=subRootId+","+idFlag+","+false+";";
        }
        return constrastHtml.join('');
    },
    getDefaultListHtml:function(paramList){
        var me =this;
        var defaultListHtml=new Array();;
        for(var i=0; i<paramList.length;i++){
            var subRootId=idFlag;
            var level=0;
            var subParamsList=paramList[i]["parameters"];
            if(subParamsList!=null){
                defaultListHtml.push(me.getDefaultListParamters(subParamsList,level));
            }
            recordStr+=subRootId+","+idFlag+","+false+";";
        }    
        return defaultListHtml.join('');
    },
    getParentTrHTML : function(_array,idFlag,level,value){
        var me = this;
        _array.push("<tr id= param");
        _array.push(idFlag);
        _array.push(" ><td class='param_key param_parent_td level");
        _array.push(level);
        _array.push("' level= ");
        _array.push(level);
        _array.push(" hasimg=true ");
        _array.push(me.getParamsTips(value,level,true,true));
        _array.push(" idFlag='");
        _array.push(idFlag);
        _array.push("'><img class='arrowImg' id= img");
        _array.push(idFlag);
        _array.push(" src=");
        _array.push(unFoldImg);
        _array.push(">");
        _array.push(value);
        _array.push("</td><td class='param_value'></td></tr>");
    },
    bindClickParamTable : function(){
        var me = this;
            var ParamTd = document.getElementById("parameterTable").getElementsByTagName("td");
            if(ParamTd.length == 0)
            {
                return;
            }
            for(var i=0;i<ParamTd.length;i++)
            {            
                if(ParamTd[i].getAttribute("idFlag")){
                    ParamTd[i].onclick = function(e){
                        if(e.target.getAttribute("idFlag")){
                            var id=e.target.getAttribute("idFlag");
                        }
                        if(e.target.parentElement.getAttribute("idFlag")){ 
                            var id=e.target.parentElement.getAttribute("idFlag");
                        }
                        for(var i=0;i< recordArray.length;i++){
                            var item=recordArray[i].split(",");    
                            if(item[0]==id){
                                // fold or upfold
                                if(item[2]=="true"){// node is folded before
                                    me.collapseRows(item[0],item[1],false);
                                    recordArray[i]=recordArray[i].replace("true","false");
                                }else{// node is unfold
                                    me.collapseRows(item[0],item[1],true);
                                    recordArray[i]=recordArray[i].replace("false","true");
                                    }            
                                break;
                                }
                            }
                        
                            me.refreshParamTable();
                            me.createParamEmptyTable();
                        }
                    }
                }
            },
    getParamters:function(paramList,level) {
        var me = this;
        var paramListHtml = new Array();
        if (paramList != null) {
            level++;
            for (var i = 0; i < paramList.length; i++) {
                idFlag++;
                var nodeName = paramList[i]["name"];
                if (paramList[i]["display"] != null && paramList[i]["display"] != '') {
                    nodeName = paramList[i]["display"];
                }
                paramListHtml.push("<tr id= param");
                paramListHtml.push(idFlag);
                paramListHtml.push("><td class='param_key level");
                paramListHtml.push(level);
                paramListHtml.push("' level= ");
                paramListHtml.push(level);
                paramListHtml.push(" hasimg=false ");
                paramListHtml.push(me.getParamsTips(nodeName, level, true, false));
                paramListHtml.push(">");
                paramListHtml.push(nodeName);
                paramListHtml.push("</td><td class='param_value'");
                paramListHtml.push(me.getParamsTips(paramList[i]["value"], level, false, false));
                paramListHtml.push(">");
                paramListHtml.push(paramList[i]["value"]);
                paramListHtml.push("</td></tr>");
            }
        }
        return paramListHtml.join('');
    },
    getDefaultListParamters:function(paramList,level) {
        var me = this;
        var paramListHtml = new Array();
        if (paramList != null) {
            level++;
            for (var i = 0; i < paramList.length; i++) {
                idFlag++;
                if (!paramList[i]["groupName"]) {
                    var nodeName = paramList[i]["name"];
                    if (paramList[i]["display"] != null && paramList[i]["display"] != '') {
                        nodeName = paramList[i]["display"];
                    }
                    paramListHtml.push("<tr id= param");
                    paramListHtml.push(idFlag);
                    paramListHtml.push("><td class='param_key level");
                    paramListHtml.push(level);
                    paramListHtml.push("' level= ");
                    paramListHtml.push(level);
                    paramListHtml.push(" hasimg=false ");
                    paramListHtml.push(me.getParamsTips(nodeName, level, true, false));
                    paramListHtml.push(">");
                    paramListHtml.push(nodeName);
                    paramListHtml.push("</td><td class='param_value'");
                    paramListHtml.push(me.getParamsTips(paramList[i]["value"], level, false, false));
                    paramListHtml.push(">");
                    paramListHtml.push(paramList[i]["value"]);
                    paramListHtml.push("</td></tr>");
                } else {
                    var temp = me.getDefaultListRecursiveParameterHtml(paramList[i], level)
                    paramListHtml.push(temp);
                }
            }
        }
        return paramListHtml.join('');
    },
    getRecursiveParameterHtml:function(paramList,level) {
        var me = this;
        var paraHtml = new Array();
        level++;
        if (paramList != null) {
            for (var i = 0; i < paramList.length; i++) {
                idFlag++;
                var subId = idFlag;
                var subparamList = paramList[i];

                var groupName = subparamList["groupName"];
                if (subparamList["groupDisplay"] != null && subparamList["groupDisplay"] != '') {
                    groupName = subparamList["groupDisplay"];
                }

                if (subparamList["groupValue"] != null && subparamList["groupValue"] != '') {
                    groupName = subparamList["groupValue"];
                }

                me.getParentTrHTML(paraHtml, idFlag, level, groupName);

                paraHtml.push(me.getParamters(subparamList["parameters"], level));
                subGroupList = subparamList["subGroupParameters"];
                if (subGroupList != null && subGroupList.length > 0) {
                    paraHtml.push(me.getRecursiveParameterHtml(subGroupList, level));
                }
                recordStr += subId + "," + idFlag + "," + false + ";";
            }
        }
        return paraHtml.join('');
    },
    getDefaultListRecursiveParameterHtml:function(paramList,level) {
        var me = this;
        var paraHtml = new Array();
        if (paramList != null) {
            var subId = idFlag;
            var subparamList = paramList;

            var groupName = subparamList["groupName"];
            if (subparamList["groupDisplay"] != null && subparamList["groupDisplay"] != '') {
                groupName = subparamList["groupDisplay"];
            }

            if (subparamList["groupValue"] != null && subparamList["groupValue"] != '') {
                groupName = subparamList["groupValue"];
            }

            me.getParentTrHTML(paraHtml, idFlag, level, groupName);

            paraHtml.push(me.getDefaultListParamters(subparamList["parameters"], level));
            subGroupList = subparamList["subGroupParameters"];
            if (subGroupList != null && subGroupList.length > 0) {
                paraHtml.push(me.getDefaultListParamters(subGroupList, level));
            }
            recordStr += subId + "," + idFlag + "," + false + ";";
        }
        return paraHtml.join('');
    },
    
    getParamsTips:function(valueStr,level,isKey,hasPic){
        var me = this;
        var tips="";
        if(valueStr==""){
            return tips;
        }
        if(me.showParamsTips(valueStr,level,isKey,hasPic)){
            tips="data-qtip="+valueStr;
        }
        return tips;
    },
    
    showParamsTips:function(valueStr,level,isKey,hasPic){
        var lessWidth=0;
        if(isKey){
            if(hasPic=="true"){
                lessWidth=(othersWindowWidth-scrollWidth)*0.3-picSpace-paramsLevelWidth[level-1];
            }else{
                lessWidth=(othersWindowWidth-scrollWidth)*0.3-paramsLevelWidth[level-1];
            }
        }else{
            lessWidth=(othersWindowWidth-scrollWidth)*0.7;
        }
    
        return getStringRealWidth(otherTableTips,valueStr)>lessWidth;
    },
    sortParamList:function(paramList){
        
        var resultList = new Array();
        var organArray = new Array();
        
        for(var i = 0; i < paramList.length; i++){
            var organ = paramList[i]['organ'];
            var hasOrgan = false;
            for(var j = 0; j< organArray.length; j++){
                if(organ == organArray[j]){
                    hasOrgan = true;
                    break;
                }
            }
            if(!hasOrgan){
                organArray.push(organ);
            }
        }
    
        for(var i = 0; i < organArray.length; i++){
            var organ = organArray[i];
            for(var j = 0; j < paramList.length; j++){
                if(organ == paramList[j]['organ']){
                    resultList.push(paramList[j]);
                }
            }
        }
    
        return resultList;
    },
    
    updateParamTableTips:function(){
        var paramTable = document.getElementById('parameterTable');
        
        if(paramTable!=null){
            for(var i = 0;i < paramTable.rows.length - 1; i++)
            {
                var key = paramTable.rows[i].cells[0].textContent;
                var level = paramTable.rows[i].cells[0].getAttribute("level");
                var hasimg = paramTable.rows[i].cells[0].getAttribute("hasimg");
                var value = paramTable.rows[i].cells[1].textContent;
    
                if(level != null){
                    if(this.showParamsTips(key,level,true,hasimg)){
                        paramTable.rows[i].cells[0].setAttribute("data-qtip",key);
                    }else{
                        paramTable.rows[i].cells[0].removeAttribute("data-qtip");
                    }
                    if(value!="" && this.showParamsTips(value,level,false,false)){
                        paramTable.rows[i].cells[1].setAttribute("data-qtip",value);
                    }else{
                        paramTable.rows[i].cells[1].removeAttribute("data-qtip");
                    }
                }
                
            }
        }
    },
    getProtocolParams:function(dataIndex){   
        var me = this;
        if(me != null && me.loadCompleted){    
            var protocolInfo=me.displayStore[dataIndex];
            if(!me.initParam&&protocolInfo.get('uid')==me.selectedUid
                    &&protocolInfo.get('version')==me.selectedVersion
                    &&protocolInfo.get('protocolname')==me.selectedProName
                    &&protocolInfo.get('epno')==me.selectedEPNo
                    &&protocolInfo.get('type')==me.selectedProType
                    &&protocolInfo.get('organ')==me.selectedOrgan
                    &&protocolInfo.get('patienttype')==me.selectedPatientType
                    &&protocolInfo.get('status')==me.selectedStatus){
                return;
            }
            me.loadCompleted = false;
                    
            me.paramsPanel.update("");
            me.btnOK.setDisabled(true);
            me.btnParam.setDisabled(true);
            
            me.selectedUid=protocolInfo.get('uid');
            me.selectedEPNo = protocolInfo.get('epno');
            me.selectedVersion=protocolInfo.get('version');
            me.selectedProName=protocolInfo.get('protocolname');
            me.selectedProType=protocolInfo.get('type');
            me.selectedStatus=protocolInfo.get('status');
            me.selectedOrgan=protocolInfo.get('organ');
            me.selectedPatientType=protocolInfo.get('patienttype');
            me.selectedFilePath=protocolInfo.get('filepath');     
            if(!me.initParam){
                me.refreshOthersProtocolTable(dataIndex);
            }
            me.initParam = false;
    
            me.paramStore.load({
                params:{uid        :me.selectedUid,
                    epno     :me.selectedEPNo,
                    proname    :me.selectedProName,
                    version    :me.selectedVersion,
                    status    :me.selectedStatus,
                    patienttype:me.selectedPatientType,
                    protocolorgan:me.selectedOrgan,
                    },
            });
        }
    },
    refreshParamTable : function(){
        var table=document.getElementById("parameterTable");    
        if(table!=null){
            var nextRow=0;    
            for(var i=0;i<table.rows.length;i++){
                if(table.rows[i].style.display=='none'){
                    continue;
                }            
                if(nextRow%2==1){
                    table.rows[i].style.backgroundColor='#EBF1FA';
                }else{
                    table.rows[i].style.backgroundColor='#FFFFFF';
                }
                nextRow++;
            }    
        }
    },
    collapseRows : function(startId,endId,toCollapsed){
        var me = this;
        var img=document.getElementById("img"+startId);
        if(toCollapsed){
            img.src=foldImg;
        }else{
            img.src=unFoldImg;
        }
        
        if(startId==endId){
            return;
        }
        do{
        startId++;
        var element=document.getElementById("param"+startId);
        if(element==null){
            break;
        }
        if(toCollapsed){
            element.style.display='none';
        }else{
            element.style.display='';
            var skipNum=me.getUnfoldSkipNum(startId);
            if(skipNum!=""){
                startId=Number(skipNum);
                }
            }
        }while(Number(startId)<Number(endId));
    },
    getUnfoldSkipNum:function(id){
        for(var i=0;i<recordArray.length;i++){
            var item=recordArray[i].split(",");    
            if(item[0]==id&&item[2]=="true"){
                return item[1];
            }
        }
        return "";
    },
    createParamEmptyTable : function(){
        // get the count of display rows
        var me = this;
        var table=document.getElementById("parameterTable");
        var displayCount=0;//contains a empty tr
        if(table==null){
            return;
        }
        for(var i=0;i<table.rows.length;i++){
            if(table.rows[i].style.display !='none'){
                displayCount++;
            }
        }
        
        // get param panel height
        var paramsPanel=document.getElementById("paramsPanel");
        var emptyHeight = paramsPanel.scrollHeight - (displayCount-1)*30;
        var emtypTr = document.getElementById("emptyParamTr");
        var keyCls ='param_empty_key';
        var keyTrCls ='param_empty_key_tr';
        var valueCls ='param_empty_value';
        var valueTrCls ='param_empty_value_tr';
        
        if(displayCount%2==0){
            keyTrCls ='param_empty_key';
            keyCls ='param_empty_key_tr';
            valueTrCls ='param_empty_value';
            valueCls ='param_empty_value_tr';
        }
        
        if(emptyHeight>0){
            var emptyCount=Math.ceil(emptyHeight/30);
            var lastHeight=emptyHeight-30*(emptyCount-1);
    
            var _array = new Array();
            _array.push('<td>');
            _array.push('<table width="100%" style="border-spacing:0px;">');
            for(var i=0; i<emptyCount; i++){
                _array.push('<tr>');
                _array.push('<td class="');
                if(i%2==0){
                    _array.push(keyCls);    
                }else{
                    _array.push(keyTrCls);
                }
                _array.push('"');
                if(i==emptyCount-1){
                    _array.push(" style='height:"+lastHeight+"px;'");
                }
                _array.push(' />');
                _array.push('</tr>');
            }
            _array.push('</table>');
            _array.push('</td>');
            
            _array.push('<td>');
            _array.push('<table width="100%" style="border-spacing:0px;">');
            for(var i=0; i<emptyCount; i++){
                _array.push('<tr>');
                _array.push('<td class="');
                if(i%2==0){
                    _array.push(valueCls);    
                }else{
                    _array.push(valueTrCls);
                }
                _array.push('"');
                if(i==emptyCount-1){
                    _array.push(" style='height:"+lastHeight+"px;'");
                }
                _array.push(' />');
                _array.push('</tr>');
            }
            _array.push('</table>');
            _array.push('</td>');
            
            me.setEmptyTrInnerHTML(emtypTr,_array.join(''));
        } else {
            emtypTr.innerHTML = '';
        }
    },
    setEmptyTrInnerHTML : function(tr,html){
        if(navigator && navigator.userAgent.match(/msie/i)){
            var temp1 = tr.ownerDocument.createElement('div1');
            var temp2 = tr.ownerDocument.createElement('div2');
            var nodes = html.split('</tr></table></td>');
            var td1 = nodes[0]+'</tr></table></td>';
            var td2 = nodes[1]+'</tr></table></td>';
            
            temp1.innerHTML = '<table>'+td1+'</table>';
            temp2.innerHTML = '<table>'+td2+'</table>';
    
            tr.innerText = '';
            tr.appendChild(temp1.firstChild.firstChild.firstChild.firstElementChild);
            tr.appendChild(temp2.firstChild.firstChild.firstChild.firstElementChild);
        } else {
            tr.innerHTML = html;
        }
    },
    mouseX : function(evt){
            if (evt.pageX) return evt.pageX; 
            else if (evt.clientX) 
                return evt.clientX + 
                       (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft); 
                             else return null; 
        },
    mouseY : function(evt){
            if (evt.pageY) return evt.pageY; 
            else if (evt.clientY) 
                return evt.clientY + 
                       (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft); 
                             else return null; 
        },
    bindClickChangePic:function(){
        var me = this;
        var protocoleptype = me.store.data.items[0].data.protocoleptype;
        if (protocoleptype === 'Service') {
            return ;
        }
        var imgdiv=document.getElementById('organImg').parentElement.childNodes;
        for(var i=1;i<imgdiv.length;i++){
            imgdiv[i].onclick = function(e) {

                var evt = window.event;
                var x = me.mouseX(evt);
                var y = me.mouseY(evt);

                var img = document.getElementById('organImg');
                var imgX = img.getBoundingClientRect().left +
                    (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                var imgY = img.getBoundingClientRect().top +
                    (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

                var relativeX = x - imgX;
                var relativeY = y - imgY;

                var patienttype = me.store.data.items[0].data.patienttype;
                var locations;
                if (patienttype === "Adult" || patienttype ===  "Trauma_Adult") {
                    locations = AdultOrganLocations;
                } else if (patienttype === "Child") {
                    locations = ChildOrganLocations;
                }

                var images = organImages;
                var marchedPic = false;

                for (var i = 0; i < locations.length; i++) {
                    var picLocation = locations[i].split(',');
                    if (relativeX >= picLocation[0] && relativeX <= picLocation[2] && relativeY >= picLocation[1] && relativeY <= picLocation[3]) {
                        if (me.organSelectedIndex != i) {
                            me.organSelectedIndex = i;

                            if (patienttype === "Adult" || patienttype ===  "Trauma_Adult") {
                                img.src = adultImgFloder + images[i];
                            } else if (patienttype === "Child") {
                                img.src = childImgFloder + images[i];
                            }

                            marchedPic = true;
                            break;
                        }
                    }
                }

                if (!marchedPic) {
                    return;
                }
                // clear selected status to reload params

                me.chageParamPanel(true);
                me.paramsPanel.update("");
                me.btnOK.setDisabled(true);
                me.btnParam.setDisabled(true);

                me.selectedPicOrgan = organArray[me.organSelectedIndex];

                me.store.load({
                    params: {
                        filepath: me.filepath,
                        uid: me.uid,
                        epno: me.epno,
                        proname: me.proName,
                        version: me.version,
                        status: me.proStatus,
                        protype: me.proType,
                        patienttype: me.patienttype,
                        protocolorgan: me.organ,
                        organtype: me.selectedPicOrgan,
                        rightstatus: me.otherStatus,
                        protocoleptype: me.protocoleptype
                    }
                });
            }
       }
    },
    updateImgCursor : function() {
        var me = this;

        var patienttype = me.store.data.items[0].data.patienttype;
        var locations;
        if (patienttype === "Adult" || patienttype ===  "Trauma_Adult") {
            locations = AdultOrganLocations;
        } else if (patienttype === "Child") {
            locations = ChildOrganLocations;
        }
        var tableArray = new Array();
        for (var i = 0; i < locations.length; i++) {
            var picLocation = locations[i].split(',');
            tableArray.push('<div  style="background:rgba(0,0,0,0);background:#000\0;filter:alpha(opacity=0)\0;*background:#FFF;-moz-opacity:0;opacity: 0;cursor:pointer;background:rgba(0,0,0,0);background:#000\0;filter:alpha(opacity=0)\0;*background:#FFF;-moz-opacity:0;opacity: 0;cursor:pointer;position:absolute;z-index:2;width:' + (picLocation[2] - picLocation[0]) + 'px;');
            tableArray.push('height:' + (picLocation[3] - picLocation[1]) + 'px;left:' + (parseInt(picLocation[0]) + 1) + 'px;');
            tableArray.push('top:' + (parseInt(picLocation[1]) + 1) + 'px;">');
            tableArray.push('</div>');
        }
        return tableArray.join('');
    }
});