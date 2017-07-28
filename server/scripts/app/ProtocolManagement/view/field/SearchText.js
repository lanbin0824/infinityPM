/*!
 * JS Click Panel 
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.field.SearchText
 * @extends Ext.Button
 */
Ext.define('PM.view.field.SearchText', {
    extend:'Ext.form.field.Text',
    alias: 'widget.textfieldview',
    
    noemptyCls : "",
    
    initComponent : function(){
        this.callParent();
    },
    
    preFocus : function(){
        var me = this,
            inputEl = me.inputEl,
            emptyText = me.emptyText,
            isEmpty = false;

        if (emptyText && !Ext.supports.Placeholder && inputEl.dom.value === emptyText) {
            me.setRawValue('');
            isEmpty = true;
            inputEl.removeCls(me.emptyCls);
            if(me.noemptyCls != "")
            {
            	inputEl.addCls(me.noemptyCls);
            }
        } else if (Ext.supports.Placeholder) {
            me.inputEl.removeCls(me.emptyCls);
            if(me.noemptyCls != "")
            {
            	me.inputEl.addCls(me.noemptyCls);
            }
        }
        
        if (me.selectOnFocus || isEmpty) {
            inputEl.dom.select();
        }
    },
    getRawValue: function() {
        var me = this,
            v = me.callParent();
        if(v === undefined){
            v = '';
        }
        if (v === me.emptyText && me.valueContainsPlaceholder) {
            v = '';
        }
        return v;
    }/*,
    applyEmptyText : function(){
        var me = this,
            emptyText = me.emptyText,
            isEmpty;

        if (me.rendered && emptyText) {
            isEmpty = me.getRawValue().length < 1 && !me.hasFocus;

            if (Ext.supports.Placeholder) {
                me.inputEl.dom.placeholder = emptyText;
            } else if (isEmpty) {
                me.setRawValue(emptyText);
            }
            
            if (isEmpty) {
                me.inputEl.addCls(me.emptyCls);
            }
            else if(me.noemptyCls != "")
        	{
            	me.inputEl.addCls(me.noemptyCls);
        	}

            me.autoSize();
        }
    }*/

});