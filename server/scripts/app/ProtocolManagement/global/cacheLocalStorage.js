/*!
 * LocalStorage JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

//local Storage
cacheLocalStorage = {
    set:function(key, value){
        localStorage.setItem(key, value);
    },
    get:function(key){
        return localStorage.getItem(key);
    },
    setBoolean:function(key, value){
        localStorage.setItem(key, value);
    },
    getBoolean:function(key){
    	var bool = false;
    	if(Ext.util.Format.uppercase(localStorage.getItem(key)) == "TRUE")
		{
    		bool = true;
		}
        return bool;
    },
    setObject:function(key, value)
    {
    	localStorage.setItem(key, Ext.encode(value));
    },
    getObject:function(key)
    {
    	var obj = null;
    	obj = Ext.decode(localStorage.getItem(key));
		return obj;
    },
    clear:function()
    {
    	localStorage.clear();
    },
    remove:function(key)
    {
    	localStorage.removeItem(key);
    }
};

userInfo = {
    IsAdmin : 'UserGroup',
    UserName: 'UserName'
};

StoragePage = {
	name	: 'StorageShowPage',
    Request : 'Request',
    History : 'History',
    UserManagement : 'UserManagement',
    AppSettings : 'AppSettings',
    Master      : "Master",
    Transfer      : "Transfer",
    ProtocolPosition      : "ProtocolPosition"
};

PageIndex = {
    Request     : 0,
    History     : 1,
    Transfer    : 2,
    ProtocolPosition      : 3,
    AppSettings : 4,
    Master      : 5
};
