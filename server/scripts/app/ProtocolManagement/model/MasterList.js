// Setting Model
Ext.regModel('PM.model.MasterList',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'scannerlist'},
		{name: 'epno'},
		{name: 'organ'},
		{name: 'patienttype'},
		{name: 'type'},
		{name: 'detail'},
	]
});

