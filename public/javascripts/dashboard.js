$(document).ready(function(){
    var cnt = 0;
    $('#add-payment-modal').hide();
    $('#add-payment-btn').click(function(){
        $('#add-payment-modal').fadeIn(500);
    });
    $('#payment-close').click(function(){
        $('#add-payment-modal').fadeOut(500);
    });
    $('#slide-toggler').click(function(){
        $('#slide-modal').fadeIn(500);
        $('#sidebar').fadeIn(500);
    });
    $('#slide-modal').click(function(){
        $('#slide-modal').hide();
        $('#sidebar').hide();
    });
});