/*!
 * main JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

Language = {
    EN : "EN",
    JP : "JP",
    DE : "DE",
    ES : "ES",
    FR : "FR",
    IT : "IT",
    NL : "NL",
    PT : 'PT'
};

UserAuthority = {
    Administrator : "Administrator",
    Reviewer : "Reviewer"
};

ProtocolStatusHtml = {
    approvalAccepted : 'Approved',
    localUseAccepted : 'KeepLocally',
    approvalRejected : 'Rejected',
    deletionAccepted : 'Deleted',
    deletionRejected : 'Rejected'
};

TabAlertMarkImage = {
	srcBlank:PROCESS_PATH_GLOBAL_RESOURCES + 'images/alert/alert_transparent.png',
	srcAlert:PROCESS_PATH_GLOBAL_RESOURCES + 'images/alert/alert.png',
	blank : '<img class="Img-RequestList-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/alert/alert_transparent.png"></img>',
	alert : '<img class="Img-RequestList-Name" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/alert/alert.png"></img>'
};

var PatientType =
{
    Adult       : 'Adult',
    Child       : 'Child'
};

var BodyRegion =
{
    Head        : 'Head',
    Neck        : 'Neck',
    All         : 'All',
    ECG         : 'ECG',
    Scano       : 'Scano'
};

ProtocolType = {
	    ExamPlan : 'ExamPlan',
	    SureExposure : 'SureExposure',
	    SureIQ : 'SureIQ',
	    ContrastPreset : 'ContrastPreset',
        VoicePreset : 'VoicePreset'
	};

ProtocolStatus = {
    approvalRequested : 'APPROVAL_REQUESTED',
    deletionRequested : 'DELETION_REQUESTED',
    approvalAccepted : 'APPROVAL_ACCEPTED',
    localUseAccepted : 'LOCAL_USE_ACCEPTED',
    approvalRejected : 'APPROVAL_REJECTED',
    deletionAccepted : 'DELETION_ACCEPTED',
    deletionRejected : 'DELETION_REJECTED',
    withoutApproval  : 'WITHOUT_APPROVAL'
};

ProtocolAction = {
    approve 		: "APPROVE",
    keepLocally 	: "KEEP_LOCALLY",
    reject 			: "REJECT",
    deleteProtocl 	: "DELETE",
    keep 			: "KEEP",
	rejectApproval	: "REJECT_APPROVAL",
	rejectDeletion	: "REJECT_DELETION"
};

ProtocolStatusSrc = {
	approvalRequested : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_app_req.png"',
	deletionRequested : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_del_req.png"',
	approvalAccepted : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_app.png"',
	localUseAccepted : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_keep.png"',
	approvalRejected : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_app_rej.png"',
	deletionAccepted : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_del.png"',
	deletionRejected : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_del_rej.png"',

	rejectKeepLocally : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_reject_keep_locally.png "',
	restoreDeleted    : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_res.png "',

	transfer    : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_transfer.png "'
};

ProtocolActionSrc = {
	approve : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/proaction/approve.png"',
	keepLocally : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/proaction/keep_locally.png"',
	reject : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/proaction/reject.png"',
	deleteProtocl : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/proaction/delete.png"',
	keep : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/proaction/keep.png"'
};

ProtocolShared = {
    IN_DELIVERY : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_ind_req.png"',
    DELIVERIED : '"' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/prostatus/icon_s_ind.png"',
    NOT_TO_DELIVERY : ''
};

RadioButton = {
	SrcUnSelect:'' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/radiobutton/radioButton.png',
	SrcSelect:'' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/radiobutton/radioButtonSelect.png',
	SrcNone : '' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon.png'
};

ParameterTag = {
	ScanList:"ScanList",
	SureIQList:"SureIQList",
	SureExposureList:"SureExposureList",
	ContrastPresetList:"ContrastPresetList",
	VoicePresetList:"VoicePresetList"
};

MasterProcessStatus =
{
    Start:1,
    CreationEP:2,
    CreationSureExp:3,
    CreationSureIQ:4,
    CreationCP:5,
    CreationVoice:6,
    Setting:7,
    SelectOther:8,
    Approving:9,
    FinishProtocolList:10,
    FinishFinalizeSetup:11
};