// search the CSSOM for a specific -webkit-keyframe rule
function findKeyframesRule(rule)
{
	// gather all stylesheets into an array
	var ss = document.styleSheets;
	
	// loop through the stylesheets
	for (var i = 0; i < ss.length; ++i) {
		
		// loop through all the rules
		for (var j = 0; j < ss[i].cssRules.length; ++j) {
			
			// find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
			if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
				return ss[i].cssRules[j];
		}
	}
	
	// rule not found
	return null;
}

var spinRule;

function prepareLuckyWheel() {
	spinRule = findKeyframesRule('spin');
	document.getElementById('luckyButton').addEventListener('click',spinWheel,false);
}


function spinWheel() {
	let luckyWheel = document.getElementById('wheel');
	luckyWheel.style.animationName = 'none';
	spinRule.deleteRule('0%');
	spinRule.deleteRule('100%');
	spinRule.insertRule('100% { transform: rotate(0);');
	spinRule.insertRule('100% { transform: rotate('
						+getRandomNumbers(1,0,99999,false)[0]
						+deg+');');
	luckyWheel.style.animationName = 'spin'; 
}