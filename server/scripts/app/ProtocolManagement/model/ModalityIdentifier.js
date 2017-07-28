// ModalityIdentifier Model
Ext.define('PM.model.ModalityIdentifier',
{
    extend:'Ext.data.Model',
    fields: [
        {name: 'key'},
        {name: 'machinename'},
        {name: 'modelname'},
        {name: 'softwareversion'},
        {name: 'systemname'},
        {name: 'userspecifiedname'},
        {name: 'errmessage'}
    ]
});
