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
Ext.define('PM.view.master.ExamPlanSetting', {
    extend: 'PM.view.panel.Click',
    alias: 'widget.masterexamplansetting',
    cls: 'panel-NoborderPadding-transparent',
    bodyCls: 'panel-NoborderPadding-transparent',
    margin: '0 12 0 12',
    minWidth: 575,
    mainPanel: null,
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

    btnOKConfirm: null,
    btnRemoveConfirm: null,
    btnSetDefault: null,
    btnReset: null,
    panelClientHeight: 704,
    organName: 'Head',
    existUIDArray: [],
    historyEpnumlist: [],
    originalEPDataStore: [],
    storeData: [],
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
    initComponent: function () {
        var me = this;

        me.initializeData();

        var westPanelHeader = Ext.create('Ext.panel.Panel', {
            height: 40,
            cls: 'panel-NoborderPadding-transparent',
            bodyCls: 'Master-Setting-Header',
            html: stringSetting.master.title.MasterList
        });

        me.westPanelTable = Ext.create('PM.view.panel.OnMouse', {
            bodyCls: 'panelExam-Master-List-NoPadding',
            height: 530,
            html: '',
            onMouseUp: function (e) {
                me.masterMouseUp(e);
            }
        });

        var westPanel = Ext.create('Ext.panel.Panel', {
            region: 'west',
            cls: 'panel-NoborderPadding-transparent',
            bodyCls: 'panel-NoborderPadding-transparent',
            bodyStyle: 'padding-top:3px;',
            width: '18%',
            items: [westPanelHeader, me.westPanelTable]
        });

        me.headerSouthPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            cls: 'panel-NoborderPadding-transparent',
            bodyCls: 'panel-NoborderPadding-transparent',
            bodyStyle: 'padding-top:10px;padding-bottom:10px;',
            width: 700,
            html: ''
        });

        me.createButtonArea();

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
            items: [me.btnSetDefault, me.btnOKConfirm, me.btnRemoveConfirm, me.btnReset]
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
            margin: '0 70 0 0',
            width: 342,
            height: 456,
            items: [me.tabsImgPanel, me.frameContent]
        });

        me.panelEastTabs = Ext.create('Ext.panel.Panel', {
            bodyCls: 'panel-NoborderPadding-transparent',
            width: 450,
            height: 35,
            html: me.createPanelTab(false)
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
            items: [me.panelEastTabs,
                me.frameEastContent,
                panelConfirmButton]
        });

        me.eastPanel = Ext.create('Ext.panel.Panel', {
            region: 'east',
            layout: 'border',
            bodyCls: 'panel-NoborderPadding-transparent',
            width: '79%',
            items: [me.headerSouthPanel, me.eastWestPanel, me.eastEastPanel]
        });

        Ext.applyIf(this, {
            items: [westPanel, me.eastPanel]
        });
        this.callParent(arguments);

        me.initStore();
    },
    loadData: function (list) {
        var me = this;
        me.protocolList = list;
        me.pushData(list);
        me.scannerGroupStore.load({
            params: {
                scanner_group: me.mainPanel.settingNameList[me.mainPanel.scannerIndex],
                key_array: me.formatJson(me.originalEPDataStore)
            }
        });
    },
    createButtonArea: function () {
        var me = this;
        me.btnOKConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.master.button.OKbtn + '<span>',
            disabled: false,
            handler: function () {
                for(var i = 0,data;data = me.addNewEPnumArray[i++];) {
                    if (me.selectNumKey == data.key) {
                        for (var j = 0, data1; data1 = me.originalEPDataStore[j++];) {
                            if (me.selectNumKey == data1.key) {
                                data.epno = me.selectNewNum;
                                data.isalter = true;
                            }
                        }
                    }
                }
                me.createOKFireEvent();
                me.updatePanel();
            }
        });

        me.btnRemoveConfirm = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.master.button.Move + '<span>',
            disabled: false,
            handler: function () {
                var tdKey;
                var td = document.getElementsByClassName('add-highlight');
                if (td.length > 0) {
                    for (var i = 0, len = td.length; i < len; i++) {
                        if (td[i].innerText.length > 4) {
                            tdKey = td[i].firstChild.getAttribute("key");
                        }
                    }
                } else {
                    return;
                }
                for(var i = 0,data; data = me.addNewEPnumArray[i++];) {
                    if (tdKey == data.key) {
                        for (var j = 0, data1; data1 = me.originalEPDataStore[j++];) {
                            if (tdKey == data1.key) {
                                data.epno = data1.epno;
                                if (me.selectNumKey == tdKey) {
                                    me.selectNewNum = data1.epno;
                                }
                                data.isalter = false;
                            }
                        }
                    }
                }
                me.createMoveFireEvent();
                me.updatePanel();
            }
        });

        var btnSetDefaultWidth = 118;
        var btnSetDefaultCls = 'icon-button';
        var btnSetDefaultOverCls = 'icon-button-over';
        var btnSetDefaultDisabledCls = 'icon-button-disable';
        if(memoryLanguage == 'DE' || memoryLanguage == 'ES' || memoryLanguage == 'FR' || memoryLanguage == 'IT' || memoryLanguage == 'NL' || memoryLanguage == 'PT') {
            btnSetDefaultWidth = 270;
            btnSetDefaultCls = 'icon-button-large';
            btnSetDefaultOverCls = 'icon-button-over-large';
            btnSetDefaultDisabledCls = 'icon-button-disable-large';
        }
        me.btnSetDefault = Ext.create('Ext.Button', {
            height: 32,
            width: btnSetDefaultWidth,
            cls: btnSetDefaultCls,
            overCls: btnSetDefaultOverCls,
            disabledCls: btnSetDefaultDisabledCls,
            text: '<span class="SpanTextView">' + stringSetting.master.button.Setasdefault + '<span>',
            disabled: false,
            handler: function () {
                var usedNum = [];
                var flag = 0;

                for (var i = 0, data; data = me.addNewEPnumArray[i++];) {
                    if (data.isalter) {
                        usedNum.push(data.epno);
                    } else {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    return;
                }
                for (var i = 0, data; data = me.historyEpnumlist[i++];) {
                    usedNum.push(data.epno);
                }
                for (var i = 0, data; data = me.addNewEPnumArray[i++];) {
                    var flag = 0;
                    for (var j = 0, len = usedNum.length; j < len; j++) {
                        if (!data.isalter && data.epno == usedNum[j]) {
                            flag = 1;
                        }
                    }
                    if (flag == 0) {
                        data.isalter = true;
                        usedNum.push(data.epno);
                    }
                }
                me.checkOkMoveStatus(me.selectNumKey);
                if (me.selectNumKey == null) {
                    me.btnOKConfirm.setDisabled(true);
                    me.btnRemoveConfirm.setDisabled(true);
                }
                me.setAsDefaultSelectRow();
                me.updatePanel();
            }
        });
        me.btnReset = Ext.create('Ext.Button', {
            height: 32,
            width: 118,
            cls: 'icon-button',
            overCls: 'icon-button-over',
            pressedCls: 'icon-button-pressed',
            focusCls: 'icon-button-focus',
            disabledCls: 'icon-button-disable',
            text: '<span class="SpanTextView">' + stringSetting.master.button.Reset + '<span>',
            disabled: false,
            handler: function () {
                me.radioFlag = 0;
                me.selectNumKey = null;
                for(var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
                    me.addNewEPnumArray[i].isalter = false;
                }
                me.clearOriginEPNum();
                me.clearTabSelected(me.radioFlag);
                me.checkOkMoveStatus(me.selectNumKey);
                me.panelUpdate();
                me.clearMasterListSelected();
                me.clearTabBodySelected();
                me.updatePanel();
            }
        });
    },
    initStore: function () {
        var me = this;
        me.scannerGroupStore = new Ext.data.Store({
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

        me.scannerGroupStore.on("load", function () {
            me.clearOriginEPNum();
            me.clearTabSelected(me.radioFlag);
            me.checkOkMoveStatus(me.selectNumKey);
            me.panelUpdate();
            me.clearMasterListSelected();
            me.clearTabBodySelected();

            Ext.getBody().unmask();
            clearMask();
        });

        me.panelUpdate();
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
    createMoveFireEvent: function () {
        var me = this;
        var selectdom = document.querySelector(".ExamPlan-List-Table .selectedTr");
        var index = selectdom.rowIndex;
        var dom = selectdom.parentElement.childNodes;
        var flag = index;
        for (var i = flag + 1, len = dom.length; i < len; i++) {
            var key = dom[i].firstChild.getAttribute("key");
            for (var j = 0, data; data = me.addNewEPnumArray[j]; j++) {
                if (data.key == key && data.isalter) {
                    flag = i;
                    break;
                }
            }
            if (flag != index) {
                break;
            }
        }
        if (flag == index) {
            for (var i = 0; i < flag + 1; i++) {
                var key = dom[i].firstChild.getAttribute("key");
                for (var j = 0, data; data = me.addNewEPnumArray[j]; j++) {
                    if (data.key == key && data.isalter) {
                        flag = i;
                        break;
                    }
                }
                if (flag != index) {
                    break;
                }
            }
        }
        var nextdom = selectdom.parentElement.childNodes[flag].firstChild;
        if (nextdom.className != "end forbid") {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            nextdom.dispatchEvent(event);
        } else {
            me.checkOkMoveStatus(me.selectNumKey);
        }
        me.checkNextStatus();
        var tableEl = me.westPanelTable.body.dom;
        if (flag * 35 > 495) {
            tableEl.scrollTop = 35 * flag - 35;
        }
    },
    createOKFireEvent: function () {
        var me = this;
        var selectdom = document.querySelector(".ExamPlan-List-Table .selectedTr");
        if(selectdom === null){
            return;
        }
        var index = selectdom.rowIndex;
        var dom = selectdom.parentElement.childNodes;
        var flag = index;
        for (var i = flag + 1, len = dom.length; i < len; i++) {
            var key = dom[i].firstChild.getAttribute("key");
            for (var j = 0, data; data = me.addNewEPnumArray[j]; j++) {
                if (data.key == key && !data.isalter) {
                    flag = i;
                    break;
                }
            }
            if (flag != index) {
                break;
            }
        }
        if (flag == index) {
            for (var i = 0; i < flag + 1; i++) {
                var key = dom[i].firstChild.getAttribute("key");
                for (var j = 0, data; data = me.addNewEPnumArray[j]; j++) {
                    if (data.key == key && !data.isalter) {
                        flag = i;
                        break;
                    }
                }
                if (flag != index) {
                    break;
                }
            }
        }
        var nextdom = selectdom.parentElement.childNodes[flag].firstChild;
        if (nextdom.className != "end forbid") {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            nextdom.dispatchEvent(event);
        } else {
            me.checkOkMoveStatus(me.selectNumKey);
        }
        me.checkNextStatus();
        var tableEl = me.westPanelTable.body.dom;
        if (flag * 35 > 495) {
            tableEl.scrollTop = 35 * flag - 35;
        }

    },
    setAsDefaultSelectRow: function () {
        var me = this;
        var selectdom = document.querySelector(".ExamPlan-List-Table .selectedTr");
        var dom = selectdom.parentElement.childNodes;
        var flag = 0;
        for (var i = 0, len = dom.length; i < len; i++) {
            var key = dom[i].firstChild.getAttribute("key");
            var breakFlag = false;
            for (var j = 0, data; data = me.addNewEPnumArray[j]; j++) {
                if (data.key == key && !data.isalter) {
                    flag = i;
                    breakFlag = true;
                    break;
                }
            }
            if (breakFlag) {
                break;
            }
        }
        var nextdom = selectdom.parentElement.childNodes[flag].firstChild;
        if (nextdom.className != "end forbid") {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            nextdom.dispatchEvent(event);
        } else {
            me.checkOkMoveStatus(me.selectNumKey);
        }
        me.checkNextStatus();
        var tableEl = me.westPanelTable.body.dom;
        if (flag * 35 > 495) {
            tableEl.scrollTop = 35 * flag - 35;
        }

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

        if (me.addNewEPnumArray.length > 0 && me.selectNumKey == null) {
            me.setDefaultEpNum();
        } else if (me.addNewEPnumArray.length > 0 && me.selectNumKey != null) {
            var list = me.addNewEPnumArray.filter(function (item) {
                return item.key == me.selectNumKey;
            });
            if (list.length == 0) {
                me.setDefaultEpNum();
            }
        } else if (me.addNewEPnumArray.length == 0) {
            me.selectNewNum = '';
        }
        if (me.selectNewNum != null && me.selectNewNum != "") {
            me.getTabNum(Number(me.selectNewNum));
        }


        var data = me.scannerGroupStore.data.getAt(0).data;
        me.historyEpnumlist = data.epnumberlist;
        me.existUIDArray = me.scannerGroupStore.data.getAt(0).data.epnumbernotsetlist;

        for (var i = 0, num = 0; i < me.addNewEPnumArray.length; i++) {
            if (me.addNewEPnumArray[i].isalter) {
                continue;
            }
            num++;
            var flag = 0;

            for (var j = 0, len = me.existUIDArray.length; j < len; j++) {
                if (me.existUIDArray[j].key == me.addNewEPnumArray[i].key) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                me.addNewEPnumArray[i].isalter = false;
            } else {
                me.addNewEPnumArray[i].isalter = true;
            }
        }
        if (num == 0) {
            me.btnSetDefault.setDisabled(true);
        } else {
            me.btnSetDefault.setDisabled(false);
        }
        me.btnOKConfirm.setDisabled(true);
        me.btnRemoveConfirm.setDisabled(true);
        me.checkNextStatus();
    },
    pushData: function (list) {
        var me = this;
        me.protocolList = list;
        me.originalEPDataStore = [];
        if (me.protocolList.length) {
            for (var i = 0; i < me.protocolList.length; i++) {
                if (me.protocolList[i].epno != "" && me.protocolList[i].epno) {
                    me.originalEPDataStore.push(me.protocolList[i]);
                }
            }
        }
        if (me.addNewEPnumArray.length == 0) {
            deepClone(me.addNewEPnumArray, me.originalEPDataStore);
        } else {
            me.checkDelNewEPnumArray(me.addNewEPnumArray, me.originalEPDataStore);
        }
        for (var i = 0; i < me.originalEPDataStore.length; i++) {
            me.checkNewEPnumArray(me.addNewEPnumArray, me.originalEPDataStore[i]);
        }

        sortArrayCommon(me.addNewEPnumArray, 'protocolname', 'ASC', "object");
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
        var tableArray = new Array();
        tableArray.push('<table>');
        tableArray.push('<tr class="radioSelected">');
        tableArray.push('<td value="0" class="radioClickable">');
        tableArray.push('<img class="settingTable-icon" src=');
        if (this.radioFlag == 0) {
            tableArray.push(CheckedImg.checkedImg);
        } else {
            tableArray.push(CheckedImg.uncheckedImg);
        }
        tableArray.push(' > ');
        tableArray.push('<span  style="font-size:14pt">' + stringSetting.master.button.UserProtocol + '</span>');
        tableArray.push('</td>');

        tableArray.push('<td value="1" class="radioClickable">');
        tableArray.push('<img  class="settingTable-icon" src=');
        if (this.radioFlag != 0) {
            tableArray.push(CheckedImg.checkedImg);
        } else {
            tableArray.push(CheckedImg.uncheckedImg);
        }
        tableArray.push(' > ');
        tableArray.push('<span  style="font-size:14pt">' + stringSetting.master.button.ServiceProtocol + '</span>');
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
        return tableArray.join('');
    },
    innerTabNum: function (num, listOriginNum, tableArray) {
        return {
            zero2eleven: function () {
                for (var i = num; i < num + 6; i++) {
                    tableArray.push('<tr><td>');
                    var data = (listOriginNum + i).toString();
                    if ((listOriginNum + i) < 100) {
                        if (data.length == 1) {
                            data = '00' + data;
                        }
                        if (data.length == 2) {
                            data = '0' + data;
                        }
                    }
                    tableArray.push(data);
                    tableArray.push('</td><td>');
                    var data1 = (listOriginNum + i + 6).toString();
                    if ((listOriginNum + i + 6) < 100) {
                        if (data1.length == 1) {
                            data1 = '00' + data1;
                        }
                        if (data1.length == 2) {
                            data1 = '0' + data1;
                        }
                    }
                    tableArray.push(data1);
                    tableArray.push('</td></tr>');
                }
            },
            aftertwelve: function () {
                for (var i = num; i < num + 6; i++) {
                    tableArray.push('<tr><td>');
                    var data = (listOriginNum + i).toString();
                    if ((listOriginNum + i) < 100) {
                        data = '0' + data;
                    }
                    tableArray.push(data);
                    tableArray.push('</td><td>');
                    var data1 = (listOriginNum + i + 6).toString();
                    if ((listOriginNum + i + 6) < 100) {
                        data1 = '0' + data1;
                    }
                    tableArray.push(data1);
                    tableArray.push('</td></tr>');
                }
            }
        }
    },
    createPanelTab: function (flag) {
        var tableArray = new Array();

        tableArray.push('<table class="tabPanel-header"><tr>');
        if (flag) {
            tableArray.push('<td index="1" type="Adult" class="selected">' + stringSetting.master.tab.Adult + '</td>');
            tableArray.push('<td index="2" type="Child" class="no-selected">' + stringSetting.master.tab.Child + '</td>');
            tableArray.push('<td index="3" type="Trauma" class="no-selected">' + stringSetting.master.tab.Trauma + '</td>');
        } else {
            tableArray.push('<td index="4" class="selected">' + stringSetting.master.tab.GroupA + '</td>');
            tableArray.push('<td index="5" class="no-selected">' + stringSetting.master.tab.GroupB + '</td>');
            tableArray.push('<td index="6" class="no-selected">' + stringSetting.master.tab.GroupC + '</td>');
        }
        tableArray.push('</tr></table>');
        return tableArray.join('');
    },

    panelUpdate: function () {
        var me = this;
        me.westPanelTable.update({
            bodyCls: 'panelExam-Master-List-NoPadding',
            html: me.createWestTable(me.addNewEPnumArray)
        });

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
    createWestTable: function (PersonType) {
        var me = this;
        var tableArray = [];
        var storeData = [];

        var viewHeight = 529;

        for (var i = 0; i < PersonType.length; i++) {
            storeData.push(PersonType[i]);
        }
        tableArray.push('<table width=100% class="ExamPlan-List-Table" id="original_tableList">');
        for (var i = 0; i < storeData.length; i++) {
            var lineData = storeData[i].protocolname;
            lineData = lineData.replace('"', '&quot');
            var qtip = ' data-qtip="' + lineData + '" ';
            var _style = 'no-selectedTr';
            if (i % 2 != 0) {
                _style = 'no-selectedTr-S';
            }
            if (me.selectNumKey == storeData[i].key) {
                _style = 'selectedTr';
            }
            tableArray.push('<tr class=');
            tableArray.push(_style);
            if (storeData[i].protocoleptype === 'Service') {
                tableArray.push('><td  organ="1"' + ' key=' + storeData[i].key + ' patienttype="1"'
                    + ' machinename=' + storeData[i].machinename + '  class="end"'
                    + ' style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;"' + qtip + '>');
                tableArray.push('<span organ="1"' + ' key=' + storeData[i].key + ' patienttype="1"'
                    + ' machinename=' + storeData[i].machinename + ' removestate=true'
                    + ' style="width:100%;white-space:nowrap;overflow:hidden;display:inline-block;text-overflow:ellipsis;">' + lineData + '</span>');
            } else {
                tableArray.push('><td  organ=' + storeData[i].organ + ' key=' + storeData[i].key + ' patienttype=' + storeData[i].patienttype
                    + ' machinename=' + storeData[i].machinename + '  class="end"'
                    + ' style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;"' + qtip + '>');
                tableArray.push('<span organ=' + storeData[i].organ + ' key=' + storeData[i].key + ' patienttype=' + storeData[i].patienttype
                    + ' machinename=' + storeData[i].machinename + ' removestate=true'
                    + ' style="width:100%;white-space:nowrap;overflow:hidden;display:inline-block;text-overflow:ellipsis;">' + lineData + '</span>');
            }
            tableArray.push('<span organ=' + storeData[i].organ + ' key=' + storeData[i].key + ' patienttype=' + storeData[i].patienttype
                + ' machinename=' + storeData[i].machinename
                + ' style="display:none;" class="masChildTdTr"' + ' key=' + storeData[i].key + '><img src= "' + ChangedEPNumImg + '"/></span>');
            tableArray.push('</td>');
            tableArray.push('</tr>');
        }

        var _count = Math.ceil(viewHeight / 35) - 1;

        if (storeData.length < _count) {
            for (var i = storeData.length; i < _count; i++) {
                var _style = 'even';
                if (i % 2 != 0) {
                    _style = 'odd';
                }
                tableArray.push('<tr class=');
                tableArray.push(_style);
                tableArray.push(' >');
                tableArray.push('<td class="end forbid" >');
                tableArray.push('</td>');
                tableArray.push('</tr>');

            }
        }
        var emptyHeight = viewHeight - _count * 35 - 1;
        if (emptyHeight > 0) {
            var _style2 = 'even';
            if (_count % 2 != 0) {
                _style2 = 'odd';
            }
            tableArray.push('<tr style="height:' + emptyHeight + 'px;"  class=');
            tableArray.push(_style2);
            tableArray.push(' >');
            tableArray.push('<td class="end forbid" >');
            tableArray.push('</td>');
            tableArray.push('</tr>');
        }

        tableArray.push('</table>');
        return tableArray.join('');
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
    clearMasterListSelected: function () {
        var me = this;
        var tabArr = document.getElementById("original_tableList");
        if (!tabArr) {
            return;
        }
        var tdArr = tabArr.getElementsByTagName("td");

        for(var i = 0,len = me.addNewEPnumArray.length; i < len; i++) {
            if (me.addNewEPnumArray[i].isalter == true) {
                tdArr[i].getElementsByTagName("span")[0].style.width = "90%";
                tdArr[i].getElementsByTagName("span")[1].style.display = "";
                tdArr[i].getElementsByTagName("span")[0].setAttribute('removestate', false);
                tdArr[i].getElementsByTagName("span")[1].setAttribute('removestate', false);
            } else {
                tdArr[i].getElementsByTagName("span")[0].style.width = "100%";
                tdArr[i].getElementsByTagName("span")[0].setAttribute('removestate', true);
                tdArr[i].getElementsByTagName("span")[1].style.display = "none";
            }
        }
        for (var i = 0; i < tdArr.length; i++) {
            if (tdArr[i].getAttribute("key")) {
                if (me.selectNumKey == tdArr[i].getAttribute("key")) {
                    tdArr[i].parentElement.className = "selectedTr";
                    tdArr[i].style.color = 'white';
                    if (tdArr[i].querySelector('tr .masChildTdTr')) {
                        var tr = tdArr[i].querySelector('tr .masChildTdTr');
                        tr.style.color = 'white';
                    }
                } else {
                    tdArr[i].parentElement.className = 'no-selectedTr';
                    if (i % 2 != 0) {
                        tdArr[i].parentElement.className = 'no-selectedTr-S';
                    }
                    tdArr[i].style.color = 'black';
                }
            } else if (tdArr[i].className != "masChildTdTr") {
                tdArr[i].parentElement.className = 'even';
                if (i % 2 != 0) {
                    tdArr[i].parentElement.className = 'odd';
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

        if (me.selectNumKey == null) {
            for (var i = 0; i < tdArr.length; i++) {
                tdArr[i].className = "forbid";
            }
        } else {
            var selectedTr = document.getElementsByClassName("selectedTr");
            if (selectedTr.length <= 0) {
                return;
            }
            var td = selectedTr[0].firstChild;
            if (td == null) {
                return;
            }
            var key = td.getAttribute("key");
            var flag;
            var num;
            for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
                if (me.addNewEPnumArray[i].key == key) {
                    flag = me.addNewEPnumArray[i].isalter;
                    num = me.addNewEPnumArray[i].epno;
                }
            }
            var highlightIndex = null;
            for (var i = 0; i < tdArr.length; i++) {
                if (tdArr[i].className != "childTdTr") {
                    var tdEl = me.unshiftText(tdArr[i].innerText);
                    if (me.selectNewNum == tdEl) {
                        tdArr[i].className = "selectedTd add-highlight";
                        tdArr[i].style.backgroundColor = "white";
                        tdArr[i].style.color = "black";
                        highlightIndex = i;

                    } else {
                        tdArr[i].className = "no-selectedTd";
                    }
                    var uidFlag = 0;
                    for (var j = 0, data; data = me.addNewEPnumArray[j++];) {
                        if (data.epno == tdEl && data.isalter == true) {
                            if (data.epno != me.selectNewNum) {
                                if (data.key != key) {
                                    tdArr[i].className = "forbid";
                                    tdArr[i].innerHTML = me.shiftText(data.protocolname, data.epno, data.key).listEPNum;
                                } else {
                                    tdArr[i].className = "selectedTd add-highlight";
                                    tdArr[i].innerHTML = me.shiftText(td.innerText, tdEl, key).listEPNum;
                                    me.addSelectedStyle(tdArr[i]);
                                }
                            }
                            if (data.epno == me.selectNewNum) {
                                if (data.key != key) {
                                    tdArr[i].className = "forbid add-highlight";
                                    tdArr[i].innerHTML = me.shiftText(data.protocolname, data.epno, data.key).listEPNum;
                                    tdArr[i].style.backgroundColor = "";
                                } else {
                                    tdArr[i].innerHTML = me.shiftText(td.innerText, tdEl, key).listEPNum;
                                    me.addSelectedStyle(tdArr[i]);
                                }

                            }
                            for (var k = 0, data1; data1 = me.existUIDArray[k++];) {
                                if (data.key == data1.key) {
                                    uidFlag = 1;
                                }
                            }
                        }
                    }
                    for (var k = 0, data; data = me.historyEpnumlist[k++];) {

                        if (data.epno == tdEl && uidFlag != 1) {
                            tdArr[i].className = "forbid";
                            tdArr[i].innerHTML = me.shiftText(data.protocolname, data.epno, "history").listEPNum;
                            if (num == data.epno) {
                                if (highlightIndex == i) {
                                    tdArr[i].className += " add-highlight";
                                    tdArr[i].style.backgroundColor = "";
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    addSelectedStyle: function (elem) {
        elem.style.backgroundColor = 'deepskyblue';
        var tds = elem.getElementsByTagName("td");
        for (var z = 0, len = tds.length; z < len; z++) {
            tds[z].style.backgroundColor = 'deepskyblue';
            tds[z].style.color = 'white';
        }
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
    masterMouseUp: function (e) {
        var me = this;

        if (e.button != 2) {
            return;
        }
        var selectIndex = me.rightClickMaster(e);
        if (selectIndex == -1) {
            return;
        }

        var _menu = Ext.create('PM.view.menu.Menu', {
            width: 200
        });
        var removeFormMaster = function () {
            var table = document.getElementById("original_tableList");
            var tr = table.firstChild.childNodes;
            var key = tr[selectIndex].firstChild.getAttribute("key");

            me.arraySplice(key, me.addNewEPnumArray);
            me.arraySplice(key, me.mainPanel.manualMasterData.EP);
            me.arraySplice(key, me.mainPanel.cacheContentPanel[MasterProcessStatus.CreationEP].masterTempData);
            var index;
            for (var i = 0, len = me.protocolList.length; i < len; i++) {
                if (me.protocolList[i].epno != "" && me.protocolList[i].hasOwnProperty("epno")) {
                    if (key == me.protocolList[i].key) {
                        index = i;
                        break;
                    }
                }
            }
            if (typeof index != "undefined") {
                me.protocolList.splice(index, 1);
            }

            if (me.addNewEPnumArray.length > 0) {
                me.setDefaultEpNum();
            } else {
                me.selectNumKey = null;
                me.organName = 'Head';
            }
            me.clearTabSelected(me.radioFlag);
            if (me.radioFlag == 1) {
                me.tabsImgPanel.hide();
                me.frameContent.hide();
            } else {
                me.tabsImgPanel.show();
                me.frameContent.show();
            }
            me.panelUpdate();
            me.clearTabBodySelected();
            me.clearMasterListSelected();
            me.checkNextStatus();
        };

        _menu.createMenu([stringSetting.master.menu.removeFromList], [removeFormMaster]);
        _menu.showByMouse(window.event, 3, 5);
        me.onClick(e);
    },
    checkNextStatus: function () {
        var me = this;
        var flag = 0;
        for (var i = 0, data; data = me.addNewEPnumArray[i]; i++) {
            if (data.isalter == false) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            me.mainPanel.btnNext.setDisabled(false);
        } else {
            me.mainPanel.btnNext.setDisabled(true);
        }
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
    rightClickMaster: function (e) {
        var me = this;
        var el = e.target;
        if (el.nodeName == 'SPAN' && el.className.indexOf('forbid') == -1) {
            if (el.getAttribute("removestate") === 'false') {
                return -1;
            }
            if (el.getAttribute("key") != null) {
                me.organName = el.getAttribute("organ");
                me.selectNumKey = el.getAttribute("key");
                return el.parentElement.parentElement.rowIndex;
            } else {
                return -1;
            }
        }
        else {
            return -1;
        }
    },
    checkOkMoveStatus: function (key) {
        var me = this;
        var flag = 0;

        var isalter;
        var num;
        for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
            if (!me.addNewEPnumArray[i].isalter) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            me.btnSetDefault.setDisabled(false);
        } else {
            me.btnSetDefault.setDisabled(true);
        }
        flag = 0;
        for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
            if (key == me.addNewEPnumArray[i].key) {
                isalter = me.addNewEPnumArray[i].isalter;
                num = me.addNewEPnumArray[i].epno;
                break;
            }
        }
        if (isalter) {
            for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
                if (key == me.addNewEPnumArray[i].key && me.selectNewNum == num) {
                    flag = 1;
                }
            }
        }
        else {
            for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
                if (key != me.addNewEPnumArray[i].key && me.addNewEPnumArray[i].isalter) {
                    if (num == me.addNewEPnumArray[i].epno && me.selectNewNum == num) {
                        flag = 1;
                    }
                }
            }

            for (var i = 0, len = me.historyEpnumlist.length; i < len; i++) {
                if (num == me.historyEpnumlist[i].epno && me.selectNewNum == num) {
                    flag = 2;
                }
            }
        }

        for (var i = 0, len = me.existUIDArray.length; i < len; i++) {
            if (key == me.existUIDArray[i].key) {
                flag = 2;
            }
        }
        if (flag == 0) {
            me.btnOKConfirm.setDisabled(false);
            me.btnRemoveConfirm.setDisabled(false);
        }
        if (flag == 1) {
            me.btnOKConfirm.setDisabled(true);
            me.btnRemoveConfirm.setDisabled(false);
        }
        if (flag == 2) {
            me.btnOKConfirm.setDisabled(true);
            me.btnRemoveConfirm.setDisabled(true);
        }
        if (!isalter) {
            me.btnRemoveConfirm.setDisabled(true);
        }
    },
    onClick: function (e) {
        var me = this;

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
            var selectedTr = document.getElementsByClassName("selectedTr");
            if (selectedTr.length <= 0) {
                return;
            }
            var td = selectedTr[0].firstChild;
            if (td == null) {
                return;
            }
            var key = td.getAttribute("key");

            me.selectNewNum = me.unshiftText(tdElTabBody.innerText);
            me.selectNumKey = key;
            me.checkOkMoveStatus(me.selectNumKey);
            me.updateFrameEastContent();
        }

        var tdElList = me.getTdEl(e.target, "ExamPlan-List-Table");
        if (tdElList != null) {
            if (tdElList.className.indexOf("forbid") >= 0) {
                return;
            }
            me.selectNewNum = '';
            var tdEl = e.target.getAttribute("key") ? e.target : e.target.parentNode;
            var key = tdEl.getAttribute("key");
            for (var i = 0, len = me.addNewEPnumArray.length; i < len; i++) {
                if (key == me.addNewEPnumArray[i].key) {
                    me.selectNewNum = me.addNewEPnumArray[i].epno;
                    break;
                }
            }

            me.selectNumKey = key;
            me.organName = tdEl.getAttribute("organ");
            var ptype = tdEl.getAttribute("patienttype");
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
            me.checkOkMoveStatus(me.selectNumKey);
            if (me.selectNewNum != '') {
                var data = Number(me.selectNewNum);
                me.getTabNum(data);
            }

            var img = document.getElementById('organImg');
            var picIndex = me.getPicIndexByOrgan(me.organName);
            var imgName = me.adultOrganImages[picIndex];
            img.src = adultImgFloder + imgName;
            me.patienttype = ptype;
            me.updatePanel();
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
    selectListNumTab: function (data, listNum) {
        var me = this;
        for (var i = 0; i < listNum.length; i++) {
            if (data >= listNum[i] && data < listNum[i + 1] && i != listNum.length - 1) {
                var count = data - listNum[i];
                if (count < 12) {
                    me.EPListNum = 4;
                }
                if (count >= 12 && count < 24) {
                    me.EPListNum = 5;
                }
                if (count >= 24 && count < 36) {
                    me.EPListNum = 6;
                }
                me.organName = me.organNewArray[i];
                break;
            }
            if (i == listNum.length - 1) {
                var count = data - listNum[listNum.length - 1];
                if (count > 0 && count < 36) {
                    if (count < 12) {
                        me.EPListNum = 4;
                    }
                    if (count >= 12 && count < 24) {
                        me.EPListNum = 5;
                    }
                    if (count >= 24 && count < 36) {
                        me.EPListNum = 6;
                    }
                    me.organName = me.organNewArray[listNum.length - 1];
                }
            }
        }
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

        me.clearMasterListSelected();
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

        me.clearMasterListSelected();
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

    checkNewEPnumArray: function (Array, obj) {
        if (!obj) {
            return;
        } else {
            for (var i = 0; i < Array.length; i++) {
                if (Array[i] == "") {
                    continue;
                }
                if (obj.key == Array[i].key) {
                    return;
                }
            }
            Array.push(obj);
        }
    },
    checkDelNewEPnumArray: function (sourse, totalArray) {
        for (var i = sourse.length - 1; i >= 0; i--) {
            var del = true;
            for (var j = 0; j < totalArray.length; j++) {
                if (sourse[i].key == totalArray[j].key) {
                    del = false;
                    break;
                }
            }
            if (del) {
                sourse.splice(i, 1);
            }
        }
    },
    initializeData: function () {
        var me = this;
        me.addNewEPnumArray = [];
    }
});
