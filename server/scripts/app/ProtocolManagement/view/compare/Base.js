/**
 * PM.view.compare.Base
 * store 						: store of compare result
 * cellHeight					: cell height
 * uniqueid						: unique id for each ComparePanel
 * isHide						: true is hide no changed data,false display all data
 * reload(store,storeOfChange)	: load compare result data
 * refrush()					: refrush for screen changed
 * hideNoChange					: alter display between all data and changed data
 * import css
 * import model 				: PM.model.Compare
 */
Ext.define('PM.view.compare.Base', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.comparepanel',
	store: "Ext.data.Store",
	cellHeight: {},
	uniqueid: {},
	tdStyle: {},
	isHide: false,
	headerPanel: {},
	bodyStyle: 'border:0px;',
	layout: 'fit',
	isLink: false,
	isLeft: true,
	isSameOrgan: true,
	autoScroll: false,
	isSame: false,
	isExistTarget: false,
	isClickSelf: false,

	displayStatus: '',
	displayTime: null,
	displayComments: null,
	displayVersion: null,
	displayUid: null,
	displayRemark: null,
	eventid: null,

	parentPanel: null,

	isBindOpenOthersWindow: false,
	isBindBothCompare: false,
	isBindBothCompareFromTransfer: true,

	protocoluid: '',
	protocolepno: '',
	protocolname: '',
	protocolversion: '',
	protocolstatus: '',
	protocolorgan: '',
	protocolpatienttype: '',
	protocolprotocoltype: '',
	protocolfilepath:'',
	otherprotocoluid: '',
	otherprotocolepno: '',
	otherprotocolname: '',
	otherprotocolversion: '',
	otherprotocolstatus: '',
	otherprotocolorgan: '',
	otherprotocolpatienttype: '',
	otherprotocolprotocoltype: '',
	otherprotocolfilepath:'',
	remarkCount: 1,
	tablePanel:null,
	leftArray:null,
	rightArray:null,
	btnHideParam:null,
	isExpand:false,

	tdId: '',
	tdIdsub:'',
	tdCls:'',
	tdsubCls:'',
	filePath:null,
	leafCounter: 0,

	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	},
	refrush: function() {
		if (this.store == null) {
			return;
		}
		var uniqueid = this.uniqueid;

		var me = this;
		var buttonText = stringSetting.compare.button.showdifferencesonly;
		if (this.isHide) {
			buttonText = stringSetting.compare.button.showall;
		}

		me.btnHideParam = Ext.create('Ext.button.Button', {
            height: 32,
            width: 260,
            cls : 'icon-button-BackListButton',
            overCls : 'icon-button-BackListButton-over',
            pressedCls : 'icon-button-BackListButton-pressed',
            focusCls : 'icon-button-BackListButton-focus',
            disabledCls : 'icon-button-BackListButton-disable',
            text : '<span class="SpanTextView">' + stringSetting.history.button.collapseAll + '</span>',
            listeners:{
                "click":function(){
                    me.hideParamList();
                }
            }
        });

		var b = Ext.create('Ext.Button', {
			cls: 'icon-button-hidenochange',
			overCls: 'icon-button-hidenochange-over',
			pressedCls: 'icon-button-hidenochange-pressed',
			focusCls: 'icon-button-hidenochange-over',
			disabledCls: 'icon-button-hidenochange-disable',
			height: 32,
			width: 270,
			disabled: true,
			text: '<span class="SpanTextView"  style="font-size:13pt;">' + buttonText + '<span>',
			style: 'margin-right:-12px',
			disabled: !this.isExistTarget,
			handler: function() {
				me.isClickSelf = true;
				me.hideNoChange();
			}
		});

		var references = Ext.create('Ext.Button', {
			cls: 'icon-button',
			overCls: 'icon-button-over',
			pressedCls: 'icon-button-pressed',
			focusCls: 'icon-button-over',
			disabledCls: 'icon-button-disable',
			height: 32,
			width: 118,
			hidden: true,
			text: '<span class="SpanTextView"  style="font-size:13pt;">' + stringSetting.compare.button.references + '<span>',
			handler: function() {
				var referenecsView = Ext.create("PM.view.request.References", {
					title: stringSetting.compare.title_refer
				});

				referenecsView.showWin();
			}
		});

		if (memoryReferenceShare) {
			references.show();
		}

		var panelHeader = Ext.create('Ext.panel.Panel', {
			region: 'north',
			bodyCls: "CompareHeaderBackground",
			layout: "border",
			height: 34,
			items: [{
				xtype: 'panel',
				bodyCls: "CompareHeaderPanel",
				region: "center",
				html: stringSetting.compare.title_detail
			}, {
				xtype: 'panel',
				bodyCls: "CompareHeaderBackground",
				region: "east",
				width: 710,
				height: 34,
				layout: {
					type: 'hbox',
					align: 'middle',
					pack: 'end',
				},
				defaults: {
					padding: '0 0 0 0',
					margins: '0 15 0 0'
				},
				items: [me.btnHideParam, b, references]
			}]

		});

		if (this.items.length > 0) {
			this.remove(0);
		}

		me.tablePanel = Ext.create("Ext.panel.Panel",{
			region: "center",
			bodyStyle: 'background-color:#FFF;border:0px;overflow-y:scroll;overflow-x:hidden;',
			html: this.LoadData(this.store)
		});

		this.add({
			xtype: 'panel',
			layout: 'border',
			items: [{
				xtype: 'panel',
				region: "north",
				bodyStyle: 'background-color:#EDF0F7;border:0px solid red;',
				height: 125,
				items: [
					panelHeader, {
						xtype: 'panel',
						bodyStyle: 'background-color:#93AEDB;border:0px;padding-right:' + getChromeScrollWidth() + 'px;border-top:0px;',
						height: 90,
						html: this.createHeader(this, this.store)
					}
				]

			}, me.tablePanel]

		});

		me.bindClickEvent();
		if (me.btnHideParam.text == '<span class="SpanTextView">' + stringSetting.history.button.expandAll + '</span>'){
			me.btnHideParam.setText('<span class="SpanTextView">' + stringSetting.history.button.collapseAll + '</span>');
			me.isExpand = true;
		}else{
			me.isExpand = false;
		}
		me.fillCompareBlankLine();


	},
	hideParamList : function(){
    	var me = this;

    	var el_td_sub = document.getElementsByClassName('compare-td-sub-node');

		var el_td = document.getElementsByClassName('compare-td-node');


    	if(me.isExpand){
    		if (el_td_sub.length != 0) {
				for (var i = 0; i < el_td_sub.length; i++) {
					if (document.getElementById(el_td_sub[i].attributes['tdId'].value).style.display == "none") {
						me.compareItemClick(el_td_sub[i].attributes['tdId'].value);
					}
				}
			}
    		if (el_td.length != 0) {
				for (var i = 0; i < el_td.length; i++) {
					if (document.getElementById(el_td[i].attributes['tdId'].value).style.display == "none") {
						me.compareItemClick(el_td[i].attributes['tdId'].value);
					}
				}
			}
			for (var i = 0; i < me.leafCounter; i++) {
				if (document.getElementById('attributeUsedForCollapse' + i).parentNode.style.display == "none") {
					document.getElementById('attributeUsedForCollapse' + i).parentNode.style.display = "";
				}
				this.fillCompareBlankLine();
			}
    		me.isExpand = false;
    		me.btnHideParam.setText('<span class="SpanTextView">' + stringSetting.history.button.collapseAll + '</span>');
    	}else {
			if (el_td_sub.length != 0) {
				for (var i = 0; i < el_td_sub.length; i++) {
					if (document.getElementById(el_td_sub[i].attributes['tdId'].value).style.display == "") {
						me.compareItemClick(el_td_sub[i].attributes['tdId'].value);
					}
				}
			}
			if (el_td.length != 0) {
				for (var i = 0; i < el_td.length; i++) {
					if (document.getElementById(el_td[i].attributes['tdId'].value).style.display == "") {
						me.compareItemClickForCollapse(el_td[i].attributes['tdId'].value);
					}
				}
			}

			for (var i = 0; i < me.leafCounter; i++) {
				if (document.getElementById('attributeUsedForCollapse' + i).parentNode.style.display == "") {
					document.getElementById('attributeUsedForCollapse' + i).parentNode.style.display = "none";
				}
				this.fillCompareBlankLine();
			}

			me.isExpand = true;
			me.btnHideParam.setText('<span class="SpanTextView">' + stringSetting.history.button.expandAll + '</span>');
		}

    },
	bindClickEvent: function(){
		var me = this;
		var el = document.getElementsByClassName("CompareTextHeader");
		if (el.length == 1) {
			if(me.isBindBothCompare && me.isBindBothCompareFromTransfer){
				el[0].children[0].onclick = function() {
					me.getCompareTable();
				}
			}else{
				el[0].setAttribute('class','CompareTextHeader-no-hover');
			}
		}
		if (el.length == 2) {
			if(me.isBindOpenOthersWindow){
				if(me.protocolprotocoltype == "ExamPlan"){
					el[0].children[0].onclick = function(e) {
						me.openOthersWin(true);
					}
					el[1].children[0].onclick = function(e) {
						me.openOthersWin(false);
					}
				}else{
					el[0].setAttribute('class','CompareTextHeader-no-hover');
					el[1].setAttribute('class','CompareTextHeader-no-hover');
				}
			}else{
				el[1].setAttribute('class','CompareTextHeader-no-hover');
				if(me.protocolprotocoltype == "ExamPlan"){
					el[0].children[0].onclick = function(e) {
						me.openOthersWin(true);
					}
				}else{
					el[0].setAttribute('class','CompareTextHeader-no-hover');
				}
			}
		}
		var el_td_sub = document.getElementsByClassName('compare-td-sub-node');
		if (el_td_sub.length != 0) {
			for (var i = 0; i < el_td_sub.length; i++) {
				el_td_sub[i].onclick = function() {
					me.compareItemClickForWithLeaf(this.attributes['tdId'].value);
				}
			}
		}
		var el_td = document.getElementsByClassName('compare-td-node');
		if (el_td.length != 0) {
			for (var i = 0; i < el_td.length; i++) {
				el_td[i].onclick = function() {
					me.compareItemClickForWithLeaf(this.attributes['tdId'].value);
				}
			}
		}
	},

	getCompareTable: function() {
		var me = this;
		var store = new Ext.data.Store({
			model: 'PM.model.Compare',
			proxy: new Ext.data.proxy.Ajax({
				type: 'ajax',
				url: PROCESS_PATH_GLOBAL_ACTION + 'initcompare.action',
				getMethod: function() {
					return 'POST';
				},
				reader: {
					type: 'json',
					root: 'result',
					totalProperty: 'total'
				}
			})
		});

		var eventStatus = me.displayStatus;
		if (eventStatus == null) {
			eventStatus = '';
		}

		store.load({
			params: {
				leftfilepath:  me.protocolfilepath,
				rightversion: me.protocolversion,
				rightfilepath: me.protocolfilepath,
				parameterlist: '',
				eventstatus: eventStatus,
				eventid: me.eventid,
				eventFlag: 'copy'
			}
		});
		store.on("load", function() {
			me.isClickSelf = true;
			me.reload(store);
		});
	},

	openOthersWin: function(isLeft) {
		var me = this;
        Ext.getBody().mask();
		var othersView = Ext.create('PM.view.compare.ProtocolSelect', {
			parentPanel: me,
			uid: isLeft ? me.leftArray.uid : me.rightArray.uid,
			epno: isLeft ? me.leftArray.epno : me.rightArray.epno,
			proName: isLeft ? me.leftArray.name : me.rightArray.name,
			version: isLeft ? me.leftArray.version : me.rightArray.version,
			proStatus: isLeft ? me.leftArray.status : me.rightArray.status,
			proType: isLeft ? me.leftArray.protocoltype : me.rightArray.protocoltype,
			organ: isLeft ? me.leftArray.organ : me.rightArray.organ,
			patienttype: isLeft ? me.leftArray.patienttype : me.rightArray.patienttype,
			filepath : isLeft ? me.leftArray.filepath : me.rightArray.filepath,
			isleft: isLeft,
			otherUid: isLeft ? me.leftArray.otherprotocoluid : me.rightArray.otherprotocoluid,
			otherEpNo: isLeft ? me.leftArray.otherprotocolepno : me.rightArray.otherprotocolepno,
			otherEpName: isLeft ? me.leftArray.otherprotocolname : me.rightArray.otherprotocolname,
			otherVersion: isLeft ? me.leftArray.otherprotocolversion : me.rightArray.otherprotocolversion,
			otherStatus: isLeft ? me.leftArray.otherprotocolstatus : me.rightArray.otherprotocolstatus,
			otherProType: isLeft ? me.leftArray.otherprotocolprotocoltype : me.rightArray.otherprotocolprotocoltype,
			otherOrgan: isLeft ? me.leftArray.otherprotocolorgan : me.rightArray.otherprotocolorgan,
			otherPatientType: isLeft ? me.leftArray.otherprotocolpatienttype : me.rightArray.otherprotocolpatienttype,
			otherFilePath: isLeft ? me.leftArray.otherfilepath : me.rightArray.otherfilepath,
			eventFlag: isLeft ? 'left' : 'right',
			protocoleptype: isLeft ? me.leftArray.protocoleptype : me.rightArray.protocoleptype,
		});
		me.isClickSelf = true;
	},

	checkCompareResult: function(isHis, eventflag,leftfilepath,rightversion,rightstatus,
		rightfilepath, parameterlist, isleft, el) {
		var me = this;
		var store = new Ext.data.Store({
			model: 'PM.model.Compare',
			proxy: new Ext.data.proxy.Ajax({
				type: 'ajax',
				url: PROCESS_PATH_GLOBAL_ACTION + 'initcompare.action',
				getMethod: function() {
					return 'POST';
				},
				reader: {
					type: 'json',
					root: 'result',
					totalProperty: 'total'
				}
			})
		});
		parameterlist = parameterlist.replace(/\"/g, "#$");
		var eventStatus = '';
		if(isHis){
			eventStatus = me.displayStatus;
		}else{
			me.displayStatus = rightstatus;
		}

		store.load({
			params: {
				leftfilepath:  leftfilepath,
				rightversion: rightversion,
				rightfilepath: rightfilepath,
				parameterlist: parameterlist,
				eventstatus: eventStatus,
				eventid: me.eventid,
				eventFlag: eventflag
			}
		});

		store.on("load", function() {
			me.isLeft = isleft;
			me.reload(store, el);
		});
	},

	createHeader: function(me, store) {
		var table_node = document.createElement("table");
		table_node.setAttribute("class", "CompareTableCommon");
		//header
		var tr_header = document.createElement("tr");
		tr_header.setAttribute("style", "height:50px;");
		var td_header = document.createElement("td");
		var tr_header_node = document.createElement("tr");
		tr_header_node.setAttribute("style", "height:50px;");
		var td_header_node = document.createElement("td");
		td_header_node.setAttribute("style", "width:40%;background:#93AEDB;text-align:center;border-right:0px solid #ABC0E2;");
		td_header.setAttribute("style", "width:60%;text-align:center;height:50px;border:0px;padding:0px;");


		if (this.isExistTarget) {
			var table_header = document.createElement("table");
			table_header.setAttribute("class", "CompareTableCommon");
			var td_header_left_node = me.createHeaderTd(store.data.getAt(0).get("leftprotocol"), true, store.data.getAt(0).get("rightprotocol"));
			td_header_left_node.setAttribute("style", "width:50%;border-left:1px solid #ABC0E2;border-bottom:0px solid #ABC0E2;height:50px;padding:0px;border-spacing: 0px 0px;");

			var td_header_right_node = me.createHeaderTd(store.data.getAt(0).get("rightprotocol"), false, store.data.getAt(0).get("leftprotocol"));
			td_header_right_node.setAttribute("style", "width:50%;border-left:1px solid #ABC0E2;border-bottom:0px solid #ABC0E2;height:50px;padding:0px;border-spacing: 0px 0px;");
			tr_header_node.appendChild(td_header_left_node);
			//tr_header_node.appendChild(td_header_center_node);
			tr_header_node.appendChild(td_header_right_node);
			table_header.appendChild(tr_header_node);
			td_header.appendChild(table_header);
		} else {
			var table_header = document.createElement("table");
			table_header.setAttribute("style", "border:0px solid red;width:100%;height:100%;table-layout:fixed;padding:0px;border-spacing: 0px 0px;");
			var td_header_right_node = me.createHeaderTd(store.data.getAt(0).get("rightprotocol"), false, store.data.getAt(0).get("leftprotocol"));
			td_header_right_node.setAttribute("style", "width:100%;border-left:1px solid #2F5988;border-bottom:0px solid #ABC0E2;height:50px;padding:0px;border-spacing: 0px 0px;");
			tr_header_node.appendChild(td_header_right_node);
			table_header.appendChild(tr_header_node);
			td_header.appendChild(table_header);
		}

		tr_header.appendChild(td_header_node);
		tr_header.appendChild(td_header);

		table_node.appendChild(tr_header);

		return table_node.outerHTML;
	},
	reload: function(store, el) {
		var me = this;
		me.store = store;

		if (me.store.data.getAt(0).get("flag")) {
			var errCode = me.store.data.getAt(0).get("errCode");

			var _message = Ext.create('PM.view.common.window.Message', {
				errorDetail: stringSetting.error[errCode],
			});

			_message.showWin();

            Ext.getBody().unmask();
            return;
		}

		this.isExistTarget = this.store.data.getAt(0).get("leftprotocol") != '';

		if (this.isExistTarget) {
			this.isSame = true;
		} else {
			this.isSame = false;
		}
        if(me.store.data.getAt(0).get("rightprotocol")["status"] == ProtocolStatus.deletionRequested)
        {
        	this.isExistTarget = false;
        }
		this.isSameOrgan = this.store.data.getAt(0).get("issameorgan");
		if (this.store.data.getAt(0).get('leftprotocol').protocoltype == 'ContrastPreset') {
			this.isSameOrgan = true;
		}

		this.isHide = false;
		this.isLink = false;
		if (this.isSame && (parseInt(this.store.data.getAt(0).get("rightindex")) - parseInt(this.store.data.getAt(0).get("leftindex")) == 1)) {
			this.isLink = true;
		}
		if (this.store != null) {
            if(this.store.data.items.length > 0 ){
                if(this.store.data.items[0].data.leftprotocol!= ''&& this.store.data.items[0].data.rightprotocol!=''){
                    if(this.store.data.items[0].data.leftprotocol.version != this.store.data.items[0].data.rightprotocol.version
                        ||this.store.data.items[0].data.leftprotocol.epno != this.store.data.items[0].data.rightprotocol.epno){
                        this.isHide = true;
                    }
                }
            }
			var list = this.store.data.getAt(0).get("changelist");
			if (list == null) {
				//return;
                list = [];
			}
			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i]["haschild"] == "true") {
					list[i]["childlist"] = this.filterChange(list[i]["childlist"]);
					if (list[i]["childlist"].length == 0 && list[i]["targetvalue"] == list[i]["mastervalue"]) {
						list.splice(i, 1);
					}
				} else if (list[i]["haschild"] == "false" && list[i]["targetvalue"] == list[i]["mastervalue"]) {
					list.splice(i, 1);
				}
			}
		}
		if (me.isClickSelf) {
			me.refrush();
			me.isClickSelf = false;
		} else {
			me.parentPanel.showComparePanel(el);
		}
        Ext.getBody().unmask();
	},
	createTableElement: function(me, store) {
		var me = this;

		me.leafCounter = 0;
		if (store == null) {
			return "";
		}
		var list = this.isHide ? store.data.getAt(0).get("changelist") : store.data.getAt(0).get("list");
        if(list == null){
            list = [];
        }
		var table_node = document.createElement("table");
		table_node.setAttribute("id", me.uniqueid + "compareTable");
		table_node.setAttribute("style", "border-bottom:0px solid #D5D7DF;width:100%;table-layout:fixed;padding:0px;border-spacing: 0px 0px;");

		// head 2
		var rightCreatorRemark = store.data.getAt(0).get("rightprotocol")["createremark"];
		var leftCreatorRemark = "";
		if (this.isExistTarget) {
			leftCreatorRemark = store.data.getAt(0).get("leftprotocol")["createremark"];
		}

		var creatorTitle = stringSetting.compare.label.console_comments;

		var tr_header2 = this.createCommentTR(creatorTitle, rightCreatorRemark, leftCreatorRemark);

		table_node.appendChild(tr_header2);
		var rightremark = "";
		var leftremark = "";
		var approveTitle = stringSetting.compare.label.approver_comments;
		if (store.data.getAt(0).get("rightprotocol")["status"] != ProtocolStatus.approvalRequested && store.data.getAt(0).get("rightprotocol")["status"] != ProtocolStatus.deletionRequested) {
			rightremark = store.data.getAt(0).get("rightprotocol")["remark"];
            var _system_remark = store.data.getAt(0).get("rightprotocol")["system_remark"];
            if(_system_remark === '<System Comment>') {
                rightremark = stringSetting.comments.text.systemComment + ' ' + rightremark;
            }
			if (this.isExistTarget) {
				leftremark = store.data.getAt(0).get("leftprotocol")["remark"];
                _system_remark = store.data.getAt(0).get("leftprotocol")["system_remark"];
                if(_system_remark === '<System Comment>') {
                    leftremark = stringSetting.comments.text.systemComment + ' ' + leftremark;
                }
			}
			tr_header2 = this.createCommentTR(approveTitle, rightremark, leftremark);
			table_node.appendChild(tr_header2);
			this.remarkCount = 2;
		}

		//compare result
		var row = 0;

		for (var i = 0; i < list.length; i++) {

			var targetvalue = list[i]["targetvalue"];
			var mastervalue = list[i]["mastervalue"];
			var tr_node = document.createElement("tr");
			var paracssclass = '';
			if (!this.isExistTarget) {
				paracssclass = me.getRowStyle(row, false, 0);
			} else {
				paracssclass = me.getRowStyle(row, targetvalue != mastervalue, 0);
			}

			tr_node.setAttribute("style", "height:" + me.cellHeight + "px;");
			tr_node.setAttribute("name", row);
			tr_node.id = me.uniqueid + '_tr_' + i;
			var tdText = ' ' + list[i]["name"];
			var image_right = null;
			if (list[i]["haschild"] == "true") {
				image_right = document.createElement("img");
				image_right.id = 'img_' + me.uniqueid + '_trchild_' + i;
				image_right.src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
			}

			var td_node = me.createParaTdElement(me.uniqueid + "id_" + i, paracssclass, tdText, image_right, 10);
			td_node.setAttribute("style", "padding:0px;padding-left:10px;width:40%;border-bottom:0px solid #ABC0E2;");
			if (list[i]["haschild"] == "true") {
				this.tdId = me.uniqueid + '_trchild_' + i;
				td_node.setAttribute('class','compare-td-node ' + paracssclass);
				td_node.setAttribute('tdId',me.uniqueid + '_trchild_' + i);
//				td_node.setAttribute('class', 'compare-para-td');
			}
			tr_node.appendChild(td_node);
			var valuecssclass = '';

			if (!this.isExistTarget) {
				var _widthValue = (document.documentElement.clientWidth - 65) * 0.6;
				valuecssclass = me.getRowStyle(row, false, 1);

				var td_target_node = me.createCommonTd(valuecssclass, targetvalue);
				td_target_node.setAttribute("style", "width:60%;border-right: 0px solid #ABC0E2;;padding:0px;border-spacing: 0px 0px;");
				td_target_node.setAttribute("colspan", "2");
				if (getStringRealWidth(styleCompareTipGlobal, targetvalue) > _widthValue) {
					td_target_node.setAttribute("data-qtip", targetvalue);
				}
				tr_node.appendChild(td_target_node);
			} else {
				var _widthValue = (document.documentElement.clientWidth - 65) * 0.3;
				valuecssclass = me.getRowStyle(row, targetvalue != mastervalue, 1);

				var td_target_node = me.createCommonTd(valuecssclass, targetvalue);
				var td_master_node = me.createCommonTd(valuecssclass, mastervalue);
				td_target_node.setAttribute("width", "30%;padding:0px;border-spacing: 0px 0px;");
				td_master_node.setAttribute("width", "30%;padding:0px;border-spacing: 0px 0px;");
				if (getStringRealWidth(styleCompareTipGlobal, targetvalue) > _widthValue) {
					td_target_node.setAttribute("data-qtip", targetvalue);
				}
				if (getStringRealWidth(styleCompareTipGlobal, mastervalue) > _widthValue) {
					td_master_node.setAttribute("data-qtip", mastervalue);
				}

				tr_node.appendChild(td_target_node);
				tr_node.appendChild(td_master_node);
			}
			table_node.appendChild(tr_node);

			if (list[i]["haschild"] == "true") {
				var tr_submain_node = me.createChiledTrElement(me, list[i]["childlist"], i, 20, row);
				table_node.appendChild(tr_submain_node);
				row += me.getChildRowCount(me, list[i]["childlist"]);
			}

			row++;
		}

		return table_node;
	},
	createCommentTR: function(title, rightremark, leftremark) {
		var me = this;
		// head 2
		var tr_header2 = document.createElement("tr");
		tr_header2.setAttribute("style", "height:50px;");

		tr_header2.setAttribute("style", "background-color:#FFF;height:50px;");
		var td_head_node2 = document.createElement("td");
		td_head_node2.setAttribute("style", "width:40%;border-bottom:1px solid #ABC0E2;border-right:0px solid #ABC0E2;height:50px;padding-left:10px;font-size: 13pt;");
		var td_text = document.createTextNode(title);

		td_head_node2.appendChild(td_text);
		tr_header2.appendChild(td_head_node2);
		if (this.isExistTarget) {
			var td_head21 = document.createElement("td");
			var td_head22 = document.createElement("td");
			//Changed by Karrtik - start
			//td_head21.appendChild(document.createTextNode(store.data.getAt(0).get("leftprotocol")["remark"]));
			var remarks = leftremark; //store.data.getAt(0).get("leftprotocol")["remark"];
			td_head21 = me.addRemarks(td_head21, remarks);
			//Changed by Karrtik - end
			td_head21.setAttribute("class", "CompareHeaderRemark");
			//Changed by Karrtik - start
			//td_head22.appendChild(document.createTextNode(store.data.getAt(0).get("rightprotocol")["remark"]));
			var remarks = rightremark; //store.data.getAt(0).get("rightprotocol")["remark"];
			td_head22 = me.addRemarks(td_head22, remarks);
			//Changed by Karrtik - end
			td_head22.setAttribute("class", "CompareHeaderRightRemark");
			td_head21.setAttribute("style", "width:30%;border-spacing: 0px 0px;padding:0px;padding-left:10px;");
			td_head22.setAttribute("style", "width:30%;border-spacing: 0px 0px;padding:0px;padding-left:10px;");
			tr_header2.appendChild(td_head21);
			tr_header2.appendChild(td_head22);
		} else {
			var td_head22 = document.createElement("td");
			//Changed by Karrtik - start
			//td_head22.appendChild(document.createTextNode(store.data.getAt(0).get("rightprotocol")["remark"]));
			var remarks = rightremark; //store.data.getAt(0).get("rightprotocol")["remark"];
			td_head22 = me.addRemarks(td_head22, remarks);
			//Changed by Karrtik - end
			td_head22.setAttribute("class", "CompareHeaderRemarkOnly");
			td_head22.setAttribute("colspan", "2");
			td_head22.setAttribute("style", "width:60%;border-right: 0px solid #ABC0E2;border-spacing: 0px 0px;padding:0px;padding-left:10px;");
			tr_header2.appendChild(td_head22);
		}
		return tr_header2;
	},
	createChiledTrElement: function(me, sublist, mainIndex, level, row) {

		var tr_submain_node = document.createElement("tr");
		tr_submain_node.id = me.uniqueid + '_trchild_' + mainIndex;
		var td_sub_main_node = document.createElement("td");
		td_sub_main_node.setAttribute("colspan", 3);
		td_sub_main_node.setAttribute("style", "width:100%;padding:0px;border-spacing: 0px 0px;");
		var table_sub_node = document.createElement("table");
		table_sub_node.setAttribute("class", "CompareTableCommon");

		for (var j = 0; j < sublist.length; j++) {

			row++;
			var targetvalue = sublist[j]["targetvalue"];
			var mastervalue = sublist[j]["mastervalue"];
			var tr_sub_node = document.createElement("tr");
			tr_sub_node.setAttribute("name", row);
			tr_sub_node.setAttribute("style", "height:" + me.cellHeight + "px;");
			tr_sub_node.id = me.uniqueid + '_tr_' + mainIndex + '_' + j;
			var paracssclass = '';
			if (!this.isExistTarget) {
				paracssclass = me.getRowStyle(row, false, 0);
			} else {
				paracssclass = me.getRowStyle(row, targetvalue != mastervalue, 0);
			}
			tdText = sublist[j]["name"];
			var image_right = null;
			if (sublist[j]["haschild"] == "true") {
				image_right = document.createElement("img");
				image_right.id = 'img_' + me.uniqueid + '_trchild_' + mainIndex + '_' + j;
				image_right.src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
			}

			var td_sub_node = me.createParaTdElement(me.uniqueid + "_td_" + mainIndex + '_' + j, paracssclass, tdText, image_right, level);

			tr_sub_node.appendChild(td_sub_node);
			td_sub_node.setAttribute("style", "padding-left:" + level + "px;width:40%;border-bottom:0px solid #ABC0E2;");
			if (sublist[j]["haschild"] == "true") {
				this.tdIdsub = me.uniqueid + '_trchild_' + mainIndex + '_' + j;
//				td_sub_node.setAttribute('class', 'compare-para-td-sub');
				td_sub_node.setAttribute('class','compare-td-sub-node ' + paracssclass);
				td_sub_node.setAttribute('tdId',me.uniqueid + '_trchild_' + mainIndex + '_' + j);
			} else {
				td_sub_node.setAttribute('id','attributeUsedForCollapse' + me.leafCounter);
				me.leafCounter++;
			}
			var valuecssclass = '';

			if (!this.isExistTarget) {
				var _widthValue = (document.documentElement.clientWidth - 65) * 0.6;
				valuecssclass = me.getRowStyle(row, false, 1);
				var td_target_node = me.createCommonTd(valuecssclass, targetvalue);
				if (getStringRealWidth(styleCompareTipGlobal, targetvalue) > _widthValue) {
					td_target_node.setAttribute("data-qtip", targetvalue);
				}
				td_target_node.setAttribute("width", "60%");
				td_target_node.setAttribute("colspan", "2");
				tr_sub_node.appendChild(td_target_node);
			} else {
				var _widthValue = (document.documentElement.clientWidth - 65) * 0.3;
				valuecssclass = me.getRowStyle(row, targetvalue != mastervalue, 1);
				var td_target_node = me.createCommonTd(valuecssclass, targetvalue);
				var td_master_node = me.createCommonTd(valuecssclass, mastervalue);
				td_target_node.setAttribute("width", "30%");
				if (getStringRealWidth(styleCompareTipGlobal, targetvalue) > _widthValue) {
					td_target_node.setAttribute("data-qtip", targetvalue);
				}
				if (getStringRealWidth(styleCompareTipGlobal, mastervalue) > _widthValue) {
					td_master_node.setAttribute("data-qtip", mastervalue);
				}
				td_master_node.setAttribute("width", "30%");
				tr_sub_node.appendChild(td_target_node);
				tr_sub_node.appendChild(td_master_node);
			}

			table_sub_node.appendChild(tr_sub_node);


			if (sublist[j]["haschild"] == "true") {
				var tr = me.createChiledTrElement(me, sublist[j]["childlist"], mainIndex + '_' + j, level + 20, row);
				table_sub_node.appendChild(tr);
				row += me.getChildRowCount(me, sublist[j]["childlist"]);
			}
		}
		td_sub_main_node.appendChild(table_sub_node);
		tr_submain_node.appendChild(td_sub_main_node);

		return tr_submain_node;
	},
	getRowStyle: function(rowIndex, isDiff, columnIndex) {
		var cssclass = "";
		if (columnIndex == 0) {
			if (isDiff) {
				if (rowIndex % 2 == 0) {
					cssclass = "CompareGridFontLeftEvenBold";
				} else {
					cssclass = "CompareGridFontLeftOddBold";
				}

			} else {
				if (rowIndex % 2 == 0) {
					cssclass = "CompareGridFontLeftEvenSmall";
				} else {
					cssclass = "CompareGridFontLeftOddSmall";
				}
			}
		} else if (rowIndex % 2 == 0) {
			if (isDiff) {
				cssclass = "CompareGridFontCenterEvenBold";
			} else {
				cssclass = "CompareGridFontCenterEvenSmall";
			}
		} else {
			if (isDiff) {
				cssclass = "CompareGridFontCenterOddBold";
			} else {
				cssclass = "CompareGridFontCenterOddSmall";
			}
		}
		return cssclass;
	},
	getChildRowCount: function(me, list) {
		var count = 0;

		for (var i = 0; i < list.length; i++) {
			count++;
			if (list[i]["haschild"] == "true") {
				count += me.getChildRowCount(me, list[i]["childlist"]);
			}
		}
		return count;
	},
	hideNoChange: function() {
		this.isHide = !this.isHide;
		this.refrush();
	},
	filterChange: function(list) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (list[i]["haschild"] == "true") {
				list[i]["childlist"] = this.filterChange(list[i]["childlist"]);
				if ((list[i]["childlist"] == null || list[i]["childlist"].length == 0) && list[i]["targetvalue"] == list[i]["mastervalue"]) {
					list.splice(i, 1);
				}
			} else if (list[i]["haschild"] == "false") {
				if (list[i]["targetvalue"] == list[i]["mastervalue"]) {
					list.splice(i, 1);
				}
			}
		}
		return list;
	},
	LoadData: function(store) {
		var me = this;
		var table_node = me.createTableElement(me, store);
		return table_node.outerHTML;
	},
	createParaTdElement: function(id, cssclass, text, image, paddingleft) {

		var td_node = document.createElement("td");
		td_node.setAttribute("class", cssclass);
		var td_text = document.createTextNode(text);
		var _widthParaName = (document.documentElement.clientWidth - 65) * 0.3 - paddingleft - 20;
		if (image != null) {
			var table = document.createElement("table");
			table.setAttribute("class", "CompareTableCommon");
//			table.setAttribute("style","color:#FFFFFF;width: 100%;height: 100%;table-layout: fixed;border-spacing: 0px 0px;");
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.appendChild(image);
			td1.setAttribute("style", "width:20px;");
			var td2 = document.createElement("td");
			td2.appendChild(td_text);
			td1.setAttribute("class", cssclass);
			td2.setAttribute("class", cssclass);
			if (getStringRealWidth(styleCompareTipGlobal, text) > _widthParaName) {
				td2.setAttribute("data-qtip", text);
			}
			tr.appendChild(td1);
			tr.appendChild(td2);
			table.appendChild(tr);
			td_node.appendChild(table);
		} else {

			var table = document.createElement("table");
			table.setAttribute("class", "CompareTableCommon");
//			table.setAttribute("style","color:#FFFFFF;width: 100%;height: 100%;table-layout: fixed;border-spacing: 0px 0px;");
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.appendChild(document.createTextNode(''));
			td1.setAttribute("style", "width:20px;");
			var td2 = document.createElement("td");
			td1.setAttribute("class", cssclass);
			td2.setAttribute("class", cssclass);
			td2.appendChild(td_text);
			if (getStringRealWidth(styleCompareTipGlobal, text) > _widthParaName) {
				td2.setAttribute("data-qtip", text);
			}
			tr.appendChild(td1);
			tr.appendChild(td2);
			table.appendChild(tr);
			td_node.appendChild(table);


		}

		return td_node;
	},
	createCommonTd: function(cssclass, text) {
		var td_node = document.createElement("td");
		td_node.setAttribute("class", cssclass);
		var td_text = document.createTextNode(text);
		td_node.appendChild(td_text);
		return td_node;
	},
	createHeaderTd: function(protocol, isLeft, otherprotocol) {

		var td_node = document.createElement("td");

		if (protocol != null) {
			var compareflag = 0;

			if (isLeft) {
				compareflag = this.store.data.getAt(0).get("leftcompareflag");
			} else {
				compareflag = this.store.data.getAt(0).get("rightcompareflag");
			}

			var table = document.createElement("table");
			table.setAttribute("class", "CompareSubHeader");

			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.setAttribute("class", "CompareHeaderArrowLeft");
			var td2 = document.createElement("td");
			var textTable = document.createElement("table");
			textTable.setAttribute("class", "CompareTextHeader");
			textTable.setAttribute("style", "border-spacing: 0px 0px;border:0px;");
			var textTr = document.createElement("tr");
			var textTd = document.createElement("td");
			var modelTr = document.createElement("tr");
			var modelTd = document.createElement("td");
			modelTr.appendChild(modelTd);

			var nIndex = protocol["modelname"].lastIndexOf('/');
			var res = new Array();
			res[0] = protocol["modelname"].substring(0, nIndex);
			res[1] = protocol["modelname"].substring(nIndex + 1, protocol["modelname"].length);
			modelTd.innerHTML = "<p style='margin:0 0;font-size:15px;height:19px'>" + res[0] + "</p>" + "<p style='margin:0 0;font-size:15px;height:19px'>" + res[1] + " </p>";

			modelTd.setAttribute("height", "25px;");
			var timestatusspan = document.createElement("span");

			var protocol_status = protocol["status"];
			if (isLeft) {
				if (this.displayVersion == protocol["version"] && this.displayUid == protocol["uid"]) {
					protocol_status = this.displayStatus;
				}
			} else {

				if (otherprotocol["version"] == null) {
					if (this.displayStatus != null) {
						protocol_status = this.displayStatus;
					}

				} else {
					if (this.displayVersion == protocol["version"] && this.displayUid == protocol["uid"]) {
						protocol_status = this.displayStatus;
					}
				}
			}
			timestatusspan = this.setSpanImage(timestatusspan, protocol_status, compareflag == 1);

			textTd.appendChild(timestatusspan);

			var td_text = document.createTextNode(" " + protocol["epname"]);

			textTd.appendChild(td_text);

			var _widthHeaderTitle = (document.documentElement.clientWidth - 65) * 0.6 / 2;
			if (!this.isExistTarget) {
				_widthHeaderTitle = (document.documentElement.clientWidth - 65) * 0.6;
			}
			var nameWidth = getStringRealWidth(styleTitleTipGlobal, protocol["epname"]);

			if (nameWidth > _widthHeaderTitle - 70) {
				textTable.setAttribute("width", "90%");
				textTd.setAttribute("width", "100%");
				textTd.setAttribute("data-qtip", protocol["epname"]);
			}
			var modelWidth = getStringRealWidth(styleTitleTipGlobal, protocol["modelname"]);
			if (modelWidth > _widthHeaderTitle - 70) {
				modelTd.setAttribute("data-qtip", protocol["modelname"]);
			}

			textTr.appendChild(textTd);

			if (this.isExistTarget && isLeft == this.isLeft && !this.isSameOrgan) {
				textTd.setAttribute("class", "CompareHeaderYellowFontBold CompareHeaderTitle");
			} else {
				textTd.setAttribute("class", "CompareHeaderFontBold CompareHeaderTitle");
			}

			var timeTr = document.createElement("tr");
			var timeTd = document.createElement("td");
			textTd.setAttribute("style", "text-align:center;border:0px;padding-top:0px;font-weight:bold;");
			var other_protocol_name = '';
			var protocol_name = protocol["epname"];
			if(otherprotocol != ''){
				other_protocol_name = otherprotocol["epname"];
			}

			this.protocoluid = protocol["uid"];
			this.protocolepno = protocol["epno"];
			this.protocolname = protocol_name;
			this.protocolversion = protocol["version"];
			this.protocolstatus = protocol["status"];
			this.protocolorgan = protocol["organ"];
			this.protocolpatienttype = protocol["patienttype"];
			this.protocolprotocoltype = protocol["protocoltype"];
			this.protocolfilepath = protocol["filepath"],
			this.otherprotocoluid = otherprotocol["uid"];
			this.otherprotocolepno = otherprotocol["epno"];
			this.otherprotocolname = other_protocol_name;
			this.otherprotocolversion = otherprotocol["version"];
			this.otherprotocolstatus = otherprotocol["status"];
			this.otherprotocolorgan = otherprotocol["organ"];
			this.otherprotocolpatienttype = otherprotocol["patienttype"];
			this.otherprotocolprotocoltype = otherprotocol["protocoltype"];
			this.otherprotocolfilepath = otherprotocol["filepath"];
			if(isLeft){
				this.leftArray = {
					uid : protocol["uid"],
					epno : protocol["epno"],
					name : protocol_name,
					version : protocol["version"],
					status : protocol["status"],
					organ : protocol["organ"],
					patienttype : protocol["patienttype"],
					protocoltype : protocol["protocoltype"],
					filepath     : protocol["filepath"],
					otherprotocoluid : otherprotocol["uid"],
					otherprotocolepno : otherprotocol["epno"],
					otherprotocolname : other_protocol_name,
					otherprotocolversion : otherprotocol["version"],
					otherprotocolstatus : otherprotocol["status"],
					otherprotocolorgan : otherprotocol["organ"],
					otherprotocolpatienttype : otherprotocol["patienttype"],
					otherprotocolprotocoltype : otherprotocol["protocoltype"],
					otherfilepath : otherprotocol["filepath"],
					protocoleptype : otherprotocol["protocoleptype"]
				}
			}else{
				this.rightArray = {
					uid : protocol["uid"],
					epno : protocol["epno"],
					name : protocol_name,
					version : protocol["version"],
					status : protocol["status"],
					organ : protocol["organ"],
					patienttype : protocol["patienttype"],
					protocoltype : protocol["protocoltype"],
					filepath     : protocol["filepath"],
					otherprotocoluid : otherprotocol["uid"],
					otherprotocolepno : otherprotocol["epno"],
					otherprotocolname : other_protocol_name,
					otherprotocolversion : otherprotocol["version"],
					otherprotocolstatus : otherprotocol["status"],
					otherprotocolorgan : otherprotocol["organ"],
					otherprotocolpatienttype : otherprotocol["patienttype"],
					otherprotocolprotocoltype : otherprotocol["protocoltype"],
					otherfilepath : otherprotocol["filepath"],
					protocoleptype : otherprotocol["protocoleptype"]
				}
			}


			if (protocol["protocoltype"] == 'ExamPlan') {
				if (this.isExistTarget) {
					if (compareflag < 5 || isLeft) {
						this.isBindOpenOthersWindow = true;
						textTd.setAttribute("style", "cursor:pointer;text-align:center;font-weight:bold;");
						timeTd.setAttribute("style", "cursor:pointer;text-align:center;");
						modelTd.setAttribute("style", "cursor:pointer;text-align:center;");
					}else{
						this.isBindOpenOthersWindow = false;
					}

				} else {
					if(this.displayStatus.indexOf("DELETION") == -1){
						this.isBindBothCompare = true;
						textTd.setAttribute("style", "cursor:pointer;text-align:center;font-weight:bold;");
						timeTd.setAttribute("style", "cursor:pointer;text-align:center;");
						modelTd.setAttribute("style", "cursor:pointer;text-align:center;");
					}else{
						textTable.setAttribute("class", "CompareTextHeader-no-hover");
					}
				}
			}else{
				this.isBindOpenOthersWindow = false;
				this.isBindBothCompare = false;
			}

			var text_time = null;
			var protocol_time = protocol["time"];
			text_time = document.createTextNode(" " + DateFormatByExt(new Date(protocol_time), 'Y M d H:i'));

			var timetable = document.createElement("table");
			timetable.setAttribute("style", "table-layout:fixed; margin: auto;border-spacing: 0px 0px;border:0px;");
			var timetr = document.createElement("tr");
			var timetd = document.createElement("td");

			var versionTd = document.createElement("td");
			var version_text = document.createTextNode("V" + protocol["version"]);
			versionTd.appendChild(version_text);
			if (this.isExistTarget && isLeft == this.isLeft && !this.isSameOrgan) {
				versionTd.setAttribute("class", "CompareHeaderYellowSmallFontBold");
			} else {
				versionTd.setAttribute("class", "CompareHeaderSmallFontBold");
			}

			versionTd.setAttribute("width", "40px");
			versionTd.setAttribute("style", "text-align:left;");


			timetd.appendChild(text_time);
			timetr.appendChild(versionTd);
			timetr.appendChild(timetd);
			timetable.appendChild(timetr);
			timeTd.appendChild(timetable);
			timeTr.appendChild(timeTd);

			if (this.isExistTarget && isLeft == this.isLeft && !this.isSameOrgan) {
				timeTd.setAttribute("class", "CompareHeaderYellowSmallFontBold");
				modelTd.setAttribute("class", "CompareHeaderYellowSmallFontBold");
			} else {
				timeTd.setAttribute("class", "CompareHeaderSmallFontBold");
				modelTd.setAttribute("class", "CompareHeaderSmallFontBold");
			}
			timeTd.setAttribute("colspan", "2");
			timeTd.setAttribute("style", "border-spacing: 0px 0px;border:0px;padding:0px;");
			if (protocol["protocoltype"] == 'ExamPlan') {
				if (this.isExistTarget) {
					if (compareflag < 5 || isLeft) {
						timeTd.setAttribute("style", "cursor:pointer;border-spacing: 0px 0px;border:0px;padding:0px;");
					}
				}else{
					if(this.displayStatus.indexOf("DELETION") == -1){
						timeTd.setAttribute("style", "cursor:pointer;border-spacing: 0px 0px;border:0px;padding:0px;");
					}
				}
			}

			textTable.appendChild(textTr);
			textTable.appendChild(modelTr);
			textTable.appendChild(timeTr);
			td2.setAttribute("style", "text-align:center;height:80px;padding:0px;border:0px;border-spacing: 0px 0px;padding:0px;");
			td2.appendChild(textTable);

			var td3 = document.createElement("td");
			td3.setAttribute("class", "CompareHeaderArrowRight");

			tr.appendChild(td2);
			table.appendChild(tr);
			td_node.appendChild(table);
		}

		return td_node;
	},

	setSpanImage: function(span, status, ismaster) {
		span.setAttribute("class", "StatusStyle");
		if (ismaster) {
			if (status == ProtocolStatus.approvalAccepted) {
				span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_mst_app.png');");
			} else if (status == ProtocolStatus.localUseAccepted) {
				span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_mst_keep.png');");
			}
		} else if (status == ProtocolStatus.approvalAccepted) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_app.png');");
		} else if (status == ProtocolStatus.deletionAccepted) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_del.png');");
		} else if (status == ProtocolStatus.approvalRequested) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_app_req.png');");
		} else if (status == ProtocolStatus.deletionRequested) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_del_req.png');");
		} else if (status == ProtocolStatus.localUseAccepted) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_keep.png');");
		} else if (status == ProtocolStatus.approvalRejected) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_app_rej.png');");
		} else if (status == ProtocolStatus.deletionRejected) {
			span.setAttribute("style", "background-image:url('" + PROCESS_PATH_GLOBAL_RESOURCES + "images/prostatus/icon_s_del_rej.png');");
		}
		return span;
	},

	setDisplayParams: function(status, time, comments, version, uid, requestRemark, eventid) {
		var me = this;
		me.displayTime = time;
		me.displayComments = comments;
		me.displayStatus = status;
		me.displayVersion = version;
		me.displayUid = uid;
		me.displayRemark = requestRemark;
		me.eventid = eventid;
	},

	addRemarks: function(td_head, remarks) {
		var arrayremarks = remarks.split("\\n");

		for (var rm in arrayremarks) {
			var oNewP = document.createElement("p");

            var oText = document.createElement('span');
            oText.innerHTML = arrayremarks[rm];
            oNewP.appendChild(oText);
			oNewP.setAttribute("style", "padding:0px;margin:0px;");
			td_head.appendChild(oNewP);
		}

		return td_head;
	},



	fillCompareBlankLine: function() {
		var table = document.getElementById(this.uniqueid + "compareTable");
		if (table == null || table == "undefined") {
			return;
		}
		var panel = this.tablePanel.body.dom;

		var elements = table.getElementsByTagName("tr");
		for (var i = elements.length - 1; i >= 0; i--) {

			if (elements[i].getAttribute("name") == "addrow")
				table.removeChild(elements[i]);

		}

		var css = this.findlastclass(table.childNodes[0]);
		var n = 0;
		if (css.indexOf("Odd") > 0) {
			n = 1;
		}
		var displayCount = 0;
		for(var i=0;i<table.rows.length;i++){
			if(table.rows[i].style.display !='none'){
				displayCount++;
			}
		}
		var tableHeight = panel.scrollHeight - this.remarkCount*50;
		var emptyHeight = tableHeight - (displayCount-this.remarkCount)*30;
		var haveHeight=0;

		for(var i=1,len=table.rows.length,dataHeight=0;i<len;i++){
			if(i%2==0){
				dataHeight = table.rows[i].scrollHeight-30;
				if(dataHeight>0){
					haveHeight =haveHeight +dataHeight;
				}
			}
		}
		if (panel.scrollHeight - table.offsetHeight > 0) {
			var rowSize = Math.ceil((emptyHeight-haveHeight) / 30);
			var lastHeight=emptyHeight-haveHeight-30*(rowSize-1);
			if (rowSize > 0) {
				for (var i = 0; i < rowSize; i++) {
					var tr_header2 = document.createElement("tr");
					tr_header2.setAttribute("style", "height:30px;");
					if(i == rowSize - 1){
						tr_header2.setAttribute("style", "height:"+ lastHeight +"px;");
					}
					tr_header2.setAttribute("name", "addrow");
					var td_head_node2 = document.createElement("td");

					if (i % 2 == n) {
						td_head_node2.setAttribute("class", "CompareGridFontLeftOddSmall");
					} else {
						td_head_node2.setAttribute("class", "CompareGridFontLeftEvenSmall");
					}

					tr_header2.appendChild(td_head_node2);
					if (this.isExistTarget) {

						var td_head21 = document.createElement("td");
						var td_head22 = document.createElement("td");
						if (i % 2 == n) {
							td_head21.setAttribute("class", "CompareGridFontCenterOddSmall");
							td_head22.setAttribute("class", "CompareGridFontCenterOddSmall");
						} else {
							td_head21.setAttribute("class", "CompareGridFontCenterEvenSmall");
							td_head22.setAttribute("class", "CompareGridFontCenterEvenSmall");
						}

						td_head21.setAttribute("style", "width:30%");
						td_head22.setAttribute("style", "width:30%");
						tr_header2.appendChild(td_head21);
						tr_header2.appendChild(td_head22);
					} else {
						var td_head22 = document.createElement("td");
						if (i % 2 == n) {
							td_head22.setAttribute("class", "CompareGridFontCenterOddSmall");
						} else {
							td_head22.setAttribute("class", "CompareGridFontCenterEvenSmall");
						}

						td_head22.setAttribute("colspan", "2");
						td_head22.setAttribute("style", "width:60%;border-right: 0px solid #ABC0E2;");
						tr_header2.appendChild(td_head22);
					}
					table.appendChild(tr_header2);

				}

			}

		}
	},

	compareItemClick: function(tdid) {
		if (document.getElementById(tdid).style.display == "") {
			document.getElementById(tdid).style.display = "none";
			document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/collapse.png";
		} else {
			document.getElementById(tdid).style.display = "";
			document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
		}

		this.fillCompareBlankLine();
	},

	compareItemClickForCollapse: function(tdid) {
		var leafNodeList = document.getElementById(tdid).childNodes[0].childNodes[0].childNodes[0].childNodes;
		var onlyHaveLeaf = true;
		for (var i = 0, len = leafNodeList.length; i < len; i++) {
			if (leafNodeList[i].id.indexOf('child') !== -1) {
				onlyHaveLeaf = false;
			}
		}
		if (onlyHaveLeaf) {
			if (document.getElementById(tdid).style.display == "") {
				document.getElementById(tdid).style.display = "none";
				document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/collapse.png";
			} else {
				document.getElementById(tdid).style.display = "";
				document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
			}

			this.fillCompareBlankLine();
		}
	},

	compareItemClickForWithLeaf: function(tdid) {
		var leafDisplayControlFlag = true;
		if (document.getElementById(tdid).style.display == "") {
			document.getElementById(tdid).style.display = "none";
			leafDisplayControlFlag = false;
			document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/collapse.png";
		} else {
			document.getElementById(tdid).style.display = "";
			leafDisplayControlFlag = true;
			document.getElementById('img_' + tdid).src = PROCESS_PATH_GLOBAL_RESOURCES + "images/arrows/unfold.png";
		}
		var leafNodeList = document.getElementById(tdid).childNodes[0].childNodes[0].childNodes[0].childNodes;
		var leafFlag = leafNodeList[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		if(!leafFlag) {
			for (var i = 0, len = leafNodeList.length; i < len; i++) {
				if (!leafDisplayControlFlag) {
					leafNodeList[i].style.display = "none";
				} else {
					leafNodeList[i].style.display = "";
				}
			}
		}

		this.fillCompareBlankLine();
	},

	findlastclass: function(obj) {
		var elements = obj.childNodes;
		for (var i = elements.length - 1; i >= 0; i--) {
			if (elements[i].style != null && elements[i].style.display == "") {
				if (elements[i].getAttribute("class") != null && elements[i].getAttribute("class").indexOf("CompareGridFont") >= 0) {
					return elements[i].getAttribute("class");
				} else {
					return this.findlastclass(elements[i]);
				}
			}
		}
		return "";
	},
	compareInit: function(p){
		p.refrush();
	}

});
