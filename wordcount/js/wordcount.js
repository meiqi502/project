/**
 * 插件描述
 * 输入框输入字符限制
 * 
 * @author mickeylin
 * @param {[string]} [maxLength] [最大字符数]
 * @param {[boolean]} [isContinue] [输入超出最大字符数之后是否可以继续输入，true表示继续，false表示不继续]
 *
 * 实例
 * $(elem).wordCount({
 *     maxLength: 30,
 *     isContinue: true
 * })
 */

;(function ($) {
	$.fn.extend({
		wordCount: function (option) {
			var len = 0,
				lock = 0,
				words;
			option = $.extend({maxLength: 30, isContinue: true}, option || {});
			var maxLength = option.maxLength;
			var isContinue = option.isContinue;
			var self = this;
			self.each(function () {
				var $this = $(this);
				$this.append('<span class="js-tip">0/' + maxLength + '</span>');
				$this.on('compositionupdate', function (ev) {
					lock = 1;
				});
				$this.on('compositionend', function (ev) {
					words = $this.val();
					len = words.length;
					if (len < maxLength) {
						$('.js-tip').text( len + '/' + maxLength).removeClass('f-red');
					} else {
						if (isContinue) {
							$('.js-tip').text( len + '/' + maxLength).addClass('f-red');
						} else {
							$this.val(words.substr(0, 30));
							$('.js-tip').text( maxLength + '/' + maxLength).addClass('f-red');
						}
					}
					lock = 0;
				});
				$this.on('input', function (ev) {
					if (!lock) {
						words = $this.val();
						len = words.length;
						if (len < maxLength) {
							$('.js-tip').text( len + '/' + maxLength).removeClass('f-red');
						} else {
							if (isContinue) {
								$('.js-tip').text( len + '/' + maxLength).addClass('f-red');
							} else {
								$this.val(words.substr(0, 30));
								$('.js-tip').text( maxLength + '/' + maxLength).addClass('f-red');
							}
						}
					}
				});
				$this.on('onpropertychange', function (ev) {
					if (!lock) {
						words = $this.val();
						len = words.length;
						if (isContinue) {
							$('.js-tip').text( len + '/' + maxLength).addClass('f-red');
						} else {
							$this.val(words.substr(0, 30));
							$('.js-tip').text( maxLength + '/' + maxLength).addClass('f-red');
						}
					}
				});
			});
			return self;
		}
	});
}(jQuery));