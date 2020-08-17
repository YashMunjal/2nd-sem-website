var emailLabel = document.querySelector('#loginEmailLabel'), email = document.querySelector('#loginEmail'), passwordLabel = document.querySelector('#loginPasswordLabel'), password = document.querySelector('#loginPassword'), showPasswordCheck = document.querySelector('#showPasswordCheck'), showPasswordToggle = document.querySelector('#showPasswordToggle'), mySVG = document.querySelector('.svgContainer'), twoFingers = document.querySelector('.twoFingers'), armL = document.querySelector('.armL'), armR = document.querySelector('.armR'), eyeL = document.querySelector('.eyeL'), eyeR = document.querySelector('.eyeR'), nose = document.querySelector('.nose'), mouth = document.querySelector('.mouth'), mouthBG = document.querySelector('.mouthBG'), mouthSmallBG = document.querySelector('.mouthSmallBG'), mouthMediumBG = document.querySelector('.mouthMediumBG'), mouthLargeBG = document.querySelector('.mouthLargeBG'), mouthMaskPath = document.querySelector('#mouthMaskPath'), mouthOutline = document.querySelector('.mouthOutline'), tooth = document.querySelector('.tooth'), tongue = document.querySelector('.tongue'), chin = document.querySelector('.chin'), face = document.querySelector('.face'), eyebrow = document.querySelector('.eyebrow'), outerEarL = document.querySelector('.earL .outerEar'), outerEarR = document.querySelector('.earR .outerEar'), earHairL = document.querySelector('.earL .earHair'), earHairR = document.querySelector('.earR .earHair'), hair = document.querySelector('.hair'), bodyBG = document.querySelector('.bodyBGnormal'), bodyBGchanged = document.querySelector('.bodyBGchanged');
var activeElement, curEmailIndex, screenCenter, svgCoords, emailCoords, emailScrollMax, chinMin = .5, dFromC, mouthStatus = "small", blinking, eyeScale = 1, eyesCovered = false, showPasswordClicked = false;
var eyeLCoords, eyeRCoords, noseCoords, mouthCoords, eyeLAngle, eyeLX, eyeLY, eyeRAngle, eyeRX, eyeRY, noseAngle, noseX, noseY, mouthAngle, mouthX, mouthY, mouthR, chinX, chinY, chinS, faceX, faceY, faceSkew, eyebrowSkew, outerEarX, outerEarY, hairX, hairS;

function calculateFaceMove(e) {
	var 	
		carPos = email.selectionEnd,
		div = document.createElement('div'),
		span = document.createElement('span'),
		copyStyle = getComputedStyle(email),
		caretCoords = {}
	;
	if(carPos == null || carPos == 0) {
		// if browser doesn't support 'selectionEnd' property on input[type="email"], use 'value.length' property instead
		carPos = email.value.length;
	}
	[].forEach.call(copyStyle, function(prop){
		div.style[prop] = copyStyle[prop];
	});
	div.style.position = 'absolute';
	document.body.appendChild(div);
	div.textContent = email.value.substr(0, carPos);
	span.textContent = email.value.substr(carPos) || '.';
	div.appendChild(span);
	
	if(email.scrollWidth <= emailScrollMax) {
		caretCoords = getPosition(span);
		dFromC = screenCenter - (caretCoords.x + emailCoords.x);
		eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
		eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
		noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
		mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
	} else {
		eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 25);
		eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 25);
		noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 25);
		mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + emailScrollMax, emailCoords.y + 25);
	}
	
	eyeLX = Math.cos(eyeLAngle) * 20;
	eyeLY = Math.sin(eyeLAngle) * 10;
	eyeRX = Math.cos(eyeRAngle) * 20;
	eyeRY = Math.sin(eyeRAngle) * 10;
	noseX = Math.cos(noseAngle) * 23;
	noseY = Math.sin(noseAngle) * 10;
	mouthX = Math.cos(mouthAngle) * 23;
	mouthY = Math.sin(mouthAngle) * 10;
	mouthR = Math.cos(mouthAngle) * 6;
	chinX = mouthX * .8;
	chinY = mouthY * .5;
	chinS = 1 - ((dFromC * .15) / 100);
	if(chinS > 1) {
		chinS = 1 - (chinS - 1);
		if(chinS < chinMin) {
			chinS = chinMin;	
		}
	}
	faceX = mouthX * .3;
	faceY = mouthY * .4;
	faceSkew = Math.cos(mouthAngle) * 5;
	eyebrowSkew = Math.cos(mouthAngle) * 25;
	outerEarX = Math.cos(mouthAngle) * 4;
	outerEarY = Math.cos(mouthAngle) * 5;
	hairX = Math.cos(mouthAngle) * 6;
	hairS = 1.2;	
	
	TweenMax.to(eyeL, 1, {x: -eyeLX , y: -eyeLY, ease: Expo.easeOut});
	TweenMax.to(eyeR, 1, {x: -eyeRX , y: -eyeRY, ease: Expo.easeOut});
	TweenMax.to(nose, 1, {x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut});
	TweenMax.to(mouth, 1, {x: -mouthX , y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut});
	TweenMax.to(chin, 1, {x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut});
	TweenMax.to(face, 1, {x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut});
	TweenMax.to(eyebrow, 1, {x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut});
	TweenMax.to(outerEarL, 1, {x: outerEarX, y: -outerEarY, ease: Expo.easeOut});
	TweenMax.to(outerEarR, 1, {x: outerEarX, y: outerEarY, ease: Expo.easeOut});
	TweenMax.to(earHairL, 1, {x: -outerEarX, y: -outerEarY, ease: Expo.easeOut});
	TweenMax.to(earHairR, 1, {x: -outerEarX, y: outerEarY, ease: Expo.easeOut});
	TweenMax.to(hair, 1, {x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut});	
		
	document.body.removeChild(div);
};

function onEmailInput(e) {
	calculateFaceMove(e);
	var value = email.value;
	curEmailIndex = value.length;
	
	// very crude email validation to trigger effects
	if(curEmailIndex > 0) {
		if(mouthStatus == "small") {
			mouthStatus = "medium";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
			eyeScale = .85;
		}
		if(value.includes("@")) {
			mouthStatus = "large";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthLargeBG, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 3, y: -2, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {y: 2, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center"});
			eyeScale = .65;
		} else {
			mouthStatus = "medium";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthMediumBG, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
			eyeScale = .85;
		}
	} else {
		mouthStatus = "small";
		TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut});
		TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
		TweenMax.to(tongue, 1, {y: 0, ease: Expo.easeOut});
		TweenMax.to([eyeL, eyeR], 1, {scaleX: 1, scaleY: 1, ease: Expo.easeOut});
		eyeScale = 1;
	}
}

function onEmailFocus(e) {
	activeElement = "email";
	e.target.parentElement.classList.add("focusWithText");
	//stopBlinking();
	//calculateFaceMove();
	onEmailInput();
}

function onEmailBlur(e) {
	activeElement = null;
	setTimeout(function() {
		if(activeElement == "email") {
		} else {
			if(e.target.value == "") {
				e.target.parentElement.classList.remove("focusWithText");
			}
			//startBlinking();
			resetFace();
		}
	}, 100);
}

function onEmailLabelClick(e) {
	activeElement = "email";
}

function onPasswordFocus(e) {
	activeElement = "password";
	if(!eyesCovered) {
		coverEyes();
	}
}

function onPasswordBlur(e) {
	activeElement = null;
	setTimeout(function() {
		if(activeElement == "toggle" || activeElement == "password") {
		} else {
			uncoverEyes();
		}
	}, 100);
}

function onPasswordToggleFocus(e) {
	activeElement = "toggle";
	if(!eyesCovered) {
		coverEyes();
	}
}

function onPasswordToggleBlur(e) {
	activeElement = null;
	if(!showPasswordClicked) {
		setTimeout(function() {
			if(activeElement == "password" || activeElement == "toggle") {
			} else {
				uncoverEyes();
			}
		}, 100);
	}
}

function onPasswordToggleMouseDown(e) {
	showPasswordClicked = true;
}

function onPasswordToggleMouseUp(e) {
	showPasswordClicked = false;
}

function onPasswordToggleChange(e) {
	setTimeout(function() {
		// if checkbox is checked, show password
		if(e.target.checked) {
			password.type = "text";
			spreadFingers();

		// if checkbox is off, hide password
		} else {
			password.type = "password";
			closeFingers();
		}	
	}, 100);
}

function onPasswordToggleClick(e) {
	//console.log("click: " + e.target.id);
	e.target.focus();
}

function spreadFingers() {
	TweenMax.to(twoFingers, .35, {transformOrigin: "bottom left", rotation: 30, x: -9, y: -2, ease: Power2.easeInOut});
}

function closeFingers() {
	TweenMax.to(twoFingers, .35, {transformOrigin: "bottom left", rotation: 0, x: 0, y: 0, ease: Power2.easeInOut});
}

function coverEyes() {
	TweenMax.killTweensOf([armL, armR]);
	TweenMax.set([armL, armR], {visibility: "visible"});
	TweenMax.to(armL, .45, {x: -93, y: 10, rotation: 0, ease: Quad.easeOut});
	TweenMax.to(armR, .45, {x: -93, y: 10, rotation: 0, ease: Quad.easeOut, delay: .1});
	TweenMax.to(bodyBG, .45, {morphSVG: bodyBGchanged, ease: Quad.easeOut});
	eyesCovered = true;
}

function uncoverEyes() {
	TweenMax.killTweensOf([armL, armR]);
	TweenMax.to(armL, 1.35, {y: 220, ease: Quad.easeOut});
	TweenMax.to(armL, 1.35, {rotation: 105, ease: Quad.easeOut, delay: .1});
	TweenMax.to(armR, 1.35, {y: 220, ease: Quad.easeOut});
	TweenMax.to(armR, 1.35, {rotation: -105, ease: Quad.easeOut, delay: .1, onComplete: function() {
		TweenMax.set([armL, armR], {visibility: "hidden"});
	}});
	TweenMax.to(bodyBG, .45, {morphSVG: bodyBG, ease: Quad.easeOut});
	eyesCovered = false;
}

function resetFace() {
	TweenMax.to([eyeL, eyeR], 1, {x: 0, y: 0, ease: Expo.easeOut});
	TweenMax.to(nose, 1, {x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut});
	TweenMax.to(mouth, 1, {x: 0, y: 0, rotation: 0, ease: Expo.easeOut});
	TweenMax.to(chin, 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
	TweenMax.to([face, eyebrow], 1, {x: 0, y: 0, skewX: 0, ease: Expo.easeOut});
	TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
}

function startBlinking(delay) {
	if(delay) {
		delay = getRandomInt(delay);
	} else {
		delay = 1;
	}
	blinking = TweenMax.to([eyeL, eyeR], .1, {delay: delay, scaleY: 0, yoyo: true, repeat: 1, transformOrigin: "center center", onComplete: function() {
		startBlinking(12);
	}});
}

function stopBlinking() {
	blinking.kill();
	blinking = null;
	TweenMax.set([eyeL, eyeR], {scaleY: eyeScale});
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getAngle(x1, y1, x2, y2) {
	var angle = Math.atan2(y1 - y2, x1 - x2);
	return angle;
}

function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	//console.log("xPos: " + xPos + ", yPos: " + yPos);
	return {
		x: xPos,
		y: yPos
	};
}

function initialLoginForm() {
	// some measurements for the svg's elements
	svgCoords = getPosition(mySVG);
	emailCoords = getPosition(email);
	screenCenter = svgCoords.x + (mySVG.offsetWidth / 2);
	eyeLCoords = {x: svgCoords.x + 84, y: svgCoords.y + 76};
	eyeRCoords = {x: svgCoords.x + 113, y: svgCoords.y + 76};
	noseCoords = {x: svgCoords.x + 97, y: svgCoords.y + 81};
	mouthCoords = {x: svgCoords.x + 100, y: svgCoords.y + 100};
	
	// handle events for email input
	email.addEventListener('focus', onEmailFocus);
	email.addEventListener('blur', onEmailBlur);
	email.addEventListener('input', onEmailInput);
	emailLabel.addEventListener('click', onEmailLabelClick);
	
	// handle events for password input
	password.addEventListener('focus', onPasswordFocus);
	password.addEventListener('blur', onPasswordBlur);
	//passwordLabel.addEventListener('click', onPasswordLabelClick);
	
	// handle events for password checkbox
	showPasswordCheck.addEventListener('change', onPasswordToggleChange);
	showPasswordCheck.addEventListener('focus', onPasswordToggleFocus);
	showPasswordCheck.addEventListener('blur', onPasswordToggleBlur);
	showPasswordCheck.addEventListener('click', onPasswordToggleClick);
	showPasswordToggle.addEventListener('mouseup', onPasswordToggleMouseUp);
	showPasswordToggle.addEventListener('mousedown', onPasswordToggleMouseDown);
	
	// move arms to initial positions
	TweenMax.set(armL, {x: -93, y: 220, rotation: 105, transformOrigin: "top left"});
	TweenMax.set(armR, {x: -93, y: 220, rotation: -105, transformOrigin: "top right"});
	
	// set initial mouth property (fixes positioning bug)
	TweenMax.set(mouth, {transformOrigin: "center center"});
	
	// activate blinking
	startBlinking(5);
	
	// determine how far email input can go before scrolling occurs
	// will be used as the furthest point avatar will look to the right
	emailScrollMax = email.scrollWidth;
	
	// check if we're on mobile/tablet, if so then show password initially
	if(isMobileDevice()) {
		password.type = "text";
		showPasswordCheck.checked = true;
		TweenMax.set(twoFingers, {transformOrigin: "bottom left", rotation: 30, x: -9, y: -2, ease: Power2.easeInOut});
	}
	
	
}

initLoginForm();