//version = '0.1.0';

(function ( $ ) {
	"use strict";

	//$.fn.exists = function(){return this.length>0;}

	$.groupbox = function(options)
	{
		return $('.groupbox').groupbox('init', options);
	}

	$.fn.groupbox = function(command, options)
	{
		if(typeof command !== 'string')
			[command, options] = ['init', command];
		return this.each(function()
		{
			var self = $(this);
			if(command === 'toggle')
				toggle(self, options);
			else if(command === 'unfold' || command === 'open')
				open(self, options);
			else if(command === 'fold')
				fold(self, options);
			else if(command === 'init')
				init(self, options);
		});
	};


	function init(elem, options)
	{
		var content = elem.children('.groupbox-content');
		if( ! content.length )
		{
			content = elem.wrap('<div class="groupbox-container"></div>');
			content.addClass('groupbox-content');
			elem = content.parent();
			if( ! content.attr('data-groupbox-mode') && content.hasClass('horizontal'))
				elem.attr('data-groupbox-mode', 'horizontal');
			if( ! content.attr('data-groupbox-state') && content.hasClass('folded'))
				elem.attr('data-groupbox-state', 'folded');
			for(let a of ['data-groupbox-title', 'data-groupbox-mode'])
				elem.attr(a, content.attr(a));
		}
		var header = elem.children('.groupbox-header');
		if( ! header.length )
		{
			let title = elem.attr('data-groupbox-title') || '';
			header = $('<div class="groupbox-header">' + title + '</div>');
			elem.prepend(header);
		}
		if( ! elem.attr('data-groupbox-mode'))
			elem.attr('data-groupbox-mode', 'vertical');
		header.on('click', function() { $(this).parent().groupbox('toggle'); });
		if(elem.attr('data-groupbox-state') == 'folded')
			fold(elem, options);
	};

	function toggle(elem, options)
	{
		if(elem.data('groupbox-fold'))
			open(elem, options);
		else
			fold(elem, options);
	};

	function open(elem, options)
	{
		var content = elem.children('.groupbox-content');
		elem.attr('data-groupbox-state', 'opened');
		elem.data('groupbox-fold', false);
		var h = elem.data('groupbox-orig-height');
		content.show();
		if(h)
			elem.height(h);
		else
			elem.css('height', '');
	}

	function fold(elem, options)
	{
		var header = elem.children('.groupbox-header');
		var content = elem.children('.groupbox-content');
		elem.attr('data-groupbox-state', 'folded');
		elem.data('groupbox-fold', true);
		elem.data('groupbox-orig-height', elem.attr('height'));
		elem.height(Math.max(elem.height(), header.width()));
		content.hide();
		////elem.css('min-height', header.width());
	}

	//$(function () { alert(42); });

}( jQuery ));
