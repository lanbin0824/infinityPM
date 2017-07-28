// OthersProtocol Model
Ext.regModel('PM.model.OthersProtocol',
{
	extend:'Ext.data.Model',
	fields: [
			{name: 'uid'},
			{name: 'version'},
			{name: 'type'},
			{name: 'protocolname'},
			{name: 'status'},
			{name: 'patienttype'},
			{name: 'organ'},
			{name: 'epno'},
			{name: 'lastupddt'},
			{name: 'modelname'},
			{name: 'errorcode'},
			{name: 'filepath'},
			{name: 'protocoleptype'}
	]
});