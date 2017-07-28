var stringSetting =
{
    protocolmanagement: "CTプロトコルマネジメント",

    tab: {
        requestlist : "承認依頼リスト",
        history : "配信履歴リスト",
        transfer : "転送履歴リスト",
        app_setting :"アプリ設定",
        master: "マスター管理",
        position: "プロトコルポジション設定"
    },

    menu : {
        identifing:'装置識別名の設定',
        filter : {
            CheckAll : "全て",
            SortAscending : "昇順でソート",
            SortDescending : "降順でソート",
            Filter : "フィルタ"
        }
    },

    master:
    {
        button:
        {
            Next        : "進む",
            Back        : "戻る",
            Cancel      : "キャンセル",
            Approve     : "承認",
            Finish      : "完了",
            UserProtocol    : "User Protocol",
            ServiceProtocol : "Service Protocol",
            Move        : "変更",
            OKbtn       : "OK",
            Setasdefault    : "デフォルト設定",
            Reset    : "リセット"
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
            Start                   : "マスタープロトコル管理の開始",
            CreationEP              : "エキスパートプランのマスタープロトコル作成",
            CreationSureIQ          : "<sup>SURE</sup>IQのマスタープロトコル作成",
            CreationSureExp         : "Volume ECのマスタープロトコル作成",
            CreationCP              : "造影剤プリセットのマスタープロトコル作成",
            CreationVoice           : "Voiceプリセットのマスタープロトコル作成",
            Setting                 : "エキスパートプランのポジション設定",
            SelectOther             : "各種設定ファイルの選択",
            Approving               : "確認",
            FinishProtocolList      : "プロトコルリスト",
            FinishFinalizeSetup     : "マスタープロトコル管理の完了",
            title_confirm           : "確認",
            title_approve           : "承認中...",
            title_clean             : "Clean",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            MasterList              : "マスターリスト",
            OriginalList            : "オリジナルリスト",
            Parameters              : "パラメータ",
            Parameter_Name			: "パラメータ名",
        },
        statusLab:
        {
            Start                   : "開始",
            Creation                : "マスターリスト<br> 作成",
            Setting                 : "ポジション<br> 設定",
            SelectOther             : "設定ファイル<br> 選択",
            Approving               : "プロトコル<br> 承認",
            Finish                  : "完了"
        },
        column:{
            type                    :"プロトコル",
            patienttype             :"患者タイプ",
            name                    :"プロトコル名",
            date                    :"日付",
            scanner                 :"スキャナー名",
        },
        columns:
        {
            patientType                : "患者タイプ",
            bodyRegion                 : "検査部位",
            masterList                 : "プロトコル名",
            machineName                : "スキャナー名",
            language                   : "言語",
        },
        combobox:
        {
            all                        : "全て",
        },
        menu:
        {
            addAll                    : "全てマスターリストへ追加",
            addSelected               : "マスターリストへ追加",
            checkParameters           : "パラメータの確認",
            removeFromList            : "マスターリストから削除",
        },
        message:
        {
            start_text1            : "マスタープロトコルの作成・承認を行います。",
            start_text2            : "[進む]ボタンを押して、開始してください。",
            finish_text1           : "マスタープロトコルの作成・承認は完了しました。",
            finish_text2           : "[完了]ボタンを押して、配信履歴リストのプロトコル履歴と配信状況を確認してください。",
            confirm_to_approve     : "[承認]ボタンを押して、マスタープロトコルの承認を開始してください。",
            confirmview_text1      : "マスタープロトコルは全て承認され、接続している全てのCTスキャナーへ配信できる状態になります。",
            confirmview_text2      : "処理を続けますか？",

            add_message_ep : 'エキスパートプランに関連づけられたプリセット(Volume EC, Voiceプリセット, <sup>SURE</sup>IQ, 造影剤プリセット)は配信履歴リストに存在するため、マスターリストへ追加をキャンセルしました。',
            add_message_sureexp : 'Volume ECに関連づけられたプリセット(SureIQ)は配信履歴リストに存在するため、マスターリストへ追加をキャンセルしました。',
            add_repeat_message_sureexp : 'マスターリストに同名のVolume ECが存在するため、上書きされます。',
            add_repeat_message_contrastprest : 'マスターリストに同名の造影剤プリセットが存在するため、上書きされます。',
            add_repeat_message_sureiq : 'マスターリストに同名の<sup>SURE</sup>IQが存在するため、上書きされます。',
            add_repeat_message_other : 'マスターリストに同名の設定ファイルが存在するため、上書きされます。',
            add_repeat_message_voice : 'マスターリストに同名のVoiceプリセットが存在するため、上書きされます。',
            add_duplicated_message_voice : 'マスターリストに同名のVoiceプリセットが存在します。',
            add_duplicated_protocol_message_voice : 'マスターリストのVoiceプリセットは次のCTスキャナーのプリセットで置き換えられます: {0}',
            master_delete_machine_waring:"マスタープロトコル作成時に不要となったプロトコルを削除します。",
            approve_error_header:'Approving...			100 %	Done<br>({0} protocols have been failed)',
            clean_error_header:'Deleting unnecessary protocols...			100 %	Done<br>({0} protocols have been failed)'
        }
    },

    request:
    {
        title_request : "承認依頼",
        protocol_type:
        {
            ExamPlan         : "エキスパートプラン",
            SureIQ           : "<sup>SURE</sup>IQ",
            SureExposure     : "Volume EC",
            ContrastPreset   : "造影剤プリセット",
            VoicePreset     : "Voiceプリセット"

        },
        column: {
            type : "プロトコル",
            patienttype : "患者タイプ",
            name : "プロトコル名",			
            version : "変更回数",
            date : "依頼日",			
            scanner : "スキャナー名",
            user : "依頼者",
        },
        button: {
            approve : "承認",
            keeplocally : "条件付き承認",
            reject : "拒否",
            deleted : "承認",
            refresh : "更新",
            close: "閉じる",
            backtothelist : "承認依頼リストに戻る"
        },
        event: {
            approve : "承認",
            keeplocally : "条件付き承認",
            reject : "拒否",
            deleted : "削除承認"
        },
        msg_requesttime :
            "新しい承認依頼が来ています。[更新]ボタンを押して更新してください。"
    },
    UserSpecificName:
    {
        title    : "装置識別名の設定",
        LabelNodata    : "データなし",
        emptyText       : 'Please input the name',
        button  :
        {
            close : "閉じる",
            save : "保存する"
        }
    },
    compare : {
        title_detail : "詳細パラメータ",
        title_refer  : "参照",
        button : {
            showdifferencesonly : "差分表示",
            showall : "全て表示",
            references: "ガイドライン参照",
            save : '保存する',
            close : '閉じる'
        },
        label : {
            console_comments : "コメント (プロトコル承認依頼者)",
            approver_comments : "コメント(プロトコル承認者)",
        },
        list : {
            ScanList : "スキャンリスト",
            SureIQList : "SureIQリスト",
            SureExposureList : "Volume ECリスト",
            ContrastPresetList : "造影剤プリセットリスト"
        }
    },

    comments : {
        title_confirm  : "確認",
        text : {
            approve : "このプロトコルを全てのCTスキャナーへ配信するために承認します。",
            deleteProtocl : "このプロトコルを全てのCTスキャナーから削除します。",
            rejectApproval : "このプロトコルの承認を拒否し、承認依頼したCTスキャナーから削除します。 ",
            rejectDeletion : "このプロトコルの削除を拒否し、削除依頼したCTスキャナーから削除します。",
            keep : "このプロトコルを承認依頼したCTスキャナーで利用するために承認します。 ",
            asker : "処理を続けますか？",
            transfer : "選択したプロトコルを他モデルに配信します。",
            systemComment: "[システム]",
            reason: "プロトコルの転送:",
            autoApproval: "プロトコルの自動承認: {1}.",
            autoReject: "関連プロトコルの自動承認拒否: {1}.",
            autoApprovalReason: "同一部位の自動承認: {1}.",
            autoRejectReason: "同一部位の自動承認／削除拒否: {1}."
        },
        label : {
            comments : "コメント",
            reminder : "コメントを入力してください。",
            transferlable : "プロトコル転送先",
            approveTransferlable: "このプロトコルを他グループへ転送します。<br>転送先グループを指定してください。",
            models : "モデル",
            radlex: "RadLex RPID設定",
            group: 'グループ',
            model: 'モデル',
            softwarVersion: 'ソフトバージョン'
        },
        button : {
            ok : "OK",
            cancel : "キャンセル",
            transferOption : "他グループへのプロトコル転送 (オプション)"
        }
    },

    backupDialog: {
        menuItem: "CTプロトコルのバックアップ",
        backupTitle: "CTプロトコルのバックアップ",
        backupLocation: "バックアップ場所",
        backupBtn: "バックアップ",
        clearLogBtn: "クリア",
        backupLogs: "バックアップ ログ",
    },

    radlex : {
        rpid : "RPID",
        long_desc: "説明"
    },

    message : {
        button_close : "閉じる"
    },
    status_tip: {
        ApprovalRequested:"承認依頼中:",
        ApprovalAccepted:"承認:",
        LocalUseAccepted:"条件付き承認:",
        DeletionRequested:"削除依頼中:",
        DeletionAccepted:"削除承認:",
        ApprovalRejected:"承認拒否:",
        DeletionRejected:"削除拒否:",
        Transferred :"転送:",
        Restored: "復元:",
        ApprovalRequestedValue:"CT装置で作成・変更されたプロトコルです。",
        ApprovalAcceptedValue:"同モデル・バージョンの全てのCT装置で利用可能です。",
        LocalUseAcceptedValue:"プロトコルを作成・変更したCT装置でのみ利用可能です。",
        DeletionRequestedValue:"CT装置で削除されたプロトコルです。",
        DeletionAcceptedValue:"同モデル・バージョンの全てのCT装置から削除されます。",
        NotYetDistributedValue:"CT装置へ未配信です。",
        DistributedValue:"CT装置へ配信済みです。",
        ApprovalRejectedValue:"このプロトコルは承認できませんでした。CT装置上では承認依頼前の状態に戻ります。",
        DeletionRejectedValue:"このプロトコルは削除承認できませんでした。CT装置上では削除承認依頼前の状態に戻ります。",
        TransferredValue :"このプロトコルは他のモデル/バージョンの装置で使用するために配信されました。",
        RestoredValue:  "このプロトコルはCT装置に復元されました。CT装置上で利用できるようになります。"
    },

    history : {
        title_history : "配信履歴",
        title_transfer : "転送履歴",
        title_protocolhistory : "プロトコル承認履歴",
        title_comfirm_header : "確認",
        text_search:"search",
        title_protocol_selected:'選択されたプロトコル',
        button : {
            hidedeleteitems : "削除プロトコルを非表示",
            showdeleteitems : "削除プロトコルを表示",
            backtoHistoryList : "配信履歴リストに戻る",
            backtoTransferList : "転送履歴リストに戻る",
            expandAll: "パラメータ表示最大化",
            collapseAll: "パラメータ表示最小化",
            hide : "非表示",
            show : "表示",
            restore : "復元",
            deleted : "取消",
            ok : "OK",
            cancel : "キャンセル",
            transfer : "転送",
            showall :"全て表示",
            NextHistories : "過去の履歴を読み込む",
        },
        column : {
            type : "プロトコル",
            patientype : "患者タイプ",
            name : "プロトコル名",			
            date : "承認日",
            source_scanner : "転送元",
            user : "承認者",
            scanners:"scanners",
            event : "イベント",
            comment : "コメント"
        },
        cell_content : {
            event_create: "作成",
            event_edit: "編集",
            event_approve: "承認",
            event_delete: "削除",
            event_restore: "復元",
            event_keep_locally: "条件付き承認",
            event_reject: "拒否",
            event_transfer: "モデル間配信",
            event_cutandpaste: "ポジション変更"
        },
        message : {
            requesttime : "スキャナーへの配信が完了しました。[更新]ボタンを押して更新してください。",
            comfirm_commants : "コメント",
            comfirm_commants_null : "コメントを入力してください。",
            restore_comfirm_text1 : "このプロトコルは全てのCTスキャナー上に復元されます。",
            restore_comfirm_text2 : "処理を続けますか？",
            delete_comfirm_text1 : "このプロトコルは全てのCTスキャナーから削除されます。",
            delete_comfirm_text2 : "処理を続けますか？"
        },
        action_event: {
            Request:"Request",
        }
    },

    comparison : {
        button : {
            cancel :"キャンセル",
            check_params :"パラメータ確認",
            ok :"OK",
            select_scan_mode :"スキャンモード選択"
        },
        title : {
            selection : "比較プロトコルの選択",
            detail : "詳細パラメータ",
            scan_mode : "比較スキャンモードの選択"
        }
    },

    app_setting : {
        button : {
            add :"追加",
            apply :"OK",
            cancel :"キャンセル",
            deleted :"削除",
            disable :"配信しない",
            edit :"編集",
            enable :"配信する",
            ok :"OK",
            save : "保存",
            execute: "実行",
            import: "レストア",
            export: "バックアップ",
            close: "閉じる"
        },
        column : {
            distribution :"プロトコル配信先",
            distribution_machine_name :"プロトコル配信先",
            distribution_scanner :"プロトコル配信先の設定",
            group_name :"スキャナー識別子",
            key :"設定キー",
            machine_name :"プロトコル配信元",
            name :"名前",
            scanner :"プロトコル配信元",
            software_version :"ソフトウェアバージョン",
            ep_type :"EPタイプ",
            source_machine_name :"プロトコル配信元",
            source_scanner :"プロトコル配信元",
            system_name :"システム名",
            value :"設定値",
            description :"設定キーの説明",
            association: '学会・機関',
            guideline:'ガイドライン',

        },
        label : {
            initialize_setup:"マスタープロトコルの管理",
            clean_master_maker:"マスタープロトコル作成後の不要プロトコルの削除",
            check_interval:"更新間隔(sec)",
            language:"言語",
            interval_desc :"プロトコル依頼・配信状況の更新間隔(sec)",
            modality :"モダリティ",
            modality_desc :"モダリティ名",
            model_name :"モデル",
            model_name_desc :"モダリティのモデル名",
            name :"スキャナー識別子",
            name_desc :"スキャナー情報の識別子名",
            software_version :"ソフトウェアバージョン",
            software_version_desc :"モダリティのソフトウェアバージョン",
            ep_type :"EPタイプ",
            ep_type_desc :"スキャナーで指定されているEPタイプ",
            system_name :"システム名",
            system_name_desc :"モダリティのシステム名",
            vendor :"ベンダー",
            vendor_desc :"モダリティのベンダー名",
            x_ray_mode :"X線管球モード",
            x_ray_mode_desc :"モダリティのX線管球モード",
            protocol_share_across_model:"モデル間配信",
            backup_protocol_data:"プロトコルのバックアップ機能の有効化",
            batch_approving:"プロトコルの一括承認",
            done:"完了",
            succeed:"プロトコルの一括承認が完了しました。",
            cancel:"プロトコルの一括承認がキャンセルされました。",
            clean_succeed:"プロトコルの一括削除が完了しました。",
            clean_cancel:"プロトコルの一括削除がキャンセルされました。",
            overview:"いくつかのプロトコルの承認に失敗しました。",
            clean_master_overview:"いくつかのプロトコルの削除に失敗しました。",
            adult_abdomen_pelvis_ct: 'Adult Abdomen Pelvis CT',
            adult_brain_perfusion_ct:'Adult Brain Perfusion CT',
            adult_routine_chest_abdomen_pelvis_ct:'Adult Routine Chest Abdomen Pelvis CT',
            adult_routine_chest_ct: 'Adult Routine Chest CT',
            adult_routine_head_ct:'Adult Routine Head CT',
            lung_cancer_screening_ct:'Lung Cancer Screening CT',
            export_or_import:"プロトコルデータのバックアップ・レストア",
            export_message:"すでにバックアップされている古いデータを削除します。続けますか？",
            export_clear_message:"古いバックアップデータの削除中...",
            import_init_message:"初期化中...",
            import_message:"バックアップデータがありません。",
            export_succeed:"プロトコルのバックアップが完了しました。",
            import_succeed:"プロトコルのレストアが完了しました。",
            export_cancel:"バックアップは中断されました。",
            import_cancel:"レストアは中断されました。",
            export_overview:"いくつかのプロトコルのバックアップに失敗しました。",
            import_overview:"いくつかのプロトコルのレストアに失敗しました。",
            rpid_display:"RadLex RPID対応",
            reference_display:"ガイドライン参照",
            standard: "Standard",
            anatomical_landmark : "Anatomical Landmark",
            anatomical_landmark_plus: "Anatomical Landmark Plus",
            label_approving         : "Approving... ",
            label_cleaning          : "Deleting unnecessary protocols... ",
            label_moving          : "Moving for {0}... ",
        },
        message : {
            requesttime : "アプリ設定情報が更新されました。[更新]ボタンを押して更新してください。",
//          deleted :"プロトコル配信元を削除します。",
            protocol_pool_deleted :"スキャナー情報を削除します。",
            sources_canner_deleted :"プロトコル配信元を削除します。",
            distribution_scanner_deleted :"プロトコル配信先を削除します。",
            delete_continue :"処理を続けますか？",
            console_ok_save_warningone:"いくつかの変更は保存されませんでした。",
            console_ok_save_warningtwo:"変更を保存しますか？",
            console_delete_machine_waring:"プロトコル配信元を削除します。",
            move_continue :"登録情報の変更とプロトコル承認履歴を移動しますか？",
            console_not_taken_over_histories: "プロトコル承認履歴は新しいグループに移動されません。",
            console_wheather_move_scanner:"CTスキャナ({1})は別グループで既に登録されています。",
            console_wheather_adding_scanner:"CTスキャナを登録しますか？",
            move_successfully:"プロトコル履歴の移動を完了しました。",
            add_successfully:"追加を完了しました。",
        },
        title : {
            console_setting :"プロトコル配信元の設定",
            distribution_setting :"プロトコル配信先の設定",
            other_setting :"その他の設定",
            pool_setting :"スキャナー情報の設定",
            language_setting :"言語設定",
            setting :"設定",
            display_setting:"モデル間配信設定",
            backup_protocol_data_setting:"プロトコルのバックアップ機能の有効化",
            approve:"プロトコルを承認中...",
            clean:"プロトコルを削除中 ...",
            move:"プロトコル承認履歴を移動中...",
            title_select:"プロトコル配信履歴を更新中..." ,
            import: "レストア中...",
            export: "バックアップ中...",
            rpid_setting:"RadLex RPID対応設定",
            reference_setting:"ガイドラン参照設定"
        }
    },

    protocol_position:{
        button:
        {
            UserProtocol    : "User Protocol",
            ServiceProtocol : "Service Protocol",
            make_change:'変更する',
            active_change:'確定する',
            undo_change:'元に戻す',
            leave:'はい',
            stay:'いいえ'
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
            title_protocol_selected:'選択されたプロトコル',
            title_progress:'エキスパートプランのポジション変更',
            succeed:"プロトコルのポジション変更が完了しました。",
            label_changing          : "Changing... ",
        },
        message : {
            save_examplan_position :"現在の変更に基づいてプロトコルのポジションが更新されます。",
            confirmview_text2      : "処理を続けますか？",
            move_down_position     : "このポジションは既に他のプロトコルによって使用されています。",
            leave_page :"プロトコルのポジション変更を終了しますか？",
            not_save :"現在の変更は保存されません。",
        },
        tips : {
            not_distributed:'未配信プロトコル'
        }
    },

    error : {
        title: "エラー情報",
        event:
        {
            approve: {
                overview    : "承認",
                details        : "承認",
                details2    : "承認"
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
                overview    : "削除",
                details        : "削除",
                details2    : "削除"
            },
            restore: {
                overview    : "復元",
                details        : "復元",
                details2    : "復元"
            },
            approvetransfer: {
                overview    : "承認またはモデル間配信",
                details        : "承認またはモデル間配信",
                details2    : "承認またはモデル間配信"
            },
            transfer: {
                overview    : "モデル間配信",
                details        : "モデル間配信",
                details2    : "モデル間配信"
            },
            export: {
                overview    : "バックアップ",
                details        : "バックアップ",
                details2    : "バックアップ"
            },
            import: {
                overview    : "レストア",
                details        : "レストア",
                details2    : "レストア"
            }
        },

        ERR01002 : {
            "status"    : "error",
            "overview"    : "ライセンス取得エラー",
            "details"    : "ライセンス取得に失敗したため、アプリケーション起動を中止しました。",
            "solution"    : "ライセンスを確認してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },

        ERR11111 : {
            "status"    : "error",
            "overview"    : "予期せぬエラー",
            "details"    : "予期せぬエラーが発生しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },

        //approve core
        ERR10001 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "このプロトコルは別なユーザにより既に操作されているため, プロトコル{0}処理を中止しました。",
            "solution"    : "プロトコルの承認・削除履歴リストを確認してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10002 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}エラー",
            "details"    : "{0}中にこのプロトコルが更新されたため、プロトコル{1}処理を中止しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10007 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "プロトコルが正しく読み込めなかったため、プロトコル{0}処理を中止しました。",
            "solution"    : "ボタンを押して、承認依頼リスト画面を更新してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10008 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "サーバーへの接続に失敗したため、プロトコル{0}処理を中止しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10009 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "予期しないエラーが発生したため、プロトコル{0}処理を中止しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10010 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "ポジション変更処理に失敗したため、プロトコル{0}処理を中止しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR10011 : {
            "status"    : "error",
            "overview"    : "プロトコル復元エラー",
            "details"    : "同ポジションに別のプロトコルが存在するため、プロトコル復元を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },

        //approve web
        ERR20001 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "プロトコルの{0}処理に失敗しました。",
            "solution"    : "プロトコルを確認し、後からもう一度試してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR20002 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "使用中のファイルがあるため、プロトコル{0}処理を中止しました。",
            "solution"    : "使用中のファイルを閉じた後、もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },

        ERR30001 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "CTスキャナとプロトコルサーバの間でシステム名が異なるため、プロトコル取得を中止しました。",
            "solution"    : "プロトコルサーバに設定されているシステム名を変更してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR30002 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "CTスキャナとプロトコルサーバの間でモデル名が異なるため、プロトコル取得を中止しました。",
            "solution"    : "プロトコルサーバに設定されているモデル名を変更してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR30003 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "CTスキャナとプロトコルサーバの間でX線モードが異なるため、プロトコル取得を中止しました。",
            "solution"    : "プロトコルサーバに設定されているX線モードを変更してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR30004 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "CTスキャナとプロトコルサーバの間でソフトウェアバージョンが異なるため、プロトコル取得を中止しました。",
            "solution"    : "プロトコルサーバに設定されているソフトウェアバージョンを変更してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR30007 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "サマリファイルが正しく読み込めなかったため、プロトコル取得を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR30008 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "変更ログが正しく読み込めなかったため、プロトコル取得を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR30009 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "履歴ファイルが正しく読み込めなかったため、プロトコル取得を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR30011 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "サマリファイルがないため、プロトコル取得を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR30012 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "このプロトコルは別なユーザによって承認されています。",
            "solution"    : "ボタンを押して、承認依頼リスト画面を更新してください",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR30013 : {
            "status"    : "error",
            "overview"    : "プロトコル取得エラー",
            "details"    : "履歴ファイルがないため、プロトコル取得を中止しました。",
            "solution"    : "ボタンを押して、承認依頼リスト画面を更新してください",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        // setting tips message
        ERR50001 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "スキャナー識別子名を入力してください。",
        },
        ERR50002 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "ベンダー名を入力してください。",
        },
        ERR50003 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "モダリティ名を入力してください。",
        },
        ERR50004 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "システム名を入力してください。",
        },
        ERR50005 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "モデル名を入力してください。",
        },
        ERR50006 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "X線管球モードを入力してください。",
        },
        ERR50007 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "ソフトウェアバージョンを入力してください。",
        },
        ERR50008 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "スキャナー識別子名を選択してください。",
        },
        ERR50009 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "コンソール名を入力してください。",
        },
        ERR50010 : {
            "status"    : "error",
            "details"    : "既に同じコンソール名が登録されています。",
            "solution"    : "異なるコンソール名を登録してください。",
        },
        ERR50011 : {
            "status"    : "error",
            "details"    : "空白にできません。",
            "solution"    : "配信元コンソール名を選択してください。",
        },
        ERR50012 : {
            "status"    : "error",
            "details"    : "配信先コンソールを全て「配信しない」に設定できません。",
            "solution"    : "少なくとも1つの配信先コンソールを「配信する」に設定してください。",
        },
        ERR50013 : {
            "status"    : "error",
            "details"    : "CTスキャナ名が不正です。0-9, a-z, -, および_が使用可能です。",
            "solution"    : "CTスキャナ名を変更してください。",
        },


        // setting error message
        ERR50021 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "既に同じコンソール名が登録されています。",
            "solution"    : "異なるコンソール名を登録してください。",
            "calladmin" : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50023 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "使用中のファイルがあるため、スキャナ設定情報削除を中止しました。",
            "solution"    : "使用中のファイルを閉じた後、もう一度実行してください。",
            "calladmin" : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50024 : {
            "status"    : "error",
            "details"    : "既に同じスキャナ識別子が登録されているため、スキャナ設定情報登録を中止しました。",
            "solution"    : "異なるスキャナ識別子を使用してください。",
        },
        ERR50025 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "既に同じスキャナ情報が登録されているため、スキャナ設定情報登録を中止しました。",
            "solution"    : "登録されているスキャナ情報を確認してください。",
            "calladmin" : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50026 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "プログラムが他処理を実行中のため、スキャナ設定情報登録を中止しました。",
            "solution"    : "時間をおいて、もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50027 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "設定ファイルの変更に失敗したため、プロトコル承認履歴の移動を中止しました。",
            "solution"    : "設定ファイルの状態を確認して、もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50028 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "プログラムがタイムアウトになりました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50029 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "予期せぬエラーが発生しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },

        // Master Maker
        ERR60001 : {
            "status"    : "error",
            "overview"    : "ファイル検索エラー",
            "details"    : "ファイル検索に失敗しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR60002 : {
            "status"    : "error",
            "overview"    : "ファイル削除エラー",
            "details"    : "ファイル削除に失敗しました。",
            "solution"    : "もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },

        // App setting error message
        ERR70001 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "設定ファイルが使用中のため、コンソール設定情報更新を中止しました。",
            "solution"    : "使用中のファイルを閉じた後、もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR70002 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "設定ファイルが使用中のため、コンソール設定情報削除を中止しました。",
            "solution"    : "使用中のファイルを閉じた後、もう一度実行してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR70003 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "設定ファイルがないため、アプリ設定処理を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR70004 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "設定ファイルが正しく読み込めなかったため、アプリ設定処理を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR70005 : {
            "status"    : "error",
            "overview"    : "アプリ設定エラー",
            "details"    : "スキャナー情報が既に登録されているため、アプリ設定処理を中止しました。",
            "solution"    : "スキャナー情報を確認し、もう一度実効してください。",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },

        // Equipment setting error message
        ERR50040 : {
              "status"    : "error",
              "overview"    : "装置識別名の設定エラー",
              "details"    : "他プログラムが使用中のため、設定ファイルの更新に失敗しました。",
              "solution"    : "設定ファイルの状態を確認して、もう一度実行してください。",
              "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50041 : {
              "status"    : "error",
              "overview"    : "置識別名の設定エラー",
              "details"    : "他プログラムが編集中のため、設定ファイルの更新に失敗しました。",
              "solution"    : "設定ファイルの状態を確認して、もう一度実行してください。",
              "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR50042 : {
              "status"    : "error",
              "overview"    : "置識別名の設定エラー",
              "details"    : "設定ファイルが読み込めなかったため、設定ファイルの更新に失敗しました。",
              "solution"    : "設定ファイルの状態を確認して、もう一度実行してください。",
              "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },		
		
        //transfer error message
        ERR80001 : {
            "status"    : "error",
            "overview"    : "プロトコルのモデル間配信エラー",
            "details"    : "プロトコル {0} は {1} へ既に配信されているため, プロトコルのモデル間配信を中止しました。",
            "solution"    : "配信履歴タブを開いて配信状況をご確認ください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR80002 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "このプロトコルの読み込みに失敗したため, プロトコルの{0}処理を中止しました。",
            "solution"    : "配信履歴タブを開いて配信状況をご確認ください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR80003 : {
            "status"    : "error",
            "overview"    : "プロトコル{0}処理エラー",
            "details"    : "予期せぬエラーが発生したため, プロトコルの{0}処理を中止しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR80004 : {
            "status"    : "error",
            "overview"    : "モデル間配信エラー",
            "details"    : "設定ファイルのモデル間配信の設定がOFFになっています。",
            "solution"    : "設定ファイル'ProtocolManagement.xml'を確認してください。",
            "calladmin"    : "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR0005 : {
            "status"    : "info",
            "overview"    : "Volume EC 重複の発生",
            "details"    : "以下の同名プリセットがマスターリストに登録されています: ",
            "solution"    : "置き換えが必要な場合は, マスターリストから削除後、追加してください。",
            "calladmin"    : ""
        },
        ERR0006 : {
            "status"    : "info",
            "overview"    : "<sup>SURE</sup>IQ 重複の発生",
            "details"    : "以下の同名プリセットがマスターリストに登録されています: ",
            "solution"    : "置き換えが必要な場合は, マスターリストから削除後、追加してください。",
            "calladmin"    : ""
        },
        ERR0007 : {
            "status"    : "info",
            "overview"    : "造影剤プリセット 重複の発生",
            "details"    : "以下の同名プリセットがマスターリストに登録されています: ",
            "solution"    : "置き換えが必要な場合は, マスターリストから削除後、追加してください。",
            "calladmin"    : ""
        },
        ERR0008 : {
        	"status"    : "error",
            "overview"    : "マスターリスト管作成エラー",
            "details"    : "<sup>SURE</sup>IQにScanoのプロトコルが登録されていません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0009 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "<sup>SURE</sup>IQはAdult以外の患者タイプのプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0010 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "<sup>SURE</sup>IQはAdult以外の患者タイプのプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0011 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ 最大数の超過",
            "details"    : "<sup>SURE</sup>IQ で定義できるOrgan Typeは{1}種類のため、マスターリストへの追加を中止しました: ",
            "solution"    : "新規追加が必要な場合は、マスターリストから不要なOrgan Typeを削除してください。",
            "calladmin"    : ""
        },
        ERR0012 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ 最大数の超過",
            "details"    : "<sup>SURE</sup>IQ で定義できるプリセット数はOrgan Type1つにつき{1}種類のため、マスターリストへの追加を中止しました:",
            "solution"    : "新規追加が必要な場合は、マスターリストから不要なプリセットを削除してください。",
            "calladmin"    : ""
        },
        ERR0013 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "<sup>SURE</sup>IQは{1}種類を超えるプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0014 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECはAdult, Child以外の患者タイプのプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0015 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECはHead, Neck, All, ECG以外の部位のプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0016 : {
            "status"    : "error",
            "overview"    : "Volume EC 最大数の超過",
            "details"    : "Volume ECで定義できるプリセット数は{1}種類のため、マスターリストへの追加を中止しました: ",
            "solution"    : "新規追加が必要な場合は、マスターリストから不要なプリセットを削除してください。",
            "calladmin"    : ""
        },
        ERR0017 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "造影剤プリセットはAdult, Child以外の患者タイプのプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0018 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECは1つの部位に少なくとも1つ以上のプロトコルを登録する必要があります。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0019 : {
        	"status"      : "error",
            "overview"    : "ポジション変更エラー",
            "details"     : "予期せぬエラーが発生しました。",
            "solution"    : "",
            "calladmin"    : "サービス窓口までご連絡ください。"
        },
        ERR0020 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "同じ装置識別名が登録されています。",
            "solution"    : "違う名前に変更してください。",
            "calladmin"    : ""
        },
        ERR0021 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "装置識別名が長すぎます。",
            "solution"  : "装置識別名を40文字以内に変更してください。",
            "calladmin" : ""
        },
        ERR0022 : {
            "status"    : "error",
            "overview"  : "",
            "details"   : "追加するCTスキャナーに承認履歴があるか確認してください。",
            "solution"  : "",
            "calladmin" : ""
        },
        ERR0023 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECにAdult, Childの各患者タイプのプロトコルが登録されていません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0024 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECにHead, Neck, All, ECGの各部位のプロトコルが登録されていません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0025 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "<sup>SURE</sup>IQは{1}種類を超えるプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0026 : {
        	"status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "Volume ECはAdult, Child以外の患者タイプのプロトコルを登録できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0027 : {
            "status"    : "info",
            "overview"    : "<sup>SURE</sup>IQ 重複の発生",
            "details"    : "配信履歴リストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0028 : {
            "status"    : "info",
            "overview"    : "Volume EC 重複の発生",
            "details"    : "配信履歴リストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
		ERR0029 : {
            "status"    : "info",
            "overview"    : "造影剤プリセット　重複の発生",
            "details"    : "配信履歴リストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0030 : {
            "status"    : "error",
            "overview"    : "Volume EC 重複の発生",
            "details"    : "マスターリストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0031 : {
            "status"    : "error",
            "overview"    : "<sup>SURE</sup>IQ 重複の発生",
            "details"    : "マスターリストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0032 : {
            "status"    : "error",
            "overview"    : "造影剤プリセット 重複の発生",
            "details"    : "マスターリストに同名のプリセットが存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0033 : {
            "status": "error",
            "overview": "バックアップ失敗",
            "details": "バックアップ中に問題が発生しました。",
            "solution": "バックアップ先を確認し、もう一度実行してください。",
            "calladmin": "問題が続く場合は、サービス窓口までご連絡ください。"
        },
        ERR0034 : {
            "status"    : "info",
            "overview"    : "Voice Preset 重複の発生",
            "details"    : "マスターリストに同名のプリセットが存在するため、マスターリストへの追加を中止しました:  ",
            "solution"    : "マスターリスト上のプリセットを更新したい場合は、マスターリストから削除した後、更新してください。",
            "calladmin"    : ""
        },
        ERR0035 : {
            "status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "最大20つのLanguageがマスターリストへ登録可能です:",
            "solution"    : "マスターリストへ追加したい場合は、既に登録したプリセットを削除してください。",
            "calladmin"    : ""
        },
        ERR0036 : {
            "status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "1つのLanguageには最大10つのプリセットがマスターリストへ登録可能です:",
            "solution"    : "マスターリストへ追加したい場合は、既に登録したプリセットを削除してください。",
            "calladmin"    : ""
        },
        ERR0037 : {
            "status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "次の6つのLanguageのマスターリストへの登録が必要です:<BR><BR>Japanese<BR>English<BR>Chinese<BR>Korean<BR>Spanish<BR>Portuguese",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0038 : {
            "status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "１つのLanguageには少なくとも5つのプリセットのマスターリストへの登録が必要です。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0039 : {
            "status"    : "info",
            "overview"    : "Voice Preset 重複の発生",
            "details"    : "マスターリストに同名のプリセットが配信履歴リストに存在するため、マスターリストへの追加を中止しました。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0040 : {
            "status"    : "error",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "<sup>SURE</sup>IQはいずれの部位に対しても最低1つはプリセットの作成が必要です。",
            "solution"    : "<sup>SURE</sup>IQプリセットを追加してください。",
            "calladmin"    : ""
        },
        ERR0041 : {
            "status"    : "",
            "overview"    : "マスターリスト作成エラー",
            "details"    : "同じIndexを持つVoiceプリセットが配信履歴リストに存在します。.<br>{0}",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0042 : {
            "status"    : "",
            "overview"    : "",
            "details"    : "次のポジション変更が失敗しました。<BR>{0}<BR>",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0043 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "変更場所に承認依頼中のプロトコルがあるため、ポジション変更できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0044 : {
            "status"    : "error",
            "overview"    : "",
            "details"    : "使用可能なポジションがないため、ポジション変更できません。",
            "solution"    : "",
            "calladmin"    : ""
        },
        ERR0045 : {
            "status"    : "error",
            "overview"    : "プロトコル更新エラー",
            "details"    : "プロトコルが使用中につきロックされているため、プロトコル更新できません。",
            "solution"    : "もう一度実行してください。.",
            "calladmin"    : ""
        }
    }

};