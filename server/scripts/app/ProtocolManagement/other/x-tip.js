/*!
 * tooltip JS
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

var styleMenuTipGlobal = '13pt';

var styleGridTipGlobal = '13pt';

var styleTitleTipGlobal = '14pt';

var styleCompareTipGlobal = '13pt';

var tipStyleDvData = '13pt';

var tipStyleDvEl = null;

var chWidthMemoryTip = {};
var chWidthCacheTip = {};

var strWidthMemoryTip = {};

/**
 * set tooltip from id
 * @param {Array} id
 * @param {Array} value
 * @param {Number} len
 *  
 */
var setDataTip = function(id, value, len) 
{	
	
	var tooltips = new Array();
	
	for(var i = 0;i < len;i++)
	{
		tooltips[i] = {
				target: id[i] ,
//				anchor: 'buttom',
//				anchorOffset: 15,
//mouseOffset:[15,118],
		   	 	html: value[i]};
	}
    Ext.each(tooltips, function(config) {
        Ext.create('Ext.tip.ToolTip', config);
    });	
};

/**
 * set tooltip from id
 * @param {Array} id
 * @param {Array} value
 * @param {Number} len
 *  
 */
var setTipByConfig = function(tooltips) 
{	
    Ext.each(tooltips, function(config) {
        Ext.create('PM.view.tooltip.Base', config);
    });	
};

/**
 * get width from the string
 * @param {String} style
 * @param {String} value
 *  
 */
var getStringRealWidth = function(style, value)
{
	var width = 0;
	for(var i = 0;i < value.length;i++)
	{	
		var w = getCacheWidth(style, value[i]);
		if(w != null)
		{
			width = width + w;
		}
		else
		{
			if(chWidthMemoryTip[style] == null)
			{
				chWidthMemoryTip[style] = new Array();
			}
			if(typeof(chWidthMemoryTip[style][value[i]]) == "undefined")
			{
				chWidthMemoryTip[style][value[i]] = getCharWidth(style, value[i]);
				if(value[i] == " ")
				{
					//add space
					chWidthMemoryTip[style][value[i]] = getCharWidth(style, '1 1') - getCharWidth(style, '11');
				}
				else
				{
					chWidthMemoryTip[style][value[i]] = getCharWidth(style, value[i]);
				}
				width = width + chWidthMemoryTip[style][value[i]];
			}
			else
			{
				width = width + chWidthMemoryTip[style][value[i]];
			}
		}
	}
	if(memoryLanguage == "JP")
	{
		width = width * 1.05;
	}
	else
	{
		width = width * 1.1;
	}
	return width;
};

var getCharWidth = function(style, value)
{	  
	if(tipStyleDvEl == null)
	{
		tipStyleDvEl = document.getElementById('dv');
	}

    if(tipStyleDvData != style)
	{	
    	tipStyleDvEl.style.fontSize = style;
    	tipStyleDvData = style;
	}    
    tipStyleDvEl.innerText = value;    
    return tipStyleDvEl.offsetWidth;	
};

var getCacheWidth = function(style, value)
{
	if(chWidthCacheTip[style] != null)
	{
		if(typeof(chWidthCacheTip[style][value]) != "undefined")
		{
			return chWidthCacheTip[style][value];
		}
		else
		{
			return null;
		}
	}	
	else 
	{
		var obj = cacheLocalStorage.getObject(memoryLanguage + style);
		chWidthCacheTip[style] = obj;
		if(obj != null &&
		   typeof(obj[value]) != "undefined")
		{
			return obj[value];
		}
		else
		{
			return null;
		}
	}
};

var getAsciiWidth = function(style, value)
{
	//var ary = Object.create(null);
	var ary = {};
	for(var i = 0;i < value.length;i++)
	{	
		if(typeof(ary[value[i]]) == "undefined")
		{
			ary[value[i]] = getCharWidth(style, value[i]);
			
		}
	}
	return ary;
};

var getStringWidth = function(style, value, HTMLFlg)
{
	var strHTMLFlg = "-false";
	if(HTMLFlg)
	{
		strHTMLFlg = "-true";
	}
	if(strWidthMemoryTip[style] != null &&
	   strWidthMemoryTip[style][value + strHTMLFlg] != null)
	{
		return strWidthMemoryTip[style][value + strHTMLFlg];
	}
	
	if(tipStyleDvEl == null)
	{
		tipStyleDvEl = document.getElementById('dv');
	}

    if(tipStyleDvData != style)
	{	
    	tipStyleDvEl.style.fontSize = style;
    	tipStyleDvData = style;
	}    
    if(HTMLFlg)
	{
    	tipStyleDvEl.innerHTML = value;    
	}
    else
	{
    	tipStyleDvEl.innerText = value;    
	}
    
    var _width = tipStyleDvEl.offsetWidth;
    if(strWidthMemoryTip[style] == null)
    {
    	strWidthMemoryTip[style] = {};
    }
    if(HTMLFlg)
	{
    	strWidthMemoryTip[style][value + strHTMLFlg] = _width;   
	}
    else
	{
    	strWidthMemoryTip[style][value + strHTMLFlg] = _width;
	}    
    
    return _width;
};