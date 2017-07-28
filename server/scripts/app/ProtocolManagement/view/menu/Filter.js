/*!
 * JS Click Panel
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.menu.Filter
 * @extends Ext.app.Controller
 */

Ext.define("PM.view.menu.Filter",
{
    extend: 'Ext.app.Controller',

    removeFlg   : true,
    timer       : null,

    xOffset     : 0,
    divWidth    : 136,
    divHeight   : 100,
    filterDivWidth  : 136,
    filterDivHeight: 132,
    winEvent    : window.event,

    menuEl      : null,
    filterEl    : null,
    nodeChild   : [],
    parentPanel : null,

    oldRepeatIndex : -1,

    init : function () {},

    CreateMenu : function(configs, mainPanel, winEvent, repeatIndex,clientX,clientY)
    {
        var me = this;
        me.nodeChild = configs;
        me.parentPanel = mainPanel;
        me.winEvent = winEvent;
        if(me.oldRepeatIndex == repeatIndex && me.menuEl != null)
        {
            return;
        }

        var scrollX = window.scrollX === undefined ? window.pageXOffset : window.scrollX;
        var scrollY = window.scrollY === undefined ? window.pageYOffset : window.scrollY;
        me.oldRepeatIndex = repeatIndex;

        me.ClearDiv();
        var _x = 0;
        var _w = document.documentElement.scrollWidth;

        var mouse_x = clientX - 5;
        if(_w - mouse_x < me.divWidth + me.filterDivWidth)
        {
            _x = _w - me.divWidth - me.filterDivWidth + scrollX - 10;
        }
        else
        {
            _x = mouse_x + scrollX;
        }
        if(_x < 1)
        {
            _x = 1;
        }

        var _y = clientY + 10 + scrollY;

        me.xOffset = mouse_x - _x;

        me.ShowMenu(_x, _y);

        me.timer = me.CreateTimer();
    },

    CreateMainDiv: function(page_x, page_y)
    {
        var me = this;
        me.menuEl = document.createElement("div");
        me.menuEl.style.left = page_x + "px";
        me.menuEl.style.top = page_y + "px";
        me.menuEl.style.position = "absolute";

        me.menuEl.style.width = me.divWidth + "px";
        me.menuEl.style.height = me.divHeight + "px";
        me.menuEl.className = "PM-FilterMenu-option";

        me.menuEl.onmouseout = function(e)
        {
            me.removeFlg = true;
        };
        me.menuEl.onmouseover = function(e)
        {
            me.removeFlg = false;
        };
    },

    CreateImg: function(src)
    {
        var imgNode = document.createElement("img");
        imgNode.className = 'PM-FilterMenu-option-img';
        imgNode.draggable = false;
        imgNode.src = src;
        return imgNode;
    },

    getCheckAllStatus : function(list)
    {
        var status = true;
        for(var i = 0;i < list.length;i++)
        {
            if(!list[i].check)
            {
                status = false;
                break;
            }
        }
        return status;
    },

    CreateFilterDiv : function(list, x, y, fn)
    {
        var me = this;
        me.filterEl = document.createElement('div');
        me.filterEl.style.left = (x + me.divWidth - 2) + "px";
        me.filterEl.style.top = (y + 6) + "px";
        me.filterEl.className = 'PM-FilterMenu-filter';
        me.filterEl.style.width = me.filterDivWidth + 'px';
        if (list.length > 4) {
            me.filterEl.style.height = me.filterDivHeight + 'px';
            me.filterEl.style.overflow = 'auto';
        }
        var nodeAll = me.CreateFilterChild(me.getCheckAllStatus(list), stringSetting.menu.filter.CheckAll, -1, fn);
        me.filterEl.appendChild(nodeAll);
        if(list.length > 0)
        {
            var rowDiv = document.createElement('div');
            rowDiv.className = 'PM-FilterMenu-option-line-row';
            me.filterEl.appendChild(rowDiv);
        }
        for(var i = 0;i < list.length;i++)
        {
            var check = list[i].check;
            var value = list[i].value;
            var node = me.CreateFilterChild(check, value, i, fn);
            me.filterEl.appendChild(node);
        }
        me.filterEl.onmouseout = function(e)
        {
            me.removeFlg = true;
        };
        me.filterEl.onmouseover = function(e)
        {
            me.removeFlg = false;
        };
        document.body.appendChild(me.filterEl);
    },

    CreateFilterChild : function(check, value, index, fn)
    {
        var node = document.createElement("a");
        node.onclick = function(e)
        {
            var checkboxs = this.getElementsByClassName("PM-FilterMenu-filter-checkbox");
            if(checkboxs.length == 0)
            {
                return;
            }
            var checked = checkboxs[0].checked;
            if(e.target.className != "PM-FilterMenu-filter-checkbox" )
            {
                checked = !checkboxs[0].checked;
            }
            if(index == -1)
            {
                checkboxs = this.parentElement.getElementsByTagName("INPUT");
                for(var i = 0;i < checkboxs.length;i++)
                {
                    checkboxs[i].checked = checked;
                }
            }
            else
            {
                checkboxs[0].checked = checked;
                checkboxs = this.parentElement.getElementsByTagName("INPUT");
                var checkAllEl = null;
                var checkedAll = true;
                for(var i = 0;i < checkboxs.length;i++)
                {
                    if(checkboxs[i].allCheck)
                    {
                        checkAllEl = checkboxs[i];
                    }
                    else if(checkboxs[i].checked == false)
                    {
                        checkedAll = false;
                    }
                }
                checkAllEl.checked = checkedAll;
            }
            fn(index, checked);
        };

        node.className = 'PM-FilterMenu-filter-a';
        node.optionValue = value;

        var inputDiv = document.createElement("input");
        inputDiv.type = "checkbox";
        inputDiv.checked = check;

        inputDiv.className = "PM-FilterMenu-filter-checkbox";
        if(index == -1)
        {
            inputDiv.allCheck = true;
        }
//      inputDiv.onclick = me.onOptionClick;

//      inputDiv.onmouseover = me.getSelectedAColor;
//      inputDiv.onmouseout = me.getUnSelectedAColor;

        var valDiv = document.createElement('div');
        valDiv.className = "PM-FilterMenu-filter-div-val";
        valDiv.setAttribute("data-qtip", value);

        var span = document.createElement("span");
        span.innerHTML = value;
        span.className = 'PM-FilterMenu-filter-span-val';
        valDiv.appendChild(span);

        var lineDiv = document.createElement('div');
        lineDiv.className = 'PM-FilterMenu-option-line';

        node.appendChild(inputDiv);
        node.appendChild(lineDiv);
        node.appendChild(valDiv);
        return node;
    },

    CreateNodeChild: function(config, page_x, page_y)
    {
        var me = this;
        var node = document.createElement("a");

        var imgChild = me.CreateImg(config.src)
        node.appendChild(imgChild);
        node.hidefocus = "true";
        node.onclick = config.click;

        if(config.getFilterFn != null)
        {
            node.onmouseover = function(){
                if(me.filterEl != null)
                {
                    return;
                }
                var list = config.getFilterFn();
                if(list.length == 0)
                {
                    return;
                }
                me.CreateFilterDiv(list, page_x, page_y, config.setFilterFn);
            };
        }
        else
        {
            node.onmouseover = function(){
                me.ClearFilterDiv();
            };
        }
        node.className = 'PM-FilterMenu-option-a';

        var span = document.createElement("span");
        span.innerText = config.name;
        span.className = "PM-FilterMenu-option-span";

        var lineDiv = document.createElement('div');
        lineDiv.className = 'PM-FilterMenu-option-line';

        if(config.parent != null)
        {
            var img = document.createElement("img");
            img.className = "PM-FilterMenu-option-arrow";
            img.src = config.parent;
            node.appendChild(img);
        }

        node.appendChild(lineDiv);
        node.appendChild(span);

        return node;
    },

    ShowMenu : function(page_x, page_y)
    {
        var me = this;

        me.CreateMainDiv(page_x, page_y);

        for(var i = 0;i < me.nodeChild.length;i++)
        {
            me.menuEl.appendChild(me.CreateNodeChild(me.nodeChild[i], page_x, page_y + 32 * i));
            if(me.nodeChild[i].bottomLine != null && me.nodeChild[i])
            {
                var rowDiv = document.createElement('div');
                rowDiv.className = 'PM-FilterMenu-option-line-row';
                me.menuEl.appendChild(rowDiv);
            }
        }
        document.body.appendChild(me.menuEl);
    },
    CreateTimer : function()
    {
        var me = this;
        var t = window.setInterval(function()
        {
            try{
                if(me.removeFlg == true)
                {
                    me.ClearDiv();
                }
            }catch(e){

            }
        }, showDelay + 1500);
        return t;
    },

    ClearDiv : function()
    {
        var me = this;
        var delDiv = document.body.getElementsByClassName("PM-FilterMenu-option");
        for(var i = delDiv.length - 1;i >= 0;i--)
        {
            document.body.removeChild(delDiv[i]);
        }

        me.ClearFilterDiv();

        if(me.timer != null)
        {
            clearInterval(me.timer)
        }
        me.menuEl = null;
    },

    ClearFilterDiv :function()
    {
        var me = this;
        var delDiv = document.body.getElementsByClassName("PM-FilterMenu-filter");
        for(var i = delDiv.length - 1;i >= 0;i--)
        {
            document.body.removeChild(delDiv[i]);
        }
        me.filterEl = null;
    }
});