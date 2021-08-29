function scroll(scrollTo, scrollDuration) {
    if (typeof scrollTo === 'string') {
      	var scrollToObj = document.querySelector(scrollTo);
	    if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
    	    scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
      	} else {
        	throw 'error: No element found with the selector "' + scrollTo + '"';
      	}
	} else if (typeof scrollTo !== 'number') {
      	scrollTo = 0;
    }
    var anchorHeightAdjust = -30;
    if (scrollTo > anchorHeightAdjust) {
      	scrollTo = scrollTo - anchorHeightAdjust;
    }
    if ( typeof scrollDuration !== 'number' || scrollDuration < 0 ) {
      	scrollDuration = 1000;
    }
    var cosParameter = (window.pageYOffset - scrollTo) / 2,
      	scrollCount = 0,
      	oldTimestamp = window.performance.now();
    function step(newTimestamp) {
      	var tsDiff = newTimestamp - oldTimestamp;
      	if (tsDiff > 100) {
        	tsDiff = 30;
      	}
     	scrollCount += Math.PI / (scrollDuration / tsDiff);
      	if (scrollCount >= Math.PI) {
        	return;
      	}
      	var moveStep = Math.round(scrollTo + cosParameter + cosParameter * Math.cos(scrollCount));
      	window.scrollTo(0, moveStep);
      	oldTimestamp = newTimestamp;
      	window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
window.onload = function() {
    document.getElementsByTagName('html')[0].className = 'js active';
    if (typeof SVGRect != "undefined") {
      	document.getElementsByTagName('html')[0].className += ' svg';
    }
    setTimeout(function() {
      	window.scrollTo(0, 0);
      	setTimeout(function() { 
        	if(document.getElementsByTagName('html')[0].scrollTop == 0) {
          		scroll('#last',1000); 
        	}
      	},1000);
    }, 500);
}