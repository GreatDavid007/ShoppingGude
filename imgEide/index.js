function wp_editPicOnlineActual(param)  
{  
    var jsonObj = param || {};  
  
    var DIALOG={};  
    DIALOG.jsonObj=jsonObj;  
    DIALOG.lang='zh_HANS';  
      
    var dialog='<div id="sys_dialog_aviary" class="application dialog" style="height: 428px; top: 27px; left: 45px;opacity: 1; display: block; z-index: 3000; "><div class="close" style="display: block; "><span>x</span></div><table cellpadding="0" cellspacing="0" class="outer_wrap_table"><tbody><tr><td colspan="3"><div class="space"></div></td></tr><tr><td><div class="space"></div></td><td style="width:100%;height:100%;"><table cellpadding="0" cellspacing="0" class="wrap_table" style="display: table; "><tbody><tr><td class="wrap_td"><div class="loading"><table cellpadding="0" cellspacing="0"><tbody><tr><td><span>loading...</span></td></tr></tbody></table></div><iframe id="sys_dialog_iframe_aviary" frameborder="0" style="display: block; " src="'+relativeToAbsoluteURL('aviary_dialog.php')+'"></iframe></td></tr></tbody></table></td><td><div class="space"></div></td></tr><tr><td colspan="3"><div class="space"></div></td></tr></tbody></table></div>';  
    $(dialog).appendTo('body');  
    var ols = '<div id="wp-dialog_aviary" style="z-index:2999;"></div>';  
    $(ols).appendTo('body');  
      
    function dialog_pos(){  
        var dialog=$('#sys_dialog_aviary');  
        dialog.width($(window).width()-90).css('left','45px');  
        $('#wp-dialog_aviary').width($(window).width()).height($(window).height());  
        var topval=($(window).height()-dialog.height())/2;  
        if(topval<0) topval=0;  
        dialog.css('top',topval);  
        if($.browser.msie){  
            var height=dialog.height()-30;  
            if($.browser.version < 9) $('#sys_dialog_aviary .close').addClass('ie_close');  
            $('#sys_dialog_aviary .outer_wrap_table').css('height',height);  
        }  
    }  
    dialog_pos();  
    $(window).bind('resize.aviary',function(){  
        dialog_pos();  
    })  
      
    DIALOG.close=function(){  
        $('#sys_dialog_aviary').remove();  
        $('#wp-dialog_aviary').remove();  
        $(window).unbind('.aviary');  
    }  
      
    DIALOG.setLoading=function(isexist){  
        if(isexist){  
                $('#sys_dialog_aviary .loading').show();  
        }else{  
             $('#sys_dialog_aviary .loading').hide();  
        }  
    }  
    var iframewindow=$('#sys_dialog_iframe_aviary')[0].contentWindow;  
    iframewindow.DIALOG=DIALOG;  
    $(iframewindow).bind('load',function(){  
        iframewindow.initialize();  
    })  
    $('#sys_dialog_aviary .close').click(function(){  
        DIALOG.close();  
    })  
  
}  