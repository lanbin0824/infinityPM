var stringSetting =
{
    protocolmanagement: "Protocolbeheer",

    tab: {
        requestlist : "Verzoekenlijst",
        history : "Geschiedenislijst",
        transfer : "Lijst met overdrachten",
        app_setting :"App-instellingen",
        master: "Masterlijst",
        position: "Protocol Positions"
    },

    menu : {
        identifing:'Apparatuurinstelling',
        filter : {
            CheckAll : "ALLE",
            SortAscending : "Oplopend sorteren",
            SortDescending : "Aflopend sorteren",
            Filter : "Filter"
        }
    },

    master:
    {
        button:
        {
            Next        : "Volgende",
            Back        : "Terug",
            Cancel      : "Annuleren",
            Approve     : "Goedk.",
            Finish      : "Einde",
            UserProtocol    : "Userprotocol",
            ServiceProtocol : "Serviceprotocol",
            Move        : "Verplaatsen",
            OKbtn       : "OK",
            Setasdefault    : "Als standaard instellen",
            Reset    : "Reset"
        },
        tab:
        {
        	Adult       :"Adult",
        	Child       :"Child",
        	Trauma      :"Trauma",
            GroupA      :"Groep A",
            GroupB      :"Groep B",
            GroupC      :"Groep C",

        },
        title:
        {
            Start                   : "Maken van een protocollenhoofdlijst starten",
            CreationEP              : "Hoofdlijst voor onderzoeksplan",
            CreationSureIQ          : "Hoofdlijst voor <sup>SURE</sup>IQ",
            CreationSureExp         : "Hoofdlijst voor <sup>SURE</sup>Exposure",
            CreationCP              : "Hoofdlijst voor voorinstellingen voor Contrast",
            CreationVoice           : "Hoofdlijst voor vooraf ingestelde stem",
            Setting                 : "Positie-instelling voor onderzoeksplan",
            SelectOther             : "Hoofdlijst voor andere instellingen",
            Approving               : "Bevestig Masterlijst vóór Goedk.",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Maken van een protocollenhoofdlijst beëindigen",
            title_confirm           : "Akkoord",
            title_approve           : "Goedk.",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "Masterlijst",
            OriginalList            : "Origin. lijst",
            Parameters              : "Param. ",
            Parameter_Name			: "Parameter Name",
        },
        statusLab:
        {
            Start                   : "Start",
            Creation                : "Masterlijst<br> aanmaak",
            Setting                 : "Positie<br> instelling",
            SelectOther             : "Selecteren van <br> andere instellingen",
            Approving               : "Goedkeuren",
            Finish                  : "Einde"
        },
        column:{
            type                    :"Protocol",
            patienttype             :"Patiënttype",
            name                    :"Naam",
            date                    :"Dat.",
            scanner                 :"Scannernaam",
        },
        columns:
        {
            patientType                : "Patiënttype",
            bodyRegion                 : "Lich.gebied",
            masterList                 : "Masterlijst",
            machineName                : "Scannernaam",
            language                   : "Taal",

        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Alle protocollen bij Masterlijst",
            addSelected               : "Bij Masterlijst",
            checkParameters           : "Param. checken",
            removeFromList            : "Wissen van Masterlijst",
        },
        message:
        {
            start_text1            : "Op deze pagina kunt u een protocollenhoofdlijst maken.",
            start_text2            : "Klik [Volgende] voor start.",
            finish_text1           : "Protocollenhoofdlijst is gecreëerd.",
            finish_text2           : "Klik op [Einde] en beoordeel goedgekeurde protocols in Geschiedenislijst.",
            confirm_to_approve     : "Klik op [Goedk.] om goedk.proces te starten.",
            confirmview_text1      : "Masterlijst wordt goedgek. en gedistrib. naar CT-scanners.",
            confirmview_text2      : "Wilt u doorgaan?",

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
        title_request : "Verzoeken",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Voorinstelling stem"

        },
        column: {
            type : "Protocol",
            patienttype : "Patiënttype",
            name : "Naam",
            version : "Versie",
            date : "Dat.",
            scanner : "Scanner",
            user : "Gebruiker"
        },
        button: {
            approve : "Goedkeuren",
            keeplocally : "Lokaal houden",
            reject : "Afwijzen",
            deleted : "Wissen",
            refresh : "Nieuw",
            close: "Sluiten",
            backtothelist : "Terug naar Lijst"
        },
        event: {
            approve : "Goedgekeurd",
            keeplocally : "keep",
            reject : "rejected",
            deleted : "Gewist"
        },
        msg_requesttime :
            "Verzoekenlijst is bijgewerkt, klik op de knop [Vernieuwen]."
    },
    UserSpecificName:
    {
        title    : "Apparatuurinstelling",
        LabelNodata    : "No Data",
        emptyText       : 'Voer de naam in',
        button  :
        {
            close : "Sluiten",
            save : "Opslaan"
        }
    },
    compare : {
        title_detail : "Detail",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Alleen Verschil Weergeven",
            showall : "Alles Weergeven",
            references: "References",
            save : 'Opslaan',
            close : 'Sluiten'
        },
        label : {
            console_comments : "Commentaar (Protocolmaker)",
            approver_comments : "Commentaar (Protocolgoedkeurder)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "Akkoord",
        text : {
            approve : "Dit protocol zal worden goedgekeurd voor distributie naar alle scanners. ",
            deleteProtocl : "Dit protocol zal worden gewist en verwijderd van alle scanners.",
            rejectApproval : "Dit protocol zal worden afgewezen en verwijderd van de bronscanner. ",
            rejectDeletion : "Dit protocol zal worden afgewezen voor verwijdering en zal worden hersteld naar de bronscanner.",
            keep : "Dit protocol zal worden goedgekeurd voor lokaal gebruik op de bronscanner. ",
            asker : "Wilt u doorgaan?",
            transfer : "Dit protocol wordt overgedragen aan andere groepen.",
            systemComment: "[Opmerking van systeem]",
            reason: "Verzoek om protocol over te dragen is verzonden naar ",
            autoApproval: "Automatische goedkeuring vanwege goedkeuring van {1}",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Automatische goedkeuring met {1} met hetzelfde orgaan.",
            autoRejectReason: "Automatische afwijzing met {1} met hetzelfde orgaan."
        },
        label : {
            comments : "Commentaar",
            reminder : "Voer commentaar in.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Dit protocol wordt overgedragen aan andere groepen.<br>Selecteer de groepen waaraan u dit protocol wilt overdragen",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Groep',
            model: 'Model',
            softwarVersion: 'Softwareversie'
        },
        button : {
            ok : "OK",
            cancel : "Annuleren",
            transferOption : "Protocol overdragen aan andere groepen (optioneel)"
        }
    },

    backupDialog: {
        menuItem: "Back-up van protocolgegevens maken",
        backupTitle: "Back-up van protocolgegevens maken",
        backupLocation: "Back-uplocatie",
        backupBtn: "Back-up",
        clearLogBtn: "Logboek wissen",
        backupLogs: "Back-uplogboek",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Sluiten"
    },
    status_tip: {
        ApprovalRequested:"Goedkeuring verzocht:",
        ApprovalAccepted:"Goedgekeurd:",
        LocalUseAccepted:"Goedgekeurd in Lokaal Gebruik:",
        DeletionRequested:"Verwijdering verzocht:",
        DeletionAccepted:"Gewist:",
        ApprovalRejected:"Goedkeuring Afgewezen:",
        DeletionRejected:"Verwijdering Afgewezen:",
        Transferred :"Transferred:",
        Restored: "Hersteld:",
        ApprovalRequestedValue:"Het protocol werd aangemaakt/bewerkt in CT.",
        ApprovalAcceptedValue:"Het protocol zou geschikt zijn voor gebruik in elke CT van zelfde model/versie.",
        LocalUseAcceptedValue:"Het protocol zou alleen geschikt zijn voor gebruik in de specifieke CT.",
        DeletionRequestedValue:"Het protocol werd gewist in CT.",
        DeletionAcceptedValue:"Het protocol zou worden gewist van elke CT van zelfde model/versie.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"Het protocol werd niet goedgekeurd. Het zal worden hersteld naar de vorige staat in CT. ",
        DeletionRejectedValue:"Het protocol werd niet goedgekeurd voor verwijdering. Het zal worden hersteld naar de vorige staat in CT.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "Het protocol werd hersteld in CT. Het is beschikbaar voor gebruik."
    },
    history : {
        title_history : "Geschiedenis",
        title_transfer : "Transfers",
        title_protocolhistory : "Protocolgeschiedenis",
        title_comfirm_header : "Bevestigen",
        text_search:"zoeken",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Wis-items verbergen",
            showdeleteitems : "Wis-items weergeven",
            backtoHistoryList : "Terug naar Lijst",
            backtoTransferList : "Terug",
            expandAll: "Alles Open",
            collapseAll: "Alles Dicht",
            hide : "Verbergen",
            show : "Weergeven",
            restore : "Herstellen",
            deleted : "Wissen",
            ok : "OK",
            cancel : "Annuleren",
            transfer : "Overdragen",
            showall :"Alles Weergeven",
            NextHistories : "Meer Zien"
        },
        column : {
            type : "Protocol",
            patientype : "Patiënttype",
            name : "Naam",
            date : "Dat.",
            source_scanner : "Oorspronkelijke scanner",
            user : "Gebruiker",
            scanners:"scanners",
            event: 'Gebeurtenis',
            comment: 'Commentaar'
        },
        cell_content : {
            event_create: "Aanmaken",
            event_edit: "Bewerken",
            event_approve: "Goedkeuren",
            event_delete: "Wissen",
            event_restore: "Herstellen",
            event_keep_locally: "Lokaal houden",
            event_reject: "Afwijzen",
            event_transfer: "Overdragen",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "Geschiedenislijst is bijgewerkt, klik op de knop [Vernieuwen].",
            comfirm_commants : "Commentaar",
            comfirm_commants_null : "Voer commentaar in.",
            restore_comfirm_text1 : "Het protocol zal worden hersteld en gedistribueerd naar alle scanners.",
            restore_comfirm_text2 : "Wilt u doorgaan?",
            delete_comfirm_text1 : "Dit protocol zal onmiddellijk worden gewist en gedistribueerd naar alle scanners.",
            delete_comfirm_text2 : "Wilt u doorgaan?"
        },
        action_event: {
            Request:"Verzoek",
        }
    },

    comparison : {
        button : {
            cancel :"Annuleren",
            check_params :"Param. checken",
            ok :"OK",
            select_scan_mode :"Selecteer Scanmodus"
        },
        title : {
            selection : "Selecteer Vergeleken Protocol",
            detail : "Detail",
            scan_mode : "Selecteer Modus Vergeleken Scan"
        }
    },

    app_setting : {
        button : {
            add :"Toevoegen",
            apply :"OK",
            cancel :"Annuleren",
            deleted :"Wissen",
            disable :"Uitschakelen",
            edit :"Bewerken",
            enable :"Inschakelen",
            ok :"OK",
            save : "Opslaan",
            execute: "Start",
            import: "Import",
            export: "Export",
            close: "Sluiten"
        },
        column : {
            distribution :"Distribution",
            distribution_machine_name :"Distributiescanner",
            distribution_scanner :"Distributiescanner",
            group_name :"Naam",
            key :"Sleutel",
            machine_name :"Bronscanner",
            name :"Naam",
            scanner :"Bronscanner",
            software_version :"Softwareversie",
            ep_type :"EPType",
            source_machine_name :"Bronscanner",
            source_scanner :"Bronscanner",
            system_name :"Systeemnaam ",
            value :"Waarde",
            description :"Beschrijving",
            association: 'Association',
            guideline:'Guideline',
        },
        label : {
            initialize_setup:"Masterprotocolmaker",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Taal",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modaliteit",
            modality_desc :"De modaliteitnaam",
            model_name :"Modelnaam",
            model_name_desc :"De modelnaam",
            name :"Naam",
            name_desc :"De identificatie van Protocolpool",
            software_version :"Softwareversie",
            software_version_desc :"Huidige Softwareversie",
            ep_type :"EPType",
            ep_type_desc :"Huidig EPType",
            system_name :"Systeemnaam",
            system_name_desc :"De systeemnaam",
            vendor :"Verkoper",
            vendor_desc :"De merknaam",
            x_ray_mode :"Röntgenmodus",
            x_ray_mode_desc :"Röntgenmodus",
            protocol_share_across_model:"Protocol Share-across-model",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Batchgoedkeuring",
            done:"Done",
            succeed:"Batchgoedkeuring is met succes voltooid.",
            cancel:"Batchgoedkeuring werd geannuleerd.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Sommige protocollen konden niet worden goedgekeurd",
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
            rpid_display:"RadLex RPID-ondersteuning",
            reference_display:"Protocol Richtlijnreferentie",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "App-instelling is bijgewerkt, klik op de knop [Vernieuwen].",
//          deleted :"Deze instelling zal worden verwijderd uit configuratiebestand.",
            protocol_pool_deleted :"Deze instelling zal worden verwijderd uit configuratiebestand.",
            sources_canner_deleted :"Deze instelling zal worden verwijderd uit configuratiebestand.",
            distribution_scanner_deleted :"Deze instelling zal worden verwijderd uit configuratiebestand.",
            delete_continue :"Wilt u doorgaan?",
            console_ok_save_warningone:"Niet elke wijziging is opgeslagen.",
            console_ok_save_warningtwo:"Wilt u de wijzigingen opslaan?",
            console_delete_machine_waring:"De bronscanner zal worden gewist.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",

            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",

            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Bronscanner",
            distribution_setting :"Distributiescanner",
            other_setting :"Andere",
            pool_setting :"Protocolpool",
            language_setting :"Language Setting",
            setting :"Instelling",
            display_setting:"Protocol Share-across-model",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Bezig met goedkeuring",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"RadLex RPID-ondersteuning",
            reference_setting:"Protocol Richtlijnreferentie"

        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Userprotocol",
            ServiceProtocol : "Serviceprotocol",
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
            GroupA      :"Groep A",
            GroupB      :"Groep B",
            GroupC      :"Groep C",
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
                overview    : "Goedkeuring",
                details        : "goedkeuring",
                details2    : "Goedgekeurd"
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
                overview    : "Verwijdering",
                details        : "verwijdering",
                details2    : "Gewist"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "Hersteld"
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
            "overview"    : "Licentie Ophalen Misl.",
            "details"    : "Starten van applicatie geannuleerd wegens mislukte licentietoegang.",
            "solution"    : "Controleer de licentie.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
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
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Het protocol wordt gebruikt door een andere gebruiker. Protocol {0} is geannuleerd.",
            "solution"    : "Controleer het geschiedenisoverzicht.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Dit protocol is tijdens {0} bijgewerkt. Protocol {1} is geannuleerd.",
            "solution"    : "Probeer het later opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Kan de bestanden van dit protocol niet lezen. Protocol {0} is geannuleerd.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Kan geen verbinding maken met de server van de bestanden. Protocol {0} is geannuleerd.",
            "solution"    : "Probeer het later opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Protocolserver veroorzaakte onverwachte fout.",
            "solution"    : "Probeer later opnieuw.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Kan protocol niet herstellen",
            "details"    : "Er bestaat al een ander protocol op dezelfde locatie.",
            "solution"    : "",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
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
            "overview"    : "Protocol {0} mislukt",
            "details"    : "Sommige bestanden waren in gebruik. Protocol {0} is geannuleerd.",
            "solution"    : "Sluit de bestanden die in gebruik waren en probeer het opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd omdat systeemnamen tussen CT-scanner en Protocol-server niet overeenkwamen.",
            "solution"    : "Wijzig de systeemnaam op Protocolserver.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd omdat modelnamen tussen CT-scanner en Protocol-server niet overeenkwamen.",
            "solution"    : "Wijzig de modelnaam op Protocolserver.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd omdat röntgenmodi tussen CT-scanner en Protocol-server niet overeenkwamen.",
            "solution"    : "Wijzig de röntgenmodus op Protocolserver.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd omdat softwareversies tussen CT-scanner en Protocol-server niet overeenkwamen.",
            "solution"    : "Wijzig de softwareversie op Protocolserver.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd wegens onleesbaar samenvattingsbestand.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd omdat changelog-bestand onleesbaar was.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd wegens onleesbaar geschiedenisbestand.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Verkrijgen van protocol geannuleerd wegens onvindbaar samenvattingsbestand.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Protocol Ophalen Misl.",
            "details"    : "Protocol is al goedgekeurd door andere gebruiker.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Protocol kan niet worden opgehaald",
            "details"    : "Het ontvangen van de protocolgeschiedenis is mislukt.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer scanneridentificatie in leeg veld in.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer firmanaam in leeg veld in.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer modaliteitnaam in leeg veld in.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer systeemnaam in leeg veld in.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer modelnaam in leeg veld in.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer röntgenmodus in leeg veld in.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer softwareversie in leeg veld in.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Selecteer de scanneridentificatie.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Voer bronscanner in leeg veld in.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Deze scanner is al geregistreerd.",
            "solution"    : "Wijzig naam van scanner.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Veld leeg laten mag niet.",
            "solution"    : "Selecteer de bronscanner.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Alle distributiescanners inactiveren mag niet.",
            "solution"    : "Activeer ten minste 1 distributiescanner.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "De naam van de scanner bevat ongeldige tekens. Alleen [0-9], [a-Z] en [ -_ ] zijn toegestaan.",
            "solution"    : "Wijzig de naam van de scanner.",
        },

        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "App.instell. Misl.",
              "details"    : "Deze scanner is al geregistreerd.",
              "solution"    : "Wijzig naam van scanner.",
              "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "App.instell. Misl.",
            "details"    : "Instelling-update geannuleerd wegens bestanden in gebruik.",
            "solution"    : "Sluit de open bestanden en probeer opnieuw.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Zelfde scanner-identificatie al geregistreerd.",
            "solution"    : "Wijzig naam van scanneridentificatie.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "App.instell. Misl.",
            "details"    : "Instelling-update geannuleerd omdat dezelfde Protocol-pool al is geregistreerd.",
            "solution"    : "Controleer de andere Protocolpool.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "Instellen van toepassing mislukt",
            "details"    : "Het programma is in gebruik. Het registreren van instellingen is geannuleerd.",
            "solution"    : "Probeer het over een tijdje opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "Instellen van toepassing mislukt",
            "details"    : "Kan het configuratiebestand niet bewerken. Het verplaatsen van de protocolgeschiedenissen is geannuleerd.",
            "solution"    : "Controleer de status van het configuratiebestand en probeer het opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "Instellen van toepassing mislukt",
            "details"    : "Time-out van het programma.",
            "solution"    : "Probeer het later opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "Instellen van toepassing mislukt",
            "details"    : "Er is een onbekende fout opgetreden.",
            "solution"    : "Probeer het later opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
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
            "overview"    : "App.instell. Misl.",
            "details"    : "Instelling-update geannuleerd wegens instellingbestand in gebruik.",
            "solution"    : "Sluit het open bestand en probeer opnieuw.",
            "calladmin"    : "Bel Toshiba-service als het probleem aanhoudt."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "App.instell. Misl.",
            "details"    : "Bijwerken van instelling werd geannuleerd omdat instellingbestand in gebruik is.",
            "solution"    : "Sluit het actieve bestand en probeer opnieuw.",
            "calladmin"    : "Informeer Toshiba-service als het probleem aanhoudt."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "App.instell. Misl.",
            "details"    : "Instelling-update geannuleerd wegens onvindbaar instellingbestand.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "App.instell. Misl.",
            "details"    : "Instelling-update geannuleerd wegens onleesbaar instellingbestand.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "Instellen van toepassing mislukt",
            "details"    : "De scanner is uitgeschakeld. Het toevoegen van de scanner is geannuleerd.",
            "solution"    : "Controleer het configuratiebestand en probeer het opnieuw.",
            "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Instellen van apparatuur mislukt",
              "details"    : "Het configuratiebestand wordt door een ander programma gebruikt. Het instellen van de apparatuur is geannuleerd.",
              "solution"    : "Sluit het configuratiebestand en probeer het opnieuw.",
              "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "Instellen van apparatuur mislukt",
              "details"    : "Het configuratiebestand is door een ander programma bewerkt. Het instellen van de apparatuur is geannuleerd.",
              "solution"    : "Vernieuw de pagina en probeer het later opnieuw.",
              "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "Instellen van apparatuur mislukt",
              "details"    : "Kan het configuratiebestand niet lezen. Het instellen van de apparatuur is geannuleerd.",
              "solution"    : "Controleer het configuratiebestand en probeer het opnieuw.",
              "calladmin"    : "Neem contact op met de Toshiba-service als het probleem zich blijft voordoen."
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
            "details"    : "Protocolserver veroorzaakte onverwachte fout.",
            "solution"    : "",
            "calladmin"    : "Bel Toshiba-service."
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
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>Exposure",
            "details"    : "In de hoofdlijst is al een andere voorinstelling voor <sup>SURE</sup>Exposure met dezelfde naam beschikbaar voor de volgende protocollen: ",
            "solution"    : "Verwijder de bestaande voorinstellingen voor bovenstaande protocollen en vervang ze door de nieuwe als u de bestaande voorinstellingen voor de bovenstaande protocollen wilt vervangen.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>IQ",
            "details"    : "In de hoofdlijst is al een andere voorinstelling voor <sup>SURE</sup>IQ met dezelfde naam beschikbaar voor de volgende protocollen:",
            "solution"    : "Verwijder de bestaande voorinstellingen voor bovenstaande protocollen en vervang ze door de nieuwe als u de bestaande voorinstellingen voor de bovenstaande protocollen wilt vervangen.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Duplicaat van voorinstelling voor Contrast",
            "details"    : "In de hoofdlijst is al een andere voorinstelling voor Contrast met dezelfde naam beschikbaar voor de volgende protocollen: ",
            "solution"    : "Verwijder de bestaande voorinstellingen voor bovenstaande protocollen en vervang ze door de nieuwe als u de bestaande voorinstellingen voor de bovenstaande protocollen wilt vervangen.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ voor Scano ontbreekt",
            "details"    : "De huidige hoofdlijst bevat geen <sup>SURE</sup>IQ voor Scano. Voeg een <sup>SURE</sup>IQ voor Scano toe om door te gaan.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Onjuiste voorinstelling voor <sup>SURE</sup>IQ",
            "details"    : "<sup>SURE</sup>IQ bevat een ongeldig patiënttype.Het geldige patiënttype dat door <<sup>SURE</sup>IQ Name> wordt ondersteund, is Volwassene.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0010 : {
        	"status"    : "error",
            "overview"    : "Master List Creation Failed",
            "details"    : "Child is not supported as patient type.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0011 : {
            "status"    : "error",
            "overview"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>IQ is vol",
            "details"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>IQ kan in de hoofdlijst maximaal {1} orgaantypen bevatten. Deze limiet is overschreden voor de volgende organen:",
            "solution"    : "Verwijder eerst een andere voorinstelling als u meer voorinstellingen voor <sup>SURE</sup>IQ voor het orgaantype wilt toevoegen.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>IQ is vol",
            "details"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>IQ kan in de hoofdlijst maximaal {1} kaarten per specifiek orgaantype bevatten. Deze limiet is overschreden voor de volgende organen:",
            "solution"    : "Verwijder eerst een andere voorinstelling als u meer voorinstellingen voor <sup>SURE</sup>IQ voor dit orgaan wilt toevoegen.",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>Exposure is vol",
            "details"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>Exposure kan in de hoofdlijst maximaal {1} kaarten bevatten.<sup>SURE</sup>Exposure heeft deze wachtrijlimiet overschreden en kan niet worden ondersteund.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Onjuiste voorinstelling voor <sup>SURE</sup>Exposure",
            "details"    : "<sup>SURE</sup>Exposure bevat een ongeldig patiënttype.De geldige patiënttypen die door <sup>SURE</sup>Exposure worden ondersteund, zijn Volwassene en Kind.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Onjuiste voorinstelling voor <sup>SURE</sup>Exposure",
            "details"    : "<sup>SURE</sup>Exposure bevat een ongeldig orgaantype.De geldige orgaantypen die door <sup>SURE</sup>Exposure worden ondersteund, zijn Hoofd, Nek, ECG en Alle.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : " De voorinstellingenwachtrij voor <sup>SURE</sup>Exposure is vol",
            "details"    : "De voorinstellingenwachtrij voor <sup>SURE</sup>Exposure kan in de hoofdlijst maximaal {1} kaarten per specifiek orgaantype bevatten. Deze limiet is overschreden voor de volgende organen:",
            "solution"    : "Verwijder eerst een andere voorinstelling als u meer voorinstellingen voor <sup>SURE</sup>Exposure voor dit orgaan wilt toevoegen.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Onjuiste voorinstelling voor Contrast",
            "details"    : "Voorinstelling voor Contrast bevat een ongeldig patiënttype.De geldige patiënttypen die voor de voorinstelling voor Contrast worden ondersteund, zijn Volwassene en Kind.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "<sup>SURE</sup>Exposure ontbreekt",
            "details"    : "Er moet voor elk orgaantype en patiënttype ten minste één voorinstelling voor <sup>SURE</sup>Exposure zijn.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "Instellen van positie mislukt",
            "details"     : "Er is een onverwachte fout opgetreden.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0020 : {
            "status"    : "error",
            "Overview"    : "",
            "details"    : "Deze identificerende apparatuurnaam is al geregistreerd.",
            "solution"    : "Wijzig de naam.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "Overview"  : "",
            "details"   : "Deze identificerende apparatuurnaam is te lang.",
            "solution"  : "De naam mag maximaal 39 tekens bevatten.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Heeft de toegevoegde CT-scanner geschiedenissen?",
            "solution"  : "",
            "calladmin" : ""
        },
        ERR0023 : {
            "status"    : "error",
            "overview"    : "Master List Creation Failed",
            "details"    : "<sup>SURE</sup>Exposure is not contained all patient type (Adult, Child).",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0024 : {
            "status"    : "error",
            "overview"    : "Master List Creation Failed",
            "details"    : "<sup>SURE</sup>Exposure is not contained all organ types (Head, Neck, All, ECG).",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0025 : {
            "status"    : "error",
            "overview"    : "Master List Creation Failed",
            "details"    : "<sup>SURE</sup>IQ is contained over totally {1} cards in Master List.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0026 : {
            "status"    : "error",
            "overview"    : "Master List Creation Failed",
            "details"    : "<sup>SURE</sup>Exposure is contained patient types except Adult or Child.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0027 : {
            "status"    : "info",
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>IQ",
            "details"    : "In het geschiedenisoverzicht is al een andere voorinstelling voor <sup>SURE</sup>IQ met dezelfde naam beschikbaar. Deze voorinstelling kan niet worden toegevoegd.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>Exposure",
            "details"    : "In het geschiedenisoverzicht is al een andere voorinstelling voor <sup>SURE</sup>Exposure met dezelfde naam beschikbaar. Deze voorinstelling kan niet worden toegevoegd.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Duplicaat van voorinstelling voor Contrast",
            "details"    : "In het geschiedenisoverzicht is al een andere voorinstelling voor Contrast met dezelfde naam beschikbaar. Deze voorinstelling kan niet worden toegevoegd.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>Exposure",
            "details"    : "Een andere <sup>SURE</sup>Exposure met dezelfde naam is al automatisch aan de hoofdlijst toegevoegd als het bijgevoegde protocol. Deze kan niet worden overschreven.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Duplicaat van voorinstelling voor <sup>SURE</sup>IQ",
            "details"    : "Een andere <sup>SURE</sup>IQ met dezelfde naam is al automatisch aan de hoofdlijst toegevoegd als het bijgevoegde protocol. Deze kan niet worden overschreven.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Duplicaat van voorinstelling voor Contrast",
            "details"    : "Een andere voorinstelling voor Contrast met dezelfde naam is al automatisch aan de hoofdlijst toegevoegd als het bijgevoegde protocol. Deze kan niet worden overschreven.",
            "solution"    : "",
            "calladmin"    : "Neem voor ondersteuning contact op met de Toshiba-service."
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
            "overview"    : "Duplicaat van vooraf ingestelde stem",
            "details"    : "In de hoofdlijst is al een andere vooraf ingestelde stem met dezelfde naam beschikbaar voor de volgende protocollen",
            "solution"    : "Verwijder de bestaande voorinstellingen voor bovenstaande protocollen en vervang ze door de nieuwe als u de bestaande voorinstellingen voor de bovenstaande protocollen wilt vervangen.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "Lijst met vooraf ingestelde stemmen is vol",
            "details"    : "De lijst met vooraf ingestelde stemmen kan in de hoofdlijst maximaal 20 talen bevatten. Deze limiet is overschreden voor de volgende talen:",
            "solution"    : "Verwijder eerst een andere voorinstelling als u meer vooraf ingestelde stemmen voor deze taal wilt toevoegen.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "Lijst met vooraf ingestelde stemmen is vol",
            "details"    : "De lijst met vooraf ingestelde stemmen kan in de hoofdlijst maximaal 10 kaarten in een specifieke taal bevatten. Deze limiet is overschreden voor de volgende taal:",
            "solution"    : "Verwijder eerst een andere voorinstelling als u meer vooraf ingestelde stemmen voor deze taal wilt toevoegen.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Vooraf ingestelde stem ontbreekt",
            "details"    : "De lijst met vooraf ingestelde stemmen moet de volgende zes talen bevatten:<BR><BR>Japans<BR>Engels<BR>Chinees<BR>Koreaans<BR>Spaans<BR>Portugees",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Vooraf ingestelde stem ontbreekt",
            "details"    : "Iedere taal in de lijst met vooraf ingestelde stemmen moet de volgende vijf stemcommando's bevatten.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Duplicaat van vooraf ingestelde stem",
            "details"    : "In het geschiedenisoverzicht staat al een andere vooraf ingestelde stem met dezelfde naam. Deze voorinstelling kan niet worden toegevoegd.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "In de lijst met <sup>SURE</sup>IQ-voorinstellingen staan te weinig kaarten ",
            "details"    : "De lijst met <sup>SURE</sup>IQ-voorinstellingen moet minstens {1} kaarten bevatten voor een specifiek orgaantype in de hoofdlijst. Dit is niet het geval voor de volgende organen:",
            "solution"    : "Voeg <sup>SURE</sup>IQ-voorinstellingen toe voor dit orgaan.",
            "calladmin"    : ""
        },
        ERR0041 : {
            "status"    : "",
            "overview"    : "Duplicated VoicePreset…",
            "details"    : "Another VoicePreset with the same Voice Index already exists in the history list.<br>{0}",
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