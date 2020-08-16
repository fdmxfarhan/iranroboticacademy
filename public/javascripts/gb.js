$(document).ready(() => {
    $('#tab2').hide();
    $('#tab3').hide();
    $('#tab4').hide();
    $('#tab5').hide();
    $('#img2').hide();
    $('#img3').hide();
    $('#img4').hide();
    $('#img5').hide();
    $('#img6').hide();
    $('#img7').hide();
    $('#img8').hide();
    var cnt = 0;
    
    $('#link1').click(() => {
        $('#tab1').slideDown(500);
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').addClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link2').click(() => {
        $('#tab1').hide();
        $('#tab2').slideDown(500);
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').addClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link3').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').slideDown(500);
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').addClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link4').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').slideDown(500);
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').addClass('active');
        $('#link5').removeClass('active');
    });
    $('#link5').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').slideDown(500);
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').addClass('active');
    });
    $('.next-btn').click(() => {
        cnt++;
        cnt%=8;
    });
    $('.prev-btn').click(() => {
        cnt--;
        if(cnt == -1) cnt = 7
    });
    setInterval(() => {
        if(cnt == 0){
            $('#img1').show();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 1){
            $('#img1').hide();
            $('#img2').show();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 2){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').show();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 3){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').show();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 4){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').show();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 5){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').show();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 6){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').show();
            $('#img8').hide();
        }
        if(cnt == 7){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').show();
        }
        
    }, 1);
});