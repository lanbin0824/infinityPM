// UpdateAlert Model
Ext.regModel('PM.model.UpdateAlert',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'request'},
		{name: 'history'},
		{name: 'transferlist'},
		{name: 'requesttime'},
		{name: 'historytime'},
		{name: 'setting'},
		{name: 'settingtime'}
	]
});