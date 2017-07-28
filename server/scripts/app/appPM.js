var PROCESS_PATH_GLOBAL_RESOURCES = "./../resources/app/ProtocolManagement/";
var PROCESS_PATH_GLOBAL_SCRIPTS = "./../scripts/app/ProtocolManagement/";
var PROCESS_PATH_GLOBAL_ACTION = "/index/";
var PROCESS_PATH_GLOBAL_REFERENCE = "/../references/";
var PROCESS_PATH_GLOBAL_SCRIPTS_APP = "../scripts/app/ProtocolManagement";

// This captures the values of the meta tags that match fields on the comm_info object.
// meta tags that do not match are ignored
(function () {
    var metas = document.getElementsByTagName('meta');
    for (i=0; i<metas.length; i++){
        if(metas[i].name=="staticroot"){
            PROCESS_PATH_GLOBAL_RESOURCES = metas[i].content + 'resources/app/ProtocolManagement/';
            PROCESS_PATH_GLOBAL_SCRIPTS = metas[i].content + 'scripts/app/ProtocolManagement/';
            PROCESS_PATH_GLOBAL_SCRIPTS_APP = metas[i].content + 'scripts/app/ProtocolManagement';
            PROCESS_PATH_GLOBAL_REFERENCE = metas[i].content + 'references/'
        }
        if(metas[i].name=="proxyroot"){
            PROCESS_PATH_GLOBAL_ACTION =metas[i].content;
        }
    }
}()); // call this anonymous function during file loading, so it is done before any Ajax requests

/*window.onunload=function(b){
    Ext.Ajax.request({
        url: PROCESS_PATH_GLOBAL_ACTION + 'kill',
        async:false,
        timeout:500
    });
};*/

Ext.application({
    name: 'PM',
    appFolder: PROCESS_PATH_GLOBAL_SCRIPTS_APP,
});