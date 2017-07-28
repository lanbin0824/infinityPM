/*!
 * JS MessageView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.common.window.Message
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.common.window.Message', {
    extend : 'PM.view.common.window.ModalDialog',
    layout: {
        type    : 'border'
    },
    cls             :'x-message-window',
    bodyCls         :'x-message-window-body',
    minWidth        : 325,
    minHeight       : 185,
    width           : 725,
    height          : 160,

    modal           : true,
    draggable       : true,

    panelCenter     : null,
    btnClose        : null,
    panelTable      : null,

    /* PUBLIC ATTRIBUTE BEGIN */
    errorDetailList     : [],
    errorNameList       : [],
    errorParameterList  : [],
    isSolutionShowName  : true,
    errorDetail :
    {
        "status"        : "",
        "overview"      : "",
        "details"       : "",
        "namelist"      : "",
        "solution"      : "",
        "calladmin"     : ""
    },
    errorParameter :
    {
        "overview"      : [],
        "details"       : [],
        "solution"      : [],
        "calladmin"     : []
    },
    useMaskFlg          : false,
    maxMessageHeight    : 640,
    autuWidth : false,
    /* PUBLIC ATTRIBUTE END */

    MessageStatus : {
        error : {
            val        : 'error',
            display    : 'Error'
        },
        information : {
            val        : 'info',
            display    : 'Information'
        },
        waring : {
            val        : 'waring',
            display    : 'Waring'
        },
    },

    initComponent: function() {
        var me = this;

        if(me.errorDetailList != null && me.errorDetailList.length > 0)
        {
            me.errorDetail = me.errorDetailList[0];
        }

        me.setMessageTitle();

        me.btnClose = Ext.create('Ext.Button', {
            height      : 32,
            width       :118,
            cls         : 'icon-button',
            overCls     : 'icon-button-over',
            pressedCls  : 'icon-button-pressed',
            focusCls    : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text        : '<span class="SpanTextView">' + stringSetting.message.button_close + '<span>',
            disabled    : false,
            handler     : function()
            {
                me.OKLoad();
                me.closeWin();
            }
        });

        me.panelButton = Ext.create('Ext.panel.Panel', {
            region      : 'south',
            height      : 50,
            minHeight   : 50,
            maxHeight   : 50,
            layout      : 'fit',
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'button-Color-NoborderPadding',
            layout: {
                type    : 'hbox',
                padding : '0 0 0 0',
                align   : 'middle',
                pack    : 'end'
            },
            defaults:
            {
                padding : '0 0 0 0',
                margins : '0 15 0 0'
            },
            items : [me.btnClose]
        });

        me.panelTable = Ext.create('Ext.panel.Panel',
        {
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-NoborderPadding-transparent',
            region      : 'center',            
            style:'vertical-align:middle;',
            html        : me.getMessageValue(me).join('')
        });

        me.panelCenter = Ext.create('Ext.panel.Panel',
        {
            region      : 'center',
            cls         : 'panel-NoborderPadding-transparent',
            bodyCls     : 'panel-message-body',
            defaults    : {
                frame : false
            },
            layout : {
                type : 'border'
            },
            items : [me.panelTable]
        });

        Ext.applyIf(me, {
            items:[
                me.panelCenter,
                me.panelButton
            ],
            listeners: {
                'afterlayout': function(win) {
                    if(me.autuWidth) {
                        var tds = Ext.query(".message-detail-value", false, this.getEl().dom);
                        win.width = tds[0].scrollWidth + 20;
                    }
                }
            }
        });
        me.callParent(arguments);
    },

    setMessageTitle : function()
    {
        var me = this;
        var _title = me.MessageStatus.error.display;
        if(me.errorDetail.status == me.MessageStatus.error.val)
        {
            _title = me.MessageStatus.error.display;
        }
        else if(me.errorDetail.status == me.MessageStatus.waring.val)
        {
            _title = me.MessageStatus.waring.display;
        }
        else if(me.errorDetail.status == me.MessageStatus.information.val)
        {
            _title = me.MessageStatus.information.display;
        }
        me.title = _title;
    },

    getMessageValue    : function(me)
    {
        var _html = new Array();
        _html.push('<table style="height:100%;">');

        if(me.errorDetail.overview != null && me.errorDetail.overview.length > 0)
        {
            _html.push('<tr>');

            // view
            _html.push('<td class="message-title-value">');

            if(me.errorDetail.status == me.MessageStatus.error.val)
            {
                _html.push('<span class="message-title-font">');
                _html.push(me.MessageStatus.error.display);
                _html.push('</span>');
                _html.push(" - ");
            }
            else if(me.errorDetail.status == me.MessageStatus.waring.val)
            {
    //            _html.push(me.MessageStatus.waring.display);
            }
            else if(me.errorDetail.status == me.MessageStatus.information.val)
            {
    //            _html.push(me.MessageStatus.information.display);
            }

            if(me.errorParameter.overview != null && me.errorParameter.overview.length > 0)
            {
                _html.push(me.errorDetail.overview.format(me.errorParameter.overview));
            }
            else
            {
                _html.push(me.errorDetail.overview);
            }

            _html.push('</td>');
            _html.push('</tr>');
        }

        // detail
        if(me.errorDetailList != null && me.errorDetailList.length > 0)
        {
            for(var i = 0;i < me.errorDetailList.length;i++)
            {
                _html.push('<tr>');
                _html.push('<td class="message-detail-value">');
                if(me.errorParameterList != null &&
                   me.errorParameterList[i] != null &&
                   me.errorParameterList[i].details != null &&
                   me.errorParameterList[i].details.length > 0)
                {
                    _html.push(me.errorDetailList[i].details.format(me.errorParameterList[i].details));
                }
                else
                {
                    _html.push(me.errorDetailList[i].details);
                }
                _html.push('</td>');
                _html.push('</tr>');
                if(me.errorNameList[i] != null && me.errorNameList[i] != "")
                {
                    _html.push('<tr>');
                    _html.push('<td class="message-detail-value" style="padding-left:20px;">');
                    _html.push(me.errorNameList[i]);
                    _html.push('</td>');
                    _html.push('</tr>');
                }
                else
                {
                    _html.push('</tr>');
                    _html.push('<tr class="message-space">');
                    _html.push('</td>');
                    _html.push('</tr>');
                }
            }
            _html.push('</tr>');
            _html.push('<tr class="message-space">');
            _html.push('</td>');
            _html.push('</tr>');
        }
        else
        {
            _html.push('<tr>');
            _html.push('<td class="message-detail-value">');
            if(me.errorParameter.details != null && me.errorParameter.details.length > 0)
            {
                _html.push(me.errorDetail.details.format(me.errorParameter.details));
            }
            else
            {
                _html.push(me.errorDetail.details);
            }
            _html.push('</td>');
            _html.push('</tr>');

            if(me.errorDetail.namelist != null && me.errorDetail.namelist != "")
            {
                _html.push('<tr>');
                _html.push('<td class="message-detail-value" style="padding-left:20px;">');
                _html.push( me.errorDetail.namelist);
                _html.push('</td>');
                _html.push('</tr>');
            }
        }

        //Solution title
        if(me.errorDetail.solution != "" && me.errorDetail.calladmin != "")
        {
            _html.push('<tr class="message-space">');
            _html.push('</td>');
            _html.push('</tr>');
            _html.push('<tr>');
            _html.push('<td class="message-title-value">');
            _html.push('<span class="message-title-font">');
            _html.push("Solution");
            _html.push('</span>');
            _html.push('</td>');
            _html.push('</tr>');
        }

        //Solution
        if(me.errorDetailList != null && me.errorDetailList.length > 0)
        {
            for(var i = 0;i < me.errorDetailList.length;i++)
            {
                if(me.errorDetailList[i].solution != "")
                {
                    _html.push('<tr>');
                    _html.push('<td class="message-detail-value">');
                    if(me.errorParameterList != null &&
                       me.errorParameterList[i] != null &&
                       me.errorParameterList[i].solution != null &&
                       me.errorParameterList[i].solution.length > 0)
                    {
                        _html.push(me.errorDetailList[i].solution.format(me.errorParameterList[i].solution));
                    }
                    else
                    {
                        _html.push(me.errorDetailList[i].solution);
                    }

                    _html.push('</td>');
                    _html.push('</tr>');
                    if(me.isSolutionShowName && me.errorNameList[i] != null && me.errorNameList[i] != "")
                    {
                        _html.push('<tr>');
                        _html.push('<td class="message-detail-value" style="padding-left:20px;">');
                        _html.push(me.errorNameList[i]);
                        _html.push('</td>');
                        _html.push('</tr>');
                    }
                }
            }
            _html.push('</tr>');
            _html.push('<tr class="message-space">');
            _html.push('</td>');
            _html.push('</tr>');
        }
        else
        {
            if(me.errorDetail.solution != "")
            {
                _html.push('<tr>');
                _html.push('<td class="message-detail-value">');
                _html.push(me.errorDetail.solution);
                _html.push('</td>');
                _html.push('</tr>');
                _html.push('</tr>');
                _html.push('<tr class="message-space">');
                _html.push('</td>');
                _html.push('</tr>');

            }
        }

        //calladmin
        if(me.errorDetail.calladmin !== undefined && me.errorDetail.calladmin != "")
        {
            _html.push('<tr>');
            _html.push('<td class="message-detail-value">');
            _html.push(me.errorDetail.calladmin);
            _html.push('</td>');
            _html.push('</tr>');
        }

        _html.push('</table>');
        return _html;
    },
    OKLoad : function ()
    {
        return;
    },
    closeWin : function() {
        this.close();
        if(this.useMaskFlg)
        {
            this.hideWin();
        }
    },

    hideWin : function()
    {
        Ext.getBody().unmask();
    },

    showWin : function()
    {
        var me = this;
        if(me.useMaskFlg)
        {
            Ext.getBody().mask();
        }
        me.show();

        var _table = me.body.dom.getElementsByTagName("Table");
        if(_table.length > 0)
        {
            _table = _table[0];
            if(_table.clientHeight > me.maxMessageHeight)
            {
                me.panelTable.body.removeCls("panel-NoborderPadding-transparent");
                me.panelTable.body.addCls("panel-message-ScrollBorder");
                me.setHeight(me.maxMessageHeight);
            }
            else
            {
                me.setHeight(_table.clientHeight + 35 + 50 + 10);
            }
        }
        me.resetWinPosition();
    }
});