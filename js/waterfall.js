(function ($) {

    var methods = {
        init: function (options) {
            var settings = $.extend({}, $.fn.jcWaterfall.defaults, options);
            var target=this;
            window.onload=function(){
                waterfall(target);
            }

            $(window).scroll(function(){
                var h=$(document).height()-$(window).height()
                if($(document).scrollTop()>=h){
                    loadImg(target);
                }
            });
        }
    }

    function waterfall(target){
        var picList=$('.picList');
            var listWidth=picList.outerWidth(true);
            var maxCol=Math.floor($(window).width()/listWidth);
            var wfCol=new Array();

            for (var i = 0; i < picList.length; i++) {
                var currentList=picList.eq(i);
                var colHeight=currentList.outerHeight(true);
                if (i<maxCol) {
                    wfCol[i]=colHeight;
                    currentList.css('top', 0);
                    currentList.css('left', i*listWidth);
                }else{
                    minHeight= Math.min.apply(null,wfCol);
                    minCol=getArrayIndex(wfCol,minHeight);
                    wfCol[minCol]+=colHeight;

                    currentList.css('top', minHeight);
                    currentList.css('left', minCol*listWidth);
                }
                currentList.attr('id', 'waterfall-item-'+i);
            };

            var lastLayerTop=parseInt(picList.last().css('top'));
            var lastLayerHeight=picList.last().outerHeight(true);
            var waterfallHeight=lastLayerTop+lastLayerHeight;

            target.css({
                width: function(){return listWidth*maxCol;},
                height: function(){return waterfallHeight;}
            });
    }    

    function loadImg(parent){
        var json="js/json_load.js";
        $.getJSON(json,function(data){

            $.each(data,function(i){
                var url=data[i].url;
                var desc=data[i].desc;
                var author=data[i].author;
                var height=parseInt(data[i].height);
                if (height>600) {height=600;};

                var html="<div class=\"picList\"><div class=\"picThumbnail\"><a href=\"\"><img src="+url+" alt=\"\"></a></div><div class=\"picDescription\"><p>"+desc+"</p><p>"+author+"</p></div></div>";
                
                var divWrapper=$('<div class=\"picList\">');
                var thumb=$('<div class=\"picThumbnail\">').css('height', height);
                var imgContent=$("<a href=\"\"><img src="+url+" alt=\"\"></a>");
                var comment=$("<div class=\"picDescription\"><p>"+desc+"</p><p>"+author+"</p></div></div>");

                thumb.append(imgContent).appendTo(divWrapper);
                divWrapper.append(comment);
                parent.append(divWrapper);
            
            });
        });
        waterfall(parent);
    }

    function getArrayIndex(s, v) {
        for (i in s) {
            if (s[i] == v)
                return i;
        }
    }

    function maxCol(listWidth) {
        Math.floor($(window).width() / listWidth);
    }



    $.fn.jcWaterfall = function (method) {

        $.fn.jcWaterfall.defaults = {

        };

    // Method calling logic
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }

};
})(jQuery)