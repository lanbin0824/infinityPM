/*! 
 * JS Console ConfirmView 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights 
 *  
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.request.References
 * @extends PM.view.common.window.ModalDialog
 */

Ext.define('PM.view.request.References', {
    extend                  : 'PM.view.common.window.ModalDialog',
    layout                  : {
        type    : 'border'
    },
    btnCancelConfirm        : null,
    panelConfirmButton      : null,
    panelConfirmCenter      : null,
    height                  : 360,
    width                   : 800,
    cls                     : 'x-Confirm-window',
    bodyCls                 : 'x-Confirm-window-body',
    initComponent           : function() 
    {        
        var me = this;

        me.btnCancelConfirm = Ext.create('Ext.Button', {
            height      : 32,
            width       : 118,
            cls         : 'icon-button',
            overCls     : 'icon-button-over',
            pressedCls  : 'icon-button-pressed',
            focusCls    : 'icon-button-focus',
            disabledCls : 'icon-button-disable',
            text        : '<span class="SpanTextView">'+ stringSetting.request.button.close +'<span>',
            disabled    : false,
            handler     : function() {
                me.closeWin();
            }
        });

        me.panelConfirmButton = Ext.create('Ext.panel.Panel', {
            region          : 'south',
            height          : 60,
            minHeight       : 60,
            maxHeight       : 60,
            cls             : 'panel-NoborderPadding',
            bodyCls         : 'button-Color-NoborderPadding',
            layout          : {
                type        : 'hbox',
                padding     : '0 0 0 0',
                align       : 'middle',
                pack        : 'end'
            },
            defaults        : {
                padding     : '0 0 0 0',
                margins     : '0 8 0 0'
            },
            items           : [me.btnCancelConfirm]
        });
                
        me.panelConfirmCenter = Ext.create('PM.view.panel.Click', {
            region          : 'center',
            bodyCls         : 'panel-comfirm-center',
            bodyPadding     : 12,
            border          : 1,
            autoScroll      : true,
            defaults        : {
                frame       : false
            },
            html            : me.initTableHtml(),
            onClick         : function(e) {
                var tdEl = document.getElementsByClassName("icon-button-Open-References");
                for(var i=0;i<tdEl.length;i++)
                {
                    if(e.target==tdEl[i])
                    {
                        var name = tdEl[i].getAttribute("name");
                        me.openPDF(name);
                    }                    
                }     
            }
        });
        Ext.applyIf(this, {
            items    : [
                me.panelConfirmCenter, 
                me.panelConfirmButton
            ]
        });
        this.callParent(arguments);
        
    },
    initTableHtml : function() {
        var _array = [];
        _array.push('<table  class="Setting-List-Table-win">');
        _array.push('<thead><tr><td class="start">'+stringSetting.app_setting.column.association+'</td>');
        _array.push('<td>'+stringSetting.app_setting.column.guideline+'</td><td style="width:140px"></td></tr></thead>');
        _array.push('<tbody style="cursor:normal;">');
        _array.push('<tr class="even"><td class="start">AAPM</td>');
        _array.push('<td>' + stringSetting.app_setting.label.adult_abdomen_pelvis_ct + '</td> ');
        _array.push('<td><div name="AdultAbdomenPelvisCT" class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('<tr class="odd"><td class="start">AAPM</td>');
        _array.push('<td>' + stringSetting.app_setting.label.adult_brain_perfusion_ct + '</td> ');
        _array.push('<td><div name="AdultBrainPerfusionCT" class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('<tr class="even"><td class="start">AAPM</td>');
        _array.push('<td>' + stringSetting.app_setting.label.adult_routine_chest_abdomen_pelvis_ct + '</td> ');
        _array.push('<td><div name="AdultRoutineChestAbdomenPelvisCT"  class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('<tr class="odd"><td class="start">AAPM</td>');
        _array.push('<td>' + stringSetting.app_setting.label.adult_routine_chest_ct + '</td> ');
        _array.push('<td><div name="AdultRoutineChestCT" class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('<tr class="even"><td class="start">AAPM</td>');
        _array.push('<td>' + stringSetting.app_setting.label.adult_routine_head_ct + '</td> ');
        _array.push('<td><div name="AdultRoutineHeadCT" class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('<tr class="odd"><td class="endline start">AAPM</td>');
        _array.push('<td class="endline">' + stringSetting.app_setting.label.lung_cancer_screening_ct + '</td> ');
        _array.push('<td class="endline"><div name="LungCancerScreeningCT"  class="icon-button-Open-References">'+stringSetting.compare.button.save+'</div></td>');
        _array.push('</tbody></table>');
        return _array.join('');
    },
    openPDF : function(pdfPath){
        var path = PROCESS_PATH_GLOBAL_REFERENCE + pdfPath +".pdf";
        var pom = document.createElement('a');
        pom.setAttribute('href', path);
        pom.setAttribute('download', pdfPath +'.pdf');
        if (document.createEvent) {
           var event = document.createEvent('MouseEvents');
           event.initEvent('click', true, true);
           pom.dispatchEvent(event);
        } else {
           pom.click();
       }
    }
});
