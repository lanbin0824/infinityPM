/*!
 * cacheOthersProtocol JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

//--adult organ locations
var AdultOrganLocations=new Array();
AdultOrganLocations[0]='36,13,77,91';
AdultOrganLocations[1]='33,100,81,185';
AdultOrganLocations[2]='134,10,204,52';
AdultOrganLocations[3]='134,57,204,76';
AdultOrganLocations[4]='134,81,204,120';
AdultOrganLocations[5]='134,123,204,162';
AdultOrganLocations[6]='134,165,204,204';
AdultOrganLocations[7]='134,207,204,350';
AdultOrganLocations[8]='206,74,247,249';

//--child organ locations
var ChildOrganLocations=new Array();
ChildOrganLocations[0]='30,28,63,91';
ChildOrganLocations[1]='29,106,67,173';
ChildOrganLocations[2]='138,70,211,125';
ChildOrganLocations[3]='138,126,211,140';
ChildOrganLocations[4]='138,142,211,175';
ChildOrganLocations[5]='138,176,211,207';
ChildOrganLocations[6]='138,208,211,233';
ChildOrganLocations[7]='138,234,211,311';
ChildOrganLocations[8]='212,141,252,225';

//image names
var organImages=new Array();
organImages[0]="body_all_on.png";
organImages[1]="body_part_on.png";
organImages[2]="body_part01_on.png";
organImages[3]="body_part02_on.png";
organImages[4]="body_part03_on.png";
organImages[5]="body_part04_on.png";
organImages[6]="body_part05_on.png";
organImages[7]="body_part06_on.png";
organImages[8]="body_part07_on.png";

var organArray=new Array();
organArray[0]="All";
organArray[1]="Chest To Pelvis";
organArray[2]="Head";
organArray[3]="Neck";
organArray[4]="Chest";
organArray[5]="Abdomen";
organArray[6]="Pelvis";
organArray[7]="Leg";
organArray[8]="Other";

var paramsLevelWidth=new Array();
paramsLevelWidth[0]=30;
paramsLevelWidth[1]=50;
paramsLevelWidth[2]=70;
paramsLevelWidth[3]=90;
paramsLevelWidth[4]=110;
paramsLevelWidth[5]=130;

var adultImgFloder= PROCESS_PATH_GLOBAL_RESOURCES + 'images/organImgs/adult/';
var childImgFloder= PROCESS_PATH_GLOBAL_RESOURCES + 'images/organImgs/child/';

var idFlag=0;
var recordStr="";
var recordArray;

var foldImg= PROCESS_PATH_GLOBAL_RESOURCES + 'images/arrows/collapse.png';
var unFoldImg= PROCESS_PATH_GLOBAL_RESOURCES + 'images/arrows/unfold.png';

var organselectedIndex=0;
var isShowCompareMode=false;
var otherTableTips = styleGridTipGlobal;
var othersWindowWidth=910;
var scrollWidth=17;
var picSpace=17;

var selectedUid="";
var selectedVersion="";
var selectedProName="";
var selectedEPNo = "";
var selectedProType="";
var selectedStatus="";
var selectedOrgan="";
var selectedPicOrgan="";
var patientType='';

var exceptNameWidth=883;