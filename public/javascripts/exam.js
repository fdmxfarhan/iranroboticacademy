$(document).ready(function(){
    $('a#nav-link1').removeClass('active');
    $('a#nav-link2').removeClass('active');
    $('a#nav-link3').removeClass('active');
    $('a#nav-link4').addClass('active');
    $('a#nav-link5').removeClass('active');
    $('a#nav-link6').removeClass('active');
    $('a#nav-link7').removeClass('active');
    $('a#nav-link8').removeClass('active');
    $('a#nav-link9').removeClass('active');

    $('.col-1').click(function(){
        $('.modal-1').fadeIn(200);
        $('#popup-1').show(500);
    });
    $('.col-2').click(function(){
        $('.modal-1').fadeIn(200);
        $('#popup-2').show(500);
    });
    $('.col-3').click(function(){
        $('.modal-1').fadeIn(200);
        $('#popup-3').show(500);
    });
    $('.close').click(function(){
        $('.modal-1').hide();
        $('#popup-1').hide();
        $('#popup-2').hide();
        $('#popup-3').hide();
    });
    $('.modal-1').click(function(){
        $('.modal-1').hide();
        $('#popup-1').hide();
        $('#popup-2').hide();
        $('#popup-3').hide();
    });
});