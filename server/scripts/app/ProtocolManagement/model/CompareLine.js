// CompareLine Model
Ext.regModel('PM.model.CompareLine',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'targetKey'},
		{name: 'targetName'},
		{name: 'masterKey'},
		{name: 'masterName'},	
		{name: 'selected'}		
	]
});