!function ($) {
	var Tooltip = function (e) {};
	Tooltip.prototype = {
		constructor: Tooltip

	,	posClass: 'top'

	,	enter: function (e) {
			this.$e = e || window.event;
			this.$target = e.target || e.srcElement;
			return this.getPos();
		}

	,	getPos: function (e) {
			var tar
			,	tarBox
			,	width
			,	height;
			e = this.$e;
			tar = this.$target;
			tarBox = tar.getBoundingClientRect();
			this.tarTop = tarBox.top;
			this.tarBottom = tarBox.bottom;
			this.tarWidth = tarBox.width;
			this.tarHeight = tarBox.height;
			return this.tip();
		}

	,	tip: function () {
			var template
			,	arrow
			,	inner;
			template = document.createElement('div');
			arrow = document.createElement('div');
			inner = document.createElement('div');
			template.className = "tooltip";
			arrow.className = "tooltip-arrow";
			inner.className= "tooltip-inner";
			template.appendChild(arrow);
			template.appendChild(inner);
			this.$tip = template;
			return this.setPos();
		}

	,	setPos: function () {
			var toTop
			,	toLeft
			,	tip
			,	tipBox
			,	twidth
			,	theight
			,	left
			,	top
			,	tar
			,	pos;
			tar = $(this.$target);
			toTop = tar.position().top;//position()Get the current coordinates of the first element in
																//the set of matched elements, relative to the offset parent.
			toLeft = tar.position().left;
			this.setContent();
			if(this.$target.parentNode.getElementsByClassName('tooltip').length < 1){
				this.$target.parentNode.appendChild(this.$tip);
				tip = document.getElementsByClassName('tooltip')[0];
				this.tipBox = tip.getBoundingClientRect();
				this.tipWidth = this.tipBox.width;
				this.tipHeight = this.tipBox.height;
				pos = this.posClass;
				if(this.tarTop >= this.tipHeight) {
					pos = "top";
				}
				else {
					pos = "bottom";
				}
				tip.className = 'tooltip ' + pos;
				switch(pos) {
					case "top":
						top = toTop - this.tipHeight -2;
						left = toLeft + this.tarWidth/2 - this.tipWidth/2;
						break;
					case "bottom":
						top = toTop + this.tarHeight + 2;
						left = toLeft + this.tarWidth/2 - this.tipWidth/2;
						break;
				}
				$('.tooltip')[0].style.top = top + "px";
				$('.tooltip')[0].style.left = left + "px";
			}
			$('.tooltip .tooltip-arrow').css('marginLeft',(this.tipWidth - 12)/2);
			return this.show();
		}

	,	setContent: function () {
			var dataset
			,	cont
			,	insCont;
			dataset = this.$target.dataset;
			cont = dataset.cont;
			insCont = document.createTextNode(cont);
			this.$tip.childNodes[1].appendChild(insCont);
		}

	,	show: function (e) {
			$('.tooltip').fadeTo('slow',0.8);
		}

	,	leave: function (e) {
			var tip;
			e = e || window.event;
			tip = this.$tip;
			return function(){
				if(tip && tip.parentNode){
					tip.parentNode.removeChild(tip);
				}
			}();
/*			return $('.tooltip').fadeOut('fast',function(){
				if(tip && tip.parentNode){
					tip.parentNode.removeChild(tip);
				}
			});
*/
		}
	}
	var tooltip = new Tooltip();
	$('.tip a').mouseenter(function (e) {
		tooltip.enter(e);
	});
	$('.tip a').mouseleave(function (e) {
		tooltip.leave();
	});
	
}(window.jQuery);