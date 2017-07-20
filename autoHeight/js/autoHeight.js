

;(function ($) {
	$.fn.extend({
		autoHeight: function (option) {
			option = $.extend({maxHeight: 40, minHeight: 20}, option)
			var minHeight = option.minHeight;
			var maxHeight = option.maxHeight;
			var self = this;
			self.each(function () {
				var $this = $(this);
				var value = $this.val();
				minHeight != undefined && $this.height(minHeight);
				$this.on('input onpropertychange', function (ev) {
					if (maxHeight && $this[0].scrollHeight > maxHeight) {
						$this.outerHeight(maxHeight);
						$this.css('overflow-y', 'auto');
						console.log($this.outerHeight());
					} else {
						$this.outerHeight($this[0].scrollHeight);
						$this.css('overflow-y', 'hidden');
						console.log($this.outerHeight());
					}
				});
			});
		}
	});
})(jQuery);