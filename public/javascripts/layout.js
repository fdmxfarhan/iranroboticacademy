$(document).ready(function(){
    $('#dropdownuser').hide();
    $('#login-register').hide();
    $('#dropdown1').hide();
    $('#userbtn').click(function(){
        $('#dropdownuser').slideToggle(100);
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
});