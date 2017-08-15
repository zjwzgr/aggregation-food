/**
 * 渲染这个组件
 */

function render(global, data) {
    if(data.httpget.status == 'success'){
        var headimg_url = "http://p0.meituan.net/codeman/38cbb010e77f094368f2a2bacd0a998b302452.png";
        var data = data;
        var getdata = data.httpget.data;
        var secdata = getdata.poiList;
        var cardtype = getdata.envi;
        var dataArr = [];
        if(secdata!=null && secdata.length>1){
            for(var i = 0; i < secdata.length; i++){
                dataArr.push(render_section(data,secdata[i],cardtype))
            }
            return `${cardtype=='baselineA'?`<div class='data_wrapper' >
                    <div class='content' data_len='T'>
                        <div class='ad_content'>${dataArr.join('')}</div>
                    </div>
                </div>
                <div class='yes' id='yes' style="text-align:center;color:#aaa;margin:.2rem 0;">${secdata.length==1?'数据已全部加载~':'正在加载中……'}</div>`
            :
                `<div class='data_wrapper' >
                    <div class='content' data_len='T'>
                        <div class='ad_content'>${dataArr.join('')}</div>
                    </div>
                </div>
                <div class='yes' id='yes' style="text-align:center;color:#aaa;margin:.2rem 0;">${secdata.length<4?'数据已全部加载~':'正在加载中……'}</div>`}`          
        }else{
            return `<div class="no" style="text-align:center;color:#aaa;margin:.2rem 0;">数据已全部加载~</div>`;
        }
        
    }else{
        return `<div class="no" style="text-align:center;color:#aaa;margin:.2rem 0;">数据已全部加载~</div>`; 
    }
}
function render_section(data,secdata,cardtype){
    var img_star10 = data.start_img1;
    var img_star0 = data.start_img2;
    var img_star5 = data.start_img3;
    var imgOne="http://p0.meituan.net/codeman/af5a1df2be75dc5c317a07d8cfece745964.png";//团
    var imgTwo="http://p1.meituan.net/codeman/43c9270b8c3427af1f51ccbd1c9f1ad01437.png";//劵
    var imgThree="http://p1.meituan.net/codeman/d9c3dee4962ab9c99665c2f28e4b81621700.png";//买
    
    var poi_id = secdata.poiid;
    var poi_img = secdata.frontImg.replace(/w\.h/i,'1000.0');
    var poi_name = secdata.name;                //店名
    var poi_score = secdata.score;              //评分 5.0
    var poi_scoreIntro = secdata.scoreIntro;    //评分 4.8分 很好
    var poi_markNumbers = secdata.markNumbers;  //评论数 2301
    var poi_markContent = secdata.markContent;  //评论 "特别实惠",
    var poi_isAd = secdata.isAd;
    var poi_url = secdata.poiUrl;
    var poi_clickUrl = secdata.clickTrackUrl;
    var poi_exposeUrl = secdata.exposeTrackUrl;
    var poi_address = secdata.address;
    var poi_phone = secdata.phone;
    var poi_fodderInfo = secdata.fodderInfo;    //物料信息
    
    var foodData = secdata.foodextensions;
    var poi_historyCount = foodData.historySaleCount; //历史消费人数 5000+人消费"
    var poi_avgPrice = foodData.avgPrice;     //均价 812
    var poi_distance = foodData.dist;         //距离 6.4
    var poi_posdescr = foodData.posdescr;     //商圈 望京 
    var poi_promotions = foodData.promotions; //折扣 5.5折
    var poi_descr = foodData.descr;           //品类 干锅
    var poi_smartTag = foodData.smartTag;     //["望京川菜第一名","新店"]
    
    
    var poi_abstract = foodData.abstracts;    //惠团等优惠 数组[]
    //rank_show标签
    var tagArr = [];
    if(poi_smartTag.length>0){
        for(let i = 0; i < poi_smartTag.length; i++){
            var context = poi_smartTag[i];
            tagArr.push(`<span class="rank_show">${poi_smartTag[i]}</span>`);
        }
    }
    //惠团等优惠
    if(poi_abstract!=null && poi_abstract.length > 0){
        for(var i = 0; i < poi_abstract.length; i++){
            if(poi_abstract[i].type == "pay"){
                var poi_promotionInfo_img = poi_abstract[i].icon;   //惠  
                var poi_promotionInfo = poi_abstract[i].message;
            }
            if(poi_abstract[i].type == "group"){
                var poi_groupInfo_img = poi_abstract[i].icon;   //团
                var poi_groupInfo = poi_abstract[i].message;
            }
            if(poi_abstract[i].type == "coupon"){
                var poi_couponInfo_img = poi_abstract[i].icon;   //券  
                var poi_couponInfo = poi_abstract[i].message;
            }
        }
    }
    //星级逻辑
    var starArr = [];
    if(poi_score > 4){
        for(var j = 0; j < poi_score; j++){
            if(j + 1 > poi_score){
                starArr.push(`<img src='${img_star5}'>`);
            }else if (j + 1 == poi_score){
                starArr.push(`<img src='${img_star10}'>`);
            }else{
                starArr.push(`<img src='${img_star10}'>`);
            }
        }
    }else{
        var empty = parseInt(5 - poi_score);
        for(var j = 0; j < poi_score; j++){
            if(j + 1 > poi_score){
                starArr.push(`<img src='${img_star5}'>`);
            }else if(j + 1 == poi_score){
                starArr.push(`<img src='${img_star10}'>`);
            }else{
                starArr.push(`<img src='${img_star10}'>`);
            }
        }
        for(var i = 0; i < empty; i++){
            starArr.push(`<img src='${img_star0}'>`);
        }
        
    }
    
    //距离隐藏
    if(poi_distance && poi_distance>100){
        poi_distance = '>100'
    }
    // cardtype='baselineC';
    if(cardtype=='baselineD'){
        cardtype='baselineC';
    }
 //${cardtype=='baselineA'?`class='poi_wrapper pw_marbot-A'`:(cardtype=='baselineB'?`class='poi_wrapper pw_marbot-B'`:(cardtype=='baselineC'?`class='poi_wrapper pw_marbot-C'`:(cardtype=='baselineD'?`class='poi_wrapper pw_marbot-D'`:`class='poi_wrapper pw_marbot-D'`)))}   
    return `<div cevent="${poi_id}" data_isAd='${poi_isAd}' data_url='${poi_url}' data_expose='${poi_exposeUrl}' data_click='${poi_clickUrl}'
    ${cardtype=='baselineA'?`class='poi_wrapper pw_marbot-A'`:(cardtype=='baselineB'?`class='poi_wrapper pw_marbot-B'`:(cardtype=='baselineC'?`class='poi_wrapper pw_marbot-D'`:(cardtype=='baselineD'?`class='poi_wrapper pw_marbot-D'`:`class='poi_wrapper pw_marbot-D'`)))}>
                <div ${cardtype=='baselineA'?`class='poi_img pi_wid_hei-A'`:(cardtype=='baselineB'?`class='poi_img pi_wid_hei-B'`:(cardtype=='baselineC'?`class='poi_img pi_wid_hei-D'`:(cardtype=='baselineD'?`class='poi_img pi_wid_hei-D'`:`class='poi_img pi_wid_hei-D'`)))}>
                    <div class='imgcontent'>
                    ${cardtype=='baselineA'?`<div class='img' style="background-image:url(${poi_img})"></div>`:`<img src='${poi_img}'>`}
                    </div>
                </div>
                <div ${cardtype=='baselineA'?`class='content_wrapper cw_wid-A'`:(cardtype=='baselineB'?`class='content_wrapper cw_wid-B'`:(cardtype=='baselineC'?`class='content_wrapper cw_wid-D'`:(cardtype=='baselineD'?`class='content_wrapper cw_wid-D'`:`class='content_wrapper cw_wid-D'`)))} >
                    <div class='namecontent'>${poi_name}</div>
                    <div class='content1'>
                        <div class="star_show">
                            ${starArr.join('')}
                        </div>
                        ${poi_avgPrice>0?`
                            <div class="price_show">￥${poi_avgPrice}/人</div>
                        `:''}
                        
                        <div class="area_show">
                        <span class="posdescr">${poi_posdescr}</span> 
                        ${poi_distance?`<span class="distance">${poi_distance}km</span>`:``}
                        </div>
                    </div>
                    <div class='content2'style='${cardtype=='baselineB'&&(poi_address!=null||poi_phone!=null)?"border-bottom:1px solid #ddd":(poi_abstract.length!=0?"border-bottom:1px solid #ddd":'')}'>
                        <div>
                            <span class="descr_show">${poi_descr}</span>
                            ${tagArr.join('')}
                            <!--<span class="rank_show">aa</span>
                            <span class="rank_show">aa</span>--!>
                        </div>
                        <div class="check"></div>
                    </div>
                <div class='content3'>
                    <ul>
                    ${cardtype=='baselineB'?(poi_abstract.length>0?`
                        ${poi_promotionInfo ?
                        `<li>
                        <!--<div class="promotion"><span>哈哈哈</span></div>--!>
                        <img src='${poi_promotionInfo_img}'></img>
                         <span>${poi_promotionInfo}</span>
                         </li>`:`<span><span>`}
                        ${poi_groupInfo ? `
                        <li>
                        <img src='${poi_groupInfo_img}'></img>
                        <span>${poi_groupInfo}</span>
                        </li>`:`<span><span>`}
                        ${poi_couponInfo ? `
                        <li>
                        <img src='${poi_couponInfo_img}'></img>
                        <span>${poi_couponInfo}</span>
                        </li>`:`<span><span>`}
                    `:`
                        ${poi_address?`<li><span>地址：${poi_address}</span></li>`:''}
                        ${poi_phone?`<li><span>Tel：${poi_phone}</span></li>`:''}
                    `):`
                        ${poi_promotionInfo ?
                        `<li>
                        <!--<div class="promotion"><span>哈哈哈</span></div>--!>
                        <img src='${poi_promotionInfo_img}'></img>
                         <span>${poi_promotionInfo}</span>
                         </li>`:`<span><span>`}
                        ${poi_groupInfo ? `
                        <li>
                        <img src='${poi_groupInfo_img}'></img>
                        <span>${poi_groupInfo}</span>
                        </li>`:`<span><span>`}
                        ${poi_couponInfo ? `
                        <li>
                        <img src='${poi_couponInfo_img}'></img>
                        <span>${poi_couponInfo}</span>
                        </li>`:`<span><span>`}
                    `}
                    </ul>
                </div>
                </div>
            </div>` 
    
}













