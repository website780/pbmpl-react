$(document).ready(function() {

    if(typeof screen_to_show_tablet3 !== typeof undefined){
        $(".blog-owl1 #owl-service3").owlCarousel({
            items: 4,
            loop: true,
            nav: false,
            autoplay: true,
            rewind: true,
            responsive: {
                0: {
                    items: screen_to_show_mobile3,
                    nav: false
                    },
                768: {
                    items: screen_to_show_tablet3,
                    // nav: true,
                    loop: false
                    },
                1024: {
                    items: screen_to_show_laptop3,
                    // nav: true,
                    loop: false
                    },
                1199: {
                items: screen_to_show3,
                // nav: true,
                loop: false
                },
                    
                },
        });
    }
    else{
        $(".blog-owl1 #owl-service3").owlCarousel({
            items: 4,
            loop: true,
            nav: false,
            autoplay: false,
            rewind: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                    },
                768: {
                    items: 2,
                    // nav: true,
                    loop: false
                    },
                1024: {
                    items: 4,
                    // nav: true,
                    loop: false
                    },
                1199: {
                items: 4,
                // nav: true,
                loop: false
                },
                    
                },
        });
    }    
     
 });


 $("#elementor-control-default-c3939").change(function () {
    var end = this.value;
    console.log("tegdgtdfhgsjhdf");
})
 ;