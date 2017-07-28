/*!
 * JS Click Panel
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.header.ResizeView
 * @extends PM.view.panel.Click
 */

Ext.define("PM.view.header.ResizeView",
{
    extend      : 'PM.view.panel.OnMouse',
    cls         : "columnHeader-Chrome-17",
    bodyCls     : "columnHeader-body-Chrome",
    layout      : {
        type : 'fit'
    },

    tableCls    : 'RequestList-Header',
    tdResizeCss : 'td-resize-line',
    spanCls     : 'spanGridColumn-header',
    columnData  : [],
    filterMenu  : null,

    resizeColumn        : true,

    colKey              : 0,
    clientXInit         : 0,
    clientXChange       : 0,
    pageXOffset         : 0,
    panelTop            : 121,
    marker              : null,
    pageType            : "Request",
    otherCellWidth      : 0,
    parentPanel         : null,
    privateScrollWidth  : null,

    getSortIndexFn      : null,
    updateIconFn        : null,

    getOterAreaIndexFn  : null,
    oterAreaFn          : null,

    task                : null,
    mouseOutFlg         : false,

    initComponent: function ()
    {
        this.marker = document.getElementById('marker');
        Ext.applyIf(this, {
            html        : this.getColumnHeader(false)
        });
        this.callParent(arguments);
    },

    removeScroll : function(_addCls)
    {
        this.removeCls(this.cls);
        if(_addCls != null)
        {
            this.addCls(_addCls);
        }
        else
        {
            this.addCls("columnHeader-nopadding");
        }

        this.update(this.getColumnHeader(false));
    },

    addScroll : function(_addCls)
    {
        this.removeCls(this.cls);
        this.removeCls("columnHeader-nopadding");
        if(_addCls != null)
        {
            this.addCls(_addCls);
        }
        else
        {
            this.addCls(getChromeScrollCss());
        }
        this.update(this.getColumnHeader(false));
    },

    getColumnData    : function (index)
    {
        return this.columnData[index];
    },

    addHistoryHtml : function(_array, resize)
    {
        var me = this;
        _array.push('<tr>');

        for(var i = 0;i < me.columnData.length;i++)
        {
            _array.push('<td ');
            _array.push(' colKey = ' + i + ' ');

            if(me.columnData[i].width !== undefined && me.columnData[i].width != '')
            {
                var _width = me.columnData[i].width;
                if(i == 0)
                {
                    _width = _width - 3;
                }
                else if(i == me.columnData.length - 1)
                {
                    _width = _width - 2;
                }
                else
                {
                    _width = _width - 5;
                }
                if(me.columnData[i].sort)
                {
                    _width = _width - 28;
                }
                _array.push('width = "' + _width + '" ');
            }
            else if(resize != null && resize == false)
            {
                var spaceWidth = me.getSpaceCellWidth();
                if(spaceWidth < me.columnData[i].minWidth)
                {
                    spaceWidth = me.columnData[i].minWidth;
                    if(i == 0)
                    {
                        spaceWidth = spaceWidth - 3;
                    }
                    else if(i == me.columnData.length - 1)
                    {
                        spaceWidth = spaceWidth - 2;
                    }
                    else
                    {
                        spaceWidth = spaceWidth - 5;
                    }
                    if(me.columnData[i].sort)
                    {
                        if(me.columnData[i].sortWidth != null)
                        {
                            spaceWidth = spaceWidth - me.columnData[i].sortWidth;
                        }
                        else
                        {
                            spaceWidth = spaceWidth - 28;
                        }
                    }
                    _array.push('width = "' + spaceWidth + '" ');
                }
            }

            _array.push('class = "' + me.columnData[i].cls + '">');
            _array.push('</td>');

            if(me.columnData[i].sort)
            {
                _array.push('<td class = "' + me.columnData[i].arrowsCls + '"');
                _array.push(' colKey = ' + i + '>');
                _array.push(me.columnData[i].arrowsValue.replace('style="', 'style="display: none;'));
                _array.push('</td>');
            }
            if(i != me.columnData.length - 1)
            {
                _array.push('<td class = "' + me.tdResizeCss +'"');
                _array.push(' colKey = ' + i + '>');
                _array.push('</td>');
            }
        }

        _array.push('</tr>');
    },
    setPrivateScrollWidth : function(w)
    {
        var me = this;
        me.privateScrollWidth = w;
    },
    getColumnHeader    : function (resize)
    {
        var me = this;
        var _array = new Array();
        _array.push('<table draggable = "false" onselectstart="return false" ');
        _array.push('ondrag="return false" ');
        if(me.privateScrollWidth != null)
        {
            _array.push('style="width: ' + me.privateScrollWidth + 'px;" ');
        }

        _array.push('class = "' + this.tableCls + '">');
        if(this.pageType == "History")
        {
            me.addHistoryHtml(_array, resize);
        }
        _array.push('<tr>');

        var end = me.columnData.length - 1;
        for(var i = 0;i < this.columnData.length;i++)
        {
            var areaOtherOffsetWidth = 0;
            _array.push('<td ');
            _array.push(' colKey = ' + i + ' ');

            if(this.columnData[i].width != '')
            {
                var _width = this.columnData[i].width;
                if(i == 0)
                {
                    _width = _width - 3;
                }
                else if(i == end)
                {
                    _4k_width = (document.documentElement.clientWidth>2000)? 8:2;
                    _width = _width - _4k_width;
                }
                else
                {
                    _width = _width - 5;
                }
                if(this.columnData[i].sort)
                {
                    _width = _width - 28;
                }
                if(me.columnData[i].otherArea != null)
                {
                    if(me.columnData[i + 1] == null ||
                       me.columnData[i + 1].sort == null ||
                       me.columnData[i + 1].sort == false)
                    {
                        areaOtherOffsetWidth =  3;
                    }
                    _width = _width - me.columnData[i].otherArea.width - areaOtherOffsetWidth;
                }
                _array.push('width = "' + _width + '" ');
            }
            else if(resize != null && resize == false)
            {
                var spaceWidth = this.getSpaceCellWidth();
                if(spaceWidth < this.columnData[i].minWidth)
                {
                    spaceWidth = this.columnData[i].minWidth;
                    if(i == 0)
                    {
                        spaceWidth = spaceWidth - 3;
                    }
                    else if(i == end)
                    {
                        _4k_width = (document.documentElement.clientWidth>2000)? 8:2;
                        spaceWidth = spaceWidth - 2;
                    }
                    else
                    {
                        spaceWidth = spaceWidth - 5;
                    }
                    if(this.columnData[i].sort)
                    {
                        if(this.columnData[i].sortWidth != null)
                        {
                            spaceWidth = spaceWidth - this.columnData[i].sortWidth;
                        }
                        else
                        {
                            spaceWidth = spaceWidth - 28;
                        }
                    }
                    _array.push('width = "' + spaceWidth + '" ');
                }
            }

            _array.push('class = "' + this.columnData[i].cls + '">');
            if(this.columnData[i].value != "")
            {
                _array.push('<span unselectable="on" class ="' + me.spanCls + '">');
                _array.push(this.columnData[i].value);
                _array.push('</span>');
            }
            _array.push('</td>');

            if(this.columnData[i].sort)
            {
                _array.push('<td class = "' + this.columnData[i].arrowsCls + '"');
                _array.push(' colKey = ' + i + '>');
                _array.push(this.columnData[i].arrowsValue);
                _array.push('</td>');
            }
            if(me.columnData[i].otherArea)
            {
                _array.push('<td class = "' + me.columnData[i].otherArea.cls + '"');
                _array.push(' width = "' + (me.columnData[i].otherArea.width + areaOtherOffsetWidth) + '"');
                _array.push(' colKey = ' + i + '>');
                _array.push(me.columnData[i].otherArea.val);
                _array.push('</td>');
            }
            if(i != end)
            {
                _array.push('<td class = "' + me.tdResizeCss +'"');
                _array.push(' colKey = ' + i + '>');
                _array.push('</td>');
            }
        }

        _array.push('</tr>');
        _array.push('</table>');

        return _array.join('');
    },
    onMouseDown: function (e)
    {
        var event = e || window.event;
        var browserEvent = event.browserEvent;

        var targetTdEl = browserEvent.target || event.target;

        if(targetTdEl.className != this.tdResizeCss ||
           targetTdEl.offsetParent.className != this.tableCls)
        {
            return;
        }
        viewDocumentResize = this;
        this.colKey = Number(targetTdEl.getAttribute("colKey"));
        this.clientXInit = browserEvent.clientX;
        this.clientXChange = -1;
        this.pageXOffset = window.pageXOffset;
        var _markerStyle = new Array();
        _markerStyle.push("z-index:100;");
        _markerStyle.push("Left:" + (this.clientXInit + this.pageXOffset) + "px;");
        _markerStyle.push("top:" + this.panelTop + "px;");
        _markerStyle.push("height:" + this.getLineHeight() + "px;");
        this.marker.setAttribute("style",_markerStyle.join(''));
        bDocumentDrag = true;
    },

    onMouseOver: function (e)
    {
        var me = this;
        var el = e.target;

        if(bDocumentDrag)
        {
            return;
        }
        if(me.pageType == "Request" && me.parentPanel.selectRowNum != -1)
        {
            return;
        }
        if(el.tagName == "SPAN" || el.tagName == "IMG")
        {
            el = el.parentElement;
        }
        if(el.getAttribute('colKey') == null)
        {
            return;
        }

        var exist = false;
        for(var i = 0;i < me.columnData.length;i++)
        {
            //this.columnData[i].cls == el.className
            if(this.columnData[i].filter != null &&
               i == el.getAttribute('colKey'))
            {
                if(me.filterMenu == null)
                {
                    var filterConfig = {};
                    if(memoryLanguage === 'ES'){
                        filterConfig = {
                            'divWidth':200
                        } ;
                    }else{
                        if( memoryLanguage === 'DE' || memoryLanguage === 'IT'|| memoryLanguage === 'NL'|| memoryLanguage === 'PT'){
                            filterConfig = {
                                'divWidth':170
                            } ;
                        }
                    }
                    me.filterMenu = Ext.create('PM.view.menu.Filter',filterConfig);
                }
                var configs = [
                    {
                        name        : stringSetting.menu.filter.SortAscending,
                        src         : PROCESS_PATH_GLOBAL_RESOURCES + 'images/arrows/hmenu-asc.gif',
                        click       : function(){
                            me.updateIconFn(i, me.parentPanel, 'up');
                            me.dataUpdate();
                            me.filterMenu.ClearDiv();
                        }
                    },
                    {
                        name        : stringSetting.menu.filter.SortDescending,
                        src         : PROCESS_PATH_GLOBAL_RESOURCES + 'images/arrows/hmenu-desc.gif',
                        click       : function(){
                            me.updateIconFn(i, me.parentPanel, 'down');
                            me.dataUpdate();
                            me.filterMenu.ClearDiv();
                        },
                        bottomLine  : true
                    },
                    {
                        name        : stringSetting.menu.filter.Filter,
                        src         : PROCESS_PATH_GLOBAL_RESOURCES + 'images/combox/columns.gif',
                        fuc         : null,
                        parent      : PROCESS_PATH_GLOBAL_RESOURCES + 'images/combox/menu-parent.gif',
                        getFilterFn : function()
                        {
                            return me.getFilterList(i);
                        },
                        setFilterFn : function(index, bool)
                        {
                            var filterList = me.getFilterList(i);
                            if(index == -1)
                            {
                                for(var j = 0;j < filterList.length;j++)
                                {
                                    filterList[j].check = bool;
                                }
                                me.doFilterData(null, index, bool, i);
                            }
                            else
                            {
                                filterList[index].check = bool;
                                me.doFilterData(filterList, index, bool, i);
                            }
                        }
                    }
                ];
                me.mouseOutFlg = false;
                var temp = window.event;
                if (me.task) {
                    me.task.cancel();
                }
                var clientX = temp.clientX;
                var clientY = temp.clientY;
                me.task = new Ext.util.DelayedTask(function(){
                    if (me.mouseOutFlg === false) {
                        me.filterMenu.CreateMenu(configs, me, temp, i,clientX,clientY);
                    }
                });
                me.task.delay(showDelay);
                exist = true;
                break;
            }
        }
        if(me.filterMenu != null && !exist)
        {
            me.filterMenu.ClearDiv();
        }
    },

    getFilterList: function(index)
    {
        return this.columnData[index].filter.list;
    },

    widthChange: function ()
    {
        var me = this;
        if(me.clientXChange == -1 || me.resizeColumn == false)
        {
            return;
        }
        if(me.columnData[me.colKey].width != '')
        {
            me.columnData[me.colKey].width =
                        me.columnData[me.colKey].width
                        + me.clientXChange
                        - me.clientXInit;
        }
        if(me.columnData[me.colKey + 1].width != '')
        {
            me.columnData[me.colKey + 1].width =
                        me.columnData[me.colKey + 1].width
                        - me.clientXChange
                        + me.clientXInit;
        }

        if(me.pageType == "History")
        {
            me.parentPanel.widthChange(me);
        }
        else
        {
            me.panelUpdate();
            me.dataUpdate();
        }

    },

    panelUpdate:    function()
    {
        this.update(this.getColumnHeader(false));
    },

    setMoveAction: function(e)
    {
        this.clientXChange = e.clientX;

        var _preWidth = 0;
        var _nextWidth = 0;
        var offsetWidth = 0;
        if(this.pageType == "History")
        {
            offsetWidth = this.parentPanel.offsetWidth
                            + this.parentPanel.getSpaceScrollWidth();
        }
        if(this.columnData[this.colKey].width == '')
        {
            _preWidth = this.getSpaceCellWidth(this.columnData[this.colKey].minWidth) + offsetWidth;

            if(_preWidth < this.columnData[this.colKey].minWidth)
            {
                _preWidth = this.columnData[this.colKey].minWidth;
            }
        }
        else
        {
            _preWidth = this.columnData[this.colKey].width;
        }
        if(this.columnData[this.colKey + 1].width == '')
        {
            _nextWidth = this.getSpaceCellWidth(this.columnData[this.colKey].minWidth) + offsetWidth;
            if(_nextWidth < this.columnData[this.colKey + 1].minWidth)
            {
                _nextWidth = this.columnData[this.colKey + 1].minWidth;

            }
        }
        else
        {
            _nextWidth = this.columnData[this.colKey + 1].width;
        }

        if(this.clientXChange - this.clientXInit > _nextWidth - this.columnData[this.colKey + 1].minWidth)
        {
            this.clientXChange = this.clientXInit + _nextWidth - this.columnData[this.colKey + 1].minWidth;

        }
        else if(this.clientXInit - this.clientXChange > _preWidth - this.columnData[this.colKey].minWidth)
        {
            this.clientXChange = this.clientXInit - _preWidth + this.columnData[this.colKey].minWidth;

        }

        var _markerStyle = new Array();
        _markerStyle.push("z-index:100;");
        _markerStyle.push("Left:" + (this.clientXChange + this.pageXOffset) + "px;");
        _markerStyle.push("top:" + this.panelTop + "px;");
        _markerStyle.push("height:" + this.getLineHeight() + "px;");
        this.marker.setAttribute("style",_markerStyle.join(''));
    },

    getLineHeight: function()
    {
        var height = 0;
        if(this.pageType == "Request")
        {
            if(this.parentPanel.headCenterPanel.isHidden())
            {
                height = this.parentPanel.centerPanel.getHeight() + 15;
            }
            else
            {
                height = this.parentPanel.headCenterPanel.getHeight() + 26;
            }
        }
        else if(this.pageType == "History")
        {
            if(this.parentPanel.selectRowNum != -1)
            {
                height = 30 + this.parentPanel.historyPanelHeight;
            }else
            {
                height = this.parentPanel.centerPanel.getHeight() - 14 + this.parentPanel.dropLineHeight;
            }
        }
        else if(this.pageType == "HistoryList")
        {
            if(this.parentPanel.selectRowNum != -1)
            {
                height = this.parentPanel.headCenterPanel.getHeight() + 16;
            }else
            {
                height = this.parentPanel.centerPanel.getHeight() + 28;
            }
        }
        return height;
    },

    getSpaceCellWidth : function(min)
    {
        var me = this;
        var cellWidth = 0;

        for(var i = 0;i < me.columnData.length;i++)
        {
            if(me.columnData[i].width != '')
            {
                cellWidth = cellWidth + me.columnData[i].width;
            }
        }
        if(me.pageType == "Request")
        {
            cellWidth = document.documentElement.scrollWidth - cellWidth - 66;
        }
        else if(me.pageType == "History")
        {
            cellWidth = document.documentElement.scrollWidth - 43 -
                        me.otherCellWidth - cellWidth;

            cellWidth = cellWidth - me.parentPanel.getSpaceScrollWidth();
        }
        else if(me.pageType == "HistoryList")
        {
            cellWidth = document.documentElement.scrollWidth - 43 -
                (me.parentPanel.scrollFlag ? me.parentPanel.scrollWidth : 0)
                - cellWidth;
        }
        else if(me && me.body)
        {
            var border = 0;
            if(me.pageType == "Original" || me.pageType == "Master")
            {
                border = 2;
            }
            if(me.privateScrollWidth != null)
            {
                cellWidth = me.privateScrollWidth - cellWidth - border;
            }
            else
            {
                cellWidth = me.getWidth() - chromeScrollWidth - cellWidth - border;
            }
        }

        if(min != null && cellWidth < min)
        {
            cellWidth = min;
        }

        return cellWidth;
    },

    onClick: function (e)
    {
        var me = this;
        if(me.getOterAreaIndexFn && me.oterAreaFn)
        {
            var index = me.getOterAreaIndexFn(e.target, me.parentPanel);
            if(index != null)
            {
                me.oterAreaFn(index, me.parentPanel);
                return;
            }
        }
        if(me.getSortIndexFn && me.updateIconFn)
        {
            var sortIndex = me.getSortIndexFn(e.target, me.parentPanel);
            if(sortIndex != null)
            {
                me.updateIconFn(sortIndex, me.parentPanel);
                me.dataUpdate();
                return;
            }
        }
    },
    dataUpdate : function() {},
    doFilterData : function(){},
    onMouseUp : function (e){},
    onMouseMove : function (e){},
    onMouseOut : function (e){
        var me = this;
        me.mouseOutFlg = true;
    },
});