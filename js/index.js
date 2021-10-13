$('html, body').stop().animate({
    scrollLeft : 0
}, 1000)


$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a').on('click focus', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()
    if (num<1) {
        $('.skillContainer > div').find('.score').css({ height:'0%' })
        $('.skillContainer').removeClass('on') 
      } else {
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(80, '.html', 15)
            count(80, '.css', 16)
            count(60, '.script', 17)
            count(60, '.jquery', 18)
            count(70, '.react', 19)
        }
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({
            transitionDelay:'0s'
        })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }
    
    if (num<3) {
        $('#sect4').removeClass('on')
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else {
        $('#sect4 .formbox').css({
            transitionDelay:'1s'
        })
        $('#sect4').addClass('on')
    }

    var secDist = $('section').eq(num).offset().left
    $('html, body').stop().animate({
        scrollLeft : secDist
    }, 1000, function(){
        cflag = false
    })
})


function count(jumsu, cname, time) {
    let num = 0; 
    var stop = setInterval(function(){
        num++;
        if (num<=jumsu) {
            $(cname).find('.score').css({ width:num+'%', transition:'all 0s' })
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
            $(cname).find('.score').css({ transition:'all 1s' })
        }
    }, time)
}





var sDist0 = $('#sect1').offset().left
var sDist1 = $('#sect2').offset().left
var sDist2 = $('#sect3').offset().left

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect4').offset().left             
// 마지막구간이 윈도우높이보다 작을때
// var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollLeft()
    if ( sct>=sDist0 && sct<sDist1 && !cflag) {
        var spantext =''
        $('#menu .detail a').eq(0).addClass('on')
        $('menu .detail a').eq(0).siblings().removeClass('on')
        spantext = $('.detail a').eq(0).find('span').text()
        $('.textshow').text(spantext)
        $('.skillContainer > div').find('.score').css({ width:'0%' })
        $('.skillContainer').removeClass('on')
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag) {
        $('#menu .detail a').eq(1).addClass('on')
        $('#menu .detail a').eq(1).siblings().removeClass('on')
        spantext = $('.detail a').eq(1).find('span').text()
        $('.textshow').text(spantext)
        $('#sect2 .paint').addClass('on')
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(80, '.html', 15)
            count(80, '.css', 16)
            count(60, '.script', 17)
            count(60, '.jquery', 18)
            count(70, '.react', 19)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu .detail a').eq(2).addClass('on')
        $('#menu .detail a').eq(2).siblings().removeClass('on')
        spantext = $('.detail a').eq(2).find('span').text()
        $('.textshow').text(spantext)
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else if ( sct>=lastSect && !cflag) {
        $('#menu .detail a').eq(3).addClass('on')
        $('#menu .detail a').eq(3).siblings().removeClass('on')
        spantext = $('.detail a').eq(3).find('span').text()
        $('.textshow').text(spantext)
        $('#sect4').addClass('on')
    } 


})


$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollLeft: $(this).prev().offset().left
        }, 600)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollLeft: $(this).next().offset().left
        }, 600)
    }
})



$('#menu a').on('click',function(){
    $(this).addClass('on').siblings().removeClass('on')
    var num = $(this).index()
    var spantext = $(this).find('span').text()
    $('.textshow').text(spantext)
    var distance = $('section').eq(num).offset().left
    $('html, body').animate({
         scrollLeft:distance
    },500)
    
    return false
})

$('#sect3 ul li a').on('click',function(){
    var href = $(this).attr('href')
    var desc = $(this).attr('data-desc') 
    var title =$(this).attr('title')
    var datafont=$(this).attr('data-font')
    var datacolor1=$(this).attr('data-color1')
    var datacolor2=$(this).attr('data-color2')
    $('#sect3').append(`<div class="outlayer"><div class="inlayer"><p>${title}</p><p>${desc}</p><p>${datafont}</p><p>${datacolor1}</p><p>${datacolor2}</p><p><a href="${href}" target="_blank"><button style="padding:10px; background-color:#666; color:#fff; border:none">보러 가기</button></a></p><button style="position:absolute; top:-10px; right:-10px; background:red; color:#fff; border:none; padding:10px">닫기</button></div></div>`)
    $('.outlayer').css({
        position:'absolute',
        width:'100%',
        height:'100%',
        top:0, left:0, zIndex:99999,
        background:'rgba(0,0,0,0.5)'
    })
    $('.inlayer').css({
        position:'absolute',
        width:'500px',
        height:'300px',
        top:'50%', left:'50%',
        marginLeft:'-250px',
        marginTop:'-250px',
        background:'#fff',
        padding:'30px',
        textAlign:'center',
        fontSize:'18px',
        fontFamily:'Nanum Pen Script'
    })


 return false
})


$('body').on('click', '.outlayer button', function(){
    $('.outlayer').hide()
})