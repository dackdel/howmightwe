var url = 'https://spreadsheets.google.com/feeds/list/1oufAyrxTexnBnvBIpNoI3uMVgEK0SUpczOwBVm-hhv4/od6/public/values?alt=json'
var request = new XMLHttpRequest()
var json;

var artifacts = []
var methods = []
var locations = []

var artifactString = null
var methodString = null
var locationString = null

var artifactButton = document.querySelector('.artifact.prefix');
var artifactLabel = document.querySelector('.artifact.question');

var methodButton = document.querySelector('.method.prefix');
var methodLabel = document.querySelector('.method.question');

var locationButton = document.querySelector('.location.prefix');
var locationLabel = document.querySelector('.location.question');

// var copyButton = document.querySelector('#copy');

function jsonLoaded() {
	if (request.readyState === 4 && request.status === 200) {
		json = JSON.parse(request.responseText)

		for (var i = 0; i < json.feed.entry.length; i++) {
			let entry = json.feed.entry[i]
			if (entry['gsx$artifacts']) {
				artifacts.push(entry['gsx$artifacts']['$t'])
			}

			if (entry['gsx$method']) {
				methods.push(entry['gsx$method']['$t'])
			}

			if (entry['gsx$location']) {
				locations.push(entry['gsx$location']['$t'])
			}
		}

		generate()
		artifactButton.addEventListener('click', changeArtifact);
		methodButton.addEventListener('click', changeMethod);
		locationButton.addEventListener('click', changeLocation);
	}
}

function changeArtifact() {
	var randomIndex = Math.floor(Math.random() * artifacts.length)
	if (artifactString !== artifacts[randomIndex]) {
		artifactString = artifacts[randomIndex]
		artifactLabel.textContent = artifactString
	}else {
		changeArtifact()
	}
}

function changeMethod() {
	var randomIndex = Math.floor(Math.random() * methods.length)
	if (methodString !== methods[randomIndex]) {
		methodString = methods[randomIndex]
		methodLabel.textContent = methodString
	}else {
		changeMethod()
	}
}

function changeLocation() {
	var randomIndex = Math.floor(Math.random() * locations.length)
	if (locationString !== locations[randomIndex]) {
		locationString = locations[randomIndex]
		locationLabel.textContent = locationString
	}else {
		// changeLocation()
	}
}

function generate() {
	changeArtifact()
	changeMethod()
	changeLocation()
}

function copyText() {
	var text = document.querySelector('#sentence').textContent
	document.querySelector('#text-selector').textContent = text

	window.getSelection().removeAllRanges();
	var range = document.createRange();  
	range.selectNode(document.querySelector('#text-selector'));  
	window.getSelection().addRange(range);
	var test = document.execCommand('copy')
	window.getSelection().removeAllRanges();
}

function keydown(event) {
	if (event.metaKey && event.keyCode === 67) {
		copyText()
	}
}


function init() {
	window.addEventListener('keydown', keydown);
	request.addEventListener('readystatechange', jsonLoaded);
	request.open('get', url, true)
	request.send()

	// copyButton.addEventListener('click', copyText);

}


window.addEventListener('load', init);