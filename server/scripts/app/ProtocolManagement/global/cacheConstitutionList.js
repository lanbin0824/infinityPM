/*!
 * ConstitutionHistory JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

ConstitutionHistoryListHeader = {
    Manage : 'Status',
    Type : 'Type',
    Name : 'Name',
    Version : 'Version',
    Client : 'Scanner',
    Applicant : 'User',
    Date : 'Date',
    Remark : 'Remarks'
};

ConstitutionHistoryArrows = {
    name : '<img class="Img-Constitution-History-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    date : '<img class="Img-Constitution-History-Date" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
    srcUp : '' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png',
    srcDown : '' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png',
    none : '' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png'
};

ConstitutionArrows = {
	modelup : '<img class="Img-Constitution-Machine" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	modeldown : '<img class="Img-Constitution-Machine" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	modelnull : '<img class="Img-Constitution-Machine" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    namenull : '<img class="Img-Constitution-Name" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    nameup : '<img class="Img-Constitution-Name" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
    namedown : '<img class="Img-Constitution-Name" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	patientup : '<img class="Img-Constitution-Patienttype" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	patientdown : '<img class="Img-Constitution-Patienttype" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	patientnull : '<img class="Img-Constitution-Patienttype" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    datedown : '<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
    dateup :'<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
    datenull : '<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    sourcescannerdown : '<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
    sourcescannerup :'<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
    sourcescannernull : '<img class="Img-Constitution-Date" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    typedown : '<img class="Img-Constitution-Type" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
    typeup :'<img class="Img-Constitution-Type" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
    typenull : '<img class="Img-Constitution-Type" style="float:right;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png"></img>',
    srcUp : PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png',
    srcDown : PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png',
    none : PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png'
};