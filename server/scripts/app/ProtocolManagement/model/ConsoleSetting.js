// Console Model
Ext.regModel('PM.model.ConsoleSetting',
{
    extend:'Ext.data.Model',
    fields: [
        {name: 'flag'},
        {name: 'option'},
        {name: 'settingname'},
        {name: 'machinename'},        
        {name: 'oldstoredata'},
        {name: 'newstoredata'}        
    ]
});