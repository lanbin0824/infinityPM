// ConstitutionHistoryList Model
Ext.regModel('PM.model.ConstitutionHistoryList',
{
	extend:'Ext.data.Model',
	fields: [
				{name: 'uid'},
				{name: 'type'},
				{name: 'epno'},
				{name: 'version'},
				{name: 'machinename'},	
				{name: 'protocolname'},
				{name: 'status'},		
				{name: 'lastupddt'},
				{name: 'applicant'},
				{name: 'index'},
				{name: 'event'},
				{name: 'remark'},
				{ name: 'organ' },
				{ name: 'patienttype' },
				 
				{ name: 'action_request' },
				{ name: 'remark_request' },
                { name: 'system_remark' },
				{ name: 'updatedDateTime_request'},
				{ name: 'updatedUserName_request' },
				
				{ name: 'eventid_response' },
				{ name: 'action_response' },
				{ name: 'remark_response' },
				{ name: 'updatedDateTime_response'},
				{ name: 'updatedUserName_response' },
				 
				{ name: 'action_event' },
				{ name: 'remark_event' },
				{ name: 'updatedDateTime_event'},
				{ name: 'updatedUserName_event' },
				
				{name: "displayAction"},
				{name: "displayStatus"},
				{name: "displayUpdatedDateTime"},
				{name: "displayComment"}
				
			]
});

Ext.regModel('PM.model.BaseModel',
    {
        extend:'Ext.data.Model',
        fields: [
            {name: "result"},
            {name: "errmessage"}
        ]
    });