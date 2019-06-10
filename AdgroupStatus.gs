function main() {
  //pasue all adgroups before start
  //to enable only necessarily campaigns
  pauseAllVideoAdGroups();

//--------------------------
  //adgroups stuctures
  //geo is campaign geo id 
  //27-35 - tempirature gaps
  var campaignSpb= {
    'geo':"536203",
    '27': ["MA_SPB_27"],
    '29': ["MA_SPB_29"],
    '31': ["MA_SPB_31"],
    '33': ["MA_SPB_33"],
    '35': ["MA_SPB_35"],
};
  var campaignMsk= {
    'geo':"524901",
    '27': ["MA_MSK_27"],
    '29': ["MA_MSK_29"], 
    '31': ["MA_MSK_31"],
    '33': ["MA_MSK_33"],
    '35': ["MA_MSK_35"],
};
  var campaignEkb= {
    'geo':"1486209",
    '27': ["MA_EKB_27"],
    '29': ["MA_EKB_29"], 
    '31': ["MA_EKB_31"],
    '33': ["MA_EKB_33"],
    '35': ["MA_EKB_35"],
};
  
    var campaignSamara= {
    'geo':"3621990",
    '27': ["MA_SAMARA_27"],
    '29': ["MA_SAMARA_29"], 
    '31': ["MA_SAMARA_31"],
    '33': ["MA_SAMARA_33"],
    '35': ["MA_SAMARA_35"],
};
   var campaignGroznyy= {
    'geo':"839788",
    '27': ["MA_GROZNIY_27"],
    '29': ["MA_GROZNIY_29"], 
    '31': ["MA_GROZNIY_31"],
    '33': ["MA_GROZNIY_33"],
    '35': ["MA_GROZNIY_35"],
};
//--------------------------
  var adgroups=[]
  //array with adgroup structures
  adgroups = [campaignSpb,campaignMsk,campaignEkb,campaignSamara,campaignGroznyy]
  //loop over ^this^ arrray 
  
  for (var adg in adgroups)
  {
    processGeo(adgroups[adg]);
  }
}

//processGeo procesess adgroup weather api request and switch over tempiratures
function processGeo(campaigns){
  var response = UrlFetchApp.fetch('http://api.openweathermap.org/data/2.5/weather?id='+campaigns['geo']+'&APPID=5e97a4d9ca71c022dc0dcd8413488a09&units=metric');
  var json = response.getContentText();
  var temp = JSON.parse(json);
  if(temp["main"]["temp"] > 25 && temp["main"]["temp"] < 28  ){
   switchVideoAdGroup(campaigns['27'][0],1);
//   sendLogs(campaigns['27'],campaigns['geo'],temp["main"]["temp"]);
   return 
  }
  if(temp["main"]["temp"] > 28 && temp["main"]["temp"] < 31){
   switchVideoAdGroup(campaigns['29'][0],1);
  // sendLogs(campaigns['29'],campaigns['geo'],temp["main"]["temp"]);
   return    
  }
  if(temp["main"]["temp"] > 31 && temp["main"]["temp"] < 34  ){
   switchVideoAdGroup(campaigns['31'][0],1);
//   sendLogs(campaigns['31'],campaigns['geo'],temp["main"]["temp"]);
   return
  }
  if(temp["main"]["temp"] > 34 && temp["main"]["temp"] < 37  ){
   switchVideoAdGroup(campaigns['33'][0],1);
  // sendLogs(campaigns['33'],campaigns['geo'],temp["main"]["temp"]);
   return
  }
  if(temp["main"]["temp"] > 37  ){
   switchVideoAdGroup(campaigns['35'][0],1);
//   sendLogs(campaigns['35'],campaigns['geo'],temp["main"]["temp"]);
   return
  }
}

//change adgroup status according to adgroup name
function switchVideoAdGroup(adgroup, makeStatus) {
  var videoAdGroupIterator = AdsApp.videoAdGroups()
      .withCondition('Name = "'+adgroup+'"')
      .get();
  if (videoAdGroupIterator.hasNext()) {
    var videoAdGroup = videoAdGroupIterator.next();
    if (makeStatus==0){
    videoAdGroup.pause();
    }else{
      videoAdGroup.enable();
    }
    
    Logger.log('AdGroup with name: ' + videoAdGroup.getName() +
        ' has paused status: ' + videoAdGroup.isPaused());
  }
}

//get then pause all videoAdGroup
function pauseAllVideoAdGroups() {
  // AdsApp.videoAdGroups() will return all ad groups that are not removed by
  // default.
  var videoAdGroups = [];
  var videoAdGroupIterator = AdsApp.videoAdGroups().get();
  while (videoAdGroupIterator.hasNext()) {
    var videoAdGroup = videoAdGroupIterator.next();
	switchVideoAdGroup(videoAdGroup.getName(),0)
    videoAdGroups.push(videoAdGroup);
  }
  return videoAdGroups;
}

//TBA, not yet active
//function sendLogs(adgroupeId, geo, temp){
//  var now = new Date();
//  GmailApp.sendEmail("sekamov@campaigner.tech", 
//                    "campaign logs", "time:" + now.toString()+
//                    ",adgroupId:"+adgroupId+",Geo:"+geo+",status:enable");
//}
