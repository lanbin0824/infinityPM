/*!
 * JS Console ErrorList
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.request.Errorlist
 * @extends Ext.AbstractComponent
 */
Ext.define('PM.view.request.Errorlist', {
	extend: 'Ext.AbstractComponent',

	store		  : null,

    initComponent: function() {
        var me = this;

        me.store = new Ext.data.Store({
		    proxy : new Ext.data.proxy.Ajax({
		    	url :  PROCESS_PATH_GLOBAL_ACTION + 'geterrorlist.action',
		    	type : 'ajax',
		    	getMethod : function() {
					return 'GET';
				},
	            reader:
	            {
	                type: 'json',
	                root: 'result',
	                totalProperty:'total'             
	            }
			}),
			model : 'PM.model.RequestError'
		});
    	
    	me.store.on("load",function()
        {  
    		 if(me.store.totalCount > 0){
    			 me.showErrorMessage();
    		 }  		 
        });
    	 
    	 me.callParent(arguments);
    },
    
    storeLoad: function()
    {
    	this.store.load();
    },
    showErrorMessage : function () {    	
    	var errList = [];
    	var errNameList = [];
    	var len = this.store.getCount();
    	for (var i = 0; i < len; i++) {
    		errNameList.push(this.store.getAt(i).get("path"));	
    		errList.push(stringSetting.error[this.store.getAt(i).get("error")]);
            if(this.store.getAt(i).get("error") === 'ERR0045'){
                var errormessage = Ext.clone(stringSetting.error.ERR0045);

                var _message = Ext.create('PM.view.common.window.Message', {
                    errorDetailList: [errormessage],
                    errorNameList: []
                });

                _message.showWin();
                return;
            }
    	}
    	
    	var _message = Ext.create('PM.view.common.window.Message',{
				errorDetailList 	: errList,
				errorNameList 		: errNameList
			});
	    _message.showWin();  	    
	}	
});
