// Language Model
Ext.regModel('PM.model.Language',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'language'},
		{name: 'sharemodel'},
		{name: 'licensing'},
		{name: 'rpidmodel'},
		{name: 'referencemodel'},
        {name: 'crossModelSharingEnabled', type: 'boolean', defaultValue: true},
        {name: 'backupProtocolDataEnabled', type: 'boolean', defaultValue: true},
        {name: 'protocolPositionSettingsEnabled', type: 'boolean', defaultValue: true},
        {name: 'workflowWithVoicePresetEnabled', type: 'boolean', defaultValue: true},
        {name: 'transferPresetEnabled', type: 'boolean', defaultValue: true},
        {name: 'positionChangeTimeout'},
		{name: 'showdelay'}
	]
});