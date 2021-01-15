jQuery(function($){
    $(function(){
        $("#logs").append('<table class="table">');
        var isDraggable = false;
        var isResizable = true;
        //↓グローバルスコープ
        $sc = $("#schedule").timeSchedule({
            startTime: "10:00", // schedule start time(HH:ii)
            endTime: "23:00",   // schedule end time(HH:ii)
            widthTime: 60 * 10,  // cell timestamp example 10 minutes
            timeLineY: 110,       // height(px)
            verticalScrollbar: 20,   // scrollbar (px)
            timeLineBorder: 2,   // border(top and bottom)
            bundleMoveWidth: 6,  // width to move all schedules to the right of the clicked time line cell
            draggable: isDraggable,
            resizable: isResizable,
            resizableLeft: true,
            rows : {                
                '0' : {
                    title : 'カンファレンス',
                    schedule:[/*
                        {
                            start: '09:00',
                            end: '12:00',
                            text: 'Text Area',
                            data: {
                            }
                        },
                        {
                            start: '11:00',
                            end: '14:00',
                            text: 'Text Area',
                            data: {
                            }
                        }
                    */]
                },
                '1' : {
                    title : 'メリケンパーク',
                    schedule:[/*
                        {
                            start: '16:00',
                            end: '17:00',
                            text: 'Text Area',
                            data: {
                                "class":"example2",
                                "image":"./img/1.png"
                            }
                        }
                   */ ]
                },
                '2' : {
                    title : 'ファミリー',
                    schedule:[ ]
                },
                '3' : {
                    title : 'オデカケ',
                    schedule:[ ]
                },
                '4' : {
                    title : 'eスポーツ',
                    schedule:[ ]
                },
                '5' : {
                    title : 'その他',
                    schedule:[ ]
                }

            },
            onAppendSchedule: function(node, data){
                if(data.data.class){
                    node.addClass(data.data.class);
                }
                if(data.data.image){
                    var $img = $('<div class="photo"><img></div>');
                    $img.find('img').attr('src', data.data.image);
                    node.prepend($img);
                    node.addClass('sc_bar_photo');
                }
            },
        });
    });

    $(function() {
      // 日時の表示切り替え
      $('.btn-day').click(function() {
         let day= $(this).attr('data-target');
        $(".day0").fadeOut(); 
        $(".day1").fadeOut();
        $(".day2").fadeOut(); 
        $(day).hide();
        $(day).fadeIn();
      });
    });
});