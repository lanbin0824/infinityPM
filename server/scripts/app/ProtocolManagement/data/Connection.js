/*!
 * JS Click Panel
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.data.Connection
 * @extends Ext.data.Connection
 *
 * sample:
 * PM.data.Connection.requestSend({
 *          url: PROCESS_PATH_GLOBAL_ACTION + 'xxxxx.action',
 *          method      : "GET",
 *          params:
 *          {
 *              protocol_id    : xxxx,
 *              study_uid      : xxxx
 *          },
 *          loadData: function(responseObj, success)
 *          {
 *              //TODO
 *          }
 * });
 */
Ext.define('PM.data.Connection', {
    extend          : 'Ext.data.Connection',

    singleton   : true,
    timeout     : 2 * 60 * 1000,
    autoAbort   : false,

    method      : "GET",    //GET/POST

    requestSend : function(options)
    {
        var me = this;
        options.success = me.successFn;
        options.failure = me.failureFn;
        me.request(options);
    },

    successFn : function(response, opts)
    {
        var obj;
        if(response.responseText == null || response.responseText == "")
        {
            obj = {};
        }
        else
        {
            obj = Ext.decode(response.responseText);
        }
        if(opts.loadData != null)
        {
            opts.loadData(obj)
        }
    },
    failureFn : function(failureInfo, opts)
    {
        if(opts.loadData != null)
        {
            opts.loadData(failureInfo, false)
        }
    }

});