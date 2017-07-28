var stringSetting =
{
    protocolmanagement: "CT Protocol Management",

    tab: {
        requestlist : "Request List",
        history : "History List",
        transfer : "Transfer List",
        app_setting :"App Settings",
        master: "Master List",
        position: "Protocol Positions"
    },

    menu : {
        identifing:'Equipment Setting',
        filter : {
            CheckAll : "ALL",
            SortAscending : "Sort Ascending",
            SortDescending : "Sort Descending",
            Filter : "Filter"
        }
    },

    master:
    {
        button:
        {
            Next        : "Next",
            Back        : "Back",
            Cancel      : "Cancel",
            Approve     : "Approve",
            Finish      : "Finish",
            UserProtocol    : "User Protocol",
            ServiceProtocol : "Service Protocol",
            Move        : "Move",
            OKbtn       : "OK",
            Setasdefault    : "Set as default",
            Reset    : "Reset"
        },
        tab:
        {
            Adult       :"Adult",
            Child       :"Child",
            Trauma      :"Trauma",
            GroupA      :"Group A",
            GroupB      :"Group B",
            GroupC      :"Group C",

        },
        title:
        {
            Start                   : "Start to create Protocol Master List",
            CreationEP              : "Master List for Exam Plan",
            CreationSureIQ          : "Master List for <sup>SURE</sup>IQ",
            CreationSureExp         : "Master List for <sup>SURE</sup>Exposure",
            CreationCP              : "Master List for Contrast Preset",
            CreationVoice           : "Master List for Voice Preset",
            Setting                 : "Position Setting for Exam Plan",
            SelectOther             : "Master List for Other Settings",
            Approving               : "Confirm to approve",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "End to create Protocol Master List",
            title_confirm           : "Confirm",
            title_approve           : "Approve",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "Master List",
            OriginalList            : "Original List",
            Parameters              : "Parameters",
            Parameter_Name          : "Parameter Name",
        },
        statusLab:
        {
            Start                   : "Start",
            Creation                : "Master List<br> Creation",
            Setting                 : "Position<br> Setting",
            SelectOther             : "Select Other<br> Settings",
            Approving               : "Approving",
            Finish                  : "Finish"
        },
        column:{
            type                    :"Protocol",
            patienttype             :"Patient Type",
            name                    :"Name",
            date                    :"Date",
            scanner                 :"Scanner",
        },
        columns:
        {
            patientType                : "Patient Type",
            bodyRegion                 : "Body Region",
            masterList                 : "Name",
            machineName                : "Scanner",
            language                   : "Language",
        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Add all Protocols to Master List",
            addSelected               : "Add to Master List",
            checkParameters           : "Check Parameters",
            removeFromList            : "Remove From List",
        },
        message:
        {
            start_text1            : "You can create Protocol Master List from this page.",
            start_text2            : "Please click [Next] to start.",
            finish_text1           : "Protocol Master List has been created.",
            finish_text2           : "Please click [Finish] and review the approved protocols in the History List.",
            confirm_to_approve     : "Please click [Approve] to start approving.",
            confirmview_text1      : "Master List will be approved and distrubted to CT scanners.",
            confirmview_text2      : "Do you want to continue?",

            add_message_ep : 'The <sup>SURE</sup>Exposure, <sup>SURE</sup>IQ or ContrastPrest which the ExamPlan attached already exists in histories list, it will not automatically add into Master list.',
            add_message_sureexp : 'The <sup>SURE</sup>IQ or ContrastPrest which the <sup>SURE</sup>Exposure attached already exists in histories list, it will not automatically add into Master list.',
            add_repeat_message_sureexp : 'Another <sup>SURE</sup>Exposure Preset with the same name already exists in the master list and the preset will be overwritten.',
            add_repeat_message_contrastprest : 'Another ContrastPrest Preset with the same name already exists in the master list and the preset will be overwritten.',
            add_repeat_message_sureiq : 'Another <sup>SURE</sup>IQ Preset with the same name already exists in the master list and the preset will be overwritten.',
            add_repeat_message_other : 'Another Other Setting with the same name already exists in the master list and the preset will be overwritten.',
            add_repeat_message_voice : 'Another Voice Preset with the same name already exists in the master list and the preset will be overwritten.',
            add_duplicated_message_voice : 'Another Voice Preset with the same name Voice Index already exists in the master list.',
            add_duplicated_protocol_message_voice : 'The Voice Presets in Master List will be replaced by the presets in {0}.',
            master_delete_machine_waring:"All remaining protocols will be deleted from Master Maker",
            approve_error_header:'Approving...			100 %	Done<br>({0} protocols have been failed)',
            clean_error_header:'Deleting unnecessary protocols...			100 %	Done<br>({0} protocols have been failed)'
        }
    },
    request:
    {
        title_request : "Requests",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "VoicePreset"
        },
        column: {
            type : "Protocol",
            patienttype : "Patient Type",
            name : "Name",
            version : "Version",
            date : "Date",
            scanner : "Scanner",
            user : "User"
        },
        button: {
            approve : "Approve",
            keeplocally : "Keep Locally",
            reject : "Reject",
            deleted : "Delete",
            refresh : "Refresh",
            close: "Close",
            backtothelist : "Back"
        },
        event: {
            approve : "approved",
            keeplocally : "keep",
            reject : "rejected",
            deleted : "deleted"
        },
        msg_requesttime :
            "Request list has been updated, please click [Refresh] button."
    },
    UserSpecificName:
    {
        title    : "Equipment Setting",
        LabelNodata    : "No Data",
        emptyText       : 'Please input the name',
        button  :
        {
            close : "Close",
            save : "Save"
        }
    },
    compare : {
        title_detail : "Detail",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Show Differences Only",
            showall : "Show All",
            references: "References",
            save : 'Save',
            close : 'Close'
        },
        label : {
            console_comments : "Comments(Protocol Creator)",
            approver_comments : "Comments(Protocol Approver)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "Confirm",
        text : {
            approve : "This protocol will be approved for distribution to all scanners. ",
            deleteProtocl : "This protocol will be deleted and removed from all scanners.",
            rejectApproval : "This protocol will be rejected and the changes will be removed from the source scanner.",
            rejectDeletion : "This protocol deletion request will be rejected and restored to the source scanner.",
            keep : "This protocol will be approved for local use on the source scanner. ",
            asker : "Do you want to continue?",
            transfer : "This protocol will be transferred to other groups.",
            systemComment: "[System Generated Comment]",
            reason: "Transfer request for protocol has been sent to ",
            autoApproval: "Auto-Approval due to the approval of {1}.",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Auto-Approval together with {1} with same Organ.",
            autoRejectReason: "Auto-Reject together with {1} with same Organ."
        },
        label : {
            comments : "Comments",
            reminder : "Please input comments.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "This protocol will be transferred to other groups.<br>Please select the groups you wish to transfer this protocol to:",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Group',
            model: 'Model',
            softwarVersion: 'Software Version'
        },
        button : {
            ok : "OK",
            cancel : "Cancel",
            transferOption : "Transfer protocol to other groups (Option)"
        }
    },

    backupDialog: {
        menuItem: "Backup Protocols",
        backupTitle: "ProtocolManagement Backup",
        backupLocation: "Backup Location",
        backupBtn: "Backup",
        clearLogBtn: "Clear Log",
        backupLogs: "Backup Logs",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Close"
    },
    status_tip: {
        ApprovalRequested:"Approval Requested:",
        ApprovalAccepted:"Approved:",
        LocalUseAccepted:"Approved in local use:",
        DeletionRequested:"Deletion Requested:",
        DeletionAccepted:"Deleted:",
        ApprovalRejected:"Approval Rejected:",
        DeletionRejected:"Deletion Rejected:",
        Transferred :"Transferred:",
        Restored: "Restored:",
        ApprovalRequestedValue:"The protocol was created/edited in CT.",
        ApprovalAcceptedValue:"The protocol would be acceptable to use in all the same model/version CT.",
        LocalUseAcceptedValue:"The protocol would be acceptable to use the specific CT only.",
        DeletionRequestedValue:"The protocol was deleted in CT.",
        DeletionAcceptedValue:"The protocol would be deleted from all the same model/version CT.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"The protocol was not approved.it would be recovered to previous state in CT. ",
        DeletionRejectedValue:"The protocol was not approved to delete. it would be recovered to previous state in CT.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "The protocol was restored in CT. It is available to use."
    },
    history : {
        title_history : "Histories",
        title_transfer : "Transfers",
        title_protocolhistory : "Protocol History",
        title_comfirm_header : "Comments",
        text_search:"search",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Hide Deleted Items",
            showdeleteitems : "Show Deleted Items",
            backtoHistoryList : "Back",
            backtoTransferList : "Back",
            expandAll: "Expand All",
            collapseAll: "Collapse All",
            hide : "Hide",
            show : "Show",
            restore : "Restore",
            deleted : "Delete",
            ok : "OK",
            cancel : "Cancel",
            transfer : "Transfer",
            showall :"Show All",
            NextHistories : "Show More"
        },
        column : {
            type : "Protocol",
            patientype : "Patient Type",
            name : "Name",
            date : "Date",
            source_scanner : "Source Scanner",
            user : "User",
            scanners:"scanners",
            event: 'Event',
            comment: 'Comment'
        },
        cell_content : {
            event_create: "Create",
            event_edit: "Edit",
            event_approve: "Approve",
            event_delete: "Delete",
            event_restore: "Restore",
            event_keep_locally: "Keep Locally",
            event_reject: "Reject",
            event_transfer: "Transfer",
            event_cutandpaste: "Cut And Paste",
        },
        message : {
            requesttime : "History list has been updated, please click [Refresh] button.",
            comfirm_commants : "Comments",
            comfirm_commants_null : "Please input comments.",
            restore_comfirm_text1 : "This protocol will be restored and distributed to all scanners.",
            restore_comfirm_text2 : "Do you want to continue?",
            delete_comfirm_text1 : "This protocol will be immediately deleted and distributed to all scanners.",
            delete_comfirm_text2 : "Do you want to continue?"
        },
        action_event: {
            Request:"Request",
        }
    },

    comparison : {
        button : {
            cancel :"Cancel",
            check_params :"Check Parameters",
            ok :"OK",
            select_scan_mode :"Select Scan Mode"
        },
        title : {
            selection : "Select Compared Protocol",
            detail : "Detail",
            scan_mode : "Select Compared Scan Mode"
        }
    },

    app_setting : {
        button : {
            add :"Add",
            apply :"OK",
            cancel :"Cancel",
            deleted :"Delete",
            disable :"Disable",
            edit :"Edit",
            enable :"Enable",
            ok :"OK",
            save : "Save",
            execute: "Start",
            import: "Import",
            export: "Export",
            close: "Close"
        },
        column : {
            distribution :"Distribution",
            distribution_machine_name :"Distribution Scanner",
            distribution_scanner :"Distribution Scanner",
            group_name :"Name",
            key :"Key",
            machine_name :"Source Scanner",
            name :"Name",
            scanner :"Source Scanner",
            software_version :"Software Version",
            ep_type :"EPType",
            source_machine_name :"Source Scanner",
            source_scanner :"Source Scanner",
            system_name :"System Name",
            value :"Value",
            description :"Description",
            association: 'Association',
            guideline:'Guideline'
        },
        label : {
            initialize_setup:"Master Protocol Creator",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Language",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modality",
            modality_desc :"The modality name",
            model_name :"Model Name",
            model_name_desc :"The model name",
            name :"Name",
            name_desc :"The identifier of ProtocolPool",
            software_version :"Software Version",
            software_version_desc :"Current software version",
            ep_type :"EPType",
            ep_type_desc :"Current EPType",
            system_name :"System Name",
            system_name_desc :"The system name",
            vendor :"Vendor",
            vendor_desc :"The vendor name",
            x_ray_mode :"X-ray Mode",
            x_ray_mode_desc :"Xray mode",
            protocol_share_across_model:"Protocol Share Across Model",
            backup_protocol_data:"Backup Protocols",
            batch_approving:"Batch Approving",
            done:"Done",
            succeed:"Batch approving finished successfully.",
            cancel:"Batch approving is cancelled.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Some Protocols Approve Failed",
            clean_master_overview:"Some Protocols Remove Failed",
            adult_abdomen_pelvis_ct: 'Adult Abdomen Pelvis CT',
            adult_brain_perfusion_ct:'Adult Brain Perfusion CT',
            adult_routine_chest_abdomen_pelvis_ct:'Adult Routine Chest Abdomen Pelvis CT',
            adult_routine_chest_ct: 'Adult Routine Chest CT',
            adult_routine_head_ct:'Adult Routine Head CT',
            lung_cancer_screening_ct:'Lung Cancer Screening CT',
            export_or_import:"Export/Import Protocol Data",
            export_message:"Is it OK to clear all the data?",
            export_clear_message:"It is clearing the old data ....",
            import_init_message:"It is initializing the data ....",
            import_message:"There are no exporting data.",
            export_succeed:"Export finished successfully.",
            import_succeed:"Import finished successfully.",
            export_cancel:"Export is cancelled.",
            import_cancel:"Import is cancelled.",
            export_overview:"Some protocols files export failed during the export process.",
            import_overview:"Some protocols files import failed during the import process.",
            rpid_display:"RadLex RPID Support",
            reference_display:"Protocol Guideline Reference",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "App Setting has been updated, please click [Refresh] button.",
//          deleted :"The source scanner will be deleted.",
            protocol_pool_deleted :"The protocol pool will be deleted.",
            sources_canner_deleted :"The source scanner will be deleted.",
            distribution_scanner_deleted :"The distribution scanner will be deleted.",
            delete_continue :"Do you want to continue?",
            console_ok_save_warningone:"Some change is not be saved",
            console_ok_save_warningtwo:"Do you want to save the change ?",
            console_delete_machine_waring:"The console name will be deleted.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",
            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",
            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Source Scanner",
            distribution_setting :"Distribution Scanner",
            other_setting :"Others",
            pool_setting :"Protocol Pool",
            language_setting :"Language Setting",
            setting :"Setting",
            display_setting:"Protocol Share Across Model Setting",
            backup_protocol_data_setting:"Backup Protocols Setting",
            approve:"Approving...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"RadLex RPID Support Setting",
            reference_setting:"Protocol Guideline Reference Setting"
        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "User Protocol",
            ServiceProtocol : "Service Protocol",
            make_change:'Make Changes',
            active_change:'Activate changes',
            undo_change:'Undo Changes',
            leave:'Leave',
            stay:'Stay'
        },
        tab:
        {
            Adult       :"Adult",
            Child       :"Child",
            Trauma      :"Trauma",
            GroupA      :"Group A",
            GroupB      :"Group B",
            GroupC      :"Group C",
        },
        label : {
            title_protocol_selected:'Selected Protocol',
            title_progress:'Change Protocol Positions',
            succeed:"Protocol change positions finished successfully.",
            label_changing          : "Changing... ",
        },
        message : {
            save_examplan_position :"Protocol Pool will be changed based on positions changes.",
            confirmview_text2      : "Do you want to continue?",
            move_down_position     : "This position is already reserved by another protocol. This step will make a blank by moving down all other protocols in this Body Region.",
            leave_page :"Did you want to leave this page?",
            not_save :"Current changes will not be saved.",
        },
        tips : {
            not_distributed:'Not yet distributed'
        }
    },

    error : {
        title: "ErrorList",
        event:
        {
            approve: {
                overview    : "Approval",
                details        : "approval",
                details2    : "approved"
            },
            clean: {
                overview    : "Clean",
                details        : "clean",
                details2    : "cleaned"
            },
            move: {
                overview    : "Move",
                details        : "move",
                details2    : "move"
            },
            deleted: {
                overview    : "Deletion",
                details        : "deletion",
                details2    : "deleted"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "restored"
            },
            approvetransfer: {
                overview    : "Approval or Transferring",
                details        : "approval or transfer",
                details2    : "approved or transfered"
            },
            transfer: {
                overview    : "Transferring",
                details        : "transfer",
                details2    : "transferred"
            },
            export: {
                overview    : "Export",
                details        : "export",
                details2    : "exported"
            },
            import: {
                overview    : "Import",
                details        : "import",
                details2    : "imported"
            }
        },

        ERR01002 : {
            "status"    : "error",
            "overview"    : "Acquire license Failed",
            "details"    : "Fail to acquire license, therefore launch application was cancelled.",
            "solution"    : "Please check the license.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        ERR11111 : {
            "status"    : "error",
            "overview"    : "Unexpected error occurred",
            "details"    : "Unexpected error occurred during the operation.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        //approve core
        ERR10001 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "The protocol has been operated by other user, therefore protocol {0} was cancelled.",
            "solution"    : "Check the history list.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "This protocol was updated during {0}, therefore protocol {1} was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "Fail to connect to the files server, therefore protocol {0} was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "Unexpected error was occured in system, therefore protocol {0} was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Protocol Restore Failed",
            "details"    : "Another protocol present at the same position has already existed.",
            "solution"    : "",
            "calladmin"    : "If the problem persists call your service representative."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "Some files were using, threfore protocol {0} was cancelled.",
            "solution"    : "Close the using files and try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The system names between CT Scanner and Protocol Server were mismatched, therefore protocol retrieval was cancelled.",
            "solution"    : "Change the system name on Protocol Server.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The model names between CT Scanner and Protocol Server were mismatched, therefore protocol retrieval was cancelled.",
            "solution"    : "Change the model name on Protocol Server.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The X-ray modes between CT Scanner and Protocol Server were mismatched, therefore protocol retrieval was cancelled.",
            "solution"    : "Change the X-ray mode on Protocol Server.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The software versions between CT Scanner and Protocol Server were mismatched, therefore protocol retrieval was cancelled.",
            "solution"    : "Change the software version on Protocol Server.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The summary file was unreadable, therefore protocol retrieval was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The changelog file was unreadable, therefore protocol retrieval was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The history file was unreadable, therefore protocol retrieval was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "The summary file was not found, therefore protocol retrieval was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Protocol Request Failed",
            "details"    : "This protocol is already approved by an another user, therefore protocol retrieval was cancelled.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Protocol Retrieve Failed",
            "details"    : "It fails to retrieve the protocol history.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the scanner identifier in a blank.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the vendor name in a blank.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the modality name in a blank.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the system name in a blank.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the model name in a blank.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the x-ray mode in a blank.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the software version in a blank.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Select the scanner identifier.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Fill the console name in a blank.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "This console name was already registered.",
            "solution"    : "Rename the console name.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Not allow to set a blank.",
            "solution"    : "Select the source console name.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Not allow to disable all the destinations.",
            "solution"    : "Enable at least 1 destination console name.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "This console name contains illegal characters, only [0-9], [a-Z] and [ -_ ] are allowed.",
            "solution"    : "Rename the console name.",
        },


        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "App Setting Failed",
              "details"    : "This console name was already registered.",
              "solution"    : "Rename the console name.",
              "calladmin"    : "If the problem persists call your service representative."
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "Some files were using, therefore setting deletion was cancelled.",
            "solution"    : "Close the using files and try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Same scanner identifier was already registered, therefore setting registration was cancelled.",
            "solution"    : "Register the scanner identifier by another name.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "Same scanner information was already registered, therefore setting registration was cancelled.",
            "solution"    : "Check the registered scanner information.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The program is in use, therefore setting registration was cancelled.",
            "solution"    : "Please wait for a while and then try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "Editing configuration file was failed, therefore moving protocol histories was cancelled.",
            "solution"    : "Check the configuration file status and then try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The program was time out",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "Unknown error was occurred.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        // Master Maker
        ERR60001 : {
            "status"    : "error",
            "overview"    : "Search files Failed",
            "details"    : "Fail to search the files under the folder.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR60002 : {
            "status"    : "error",
            "overview"    : "Delete file Failed",
            "details"    : "Fail to delete the file.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        // App setting error message
        ERR70001 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The setting file was using, therefore setting update was cancelled.",
            "solution"    : "Close the using files and try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The setting file was using, therefore setting deletion was cancelled.",
            "solution"    : "Close the using files and try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The setting file was not found, therefore app setting was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The setting file was unreadable, therefore app setting was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "App Setting Failed",
            "details"    : "The scanner has been existed, therefore adding the scanner was cancelled.",
            "solution"    : "Check the application settings and then try it again.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Equipment Setting Failed",
              "details"    : "The configuration file is in use by other program, therefore equipment setting was cancelled.",
              "solution"    : "Close the configuraiton file and then try it again.",
              "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "Equipment Setting Failed",
              "details"    : "The configuration file has been edited by other program, therefore equipment setting was cancelled.",
              "solution"    : "Try it again later.",
              "calladmin"    : "If the problem persists call your service representative."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "Equipment Setting Failed",
              "details"    : "The configuration file is unreadable, therefore equipment setting was cancelled.",
              "solution"    : "Check the configuration file and then try it again.",
              "calladmin"    : "If the problem persists call your service representative."
        },

        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "This protocol {0} was already transferred to {1}, therefore protocol transferring was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "Unexpected error was occured in system, therefore protocol {0} was cancelled.",
            "solution"    : "",
            "calladmin"    : "Contact your service representative."
        },
        ERR80004 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "protocol sharing state set in 'protocolmanagement.xml' is off",
            "solution"    : "Please check the file 'ProtocolManagement.xml'.",
            "calladmin"    : "If the problem persists call your service representative."
        },

        ERR0005 : {
            "status"    : "info",
            "overview"    : "Duplicate <sup>SURE</sup>Exposure Preset",
            "details"    : "Another <sup>SURE</sup>Exposure Preset with the same name is already available in the master list for the following Protocols: ",
            "solution"    : "If you want to replace the existing one in the master list with the above protocols, please remove the existing one from the master list and then replace with the above protocols.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Duplicate <sup>SURE</sup>IQ Preset",
            "details"    : "Another <sup>SURE</sup>IQ Preset with the same name is already available in the master list for the following Protocols: ",
            "solution"    : "If you want to replace the existing one in the master list with the above protocols, please remove the existing one from the master list and then replace with the above protocols.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Duplicate Contrast Preset",
            "details"    : "Another Contrast Preset with the same name is already available in the master list for the following Protocols: ",
            "solution"    : "If you want to replace the existing one in the master list with the above protocols, please remove the existing one from the master list and then replace with the above protocols.",
            "calladmin"    : ""
        },
        ERR0008 : {
            "status"    : "error",
            "overview"    : "Scano <sup>SURE</sup>IQ missing",
            "details"    : "The current master list does not contain the <sup>SURE</sup>IQ for Scano.<br><br>Please add the <sup>SURE</sup>IQ for Scano to proceed.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
            "status"    : "error",
            "overview"    : "Improper <sup>SURE</sup>IQ Preset",
            "details"    : "<sup>SURE</sup>IQ contains an invalid Patient Type.<br>The valid Patient Type supported for <SUREIQ Name> is Adult.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0010 : {
            "status"    : "error",
            "overview"    : "Improper <sup>SURE</sup>IQ Preset",
            "details"    : "<sup>SURE</sup>IQ contains an invalid Patient Type.<br>The valid Patient Type supported for <SUREIQ Name> is Adult.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0011 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ Preset Queue is full",
            "details"    : "<sup>SURE</sup>IQ Preset queue can only accommodate {1} organ types in the master list. This limit has been exceeded for the following organs:",
            "solution"    : "If you want to add more <sup>SURE</sup>IQ Preset for the organ type, kindly remove any other entry first.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ Preset Queue is full",
            "details"    : "<sup>SURE</sup>IQ Preset queue can only accommodate {1} cards in a specific organ type in the master list. This limit has been exceeded for the following organs:",
            "solution"    : "If you want to add more <sup>SURE</sup>IQ Preset for this organ, kindly remove any other entry first.",
            "calladmin"    : ""
        },
        ERR0013 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>Exposure Preset Queue is full",
            "details"    : "<sup>SURE</sup>Exposure Preset queue can only accommodate {1} cards in the master list.<br><sup>SURE</sup>Exposure is beyond this queue limit and cannot be supported.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0014 : {
            "status"    : "error",
            "overview"    : "Improper <sup>SURE</sup>Exposure Preset",
            "details"    : "<sup>SURE</sup>Exposure contains an invalid Patient Type.<br>The valid Patient Type supported for <sup>SURE</sup>Exposure are Adult or Child.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0015 : {
            "status"    : "error",
            "overview"    : "Improper <sup>SURE</sup>Exposure Preset",
            "details"    : "<sup>SURE</sup>Exposure contains an invalid Organ Type.<br>The valid Organ Type supported for <sup>SURE</sup>Exposure are Head, Neck, ECG or All.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>Exposure Preset Queue is full",
            "details"    : "<sup>SURE</sup>Exposure Preset queue can only accommodate {1} cards in a specific organ type in the master list. This limit has been exceeded for the following organs:",
            "solution"    : "If you want to add more <sup>SURE</sup>Exposure Preset for this organ, kindly remove any other entry first.",
            "calladmin"    : ""
        },
        ERR0017 : {
            "status"    : "error",
            "overview"    : "Improper Contrast Preset",
            "details"    : "Contrast Preset contains an invalid Patient Type.<br>The valid Patient Type supported for Contrast Preset are Adult and Child.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0018 : {
            "status"    : "info",
            "overview"    : "Missing <sup>SURE</sup>Exposure",
            "details"    : "At least one <sup>SURE</sup>Exposure Preset should be present for each Organ Type and Patient Type.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
            "status"      : "error",
            "overview"    : "Position Setting Failed",
            "details"     : "Unexpected error was occurred.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "This equipment identifying name is already registered.",
            "solution"    : "Please change the name.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "This equipment identifying name is too long.",
            "solution"  : "Please select a name less than 40 characters.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Adding CT scanner has histories?",
            "solution"  : "",
            "calladmin" : ""
        },
        ERR0023 : {
            "status"    : "info",
            "overview"    : "Missing <sup>SURE</sup>Exposure",
            "details"    : "At least one <sup>SURE</sup>Exposure Preset should be present for each Organ Type and Patient Type.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0024 : {
            "status"    : "info",
            "overview"    : "Missing <sup>SURE</sup>Exposure",
            "details"    : "At least one <sup>SURE</sup>Exposure Preset should be present for each Organ Type and Patient Type.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0025 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ Preset Queue is full",
            "details"    : "<sup>SURE</sup>IQ Preset queue can only accommodate {1} presets.<br><sup>SURE</sup>IQ is beyond this queue and cannot be supported.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0026 : {
            "status"    : "error",
            "overview"    : "Improper <sup>SURE</sup>Exposure Preset",
            "details"    : "<sup>SURE</sup>Exposure contains an invalid Patient Type.<br>The valid Patient Type supported for <sup>SURE</sup>Exposure are Adult or Child.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0027 : {
            "status"    : "info",
            "overview"    : "Duplicate <sup>SURE</sup>IQ Preset",
            "details"    : "Another <sup>SURE</sup>IQ Preset with the same name already exists in the history list, so this preset cannot be added.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0028 : {
            "status"    : "info",
            "overview"    : "Duplicate <sup>SURE</sup>Exposure Preset",
            "details"    : "Another <sup>SURE</sup>Exposure Preset with the same name already exists in the history list, so this preset cannot be added.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0029 : {
            "status"    : "info",
            "overview"    : "Duplicate Contrast Preset",
            "details"    : "Another Contrast Preset with the same name already exists in the history list, so this preset cannot be added.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Duplicate <sup>SURE</sup>Exposure Preset",
            "details"    : "Another <sup>SURE</sup>Exposure with the same name already added into master list automatically as attached protocol. It can not be overwritten.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Duplicate <sup>SURE</sup>IQ Preset",
            "details"    : "Another <sup>SURE</sup>IQ with the same name already added into master list automatically as attached protocol. It can not be overwritten.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Duplicate Contrast Preset",
            "details"    : "Another Contrast with the same name already added into master list automatically as attached protocol. It can not be overwritten.",
            "solution"    : "",
            "calladmin"    : "Please contact your service representative for assistance."
        },
        ERR0033 : {
            "status": "error",
            "overview": "Backup files Failed",
            "details": "Some Error Occurs while backup files.",
            "solution": "Check backup path again, please try it again.",
            "calladmin": "If the problem persists call your service representative."
        },
        ERR0034 : {
            "status"    : "info",
            "overview"    : "Duplicate Voice Preset",
            "details"    : "Another Voice Preset with the same name is already available in the master list for the following Protocols: ",
            "solution"    : "If you want to replace the existing one in the master list with the above protocols, please remove the existing one from the master list and then replace with the above protocols.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "Voice Preset Queue is full",
            "details"    : "Voice Preset queue can only accommodate 20 language in the master list. This limit has been exceeded for the following languages:",
            "solution"    : "If you want to add more Voice Preset for the language, kindly remove any other entry first.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "Voice Preset Queue is full",
            "details"    : "Voice Preset queue can only accommodate 10 cards in a specific language in the master list. This limit has been exceeded for the following language:",
            "solution"    : "If you want to add more Voice Preset for this language, kindly remove any other entry first.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Missing Voice Preset",
            "details"    : "Voice Preset queue must contain the following 6 Languages:<BR><BR>Japanese<BR>English<BR>Chinese<BR>Korean<BR>Spanish<BR>Portuguese",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Missing Voice Preset",
            "details"    : "Each Language in the Voice Preset queue must contain the following 5 Voice Commands:<BR><BR>Breathe In & Hold<BR>Don't Swallow<BR>Expiration<BR>Don't Move<BR>Breathe Normally",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Duplicate Voice Preset",
            "details"    : "Another Voice Preset with the same name already exists in the history list, so this preset cannot be added.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ Preset Queue did not rearch the minimum cards number ",
            "details"    : "<sup>SURE</sup>IQ Preset queue need to  accommodate at least {1} cards in a specific organ type in the master list.This limit is not matched for the following organs:",
            "solution"    : "Please set add <sup>SURE</sup>IQ Preset for this organ.",
            "calladmin"    : ""
        },
        ERR0041 : {
            "status"    : "",
            "overview"    : "Duplicated VoicePreset…",
            "details"    : "The Voice Presets in Master List will be replaced by the presets in <BR>{0}<BR>. Do you want to continue?",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0042 : {
            "status"    : "",
            "overview"    : "",
            "details"    : "The following protocols position change Failed. <BR>{0}<BR>",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0043 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "It failed to move down all other protocols in this Body Region because some positions are blocked.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0044 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "It failed to move down all other protocols in this Body Region because positions are unavaible.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0045 : {
            "status"    : "error",
            "overview"    : "Protocol update failed",
            "details"    : "Protocol update failed because protocol Pool is busy now.",
            "solution"    : "Please try again later.",
            "calladmin"    : ""
        }
    }

};