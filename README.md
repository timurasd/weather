#HOWTO

To add adgroup with geo in script you need to add structure - 
  var campaign<cityName>= {
    'geo':<GEOIstring>,
    '27': [<ADGROUPNAMEstring>],
    '29': [<ADGROUPNAMEstring>],
    '31': [<ADGROUPNAMEstring>],
    '33': [<ADGROUPNAMEstring>],
    '35': [<ADGROUPNAMEstring>],
};
example: 
  var campaignSpb= {
    'geo':"536203",
    '27': ["MA_SPB_27"],
    '29': ["MA_SPB_29"],
    '31': ["MA_SPB_31"],
    '33': ["MA_SPB_33"],
    '35': ["MA_SPB_35"],
};
and then add it to array of adgroups (i comented it in code)

#Google script 
Work with video campaigns ad adgroups with examples 
https://developers.google.com/google-ads/scripts/docs/examples/video

https://developers.google.com/google-ads/scripts/docs/features/video-campaigns
