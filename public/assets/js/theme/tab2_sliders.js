var cpu_arr2 = new Array('12Ghz','16Ghz','18Ghz','20Ghz','22Ghz','24Ghz','26Ghz','28Ghz');
var cpu_price_arr2 = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var cpu_link_arr2 = new Array('10','25','50','75','80','90','100','110');

var ram_arr2 = new Array('512','1GB','2GB','4GB','6GB','1TB','2TB','3TB');
var ram_price_arr2 = new Array('89.75','120.75','30.75','150.75','160.75','170.75','180.75','190.75','200.75');
var ram_link_arr2 = new Array('10','25','50','75','80','90','100','110','120');

var diskspace_arr2 = new Array('20GB','40GB','80GB','100GB','120 GB','140GB','512GB','1TB');
var disk_price_arr2 = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var disk_link_arr2 = new Array('10','25','50','75','80','100','120','140');

// This is what you want the default position to be



jQuery(document).ready(function(){

	var calculate2 = function(){
		// Getting Sliders Current Location
		var CpuSlider_val=(jQuery('#sliderCpu2').slider('value')-1);
		var RamSlider_val=(jQuery('#sliderRam2').slider('value')-1);
		var DiskSlider_val=(jQuery('#sliderDisk2').slider('value')-1);
		
		// Getting Price According Sliders Current Location
		var cpu_price= cpu_price_arr2[CpuSlider_val];
		var ram_price= ram_price_arr2[RamSlider_val];
		var disk_price= disk_price_arr2[DiskSlider_val];
		
		// Calculate Total of all Sliders
		var total = parseFloat(cpu_price) + parseFloat(ram_price)+ parseFloat(disk_price);
		jQuery('.slider-container #price_val2').html(total);
		
		var b_url = 'https://akdesigner.com/whmcs-templates/index.php?systpl=Technofy-Host&cmd=cart&action=add&disk='+disk_link_arr2[DiskSlider_val]+'&ram='+ram_link_arr2[RamSlider_val]+'&cpu='+cpu_link_arr2[CpuSlider_val];
		jQuery('.slider-container a#orderbtn_tab2').attr('href', b_url);
	}
	jQuery( "#sliderCpu2" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			jQuery('.slider-container #cpu_val2').html(cpu_arr2[ui.value-1]);		
			calculate2();
			
		}
	});
	
	jQuery( "#sliderRam2" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		value:0,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			jQuery('.slider-container #ram_val2').html(ram_arr2[ui.value-1]);		
			calculate2();
		}
		
	});
	
	jQuery( "#sliderDisk2" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			jQuery('.slider-container #storage_val2').html(diskspace_arr2[ui.value-1]);		
			calculate2();
		}
	});		
	
	jQuery('#sliderCpu2').slider('value', 3);
	jQuery('#sliderRam2').slider('value', 2);
	jQuery('#sliderDisk2').slider('value', 4);
	jQuery('.slider-container #cpu_val2').html(cpu_arr2[(jQuery('#sliderCpu2').slider('value')-1)]);
	jQuery('.slider-container #ram_val2').html(ram_arr2[(jQuery('#sliderRam2').slider('value')-1)]);
	jQuery('.slider-container #storage_val2').html(diskspace_arr2[(jQuery('#sliderDisk2').slider('value')-1)]);
	calculate2();
	
});