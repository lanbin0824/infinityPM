// ConstitutionList Model
Ext.regModel('PM.model.ConstitutionList',
{
	extend:'Ext.data.Model',
	fields: [
	        {name: 'machineheader'},  
	        {name: 'enddate'},  
			{name: 'uid'},
			{name: 'type'},
			{name: 'patienttype'},
			{name: 'epno'},
			{name: 'version'},
			{name: 'machinename'},	
			{name: 'protocolname'},
			{name: 'protocolpoolname'},
			{name: 'status'},		
			{name: 'lastupddt'},
//			{name: 'applicant'},
			{name: 'index'},			
//			{name: 'organ'},
			{name: 'patienttype'},	
            {name: 'machinenamelist'},
            {name: 'filepath'},
            {name: 'masteruid'},
            {name: 'istransferred'},
            {name: 'modelname'},
			{name: 'softwareversion'},
			{name: 'modifytime'},
			{name: 'protocoleptype'}
	]
});