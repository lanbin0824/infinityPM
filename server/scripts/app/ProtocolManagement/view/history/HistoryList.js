/*!
 * JS Console History
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.history.HistoryList
 * @extends PM.view.history.Base
 * @import ConstitutionView.css
 */

Ext.define('PM.view.history.HistoryList', {
    extend : 'PM.view.history.Base',

    initComponent : function()
    {
        var me = this;

        me.titleName = stringSetting.history.title_history;

        me.callParent(arguments);
    }
});