var stringSetting =
{
    protocolmanagement: "Gestão protocolos",

    tab: {
        requestlist : "ListaPedidos",
        history : "Lista histór",
        transfer : "Lista de transferências",
        app_setting :"Config",
        master: "ListaMestre",
        position: "Protocol Positions"
    },

    menu : {
        identifing:'Configuração do equipamento',
        filter : {
            CheckAll : "TUDO",
            SortAscending : "Ordem ascendente",
            SortDescending : "Ordem descendente",
            Filter : "Filtro"
        }
    },

    master:
    {
        button:
        {
            Next        : "Próx",
            Back        : "Volt",
            Cancel      : "Cancelar",
            Approve     : "Aprovar",
            Finish      : "Concl",
            UserProtocol    : "Protocolo usu",
            ServiceProtocol : "ProtocoloServiço",
            Move        : "Mover",
            OKbtn       : "OK",
            Setasdefault    : "Definir como padrão",
            Reset    : "Reset"
        },
        tab:
        {
        	Adult       :"Adult",
        	Child       :"Infan",
        	Trauma      :"Trauma",
            GroupA      :"Grupo A",
            GroupB      :"Grupo B",
            GroupC      :"Grupo C",
        },
        title:
        {
            Start                   : "Começar a criar a Lista principal de protocolos",
            CreationEP              : "Lista principal para Plano de exame",
            CreationSureIQ          : "Lista principal para <sup>SURE</sup>IQ",
            CreationSureExp         : "Lista principal para <sup>SURE</sup>Exposure",
            CreationCP              : "Lista principal da predefinição de contraste",
            CreationVoice           : "Lista principal para a predefinição Voice",
            Setting                 : "Ajuste da posição para Plano de exame",
            SelectOther             : "Lista principal para outras configurações",
            Approving               : "Confirm Lista mestre antes aprovação",
            FinishProtocolList      : "Protocols List",
            FinishFinalizeSetup     : "Finalizar criação de Lista principal de protocolos",
            title_confirm           : "Confirm",
            title_approve           : "Aprovar",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "ListaMestre",
            OriginalList            : "ListaOriginal",
            Parameters              : "parâmetros",
            Parameter_Name			: "Nome parâmetro",
        },
        statusLab:
        {
            Start                   : "Iníc",
            Creation                : "Criação <br> Lista mestre",
            Setting                 : "Ajuste de<br> posição",
            SelectOther             : "Outra seleção<br> de configurações",
            Approving               : "Aprovar",
            Finish                  : "Concl"
        },
        column:{
            type                    :"Protcolo",
            patienttype             :"TipoPaciente",
            name                    :"Nome",
            date                    :"Data",
            scanner                 :"Nome scanner",
        },
        columns:
        {
            patientType                : "TipoPaciente",
            bodyRegion                 : "Região anat",
            masterList                 : "ListaMestre",
            machineName                : "Nome scanner",
            language                   : "Idioma",
            
        },
        combobox:
        {
            all                        : "All",
        },
        menu:
        {
            addAll                    : "Adic protocolos à Lista mestre",
            addSelected               : "Adc à Lista mestre",
            checkParameters           : "Ver parâmetros",
            removeFromList            : "Remover da Lista mestre",
        },
        message:
        {
            start_text1            : "Você pode criar a Lista principal de protocolos nesta página.",
            start_text2            : "Cliquem em [Próx] p/ começar.",
            finish_text1           : "A Lista principal de protocolos foi criada.",
            finish_text2           : "Clique em [Concl] e verifique os protocolos aprovados na Lista de histórico.",
            confirm_to_approve     : "Clique em [Aprovar] p/ iniciar processo aprov",
            confirmview_text1      : "Lista mestre será aprovada e distribuída p/ scanners TC.",
            confirmview_text2      : "Deseja continuar?",

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
        title_request : "Pedidos",
        protocol_type:
        {
            ExamPlan         : "ExamPlan",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "<sup>SURE</sup>Exposure",
            ContrastPreset     : "ContrastPreset",
            VoicePreset     : "Predefinição Voice"

        },
        column: {
            type : "Protocolo",
            patienttype : "TipoPaciente",
            name : "Nome",
            version : "Versão",
            date : "Data",
            scanner : "Scanner",
            user : "Usuá"
        },
        button: {
            approve : "Aprovar",
            keeplocally : "ManterLocalm",
            reject : "Rejeit",
            deleted : "Excl",
            refresh : "Atualiz",
            close: "Fechar",
            backtothelist : "Voltar à lista"
        },
        event: {
            approve : "approved",
            keeplocally : "keep",
            reject : "rejected",
            deleted : "Excluíd"
        },
        msg_requesttime :
            "Lista de pedidos foi atualizada, clique em [Atualizar]."
    },
    UserSpecificName:
    {
        title    : "Configuração do equipamento",
        LabelNodata    : "No Data",
        emptyText       : 'Insira o nome',
        button  :
        {
            close : "Fechar",
            save : "Salvar"
        }
    },
    compare : {
        title_detail : "Detalhe",
        title_refer  : "References",
        button : {
            showdifferencesonly : "Mostrar só diferença",
            showall : "Mstr tud",
            references: "References",
            save : 'Salvar',
            close : 'Fechar'
        },
        label : {
            console_comments : "Coment (Criador protoc)",
            approver_comments : "Coments (Aprovador de Protocolo)",
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
            approve : "Protocolo será aprovado para distribuição a todos os scanners. ",
            deleteProtocl : "Protocolo será excluído e removido e todos os scanners.",
            rejectApproval : "Protocolo será rejeitado e removido do scanner de origem. ",
            rejectDeletion : "Exclusão do protocolo será rejeitada; será restaurado no scanner de origem.",
            keep : "Protocolo será aprovado para uso local no scanner de origem. ",
            asker : "Deseja continuar?",
            transfer : "Este protocolo será transferido para outros grupos.",
            systemComment: "[Comentário gerado pelo sistema]",
            reason: "O pedido de transferência para o protocolo foi enviado para ",
            autoApproval: "Aprovação automática devido à aprovação de {1}",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Aprovação automática em conjunto com {1} com o mesmo órgão.",
            autoRejectReason: "Rejeição automática em conjunto com {1} com mesmo órgão."
        },
        label : {
            comments : "Coments",
            reminder : "Insira comentários.",
            transferlable : "Transfer Destinations",
            approveTransferlable: "Este protocolo será transferido para outros grupos.<br>Selecione os grupos para os quais deseja transferir este protocolo",
            models : "Models",
            radlex: "Radlex RPID",
            group: 'Grupo',
            model: 'Modelo',
            softwarVersion: 'Versão do software'
        },
        button : {
            ok : "OK",
            cancel : "Cancelar",
            transferOption : "Transferir protocolo para outros grupos (Opção)"
        }
    },

    backupDialog: {
        menuItem: "Backup de dados do protocolo",
        backupTitle: "Backup de dados do protocolo",
        backupLocation: "Local do backup",
        backupBtn: "Backup",
        clearLogBtn: "Limpar registo",
        backupLogs: "Registro de backup",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "Long Description"
    },

    message : {
        button_close : "Fechar"
    },
    status_tip: {
        ApprovalRequested:"Aprovação Pedida:",
        ApprovalAccepted:"Aprovado:",
        LocalUseAccepted:"Aprovado p/ uso local:",
        DeletionRequested:"Pedido de exclusão:",
        DeletionAccepted:"Excluíd:",
        ApprovalRejected:"Aprov rejeitada:",
        DeletionRejected:"Exclus rejeitada:",
        Transferred :"Transferred:",
        Restored: "Restaurd:",
        ApprovalRequestedValue:"Protocolo criado/editado em TC.",
        ApprovalAcceptedValue:"Protocolo aceitável para uso em todos os TCs do mesmo modelo/versão.",
        LocalUseAcceptedValue:"Protocolo aceitável para usar apenas o TC específico.",
        DeletionRequestedValue:"Protocolo excluído em TC.",
        DeletionAcceptedValue:"Protocolo seria excluído de todos os TCs, mesmo modelo/versão.",
        NotYetDistributedValue:"This protocol is not yet distributed.",
        DistributedValue:"This protocol is already distributed.",
        ApprovalRejectedValue:"Protocolo não aprovado. Recuperaria o estado anterior no TC. ",
        DeletionRejectedValue:"Protocolo não aprovado para exclusão. Recuperaria o estado anterior no TC.",
        TransferredValue :"The protocol was distributed to use in another model/version TAC. ",
        RestoredValue: "Protocolo restaurado no TC. Disponível para uso."
    },
    history : {
        title_history : "Histórics ",
        title_transfer : "Transfers",
        title_protocolhistory : "Histór protocolo",
        title_comfirm_header : "Confirm",
        text_search:"buscar",
        title_protocol_selected:'Selected Protocol',
        button : {
            hidedeleteitems : "Ocltar itens excl",
            showdeleteitems : "Mstrar itens excl",
            backtoHistoryList : "Voltar à lista",
            backtoTransferList : "Anterior",
            expandAll: "Expand tud",
            collapseAll: "Recolher tud",
            hide : "Oclt",
            show : "Mstr",
            restore : "Restaur",
            deleted : "Excl",
            ok : "OK",
            cancel : "Cancelar",
            transfer : "Transferência",
            showall :"Mstr tud",
            NextHistories : "Mstr mais",
        },
        column : {
            type : "Protocolo",
            patientype : "TipoPaciente",
            name : "Nome",
            date : "Data",
            source_scanner : "Aparelho original",
            user : "Usuá",
            scanners:"scanners",
            event: 'Event',
            comment: 'Coment'
        },
        cell_content : {
            event_create: "Criar",
            event_edit: "Edit",
            event_approve: "Aprovar",
            event_delete: "Excl",
            event_restore: "Restaur",
            event_keep_locally: "ManterLocalm",
            event_reject: "Rejeit",
            event_transfer: "Transferência",
            event_cutandpaste: "Cut And Paste"
        },
        message : {
            requesttime : "Lista de histórico foi atualizada, clique em [Atualizar].",
            comfirm_commants : "Coments",
            comfirm_commants_null : "Insira comentários.",
            restore_comfirm_text1 : "Protocolo será restaurado e distribuído para todos os scanners.",
            restore_comfirm_text2 : "Deseja continuar?",
            delete_comfirm_text1 : "Protocolo será excluído imediat e distribuído para todos os scanners.",
            delete_comfirm_text2 : "Deseja continuar?"
        },
        action_event: {
            Request:"Pedido",
        }
    },

    comparison : {
        button : {
            cancel :"Cancelar",
            check_params :"Ver parâmetros",
            ok :"OK",
            select_scan_mode :"Selec modo de TC"
        },
        title : {
            selection : "Sel protocolo comparado",
            detail : "Detal",
            scan_mode : "Sel modo exame comparado"
        }
    },

    app_setting : {
        button : {
            add :"Adc",
            apply :"OK",
            cancel :"Cancelar",
            deleted :"Excl",
            disable :"Desabil",
            edit :"Edit",
            enable :"Habil",
            ok :"OK",
            save : "Salvar",
            execute: "Iníc",
            import: "Import",
            export: "Export",
            close: "Fechar"
        },
        column : {
            distribution :"Distribution",
            distribution_machine_name :"Scanner distrib",
            distribution_scanner :"Scanner distrib",
            group_name :"Nome",
            key :"Chv",
            machine_name :"Scanner origem",
            name :"Nome",
            scanner :"Scanner origem",
            software_version :"Versão software",
            ep_type :"Tipo de EP",
            source_machine_name :"Scanner origem",
            source_scanner :"Scanner origem",
            system_name :"NomeSistema",
            value :"Valor",
            description :"Descrição",
            association: 'Association',
            guideline:'Guideline',
        },
        label : {
            initialize_setup:"Criador ProtocoloMestre",
            clean_master_maker:"Clean Master Maker",
            check_interval:"Interval (sec)",
            language:"Idioma",
            interval_desc :"The interval(second) of checking Protocol Pool :",
            modality :"Modalid",
            modality_desc :"Nome modalidade",
            model_name :"NomeModelo",
            model_name_desc :"Nome do modelo",
            name :"Nome",
            name_desc :"Identificador do ProtocolPool",
            software_version :"Versão software",
            software_version_desc :"Versão atual software",
            ep_type :"Tipo de EP",
            ep_type_desc :"Tipo de EP atual",
            system_name :"NomeSistema",
            system_name_desc :"Nome do sistema",
            vendor :"Fornec",
            vendor_desc :"Nome fornecedor",
            x_ray_mode :"ModoRaiosX",
            x_ray_mode_desc :"ModoRaiosX",
            protocol_share_across_model:"Compart protocolo no modelo",
            backup_protocol_data:"Backup Protocol Data",
            batch_approving:"Aprovação lote",
            done:"Done",
            succeed:"Aprovação de lote concluída com êxito.",
            cancel:"Aprovação de lote cancelada.",
            clean_succeed:"Clean Master Maker finished successfully.",
            clean_cancel:"Clean Master Maker is cancelled.",
            overview:"Alguns protocolos não aprovados.",
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
            rpid_display:"Suporte RPID RadLex",
            reference_display:"Referênc diretriz protocolo",
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
            sources_canner_deleted :"Scanner de origem será excluído.",
            distribution_scanner_deleted :"The distribution scanner will be deleted.",
            delete_continue :"Deseja continuar?",
            console_ok_save_warningone:"Alterações não salvas.",
            console_ok_save_warningtwo:"Deseja salvar alterações?",
            console_delete_machine_waring:"The console name will be deleted.",
            move_continue :"Do you want to move it?",
            console_not_taken_over_histories: "The existing histories will not be taken over the new group.",
            console_wheather_move_scanner:"There is a same scanner ({1}) existed in other protocol pool.",
            console_wheather_adding_scanner:"Whether adding Scanner has histories?",
            move_successfully:"Move successfully!",
            add_successfully:"Add successfully!",
        },
        title : {
            console_setting :"Scanner origem",
            distribution_setting :"Scanner distrib",
            other_setting :"Outros",
            pool_setting :"PoolProtocols",
            language_setting :"Language Setting",
            setting :"Config",
            display_setting:"Compart protocolo no modelo",
            backup_protocol_data_setting:"Backup Protocol Data Setting",
            approve:"Aprovando...",
            clean:"Clean ...",
            move:"Moving",
            title_select:"Updating distribution status" ,
            import: "Import...",
            export: "Export...",
            rpid_setting:"Suporte RPID RadLex",
            reference_setting:"Referênc diretriz protocolo"

        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "Protocolo usu",
            ServiceProtocol : "ProtocoloServiço",
            make_change:'Make Changes',
            active_change:'Activate changes',
            undo_change:'Undo Changes',
            leave:'Leave',
            stay:'Stay'
        },
        tab:
        {
            Adult       :"Adult",
            Child       :"Infan",
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
                overview    : "Aprovação",
                details        : "aprovação",
                details2    : "aprovado"
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
                overview    : "Eliminação",
                details        : "eliminação",
                details2    : "eliminado"
            },
            restore: {
                overview    : "Restoration",
                details        : "restoration",
                details2    : "Restaurado"
            },
            approvetransfer: {
                overview    : "Approval or Transferring",
                details        : "approval or transfer",
                details2    : "approved or transfered"
            },
            transfer: {
                overview    : "Transferring",
                details        : "Transferência",
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
            "overview"    : "Erro aquisição licença",
            "details"    : "Erro ao adquirir licença; inicialização do aplicativo cancelada.",
            "solution"    : "Verifique a licença.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
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
            "overview"    : "Falha no protocolo {0}",
            "details"    : "O protocolo foi realizado por outro usuário, portanto, o protocolo {0} foi cancelado.",
            "solution"    : "verifique a lista do histórico.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Este protocolo foi atualizado durante {0}, portanto, o protocolo ~ foi cancelado.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Estes arquivos de protocolo eram ilegíveis, portanto, o protocolo {0} foi cancelado.",
            "solution"    : "Please click [Refresh] button to refresh the list.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Falha ao se conectar ao servidor de arquivos, portanto, o protocolo {0} foi cancelado.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Unexpected error was occured in system, therefore protocol {0} was cancelled.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Fail to cut and paste, therefore rename protocol {0}  EP No was cancelled.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "Falha na restauração do protocolo",
            "details"    : "Já existia outro protocolo presente na mesma posição.",
            "solution"    : "",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "The protocol {0} failed",
            "solution"    : "Please check the protocol or try later",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "Falha no protocolo {0}",
            "details"    : "Alguns arquivos estavam sendo utilizados, por isso, o protocolo {0} foi cancelado.",
            "solution"    : "Feche os arquivos que estão sendo usados e tente novamente.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },

        // Request
        ERR30001 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Os nomes do sistema do scanner de TC e do Servidor de protocolos não coincidem; protocolo de aquisição cancelado.",
            "solution"    : "Altere nome do sistema no Servidor de protocolos.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Os nomes dos modelos do scanner de TC e do Servidor de protocolos não coincidem; protocolo de aquisição cancelado.",
            "solution"    : "Altere nome do modelo no Servidor de protocolos.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Os modos de raios X do scanner de TC e do Servidor de protocolos não coincidem; protocolo de aquisição cancelado.",
            "solution"    : "Altere modo raios X Servidor de protocolos.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "As versões de software do scanner de TC e do Servidor de protocolos não coincidem; protocolo de aquisição cancelado.",
            "solution"    : "Altere versão de software no Servidor de protocolos.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Arquivo de resumo ilegível; protocolo de aquisição cancelado.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Arquivo changelog ilegível; protocolo de aquisição cancelado.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Arquivo de histórico ilegível; protocolo de aquisição cancelado.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Arquivo de resumo não encontrado; protocolo de aquisição cancelado.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "Erro aquis protocolo",
            "details"    : "Este protocolo já foi aprovado por outro usuário.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "Falha na recuperação do protocolo",
            "details"    : "Falha ao receber o histórico do protocolo.",
            "solution"    : "Please click [Refresh] button to refresh the list",
            "calladmin"    : "If the problem persists call your service representative."
        },

        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha o identificador do scanner em branco.",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha nome do fornecedor em branco.",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha nome da modalidade em branco.",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha nome do sistema em branco.",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha nome do modelo em branco.",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha modo raios X em branco.",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha versão de software em branco.",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Selecione o identificador do scanner.",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Preencha o scanner de origem em branco.",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "Scanner já registrado",
            "solution"    : "Renomeie o scanner.",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "Proibido defin em branco.",
            "solution"    : "Selecione o scanner de origem.",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "Proibido desab tds scanners de distribuição.",
            "solution"    : "Habilite pelo menos 1 scanner de distribuição.",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "O nome deste leitor contém caracteres inválidos, apenas [0-9], [a-Z] e [ -_ ] são permitidos.",
            "solution"    : "Renomeie o leitor.",
        },		
        // setting error message
        ERR50021 : {
              "status"    : "error",
              "overview"    : "Erro config de apl",
              "details"    : "Scanner já registrado",
              "solution"    : "Renomeie o scanner.",
              "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
          },

        ERR50023 : {
            "status"    : "error",
            "overview"    : "Erro config de apl",
            "details"    : "Alguns arquivos em uso; atualização da config cancelada.",
            "solution"    : "Feche os arquivos em uso e tente novamente.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "Mesmo identificador de scanner já registrado.",
            "solution"    : "Renomeie o identificador do scanner.",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "Erro config de apl",
            "details"    : "Same scanner information was already registered, therefore setting registration was cancelled.",
            "solution"    : "Check the registered scanner information.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "O programa está em uso, portanto, o registro de configuração foi cancelado.",
            "solution"    : "Aguarde alguns instantes e tente novamente.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "Houve falha na edição do arquivo de configuração, portanto, a mudança dos históricos do protocolo foi cancelada.",
            "solution"    : "Verifique o status do arquivo de configuração e tente novamente.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "O programa expirou.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "Ocorreu um erro desconhecido.",
            "solution"    : "Tente novamente mais tarde.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
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
            "overview"    : "Erro config de apl",
            "details"    : "Arquivo de configuração em uso; atualização da config cancelada.",
            "solution"    : "Feche o arquivo em uso e tente novamente.",
            "calladmin"    : "Se o problema continuar, contate o suporte Toshiba."
        },

        ERR70002 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "The setting file was using, therefore setting deletion was cancelled.",
            "solution"    : "Close the using files and try it again.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "Erro config de apl",
            "details"    : "Arquivo de config não encontrado; atualização da config cancelada.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "Erro config de apl",
            "details"    : "Arquivo de config ilegível; atualização da config cancelada.",
            "solution"    : "",
            "calladmin"    : "Contate o suporte Toshiba."
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "Falha na configuração do aplicativo",
            "details"    : "O leitor já existia, portanto, a adição do leitor foi cancelada.",
            "solution"    : "Verifique o arquivo de configuração e tente novamente.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "Falha na configuração do equipamento",
              "details"    : "O arquivo de configuração está sendo usado por outro programa, portanto, a configuração do equipamento foi cancelada.",
              "solution"    : "Feche o arquivo de configuração e tente novamente.",
              "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
	ERR50041 : {
              "status"    : "error",
              "overview"    : "Falha na configuração do equipamento",
              "details"    : "O arquivo de configuração foi editado por outro programa, portanto, a configuração do equipamento foi cancelada.",
              "solution"    : "Atualize a página e tente novamente mais tarde.",
              "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
	ERR50042 : {
              "status"    : "error",
              "overview"    : "Falha na configuração do equipamento",
              "details"    : "O arquivo de configuração é ilegível, portanto, a configuração do equipamento foi cancelada.",
              "solution"    : "Verifique o arquivo de configuração e tente novamente.",
              "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },

        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "Protocol Transferring",
            "details"    : "This protocol {0} was already transferred to {1}, therefore protocol transferring was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "Protocol {0} Failed",
            "details"    : "This protocol files were unreadable, therefore protocol {0} was cancelled.",
            "solution"    : "Please check the protocol history.",
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
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
            "calladmin"    : "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR0005 : {
            "status"    : "info",
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>Exposure",
            "details"    : "Another <sup>SURE</sup>Exposure Preset with the same name is already available in the master list for the following Protocols: ",
            "solution"    : "Se deseja substituir a predefinição existente na lista principal pelos protocolos mencionados acima, remova a predefinição existente da lista principal e, em seguida, substitua pelos protocolos acima. ",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>IQ",
            "details"    : "Outra predefinição do <sup>SURE</sup>IQ com o mesmo nome já está disponível na lista principal para os seguintes protocolos:",
            "solution"    : "Se deseja substituir a predefinição existente na lista principal pelos protocolos mencionados acima, remova a predefinição existente da lista principal e, em seguida, substitua pelos protocolos acima.",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "Duplicar predefinição de contraste",
            "details"    : "Outra predefinição de contraste com o mesmo nome já está disponível na lista principal para os seguintes protocolos: ",
            "solution"    : "Se deseja substituir a predefinição existente na lista principal pelos protocolos mencionados acima, remova a predefinição existente da lista principal e, em seguida, substitua pelos protocolos acima.",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "Scano <sup>SURE</sup>IQ ausente",
            "details"    : "A lista principal atual não contém o <sup>SURE</sup>IQ for Scano. Adicione o <sup>SURE</sup>IQ for Scano para continuar.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "Predefinição do <sup>SURE</sup>IQ inadequada",
            "details"    : "O <sup>SURE</sup>IQ contém um Tipo de paciente inválido.O Tipo de paciente válido suportado para <<sup>SURE</sup>IQ Name> é Adulto.",
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
            "overview"    : " A fila predefinida do SUREIQ está cheia",
            "details"    : "<sup>SURE</sup>IQ Preset queue can only accommodate {1} organ types in the master list. This limit has been exceeded for the following organs:",
            "solution"    : "Se desejar adicionar mais predefinições ao SUREIQ para o tipo de órgão, remova as demais entradas primeiro.",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : " A fila predefinida do <sup>SURE</sup>IQ está cheia",
            "details"    : "<sup>SURE</sup>IQ Preset queue can only accommodate {1} cards in a specific organ type in the master list. This limit has been exceeded for the following organs:",
            "solution"    : "A fila predefinida do <sup>SURE</sup>IQ pode acomodar apenas 8 cartões em um tipo de órgão específico na lista principal. Esse limite foi excedido para os seguintes órgãos:",
            "calladmin"    : "Se desejar adicionar mais predefinições ao <sup>SURE</sup>IQ para este órgão, remova as demais entradas primeiro."
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "A fila predefinida do <sup>SURE</sup>Exposure está cheia",
            "details"    : "A fila predefinida do <sup>SURE</sup>Exposure pode acomodar apenas {1} cartões na lista principal.O <sup>SURE</sup>Exposure ultrapassa esse limite de fila e não pode ser suportado.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "Predefinição do <sup>SURE</sup>Exposure inadequada",
            "details"    : "O <sup>SURE</sup>Exposure contém um Tipo de paciente inválido.O Tipo de paciente válido suportado para o <sup>SURE</sup>Exposure é Adulto ou Criança.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "Predefinição do <sup>SURE</sup>Exposure inadequada",
            "details"    : "O <sup>SURE</sup>Exposure contém um Tipo de órgão inválido.O Tipo de órgão válido suportado para o <sup>SURE</sup>Exposure é Cabeça, Pescoço, ECG ou Todos.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "A fila predefinida do <sup>SURE</sup>Exposure está cheia",
            "details"    : "A fila predefinida do <sup>SURE</sup>Exposure pode acomodar apenas {1} cartões em um tipo de órgão específico na lista principal. Esse limite foi excedido para os seguintes órgãos:",
            "solution"    : "Se desejar adicionar mais predefinições ao <sup>SURE</sup>Exposure para este órgão, remova as demais entradas primeiro.",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "Predefinição de contraste inadequada",
            "details"    : "A Predefinição de contraste contém um Tipo de paciente inválido.Os Tipos de pacientes válidos suportados para a Predefinição de contraste são Adulto e Criança.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "Group Organ",
            "details"    : "The position file of SureExposure should be checked whether at least 1 card (preset) for each group.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "Falha no ajuste de posição",
            "details"     : "Ocorreu um erro inesperado.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "O nome de identificação deste equipamento já está registrado.",
            "solution"    : "Altere o nome.",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "O nome de identificação deste equipamento é muito longo.",
            "solution"  : "Selecione um nome com, pelo menos, 40 caracteres.",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "O leitor de TC que está sendo adicionado tem históricos?",
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
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>IQ",
            "details"    : "Outra predefinição do <sup>SURE</sup>IQ com o mesmo nome já está disponível na lista de histórico, por isso, essa predefinição não pode ser adicionada.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>Exposure",
            "details"    : "Outra predefinição do <sup>SURE</sup>Exposure com o mesmo nome já está disponível na lista de histórico, por isso, essa predefinição não pode ser adicionada.",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "Duplicar predefinição de contraste",
            "details"    : "Outra predefinição de contraste com o mesmo nome já está disponível na lista de histórico, por isso, essa predefinição não pode ser adicionada.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>Exposure",
            "details"    : "Outra predefinição do <sup>SURE</sup>Exposure com o mesmo nome já foi adicionada à lista principal automaticamente como protocolo anexado. Ele não pode ser substituído.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "Duplicar predefinição do <sup>SURE</sup>IQ",
            "details"    : "Outra predefinição do <sup>SURE</sup>IQ com o mesmo nome já foi adicionada à lista principal automaticamente como protocolo anexado. Ele não pode ser substituído.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "Duplicar predefinição de contraste",
            "details"    : "Outra predefinição de contraste com o mesmo nome já foi adicionada à lista principal automaticamente como protocolo anexado. Ele não pode ser substituído.",
            "solution"    : "",
            "calladmin"    : "Entre em contato com o serviço da Toshiba para obter assistência."
        },
        ERR0033 : {
            "status": "error",
            "overview": "Backup files Failed",
            "details": "Some Error Occurs while backup files.",
            "solution": "Check backup path again, please try it again.",
            "calladmin": "Se o problema persistir, entre em contato com o serviço da Toshiba."
        },
        ERR0034 : {
            "status"    : "info",
            "overview"    : "Predefinição Voice duplicada",
            "details"    : "Já existe uma predefinição Voice com o mesmo nome na lista principal para os seguintes Protocolos",
            "solution"    : "Se deseja substituir a predefinição existente na lista principal pelos protocolos acima, remova a predefinição existente da lista principal e, em seguida, substitua-a pelos protocolos acima.",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "A fila da predefinição Voice está cheia",
            "details"    : "A fila da predefinição Voice só pode conter 20 idiomas na lista principal. Este limite foi excedido nos seguintes idiomas:",
            "solution"    : "Se desejar adicionar mais predefinições Voice para o idioma, remova primeiro quaisquer outras entradas.",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "A fila da predefinição Voice está cheia",
            "details"    : "A fila da predefinição Voice só pode conter 10 cards num idioma específico na lista principal. Este limite foi excedido no seguinte idioma:",
            "solution"    : "Se desejar adicionar mais predefinições Voice para este idioma, remova primeiro quaisquer outras entradas.",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "Predefinição Voice em falta",
            "details"    : "A fila da predefinição Voice tem de conter os seguintes 6 idiomas:<BR><BR>japonês<BR>inglês<BR>chinês<BR>coreano<BR>espanhol<BR>português",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "Predefinição Voice em falta",
            "details"    : "Cada idioma na fila da predefinição Voice tem de conter os seguintes 5 comandos Voice.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Predefinição Voice duplicada",
            "details"    : "Já existe uma predefinição Voice com o mesmo nome na lista de histórico. Não é possível adicionar esta predefinição.",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ Preset Queue não atingiu o número mínimo de cards",
            "details"    : "A fila da predefinição <sup>SURE</sup>IQ tem de conter, no mínimo, {1} cards num tipo de orgão específico na lista principal. Não se verifica correspondência para este limite nos seguintes orgãos:",
            "solution"    : "Defina adicionar predefinição <sup>SURE</sup>IQ para este orgão.",
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