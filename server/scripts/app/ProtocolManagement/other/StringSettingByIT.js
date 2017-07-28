var stringSetting =
{
    protocolmanagement: "Gestione protocollo",

    tab: {
        requestlist : "Elenco richieste",
        history : "Elenco cronologia",
        transfer : "Elenco trasferimenti",
        app_setting :"Impostazioni App",
        master: "Lista principale",
        position: "Protocol Positions"
    },

    menu : {
        identifing:"Impostazione dell'apparecchiatura",
        filter : {
            CheckAll : "TUTTI",
            SortAscending : "Ordine crescente",
            SortDescending : "Ordine decrescente",
            Filter : "Filtra"
        }
    },

    master:
    {
        button:
        {
            Next        : "Next",
            Back        : "Indietro",
            Cancel      : "Annulla",
            Approve     : "Approva",
            Finish      : "Fine",
            UserProtocol    : "Protocollo Utente",
            ServiceProtocol : "Protocollo Assistenza",
            Move        : "Sposta",
            OKbtn       : "OK",
            Setasdefault    : "Imposta come predefinito",
            Reset    : "Reset"
        },
        tab:
        {
        	Adult       :"Adulto",
        	Child       :"Bimbo",
        	Trauma      :"Trauma",
            GroupA      :"Gruppo A",
            GroupB      :"Gruppo B",
            GroupC      :"Gruppo C",
        },
        title:
        {
            Start                   : "Inizia creazione dell'elenco principale dei protocolli",
            CreationEP              : "Elenco principale per Pianificazione dell'esame",
            CreationSureIQ          : "Elenco principale per <sup>SURE</sup>IQ",
            CreationSureExp         : "Elenco principale per <sup>SURE</sup>Exposure",
            CreationCP              : "Elenco principale dell'impostazione predefinita di Contrasto",
            CreationVoice           : "Elenco principale per Voice preimpostato",
            Setting                 : "Impostazione della posizione per Pianificazione dell'esame",
            SelectOther             : "Elenco principale per altre impostazioni",
            Approving               : "Conferma lista principale prima di approvare",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Termina creazione dell'elenco principale dei protocolli",
            title_confirm           : "Conferma",
            title_approve           : "Approva",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "Lista principale",
            OriginalList            : "Lista originale",
            Parameters              : "parametri",
            Parameter_Name			: "Parameter Name",
        },
        statusLab:
        {
            Start                   : "Avvio",
            Creation                : "Creazione <br> lista principale",
            Setting                 : "Impostazione<br>  posizione",
            SelectOther             : "Altre selezioni di<br> impostazione",
            Approving               : "Approvazione<br> in corso",
            Finish                  : "Fine"
        },
        column:{
            type                    :"Protocol",
            patienttype             :"Tipo Paziente",
            name                    :"Nome",
            date                    :"Data",
            scanner                 :"Nome scanner",
        },
        columns:
        {
            patientType                : "Tipo Paziente",
            bodyRegion                 : "Regione Anatomica",
            masterList                 : "Lista principale",
            machineName                : "Nome scanner",
            language                   : "Lingua",

        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Aggiungi Tutti i Protocolli a Lista Principale",
            addSelected               : "Aggiungi a Lista Principale",
            checkParameters           : "Verifica parametri",
            removeFromList            : "Rimuovi da lista principale",
        },
        message:
        {
            start_text1            : "Da questa pagina, è possibile creare l'elenco principale dei protocolli.",
            start_text2            : "Clic su [Next] per iniziare.",
            finish_text1           : "L'elenco principale dei protocolli è stato creato.",
            finish_text2           : "Clic su [Fine] e controllare protocolli approvati in lista cronologia.",
            confirm_to_approve     : "Clic su [Approva] per iniziare processo approvazione",
            confirmview_text1      : "Lista principale sarà approvata e distribuita a scanner CT.",
            confirmview_text2      : "Continuare?",

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
        title_request : "Richieste",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Voice preimpostato"

        },
        column: {
            model : 'Modello',
            type : "Protocollo",
            patienttype : "Tipo di paziente",
            name : "Nome",
            version : "Versione",
            scanner : "Scanner",
            user : "Utente",
            date : "Data"
        },
        button: {
            approve : "Approva",
            keeplocally : "Mantieni",
            reject : "Rifiuta",
            deleted : "Elimina",
            refresh : "Aggiorna",
            close: "Chiudi",
            backtothelist : "Torna a lista"
        },
        event: {
            approve : "Approvato",
            keeplocally : "keep",
            reject : "rifiutata",
            deleted : "Eliminato"
        },
        msg_requesttime :
            "L'elenco richieste è stato aggiornato, fare clic sul pulsante [Aggiorna]."
    },
    UserSpecificName:
    {
        title    : "Impostazione dell'apparecchiatura",
        LabelNodata    : "No Data",
        emptyText       : 'Inserire il nome',
        button  :
        {
            close : "Chiudi",
            save : "Salva"
        }
    },
    compare : {
        title_detail : "Dettagli",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Mostra solo le differenze",
            showall : "Mostra tutto",
            references: "References",
            save : 'Salva',
            close : 'Chiudi'
        },
        label : {
            console_comments : "Commento (Creatore protocollo)",
            approver_comments : "Commento (Approvatore protocollo)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "Conferma",
        text : {
            approve : "Questo protocollo sarà approvato per la distribuzione su tutti gli scanner.",
            deleteProtocl : "Questo protocollo sarà eliminato e rimosso da tutti gli scanner.",
            rejectApproval : "Questo protocollo sarà rifiutato e rimosso dallo scanner di origine. ",
            rejectDeletion : "L'eliminazione di questo protocollo sarà rifiutata con ripristino sullo scanner di origine.",
            keep : "Questo protocollo sarà approvato per l'uso locale sullo scanner di origine. ",
            asker : "Continuare?",
            transfer : "Questo protocollo verrà trasferito ad altri gruppi.",
            systemComment: "[Commento generato dal sistema]",
            reason: "La richiesta di trasferimento del protocollo è stata inviata a ",
            autoApproval: "Approvazione automatica dovuta all'approvazione di {1}",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Approvazione automatica assieme a {1} con lo stesso organo.",
            autoRejectReason: "Rifiuto automatico assieme a {1} con lo stesso organo."
        },
        label : {
            comments : "Commenti",
            reminder : "Immettere commenti.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Questo protocollo verrà trasferito ad altri gruppi.<br>Selezionare i gruppi ai quali si desidera trasferire questo protocollo",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Gruppo',
            model: 'Modello',
            softwarVersion: 'Versione software'
        },
        button : {
            ok : "OK",
            cancel : "Annulla",
            transferOption : "Trasferisci protocollo ad altri gruppi (Opzione)"
        }
    },

    backupDialog: {
        menuItem: "Dati del protocollo di backup",
        backupTitle: "Dati del protocollo di backup",
        backupLocation: "Posizione backup",
        backupBtn: "Backup",
        clearLogBtn: "Cancella registro",
        backupLogs: "Registro di backup",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Chiudi"
    },
    status_tip: {
        ApprovalRequested:"Richiesta approvazione:",
        ApprovalAccepted:"Approvato:",
        LocalUseAccepted:"Approvato per l'uso local:",
        DeletionRequested:"Richiesta eliminazione:",
        DeletionAccepted:"Eliminato:",
        ApprovalRejected:"Approvazione rifiutata:",
        DeletionRejected:"Eliminazione rifiutata:",
        Transferred :"Transferred:",
        Restored: "Ripristinato:",
        ApprovalRequestedValue:"Il protocollo è stato creato/modificato nella CT.",
        ApprovalAcceptedValue:"Il protocollo sarebbe utilizzabile su tutti i CT dello stesso modello/versione.",
        LocalUseAcceptedValue:"Il protocollo sarebbe utilizzabile solo con la CT specifica.",
        DeletionRequestedValue:"Il protocollo è stato eliminato nella CT.",
        DeletionAcceptedValue:"Il protocollo verrebbe eliminato da tutti gli stessi modello/versione di CT.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"Il protocollo non è stato approvato. Sarà ripristinato allo stato precedente nella CT. ",
        DeletionRejectedValue:"Il protocollo non è stato approvato per l'eliminazione. Sarà ripristinato allo stato precedente nella CT.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "Il protocollo è stato ripristinato nella CT. È disponibile per l'uso."
    },
    history : {
        title_history : "Cronologie",
        title_transfer : "Transfers",
        title_protocolhistory : "Cronologia protocollo",
        title_comfirm_header : "Conferma",
        text_search:"ricerca",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Nascondi voci eliminate",
            showdeleteitems : "Mostra voci eliminate",
            backtoHistoryList : "Torna a lista",
            backtoTransferList : "Indietro",
            expandAll: "Espandi tutto",
            collapseAll: "Comprimi tutto",
            hide : "Nascondi",
            show : "Mostra",
            restore : "Ripristina",
            deleted : "Elimina",
            ok : "OK",
            cancel : "Annulla",
            transfer : "Trasferimento",
            showall :"Mostra tutto",
            NextHistories : "Mostra altro",

        },
        column : {
            type : "Protocollo",
            patientype : "Tipo di paziente",
            name : "Nome",
            date : "Data",
            source_scanner : "Scanner sorgente",
            user : "Utente",
            scanners:"scanners",
            event: 'Evento',
            comment: 'Commento'
        },
        cell_content : {
            event_create: "Crea",
            event_edit: "Modifica",
            event_approve: "Approva",
            event_delete: "Elimina",
            event_restore: "Ripristina",
            event_keep_locally: "Mantieni",
            event_reject: "Rifiuta",
            event_transfer: "Trasferimento",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "L'elenco cronologia è stato aggiornato, fare clic sul pulsante [Aggiorna].",
            comfirm_commants : "Commenti",
            comfirm_commants_null : "Immettere commenti.",
            restore_comfirm_text1 : "Questo protocollo sarà ripristinato e distribuito su tutti gli scanner.",
            restore_comfirm_text2 : "Continuare?",
            delete_comfirm_text1 : "Questo protocollo sarà immediatamente eliminato con distribuzione su tutti gli scanner.",
            delete_comfirm_text2 : "Continuare?"
        },
        action_event: {
            Request:"Richiesta",
        }
    },

    comparison : {
        button : {
            cancel :"Annulla",
            check_params :"Verifica parametri",
            ok :"OK",
            select_scan_mode :"Modo Scansione"
        },
        title : {
            selection : "Sleziona Protocollo Comparato",
            detail : "Dettagli",
            scan_mode : "Seleziona modalità scansione comparata"
        }
    },

    app_setting : {
        button : {
            add :"Aggiungi",
            apply :"OK",
            cancel :"Annulla",
            deleted :"Elimina",
            disable :"Disattiva",
            edit :"Modifica",
            enable :"Attiva",
            ok :"OK",
            save : "Salva",
            execute: "Avvia",
            import: "Import",
            export: "Export",
            close: "Chiudi"
        },
        column : {
            distribution :"distribuzione",
            distribution_machine_name :"Scanner di distribuzione",
            distribution_scanner :"Scanner di distribuzione",
            group_name :"Nome",
            key :"Chiave",
            machine_name :"Scanner di origine",
            name :"Nome",
            scanner :"Scanner di origine",
            software_version :"Versione software",
            ep_type :"EPType",
            source_machine_name :"Scanner di origine",
            source_scanner :"Scanner di origine",
            system_name :"Nome sistema",
            value :"Valore",
            description :"Descrizione",
            association: 'Association',
            guideline:'Guideline',
        },
        label : {
            initialize_setup:"Creatore Protocolli Principali",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Lingua",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modalità",
            modality_desc :"Nome modalità",
            model_name :"Nome modello",
            model_name_desc :"Nome modello",
            name :"Nome",
            name_desc :"Identificazione Insieme Protocolli",
            software_version :"Versione software",
            software_version_desc :"Versione software corrente",
            ep_type :"EPType",
            ep_type_desc :"EPType corrente",
            system_name :"Nome sistema",
            system_name_desc :"Nome sistema",
            vendor :"Venditore",
            vendor_desc :"Nome venditore",
            x_ray_mode :"Modalità raggi X",
            x_ray_mode_desc :"Modalità raggi X",
            protocol_share_across_model:"Condivisione protoc. fra modelli",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Approvazione batch",
            done:"Done",
            succeed:"Approvazione batch completata correttamente.",
            cancel:"Approvazione batch annullata.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Impossibile approvare alcuni protocolli.",
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
            rpid_display:"Supporto RadLex RPID",
            reference_display:"Rifer. linee guida protocollo",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "Le impostazioni App sono state aggiornate, fare clic sul pulsante [Aggiorna].",
//          deleted :"Queste impostazioni saranno rimosse dal file di configurazione.",
            protocol_pool_deleted :"Queste impostazioni saranno rimosse dal file di configurazione.",
            sources_canner_deleted :"Queste impostazioni saranno rimosse dal file di configurazione.",

            distribution_scanner_deleted :"Queste impostazioni saranno rimosse dal file di configurazione.",
            delete_continue :"Continuare?",
            console_ok_save_warningone:"Alcune modifiche non sono state salvate.",
            console_ok_save_warningtwo:"Salvare le modifiche?",
            console_delete_machine_waring:"Lo scanner di origine sarà eliminato.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",

            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",

            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Scanner di origine",
            distribution_setting :"Scanner di distribuzione",
            other_setting :"Altri",
            pool_setting :"Insieme Protocolli",
            language_setting :"Language Setting",
            setting :"Impostazioni",
            display_setting:"Condivisione protoc. fra modelli",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Approvazione in corso...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"Supporto RadLex RPID",
            reference_setting:"Rifer. linee guida protocollo"

        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Protocollo Utente",
            ServiceProtocol : "Protocollo Assistenza",
            make_change:'Make Changes',
            active_change:'Activate changes',
            undo_change:'Undo Changes',
            leave:'Leave',
            stay:'Stay'
        },
        tab:
        {
            Adult       :"Adulto",
            Child       :"Bimbo",
            Trauma      :"Trauma",
            GroupA      :"Gruppo A",
            GroupB      :"Gruppo B",
            GroupC      :"Gruppo C",
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
                overview    : " Approvazione",
                details        : " approvazione",
                details2    : "Approvato"
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
                overview    : "Dliminazione",
                details        : "eliminazione",
                details2    : "eliminato"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "Ripristinato"
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
            "overview"    : "Err Acquisizione Licenza",
            "details"    : "Errore di acquisizione licenza, avvio dell'applicazione annullato.",
            "solution"    : "Controllare la licenza.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
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
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "TIl protocollo è stato utilizzato da un altro utente, pertanto il protocollo {0} è stato annullato.",
            "solution"    : "Controllare l'elenco della cronologia.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Questo protocollo è stato aggiornato durante {0}, pertanto il protocollo {1} è stato annullato.",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "File di protocollo illeggibili, pertanto il protocollo {0} è stato annullato.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Impossibile connettersi con il server dei file, pertanto il protocollo {0} è stato annullato.",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Errore inatteso su Server Protocolli",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Ripristino del protocollo non riuscito",
            "details"    : "Esiste già un altro protocollo presente nella stessa posizione.",
            "solution"    : "",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Alcuni file in uso, pertanto il protocollo {0} è stato annullato.",
            "solution"    : "Chiudere i file in uso e provare di nuovo.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "I nomi di sistema fra scanner CT e server protocollo non corrispondono, acquisizione protocollo annullata.",
            "solution"    : "Modificare il nome sistema sul server protocolli.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "I nomi del modello fra scanner CT e server protocollo non corrispondono, acquisizione protocollo annullata.",
            "solution"    : "Modificare nome modello sul server protocolli.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Le modalità raggi X fra scanner CT e server protocollo non corrispondono, acquisizione protocollo annullata.",
            "solution"    : "Modifica modalità raggi X su server protocolli",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Le versioni di software fra scanner CT e server protocollo non corrispondono, acquisizione protocollo annullata.",
            "solution"    : "Modificare versione sw sul server protocolli.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Imp. leggere il file di riepilogo, acquisizione protocollo annullata.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Imp. leggere il file registro modifiche, acquisizione protocollo annullata.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Imp. leggere il file cronologia, acquisizione protocollo annullata.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "File di riepilogo non trovato, acquisizione protocollo annullata.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Err. Acquisizione Protocollo",
            "details"    : "Protocollo già approvato da un altro utente.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Recupero del protocollo non riuscito",
            "details"    : "Ricezione cronologia del protocollo non riuscita.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere ID Scanner nello spazio",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Nome Venditore nello spazio",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Nome Modalità nello spazio",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Nome Sistema nello spazio",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Nome Modalità nello spazio",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Modalità Raggi X nello Spazio",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Immettere Versione Software nello spazio",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Selezionare l'ID dello scanner.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Inserire scanner sorgente nello spazio",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Scanner già registrato.",
            "solution"    : "Rinominare lo scanner.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Non impostare valore nullo",
            "solution"    : "Selezionare lo scanner sorgente.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Imp. disabilitare tutti scanner distribuzione.",
            "solution"    : "Abilitare almeno 1 scanner di distribuzione.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "Il nome scanner contiene caratteri non validi, sono consentiti solo [0-9], [a-Z] e [ -_ ].",
            "solution"    : "Rinominare il nome scanner.",
        },

        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "Err. Impostazione App",
              "details"    : "Scanner già registrato.",
              "solution"    : "Rinominare lo scanner.",
              "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "Err. Impostazione App",
            "details"    : "Alcuni file in uso, aggiornamento impostazioni annullato.",
            "solution"    : "Chiudere i file in uso e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Identificativo scanner già registrato.",
            "solution"    : "Rinominare l'ID dello scanner.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "Err. Impostazione App",
            "details"    : "Pool di protocolli già registrato, aggiornamento impostazioni annullato.",
            "solution"    : "Controllare l'altro pool protocolli.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "Impostazione app. non riuscita",
            "details"    : "Il programma è in uso, pertanto la registrazione dell'impostazione è stata annullata.",
            "solution"    : "Attendere qualche minuto e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "Impostazione app. non riuscita",
            "details"    : "Modifica del file di configurazione non riuscita, pertanto lo spostamento delle cronologie del protocollo è stato annullato.",
            "solution"    : "Verificare lo stato del file di configurazione e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "Impostazione app. non riuscita",
            "details"    : "Il programma era scaduto.",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "Impostazione app. non riuscita",
            "details"    : "Si è verificato un errore sconosciuto.",
            "solution"    : "Riprovare più tardi.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
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
            "overview"    : "Err. Impostazione App",
            "details"    : "File impostazioni in uso, aggiornamento impostazioni annullato.",
            "solution"    : "Chiudere il file in uso e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare assistenza Toshiba."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "Impostazione app non riuscita",
            "details"    : "Aggiornamento impostazioni annullato perché il file delle impostazioni è in uso.",
            "solution"    : "Chiudere il file in uso e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "Err. Impostazione App",
            "details"    : "File impostazioni non trovato, aggiornamento impostazioni annullato.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "Err. Impostazione App",
            "details"    : "Imp. leggere file impostazioni, aggiornamento impostazioni annullato.",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "Impostazione app. non riuscita",
            "details"    : "Scanner già esistente, pertanto l'aggiunta dello scanner è stata annullata.",
            "solution"    : "Verificare il file di configurazione e riprovare.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Impostazione dell'apparecchiatura non riuscita",
              "details"    : "Il file di configurazione è in uso in un altro programma, pertanto l'impostazione dell'apparecchiatura è stata annullata.",
              "solution"    : "Chiudere il file di configurazione e riprovare.",
              "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "Impostazione dell'apparecchiatura non riuscita",
              "details"    : "Il file di configurazione è stato modificato in un altro programma, pertanto l'impostazione dell'apparecchiatura è stata annullata.",
              "solution"    : "Aggiornare la pagina e riprovare più tardi.",
              "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "Impostazione dell'apparecchiatura non riuscita",
              "details"    : "Il file di configurazione è illeggibile, pertanto l'impostazione dell'apparecchiatura è stata annullata.",
              "solution"    : "Verificare il file di configurazione e riprovare.",
              "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },		
		
        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "This protocol {0} was already transferred to {1}, therefore protocol transferring was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "Protocollo {0} non riuscito",
            "details"    : "Errore inatteso su Server Protocolli",
            "solution"    : "",
            "calladmin"    : "Contattare assistenza Toshiba."
        },
        ERR80004 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "protocol sharing state set in 'protocolmanagement.xml' is off",
            "solution"    : "Please check the file 'ProtocolManagement.xml'.",
            "calladmin"    : "Se il problema persiste, contattare l'assistenza Toshiba."
        },
        ERR0005 : {
            "status"    : "info",
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>Exposure",
            "details"    : "Nell'elenco principale è già disponibile un'altra impostazione predefinita di <sup>SURE</sup>Exposure con lo stesso nome per i seguenti protocolli: ",
            "solution"    : "Se si desidera sostituire quella già esistente nell'elenco principale con i suddetti protocolli, rimuovere l'impostazione predefinita esistente dall'elenco principale e sostituirla con i suddetti protocolli.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>IQ",
            "details"    : "Nell'elenco principale è già disponibile un'altra impostazione predefinita di <sup>SURE</sup>IQ con lo stesso nome per i seguenti protocolli:",
            "solution"    : "Se si desidera sostituire quella già esistente nell'elenco principale con i suddetti protocolli, rimuovere l'impostazione predefinita esistente dall'elenco principale e sostituirla con i suddetti protocolli.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Copia dell'impostazione predefinita di Contrasto",
            "details"    : "Nell'elenco principale è già disponibile un'altra impostazione predefinita di Contrasto con lo stesso nome per i seguenti protocolli:  ",
            "solution"    : "Se si desidera sostituire quella già esistente nell'elenco principale con i suddetti protocolli, rimuovere l'impostazione predefinita esistente dall'elenco principale e sostituirla con i suddetti protocolli.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "Scano <sup>SURE</sup>IQ mancante",
            "details"    : "L'attuale elenco principale non contiene <sup>SURE</sup>IQ per Scano. Aggiungere <sup>SURE</sup>IQ per Scano per proseguire.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Impostazione predefinita di <sup>SURE</sup>IQ errata",
            "details"    : "<sup>SURE</sup>IQ contiene un tipo di paziente non valido.Il tipo di paziente valido supportato per <<sup>SURE</sup>IQ Name> è Adulto.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
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
            "overview"    : "La coda predefinita di <sup>SURE</sup>IQ è piena",
            "details"    : "La coda predefinita di <sup>SURE</sup>IQ può contenere solo {1} tipi di organo nell'elenco principale. Questo limite è stato superato per i seguenti organi:",
            "solution"    : "Se si desidera aggiungere più impostazioni predefinite di <sup>SURE</sup>IQ per il tipo di organo, rimuovere prima qualsiasi altra voce.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "La coda predefinita di <sup>SURE</sup>IQ è piena",
            "details"    : "La coda predefinita di <sup>SURE</sup>IQ può contenere solo {1} schede in uno specifico tipo di organo nell'elenco principale. Questo limite è stato superato per i seguenti organi:",
            "solution"    : "Se si desidera aggiungere più impostazioni predefinite di <sup>SURE</sup>IQ per questo organo, rimuovere prima qualsiasi altra voce.",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "La coda predefinita di <sup>SURE</sup>Exposure è piena",
            "details"    : "La coda predefinita di <sup>SURE</sup>Exposure può contenere solo {1} schede nell'elenco principale.<sup>SURE</sup>Exposure supera questo limite di coda e non può essere supportato.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Impostazione predefinita di <sup>SURE</sup>Exposure non corretta",
            "details"    : "<sup>SURE</sup>Exposure contiene un tipo di paziente non valido.Il tipo di paziente valido supportato da <sup>SURE</sup>Exposure è Adulto o Pediatrico.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Impostazione predefinita di <sup>SURE</sup>Exposure non corretta",
            "details"    : "<sup>SURE</sup>Exposure contiene un tipo di organo non valido.Il tipo di organo valido supportato per <sup>SURE</sup>Exposure è Testa, Collo, ECG o Tutto.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "La coda predefinita di <sup>SURE</sup>Exposure è piena",
            "details"    : "La coda predefinita di <sup>SURE</sup>Exposure può contenere solo {1} schede in uno specifico tipo di organo nell'elenco principale. Questo limite è stato superato per i seguenti organi:",
            "solution"    : "Se si desidera aggiungere più impostazioni predefinite di <sup>SURE</sup>Exposure per questo organo, rimuovere prima qualsiasi altra voce.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Impostazione predefinita di Contrasto non corretta",
            "details"    : "L'impostazione predefinita di Contrasto contiene un tipo di paziente non valido.I tipi di paziente validi supportati per l'impostazione predefinita di Contrasto sono Adulto e Pediatrico.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "<sup>SURE</sup>Exposure mancante",
            "details"    : "Deve essere presente almeno un'impostazione predefinita di <sup>SURE</sup>Exposure per ogni tipo di organo e tipo di paziente.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "Impostazione posizione non riuscita",
            "details"     : "Si è verificato un errore imprevisto.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "Questo nome identificativo dell'apparecchiatura è già stato registrato.",
            "solution"    : "Modificare il nome.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Questo nome identificativo dell'apparecchiatura è troppo lungo.",
            "solution"  : "Scegliere un nome con meno di 40 caratteri.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Lo scanner TC aggiunto presenta delle cronologie?",
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
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>IQ",
            "details"    : "Nell'elenco della cronologia è già disponibile un'altra impostazione predefinita di <sup>SURE</sup>IQ con lo stesso nome, pertanto questa impostazione predefinita non può essere aggiunta.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>Exposure",
            "details"    : "Nell'elenco della cronologia è già disponibile un'altra impostazione predefinita di <sup>SURE</sup>Exposure con lo stesso nome, pertanto questa impostazione predefinita non può essere aggiunta.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Copia dell'impostazione predefinita di Contrasto",
            "details"    : "Nell'elenco della cronologia è già disponibile un'altra impostazione predefinita di Contrasto con lo stesso nome, pertanto questa impostazione predefinita non può essere aggiunta.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>Exposure",
            "details"    : "All'elenco principale è già stato aggiunto automaticamente un altro <sup>SURE</sup>Exposure con lo stesso nome come protocollo allegato. Impossibile sovrascrivere.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Copia dell'impostazione predefinita di <sup>SURE</sup>IQ",
            "details"    : "All'elenco principale è già stato aggiunto automaticamente un altro <sup>SURE</sup>IQ con lo stesso nome come protocollo allegato. Impossibile sovrascrivere.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Copia dell'impostazione predefinita di Contrasto",
            "details"    : "All'elenco principale è già stata aggiunta automaticamente un'altra impostazione predefinita di Contrasto con lo stesso nome come protocollo allegato. Impossibile sovrascrivere.",
            "solution"    : "",
            "calladmin"    : "Per il supporto tecnico, contattare il servizio di assistenza Toshiba."
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
            "overview"    : "Voice preimpostato identico",
            "details"    : "Un altro Voice preimpostato con lo stesso nome è già disponibile nell'elenco principale per i seguenti protocolli ",
            "solution"    : "Se si desidera sostituire quello esistente nell'elenco principale con i protocolli qui sopra, eliminare quello esistente dall'elenco principale e poi sostituirlo con i protocolli qui sopra.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "Coda di Voice preimpostato piena",
            "details"    : "La coda di Voice preimpostato può contenere solo 20 lingue nell'elenco principale. Questo limite è stato superato per le lingue seguenti:",
            "solution"    : "Se si desidera aggiungere altri Voice preimpostato per la lingua, eliminare prima altri inserimenti.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "Coda di Voice preimpostato piena",
            "details"    : "La coda di Voice preimpostato può contenere solo 10 schede in una specifica lingua nell'elenco principale. Questo limite è stato superato per la lingua seguente:",
            "solution"    : "Se si desidera aggiungere altri Voice preimpostato per questa lingua, eliminare prima altri inserimenti.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Voice preimpostato mancante",
            "details"    : "La coda di Voice preimpostato deve contenere le 6 lingue seguenti:<BR><BR>giapponese<BR>inglese<BR>cinese<BR>coreano<BR>spagnolo<BR>portoghese",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Voice preimpostato mancante",
            "details"    : "Ogni lingua nella coda di Voice preimpostato deve contenere i 5 comandi vocali seguenti.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Voice preimpostato identico",
            "details"    : "Un altro Voice preimpostato con lo stesso nome esiste già nell'elenco cronologico, quindi questa preimpostazione non può essere aggiunta.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "La coda di <sup>SURE</sup>IQ preimpostato non ha raggiunto il numero minimo di schede ",
            "details"    : "La coda di <sup>SURE</sup>IQ preimpostato deve contenere almeno {1} schede per un tipo di organo specifico nell'elenco principale.Questo limite non è stato raggiunto per i seguenti organi:",
            "solution"    : "Impostare aggiungi <sup>SURE</sup>IQ preimpostato per questo organo.",
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