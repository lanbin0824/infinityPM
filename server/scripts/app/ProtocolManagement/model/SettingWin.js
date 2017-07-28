// Setting Model
Ext.regModel('PM.model.SettingWin',
{
    extend:'Ext.data.Model',
    fields: [
        {name: 'selectlist'},
        {name: 'machinenamelist'},
        
        {name: 'settingname'},
        {name: 'selectedflag'},
        
        {name: 'machinename'},
        {name: 'checkedflag'},
        
        {name: 'approvalvaluelist'},
        {name: 'type'},
        {name: 'value'},
        {name: 'flag'},
        {name: 'errcode'}
    ]
});