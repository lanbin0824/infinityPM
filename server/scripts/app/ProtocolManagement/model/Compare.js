Ext.define('PM.model.Compare', {
    extend : 'Ext.data.Model',
    fields : [                
                {name : 'leftprotocol'}, 
                {name : 'rightprotocol'}, 
                {name : 'issameorgan'},
                {name : 'list'}, 
                {name : 'changelist'},
                {name : 'leftcompareflag'},
                {name : 'rightcompareflag'},
                {name : 'flag'},
                {name : 'errCode'}
             ]
});