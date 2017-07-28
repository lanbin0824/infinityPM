// Setting Model
Ext.regModel('PM.model.AppSetting',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'flag'},
		{name: 'title'},
		{name: 'result'},
		{name: 'settingname'},
		{name: 'machinename'},
		{name: 'oldmachinename'},
		{name: 'newmachinename'},
        
		{name: 'deleteid'},
		{name: 'protocolname'},
		{name: 'protocolpoolname'},
		{name: 'systemname'},
		{name: 'softwareversion'},
		{name: 'eptype'},
		{name: 'vendor'},
		{name: 'modality'},
		{name: 'modelname'},
		{name: 'xraymode'},
		{name: 'value'},
		{name: 'type'},
		{name: 'machinenamelist'},
		{name: 'sourcemachinename'},
		{name: 'dismachinenamelist'},
		{name: 'shareoption'},
		{name: 'displayroot'},
		{name: 'interval'},
		{name: 'language'},
		{name: 'request'},
		{name: 'sharemodel'},
		{name: 'backupsupport'},
		{name: 'rpidmodel'},
		{name: 'referencemodel'},
		{name: 'errcode'},

        {name: 'hasapprovedprotocols'},
	]
});


Ext.regModel('BatchApproveModel',
{
	extend:'Ext.data.Model',
	fields: [
		{name: 'cancel'},
		{name: 'name'},
		{name: 'currentNumber'},
		{name: 'totalNumber'},
		{name: 'finish'},
		{name: 'flag'},
		{name: 'errorList'}
	]
});

Ext.regModel('ChangeProtocolPositionModel',
{
    extend:'Ext.data.Model',
    fields: [
        {name: 'cancel'},
        {name: 'name'},
        {name: 'currentNumber'},
        {name: 'totalNumber'},
        {name: 'finish'},
        {name: 'flag'},
        {name: 'errorList'}
    ]
});

Ext.regModel('ProtocolOperationModel',{
	extend:'Ext.data.Model',
	fields:[
		{name: 'cancel'},
		{name: 'name'},
		{name: 'currentNumber'},
		{name: 'totalNumber'},
		{name: 'finish'},
		{name: 'flag'},
		{name: 'errorList'},
		{name: 'filesNumber'},
		{name: 'nodata'}
	]
});

