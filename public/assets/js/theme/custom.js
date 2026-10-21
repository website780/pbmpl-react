// Comparison Table JS
jQuery( "#Comprison_pricingplan ul" ).on( "click", "li", function() {
    var pos = jQuery(this).index()+2;
    jQuery("tr").find('td:not(:eq(0))').hide();
    jQuery('td:nth-child('+pos+')').css('display','table-cell');
    jQuery("tr").find('th:not(:eq(0))').hide();
    jQuery('li').removeClass('active');
    jQuery(this).addClass('active');
});

// Responsive pricing table JS


// Initialize the media query
var mediaQuery = window.matchMedia('(min-width: 768px)');

// Add a listen event
mediaQuery.addListener(doSomething);

// Function to do something with the media query
function doSomething(mediaQuery) {
    if (mediaQuery.matches) {
        jQuery('.sep').attr('colspan',5);
    } else {
        jQuery('.sep').attr('colspan',2);
    }
}

// On load
doSomething(mediaQuery);

jQuery(document).ready(function(){
        jQuery("#loadMore").on("click", function(e) {
            jQuery('.comparison_plan_cont').toggleClass("tbl_height");
        });
    }
)

// Header Scroll

const header = document.getElementsByClassName('navbar');
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;



window.addEventListener("scroll", () => {
const currentScroll = window.pageYOffset;
if (currentScroll <= 0) {
jQuery(header).removeClass(scrollUp);
return;
}

if (currentScroll > lastScroll && !jQuery(header).hasClass(scrollDown)) {
// down
jQuery(header).removeClass(scrollUp);
jQuery(header).addClass(scrollDown);
} else if (currentScroll < lastScroll && jQuery(header).hasClass(scrollDown)) {
// up
jQuery(header).removeClass(scrollDown);
jQuery(header).addClass(scrollUp);
}
lastScroll = currentScroll;
});

// Replacing with HOME_URL
jQuery(document).ready(function(){
    var a = jQuery('.footer-links a');
    jQuery.each(a,function(key,val){
        var link = jQuery(val).attr('href');
        var newlink = link.replace("http://[url_link]", TechnofyAjax.HOME_URL);
        jQuery(val).attr('href',newlink);
    });
});


// Dequeue CSS Files
jQuery(document).ready(function(){
    var link = jQuery('link');
    jQuery.each(link,function(key,val){
        var link = jQuery(val).attr('id');
        if(link == 'style-css') {
            jQuery(val).remove();
        }
    });
});




// Update cart icon counter
jQuery(document).on('click', '.add_to_cart_button', function(){
    setTimeout(function(){
        var data = {
            'action': 'cart_count_retriever'
        };
        jQuery.post(wc_add_to_cart_params.ajax_url, data, function(response) {
            if(response == 1){
                jQuery('.cart-btn a').append('<span class="cart-contents-count">'+response+'</span>');
            }
            else{
                jQuery('.cart-contents-count').text(response);
            }
        });
    },1500);
});
jQuery(document).on('click', '.woocommerce .cart button.button', function(){
    setTimeout(function(){
        var data = {
            'action': 'cart_count_retriever'
        };
        jQuery.post(wc_add_to_cart_params.ajax_url, data, function(response) {
            jQuery('.cart-contents-count').text(response);
            jQuery(document.body).trigger('wc_fragment_refresh');
        });
    },1000);
});
jQuery(document).on('click', '.woocommerce a.remove', function(){
    setTimeout(function(){
        var data = {
            'action': 'cart_count_retriever'
        };
        jQuery.post(wc_add_to_cart_params.ajax_url, data, function(response) {
            jQuery('.cart-contents-count').text(response);
            jQuery(document.body).trigger('wc_fragment_refresh');
        });
    },1000);
});