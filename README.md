# HOWTO

To add adgroup with geo in script you need to add structure - 
```
  var campaign<cityName>= {
    'geo':<GEOIstring>,
    '27': [<ADGROUPNAMEstring>],
    '29': [<ADGROUPNAMEstring>],
    '31': [<ADGROUPNAMEstring>],
    '33': [<ADGROUPNAMEstring>],
    '35': [<ADGROUPNAMEstring>],
};
```
example: 
```javascript
  var campaignSpb= {
    'geo':"536203",
    '27': ["MA_SPB_27"],
    '29': ["MA_SPB_29"],
    '31': ["MA_SPB_31"],
    '33': ["MA_SPB_33"],
    '35': ["MA_SPB_35"],
};
```
and then add it to array of adgroups (i comented it in code)
# Weather API
HOW TO start with wether api
https://openweathermap.org/guide#how

Api call example 
---
Geo id set to Moscow  
```
http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5e97a4d9ca71c022dc0dcd8413488a09&units=metric 
```

Example of API respond:
```
{"id":88319,"dt":1345284000,"name":"Benghazi",
    "coord":{"lat":32.12,"lon":20.07},
    "main":{"temp":306.15,"pressure":1013,"humidity":44,"temp_min":306,"temp_max":306},
    "wind":{"speed":1,"deg":-7},
    "weather":[
                 {"id":520,"main":"rain","description":"light intensity shower rain","icon":"09d"},
                 {"id":500,"main":"rain","description":"light rain","icon":"10d"},
                 {"id":701,"main":"mist","description":"mist","icon":"50d"}
              ],
    "clouds":{"all":90},
    "rain":{"3h":3}}

```
current tempirature can be found at main -> temp 

Field references can be found here:
https://openweathermap.org/weather-data

and here:
https://openweathermap.org/current

also: 

- For temperature in Fahrenheit use units=imperial
- For temperature in Celsius use units=metric
- Temperature in Kelvin is used by default, no need to use units parameter in API call

City id can be found here:
https://openweathermap.org/find?q=

and also in this file (best way as for me)

http://bulk.openweathermap.org/sample/city.list.json.gz

# Google script 
Work with video campaigns ad adgroups with examples:
- https://developers.google.com/adwords/api/docs/reference/v201809/AdGroupService.AdGroup adgroup sctucture in google api 

- https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_videoadgroup video adgroup scructure in google script

- https://developers.google.com/google-ads/scripts/docs/examples/video

- https://developers.google.com/google-ads/scripts/docs/features/video-campaigns

- https://developers.google.com/apps-script/guides/services/external  HOW TO: HTTP calls and json unmarshaling can be found here
- https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_instreamadbuilder youtube adds  structure 


# Research info & guids 
Google api
Differences from the Google Ads UI
The following **campaign types are available in the UI but are not currently supported in the API:**
**Video** - These are supported only in reports.
(source https://developers.google.com/adwords/api/docs/guides/campaigns-overview)

But it suported by google script (references above).

HOW TO google adscript: 
To make an API call you need to use UrlFetchApp.fetch() method 
example: 
```javascript
response = UrlFetchApp.fetch("http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5e97a4d9ca71c022dc0dcd8413488a09&units=metric")
```
then you can parse json response
```javascript
var json = response.getContentText(); // get response body context 
var data = JSON.parse(json) // parse it to new variable 
//then you can access json field like this
//data["main"]["temp"]
```

add video adgroup: 

```
function addInStreamVideoAd() {
  // If you have multiple adGroups with the same name, this snippet will
  // pick an arbitrary matching ad group each time. In such cases, just
  // filter on the campaign name as well:
  //
  // AdsApp.videoAdGroups()
  //     .withCondition('Name = "INSERT_ADGROUP_NAME_HERE"')
  //     .withCondition('CampaignName = "INSERT_CAMPAIGN_NAME_HERE"')
  var videoAdGroupIterator = AdsApp.videoAdGroups()
      .withCondition('Name = "INSERT_ADGROUP_NAME_HERE"')
      .get();
  var video = getVideo(); // Defined above
  if (videoAdGroupIterator.hasNext()) {
    var videoAdGroup = videoAdGroupIterator.next();
    videoAdGroup.newVideoAd().inStreamAdBuilder()
        .withAdName("In Stream Ad")
        .withDisplayUrl("http://www.example.com")
        .withFinalUrl("http://www.example.com")
        .withVideo(video)
        .build();
  }
}
```


To pause video adgroup or campaign you need to get it then call .pause() method on videoAdgroup structure instanse (docs above) or .enable() to enable it

pause example:

 ``` javascript
 function pauseVideoAdGroup() {
 //GET video adgroup by its name 
  var videoAdGroupIterator = AdsApp.videoAdGroups() 
      .withCondition('Name = "INSERT_ADGROUP_NAME_HERE"') 
      .get();
//iterate over it
  if (videoAdGroupIterator.hasNext()) {
    var videoAdGroup = videoAdGroupIterator.next();
//call pause on it
    videoAdGroup.pause();
    Logger.log('AdGroup with name: ' + videoAdGroup.getName() +
        ' has paused status: ' + videoAdGroup.isPaused());
  }
}
```



# Aditional info
Template ads 
https://developers.google.com/adwords/api/docs/appendix/templateads - **companionBanner** can be found here

