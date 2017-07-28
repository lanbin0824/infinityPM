var stringSetting =
{
    protocolmanagement: "Protokollverwaltung",

    tab: {
        requestlist : "Anforderungsliste",
        history : "Verlaufsliste",
        transfer : "Übertragungsliste",
        app_setting :"Anwendungseinstellungen",
        master: "Masterliste",
        position: "Protocol Positions"
    },

    menu : {
        identifing : 'Geräteeinstellung',
        filter : {
            CheckAll : "ALLE",
            SortAscending : "Aufsteigend sortieren",
            SortDescending : "Absteigend sortieren",
            Filter : "Filtern"
        }
    },

    master:
    {
        button:
        {
            Next        : "Weiter",
            Back        : "Zurück",
            Cancel      : "Abbrechen",
            Approve     : "zulassen",
            Finish      : "Beenden",
            UserProtocol    : "Benutzerprotokoll",
            ServiceProtocol : "Serviceprotokoll",
            Move        : "Verschieben",
            OKbtn       : "OK",
            Setasdefault    : "Als Standardeinstellung setzen",
            Reset    : "Reset"
        },
        tab:
        {
            Adult       :"Erwachsener",
            Child       :"Kind",
            Trauma      :"Trauma",
            GroupA      :"Gruppe A",
            GroupB      :"Gruppe B",
            GroupC      :"Gruppe C",
        },
        title:
        {
            Start                   : "Erstellung einer Protokollmasterliste starten",
            CreationEP              : "Masterliste für Untersuchungsplan",
            CreationSureIQ          : "Masterliste für <sup>SURE</sup>IQ-Voreinstellung",
            CreationSureExp         : "Masterliste für <sup>SURE</sup>Exposure-Voreinstellung",
            CreationCP              : "Masterliste für Kontrast-Voreinstellung",
            CreationVoice           : "Masterliste für Voice-Voreinstellungen",
            Setting                 : "Positionseinstellung für Untersuchungsplan",
            SelectOther             : "Masterliste für Weitere Einstellungen",
            Approving               : "Masterliste vor Zulassung bestätigen",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Erstellung einer Protokollmasterliste beenden",
            title_confirm           : "bestätigen",
            title_approve           : "zulassen",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "Masterliste",
            OriginalList            : "Originalliste",
            Parameters              : "Parameters",
            Parameter_Name			: "Parameter Name",
        },
        statusLab:
        {
            Start                   : "Start",
            Creation                : "Masterlistenerstellung",
            Setting                 : "Position<br> seinstellung",
            SelectOther             : "Auswahl Weitere<br> Einstellungen",
            Approving               : "Bestätigung",
            Finish                  : "Beenden"
        },
        column:{
            type                    :"Protokoll",
            patienttype             :"Patiententyp",
            name                    :"Name",
            date                    :"Datum",
            scanner                 :"Scanner Name",
        },
        columns:
        {
            patientType                : "Patiententyp",
            bodyRegion                 : "Körperregion",
            masterList                 : "Masterliste",
            machineName                : "Scanner Name",
            language                   : "Sprache",
        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "alle Protokolle zur Masterliste hinzufügen",
            addSelected               : "zur Masterliste hinzufügen",
            checkParameters           : "bitte Parameter prüfen",
            removeFromList            : "aus Masterliste entfernen",
        },
        message:
        {
            start_text1            : "Von dieser Seite aus können Sie eine Protokollmasterliste erstellen.",
            start_text2            : "Zum Starten auf [Weiter] klicken.",
            finish_text1           : "Protokollmasterliste wurde erstellt.",
            finish_text2           : "Auf [Beenden] klicken und zugelassene Protokolle in der Verlaufsliste prüfen.",
            confirm_to_approve     : "auf [zulassen] klicken, um Zulassung zu starten",
            confirmview_text1      : "die Masterliste wird zugelassen und an CT-Scanner verteilt.",
            confirmview_text2      : "wollen Sie fortfahren?",

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
        title_request : "Anforderungen",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Voice-Voreinstellung"
        },
        column: {
            type : "Protokoll",
            patienttype : "Patiententyp",
            name : "Name",
            version : "Version",
            date : "Datum",
            scanner : "Scanner",
            user : "Benutzer"
        },
        button: {
            approve : "Genehmigen",
            keeplocally : "Lokal bleiben",
            reject : "Ablehnen",
            deleted : "Löschen",
            refresh : "Aktualisieren",
            close: "Schließen",
            backtothelist : "Zurück zur Liste"
        },
        event: {
            approve : "approved",
            keeplocally : "keep",
            reject : "rejected",
            deleted : "deleted"
        },
        msg_requesttime :
            "Anforderungsliste wurde aktualisiert, [Aktualisieren]- Taste anwählen."
    },
    UserSpecificName:
    {
        title    : "Geräteeinstellung",
        LabelNodata    : "No Data",
        emptyText       : 'Bitte Namen eingeben',
        button  :
        {
            close : "Schließen",
            save : "Speichern"
        }
    },
    compare : {
        title_detail : "Einzelheit",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Nur Differenz anzeigen",
            showall : "Alle anzeigen",
            references: "References",
            save : 'Speichern',
            close : 'Schließen'
        },
        label : {
            console_comments : "Kommentar (Protokollersteller)",
            approver_comments : "Kommentar (Protokollgenehmiger)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "bestätigen",
        text : {
            approve : "Dieses Protokoll wird für die Verteilung an alle Scanner genehmigt. ",
            deleteProtocl : "Dieses Protokoll wird gelöscht und von allen Scannern entfernt.",
            rejectApproval : "Dieses Protokoll wird abgelehnt und vom Quellscanner entfernt.",
            rejectDeletion : "Die Löschung dieses Protokolls wird abgelehnt und es wird auf dem Quellscanner wiederhergestellt.",
            keep : "Dieses Protokoll wird für die lokale Verwendung auf dem Quellscanner genehmigt.",
            asker : "wollen Sie fortfahren?",
            transfer : "Dieses Protokoll wird auf andere Gruppen übertragen.",
            systemComment: "[Systemgenerierter Kommentar] ",
            reason: "Übertragungsanfrage für das Protokoll gesendet an ",
            autoApproval: "Automatische Genehmigung durch Genehmigung von {1}.",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Automatische Genehmigung zusammen mit {1} mit gleichem Organ.",
            autoRejectReason: "Automatische Ablehnung zusammen mit {1} mit gleichem Organ."
        },
        label : {
            comments : "Kommentare",
            reminder : "Bitte Kommentare eingeben",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Dieses Protokoll wird auf andere Gruppen übertragen.<br>Bitte Gruppen auswählen, auf die das Protokoll übertragen werden soll:",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Gruppe',
            model: 'Modell',
            softwarVersion: 'Softwareversion'
        },
        button : {
            ok : "OK",
            cancel : "Abbrechen",
            transferOption : "Protokoll auf andere Gruppen übertragen (Option)"
        }
    },

    backupDialog: {
        menuItem: "Protokolldaten sichern",
        backupTitle: "Protokolldaten sichern",
        backupLocation: "Speicherort der Sicherungskopie",
        backupBtn: "Sicherungskopie",
        clearLogBtn: "Protokoll löschen",
        backupLogs: "Sicherungsprotokoll",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Schließen"
    },
    status_tip: {
        ApprovalRequested:"Zustimmung angefordert:",
        ApprovalAccepted:"Genehmigt:",
        LocalUseAccepted:"Für lokale Verwendung genehmigt:",
        DeletionRequested:"Löschung angefordert:",
        DeletionAccepted:"Gelöscht:",
        ApprovalRejected:"Genehmigung abgelehnt:",
        DeletionRejected:"Löschung abgelehnt:",
        Transferred :"Transferred:",
        Restored: "Wiederhergestellt:",
        ApprovalRequestedValue:"Das Protokoll wurde im CT erstellt/bearbeitet.",
        ApprovalAcceptedValue:"Das Protokoll wird für die Verwendung in allen diesen CT-Modellen/-versionen genehmnigt.",
        LocalUseAcceptedValue:"Das Protokoll wird für die Verwendung des geeigneten CT´s genehmigt.",
        DeletionRequestedValue:"Das Protokoll wurde im CT gelöscht.",
        DeletionAcceptedValue:"Das Protokoll wird von allen diesen CT-Modellen/-Versionen gelöscht.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"Das Protokoll wurde abgelehnt. Im CT wird der vorherige Zustand wiederhergestellt.",
        DeletionRejectedValue:"Die Löschung des Protokolls wurde nicht genehmigt. Im CT wird der vorherige Zustand wiederhergestellt.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "Das Protokoll wurde im CT wieder hergestellt. Für die Anwendung verfügbar."
    },
    history : {
        title_history : "Verläufe",
        title_transfer : "Transfers",
        title_protocolhistory : "Protokollverlauf",
        title_comfirm_header : "Bestätigen",
        text_search:"Suchen",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Gelöschte Elemente verbergen",
            showdeleteitems : "Gelöschte Elemente anzeigen",
            backtoHistoryList : "Zurück zur Liste",
            backtoTransferList : "Zurück",
            expandAll: "Alle einblenden",
            collapseAll: "Alle ausblenden",
            hide : "Ausblenden",
            show : "Einblenden",
            restore : "Wiederhellen",
            deleted : "Löschen",
            ok : "OK",
            cancel : "Abbrechen",
            transfer : "Übertragung",
            showall :"Show All",
            NextHistories : "Anzeige erweitern"
        },
        column : {
            type : "Protokoll",
            patientype : "Patiententyp",
            name : "Name",
            date : "Datum",
            source_scanner : "Quellscanner",
            user : "Benutzer",
            scanners:"scanners",
            event: 'Ereignis',
            comment: 'Kommentar'
        },
        cell_content : {
            event_create: "Erstellen",
            event_edit: "Bearbeiten",
            event_approve: "Genehmigen",
            event_delete: "Löschen",
            event_restore: "Wiederherstellen",
            event_keep_locally: "lokal bleiben",
            event_reject: "Ablehnen",
            event_transfer: "Übertragung",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "Anforderungsliste wurde aktualisiert, [Aktualisieren]- Taste anwählen.",
            comfirm_commants : "Kommentare",
            comfirm_commants_null : "Bitte Kommentare eingeben",
            restore_comfirm_text1 : "Dieses Protokoll wird wiederhergestellt und an alle Scanner verteilt.",
            restore_comfirm_text2 : "wollen Sie fortfahren?",
            delete_comfirm_text1 : "Dieses Protokoll wird sofort gelöscht und an alle Scanner verteilt.",
            delete_comfirm_text2 : "wollen Sie fortfahren?"
        },
        action_event: {
            Request:"Anforderung",
        }
    },

    comparison : {
        button : {
            cancel :"Abbrechen",
            check_params :"bitte Parameter prüfen",
            ok :"OK",
            select_scan_mode :"Scanmodus auswählen"
        },
        title : {
            selection : "Verglichenes Protokoll auswählen",
            detail : "Einzelheit",
            scan_mode : "Verglichenen Scanmodus auswählen"
        }
    },

    app_setting : {
        button : {
            add :"Hinzufügen",
            apply :"OK",
            cancel :"Abbrechen",
            deleted :"Löschen",
            disable :"Deaktivieren",
            edit :"Bearbeiten",
            enable :"Aktivieren",
            ok :"OK",
            save : "Speichern",
            execute: "Start",
            import: "Import",
            export: "Export",
            close: "Schließen"
        },
        column : {
            distribution :"Distribution",
            distribution_machine_name :"Verteilungsscanner",
            distribution_scanner :"Verteilungsscanner",
            group_name :"Name",
            key :"Schlüssel",
            machine_name :"Quellscanner",
            name :"Name",
            scanner :"Quellscanner",
            software_version :"SW-Version",
            ep_type :"EPType",
            source_machine_name :"Quellscanner",
            source_scanner :"Quellscanner",
            system_name :"Systemname",
            value :"Wert",
            description :"Beschreibung",
            association: 'Association',
            guideline:'Guideline'
        },
        label : {
            initialize_setup:"Masterprotokollersteller",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Sprache",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modalität",
            modality_desc :"Der Modalitätsname",
            model_name :"Modellname",
            model_name_desc :"Der Modellname",
            name :"Name",
            name_desc :"Protokollpool-Kennung",
            software_version :"Softwareversion",
            software_version_desc :"Aktuelle SW-Version",
            ep_type :"EPType",
            ep_type_desc :"Aktueller EPType",
            system_name :"Systemname",
            system_name_desc :"Der Systemname",
            vendor :"Lieferant",
            vendor_desc :"Der Lieferantenname",
            x_ray_mode :"Röntgenmodus",
            x_ray_mode_desc :"Röntgenmodus",
            protocol_share_across_model:"Modellübergreifende Protokollfreigabe",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Batch-Genehmigung",
            done:"Done",
            succeed:"Batch-Genehmigung wurde erfolgreich abgeschlossen.",
            cancel:"Batch-Genehmigung wurde abgebrochen.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Einige Protokolle konnten nicht genehmigt werden.",
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
            rpid_display:"RadLex RPID-Unterstützung",
            reference_display:"Referenz der Protokollleitlinien",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "Anwendungseinstellungen wurden aktualisiert, [Aktualisieren]- Taste anwählen.",
//          deleted :"Diese Quellscanner wird aus der Konfigurationsdatei entfernt.",
            protocol_pool_deleted :"Diese Protokollpool wird aus der Konfigurationsdatei entfernt.",
            sources_canner_deleted :"Diese Quellscanner wird aus der Konfigurationsdatei entfernt.",
            distribution_scanner_deleted :"Diese Verteilungsscanner wird aus der Konfigurationsdatei entfernt.",
            delete_continue :"wollen Sie fortfahren?",
            console_ok_save_warningone:"Einige Änderungen werden nicht gespeichert.",
            console_ok_save_warningtwo:"Möchten Sie die Änderungen speichern?",
            console_delete_machine_waring:"Der Quellscanner wird gelöscht.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",

            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",

            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Quellscanner",
            distribution_setting :"Verteilungsscanner",
            other_setting :"Sonstige/andere",
            pool_setting :"Protokollpool",
            language_setting :"Language Setting",
            setting :"Einstellung",
            display_setting:"Modellübergreifende Protokollfreigabe",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Genehmigen...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"RadLex RPID-Unterstützung",
            reference_setting:"Referenz der Protokollleitlinien"
        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Benutzerprotokoll",
            ServiceProtocol : "Serviceprotokoll",
            make_change:'Make Changes',
            active_change:'Activate changes',
            undo_change:'Undo Changes',
            leave:'Leave',
            stay:'Stay'
        },
        tab:
        {
            Adult       :"Erwachsener",
            Child       :"Kind",
            Trauma      :"Trauma",
            GroupA      :"Gruppe A",
            GroupB      :"Gruppe B",
            GroupC      :"Gruppe C",
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
                overview    : "Zulassung",
                details        : "Zulassung",
                details2    : "genehmigt"
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
                overview    : "Löschung",
                details        : "löschung",
                details2    : "gelöscht"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "wiederhergestellt"
            },
            approvetransfer: {
                overview    : "Approval or Transferring",
                details        : "approval or transfer",
                details2    : "approved or transfered"
            },
            transfer: {
                overview    : "Transferring",
                details        : "Übertragung",
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
            "overview"    : "Lizenzaufnahmefehler",
            "details"    : "Lizenzaufnahme fehlgeschlagen, Anwendungsstart daher abgebrochen.",
            "solution"    : "bitte Lizenz prüfen.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
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
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Das Protokoll wurde von einem anderen Benutzer betrieben, daher wurde das Protokoll ~ abgebrochen.",
            "solution"    : "Verlaufsliste überprüfen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Das Protokoll wurde während ~ aktualisiert, daher wurde das Protokoll ~ abgebrochen.",
            "solution"    : "Später erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Die Protokolldateien waren unlesbar, daher wurde das Protokoll ~ abgebrochen.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Verbindung zum Dateiserver fehlgeschlagen, daher wurde das Protokoll {0} abgebrochen.",
            "solution"    : "Später erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Unerwarteter Fehler am Protokollserver.",
            "solution"    : "bitte versuchen Sie es später erneut.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Wiederherstellung des Protokolls fehlgeschlagen",
            "details"    : "Ein anderes, an dieser Stelle vorhandenes Protokoll hat bereits existiert.",
            "solution"    : "",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Manche Dateien wurden verwendet, daher wurde das Protokoll ~ abgebrochen.",
            "solution"    : "Verwendete Dateien schließen und erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Die Systemnamen von CT-Scanner und Protokoll-Server stimmten nicht überein. Protokollaufnahme abgebrochen.",
            "solution"    : "bitte den Systemnamen im Protokollserver ändern.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Die Modellnamen von CT-Scanner und Protokoll-Server stimmten nicht überein. Protokollaufnahme abgebrochen.",
            "solution"    : "bitte den Modellnamen im Protokollserver ändern.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Die Eigenschaften von CT-Scanner und Protokoll-Server stimmten nicht überein. Protokollaufnahme abgebrochen.",
            "solution"    : "bitte die X-Ray Einstellungen im Protokollserver ändern.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Die Softwareversionen von CT-Scanner und Protokoll-Server stimmten nicht überein. Protokollaufnahme abgebrochen.",
            "solution"    : "bitte die Softwareversion im Protokollserver ändern.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Prot.aufnahmefehler",
            "details"    : "Zusammenfassung konnte nicht gelesen werden. Protokollaufnahme abgebrochen.",
            "solution"    : "",
            "calladmin"    : "Toshiba-Kundendienst kontaktieren."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Prot.aufnahmefehler",
            "details"    : "Änderungsprotokoll konnte nicht gelesen werden. Protokollaufnahme abgebrochen.",
            "solution"    : "",
            "calladmin"    : "Toshiba-Kundendienst kontaktieren."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Prot.aufnahmefehler",
            "details"    : "Verlaufsdatei konnte nicht gelesen werden. Protokollaufnahme abgebrochen.",
            "solution"    : "",
            "calladmin"    : "Toshiba-Kundendienst kontaktieren."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Zusammenfassungsdatei nicht gefunden. Protokollaufnahme abgebrochen.",
            "solution"    : "",
            "calladmin"    : "Toshiba-Kundendienst kontaktieren."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Protokollaufnahmefehler",
            "details"    : "Protokoll bereits von einem anderen Benutzer genehmigt.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Abruf des Protokolls fehlgeschlagen",
            "details"    : "Empfang des Protokollverlaufs fehlgeschlagen.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte die Scannerkennung in die Leerstelle einfügen.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den Lieferantennamen in die Leerstelle einfügen.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den Modalitätsnamen in die  Leerstelle einfügen.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den Systemnamen in die Leerstelle einfügen.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den Modellnamen in die Leerstelle einfügen.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den X Ray Mode in die Leerstelle einfügen.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte die Softwareversion in die Leerstelle einfügen.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte die Scannerkennung auswählen.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte Quellscanner in die Leerstelle einfügen.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Scanner wurde bereits registriert.",
            "solution"    : "bitte den Scanner umbenennen.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Kein Leerzeichen erlaubt.",
            "solution"    : "bitte den Quellscanner auswählen.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Es dürfen nicht alle Scanner deaktiviert werden.",
            "solution"    : "bitte mindestens einen Scanner aktivieren.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "Dieser Scanner-Name enthält unzulässige Zeichen; nur [0-9], [a-Z] und [ -_ ] sind zulässig.",
            "solution"    : "Scanner umbenennen.",
        },

        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "Einstellungsfehler",
              "details"    : "Scanner wurde bereits registriert.",
              "solution"    : "Bitte Scanner umbenennen.",
              "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst"
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "Einstellungsfehler",
            "details"    : "Einige Dateien werden verwendet. Aktualisierung abgebrochen.",
            "solution"    : "Bitte Dateien schließen und erneut versuchen.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Scannerkennung bereits registriert.",
            "solution"    : "Bitte Scannerkennung umbenennen.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "Einstellungsfehler",
            "details"    : "Protokollpool bereits registriert. Einstellungsaktualisierung abgebrochen.",
            "solution"    : "Bitte anderen Protokollpool prüfen.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "App-Einstellung fehlgeschlagen",
            "details"    : "Dieses Programm wird gerade verwendet, daher wurde die Übernahme der Einstellung abgebrochen.",
            "solution"    : "Bitte kurz warten und erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "App-Einstellung fehlgeschlagen",
            "details"    : "Bearbeitung der Konfigurationsdatei fehlgeschlagen, daher wurde das Verschieben der Protokollverläufe abgebrochen.",
            "solution"    : "Konfigurationsdateistatus überprüfen und anschließend erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "App-Einstellung fehlgeschlagen",
            "details"    : "Das Programm wurde wegen Zeitüberschreitung beendet.",
            "solution"    : "Später erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "App-Einstellung fehlgeschlagen",
            "details"    : "Ein unbekannter Fehler ist aufgetreten.",
            "solution"    : "Später erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
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
            "overview"    : "Einstellungsfehler",
            "details"    : "Die Einstellungsdatei war in Verwendung. Aktualisierung abgebrochen.",
            "solution"    : "Bitte verwendete Datei schließen und erneut versuchen.",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "Besteht das Problem weiterhin, Toshiba-Kundendiest kontaktieren.",
            "details"    : "Die Einstellungendatei wurde verwendet, daher wurde die Einstellungsaktualisierung abgebrochen.",
            "solution"    : "Schließen Sie die verwendete Datei und versuchen Sie es erneut.",
            "calladmin"    : "Besteht das Problem weiterhin, Toshiba-Kundendienst kontaktieren."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "Einstellungsfehler",
            "details"    : "Die Einstellungsdatei wurde nicht gefunden. Aktualisierung abgebrochen.",
            "solution"    : "",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "Einstellungsfehler",
            "details"    : "Einstellungsdatei konnte nicht gelesen werden.  Aktualisierung abgebrochen.",
            "solution"    : "",
            "calladmin"    : "falls das Problem weiterhin besteht, kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "App-Einstellung fehlgeschlagen",
            "details"    : "Scanner existiert bereits, daher wurde das Hinzufügen des Scanners abgebrochen.",
            "solution"    : "Konfigurationsdatei überprüfen und anschließend erneut versuchen.",
            "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Geräteeinstellung fehlgeschlagen",
              "details"    : "Die Konfigurationsdatei wird von einem anderen Programm verwendet, daher wurde die Geräteeinstellung abgebrochen.",
              "solution"    : "Konfigurationsdatei schließen und anschließend erneut versuchen.",
              "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "Geräteeinstellung fehlgeschlagen",
              "details"    : "Die Konfigurationsdatei wurde von einem anderen Programm bearbeitet, daher wurde die Geräteeinstellung abgebrochen.",
              "solution"    : "Seite aktualisieren und später erneut versuchen.",
              "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "Geräteeinstellung fehlgeschlagen",
              "details"    : "Die Konfigurationsdatei ist unlesbar, daher wurde die Geräteeinstellung abgebrochen.",
              "solution"    : "Konfigurationsdatei überprüfen und anschließend erneut versuchen.",
              "calladmin"    : "Falls das Problem bestehen bleibt, bitte den Toshiba-Kundendienst kontaktieren."
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
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "Protokoll {0} fehlgeschlagen",
            "details"    : "Unerwarteter Fehler am Protokollserver.",
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
            "overview"    : "Doppelte <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "Eine andere <sup>SURE</sup>Exposure-Voreinstellung mit dem gleichen Namen ist für folgende Protokolle bereits in der Masterliste vorhanden: ",
            "solution"    : "Falls Sie die bestehende Voreinstellung in der Masterliste durch die vorgenannten Protokolle ersetzen möchten, entfernen Sie bitte die bestehende aus der Masterliste und ersetzen Sie sie anschließend durch die vorgenannten Protokolle.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Doppelte <sup>SURE</sup>IQ-Voreinstellung",
            "details"    : "Eine andere <sup>SURE</sup>IQ-Voreinstellung mit dem gleichen Namen für folgende Protokolle ist bereits in der Masterliste vorhanden:",
            "solution"    : "Falls Sie die bestehende Voreinstellung in der Masterliste durch die vorgenannten Protokolle ersetzen möchten, entfernen Sie bitte die bestehende aus der Masterliste und ersetzen Sie sie anschließend durch die vorgenannten Protokolle.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Doppelte Kontrast-Voreinstellung",
            "details"    : "Eine andere Kontrast-Voreinstellung mit dem gleichen Namen ist für folgende Protokolle bereits in der Masterliste vorhanden: ",
            "solution"    : "Falls Sie die bestehende Voreinstellung in der Masterliste durch die vorgenannten Protokolle ersetzen möchten, entfernen Sie bitte die bestehende aus der Masterliste und ersetzen Sie sie anschließend durch die vorgenannten Protokolle.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "Scano <sup>SURE</sup>IQ fehlt",
            "details"    : "In der aktuellen Masterliste ist <sup>SURE</sup>IQ für Scano nicht enthalten. Zum Fortfahren bitte SUREIQ für Scano hinzufügen.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Falsche <sup>SURE</sup>IQ-Voreinstellung",
            "details"    : "<sup>SURE</sup>IQ enthält einen ungültigen Patiententyp.Der gültige, für <<sup>SURE</sup>IQ Name> unterstützte Patiententyp ist Erwachsener.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
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
            "overview"    : "Die Warteschlange für die <sup>SURE</sup>IQ-Voreinstellungen ist voll.",
            "details"    : "Die Warteschlange für die <sup>SURE</sup>IQ-Voreinstellungen kann bis zu {1} Organtypen in der Masterliste umfassen. Für folgende Organe wurde die Höchstgrenze überschritten:",
            "solution"    : "Falls Sie mehr <sup>SURE</sup>IQ-Voreinstellungen für den Organtyp hinzufügen möchten, entfernen Sie bitte zuerst alle anderen Einträge.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "Die Warteschlange für die <sup>SURE</sup>IQ-Voreinstellungen ist voll.",
            "details"    : "Die Warteschlange für die <sup>SURE</sup>IQ-Voreinstellungen kann bis zu {1} Karten zu einem spezifischen Organtyp in der Masterliste umfassen. Für folgende Organe wurde die Höchstgrenze überschritten:",
            "solution"    : "Falls Sie mehr <sup>SURE</sup>IQ-Voreinstellungen für dieses Organ hinzufügen möchten, entfernen Sie bitte zuerst alle anderen Einträge.",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "Die Warteschlange für die <sup>SURE</sup>Exposure-Voreinstellungen ist voll.",
            "details"    : "Die Warteschlange für die <sup>SURE</sup>Exposure-Voreinstellungen kann bis zu {1} Karten in der Masterliste umfassen.<sup>SURE</sup>Exposure hat die Höchstgrenze für die Warteschlange überschritten und kann nicht unterstützt werden.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Falsche <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "<sup>SURE</sup>Exposure enthält einen ungültigen Patiententyp.Die gültigen, für <sup>SURE</sup>Exposure unterstützten Patiententypen sind Erwachsener oder Kind.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Falsche <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "<sup>SURE</sup>Exposure enthält einen ungültigen Organtyp.Die gültigen, für <sup>SURE</sup>Exposure unterstützten Organtypen sind Kopf, Hals, EKG oder Alle.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "Die Warteschlange für die <sup>SURE</sup>Exposure-Voreinstellungen ist voll.",
            "details"    : "Die Warteschlange für die <sup>SURE</sup>Exposure-Voreinstellungen kann bis zu {1} Karten zu einem spezifischen Organtyp in der Masterliste umfassen. Für folgende Organe wurde die Höchstgrenze überschritten:",
            "solution"    : "Falls Sie mehr <sup>SURE</sup>Exposure-Voreinstellungen für dieses Organ hinzufügen möchten, entfernen Sie bitte zuerst alle anderen Einträge.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Falsche Kontrast-Voreinstellung",
            "details"    : "Kontrast-Voreinstellung enthält einen ungültigen Patiententyp. Die gültigen, für die Kontrast-Voreinstellung unterstützten Patiententypen sind Erwachsener und Kind.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "Fehlende <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "Mindestens eine <sup>SURE</sup>Exposure-Voreinstellung sollte für jeden Organ- und Patiententyp vorhanden sein.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "Positionseinstellung fehlgeschlagen",
            "details"     : "Ein unerwarteter Fehler ist aufgetreten.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "Dieser das Gerät identifizierende Name ist bereits registriert.",
            "solution"    : "Bitte Namen ändern.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Dieser das Gerät identifizierende Name ist zu lang.",
            "solution"  : "Bitte wählen Sie einen Namen, der kürzer als 40 Zeichen ist.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Enthält der hinzugefügte CT-Scanner Verläufe?",
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
            "overview"    : "Doppelte <sup>SURE</sup>IQ-Voreinstellung",
            "details"    : "Eine andere <sup>SURE</sup>IQ-Voreinstellung mit dem gleichen Namen ist bereits in der Verlaufsliste vorhanden, daher kann diese Voreinstellung nicht hinzugefügt werden.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Doppelte  <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "Eine andere  <sup>SURE</sup>Exposure-Voreinstellung mit dem gleichen Namen ist bereits in der Verlaufsliste vorhanden, daher kann diese Voreinstellung nicht hinzugefügt werden.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Doppelte Kontrast-Voreinstellung",
            "details"    : "Eine andere Kontrast-Voreinstellung mit dem gleichen Namen ist bereits in der Verlaufsliste vorhanden, daher kann diese Voreinstellung nicht hinzugefügt werden.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Doppelte <sup>SURE</sup>Exposure-Voreinstellung",
            "details"    : "Eine andere <sup>SURE</sup>Exposure-Voreinstellung mit dem gleichen Namen wurde bereits automatisch als angehängtes Protokoll in der Masterliste hinzugefügt. Sie kann nicht überschrieben werden.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Doppelte <sup>SURE</sup>IQ-Voreinstellung",
            "details"    : "Eine andere <sup>SURE</sup>IQ-Voreinstellung mit dem gleichen Namen wurde bereits automatisch als angehängtes Protokoll in der Masterliste hinzugefügt. Sie kann nicht überschrieben werden",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Doppelte Kontrast-Voreinstellung",
            "details"    : "Eine andere Kontrast-Voreinstellung mit dem gleichen Namen wurde bereits automatisch als angehängtes Protokoll in der Masterliste hinzugefügt. Sie kann nicht überschrieben werden.",
            "solution"    : "",
            "calladmin"    : "Zur Unterstützung kontaktieren Sie bitte den Toshiba-Kundendienst."
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
            "overview"    : "Doppelte Voice-Voreinstellung",
            "details"    : "Für die folgenden Protokolle ist bereits eine Voice-Voreinstellung mit dem gleichen Namen in der Masterliste vorhanden ",
            "solution"    : "Falls der bereits vorhandene Baustein in der Masterliste durch die vorgenannten Protokolle ersetzt werden soll, bitte den vorhandenen Baustein aus der Masterliste entfernen und anschließend durch die vorgenannten Protokolle ersetzen.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "Warteschlange für Voice-Voreinstellungen ist voll.",
            "details"    : "In der Warteschlange für Voice-Voreinstellungen ist lediglich Platz für 20 Masterlisten-Sprachen. Für folgende Sprachen wurde diese Höchstgrenze überschritten:",
            "solution"    : "Falls eine weitere Voice-Voreinstellung für diese Sprache/n hinzugefügt werden soll, bitte zuerst eine beliebige andere Voreinstellung entfernen.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "Warteschlange für Voice-Voreinstellungen ist voll.",
            "details"    : "In der Warteschlange ist lediglich Platz für 10 Karten pro Sprache in der Masterliste. Für folgende Sprache wurde diese Höchstgrenze überschritten:",
            "solution"    : "Falls eine weitere Voice-Voreinstellung für diese Sprache hinzugefügt werden soll, bitte zuerst einen beliebige andere Voreinstellung entfernen.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Voice-Voreinstellung fehlt.",
            "details"    : "Die Warteschlange für Voice-Voreinstellungen muss die folgenden 6 Sprachen enthalten:<BR><BR>Japanisch<BR>Englisch<BR>Chinesisch<BR>Koreanisch<BR>Spanisch<BR>Portugiesisch",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Doppelte Voice-Voreinstellung",
            "details"    : "Da bereits eine Voice-Voreinstellung mit dem gleichen Namen in der Verlaufsliste vorhanden ist, kann diese Voice-Voreinstellung nicht hinzugefügt werden.",
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
            "overview"    : "Die Mindestanzahl für Karten in der <sup>SURE</sup>IQ-Warteschlange für Sprachbausteine wurde nicht erreicht.",
            "details"    : "Die <sup>SURE</sup>IQ-Warteschlange für Sprachbausteine muss mindestens {1} Karten für einen bestimmten Organtyp in der Masterliste enthalten. Dieser Mindestwert wird für die folgenden Organe nicht erreicht:",
            "solution"    : "Bitte einen <sup>SURE</sup>IQ-Baustein für dieses Organ hinzufügen.",
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