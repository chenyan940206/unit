;(function($){

	$.fn.extend({
		myselect: function(){
			var that = this;

			this.hide();

			var $container = $('<div class="ui-select-container"></div>'),
				$btn = $('<button class="ui-select-btn"><span class="ui-select-status"></span><i class="ui-select-icon-down">+</i></button>'),
				$list = $('<ul class="ui-select-list"></ul>');

			$btn.appendTo($container).on('click', function(){
				$list.empty();
				var options = that.children();
				for(var i=0; i<options.length; i++){
					$list.append('<li class="ui-select-option"><span class="ui-select-text">'+options[i].innerHTML+'</span></li>');
				}
				$list.insertAfter(this).show();
			});
			$container.insertAfter(this).on('click', '.ui-select-option', function(){
				var index = $(this).index();
				that.children().removeAttr('selected').eq(index).attr('selected', 'selected');
				that.trigger('change');
				$('.ui-select-status', $btn).html( $(this).text()  );
				$list.hide();
			});

			return this;
		}
	});

})(jQuery);