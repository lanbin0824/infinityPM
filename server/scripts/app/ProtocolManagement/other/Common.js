/*!
 * Common JS
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 *
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

// String Prototype
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0)
    {
        if (arguments.length == 1 && typeof (args) == "object")
        {
            for (var key in args)
            {
                if(args[key] != undefined)
                {
                    var reg = new RegExp("({)" + key + "(})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++)
            {
                if (arguments[i] != undefined)
                {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

// Date Prototype
Date.prototype.Format = function (fmt)
{
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// Array Prototype
Array.prototype.indexOf = function(o){
    for(var i = 0, len = this.length; i < len; i++)
    {
        if(o == this[i]){
            return i;
        }
    }
    return -1;

};

var DateFormatByExt = function (date, fmt)
{
    try
    {
        if(fmt != null)
        {
            return Ext.util.Format.date(date, fmt);
            //return Ext.util.Format.date(convertDateFromUTC(date), fmt);
        }
        else
        {
            return Ext.util.Format.date(date, 'Y M d');
            //return Ext.util.Format.date(convertDateFromUTC(date), 'Y M d');
        }
    }
    catch(e)
    {
        return "";
    }
};

//array find function
var arrayFindString = function(arr, string) {
    var str = arr.join("");
    return str.indexOf(string);
};

var convertSupFont = function(type)
{
    if(type == "SureIQ")
    {
        return stringSetting.request.protocol_type.SureIQ;
    }
    else if (type == "SureExposure")
    {
        return stringSetting.request.protocol_type.SureExposure;
    }
    else if (type == "ExamPlan")
    {
        return stringSetting.request.protocol_type.ExamPlan;
    }
    else if (type == "ContrastPreset")
    {
        return stringSetting.request.protocol_type.ContrastPreset;
    }
    else if (type == "VoicePreset")
    {
        return stringSetting.request.protocol_type.VoicePreset;
    }
    else
    {
        return type;
    }
};

var chromeScrollWidth = null;
var columnHeaderCss = "columnHeader-Chrome-17";
var checkBrowerScroll = function()
{
    var divWidth = 0;
    var divTemp = document.createElement('div');
    divTemp.style.position = 'absolute';
    divTemp.style.overflow = 'scroll';
    divTemp.style.width = '100px';
    document.body.appendChild(divTemp);
    divWidth = divTemp.offsetWidth - divTemp.scrollWidth;
    document.body.removeChild(divTemp);
    chromeScrollWidth = divWidth;

    if (!!window.ActiveXObject || "ActiveXObject" in window){
        chromeScrollWidth = 17;
    }

    if(chromeScrollWidth == 17)
    {
        columnHeaderCss = "columnHeader-Chrome-17";
    }
    else if(chromeScrollWidth == 15)
    {
        columnHeaderCss = "columnHeader-Chrome-15";
    }
}
var getChromeScrollWidth = function()
{
    if(chromeScrollWidth == null)
    {
        checkBrowerScroll();
    }

    return chromeScrollWidth;
}
var getChromeScrollCss = function()
{
    if(chromeScrollWidth == null)
    {
        checkBrowerScroll();
    }
    return columnHeaderCss;
}

function getWeekDate(date) {
    var weekArray = new Array();

    var indexInWeek = date.getDay();
    var weekBeginIndex = -indexInWeek;
    var weekEndIndex = 6 - indexInWeek;

    var beignDate = new Date(new Date(date) - 0 + weekBeginIndex * 86400000);

    var endDate = new Date(new Date(date) - 0 + weekEndIndex * 86400000);
    weekArray.push(new Date(beignDate.getFullYear(),beignDate.getMonth(),beignDate.getDate()));
    weekArray.push(new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()));

    return weekArray;
}

function ArrayDropPepeat(array){
    var _interim = new Array();
    for(var i=0; i < array.length ; i++)
    {
        if( array[i]== "" ||  array[i]== null){
            continue ;
        }
        var is = true;
        if(i==0)
        {
            _interim.push(array[i]);
        }
        else
        {
            for(var j=0; j<_interim.length; j++)
            {
                if(_interim[j] == array[i])
                {
                    is = false;
                    break ;
                }
            }
            if(is)
            {
                _interim.push(array[i]);
            }
        }
    }
    return _interim;
};

var getErrorTipMsg = function(errMsg){
    if(errMsg == null){
        return '';
    }
    var status = errMsg.status;
    status = status.substring(0,1).toUpperCase()+status.substring(1);
    var overView = errMsg.overview;
    var callAdmin = errMsg.calladmin;

    var msgHTMLArr = new Array();
    msgHTMLArr.push('<span class ="error-tip-header">');
    msgHTMLArr.push('<b>');
    msgHTMLArr.push(status);
    msgHTMLArr.push('</b>');
    if(overView != null && overView != ""){
        msgHTMLArr.push(' - ');
        msgHTMLArr.push(overView);
    }

    msgHTMLArr.push('</span>');
    msgHTMLArr.push('<br />');

    msgHTMLArr.push('<span class ="error-tip-content">');
    msgHTMLArr.push(errMsg.details);
    msgHTMLArr.push('</span>');

    msgHTMLArr.push('<br />');

    msgHTMLArr.push('<span class ="error-tip-header"><b>Solution</b></span>');
    msgHTMLArr.push('<br />');

    msgHTMLArr.push('<span class ="error-tip-content">');
    msgHTMLArr.push(errMsg.solution);
    if(callAdmin != null && callAdmin != ""){
        msgHTMLArr.push('<br />');
        msgHTMLArr.push('<br />');
        msgHTMLArr.push(callAdmin);
    }
    msgHTMLArr.push('</span>');

    return msgHTMLArr.join('');
};

var createMask = function (el)
{
    var sW = 100;
    var sH = 100;
    var elTemp;

    if(el)
    {
        elTemp = el;
        sW = el.dom.offsetWidth/2 - 20;
        sH = el.dom.offsetHeight/2 - 20;
    }
    else
    {
        sW = document.documentElement.scrollWidth/2 - 20;
        sH = document.documentElement.scrollHeight/2 - 20;
        elTemp = document.body;
    }

    var className = "x-mask-large-msg";
    var divMask = document.createElement('div');
    divMask.style.left = sW + 'px';
    divMask.style.top = sH + 'px';
    divMask.style.height = '40px';
    divMask.style.width = '40px';
    //divMask.style.zIndex = 10000;
    divMask.className = className;

    var divMaskInner = document.createElement('div');
    divMaskInner.className = className + "-inner";
    divMaskInner.style.height = '40px';
    divMaskInner.style.width = '40px';
    divMask.appendChild(divMaskInner);

    var divMaskText = document.createElement('IMG');
    divMaskText.src = TabAlertMarkImage.srcBlank;
    divMaskText.className = className + "-text";
    divMaskText.style.height = '40px';
    divMaskText.style.width = '40px';
    divMaskInner.appendChild(divMaskText);

    elTemp.appendChild(divMask);
}

var clearMask = function (el)
{
    var elTemp;
    if(el)
    {
        elTemp = el;
    }
    else
    {
        elTemp = document.body;
    }

    var delDiv = elTemp.getElementsByClassName("x-mask-large-msg");
    for(var i = delDiv.length - 1;i >= 0 ;i--)
    {
        elTemp.removeChild(delDiv[i]);
    }
}

ToUnicode = function(str)
{
    return escape(str).replace(/%/g,"\\").toLowerCase();
}
IsUnicode = function(str)
{
    return !(str == escape(str).replace(/%/g,"\\"));
}
UnUnicode = function(str)
{
    return unescape(str.replace(/\\/g, "%"));
}

StopPropagation = function(event)
{
    if(event.preventDefault)
    {
        event.preventDefault();
    }
    if(event.returnValue)
    {
        event.returnValue = false;
    }
    if(event.stopImmediatePropagation)
    {
        event.stopImmediatePropagation();
    }
    if(event.stopPropagation != null)
    {
        event.stopPropagation();
    }
}

ToLocaleString = function(num)
{
    var str = "";
    if(null != num && typeof(num) == "number" && !isNaN(num))
    {
        str = num.toString();
    }
    else if(null != num && !isNaN(num))
    {
        str = num;
    }
    else
    {
        return num;
    }
    var aryStr = str.split(".");
    var aryNumFirst = new Array();
    var index = 0;
    var returnNum = "";
    for(var i = aryStr[0].length - 1;i >= 0;i--)
    {
        if(index == 3)
        {
            aryNumFirst.push(",");
            index = 0;
        }
        aryNumFirst.push(aryStr[0][i]);
        index++;
    }
    for(var i = aryNumFirst.length - 1;i >= 0;i--)
    {
        returnNum = returnNum + aryNumFirst[i];
    }

    if(aryStr.length > 1)
    {
        returnNum = returnNum + "." + aryStr[1];
    }
    return returnNum;
}

var sortArrayCommon = function(sortData, sorter, direction, modle)
{
    if(modle == "object")
    {
        if(direction === 'DESC')
        {
            sortData.sort(function(a, b)
            {
                return coSort.compare(b[sorter], a[sorter]);
            });
        }
        else if(direction === 'ASC')
        {
            sortData.sort(function(a, b)
            {
                return coSort.compare(a[sorter], b[sorter]);
            });
        }
    }
    else
    {
        if(direction === 'DESC')
        {
            sortData.sort(function(a, b)
            {
                return coSort.compare(b.get(sorter), a.get(sorter));
            });
        }
        else if(direction === 'ASC')
        {
            sortData.sort(function(a, b)
            {
                return coSort.compare(a.get(sorter), b.get(sorter));
            });
        }
    }
}

var sortObjectArray = function(sortData, sorter, direction, modle)
{
    if(modle == "object")
    {
        sortData.sort(function(a, b)
        {
            for(var i = 0;i < sorter.length;i++)
            {
                var s = coSort.compare(a[sorter[i]], b[sorter[i]]);
                if(s != 0)
                {
                    if(direction[i] === 'ASC')
                    {
                        return s;
                    }
                    else
                    {
                        return s * -1;
                    }
                }

            }
        });

    }
    else
    {
        sortData.sort(function(a, b)
        {
            for(var i = 0;i < sorter.length;i++)
            {
                var s = coSort.compare(a.get(sorter[i]), b.get(sorter[i]));
                if(s != 0)
                {
                    if(direction[i] === 'ASC')
                    {
                        return s;
                    }
                    else
                    {
                        return s * -1;
                    }
                }

            }
        });
    }
}

var deepClone = function (destination, source)
{
    for(var p in source)
    {
        if(Ext.isArray(source[p]))
        {
            destination[p] = [];
            arguments.callee(destination[p], source[p]);
        }
        else if(typeof(source[p]) == "object")
        {
            destination[p] = {};
            arguments.callee(destination[p], source[p]);
        }
        else
        {
            destination[p] = source[p];
        }
    }
};

var filterArray = function(source, aryAttribute, aryVal)
{
    var ret = source.filter(function(me){
        for(var i = 0;i < aryAttribute.length;i++)
        {
            if(me[aryAttribute[i]] != aryVal[i])
            {
                return false;
            }
        }
        return true;
    });
    return ret;
};

var convertDateFromUTC = function(dateStr) {
    var vdate;
    if(Ext.isDate(dateStr)){
        vdate = dateStr;
    }else {
        dateStr = dateStr.replace(/-/g, '/');
        vdate = new Date(dateStr);
    }
    var localOffset = vdate.getTimezoneOffset() * 60000;
    var timezone = vdate.getTime() - localOffset;
    var lastDate = new Date(timezone);
    return lastDate;
}

var convertUTCDateFromLocalDate = function(date) {
    var localOffset = date.getTimezoneOffset() * 60000;
    var timezone = date.getTime() + localOffset;
    var lastDate = new Date(timezone);
    return lastDate;
}

var convertUTCDateFromLocalStr = function(date,format) {
    var date = Ext.Date.parse(date, format, true);
    var localOffset = date.getTimezoneOffset() * 60000;
    var timezone = date.getTime() + localOffset;
    var lastDate = new Date(timezone);
    return lastDate;
}

var cleanSpelChar = function (th){
    var temp = '';
    for(var i=0;i<th.value.length;i++) {
        var charCode = th.value[i];
        if('\\/:*?"<>|'.indexOf(charCode) > -1){

        }else {
            temp += charCode;
        }
    }
    th.value = temp;
}

var keyPressSpelChar = function (th){
    var c = String.fromCharCode(event.keyCode);

    if('\\/:*?"<>|'.indexOf(c) > -1){
        event.returnValue = false;
    }
}
var compareString = function(str1,str2) {
    var result = 0;
    for(var i=0;i<str1.length;i++) {
        if(str2.length < i){
            result = -1;
            break;
        }
        if (str1.charAt(i).charCodeAt() > str2.charAt(i).charCodeAt()) {
            result = 1;
            break;
        }
        if (str1.charAt(i).charCodeAt() < str2.charAt(i).charCodeAt()) {
            result = -1;
            break;
        }
    }
    if(result ==0 && str1.length < str2.length){
        result =-1;
    }
    return result;
}
