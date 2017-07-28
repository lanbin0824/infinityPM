// RequestList Model
Ext.regModel('PM.model.RequestList',
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
			{name: 'patienttype'},
			{name: 'organ'},
			{name: 'modelname'},
			{name: 'softwareversion'},
			{name: 'filepath'},
			{name: 'patienttypedisplay'},	
			{name: 'displaymachinename'},
			{name: 'oldepno'},
			{name: 'protocoleptype'}
	]
});