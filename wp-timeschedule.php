<?php
/**
 * 
 *
 * 
 * @package    wp-timeschedule
 * @author     DaisukeTaki
 * @link       
 *
 * Plugin Name:       タイムスケジュール表示(078専用)
 * Description:       ショートコードでタイムテーブルを呼び出す。jquery.scheduleを利用
 * Version:           1.1
 * Author:            DaisukeTaki
 * License:           GPL2
*/

function timeschedule078_register_stylesheet() { //読み込むCSSを登録する    
	$plugin_dir = str_replace(basename(__FILE__), "", plugin_basename(__FILE__));
  $plugin_css =  plugins_url().'/'.$plugin_dir. 'css/style.css';
	wp_register_style('timeschedule078_style', $plugin_css);
}
function timeschedule078_add_stylesheet() { //登録したCSSを以下の順番で読み込む
	timeschedule078_register_stylesheet();
//  if(is_home() || is_front_page()){
  	wp_enqueue_style('timeschedule078_style', '', array(), '1.0', false);
//  }
}
add_action('wp_enqueue_scripts', 'timeschedule078_add_stylesheet');


/* ------------------ スクリプトの読み込み-----------------------*/
function timeschedule078_add_stylesheet_add_script(){ //読み込むJSを登録する 
//  if(is_home() || is_front_page()){
      //jquery-ui依存
      wp_enqueue_script( 'jquery-ui-droppable');
      wp_enqueue_script( 'jquery-ui-resizable');
      $js_path = plugins_url( '/js/jq.schedule.js', __FILE__,array('jquery-ui-droppable'),  '1.1', true );
      wp_enqueue_script( 'timeschedule078_scheduleJs', $js_path,array('jquery'), '', true );
      $js_path = plugins_url( '/js/config.js', __FILE__ );
      wp_enqueue_script( 'timeschedule078_config', $js_path);
      $js_path = plugins_url( '/js/getJson.js', __FILE__ );
      wp_enqueue_script( 'timeschedule078_getJson', $js_path);    
//  }
  
}
add_action('wp_enqueue_scripts','timeschedule078_add_stylesheet_add_script');

/* ------------------ ショートコード-----------------------*/

function timeschedule078_short_cord() {
  //ショートコードの引数にしたかったけど、固定ページで＆を入力すると変換される。。。
  $url = 'https://2020.078kobe.jp/wp-json/wp/v2/events/?per_page=100&page=1&_embed';
  //ob_start使えない？php.iniの設定のせいかも
  /*
  ob_start();  
    $url = $atts['url'];
  require_once('short-cord.php');
  return ob_get_clean();
  */
  $text = <<<EOT
<script type="text/javascript">
//Json読み込み
var jsonData;   //グローバル変数
jsonData = getJson('
EOT;
$text .=$url;
$text .= <<<EOT
');
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
EOT;
  return $text;

}
add_shortcode('timeschedule078', 'timeschedule078_short_cord');
