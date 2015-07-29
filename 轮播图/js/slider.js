function Slider(props){
	this.opts = {
		order:'asc',
		duration:2000,
	};

	$.extend(this.opts,props);

	this.container = null;
	this.sliderContainer = null;
	this.sliderImg = null;
	this.sliderImgLi = null;
	this.sliderBtn  = null;
	this.width = this.opts.width;
	this.height = this.opts.height;
	this.duration = this.opts.duration;
	this.index = 0;
	this.timer = null;
}

Slider.prototype.init=function(){
		this.container = $(this.opts.container),
		this.sliderContainer = $('.slider-container',this.container),
		this.sliderImg = $('.slider-img',this.container),
		this.sliderImgLi = $('li',this.sliderImg),
		this.sliderBtn = $('.slider-btn',this.container);

	this.sliderContainer.css('width',this.width);
	this.sliderContainer.css('height',this.height);

	this.sliderImg.append(this.sliderImgLi.eq(0).clone())
			.width((this.sliderImgLi.length + 1 ) * this.width);
	var sBtns = '';
	for(var i=0;i<this.sliderImgLi.length;i++){
		sBtns += '<li>'+(i+1)+'</li>'
	}
	this.sliderBtn.append(sBtns);

	this.sliderBtnLi = $('li',this.sliderBtn);
	this.sliderBtnLi.eq(0).addClass('active');

	var that = this;

	this.sliderBtn.on('mouseover','li',function(){
		that.index = $(this).index();
		that.switchImg(that.index);
	});

	this.sliderContainer.hover(function(){
		that.pause();
	},function(){
		that.start();
	});

	this.start();
};

Slider.prototype.switchImg=function(){
	for(var i=0;i<this.sliderBtnLi.length;i++){
					this.sliderBtnLi.eq(i).removeClass('active');
	}
	this.sliderBtnLi.eq(this.index==4?0:this.index).addClass('active');
	this.sliderImg.animate({
		left:(this.opts=='desc'?this.width*this.index:-this.width*this.index)
	},500);
};

Slider.prototype.start=function(){
	var that = this;
	this.timer=setInterval(function(){	
			if(that.opts.order == 'asc'&&that.index == that.sliderImgLi.length){	
				that.sliderImg.css({left:0});
				that.index = 0;
			}else if(that.opts.order == 'desc'&&that.index==0){
				that.sliderImg.css('left',-that.width*that.sliderImgLi.length);
				that.index = that.sliderImgLi.length;
			}
			if(that.opts.order == 'asc'){
				that.index++;
			}else{
				that.index--;
			}
			// $sliderBtnLi.eq(index).addClass('active').siblings().removeClass('active');
			that.switchImg(that.index);
		},that.duration);
};

Slider.prototype.pause=function(){
	clearInterval(this.timer);
};