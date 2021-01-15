function getJson(url){
var xhr = new XMLHttpRequest();
 
xhr.responseType = 'json';
 
xhr.open('GET', url);

xhr.addEventListener('load', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var res = xhr.response;
        if (JSON && navigator.userAgent.indexOf('Trident') !== -1) {
            //IE対策。Json読めない問題
            res = JSON.parse(res);
        }
        res.forEach(function(item){
            var start = item.acf.events_start_time;
            var end =  item.acf.events_ending_time;//$(this).timeSchedule('formatTime', $(this).timeSchedule('calcStringTime', start) + 3600);
            item.events_area.forEach(function(areaNumber){
                var areaID = getAreaNumber(areaNumber);
                var catID ='cat' + getCatNumber(item.events_category);
                var text = setText(item.title.rendered);
                var day  = getDay(item.events_day);
                var img = "";
                if(item['_embedded'].hasOwnProperty("wp:featuredmedia")){
                    img = item['_embedded']["wp:featuredmedia"][0]["source_url"]
                }
                if(!start){start = "10:00";}
                if(!end){end = "23:00";}                
                $sc.timeSchedule('addSchedule', areaID, {
                            start:start,
                            end: end,
                            text:text,
                            data:{
                                class: 'sc_bar_insert ' + catID +' '+day,
//                                image:item.acf.events_top_image.url
                                image:img,
                                link:item.link
                            }
                });
            });

        });
    }
}, false);
 
xhr.send(null);
    //wordpressのエリアIDとテーブル行対応表
    function getAreaNumber(areaNumber){
        let areaID;
        switch (areaNumber){
                      case 162:areaID ='0';
                        break;
                      case 163:areaID ='1';
                        break;
                      case 164:areaID ='2';
                        break;
                      case 188:areaID ='3';
                        break;
                      case 189:areaID ='4';
                        break;
                      case 171:areaID ='5';
                        break;
                      default:areaID ='';
                    }
        return areaID;
    }
    //wordpressのカテゴリIDと色対応表
    function getCatNumber(catNumber){
        let catID;
        if(catNumber.length >1){return "7";}
        else{cat = catNumber[0];}
        switch (cat){
                      case 155:catID ='2';  //interactive
                        break;
                      case 153:catID ='0';  //music
                        break;
                      case 154:catID ='1';  //film
                        break;
                      case 158:catID ='5';  //kids
                        break;
                      case 157:catID ='4';  //fasion
                        break;
                      case 157:catID ='6';  //anime
                        break;                        
                      default:catID ='7';    //multi category
                    }
        return catID;
    }
    //wordpressの日付対応表
    function getDay(days){
        let dayID ="";
        days.forEach(function(day){
            dayID +="day";
            switch (day){
              case 187:dayID +='0';  //9/4
                break;
              case 159:dayID +='1';  //9/5
                break;
              case 160:dayID +='2';  //9/6
                break;
              default:dayID ='';    //other
            }
            dayID +=" ";
        });
        return dayID;        
    }
    //テキストのゴミを取り除く
    function setText(text){
        return text.replace(/(&lt;)/g, '<')
            .replace(/(&gt;)/g, '>')
            .replace(/(&quot;)/g, '"')
            .replace(/(&#39;)/g, "'")
            .replace(/(&amp;)/g, '&')
            .replace(/(&#8221;)/g,'"')
            .replace(/(&#8220;)/g,'"')            
            .replace(/(&#8211;)/g,'-')            
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    }
}