'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		},

		createrandomdata: function(n, range, rand, date_term) {
		  if (range == null) range = [0, 100];
		  if (rand == null) rand = 1 / 20;

		  var d = new Date(), interval = 0;
		  if(date_term == 'h'){
		  	d = new Date(d.getTime() - 1000 * 60 * 60); 
		  	interval = 1000 * 60 * 60 / n;
		  }
		  else if(date_term == 'd'){
		  	d = new Date(d.getTime() - 1000 * 60 * 60 * 24); 
		  	interval = 1000 * 60 * 60 * 24 / n;	
		  }
		  else if(date_term == 'w'){
		  	d = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 7); 
		  	interval = 1000 * 60 * 60 * 24 * 7 / n;	
		  }
		  else if(date_term == 'm'){
		  	d = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 30); 
		  	interval = 1000 * 60 * 60 * 24 * 30 / n;	
		  }
		  else if(date_term == 'y'){
		  	d = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 365); 
		  	interval = 1000 * 60 * 60 * 24 * 365 / n;	
		  }
		  

		  var num = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
		  var num2 = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
		  var num3 = num;
		  
		  var data = [];
		  var rgen = d3.randomNormal(0, (range[1] - range[0]) * rand);
		  for (var i = 0; i < n; i++) {
		    data.push({
		      date: d,
		      negative: num,
		      netural: num2,
		      positive: num3,		      
		    });
		    d = new Date(d.getTime() + interval);
		    num = num + rgen();
		    num3 = num + rgen() / 3;
		    num = Math.min(Math.max(num, range[0]), range[1]);
		    num2 = num2 + rgen();
		    num2 = Math.min(Math.max(num2, range[0]), range[1]);
		  }
		  return data;
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));

