var stringSetting =
{
    protocolmanagement: "Gestión protocolos",

    tab: {
        requestlist : "Lista solicitudes",
        history : "Lista historial",
        transfer : "Lista de transferencias",
        app_setting :"Config aplicac",
        master: "Lta maestra",
        position: "Protocol Positions"
    },

    menu : {
        identifing:'Configuración el equipo',
        filter : {
            CheckAll : "TODO",
            SortAscending : "Clasificación ascendente",
            SortDescending : "Clasificación descendente",
            Filter : "Filtro"
        }
    },

    master:
    {
        button:
        {
            Next        : "Sig",
            Back        : "Volver",
            Cancel      : "Cancel",
            Approve     : "Aprobar",
            Finish      : "Finaliz",
            UserProtocol    : "Protoc usuario",
            ServiceProtocol : "Protoc servicio",
            Move        : "Mover",
            OKbtn       : "Aceptar",
            Setasdefault    : "Establecer como predeterminado",
            Reset    : "Reset"
        },
        tab:
        {
        	Adult       :"Adulto",
        	Child       :"Niño",
        	Trauma      :"Trauma",
            GroupA      :"Grupo A",
            GroupB      :"Grupo B",
            GroupC      :"Grupo C",
        },
        title:
        {
            Start                   : "Comenzar a crear la lista general del protocolo",
            CreationEP              : "Lista general para el plan del examen",
            CreationSureIQ          : "Lista general para <sup>SURE</sup>IQ",
            CreationSureExp         : "Lista general para <sup>SURE</sup>Exposure",
            CreationCP              : "Lista general para el ajuste predeterminado de contraste",
            CreationVoice           : "Lista general de ajustes predeterminados de Voice",
            Setting                 : "Configuración de posición para el plan del examen",
            SelectOther             : "Lista general para otros ajustes",
            Approving               : "Confirmar lta maestra antes aprobar",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Completar la creación de la lista general del protocolo",
            title_confirm           : "Confirm",
            title_approve           : "Aprobar",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols...",
            MasterList              : "Lta maestra",
            OriginalList            : "Lta original",
            Parameters              : "parámetros",
            Parameter_Name			: "Nom parámetro",
        },
        statusLab:
        {
            Start                   : "Inicio",
            Creation                : "Gen<br> lista maestra",
            Setting                 : "Configuración de la<br> posición",
            SelectOther             : "Selección de<br> otros ajustes",
            Approving               : "Aprobando",
            Finish                  : "Finaliz"
        },
        column:{
            type                    :"Protoc",
            patienttype             :"Tipo pac",
            name                    :"Nombre",
            date                    :"Fecha",
            scanner                 :"Escáner",
        },
        columns:
        {
            patientType                : "Tipo pac",
            bodyRegion                 : "Reg corporal",
            masterList                 : "Lta maestra",
            machineName                : "Nombre escáner",
            language                   : "Idioma",
        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Agregar tds protoc a lta maestra",
            addSelected               : "Agreg a lta maestra",
            checkParameters           : "Compr parámetros",
            removeFromList            : "Eliminar de lta maestra",
        },
        message:
        {
            start_text1            : "En esta página puede crear una lista general de protocolos.",
            start_text2            : "Clic en [Sig] para comenzar.",
            finish_text1           : "La lista general del protocolo se ha creado correctamente.",
            finish_text2           : "Pulse [Finalizar] y revise los protocolos aprobados en la lista de historial.",
            confirm_to_approve     : "Pulse [Aprobar] para iniciar la aprobación.",
            confirmview_text1      : "La lta maestra se aprobará y distribuirá a los escáneres CT",
            confirmview_text2      : "¿Desea continuar?",

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
        title_request : "Solicitudes",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Ajuste predeterminado Voice"

        },
        column: {
            type : "Protocolo",
            patienttype : "Tipo paciente",
            name : "Nombre",
            version : "Versión",
            scanner : "Escáner",
            user : "Usuario",
            date : "Fecha"
        },
        button: {
            approve : "Aprobar",
            keeplocally : "Mant local",
            reject : "Rechazar",
            deleted : "Eliminar",
            refresh : "Actualizar",
            close: "Cerrar",
            backtothelist : "Volver a lta"
        },
        event: {
            approve : "Aprobado",
            keeplocally : "mant",
            reject : "Rechazar",
            deleted : "Eliminar"
        },
        msg_requesttime :
            "Lista solicitudes actualizada, haga clic en botón [Actualizar]."
    },
    UserSpecificName:
    {
        title    : "Configuración el equipo",
        LabelNodata    : "No Data",
        emptyText       : 'Introduzca el nombre.',
        button  :
        {
            close : "Cerrar",
            save : "Guardar"
        }
    },
    compare : {
        title_detail : "Detalle",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Mostrar solo diferencia",
            showall : "Mostrar todo",
            references: "References",
            save : 'Guardar',
            close : 'Cerrar'
        },
        label : {
            console_comments : "Comentario (creador protocolo)",
            approver_comments : "Comentario (encarg aprob protocolo)",
        },
        list : {
            ScanList : "ScanList",
            SureIQList : "SureIQList",
            SureExposureList : "SureExposureList",
            ContrastPresetList : "ContrastPresetList"
        }
    },

    comments : {
        title_confirm  : "Confirmar",
        text : {
            approve : "Este protocolo se aprobará para distribución en todos los escáneres.",
            deleteProtocl : "Este protocolo se eliminará y borrará de todos los escáneres.",
            rejectApproval : "Este protocolo se rechazará y borrará del escáner de origen.",
            rejectDeletion : "Este protocolo no se eliminará y se restaurará en el escáner de origen.",
            keep : "Este protocolo se aprobará para uso local en el escáner de origen.",
            asker : "¿Desea continuar?",
            transfer : "Este protocolo se transferirá a otros grupos.",
            systemComment: "[Comentario generado por el sistema]",
            reason: " La solicitud de transferencia de protocolo se ha enviado a ",
            autoApproval: "Aprobación automát. debida a aprobación de  {1}.",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Aprobación automát. junto con {1} con el mismo órgano.",
            autoRejectReason: "Rechazo automát. junto con {1} con el mismo órgano."
        },
        label : {
            comments : "Comentario",
            reminder : "Escriba los comentarios.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Este protocolo se transferirá a otros grupos.<br>Seleccione los grupos a los que quiere transferir este protocolo",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Grupo',
            model: 'Modelo',
            softwarVersion: 'Versión de software'
        },
        button : {
            ok : "Aceptar",
            cancel : "Cancelar",
            transferOption : "Transferir protocolo a otros grupos (opción)"
        }
    },

    backupDialog: {
        menuItem: "Copia de seguridad de los datos del protocolo",
        backupTitle: "Copia de seguridad de los datos del protocolo",
        backupLocation: "Ubicación de la copia de seguridad",
        backupBtn: "Copia de seguridad",
        clearLogBtn: "Borrar registro",
        backupLogs: "Registro de la copia de seguridad",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Cerrar"
    },
    status_tip: {
        ApprovalRequested:"Aprobac solicitada:",
        ApprovalAccepted:"Aprobado:",
        LocalUseAccepted:"Aprobado para uso local:",
        DeletionRequested:"Eliminac solicitada:",
        DeletionAccepted:"Eliminado:",
        ApprovalRejected:"Aprobac rechazada:",
        DeletionRejected:"Eliminación rechazada:",
        Transferred :"Transferred:",
        Restored: "Restablecido:",
        ApprovalRequestedValue:"El protocolo se creó/editó en TC.",
        ApprovalAcceptedValue:"Uso del protocolo aceptable en todos los modelos/versiones TC similares.",
        LocalUseAcceptedValue:"Uso del protocolo aceptable solo en el TC específico.",
        DeletionRequestedValue:"El protocolo se eliminó en TC.",
        DeletionAcceptedValue:"El protocolo se eliminará de todos los modelos/versiones TC similares.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"El protocolo no se aprobó. Se recuperará en el estado anterior en TC.",
        DeletionRejectedValue:"La eliminación del protocolo no se aprobó. Se recuperará al estado anterior en TC.",
        TransferredValue :"The protocol was distributed to use in another model/version CT. ",
        RestoredValue: "El protocolo se restauró en TC. Se puede usar."
    },
    history : {
        title_history : "Historiales",
        title_transfer : "Transfers",
        title_protocolhistory : "Historial de protocolos",
        title_comfirm_header : "Confirmar",
        text_search:"Buscar",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Ocultar elem eliminad",
            showdeleteitems : "Mostrar elem eliminad",
            backtoHistoryList : "Volver a lta",
            backtoTransferList : "Atrás",
            expandAll: "Expandir td",
            collapseAll: "Contraer td",
            hide : "Ocultar",
            show : "Mostrar",
            restore : "Restablecer",
            deleted : "Eliminar",
            ok : "Aceptar",
            cancel : "Cancelar",
            transfer : "Transferir",
            showall :"Mostrar todo",
            NextHistories : "Mostrar más",

        },
        column : {
            type : "Protocolo",
            patientype : "Tipo paciente",
            name : "Nombre",
            date : "Fecha",
            source_scanner : "Escáner original",
            user : "Usuario",
            scanners:"escáneres",
            event: 'Suceso',
            comment: 'Comentario'
        },
        cell_content : {
            event_create: "Crear",
            event_edit: "Editar",
            event_approve: "Aprobar",
            event_delete: "Eliminar",
            event_restore: "Restablecer",
            event_keep_locally: "Mant local",
            event_reject: "Rechazar",
            event_transfer: "Transferir",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "Lista historiales actualizada, haga clic en botón [Actualizar].",
            comfirm_commants : "Comentarios",
            comfirm_commants_null : "Escriba los comentarios.",
            restore_comfirm_text1 : "Este protocolo se restablecerá y distribuirá a todos los escáneres.",
            restore_comfirm_text2 : "¿Desea continuar?",
            delete_comfirm_text1 : "Este protocolo se borrará inmediatamente y distribuirá a todos los escáneres.",
            delete_comfirm_text2 : "¿Desea continuar?"
        },
        action_event: {
            Request:"solicitud",
        }
    },

    comparison : {
        button : {
            cancel :"Cancelar",
            check_params :"Comprobar parámetr",
            ok :"Aceptar",
            select_scan_mode :"Seleccionar modo explor"
        },
        title : {
            selection : "Seleccionar protocol comparado",
            detail : "Detalle",
            scan_mode : "Seleccionar modo explor comparad"
        }
    },

    app_setting : {
        button : {
            add :"Agregar",
            apply :"Aceptar",
            cancel :"Cancelar",
            deleted :"Eliminar",
            disable :"Desactivar",
            edit :"Editar",
            enable :"Activar",
            ok :"Aceptar",
            save : "Guardar",
            execute: "Iniciar",
            import: "Import",
            export: "Export",
            close: "Cerrar"
        },
        column : {
            distribution :"Distribución",
            distribution_machine_name :"Escáner distribución",
            distribution_scanner :"Escáner distribución",
            group_name :"Nombre",
            key :"Tecla",
            machine_name :"Escáner origen",
            name :"Nombre",
            scanner :"Escáner origen",
            software_version :"Versión software",
            ep_type :"EPType",
            source_machine_name :"Escáner origen",
            source_scanner :"Escáner origen",
            system_name :"Nombre sistema",
            value :"Valor",
            description :"Descripción",
            association: 'Association',
            guideline:'Guideline',
        },
        label : {
            initialize_setup:"Creador protoc maestro",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Idioma",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modalidad",
            modality_desc :"Nombre de modalidad",
            model_name :"Nombre modelo",
            model_name_desc :"Nombre de modelo",
            name :"Nombre",
            name_desc :"Identificador grupo protocolos",
            software_version :"Versión software",
            software_version_desc :"Versión actual del software",
            ep_type :"EPType",
            ep_type_desc :"EPType actual",
            system_name :"Nombre sistema",
            system_name_desc :"Nombre del sistema",
            vendor :"Proveedor",
            vendor_desc :"Nombre proveedor",
            x_ray_mode :"Modo rayos X",
            x_ray_mode_desc :"Modo rayos X",
            protocol_share_across_model:"Uso comp protoc en modelo",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Aprobación lote",
            done:"Done",
            succeed:"Aprobación de lotes correctamente finalizada.",
            cancel:"Aprobación de lotes cancelada.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Algunos protocolos no se aprobaron.",
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
            rpid_display:"Soporte RPID RadLex",
            reference_display:"Referencia directr protocolo",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols...",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "Config aplicac actualizada, haga clic en botón [Actualizar].",
//          deleted :"Este ajuste se borrará del archivo de configuración.",
            protocol_pool_deleted :"Este ajuste se borrará del archivo de configuración.",
            sources_canner_deleted :"Este ajuste se borrará del archivo de configuración.",
            distribution_scanner_deleted :"Este ajuste se borrará del archivo de configuración.",
            delete_continue :"¿Desea continuar?",
            console_ok_save_warningone:"Algún cambio no se guardó.",
            console_ok_save_warningtwo:"¿Desea guardar los cambios?",
            console_delete_machine_waring:"El escáner de origen se borrará.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",

            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",

            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Escáner origen",
            distribution_setting :"Escáner distribución",
            other_setting :"Otros",
            pool_setting :"Grupo protocolo",
            language_setting :"Language Config",
            setting :"Config",
            display_setting:"Uso comp protoc en modelo",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Aprobando...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"Soporte RPID RadLex",
            reference_setting:"Referencia directr protocolo"

        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Protoc usuario",
            ServiceProtocol : "Protoc servicio",
            make_change:'Make Changes',
            active_change:'Activate changes',
            undo_change:'Undo Changes',
            leave:'Leave',
            stay:'Stay'
        },
        tab:
        {
            Adult       :"Adulto",
            Child       :"Niño",
            Trauma      :"Trauma",
            GroupA      :"Grupo A",
            GroupB      :"Grupo B",
            GroupC      :"Grupo C",
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
                overview    : "Aprobac",
                details        : "aprobac",
                details2    : "aprobado"
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
                overview    : "Eliminac",
                details        : "eliminac",
                details2    : "eliminado"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "restablecido"
            },
            approvetransfer: {
                overview    : "Approval or Transferring",
                details        : "approval or transfer",
                details2    : "approved or transfered"
            },
            transfer: {
                overview    : "Transferring",
                details        : "Transferir",
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
            "overview"    : "Error al adquirir lic",
            "details"    : "Error al adquirir licencia, inicio de aplicación cancelado.",
            "solution"    : "Compruebe la licencia.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
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
            "overview"    : "El protocolo {0} falló",
            "details"    : "El protocolo ha sido utilizado por otro usuario y, por tanto, se canceló.",
            "solution"    : "compruebe el historial.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Este protocolo ha sido actualizado durante {0}, por tanto, el protocolo {1} se canceló.",
            "solution"    : "Inténtelo de nuevo más tarde.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Los archivos de este protocolo no son legibles, por tanto, el protocolo {0} se canceló.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "No se pudo conectar con el servidor de archivos, por tanto, el protocolo {0} se canceló.",
            "solution"    : "Inténtelo de nuevo más tarde.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Error imprevisto en servidor de protocolos.",
            "solution"    : "Inténtelo más tarde.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Inténtelo de nuevo más tarde.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "No se pudo restaurar el protocolo",
            "details"    : "Ya existe otro protocolo con la misma ubicación.",
            "solution"    : "",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Algunos archivos están en uso, por tanto, el protocolo {0} se canceló.",
            "solution"    : "Cierre los archivos en uso e inténtelo de nuevo.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "Nombres de sistema entre escáner CT y servidor de protocolos no coinciden, recuperación de protocolo cancelada.",
            "solution"    : "Cambie nombre sistema en servidor protocolos.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "Nombres de modelo entre escáner CT y servidor de protocolos no coinciden, recuperación de protocolo cancelada.",
            "solution"    : "Cambie nombre modelo en el servidor protocolos.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "Nombres de modos rayos X entre escáner CT y servidor de protocolos no coinciden, recuperación protocolo cancelada.",
            "solution"    : "Cambie nombre modo rayos X en serv protoc",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "Nombres versiones software entre escáner CT y servidor de protocolos no coinciden, recuperación de protocolo cancelada.",
            "solution"    : "Cambie versión de software en servidor protocolos.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "El archivo de resumen es ilegible, adquisición de protocolo cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "El archivo registro cambios es ilegible, adquisición de protocolo cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "El archivo de historial es ilegible, adquisición de protocolo cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "El archivo resumen no se encuentra, adquisición de protocolo cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Error al adquirir protoc",
            "details"    : "Este protocolo ha sido aprobado por otro usuario.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "No se pudo recuperar el protocolo",
            "details"    : "No se recibió el historial del protocolo.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el identificador de escáner en blanco.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el nombre proveedor en blanco.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el nombre de modalidad en blanco.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el nombre de sistema en blanco.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el nombre de modelo en blanco.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el modo rayos X en blanco.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene la versión de software en blanco.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Seleccione identificador del escáner.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Rellene el escáner origen en blanco.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Este escáner ya está registrado.",
            "solution"    : "Cambie nombre escáner.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "No puede def valor blanco",
            "solution"    : "Seleccione el escáner origen.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "No puede desactivar tds escáneres distribución",
            "solution"    : "Active 1 escáner de distribución como mínimo.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "El nombre de este escáner contiene caracteres no válidos, utilice solo caracteres [0-9], [a-Z] y [ -_ ].",
            "solution"    : "Dé un nuevo nombre al escáner.",
        },

        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "Error en conf aplic",
              "details"    : "Este escáner ya está registrado.",
              "solution"    : "Cambie nombre de escáner",
              "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "Error en conf aplic",
            "details"    : "Algunos archivos en uso, actualización cancelada.",
            "solution"    : "Cierre archivos en uso y vuelva a intentarlo.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "El mismo identificador escáner ya registrado.",
            "solution"    : "Cambie nombre identificador escáner.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "Error en conf aplic",
            "details"    : "El mismo grupo protocolos ya está registrado, actualización cancelada.",
            "solution"    : "Compruebe el otro grupo protocolos.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "No se pudo configurar la aplicación",
            "details"    : "El programa está en uso, por tanto, no se pudo registrar la configuración.",
            "solution"    : "Espere un momento y vuelva a intentarlo.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "No se pudo configurar la aplicación",
            "details"    : "No se pudo editar el archivo de configuración, por tanto, la transferencia de los historiales de los protocolos se canceló.",
            "solution"    : "Compruebe el estado del archivo de configuración e inténtelo de nuevo.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "No se pudo configurar la aplicación",
            "details"    : "Se ha agotado el tiempo de espera para el programa.",
            "solution"    : "Inténtelo de nuevo más tarde.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "No se pudo configurar la aplicación",
            "details"    : "Se ha producido un error desconocido.",
            "solution"    : "Inténtelo de nuevo más tarde.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
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
            "overview"    : "Error en conf aplic",
            "details"    : "El archivo configuración se está usando, actualización cancelada.",
            "solution"    : "Cierre archivo en uso y vuelva a intentarlo.",
            "calladmin"    : "Si el problema persiste, contacte con servicio Toshiba"
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "Error en conf aplic",

            "solution"    : "Cierre el archivo en uso e inténtelo de nuevo.",
            "calladmin"    : "Si el problema persiste, contacte con el servicio de Toshiba."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "Error en conf aplic",
            "details"    : "El archivo de configuración no se encuentra, actualización cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "Error en conf aplic",
            "details"    : "El archivo de configuración es ilegible, actualización cancelada.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "No se pudo configurar la aplicación",
            "details"    : "El escáner ya existe, por tanto, no se pudo añadir un nuevo escáner.",
            "solution"    : "Compruebe el archivo de configuración e inténtelo de nuevo.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
		
        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "No se pudo configurar el equipo",
              "details"    : "Otro programa está usando el archivo de configuración, por tanto, la configuración del equipo se canceló.",
              "solution"    : "Cierre el archivo de configuración e inténtelo de nuevo.",
              "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "No se pudo configurar el equipo",
              "details"    : "Otro programa ha editado el archivo de configuración, por tanto, la configuración del equipo se canceló.",
              "solution"    : "Actualice la página e inténtelo de nuevo más tarde.",
              "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "No se pudo configurar el equipo",
              "details"    : "No se pudo leer el archivo de configuración, por tanto, la configuración del equipo se canceló.",
              "solution"    : "Compruebe el archivo de configuración e inténtelo de nuevo.",
              "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },		

        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "This protocol {0} was already transferred to {1}, therefore protocol transferring was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "El protocolo {0} falló",
            "details"    : "Error imprevisto en servidor de protocolos.",
            "solution"    : "",
            "calladmin"    : "Contacte con servicio Toshiba."
        },
        ERR80004 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "protocol sharing state set in 'protocolmanagement.xml' is off",
            "solution"    : "Please check the file 'ProtocolManagement.xml'.",
            "calladmin"    : "Si el problema persiste, póngase en contacto con el servicio técnico de Toshiba."
        },
        ERR0005 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>Exposure",
            "details"    : "Ya existe otro ajuste predeterminado de <sup>SURE</sup>Exposure con el mismo nombre en la lista general de los siguientes protocolos:  ",
            "solution"    : "Si desea sustituir el protocolo existente en la lista general con los protocolos anteriores, elimine el protocolo existente de la lista general y sustitúyalo por los protocolos anteriores.",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>IQ",
            "details"    : "Ya existe otro ajuste predeterminado de <sup>SURE</sup>IQ con el mismo nombre en la lista general de los siguientes protocolos:",
            "solution"    : "Si desea sustituir el protocolo existente en la lista general con los protocolos anteriores, elimine el protocolo existente de la lista general y sustitúyalo por los protocolos anteriores.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de contraste",
            "details"    : "Ya existe otro ajuste predeterminado de contraste con el mismo nombre en la lista general de los siguientes protocolos: ",
            "solution"    : "Si desea sustituir el protocolo existente en la lista general con los protocolos anteriores, elimine el protocolo existente de la lista general y sustitúyalo por los protocolos anteriores.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "Falta <sup>SURE</sup>IQ en el escanograma",
            "details"    : "La lista general actual no contiene <sup>SURE</sup>IQ para escanograma. Añada el <sup>SURE</sup>IQ para que pueda realizarse el escanograma.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Ajuste predeterminado de <sup>SURE</sup>IQ incorrecto",
            "details"    : "<sup>SURE</sup>IQ contiene un tipo de paciente no válido.El tipo de paciente admitido para <<sup>SURE</sup>IQ Name> es Adulto.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0010 : {
        	"status"    : "error",
            "overview"    : "Patient Type and Same SureIQ",
            "details"    : "SureIQ which patient type is Child can not be added into Master List.There is a same SureIQ existed in the MasterList, and can not add to Masterlist again.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0011 : {
            "status"    : "error",
            "overview"    : "La cola de ajustes predeterminados de <sup>SURE</sup>IQ está llena",
            "details"    : "La cola de ajustes predeterminados de <sup>SURE</sup>IQ solo tiene capacidad para {1} tipos de órganos en la lista general. El límite se ha excedido para los siguientes órganos:",
            "solution"    : "Si desea añadir más ajustes predeterminados de <sup>SURE</sup>IQ para el tipo de órgano, deberá eliminar primero una entrada.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "La cola de ajustes predeterminados de <sup>SURE</sup>IQ está llena",
            "details"    : "La cola de ajustes predeterminados de <sup>SURE</sup>IQ solo tiene capacidad para {1} tarjetas para cada tipo de órgano específico en la lista general. El límite se ha excedido para los siguientes órganos:",
            "solution"    : "Si desea añadir más ajustes predeterminados de <sup>SURE</sup>IQ para este órgano, deberá eliminar primero una entrada.",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "La cola de ajustes predeterminados de <sup>SURE</sup>Exposure está llena",
            "details"    : "La cola de ajustes predeterminados de <sup>SURE</sup>Exposure solo tiene capacidad para {1} tarjetas en la lista general.Se ha superado el límite para la cola de <sup>SURE</sup>Exposure.",
            "solution"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia.",
            "calladmin"    : ""
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Ajuste predeterminado de <sup>SURE</sup>Exposure incorrecto",
            "details"    : "<sup>SURE</sup>Exposure contiene un tipo de paciente no válido.El tipo de paciente admitido para <sup>SURE</sup>Exposure es Adulto o Niño.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Ajuste predeterminado de <sup>SURE</sup>Exposure incorrecto",
            "details"    : "<sup>SURE</sup>Exposure contiene un tipo de órgano no válido.Los tipos de órganos válidos que admite <sup>SURE</sup>Exposure son: Cabeza, Cuello, ECG o Todo.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "<La cola de ajustes predeterminados de <sup>SURE</sup>Exposure está llena",
            "details"    : "La cola de ajustes predeterminados de <sup>SURE</sup>Exposure solo tiene capacidad para {1} tarjetas para cada tipo de órgano específico en la lista general. El límite se ha excedido para los siguientes órganos:",
            "solution"    : "Si desea añadir más ajustes predeterminados de <sup>SURE</sup>Exposure para este órgano, deberá eliminar primero una entrada.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Ajuste predeterminado de contraste incorrecto",
            "details"    : "El ajuste predeterminado de contraste contiene un tipo de paciente no válido.El tipo de paciente admitido para el ajuste predeterminado de contraste es Adulto o Niño.",
            "solution"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia.",
            "calladmin"    : ""
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "Falta <sup>SURE</sup>Exposure",
            "details"    : "Debe existir al menos un ajuste predeterminado de contraste <sup>SURE</sup>Exposure para cada tipo de órgano y tipo de paciente.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "No se pudo configurar la posición",
            "details"     : "Error inesperado.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "Ya existe otro equipo registrado con este nombre identificativo.",
            "solution"    : "Cambie el nombre.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "El nombre identificativo de este equipo es demasiado largo.",
            "solution"  : "Seleccione un nombre que no supere los 40 caracteres.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "¿Tiene el escáner de TC añadido historias?",
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
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>IQ",
            "details"    : "Ya existe otro ajuste predeterminado de <sup>SURE</sup>IQ con el mismo nombre en el historial, por lo tanto, no puede añadirse.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>Exposure",
            "details"    : "Ya existe otro ajuste predeterminado de <sup>SURE</sup>Exposure con el mismo nombre en el historial, por lo tanto, no puede añadirse.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de contraste",
            "details"    : "Ya existe otro ajuste predeterminado de contraste con el mismo nombre en el historial, por lo tanto, no puede añadirse.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>Exposure",
            "details"    : "Ya se ha añadido automáticamente otro <sup>SURE</sup>Exposure con el mismo nombre a la lista general como protocolo adjunto. No puede sobrescribirse.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Duplicar ajuste predeterminado de <sup>SURE</sup>IQ",
            "details"    : "Ya se ha añadido automáticamente otro <sup>SURE</sup>IQ con el mismo nombre a la lista general como protocolo adjunto. No puede sobrescribirse.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Duplicar ajuste predeterminado de contraste",
            "details"    : "Ya se ha añadido automáticamente otro ajuste predeterminado de contraste con el mismo nombre a la lista general como protocolo adjunto. No puede sobrescribirse.",
            "solution"    : "",
            "calladmin"    : "Póngase en contacto con el servicio técnico de Toshiba para obtener asistencia."
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
            "overview"    : "Duplicar ajuste predeterminado de Voice",
            "details"    : "Ya existe otro ajuste predeterminado de Voice con el mismo nombre en la lista general de los siguientes protocolos: ",
            "solution"    : "Si desea sustituir el protocolo existente en la lista general con los protocolos anteriores, elimine el protocolo existente de la lista general y sustitúyalo por los protocolos anteriores.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "Cola de ajustes predeterminados de Voice llena",
            "details"    : "La cola de ajustes predeterminados de Voice solo tiene capacidad para 20 idiomas en la lista general. El límite se ha excedido para los siguientes idiomas:",
            "solution"    : "Si desea añadir más ajustes predeterminados de Voice para este idioma, deberá eliminar primero una entrada.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "Cola de ajustes predeterminados de Voice llena",
            "details"    : "La cola de ajustes predeterminados de Voice solo tiene capacidad para 10 cards para cada idioma específico en la lista general. El límite se ha excedido para los siguientes idiomas:",
            "solution"    : "Si desea añadir más ajustes predeterminados de Voice para este idioma, deberá eliminar primero una entrada.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Falta ajuste predeterminado de Voice",
            "details"    : "La cola de ajustes predeterminados de Voice debe contener los siguientes 6 idiomas:<BR><BR>Japonés<BR>Inglés<BR>Chino<BR>Coreano<BR>Español<BR>Portugués.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Falta ajuste predeterminado de Voice",
            "details"    : "Cada idioma en la cola de ajustes predeterminados de Voice debe contener los siguientes 5 comandos de Voice.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Duplicar ajuste predeterminado de Voice",
            "details"    : "Ya existe otro ajuste predeterminado de Voice con el mismo nombre en la lista de historial, por lo tanto, no puede añadirse.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "La cola del ajuste predeterminado <sup>SURE</sup>IQ no alcanza el número mínimo de cards",
            "details"    : "La cola del ajuste predeterminado <sup>SURE</sup>IQ debe acomodar al menos {1} cards en un tipo de órgano específico en la lista general. Este límite no se corresponde con los siguientes órganos:",
            "solution"    : "Establezca añadir ajuste predeterminado <sup>SURE</sup>IQ para este órgano.",
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