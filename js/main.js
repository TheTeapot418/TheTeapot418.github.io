var thumbnails = [];

//LFO thumbnail

LFO_loop = function() {
	if (LFO_thumb.running) {
		requestAnimationFrame(LFO_loop);
	}

	LFO_thumb.ctx.clearRect(0, 0, LFO_thumb.scene.width, LFO_thumb.scene.height);
	LFO_thumb.ctx.beginPath();

	var v = LFO_thumb.lfo.value();
	LFO_thumb.insert(v);
	LFO_thumb.ctx.moveTo(0, -LFO_thumb.values[0] + 50);

	for (var i = 1; i < LFO_thumb.values.length; i++) {
		LFO_thumb.ctx.lineTo(i, -LFO_thumb.values[i]+50);
	}

	LFO_thumb.ctx.stroke();
	LFO_thumb.ctx.closePath();
}

var LFO_thumb = {
	running: false,
	scene: {},
	ctx: {},
	values: [],
	lfo: {},
	insert: function(v) {
		for (var i = 0; i < this.values.length; i++) {
			if (i == this.values.length-1) {
				this.values[i] = v;
				break;
			}
			this.values[i] = this.values[i+1];
		}
	},
	
	start: function() {
		this.running = true;
		var scene = document.getElementById('scene1');
		var ctx = scene.getContext('2d');
		ctx.strokeStyle = "#dead00";
		var values = [];
		for (var i = 0; i < scene.width; i++) {
			values[i] = 0;
		}
		var lfo = new LFO({
			freq: 0.7,
			amplitude: 80,
			waveform: "sine"
		})
		
		this.scene = scene;
		this.ctx = ctx,
		this.values = values;
		this.lfo = lfo;
		
		LFO_loop();
		
	},
	
	stop: function() {
		this.running = false;
	}
		
}

thumbnails.push(LFO_thumb);










window.addEventListener('load', function() {
	for (var i = 0; i < thumbnails.length; i++) {
		thumbnails[i].start();
	}
})