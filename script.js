var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var vidId = 'q8z8oXiLXhM'

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		videoId: vidId,
		playerVars: {
			controls: 0,
			showinfo: 0,
			autoplay: 1,
			loop: 1,
			disablekb: 1,
			fs: 0,
			modestbranding: 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		event.target.playVideo();
	}
}

window.onload = function () {
	var c = document.getElementById("architect");
	var ctx = c.getContext("2d");

	//making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	//chinese characters - taken from the unicode charset
	var charset = "?????1234567890???????????ABCDEF";
	//var chinese = "??????????????????????????????????";
	//converting the string into an array of single characters
	charset = charset.split("");

	var font_size = 10;
	var columns = c.width / font_size; //number of columns for the rain
	//an array of drops - one per column
	var drops = [];
	//x below is the x coordinate
	//1 = y co-ordinate of the drop(same for every drop initially)
	for (var x = 0; x < columns; x++)
		drops[x] = 1;

	//drawing the characters
	function draw() {
		//Black BG for the canvas
		//translucent BG to show trail
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, c.width, c.height);

		ctx.fillStyle = "#0F0"; //green text
		ctx.font = font_size + "px arial";
		//looping over drops
		for (var i = 0; i < drops.length; i++) {
			//a random chinese character to print
			var text = charset[Math.floor(Math.random() * charset.length)];
			//x = i*font_size, y = value of drops[i]*font_size
			ctx.fillText(text, i * font_size, drops[i] * font_size);

			//sending the drop back to the top randomly after it has crossed the screen
			//adding a randomness to the reset to make the drops scattered on the Y axis
			if (drops[i] * font_size > c.height && Math.random() > 0.975)
				drops[i] = 0;

			//incrementing Y coordinate
			drops[i]++;
		}

	}

	setInterval(draw, 33);
};

function resize_canvas() {
	canvas = document.getElementById("architect");
	if (canvas.height < window.innerHeight) {
		canvas.height = window.innerHeight;
	}
}
