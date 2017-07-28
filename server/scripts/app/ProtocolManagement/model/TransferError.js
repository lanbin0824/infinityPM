// Transfer Error Model 
Ext.regModel('PM.model.TransferError',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'result'},
		{name: 'name'},
		{name: 'model'},
		{name: 'protocolpath'},
		{name: 'errmessage'}
	]
});