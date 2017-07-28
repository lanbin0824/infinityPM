/*!
 * JS Click Panel
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.data.Ajax
 * @extends Ext.app.Controller
 *
 * sample:
 * var store = Ext.create('PM.data.Ajax',
 * {
 *     url: PROCESS_PATH_GLOBAL_ACTION + 'xxx.action',
 *     method      : "GET",
 *     loadData: function(responseObj, success)
 *     {
 *         //TODO
 *     }
 * });
 * store.requestSend({
 *     params:
 *     {
 *         protocol_id    : xxx,
 *         study_uid      : xxx
 *     }
 * })
 */

Ext.define("PM.data.Ajax",
{
    extend  : 'Ext.app.Controller',
    url     : '',
    method  : 'GET',

    responseData    : {},
    constructor : function(config)
    {
        var me = this;

        me.mixins.observable.constructor.call(me, config);

        if (me.refs) {
            me.ref(me.refs);
        }

        me.eventbus = Ext.app.EventBus;

        me.initAutoGetters();
    },
    requestSend : function(config)
    {
        var me = this;
        PM.data.Connection.requestSend({
            url         : me.url,
            method      : me.method,
            params      : config.params,
            loadData: function(responseObj, success)
            {
                me.responseData = responseObj;
                me.loadData(responseObj, success);
            }
        });
    },

    loadData : function(responseObj, success)
    {
        //TODO
    }
});