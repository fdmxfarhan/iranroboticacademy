$(document).ready(function(){
    $('#add-payment-modal').hide();
    $('#add-payment-btn').click(function(){
        $('#add-payment-modal').fadeIn(500);
    });
    $('#payment-close').click(function(){
        $('#add-payment-modal').fadeOut(500);
    });
    
});