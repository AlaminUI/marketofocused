'use strict';

(function () {
	function introVideo ( wrap, cb ) {
		let
			video = document.querySelector( '.video-intro-bg' ),
			frames = document.querySelectorAll( '.video-intro-frame' ),
			tId = null,
			resizeHandler = function () {
				let
					wrapRatio = wrap.clientHeight / wrap.clientWidth,
					videoRatio = video.videoHeight / video.videoWidth;

				if ( wrapRatio < videoRatio ) {
					video.style.width = wrap.clientWidth + 'px';
					video.style.height = wrap.clientWidth * videoRatio + 'px';
				} else {
					video.style.height = wrap.clientHeight + 'px';
					video.style.width = wrap.clientHeight / videoRatio + 'px';
				}
			},
			playbackHandler = function () {
				let frameDuration = video.duration / frames.length;

				frames.forEach( function ( frame, i ) {
					let
						frameProgress = 0,
						frameStart = frameDuration * i,
						frameEnd = frameStart + frameDuration;

					if ( video.currentTime < frameStart ) {
						frameProgress = 0;
					} else if ( video.currentTime >= frameStart && video.currentTime <= frameEnd ) {
						frameProgress = ( video.currentTime - frameStart ) / frameDuration;
					} else {
						frameProgress = 1;
					}

					if ( frameProgress > 0 && frameProgress < 1 ) {
						frame.classList.add( 'active');
					} else {
						frame.classList.remove( 'active');
					}

					if ( cb ) cb( frame, frameProgress );
				});
			};

		if ( video.readyState > 0 ) {
			resizeHandler();
		} else {
			video.addEventListener( 'loadedmetadata', resizeHandler );
		}

		if ( !video.paused ) {
			tId = setInterval( playbackHandler, 100 );
		}

		video.addEventListener( 'play', function () {
			tId = setInterval( playbackHandler, 100 );
		});

		video.addEventListener( 'pause', function () {
			clearInterval( tId );
		});

		window.addEventListener( 'resize', resizeHandler );
	}

	if ( typeof( window.introVideo ) === 'undefined' ) {
		window.introVideo = introVideo;
	} else {
		throw new Error( 'introVideo variable occupied' );
	}
})();
