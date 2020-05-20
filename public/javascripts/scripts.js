$(document).ready(function(){
    var curentslide = 1;
    var $slider = $('#slider');
    var $slidercont = $slider.find('.slides');
    var $slides = $slidercont.find('.slide');
    var slide = 1;
    // $('#wellcome').hide().fadeIn(4000).delay(2000).fadeOut(4000);
    $('#toplogo').hide().delay(8000).fadeIn(5000);
    $('#slide2').hide();
    $('#slide3').hide();
    
    $('#prev').click(function(){
        if(slide === 1)
            {
                $('#slide1').show();
                $('#slide2').hide();
                $('#slide3').hide();
                slide = 3;
            }
        else if(slide === 2)
            {
                $('#slide1').hide();
                $('#slide2').show();
                $('#slide3').hide();
                slide = 1
            }
        else if(slide === 3)
            {
                $('#slide1').hide();
                $('#slide2').hide();
                $('#slide3').show();
                slide = 2;
            }
    });
    $('#next').click(function(){
        if(slide === 1)
            {
                $('#slide1').show();
                $('#slide2').hide();
                $('#slide3').hide();
                slide = 2;
            }
        else if(slide === 2)
            {
                $('#slide1').hide();
                $('#slide2').show();
                $('#slide3').hide();
                slide = 3;
            }
        else if(slide === 3)
            {
                $('#slide1').hide();
                $('#slide2').hide();
                $('#slide3').show();
                slide = 1;
            }
    });
    $('#dot1').click(function(){
        $('#slide1').show();
        $('#slide2').hide();
        $('#slide3').hide();
        slide = 2;
    });
    $('#dot2').click(function(){
        $('#slide1').hide();
        $('#slide2').show();
        $('#slide3').hide();
        slide = 2;
    });
    $('#dot3').click(function(){
        $('#slide1').hide();
        $('#slide2').hide();
        $('#slide3').show();
        slide = 2;
    });
    
    setInterval(() => {
        $('#slider .slides').animate({'margin-left': '-=800px'}, 5000, function(){
            curentslide++;
            if (curentslide === $slides.length){
                $('#slider .slides').css('margin-left', 0);
                curentslide = 1;
            }
        });
    }, 5000);

    setInterval(() => {
        if(slide === 1)
            {
                $('#slide1').show();
                $('#slide2').hide();
                $('#slide3').hide();
                slide = 2;
            }
        else if(slide === 2)
            {
                $('#slide1').hide();
                $('#slide2').show();
                $('#slide3').hide();
                slide = 3
            }
        else if(slide === 3)
            {
                $('#slide1').hide();
                $('#slide2').hide();
                $('#slide3').show();
                slide = 1;
            }
    }, 5000);

});