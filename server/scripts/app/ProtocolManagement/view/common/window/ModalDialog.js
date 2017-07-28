/*
 * ! JS Console ModalWinView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.common.window.ModalDialog
 * @extends Ext.window.Window
 */

Ext.define('PM.view.common.window.ModalDialog', {
    extend          : 'Ext.window.Window',
    shadow            : false,
    modal            : false,
    frame            : false,
    padding            : 0,
    bodyPadding        : 0,
    draggable        : false,
    resizable        : false,
    bodyBorder        : false,
    border            : false,
    closable        : false,
    header            : true,
    plain            : true,
    initComponent   : function ()
    {
        this.callParent(arguments);
        this.setWinTitle(this.title);
    },
    setWinTitle : function(mytitle)
    {
        this.title = '<table width ="100%" class="window-header-Table">' +
            '<tr>' +
                '<TD class="Dialog_window_title">' +
                '<span class="span-title_Confirm">' + mytitle + '</span>' +
                '</TD>' +
            '</tr>' +
        '</table>';
    },
    closeWin : function()
    {
        this.close();
        this.hideWin();
    },
    hideWin : function()
    {
        Ext.getBody().unmask();
    },
    showWin : function()
    {
        Ext.getBody().mask();
        this.show();
        this.resetWinPosition();
    },

    resetWinPosition : function()
    {
        var winWidth = document.documentElement.clientWidth;
        var winHeight = document.documentElement.clientHeight;

        this.center();
        var position = this.getPosition();

        if(this.height > winHeight && this.width < winWidth)
        {
            this.setPosition(position[0], 0);
        }
        else if(this.height < winHeight && this.width > winWidth)
        {
            this.setPosition(0, position[1]);
        }
        else if(this.height > winHeight && this.width > winWidth)
        {
            this.setPosition(0, 0);
        }
        else
        {
            this.center();
        }
    }

});
