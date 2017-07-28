/*!
 * JS Console ConfirmView
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.master.Information
 * @extends Ext.panel.Panel
 */

Ext.define('PM.view.master.Information', {
    extend               : 'Ext.panel.Panel',
    layout               : {
        type    : 'border'
    },
    region               : 'center',
    cls                  : 'panel-NoborderPadding-transparent',
    bodyCls              : 'grid-Color-NoborderPadding',
    labelText1           : null,
    labelText2           : null,
    initComponent : function()
    {
       var me = this;
       Ext.applyIf(this, {
            items : [
            {
                xtype     : 'label',
                region    : 'north',
                cls       : 'setting-text',
                text      : me.labelText1,
                margin    : '50 10 10 20'
            },
            {
                region    : 'center',
                xtype     : 'label',
                cls       : 'setting-text',
                text      : me.labelText2,
                margin    : '10 10 10 20'
            }]
        });

        this.callParent(arguments);
    }
});

