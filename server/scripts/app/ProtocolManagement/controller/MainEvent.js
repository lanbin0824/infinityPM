Ext.require([
    'PM.model.AppSetting',
    'PM.model.CompareLine',
    'PM.model.Compare',
    'PM.model.CompareParameter',
    'PM.model.ConsoleSetting',
    'PM.model.ConstitutionHistoryList',
    'PM.model.ConstitutionList',
    'PM.model.Language',
    'PM.model.OthersProtocol',
    'PM.model.Param',
    'PM.model.RequestError',
    'PM.model.CheckedRadlex',
    'PM.model.RequestEvent',
    'PM.model.Transfer',
    'PM.model.SettingWin',
    'PM.model.RequestList',
    'PM.model.TransferError',
    'PM.model.UpdateAlert',
    'PM.model.UpdateAlertTime',
    'PM.model.UserInfo',
    'PM.model.Restore',
    'PM.model.CompareMasterListParams',
    'PM.model.MasterList',
    'PM.model.ModalityIdentifier',
    'PM.model.SaveErrMessage',
    'PM.model.MasterEvent',
    'PM.model.EPnumberData',
    'PM.view.field.SearchText',
    'PM.data.Connection'
]);

var createMainpage = function(){
    var spanclassHeader = document.createElement('span');
    spanclassHeader.id = 'id-main-title';
    spanclassHeader.className = 'spanclassHeader';
    spanclassHeader.innerText = '';
    var spanLabel = document.createElement('span');
    spanLabel.className = 'label';
    spanLabel.id = 'dv';
    var divclassImgChild = document.createElement('div');
    divclassImgChild.className = 'divclassImgChild';
    divclassImgChild.appendChild(spanclassHeader);
    divclassImgChild.appendChild(spanLabel);
    var divclassHeader = document.createElement('div');
    divclassHeader.className = 'divclassHeader';
    divclassHeader.appendChild(divclassImgChild);
    document.body.appendChild(divclassHeader);

    var divSelected = document.createElement('div');
    divSelected.id = 'id-tab-main';
    divSelected.className = 'divclass_ProtocolSelect';
    var divMarker = document.createElement('div');
    divMarker.id = 'marker';
    divMarker.className = 'x-grid-resize-marker';
    var divclassMain = document.createElement('div');
    divclassMain.className = 'divclassMain';
    divclassMain.setAttribute('draggable','false');
    divclassMain.appendChild(divSelected);
    divclassMain.appendChild(divMarker);
    document.body.appendChild(divclassMain);
};

/*!
 * addListener( el, eventName, [handler], [scope], [options] )
 */
Ext.EventManager.addListener(document, 'contextmenu', function(event)
{
    StopPropagation(event)
}
);

/*!
 * disable Tab key
 */
document.onkeydown = function()
{
    if(event.keyCode==9)
    {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
    }
};

var bDocumentDrag = false;
var viewDocumentResize = null;
document.onmouseup = function (){
    if(bDocumentDrag)
    {
        bDocumentDrag = false;
        viewDocumentResize.widthChange();
    }
    if(viewDocumentResize != null && viewDocumentResize.marker != null)
    {
        viewDocumentResize.marker.setAttribute("style","Left:-9999px;top: 0px; height: 1px;");
    }

    viewDocumentResize = null;
};
document.onmousemove = function (e){

    var optionMenu = document.getElementById('createDiv-option');
    if(optionMenu != null &&
      (!panelTabConstitution.isSelectd() ||
       e.target.getElementsByClassName("panelTabView").length > 0
    ))
    {
        panelConstitution.getFilterOptionDrop();
        panelConstitution.ElSelectDrop();
    }
    if(!bDocumentDrag)
    {
        return;
    }
    var event = e || window.event;
    viewDocumentResize.setMoveAction(event);
};