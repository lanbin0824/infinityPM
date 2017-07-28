/*!
 * JS Select Compared Scan Mode
 * Copyright :Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
/**
 * @class PM.view.compare.ScanSelect
 * @extends Ext.panel.Panel
 * @import CompareScanSelect.css
 */

Ext.define('PM.view.compare.ScanSelect', {
    extend	: 'PM.view.panel.Click',
	alias 	: 'widget.comparescanselect',
    cls				: 'panel-NoborderPadding',
    bodyCls			: 'panel-NoborderPadding', 
	width			: '100%',
	minWidth		: 650,
	
	comparePanel	: null,
	
	store			: null,
	storeData		: new Array(),
	aryName			: new Array(),
	
	leftFilePath    : '',
	rightFilePath   : '',
	
	chkLeftRowNum	: -1,
	chkRightRowNum  : -1,
	styleTip 		: styleGridTipGlobal,
	ConstRadioImg 	: {
		UnSelect 	: '<img class="Img-CompareScanSelect-Ridio" src="' + RadioButton.SrcUnSelect + '"></img>',
		None 		: '<img class="Img-CompareScanSelect-Ridio" src="' + RadioButton.SrcNone + '"></img>',
		SrcUnSelect	: RadioButton.SrcUnSelect,
		SrcSelect	: RadioButton.SrcSelect,
		SrcNone 	: RadioButton.SrcNone,
		NoneImgName: 'icon.png'
	},
    /**
	 * function init Component
	 */
    initComponent	: function () 
    { 
    	var me = this; 
    	    	
		me.store = Ext.create('PM.data.Ajax', {
				url :  PROCESS_PATH_GLOBAL_ACTION + 'getcompareparameter.action',
			method      : "GET",
    	
			loadData: function(responseObj, success) {
				me.responseObj = responseObj;
        	me.updateButtonStatus();
				me.pushData(responseObj);
        	me.panelUpdate();
			}
		});
    	
		me.comparePanel = Ext.create('Ext.panel.Panel', {
			cls				: 'panel-NoborderPadding',
			bodyCls   		: 'panel-CompareScanSelect-Scroll',
			region      	: 'center',
		    layout: {
		        type: 'fit'
		    },
		    html:''
		});
    	
		Ext.applyIf(me, {
    		items:[me.comparePanel]
    	});
        
        me.callParent(arguments);
    }, 
    updateButtonStatus:function(){
    },
    addArrayData: function(arrayData)
    {
    	var modelArray = new Array();
		if(arrayData != null &&
		   arrayData != "")
		{
			for(var i = 0;i < arrayData.length;i++)
			{
				var _line = new PM.model.CompareLine({
				    'targetKey'		: arrayData[i].targetKey,
				    'targetName'	: arrayData[i].targetName,
				    'masterKey'		: arrayData[i].masterKey,
				    'masterName'	: arrayData[i].masterName,
				    'selected'		: arrayData[i].selected
				});
								
				modelArray.push(_line);				
			}
		}
		return modelArray;
    },
    getDataJosn: function () {
		var me = this;
		var json = {};
    	var index = 0;
		var epPara = "";
		var sureIQPara = "";
		var sureExpPara = "";
		var contrastPara = "";		
		var store = me.responseObj;
		for (var p in store) {
			if (p === "spparameter") {
				if (store["spparameter"] != "") {
			epPara = this.storeData[index];
			index++;
		}
				json.spparameter = this.objtoJson(epPara);
			} else if (p === "sureiqparameter") {
				if (store["sureiqparameter"] != "") {
			sureIQPara = this.storeData[index];
			index++;
		}
				json.sureiqparameter = this.objtoJson(sureIQPara);
			} else if (p === "sureexpparameter") {
				if (store["sureexpparameter"] != "") {
			sureExpPara = this.storeData[index];
			index++;
		}
				json.sureexpparameter = this.objtoJson(sureExpPara);
			} else if (p === "contrastparameter") {
				if (store["contrastparameter"] != "") {
			contrastPara = this.storeData[index];
			index++;
		}

				json.contrastparameter = this.objtoJson(contrastPara);
			} else {
				if (store[p] != "") {
					var otherPara = this.storeData[index];
					index++;
				}
				json[p] = this.objtoJson(otherPara);
			}
		}

     	return Ext.encode(json);
    },
    objtoJson: function (objArray)
    {
		var arr = new Array();
		if(objArray != null)
		{
			for(var i = 0;i < objArray.length;i++)
			{
				arr.push(objArray[i].data);
			}
		}
		else
		{
			return "";
		}
		return arr;
    },
    storeLoad: function (leftFilePath,rightFilePath)
    {
 		this.leftFilePath = leftFilePath;
 		this.rightFilePath = rightFilePath;
 		
		this.store.requestSend({
    		params : {    			
    			leftfilepath : this.leftFilePath,
    			rightfilepath : this.rightFilePath
    		}
    	});
    },
    pushData: function (responseObj) {
		this.storeData = new Array();
		this.aryName = new Array();

		for (var p in responseObj) {
			if (p === "spparameter") {
				var epPara = responseObj["spparameter"];
				var epArray = this.addArrayData(epPara);
				if (epArray.length > 0) {
					this.storeData.push(epArray);
					this.aryName.push(ProtocolType.ExamPlan);
				}
			} else if (p === "sureiqparameter") {
				var sureIQPara = responseObj["sureiqparameter"];
				var sureIQArray = this.addArrayData(sureIQPara);
				if (sureIQArray.length > 0) {
					this.storeData.push(sureIQArray);
					this.aryName.push(ProtocolType.SureIQ);
				}
			} else if (p === "sureexpparameter") {
				var sureExpPara = responseObj["sureexpparameter"];
				var sureExpArray = this.addArrayData(sureExpPara);
				if (sureExpArray.length > 0) {
					this.storeData.push(sureExpArray);
					this.aryName.push(ProtocolType.SureExposure);
				}
			} else if (p === "contrastparameter") {
				var contrastPara = responseObj["contrastparameter"];
				var contrastArray = this.addArrayData(contrastPara);
				if (contrastArray.length > 0) {
					this.storeData.push(contrastArray);
					this.aryName.push(ProtocolType.ContrastPreset);
				}
			} else if (p === "voicepresetparameter") {
				var voicePara = responseObj["voicepresetparameter"];
				var voiceArray = this.addArrayData(voicePara);
				if (voiceArray.length > 0) {
					this.storeData.push(voiceArray);
					this.aryName.push(ProtocolType.VoicePreset);
				}
			} else {
				var otherPara = responseObj[p];
				var otherArray = this.addArrayData(otherPara);
				if (otherArray.length > 0) {
					this.storeData.push(otherArray);
					this.aryName.push(p);
				}
			}
		}
	},
    loadData: function () 
    {
    	var _array = new Array();
    	var _style = "";
    	_array.push('<table onselectstart="return false" ');
    	_array.push('ondrag="return false" ');
    	_array.push('class = "CompareScanSelect-Table">');
    	
    	_array.push('<tr>');	        	
    	_array.push('<td class="TD-width-radio"></td>');
    	_array.push('<td class="TD-width-name"></td>');
    	_array.push('<td class="TD-width-line"></td>');
    	_array.push('<td class="TD-width-radio"></td>');
    	_array.push('<td class="TD-width-name"></td>');
    	_array.push('</tr>');
    	
    	for(var index = 0;index < this.storeData.length;index++)
		{
        	_array.push('<tr>');
	    	_array.push('<td class="Td-CompareScanSelect-header" colspan="5">');
	    	_array.push('<span unselectable="on" class ="spanGridValue">');
	    	_array.push(this.aryName[index]);
	    	_array.push('</span>');
	    	_array.push('</td>');
	    	_array.push('</tr>');
	    	
	    	for(var i = 0;i < this.storeData[index].length;i++)
	        {
	        	if(i % 2 == 0)
	        	{
	        		_style = "CompareScanSelect-Tr";
	        	}
	        	else
	        	{
	        		_style = "CompareScanSelect-Tr-S";
	        	}	    	
	        	
	        	_array.push('<tr class = "' + _style + '">');
				_array.push('<td class = "Td-CompareScanSelect-radio">');
				if(this.storeData[index][i] != null &&
				   this.storeData[index][i].get('targetName') != "")
	        	{
					_array.push(this.ConstRadioImg.UnSelect);
	        	}
		        else
	        	{
		        	_array.push(this.ConstRadioImg.None);
	        	}
		        _array.push('</td>');	        
	
		        _array.push('<td ');
		        _array.push('class = "Td-CompareScanSelect-name">');
		        _array.push('<span unselectable="on" class ="spanGridValue">');
		        if(this.storeData[index][i] != null &&
				   this.storeData[index][i].get('targetName') != "")
	        	{
		        	_array.push(this.storeData[index][i].get('targetName'));
	        	}	       
		        _array.push('</span>');
		        _array.push('</td>');
		        
		        _array.push('<td ');
		        if(i == 0)
	        	{
		        	_array.push('class = "Td-CompareScanSelect-line-border">');
	        	}
		        else
	        	{
		        	_array.push('class = "Td-CompareScanSelect-line">');
	        	}		        
		        
		        if(this.storeData[index][i] != null &&
			       this.storeData[index][i].get('selected') == 1)
	        	{
		        	_array.push('<div class = "Div-CompareScanSelect-line"></div>');
	        	}
		        else
		        {
		        	_array.push('<div class = "Div-CompareScanSelect-line-none"></div>');
		        }
		        _array.push('</td>');
		        
				_array.push('<td class = "Td-CompareScanSelect-radio-right">');
		        if(this.storeData[index][i] != null &&
				   this.storeData[index][i].get('masterName') != "")
	        	{
		        	_array.push(this.ConstRadioImg.UnSelect);
	        	}
		        else
	        	{
		        	_array.push(this.ConstRadioImg.None);
	        	}
		        _array.push('</td>');	        
	
		        _array.push('<td ');
		        _array.push('class = "Td-CompareScanSelect-name-right">');
		        _array.push('<span unselectable="on" class ="spanGridValue">');
		        if(this.storeData[index][i] != null &&
				   this.storeData[index][i].get('masterName') != "")
	        	{
		        	_array.push(this.storeData[index][i].get('masterName'));
	        	}	        
		        _array.push('</span>');
		        _array.push('</td>');
		        
		        _array.push('</tr>');
	        }
	    	_array.push('<tr>');
	    	_array.push('<td class="Td-CompareScanSelect-space" colspan="2"></td>');
	    	_array.push('<td></td>');
	    	_array.push('<td class="Td-CompareScanSelect-space" colspan="2"></td>');
	    	_array.push('</tr>');
		}
        _array.push('</table>');
        
        return _array.join('');
    
    },
    panelUpdate: function () 
    {
    	var _html = this.loadData();
    	if(this.comparePanel != null)
    	{    		
    		this.comparePanel.update(_html);
    		if(this.comparePanel.body!= null && this.comparePanel.body.dom != null)
    		{
    			this.comparePanel.body.dom.scrollTop = 0;
    		}    		
    	}

//    	this.comparePanel.remove(0);
//    	this.comparePanel.add({    		
//    		autoScroll	: false,
//    		minWidth	: 650,
//    		cls			: 'panel-NoborderPadding',
//    		bodyCls   	: 'panel-CompareScanSelect-Scroll',
//    		html		: _html
//    	});
    },    
    getTrElLine: function (el)
    {
    	var targetEl = el;
		if(targetEl == null)
		{
			return null;
		}
		if((targetEl.className == "Td-CompareScanSelect-line-border" ||
			targetEl.className == "Td-CompareScanSelect-line") &&
		   targetEl.childNodes[0].className == "Div-CompareScanSelect-line")
		{    			
			return targetEl.parentElement;
		}
		if(targetEl.className == "Div-CompareScanSelect-line")
		{    			
			return targetEl.parentElement.parentElement;
		}
		
    },
    getTrElLeft: function (el)
    {
    	var targetEl = el;
    	
		if(targetEl == null)
		{
			return null;
		}
		if(targetEl.className == "Img-CompareScanSelect-Ridio" && 
		   targetEl.parentElement.className == "Td-CompareScanSelect-radio")
		{    			
			return targetEl.parentElement.parentElement;
		}
		
		if(targetEl.className == "Td-CompareScanSelect-name" ||
		   targetEl.className == "Td-CompareScanSelect-radio")
		{    			
			return targetEl.parentElement;
		}
		if(targetEl.className == "spanGridValue" && 
		   targetEl.parentElement.className == "Td-CompareScanSelect-name")
		{    			
			return targetEl.parentElement.parentElement;
		}
		
    	return null;
    },
    getTrElRight: function (el)
    {
    	var targetEl = el;
    	
		if(targetEl == null)
		{
			return null;
		}
		if(targetEl.className == "Img-CompareScanSelect-Ridio" && 
		   targetEl.parentElement.className == "Td-CompareScanSelect-radio-right")
		{    			
			return targetEl.parentElement.parentElement;
		}
		
		if(targetEl.className == "Td-CompareScanSelect-name-right" ||
		   targetEl.className == "Td-CompareScanSelect-radio-right")
		{    			
			return targetEl.parentElement;
		}
		if(targetEl.className == "spanGridValue" && 
		   targetEl.parentElement.className == "Td-CompareScanSelect-name-right")
		{    			
			return targetEl.parentElement.parentElement;
		}
		
    	return null;
    },
    clearSelectStatus: function (flg, tbodyEl)
    {    	
		for(var i = 0;i < tbodyEl.childElementCount;i++)
    	{  
			var tdEl = tbodyEl.children[i].childNodes[0];			
			
    		if(tdEl != null &&
    		   tdEl.className != "Td-CompareScanSelect-space" &&
    		   tdEl.className != "Td-CompareScanSelect-header" &&
    		   tdEl.className != "TD-width-radio")
    		{  
    			if(flg == 'right')
    			{
    				tdEl = tbodyEl.children[i].childNodes[3];
    			}
    			var imgEl = tdEl.childNodes[0];
    			if(imgEl != null && 
				   imgEl.src.indexOf(this.ConstRadioImg.NoneImgName) == -1)
				{
    				imgEl.src = this.ConstRadioImg.SrcUnSelect;    			
				}    			
    		}
    	}    	
    },
    getPartNum: function(checkNum)
    {
    	var len = 0;
		for(var i = 0;i < this.storeData.length;i++)
		{
			len = len + this.storeData[i].length + 2;
			if(checkNum < len)
			{
				return i;
			}
		}
    },
    getNum: function(checkNum)
    {
    	var _num = checkNum;
		for(var i = 0;i < this.storeData.length;i++)
		{
			if(_num - 1 < this.storeData[i].length)
			{
				return _num - 1;
			}
			else
			{
				_num = _num - this.storeData[i].length - 2;
			}
		}
    },
    checkPartSame: function()
    {
    	if(this.getPartNum(this.chkLeftRowNum) ==
    	   this.getPartNum(this.chkRightRowNum))
		{
    		return true;
		}
    	return false;
    },
    changeLineData: function(left, right, rowLeftEl, rowRightEl)
    {
    	var _leftPart = this.getPartNum(left - 1);
    	var _leftNum = this.getNum(left - 1);
    	var _rightPart = this.getPartNum(right - 1);
    	var _rightNum = this.getNum(right - 1);
    	

    	var temp = this.storeData[_leftPart][_leftNum].get('masterName');
    	this.storeData[_leftPart][_leftNum].data.masterName = 
    		this.storeData[_rightPart][_rightNum].get('masterName');
    	this.storeData[_rightPart][_rightNum].data.masterName = temp;
    	
    	temp = this.storeData[_leftPart][_leftNum].get('masterKey');
    	this.storeData[_leftPart][_leftNum].data.masterKey = 
    		this.storeData[_rightPart][_rightNum].get('masterKey');
    	this.storeData[_rightPart][_rightNum].data.masterKey = temp;
    	
    	rowLeftEl.children[4].childNodes[0].innerText = 
    		this.storeData[_leftPart][_leftNum].get('masterName');
    	rowRightEl.children[4].childNodes[0].innerText = 
    		this.storeData[_rightPart][_rightNum].get('masterName');
    	
    	if(this.storeData[_rightPart][_rightNum].get('masterName') == "")
		{
    		rowLeftEl.children[3].childNodes[0].src = this.ConstRadioImg.SrcUnSelect;
    		rowRightEl.children[3].childNodes[0].src = this.ConstRadioImg.SrcNone;
		}
    	    	
    	if(_leftPart == _rightPart && _leftNum == _rightNum)
		{
    		if(this.storeData[_leftPart][_leftNum].data.selected == 1)
			{
        		this.storeData[_leftPart][_leftNum].data.selected = 0;
			}
    		else
			{
    			this.storeData[_leftPart][_leftNum].data.selected = 1;
			}

    		
    		var divEl = rowLeftEl.children[2].childNodes[0];    		
    		if(this.storeData[_leftPart][_leftNum].data.selected == 1)
			{
    			divEl.className = 'Div-CompareScanSelect-line';
			}
    		else
			{
    			divEl.className = 'Div-CompareScanSelect-line-none';
			}    	
		}
    	else
		{
    		var divEl = rowLeftEl.children[2].childNodes[0];
    		divEl.className = 'Div-CompareScanSelect-line';
    		divEl = rowRightEl.children[2].childNodes[0];
    		divEl.className = 'Div-CompareScanSelect-line-none';
    		
    		this.storeData[_leftPart][_leftNum].data.selected = 1;
        	this.storeData[_rightPart][_rightNum].data.selected = 0;
		}
    },
    isLeftCheckboxNone: function (rowEl) 
    {
    	var _imgEl = rowEl.childNodes[0].childNodes[0];
		if(_imgEl.src.indexOf(this.ConstRadioImg.NoneImgName) == -1)
		{
			return false;
		}		    	
    	return true;
    },
    isRightCheckboxNone: function (rowEl) 
    {
    	var _imgEl = rowEl.childNodes[3].childNodes[0];
		if(_imgEl.src.indexOf(this.ConstRadioImg.NoneImgName) == -1)
		{
			return false;
		}
		    	
    	return true;
    },    
    onClick: function (e) 
    {    	
    	var rowLine = this.getTrElLine(e.target);
    	if(rowLine != null)
    	{
    	    this.storeData[this.getPartNum(rowLine.sectionRowIndex - 1)]
    	                  [this.getNum(rowLine.sectionRowIndex - 1)]
    	    						.data.selected = 0;
    		var divEl = rowLine.children[2].childNodes[0];  		
    		divEl.className = 'Div-CompareScanSelect-line-none';
    	}
    	
    	var rowElLeft = this.getTrElLeft(e.target);    	
    	if(rowElLeft != null)
    	{
    		if(this.isLeftCheckboxNone(rowElLeft))
    		{
    			return;
    		}

    		this.chkLeftRowNum = rowElLeft.sectionRowIndex;
    		if(this.chkRightRowNum != -1 &&
			   this.checkPartSame())
			{
    			var _rowLeftEl = rowElLeft.parentElement.children[this.chkLeftRowNum];
    			var _rowRightEl = rowElLeft.parentElement.children[this.chkRightRowNum];

    			this.changeLineData(this.chkLeftRowNum, this.chkRightRowNum, _rowLeftEl, _rowRightEl);
    			
    			this.chkLeftRowNum = -1;
    			this.chkRightRowNum = -1;
    			this.clearSelectStatus('left', rowElLeft.parentElement);
    			this.clearSelectStatus('right', rowElLeft.parentElement);

    			return;
			}
    		else if(this.chkRightRowNum != -1)
			{
    			this.chkRightRowNum = -1;
    			this.clearSelectStatus('right', rowElLeft.parentElement);
			}
    		
    		var ImgEl = rowElLeft.childNodes[0].childNodes[0];
			if(ImgEl != null)
			{    
				this.clearSelectStatus('left', rowElLeft.parentElement);
				ImgEl.src = this.ConstRadioImg.SrcSelect;
			}
    		return;
    	}
    	var rowElRight = this.getTrElRight(e.target);
    	if(rowElRight != null)
    	{
    		if(this.isRightCheckboxNone(rowElRight))
    		{
    			return;
    		}
    		this.chkRightRowNum = rowElRight.sectionRowIndex;
    		if(this.chkLeftRowNum != -1 &&
			   this.checkPartSame())
			{    			
    			var _rowLeftEl = rowElRight.parentElement.children[this.chkLeftRowNum];
    			var _rowRightEl = rowElRight.parentElement.children[this.chkRightRowNum];

    			this.changeLineData(this.chkLeftRowNum, this.chkRightRowNum, _rowLeftEl, _rowRightEl);
    			
    			this.chkLeftRowNum = -1;
    			this.chkRightRowNum = -1;
    			this.clearSelectStatus('left', rowElRight.parentElement);
    			this.clearSelectStatus('right', rowElRight.parentElement);

    			return;
			}
    		else if(this.chkLeftRowNum != -1)
			{
    			this.chkLeftRowNum = -1;
    			this.clearSelectStatus('left', rowElRight.parentElement);
			}
	
    		var ImgEl = rowElRight.childNodes[3].childNodes[0];
			if(ImgEl != null)
			{    
				this.clearSelectStatus('right', rowElRight.parentElement);
				ImgEl.src = this.ConstRadioImg.SrcSelect;
			}
    		return;
    	}
    }
});