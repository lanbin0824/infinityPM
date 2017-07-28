/*!
 * Request List JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

//Request List
RequestListHeader = {
	Type : 'Type',
	Name : 'Name',
	Version : 'Version',
	Client : 'Scanner',
	Applicant : 'User',
	PatientType : 'Patient Type',
	Date : 'Date'
};

RequestListStatusImg = {
	approvalRequested : '<img class="Img-RequestList-Status" src=' + ProtocolStatusSrc.approvalRequested +'></img>',
	deletionRequested : '<img class="Img-RequestList-Status" src=' + ProtocolStatusSrc.deletionRequested +'></img>'
};
RequestListStatus = {
	approvalRequested : 'APPROVAL_REQUESTED',
	deletionRequested : 'DELETION_REQUESTED'
};

RequestListHeaderImg = {
    DateClass       : "Img-RequestList-Date",
    NameClass       : "Img-RequestList-Name",
    TypeClass       : "Img-RequestList-Type",
    PatientTypeClass: "Img-RequestList-PatientType",
    VersionClass    : "Img-RequestList-Version",
    MachineClass    : "Img-RequestList-Machine",
    ApplicantClass  : "Img-RequestList-Applicant"    
};

RequestListArrows = {
	DateUp : '<img class="Img-RequestList-Date" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	DateDown : '<img class="Img-RequestList-Date" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	DateNone : '<img class="Img-RequestList-Date" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	NameUp : '<img class="Img-RequestList-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	NameDown : '<img class="Img-RequestList-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	NameNone : '<img class="Img-RequestList-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	TypeUp : '<img class="Img-RequestList-Type" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	TypeDown : '<img class="Img-RequestList-Type" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	TypeNone : '<img class="Img-RequestList-Type" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	PatientTypeUp : '<img class="Img-RequestList-PatientType" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	PatientTypeDown : '<img class="Img-RequestList-PatientType" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	PatientTypeNone : '<img class="Img-RequestList-PatientType" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	
	VersionUp : '<img class="Img-RequestList-Version" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	VersionDown : '<img class="Img-RequestList-Version" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	VersionNone : '<img class="Img-RequestList-Version" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	MachineUp : '<img class="Img-RequestList-Machine" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	MachineDown : '<img class="Img-RequestList-Machine" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	MachineNone : '<img class="Img-RequestList-Machine" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
	ApplicantUp : '<img class="Img-RequestList-Applicant" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png"></img>',
	ApplicantDown : '<img class="Img-RequestList-Applicant" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png"></img>',
	ApplicantNone : '<img class="Img-RequestList-Applicant" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png"></img>',
		
	srcUp : PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortup.png',
	srcDown : PROCESS_PATH_GLOBAL_RESOURCES + 'images/sortarrows/sortdown.png',
	srcNone : PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_16.png'
};