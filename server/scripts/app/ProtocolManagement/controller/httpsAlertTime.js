/*!
 * httpsAlertTime.js JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
	
var alertStore = null;
var alertTimeStore = null;
var alertTime = 5000;

var taskAlertCall = null;
var taskRunnerAlert = null;
var taskAlertCallingFlg = false;

function updateTabIcon()
{		
	alertStore.load();		
}

function createTask()
{
	taskAlertCall = {
		run: updateTabIcon,
		interval:alertTime
	};
	
	// create the alert store
	alertStore = new Ext.data.Store(
	{
		proxy: new Ext.data.proxy.Ajax({
			type:'ajax',
			url: PROCESS_PATH_GLOBAL_ACTION + 'getupdatealert.action',
			getMethod : function() {
				return 'GET';
			},
			reader:
			{
				type: 'json'                
			}
		}),
		model: 'PM.model.UpdateAlert'
	});
	alertStore.on("load",function()
	{		
		if(alertStore.getAt(0) != null && 
		   alertStore.getAt(0).get("request") == true)
		{
			panelTabRequestList.setIcon(
				true,
				stringSetting.request.msg_requesttime);				
		}

		if(alertStore.getAt(0) != null && 
		   alertStore.getAt(0).get("history") == true) 
		{
			panelTabConstitution.setIcon(
				true,
				stringSetting.history.message.requesttime);			
		}

		if(alertStore.getAt(0) != null &&
			alertStore.getAt(0).get("transferlist") == true)
		{
			panelTabTransfer.setIcon(
				true,
				stringSetting.history.message.requesttime);
		}

        /*if(alertStore.getAt(0) != null &&
            alertStore.getAt(0).get("protocolposition") == true)
        {
            panelTabProtocolPosition.setIcon(
                true,
                stringSetting.protocol_position.message.requesttime);
        }*/

		if(alertStore.getAt(0) != null && 
		   alertStore.getAt(0).get("setting") == true) 
		{

			panelTabSetting.setIcon(
				true,
				stringSetting.app_setting.message.requesttime);
			
			if(panelTabSetting.isSelectd())
			{
				panelSetting.initRefreshButton(true);
			}
		}
		else if(panelTabSetting.isSelectd())
		{
			panelSetting.initRefreshButton(false);
		}

	});
	
	// create the alert store
	alertTimeStore = new Ext.data.Store(
	{
		proxy: new Ext.data.proxy.Ajax({
			type:'ajax',
			url: PROCESS_PATH_GLOBAL_ACTION + 'getupdatealerttime.action',
			getMethod : function() {
				return 'GET';
			},
			reader:
			{
				type: 'json'                
			}
		}),
		model: 'PM.model.UpdateAlertTime'
	});
	alertTimeStore.on("load",function()
	{		
	    alertTime = 5000;
	    
		var timeData = alertTimeStore.getAt(0);
		if(null != timeData)
		{
		    var time = timeData.get("alerttime");
		    if(null != time && !isNaN(time))
		    {
                alertTime = time * 1000;		        
		    }
		}

		taskAlertCall.interval = alertTime;
		if(taskRunnerAlert == null)
		{
			taskRunnerAlert = new Ext.util.TaskRunner();
		}
		if(!taskAlertCallingFlg)
		{
			taskRunnerAlert.start(taskAlertCall);
			taskAlertCallingFlg = true;
		}
	});
}

function runTask()
{
	if(!taskAlertCallingFlg)
	{
		alertTimeStore.load();
	}
}

function stopTask()
{
	if(taskRunnerAlert != null)
	{
		taskRunnerAlert.stop(taskAlertCall);
	}
	taskAlertCallingFlg = false;
}
