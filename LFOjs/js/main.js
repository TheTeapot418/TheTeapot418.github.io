var scene = document.getElementById('scene');
var ctx = scene.getContext('2d');
ctx.strokeStyle = "#dead00";

var LFO1Active = document.getElementById('LFO1Active');
var freq1 = document.getElementById('freq1');
var amp1 = document.getElementById('amp1');
var waveform1 = document.getElementById('waveform1');

var LFO2Active = document.getElementById('LFO2Active');
var freq2 = document.getElementById('freq2');
var amp2 = document.getElementById('amp2');
var waveform2 = document.getElementById('waveform2');

var isLFO1Active = true;
var isLFO2Active = false;

LFO1Active.addEventListener('change', function() {
	if (LFO1Active.checked) {
		isLFO1Active = true;
		lfo1.reset();
	} else {
		isLFO1Active = false;
	}
})

freq1.addEventListener('change', function() {
	lfo1.set({
		freq: freq1.value
	})
})

amp1.addEventListener('change', function() {
	lfo1.set({
		amplitude: amp1.value
	})
})

waveform1.addEventListener('change', function() {
	lfo1.set({
		waveform: waveform1.value
	})
})



LFO2Active.addEventListener('change', function() {
	if (LFO2Active.checked) {
		isLFO2Active = true;
		lfo2.reset();
		amp1.disabled = true;
	} else {
		isLFO2Active = false;
		amp1.disabled = false;
		lfo1.set({
			amplitude: amp1.value
		})
	}
})

freq2.addEventListener('change', function() {
	lfo2.set({
		freq: freq2.value
	})
})

amp2.addEventListener('change', function() {
	lfo2.set({
		amplitude: amp2.value
	})
})

waveform2.addEventListener('change', function() {
	lfo2.set({
		waveform: waveform2.value
	})
})

var data = [];
for (var i = 0; i < scene.width; i++) {
	data[i] = 0;
}

function insert(v) {
	for (var i = 0; i < data.length; i++) {
		if (i == data.length-1) {
			data[i] = v;
			break;
		}
		data[i] = data[i+1];
	}
}

var lfo1 = new LFO({
	freq: 1,
	amplitude: 200,
	waveform: "sine"
})

var lfo2 = new LFO({
	freq: 0.5,
	amplitude: 500,
	waveform: "sine"
})

function loop() {
	requestAnimationFrame(loop);
	
	var v = lfo1.value();
	if (isLFO1Active) {
		insert(v);
	} else {
		insert(0);
	}
	
	ctx.clearRect(0, 0, scene.width, scene.height);
	ctx.beginPath();
	
	ctx.moveTo(0, -data[0]+150);
	
	for (var i = 0; i < data.length; i++) {
		ctx.lineTo(i, -data[i]+150);
	}
	
	ctx.stroke();
	ctx.closePath();
	
	if (isLFO2Active) {
		var v2 = lfo2.value();
		lfo1.set({
			amplitude: v2
		})
	}
}

loop();