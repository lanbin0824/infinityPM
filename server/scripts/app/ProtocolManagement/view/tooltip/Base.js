/*!
 * ToolTip
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

/**
 * @class PM.view.tooltip.Base
 * @extends Ext.tip.ToolTip
 */
Ext.define('PM.view.tooltip.Base', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.TooltipView',
    showDelay : showDelay,
    showWidth	: 200,
    
    // @private
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.addListener('beforeshow', function (t) {
            var tips = Ext.ComponentQuery.query('TooltipView');
            for (t in tips) {
                if (!tips[t].hidden) {
                    tips[t].hide();
                }
            }

        });
    },

    getMouseOffset: function() {
        var me = this,
        offset = me.anchor ? [0, 0] : [15, 18];
        if (me.mouseOffset) {
            offset[0] += me.mouseOffset[0];
            offset[1] += me.mouseOffset[1];
        }
        return offset;
    },
    getTargetXY: function() {
        var me = this,
            mouseOffset,
            offsets, xy, dw, dh, de, bd, scrollX, scrollY, axy, sz, constrainPosition;
        if (me.delegate) {
            me.anchorTarget = me.triggerElement;
        }
        if (me.anchor) {
            me.targetCounter++;
            offsets = me.getOffsets();
            xy = (me.anchorToTarget && !me.trackMouse) ? me.getAlignToXY(me.anchorTarget, me.getAnchorAlign()) : me.targetXY;
            dw = Ext.Element.getViewWidth() - 5;
            dh = Ext.Element.getViewHeight() - 5;
            de = document.documentElement;
            bd = document.body;
            scrollX = (de.scrollLeft || bd.scrollLeft || 0) + 5;
            scrollY = (de.scrollTop || bd.scrollTop || 0) + 5;
            axy = [xy[0] + offsets[0], xy[1] + offsets[1]];
            sz = me.getSize();
            constrainPosition = me.constrainPosition;

            me.anchorEl.removeCls(me.anchorCls);

            if (me.targetCounter < 2 && constrainPosition) {
                if (axy[0] < scrollX) {
                    if (me.anchorToTarget) {
                        me.defaultAlign = 'l-r';
                        if (me.mouseOffset) {
                            me.mouseOffset[0] *= -1;
                        }
                    }
                    me.anchor = 'left';
                    return me.getTargetXY();
                }
                if (axy[0] + sz.width > dw) {
                    if (me.anchorToTarget) {
                        me.defaultAlign = 'r-l';
                        if (me.mouseOffset) {
                            me.mouseOffset[0] *= -1;
                        }
                    }
                    me.anchor = 'right';
                    return me.getTargetXY();
                }
                if (axy[1] < scrollY) {
                    if (me.anchorToTarget) {
                        me.defaultAlign = 't-b';
                        if (me.mouseOffset) {
                            me.mouseOffset[1] *= -1;
                        }
                    }
                    me.anchor = 'top';
                    return me.getTargetXY();
                }
                if (axy[1] + sz.height > dh) {
                    if (me.anchorToTarget) {
                        me.defaultAlign = 'b-t';
                        if (me.mouseOffset) {
                            me.mouseOffset[1] *= -1;
                        }
                    }
                    me.anchor = 'bottom';
                    return me.getTargetXY();
                }
            }

            me.anchorCls = Ext.baseCSSPrefix + 'tip-anchor-' + me.getAnchorPosition();
            me.anchorEl.addCls(me.anchorCls);
            me.targetCounter = 0;
            return axy;
        } else {
            mouseOffset = me.getMouseOffset();
            var clientW = document.documentElement.scrollWidth;
            var clientH = document.documentElement.scrollHeight;
            var h = me.getSize().height + 30;
            if(clientW - me.targetXY[0] < me.showWidth)
            {
            	mouseOffset[0] = mouseOffset[0] - (me.showWidth - (clientW - me.targetXY[0]));
            }
            if(clientH - me.targetXY[1] < h)
            {
                mouseOffset[1] = mouseOffset[1] - h;
            }

            return (me.targetXY) ? [me.targetXY[0] + mouseOffset[0], me.targetXY[1] + mouseOffset[1]] : mouseOffset;
        }
    },
});

