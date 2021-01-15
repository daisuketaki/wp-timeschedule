
<script type="text/javascript">
//Json読み込み
var jsonData;   //グローバル変数
jsonData = getJson('<?php echo $url; ?>');
</script>  
<div id="timeschedule">
<div class="">
    <button type="button" data-target=".day0" class="btn-day btn btn-lg">9/4</button>        
    <button type="button" data-target=".day1" class="btn-day btn btn-lg">9/5</button>
    <button type="button" data-target=".day2" class="btn-day btn btn-lg">9/6</button>    
    <button type="button" data-target=".day0,.day1,.day2" class="btn-day btn btn-lg">9/4.5.6</button>
</div>
<div style="padding: 0 0 40px;">
    <div id="schedule"></div>
</div>
</div><!--timeschedule-->