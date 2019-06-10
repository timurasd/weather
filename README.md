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
```
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
Api call example 
---
Geo id set to Moscow  
```
http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5e97a4d9ca71c022dc0dcd8413488a09&units=metric 
```
Field references can be found here:
https://openweathermap.org/weather-data
City id can be found here:
https://openweathermap.org/find?q=

and also in this file (best way as for me)

http://bulk.openweathermap.org/sample/city.list.json.gz

# Google script 
Work with video campaigns ad adgroups with examples:

- https://developers.google.com/google-ads/scripts/docs/examples/video

- https://developers.google.com/google-ads/scripts/docs/features/video-campaigns
