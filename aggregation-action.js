/**
 * com用于实现渲染节点后的动作，
 * 例如绑定事件，动态修改内容等
 */
define(['zepto.js'], function ($) {
    /**
     * dom参数是model中render方法返回的DOM节点
     */
    return function (dom) {
        var $dom = $(dom);
        var number=15;
        var Adlist=$dom.find('.ad_content');
        var len=$dom.find('.poi_wrapper').length;
        var listTotal = $dom.find('.ad_content');
        var winHeight = $(window).height();
        var send = [];
        var gid=$dom.attr('gid');
        //初始曝光
        for(var i = 0; i < len; i++){
            var expose = $dom.find('.poi_wrapper').eq(i).attr('data_expose');
            var currentTop = $dom.find('.poi_wrapper').eq(i).offset().top;
            if(currentTop < winHeight){
                if(send.indexOf(i)<0){
                    $.ajax({
                        url:expose,
                        success:function(msg){
                          // console.log(msg);
                        }
                    });
                    send.push(i);
                }
            }
        }
        
        //打点
        var stateClick = true;

        $dom.on('click',function(e){
            if($dom.find('.poi_wrapper').length>0){
                var src = $(e.target).closest('.poi_wrapper');
                var poi_url = src.attr('data_url');     //商户url
                var poi_click = src.attr('data_click'); //打点url
                // console.log(poi_url,poi_click);
                if(stateClick){
                    stateClick = false;
                    $.ajax({
                        url:poi_click,
                        success:function(data){
                            stateClick=true;
                            //console.log(poi_click,'ok');
                            window.location.href=poi_url;
                        },
                        error:function(data){
                            stateClick = true;
                            //console.log(poi_click,'false');
                            window.location.href = poi_url;
                        }
                    })
                }
            }

        })
        
        
        var flag=true;
        $(window).scroll(function(){
            var winScrollTop = $(window).scrollTop();
            //for(let j = )
            for(let i=0 ;i<$dom.find('.poi_wrapper').length;i++){
                var expose=$dom.find('.poi_wrapper').eq(i).attr('data_expose');
                var mainOffsetTop = $dom.find('.poi_wrapper').eq(i).offset().top;
                var mainHeight = $dom.find('.poi_wrapper').eq(i).height();
                //winHeight是当前窗体的的高度
                if(winScrollTop > mainOffsetTop + mainHeight || winScrollTop <　mainOffsetTop - winHeight){
                }else{
                    if(send.indexOf(i)<0){
                        $.ajax({
                            url:expose,
                            success:function(msg){
                            }
                        });
                        send.push(i);
                    }
                }
            }
            
        //翻页    
            if($(window).scrollTop() >= $(document).height() - $(window).height()-1 && flag) {
                flag=false;
                var n_url = window.location.href;
                var n = listTotal.find('.poi_wrapper').length;
                setTimeout(function(){
                    if($dom.find('.no').length<=0&&number <= 300){
                        $.ajax({
                            url:n_url+`&offset=${number}`,
                            dataType:'html',
                            context: document.body,  //设置回调上下文
                            success: function(msg){
                                var n_msg = $(msg);
                                var str = msg.toString();
                                //  console.log(n_url+`&offset=${number}&gid=${gid}`);
                                if($(n_msg.find('.content')).attr('data_len')==='T') {
                                    var n_len=$(n_msg).find('.poi_wrapper').length;
                                    var card=[];
                                    for(let i=0;i<n_len;i++){
                                        card.push((n_msg).find('.poi_wrapper').eq(i));
                                    }
                                    for(let i=0;i<card.length;i++){
                                        var ad_dom=card[i];
                                        Adlist.append(ad_dom);
                                    }
                                    if(number<=300){
                                        number+=15;
                                        flag=true;
                                    }
                                    // console.log(number);
                                }else{
                                    $dom.find('.yes').html('数据已全部加载~');
                                    
                                }
                                __setupCom();
                                //flag=true;
                            }
                        }); 
                    } 
                    
                   
                },400)

            }
        })    

    }
    
});


