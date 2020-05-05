$(document).ready(function(){
    var cnt = 0;
    $('#dropdownuser').hide();
    $('#login-register').hide();
    $('#dropdown1').hide();
    $('#userbtn').click(function(){
        $('#dropdownuser').slideDown(100);
        $('#dropdownuser').data('open', true);
        cnt = 0;
    });
    $('#loginbtn').click(function(){
        $('#login-register').fadeIn(600);
        window.scrollTo(0,100);
    });
    $('#closebtn').click(function(){
        $('#login-register').hide();
    });
    $('#login-register').click(function(){
        $('.modal').data('click', true);
    });
    $('#loginpanel').click(function(){
        $('.login-register-panel').data('click', true);
    });
    setInterval(() => {
        if($('.modal').data('click') && !$('.login-register-panel').data('click')){
            $('#login-register').hide();
        }
        $('.modal').data('click', false);
        $('.login-register-panel').data('click', false);
    }, 1);
    $('#nav-link2').mouseenter(function(){
        $('#dropdown1').slideDown(500);
    });
    $('#dropdown1').mouseleave(function(){
        $('#dropdown1').hide();
    });
    $('button.navbar-toggler').click(function(){
        $('#navbarSupportedContent.collapse').slideToggle(500);
        $('#dropdown1').hide();
    });
    $('body').click(function(){
        if($('#dropdownuser').data('open')){
            if(cnt >= 1){
                $('#dropdownuser').hide();
                $('#dropdownuser').data('open', false);
                cnt = 0;
            }
            cnt++;
        }
    })
});