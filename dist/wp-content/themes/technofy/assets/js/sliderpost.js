$(document).ready(function() {
    
    if(typeof screen_to_show_tablet !== typeof undefined){
        $(".product-owl #owl-product").owlCarousel({
            items: 5,
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
                    items: screen_to_show_tablet,
                    // nav: true,
                    loop: false
                    },
                1024: {
                    items: screen_to_show_laptop,
                    // nav: true,
                    loop: false
                    },
                1199: {
                items: screen_to_show,
                // nav: true,
                loop: false
                },
                    
                },
        });
    }
    else{
        $(".product-owl #owl-product").owlCarousel({
            items: 5,
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
                    items: 3,
                    // nav: true,
                    loop: false
                    },
                1199: {
                items: 5,
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