//Zoom5

var Zoom5 = new Object();
Zoom5.current = 0;


Zoom5.onload = function()
{
	$(document).ready(function(){
		
		var TO = false;
		$(window).resize(function(){
			if(TO !== false)
			clearTimeout(TO);
			TO = setTimeout(Zoom5.resize, 100);
		});
		
		Zoom5.parse();
		
	});
}

Zoom5.load = function()
{
	if (typeof(jQuery) == 'undefined') {
		Zoom5.getScript('//code.jquery.com/jquery-1.11.0.min.js', function() {
			Zoom5.load();
		});
		return false;
		
	} else if (typeof(_V_) !== "function") { 
		$('<link>')
		.appendTo('head')
		.attr({type : 'text/css', rel : 'stylesheet'})
		.attr('href', '//vjs.zencdn.net/4.6/video-js.css');
		
		$.ajax({
			type: "GET",
			url: "//vjs.zencdn.net/4.6/video.js",
			dataType: "script",
			cache: true
		}).done(function(){Zoom5.load();});
		return false;
		
	} else if(typeof(Modernizr) == 'undefined'){
		$.ajax({
			type: "GET",
			url: "//cdnjs.cloudflare.com/ajax/libs/modernizr/2.5.3/modernizr.min.js",
			dataType: "script",
			cache: true
		}).done(function(){Zoom5.load();});
		return false;
		
	}else { 
		
		Zoom5.onload();
	};
}

//load dependencies

Zoom5.getScript = function (url, success) {
		var script     = document.createElement('script');
		script.src = url;
		var head = document.getElementsByTagName('head')[0],
		done = false;
		
		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function() {
		
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			
			done = true;
			// callback function provided as param
			success();
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
				
			};
		};
		head.appendChild(script);
	};






Zoom5.parse = function(){
	//switch case

	//enlarge images in container

	$(".zoom").not("a, img").find("img:not(a img)").click(function(){
		objects = new Array();
		$(this).parent().find("img").each(function(i){
			if($(this).attr("href")) objects[i] = $(this).attr("href");
			//alert($(this).attr("href"));
		});
		object  = $(this).parent().find("img").index(this);
		classes = $(this).parent(".zoom").attr("class");
		if(objects.length > 0)
		{
			Zoom5.init(objects,object);
		}
	});

	//enlarge images in container

	$("img.zoom").click(function(){
		
	});

	//enlarge images in links

	$("a.zoom, .zoom a").click(function(){
		
		objects = new Array();
		$(this).parent().find("a").each(function(i){
			if($(this).attr("href")) objects[i] = $(this).attr("href");
		});
		
		object  = $(this).parent().find("a").index(this);
		classes = $(this).parent(".zoom").attr("class");
		if(objects.length > 0)
		{
			Zoom5.init(objects,object);
		}
		return false;
	});
}

Zoom5.init = function(objects,current){
	Zoom5.current = current ? current : 0;
	object = objects[current];
	Zoom5.open(object,Zoom5.current,objects.length);
}

Zoom5.open = function (object,current,count){
	zw_bg = "div.Zoom5";
	if($(zw_bg).length == 0){
		$(document.createElement("div")).addClass("Zoom5").appendTo($("body")).hide().fadeIn();
		
		$(document.createElement("div")).addClass("background").appendTo($("div.Zoom5"));
		
		$(document.createElement("div")).addClass("content_container").appendTo($("div.Zoom5 div.background"));
		$(document.createElement("div")).addClass("content").appendTo($("div.Zoom5 div.content_container"));
		
		$(document.createElement("div")).addClass("current").appendTo($("div.Zoom5 div.content_container"));
		$(document.createElement("div")).addClass("count").appendTo($("div.Zoom5 div.content_container"));
		$(document.createElement("div")).addClass("next").appendTo($("div.Zoom5 div.content_container"));
		$(document.createElement("div")).addClass("prev").appendTo($("div.Zoom5 div.content_container"));
		$(document.createElement("div")).addClass("close").appendTo($("div.Zoom5 div.content_container"));
		
		//$("div.Zoom5").click(function(){Zoom5.close()});
		$(document).keydown(function(event)
		{
			 if ( event.which == 37 ) {Zoom5.prev(objects)} //LEFT
			 if ( event.which == 39 ) {Zoom5.next(objects)} //RIGHT
			 if ( event.which == 27 ) {Zoom5.close()} //ESC
		});
		$("div.Zoom5 div.next").click(function(event){event.stopImmediatePropagation(); Zoom5.next(objects)});
		$("div.Zoom5 div.close").click(function(){Zoom5.close()});
		$("div.Zoom5 div.prev").click(function(event){event.stopImmediatePropagation(); Zoom5.prev(objects)});
		$("div.Zoom5 div.content").click(function(event){event.stopImmediatePropagation()});
		
	}
	else{
		$("div.Zoom5").fadeIn();
	}
	
	$("div.Zoom5").removeAttr("class").addClass("Zoom5").addClass(classes);
	
	
	
	content_type = Zoom5.content_type(object);
	
	if(content_type == "img")
	{
		new_object = $(document.createElement("img"));
		new_object.attr("src",object);
	}
	else if(content_type == "video")
	{
		new_object = $(document.createElement("video"));
		
		source = $(document.createElement("source"));
		$(new_object).prepend(source);
		new_object.attr('id', 'example_video_test');
		new_object.attr('class', 'video-js vjs-default-skin');
		source.attr("src",object);
		new_object.attr("controls","controls");
		new_object.attr("autoplay","autoplay");
		new_object.attr("preload","auto");
		source.attr("type","video/"+Zoom5.filetype(object));
		new_object.attr('data-setup', '{}');
		//videojs("videojs", {}, function(){
		// Player (this) is initialized and ready.
	//});
	}
	else if(content_type == "html"){
		new_object = $($(this).attr("href"));
	}
	
	
	$("div.Zoom5 div.content").empty().prepend(new_object);
	
	$("div.Zoom5 div.current").html(current+1);
	$("div.Zoom5 div.count").html(count);
	
	
	
	if (Modernizr.video.h264){
	}else if($("#example_video_test").length > 0){
		
		$("#example_video_test").attr("width","1024");
		$("#example_video_test").attr("height","576");
		Zoom5.player = _V_("example_video_test");
		
		$("#example_video_test").attr("org-width","1024");
		$("#example_video_test").attr("org-height","576");
	}
	
	new_object.resize();
	
	if(count>1)
	{
		$("div.Zoom5 div.current").show();
		$("div.Zoom5 div.count").show();
		$("div.Zoom5 div.prev").show();
		$("div.Zoom5 div.next").show();
	}
	else
	{
		$("div.Zoom5 div.current").hide();
		$("div.Zoom5 div.count").hide();
		$("div.Zoom5 div.prev").hide();
		$("div.Zoom5 div.next").hide();
	}
	
	return this;
}

Zoom5.close = function(){
	Zoom5.destroy_fallback();
	
	$("div.Zoom5").hide();
	
	$("div.Zoom5 div.content").empty();
}

Zoom5.resize = function(){
	var o = $("div.Zoom5 div.content > *");
	
	
	//Webkit Bugfix
	if(o.height() == 0 || o.width()  == 0 || o.height() == 150 && o.width() == 300 ){
		setTimeout(Zoom5.resize,1);
		return this;
	}
	
	if(o.height() <= 30 || o.width()  <= 30){
		o.removeAttr("org-height");
		o.removeAttr("org-width");
		setTimeout(Zoom5.resize,1000);
	}
	
	if(o.attr("org-height"))
	{
		o_height = o.attr("org-height");
		o_width = o.attr("org-width");
	}
	else
	{
		o.removeAttr("height");
		o.removeAttr("width");
		o.css("height","");
		o.css("width","");
		o_height = o.height();
		o_width = o.width();
		o.attr("org-height",o_height);
		o.attr("org-width",o_width);
	}
	o.css("position","absolute");
	s_height = $("div.Zoom5 div.background").height();
	s_width = $("div.Zoom5 div.background").width();
	o.css("position","relative");
	
	r_height = o_height/s_height;
	r_width  = o_width/s_width;
	
	//Upsize
	
	if(r_height < 1 && r_width < 1){
		$("div.Zoom5 div.content > *").css("height",Math.floor(o_height)+"px");
		if($("div.Zoom5 div.content > *").css("width"))
		{
			$("div.Zoom5 div.content > *").css("width",Math.floor(o_width)+"px");
		}
	}
	
	//Downsize
	if(r_height > 1 || r_width > 1){
		ratio = r_height > r_width ? r_height : r_width; 
		$("div.Zoom5 div.content > *").css("height",Math.floor(o_height/ratio)+"px");
		if($("div.Zoom5 div.content > *").css("width"))
		{
			$("div.Zoom5 div.content > *").css("width",Math.floor(o_width/ratio)+"px");
		}
	}
	
	
	
	return this;
}

Zoom5.next = function(objects){
	Zoom5.destroy_fallback();
	count = objects.length;
	Zoom5.current = ++Zoom5.current%count;
	Zoom5.init(objects,Zoom5.current);
}

Zoom5.prev = function(objects){
	Zoom5.destroy_fallback();
	count = objects.length;
	Zoom5.current = (count+(--Zoom5.current))%count;
	Zoom5.init(objects,Zoom5.current);
}

Zoom5.content_type = function(file){
	filetype = Zoom5.filetype(file);
	img = ["png","jpeg","jpg","gif"];
	video = ["mp4","webm","quicktime","ogg"];
	if(img.indexOf(filetype) >= 0) return "img";
	else if(video.indexOf(filetype) >= 0) return "video";
	else return "html";
}

Zoom5.filetype = function(file){
	
	file = file.toLowerCase().split(".").pop();
	array = new Array();
	array["mov"] = "mp4";
	if(file in array) return array[file];
	else return file;
}

Zoom5.destroy_fallback = function(){
	if(typeof Zoom5.player != 'undefined'){
		Zoom5.player.dispose();
		delete Zoom5.player;
	}
}

Zoom5.load();