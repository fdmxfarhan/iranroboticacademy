$(document).ready(function(){
    $('a#nav-link1').removeClass('active');
    $('a#nav-link2').addClass('active');
    $('a#nav-link3').removeClass('active');
    $('a#nav-link4').removeClass('active');
    $('a#nav-link5').removeClass('active');
    $('a#nav-link6').removeClass('active');
    $('a#nav-link7').removeClass('active');
    $('a#nav-link8').removeClass('active');
    $('a#nav-link9').removeClass('active');
    $('.imgpad').hide().fadeIn(1000);
    $('#sign-in-modal').hide();
    $('#sign-in').click(function(){
        $('#sign-in-modal').fadeIn(500);
    });
    $('#signinclose').click(()=>{
        $('#sign-in-modal').fadeOut(500);
    });
});