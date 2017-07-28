var stringSetting =
{
    protocolmanagement: "Gestion de protocole",

    tab: {
        requestlist : "Liste de requêtes",
        history : "Liste d'historique",
        transfer : "Liste de transfert",
        app_setting :"Réglages app",
        master: "Liste Ppale",
        position: "Protocol Positions"
    },

    menu : {
        identifing:"Paramétrage de l'équipement",
        filter : {
            CheckAll : "TOUS",
            SortAscending : "Tri croissant",
            SortDescending : "Tri décroissant",
            Filter : "Filtre"
        }
    },

    master:
    {
        button:
        {
            Next        : "Suiv",
            Back        : "Ret",
            Cancel      : "Annuler",
            Approve     : "Approuv",
            Finish      : "Finir",
            UserProtocol    : "Protocol Util",
            ServiceProtocol : "Protocol Service",
            Move        : "Déplacer",
            OKbtn       : "OK",
            Setasdefault    : "Définir comme option par défaut",
            Reset    : "Reset"
        },
        tab:
        {
        	Adult       :"Adult",
        	Child       :"Child",
        	Trauma      :"Trauma",
            GroupA      :"Groupe A",
            GroupB      :"Groupe B",
            GroupC      :"Groupe C",
        },
        title:
        {
            Start                   : "Début de la création de la liste principale des protocoles",
            CreationEP              : "Liste principale du programme d'examen",
            CreationSureIQ          : "Liste principale <sup>SURE</sup>IQ",
            CreationSureExp         : "Liste principale <sup>SURE</sup>Exposure",
            CreationCP              : "Liste principale des préréglages de contraste",
            CreationVoice           : "Liste principale des préréglages Voice",
            Setting                 : "Paramétrage de position du programme d'examen",
            SelectOther             : "Liste principale des autres paramètres",
            Approving               : "Confirmer Liste Ppal avant Approb",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Fin de la création de la liste principale des protocoles",
            title_confirm           : "Confirm",
            title_approve           : "Approuv",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "Liste Ppale",
            OriginalList            : "Liste Origin",
            Parameters              : "param",
            Parameter_Name			: "Parameter Name",
        },
        statusLab:
        {
            Start                   : "Démarrage",
            Creation                : "Création<br> Liste Ppale",
            Setting                 : "Paramétrage<br> de position",
            SelectOther             : "Sélection d'autres<br> paramètres",
            Approving               : "Approbation<br> en cours",
            Finish                  : "Finir"
        },
        column:{
            type                    :"Protocole",
            patienttype             :"Type Patient",
            name                    :"Nom",
            date                    :"Date",
            scanner                 :"Nom Scanner",
        },
        columns:
        {
            patientType                : "Type Patient",
            bodyRegion                 : "Zone Corps",
            masterList                 : "Liste Ppale",
            machineName                : "Nom Scanner",
            language                   : "Langue",

        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Ajout ts protocoles à Liste Ppal",
            addSelected               : "Ajout à Liste Ppal",
            checkParameters           : "Vérifier param",
            removeFromList            : "Suppr de Liste Ppale",
        },
        message:
        {
            start_text1            : "Vous pouvez créer la liste principale des protocoles depuis cette page.",
            start_text2            : "[Suivant] pour démarrer.",
            finish_text1           : "La liste principale des protocoles est créée.",
            finish_text2           : "Cliquez sur [Finir], révisez protocoles approuvés dans Liste Historique.",
            confirm_to_approve     : "[Approuver] pour lancer approbation.",
            confirmview_text1      : "Liste Ppale approuvée et envoyée vers scanners CT.",
            confirmview_text2      : "Continuer ?",

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
        title_request : "Requêtes",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Préréglage Voice"

        },
        column: {
            type : "Protocole",
            patienttype : "Type de patient",
            name : "Nom",
            version : "Version",
            date : "Date",
            scanner : "Scanner",
            user : "Utilisateur",
        },
        button: {
            approve : "Approuver",
            keeplocally : "Garder local",
            reject : "Rejeter",
            deleted : "Supprimer",
            refresh : "MàJ.",
            close: "Fermer",
            backtothelist : "Retour à Liste"
        },
        event: {
            approve : "approuvée",
            keeplocally : "garder",
            reject : "Rejeté",
            deleted : "supprimé"
        },
        msg_requesttime :
            "La liste de requêtes a été mise à jour, cliquez sur le bouton [Actualiser]."
    },
    UserSpecificName:
    {
        title    : "Paramétrage de l'équipement",
        LabelNodata    : "No Data",
        emptyText       : 'Saisissez le nom',
        button  :
        {
            close : "Fermer",
            save : "Enregistrer"
        }
    },
    compare : {
        title_detail : "Détail",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Aff. différences seules",
            showall : "Afficher tout",
            references: "References",
            save : 'Enregistrer',
            close : 'Fermer'
        },
        label : {
            console_comments : "Commentaires (créateur du protocole)",
            approver_comments : "Commentaires (approbateur du protocole)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "Confirmer",
        text : {
            approve : "La distribution de ce protocole sera approuvée pour tous les scanners.",
            deleteProtocl : "Ce protocole sera supprimé et retiré de tous les scanners.",
            rejectApproval : "Ce protocole sera rejeté et supprimé du scanner source.",
            rejectDeletion : "Ce protocole sera rejeté pour suppression et sera restauré sur le scanner source.",
            keep : "L'utilisation locale de ce protocole sera approuvée sur le scanner source.",
            asker : "Voulez-vous continuer ?",
            transfer : "Ce protocole va être transféré vers d'autres groupes.",
            systemComment: "[Commentaire généré par le système]",
            reason: " La demande de transfert du protocole a été envoyée à ",
            autoApproval: "Approbation automatique liée à l'approbation de {1}.",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Approbation automatique avec {1} sur le même organe.",
            autoRejectReason: "Rejet automatique avec {1} sur le même organe."
        },
        label : {
            comments : "Commentaires",
            reminder : "Saisissez vos commentaires.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Ce protocole va être transféré vers d'autres groupes.<br>Sélectionnez les groupes de votre choix :",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Groupe',
            model: 'Modèle',
            softwarVersion: 'Version du logiciel'
        },
        button : {
            ok : "OK",
            cancel : "Annuler",
            transferOption : "Transférer le protocole vers d'autres groupes (facultatif)"
        }
    },

    backupDialog: {
        menuItem: "Sauvegarder les données de protocole",
        backupTitle: "Sauvegarder les données de protocole",
        backupLocation: "Sauvegarder l'emplacement",
        backupBtn: "Sauvegarder",
        clearLogBtn: "Vider le journal",
        backupLogs: "Sauvegarder le journal",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Fermer"
    },
    status_tip: {
        ApprovalRequested:"Autorisation demandée:",
        ApprovalAccepted:"Approuvée:",
        LocalUseAccepted:"Utilisation locale approuvée:",
        DeletionRequested:"Suppression demandée:",
        DeletionAccepted:"Supprimé:",
        ApprovalRejected:"Autorisation rejetée:",
        DeletionRejected:"Suppression rejetée:",
        Transferred :"Transferred:",
        Restored: "Restauré:",
        ApprovalRequestedValue:"Protocole créé/édité dans CT.",
        ApprovalAcceptedValue:"L'utilisation de ce protocole pourra être acceptée dans tous les CT de même modèle/version.",
        LocalUseAcceptedValue:"L'utilisation de ce protocole sera acceptée uniquement pour le CT spécifié.",
        DeletionRequestedValue:"Protocole supprimé dans CT.",
        DeletionAcceptedValue:"Le protocole sera supprimé de tous les CT de même modèle/version.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"Le protocole n'a pas été approuvé. Il va retrouver son état précédent dans le CT.",
        DeletionRejectedValue:"La suppression du protocole n'a pas été approuvée. Il va retrouver son état précédent dans le CT.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "Le protocole a été restauré dans le CT. Il peut être utilisé."
    },
    history : {
        title_history : "Historiques",
        title_transfer : "Transfers",
        title_protocolhistory : "Historique du protocole",
        title_comfirm_header : "Confirmer",
        text_search:"Rechercher",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Masquer éléments suppr.",
            showdeleteitems : "Afficher éléments suppr.",
            backtoHistoryList : "Retour à Liste",
            backtoTransferList : "Retour",
            expandAll: "Tout agrandir",
            collapseAll: "Tout réduire",
            hide : "Masquer",
            show : "Afficher",
            restore : "Restaurer",
            deleted : "Supprimer",
            ok : "OK",
            cancel : "Annuler",
            transfer : "Transférer",
            showall :"Afficher tout",
            NextHistories : "Voir Plus",
        },
        column : {
            type : "Protocole",
            patientype : "Type de patient",
            name : "Nom",
            date : "Date",
            source_scanner : "Scanner source",
            user : "Utilisateur",
            scanners:"scanners",
            event: 'Événement',
            comment: 'Commentaire'
        },
        cell_content : {
            event_create: "Créer",
            event_edit: "Éditer",
            event_approve: "Approuver",
            event_delete: "Supprimer",
            event_restore: "Restaurer",
            event_keep_locally: "Garder local",
            event_reject: "Rejeter",
            event_transfer: "Transférer",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "La liste d'historique a été mise à jour, cliquez sur le bouton [Actualiser].",
            comfirm_commants : "Commentaires",
            comfirm_commants_null : "Saisissez vos commentaires.",
            restore_comfirm_text1 : "Ce protocole sera immédiatement restauré et distribué à tous les scanners.",
            restore_comfirm_text2 : "Voulez-vous continuer ?",
            delete_comfirm_text1 : "Ce protocole sera immédiatement supprimé et distribué à tous les scanners.",
            delete_comfirm_text2 : "Voulez-vous continuer ?"
        },
        action_event: {
            Request:"requête",
        }
    },

    comparison : {
        button : {
            cancel :"Annuler",
            check_params :"Vérifier param",
            ok :"OK",
            select_scan_mode :"Sélect mode acq"
        },
        title : {
            selection : "Sélectionner protocole comparé",
            detail : "Détail",
            scan_mode : "Sélectionner mode d'acquisition comparé"
        }
    },

    app_setting : {
        button : {
            add :"Ajouter",
            apply :"OK",
            cancel :"Annuler",
            deleted :"Supprimer",
            disable :"Désactiver",
            edit :"Éditer",
            enable :"Activer",
            ok :"OK",
            save : "Enregistrer",
            execute: "Démarrage",
            import: "Import",
            export: "Export",
            close: "Fermer"
        },
        column : {
            distribution :"Distribution",
            distribution_machine_name :"Scanner de distribution",
            distribution_scanner :"Scanner de distribution",
            group_name :"Nom",
            key :"Clé",
            machine_name :"Scanner source",
            name :"Nom",
            scanner :"Scanner source",
            software_version :"Version Logiciel",
            ep_type :"EPType",
            source_machine_name :"Scanner source",
            source_scanner :"Scanner source",
            system_name :"Nom système",
            value :"Valeur",
            description :"Description",
            association: 'Association',
            guideline:'Consigne',
        },
        label : {
            initialize_setup:"Auteur Protocole Ppal",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Langue",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modalité",
            modality_desc :"Nom de la modalité",
            model_name :"Nom modèle",
            model_name_desc :"Nom du modèle",
            name :"Nom",
            name_desc :"IDENTIFIANT DU GROUPE DE PROTOCOLE",
            software_version :"Version logicielle",
            software_version_desc :"Version logicielle actuelle",
            ep_type :"EPType",
            ep_type_desc :"EPType actuel",
            system_name :"Nom système",
            system_name_desc :"Nom du système",
            vendor :"Distributeur",
            vendor_desc :"Nom du distributeur",
            x_ray_mode :"Mode de rayons X",
            x_ray_mode_desc :"Mode de rayons X",
            protocol_share_across_model:"Partage protocole entre mod.",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Autorisation par lot",
            done:"Done",
            succeed:"L'autorisation par lot a été terminée avec succès.",
            cancel:"L'autorisation par lot a été annulée.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Certains protocoles n'ont pas pu être approuvés.",
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
            rpid_display:"Support RadLex RPID",
            reference_display:"Référence consigne protocole",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "Le réglage d'application a été mis à jour, cliquez sur le bouton [Actualiser].",
//          deleted :"Le scanner source sera supprimé.",
            protocol_pool_deleted :"Le group de protocole sera supprimé.",
            sources_canner_deleted :"Le scanner source sera supprimé.",
            distribution_scanner_deleted :"Le scanner de distribution sera supprimé.",
            delete_continue :"Voulez-vous continuer ?",
            console_ok_save_warningone:"Certaines modifications ne sont pas enregistrées.",
            console_ok_save_warningtwo:"Voulez-vous enregistrer les modifications ?",
            console_delete_machine_waring:"Le scanner source sera supprimé.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",

            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",

            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
			},
        title : {
            console_setting :"Scanner source",
            distribution_setting :"Scanner de distribution",
            other_setting :"Autres",
            pool_setting :"GROUPE DE PROTOCOLE",
            language_setting :"Language",
            setting :"Réglage",
            display_setting:"Partage protocole entre mod.",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Autorisation en cours...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"Support RadLex RPID",
            reference_setting:"Référence consigne protocole"
        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Protocol Util",
            ServiceProtocol : "Protocol Service",
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
            GroupA      :"Groupe A",
            GroupB      :"Groupe B",
            GroupC      :"Groupe C",
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
                overview    : "Autorisation",
                details        : "autorisation",
                details2    : "approuvé"
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
                overview    : "Suppression",
                details        : "suppression",
                details2    : "supprimé"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "restauré"
            },
            approvetransfer: {
                overview    : "Approval or Transferring",
                details        : "approval or transfer",
                details2    : "approved or transfered"
            },
            transfer: {
                overview    : "Transferring",
                details        : "Transférer",
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
            "overview"    : "Licence Non Acquise",
            "details"    : "Impossible d'acquérir licence ; ouverture d'application annulée.",
            "solution"    : "Vérifiez la licence.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
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
            "overview"    : "Échec du protocole {0}",
            "details"    : "Le protocole est utilisé par un autre utilisateur ; le protocole {0} a été annulé.",
            "solution"    : "Vérifiez l'historique.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Ce protocole a été mis à jour pendant l'activité {0}; le protocole {1} a été annulé.",
            "solution"    : "Réessayez ultérieurement.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Les fichiers de ce protocole étaient illisibles ; le protocole {0} a été annulé.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Échec de connexion au serveur de fichiers ; le protocole {0} a été annulé.",
            "solution"    : "Réessayez ultérieurement.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Erreur imprévue sur le Serveur de Protocoles.",
            "solution"    : "Réessayez plus tard.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Try it again later.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Échec de restauration du protocole",
            "details"    : "Un autre protocole est déjà présent dans le même emplacement.",
            "solution"    : "",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Certains fichiers sont en cours d'utilisation ; le protocole {0} a été annulé.",
            "solution"    : "Fermez les fichiers en cours d'utilisation et réessayez.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Discordance de noms de système entre scanner CT et Serveur de Protocole, acquisition du protocole annulée.",
            "solution"    : "Changez nom du système sur Serveur de Protocoles.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Discordance de noms de modèle entre scanner CT et Serveur de Protocole, acquisition du protocole annulée.",
            "solution"    : "Changez nom de modèle sur Serveur de Protocoles.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Discordance de modes de rayons X entre scanner CT et Serveur de Protocole, acquisition du protocole annulée.",
            "solution"    : "Changez mode rayonsX sur Serveur Protocoles.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Discordance de versions logicielles entre scanner CT et Serveur de Protocole, acquisition du protocole annulée.",
            "solution"    : "Changez version logicielle sur Serveur de Protocoles.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Fichier de synthèse illisible, acquisition du protocole annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Journal de modif illisible, acquisition du protocole annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Fichier d'historique illisible, acquisition du protocole annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Fichier de synthèse introuvable, acquisition du protocole annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Protocole Non Acquis",
            "details"    : "Protocole déjà approuvé par un autre utilisateur.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Échec de récupération du protocole",
            "details"    : "Échec de réception de l'historique des protocoles.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez identifiant du scanner dans vide.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez nom du fournisseur dans vide.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez nom de modalité dans vide.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez nom du système dans vide.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez nom du modèle dans vide.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez mode rayons X dans vide.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez version logicielle dans vide.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Sélection identifiant du scanner.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Indiquez scanner source dans vide.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Scanner déjà enregistré.",
            "solution"    : "Renommez le scanner.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Déf de blanc interdite.",
            "solution"    : "Sélectionnez le scanner source.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Interdit désactiver tous scanners de distrib.",
            "solution"    : "Activez au moins 1 scanner de distribution.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "Le nom de ce scanner contient des caractères interdits. Seuls les chiffres [0-9], les lettres [a-Z] et les symboles [ -_ ] sont autorisés.",
            "solution"    : "Changez le nom du scanner.",
        },

        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "Échec Config Appli",
              "details"    : "Ce scanner était déjà enregistré.",
              "solution"    : "Renommez le scanner.",
              "calladmin"    : "Si le problème persiste, contactez le service technique Toshiba."
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "Échec Config Appli",
            "details"    : "Des fichiers sont utilisés, mise à jour de config annulée.",
            "solution"    : "Fermez les fichiers utilisés et réessayez.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Même identifiant de scanner déjà enregistré.",
            "solution"    : "Renommez l'identifiant du scanner.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "Échec Config Appli",
            "details"    : "Même Pool de Protocoles déjà enregistré, mise à jour de config annulée.",
            "solution"    : "Contrôlez autre Pool de Protocoles.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "Échec de paramétrage de l'application",
            "details"    : "Le programme est en cours d'utilisation ; l'enregistrement des paramètres a été annulé.",
            "solution"    : "Veuillez patienter, puis réessayez.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "Échec de paramétrage de l'application",
            "details"    : "Échec de modification du fichier de configuration ; le déplacement des historiques de protocoles a été annulé.",
            "solution"    : "Vérifiez l'état du fichier de configuration, puis réessayez.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "Échec de paramétrage de l'application",
            "details"    : "Le programme a été arrêté.",
            "solution"    : "Réessayez ultérieurement.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "Échec de paramétrage de l'application",
            "details"    : "Une erreur inconnue s'est produite.",
            "solution"    : "Réessayez ultérieurement.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
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
            "overview"    : "Échec Config Appli",
            "details"    : "Fichier de config utilisé, mise à jour de config annulée.",
            "solution"    : "Fermez le fichier utilisé et réessayez.",
            "calladmin"    : "Si le problème persiste, contactez Toshiba."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "Échec réglage app.",
            "details"    : "Certains fichiers étaient en cours d'utilisation, la mise à jour du réglage a donc été annulée.",
            "solution"    : "Fermez les fichiers en cours d'utilisation et réessayez.",
            "calladmin"    : "Si le problème persiste, contactez le service technique Toshiba."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "Échec Config Appli",
            "details"    : "Fichier de config introuvable, mise à jour de config annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "Échec Config Appli",
            "details"    : "Fichier de config illisible, mise à jour de config annulée.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "Échec de paramétrage de l'application",
            "details"    : "Le scanner existe ; l'ajout du scanner a été annulé.",
            "solution"    : "Vérifiez le fichier de configuration, puis réessayez.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
		
        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Échec de paramétrage de l'équipement",
              "details"    : "Le fichier de configuration est utilisé par un autre programme ; le paramétrage de l'équipement a été annulé.",
              "solution"    : "Fermez le fichier de configuration et réessayez.",
              "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "Échec de paramétrage de l'équipement",
              "details"    : "Le fichier de configuration a été modifié par un autre programme ; le paramétrage de l'équipement a été annulé.",
              "solution"    : "Actualisez la page et réessayez ultérieurement.",
              "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "Échec de paramétrage de l'équipement",
              "details"    : "Le fichier de configuration est illisible ; le paramétrage de l'équipement a été annulé.",
              "solution"    : "Vérifiez le fichier de configuration, puis réessayez.",
              "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },		

        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "This protocol {0} was already transferred to {1}, therefore protocol transferring was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "Échec du protocole {0}",
            "details"    : "Erreur imprévue sur le Serveur de Protocoles.",
            "solution"    : "",
            "calladmin"    : "Contactez Toshiba."
        },
        ERR80004 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "protocol sharing state set in 'protocolmanagement.xml' is off",
            "solution"    : "Please check the file 'ProtocolManagement.xml'.",
            "calladmin"    : "Si le problème persiste, veuillez contacter le service Toshiba."
        },
        ERR0005 : {
            "status"    : "info",
            "overview"    : "Préréglage <sup>SURE</sup>Exposure en double",
            "details"    : "Un autre préréglage <sup>SURE</sup>Exposure du même nom est déjà disponible dans la liste principale des protocoles suivants : ",
            "solution"    : "Si vous souhaitez remplacer le protocole existant dans la liste principale par l'un des protocoles ci-dessus, vous devez d'abord le supprimer de la liste.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Préréglage <sup>SURE</sup>IQ en double",
            "details"    : "Un autre préréglage <sup>SURE</sup>IQ du même nom est déjà disponible dans la liste principale des protocoles suivants : ",
            "solution"    : "Si vous souhaitez remplacer le protocole existant dans la liste principale par l'un des protocoles ci-dessus, vous devez d'abord le supprimer de la liste.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Préréglage de contraste en double",
            "details"    : "Un autre préréglage de contraste du même nom est déjà disponible dans la liste principale des protocoles suivants : ",
            "solution"    : "Si vous souhaitez remplacer le protocole existant dans la liste principale par l'un des protocoles ci-dessus, vous devez d'abord le supprimer de la liste.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ pour Scano manquant",
            "details"    : "La liste principale actuelle ne contient pas <sup>SURE</sup>IQ pour Scano. Pour continuer, ajoutez <sup>SURE</sup>IQ pour Scano.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Préréglage <sup>SURE</sup>IQ incorrect",
            "details"    : "<sup>SURE</sup>IQ contient un type de patient non valide.Le type de patient valide pris en charge pour <Nom <sup>SURE</sup>IQ> est Adulte.",
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
            "overview"    : "File d'attente des préréglages <sup>SURE</sup>IQ pleine",
            "details"    : "La file d'attente des préréglages <sup>SURE</sup>IQ ne peut contenir que {1} types d'organes de la liste principale. Cette limite est dépassée pour les organes suivants :",
            "solution"    : "Si vous souhaitez ajouter un autre préréglage <sup>SURE</sup>IQ pour ce type d'organe, supprimez d'abord une autre entrée.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "File d'attente des préréglages <sup>SURE</sup>IQ pleine",
            "details"    : "La file d'attente des préréglages <sup>SURE</sup>IQ ne peut contenir que {1} cartes d'un type d'organe spécifique de la liste principale. Cette limite est dépassée pour les organes suivants :",
            "solution"    : "Si vous souhaitez ajouter un autre préréglage <sup>SURE</sup>IQ pour cet organe, supprimez d'abord une autre entrée.",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "File d'attente des préréglages <sup>SURE</sup>Exposure pleine",
            "details"    : "La file d'attente des préréglages <sup>SURE</sup>Exposure ne peut contenir que {1} cartes de la liste principale.<sup>SURE</sup>Exposure dépasse la limite de cette file d'attente et ne peut pas être pris en charge.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Préréglage <sup>SURE</sup>Exposure incorrect",
            "details"    : "<sup>SURE</sup>Exposure contient un type de patient non valide.Les types de patient valides pris en charge pour <Nom <sup>SURE</sup>Exposure> sont Adulte et Enfant.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Préréglage <sup>SURE</sup>Exposure incorrect",
            "details"    : "<sup>SURE</sup>Exposure contient un type d'organe non valide.Les types d'organe valides pris en charge pour <Nom <sup>SURE</sup>Exposure> sont Tête, Cou, ECG ou Tous.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "File d'attente des préréglages <sup>SURE</sup>Exposure pleine",
            "details"    : "La file d'attente des préréglages <sup>SURE</sup>Exposure ne peut contenir que {1} cartes d'un type d'organe spécifique de la liste principale. Cette limite est dépassée pour les organes suivants :",
            "solution"    : "Si vous souhaitez ajouter un autre préréglage <sup>SURE</sup>Exposure pour cet organe, supprimez d'abord une autre entrée.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Préréglage de contraste incorrect",
            "details"    : "Le préréglage de contraste contient un type de patient non valide.Les types de patient valides pris en charge pour le préréglage de contraste sont Adulte et Enfant.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "<sup>SURE</sup>Exposure manquant",
            "details"    : "Un préréglage <sup>SURE</sup>Exposure au moins doit être présent pour chaque type d'organe et de patient.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "Échec de paramétrage de la position",
            "details"     : "Une erreur inattendue s'est produite.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "Le nom d'identification de cet équipement est déjà enregistré.",
            "solution"    : "Changez le nom.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Le nom d'identification de cet équipement est trop long.",
            "solution"  : "Sélectionnez un nom de moins de 40 caractères.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "Le scanner en cours d'ajout contient-il des historiques ?",
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
            "overview"    : "Préréglage <sup>SURE</sup>IQ en double",
            "details"    : "Un autre préréglage <sup>SURE</sup>IQ du même nom est déjà disponible dans l'historique ; ce préréglage ne peut pas être ajouté.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Préréglage <sup>SURE</sup>Exposure en double",
            "details"    : "Un autre préréglage <sup>SURE</sup>Exposure du même nom est déjà disponible dans l'historique ; ce préréglage ne peut pas être ajouté.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Préréglage de contraste en double",
            "details"    : "Un autre préréglage de contraste du même nom est déjà disponible dans l'historique ; ce préréglage ne peut pas être ajouté.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Préréglage <sup>SURE</sup>Exposure en double",
            "details"    : "Un autre <sup>SURE</sup>Exposure du même nom est déjà ajouté automatiquement à la liste principale en tant que protocole joint. Il ne peut pas être remplacé.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Préréglage <sup>SURE</sup>IQ en double",
            "details"    : "Un autre <sup>SURE</sup>IQ du même nom est déjà ajouté automatiquement à la liste principale en tant que protocole joint. Il ne peut pas être remplacé.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Préréglage de contraste en double",
            "details"    : "Un autre préréglage de contraste du même nom est déjà ajouté automatiquement à la liste principale en tant que protocole joint. Il ne peut pas être remplacé.",
            "solution"    : "",
            "calladmin"    : "Veuillez contacter le service Toshiba pour obtenir de l'aide."
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
            "overview"    : "Préréglage Voice en double",
            "details"    : "Un autre préréglage Voice portant le même nom est déjà disponible dans la liste principale des protocoles suivants ",
            "solution"    : "Si vous souhaitez remplacer le protocole existant dans la liste principale par l'un des protocoles ci-dessus, vous devez d'abord le supprimer de la liste.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "File d'attente des préréglages Voice pleine",
            "details"    : "La file d'attente des préréglages Voice ne peut contenir que 20 langues de la liste principale. Cette limite est dépassée pour les langues suivantes :",
            "solution"    : "Si vous souhaitez ajouter un autre préréglage Voice pour la langue, supprimez d'abord une autre entrée.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "File d'attente des préréglages Voice pleine",
            "details"    : "La file d'attente des préréglages Voice ne peut contenir que 10 cartes d'une langue spécifique de la liste principale. Cette limite est dépassée pour la langue suivante :",
            "solution"    : "Si vous souhaitez ajouter un autre préréglage Voice pour cette langue, supprimez d'abord une autre entrée.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Préréglage Voice manquant",
            "details"    : "La file d'attente des préréglages Voice doit contenir les 6 langues suivantes :<BR><BR>Japonais<BR>Anglais<BR>Chinois<BR>Coréen<BR>Espagnol<BR>Portugais",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Préréglage Voice manquant",
            "details"    : "Chaque langue de la file d'attente des préréglages Voice doit contenir les 5 commandes Voice suivantes.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Préréglage Voice en double",
            "details"    : "Un autre préréglage Voice portant le même nom figure déjà dans l'historique ; ce préréglage ne peut donc pas être ajouté.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "La file d'attente des préréglages <sup>SURE</sup>IQ n'atteint pas le nombre minimal de cartes",
            "details"    : "La file d'attente des préréglages <sup>SURE</sup>IQ doit contenir au moins {1} cartes d'un type d'organe spécifique de la liste principale. Cette limite n'est pas atteinte pour les organes suivants :",
            "solution"    : "Ajoutez le préréglage <sup>SURE</sup>IQ de cet organe.",
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