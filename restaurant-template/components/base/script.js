'use strict';

// Global components list
let components = window.components = {};

components.mdi = {
	selector: '[class*="mdi-"]',
	styles: './components/mdi/mdi.css'
};

components.pageReveal = {
	selector: '.page',
	init: function( nodes ) {
		window.addEventListener( 'components:ready', function () {
			window.dispatchEvent( new Event( 'resize' ) );
			document.documentElement.classList.add( 'components-ready' );

			nodes.forEach( function( node ) {
				setTimeout( function() {
					node.classList.add( 'page-revealed' );
				}, 500 );
			});
		}, { once: true } );
	}
};

components.grid = {
	selector: '.container, .container-fluid, .row, [class*="col-"]',
	styles: './components/grid/grid.css'
};

components.section = {
	selector: 'section',
	styles: './components/section/section.css'
};

components.footer = {
	selector: 'footer',
	styles: './components/footer/footer.css'
};

components.button = {
	selector: '.btn',
	styles: './components/button/button.css'
};

components.link = {
	selector: '.link',
	styles: './components/link/link.css'
};

components.image = {
	selector: 'img',
	styles: './components/image/image.css'
};

components.figure = {
	selector: '.figure',
	styles: './components/figure/figure.css'
};

components.position = {
	selector: '[class*="position-"], [class*="fixed-"], [class*="sticky-"]',
	styles: './components/position/position.css'
};

components.googleFonts = {
	selector: 'html',
	styles: 'https://fonts.googleapis.com/css?family=Cabin+Condensed:400,500,700%7CLibre+Caslon+Text:400&display=swap'
};

components.accordion = {
	selector: '.accordion',
	styles: [
		'./components/accordion/accordion.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.collage = {
	selector: '.collage',
	styles: './components/collage/collage.css'
};

components.intenseIcons = {
	selector: '[class*="int-"]',
	styles: './components/intense-icons/intense-icons.css'
};

components.currentDevice = {
	selector: 'html',
	script: './components/current-device/current-device.min.js'
};

components.rdNavbar = {
	selector: '.rd-navbar',
	styles: [
		'./components/rd-navbar/rd-navbar.css'
	],
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/util/util.min.js',
		'./components/current-device/current-device.min.js',
		'./components/rd-navbar/rd-navbar.min.js'
	],
	dependencies: 'currentDevice',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				backButtons = node.querySelectorAll( '.navbar-navigation-back-btn' ),
				params = parseJSON( node.getAttribute( 'data-rd-navbar' ) ),
				defaults = {
					stickUpClone: false,
					anchorNav: false,
					autoHeight: false,
					stickUpOffset: '1px',
					responsive: {
						0: {
							layout: 'rd-navbar-fixed',
							deviceLayout: 'rd-navbar-fixed',
							focusOnHover: 'ontouchstart' in window,
							stickUp: false
						},
						992: {
							layout: 'rd-navbar-fixed',
							deviceLayout: 'rd-navbar-fixed',
							focusOnHover: 'ontouchstart' in window,
							stickUp: false
						},
						1200: {
							layout: 'rd-navbar-fullwidth',
							deviceLayout: 'rd-navbar-fullwidth',
							stickUp: true,
							stickUpOffset: '1px',
							autoHeight: true
						}
					},
					callbacks: {
						onStuck: function () {
							document.documentElement.classList.add( 'rd-navbar-stuck' );
						},
						onUnstuck: function () {
							document.documentElement.classList.remove( 'rd-navbar-stuck' );
						},
						onDropdownToggle: function () {
							if ( this.classList.contains( 'opened' ) ) {
								this.parentElement.classList.add( 'overlaid' );
							} else {
								this.parentElement.classList.remove( 'overlaid' );
							}
						},
						onDropdownClose: function () {
							this.parentElement.classList.remove( 'overlaid' );
						}
					}
				},
				xMode = {
					stickUpClone: false,
					anchorNav: false,
					responsive: {
						0: {
							stickUp: false,
							stickUpClone: false
						},
						992: {
							stickUp: false,
							stickUpClone: false
						},
						1200: {
							stickUp: false,
							stickUpClone: false
						}
					},
					callbacks: {
						onDropdownOver: function () { return false; }
					}
				},
				navbar = node.RDNavbar = new RDNavbar( node, Util.merge( window.xMode ? [ defaults, params, xMode ] : [ defaults, params ] ) );

			if ( backButtons.length ) {
				backButtons.forEach( function ( btn ) {
					btn.addEventListener( 'click', function () {
						let
							submenu = this.closest( '.rd-navbar-submenu' ),
							parentmenu = submenu.parentElement;

						navbar.dropdownToggle.call( submenu, navbar );
					});
				});
			}
		})
	}
};

components.multiswitch = {
	selector: '[data-multi-switch]',
	styles: './components/multiswitch/multiswitch.css',
	script: [
		'./components/current-device/current-device.min.js',
		'./components/multiswitch/multiswitch.js'
	],
	dependencies: 'rdNavbar',
	init: function ( nodes ) {
		let click = device.ios() ? 'touchstart' : 'click';

		nodes.forEach( function ( node ) {
			if ( node.tagName === 'A' ) {
				node.addEventListener( click, function ( event ) {
					event.preventDefault();
				});
			}

			MultiSwitch( Object.assign( {
				node: node,
				event: click,
			}, parseJSON( node.getAttribute( 'data-multi-switch' ) ) ) );
		});
	}
};

components.multiswitchTargetSlide = {
	selector: '[data-multi-switch-target-slide]',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/multiswitch/multiswitch.js'
	],
	dependencies: 'multiswitch',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let params = parseJSON( node.getAttribute( 'data-multi-switch-target-slide' ) );

			if ( !node.multiSwitchTarget.groups.active.state ) node.style.display = 'none';

			node.addEventListener( 'switch:active', function () {
				let $this = $( this );

				if ( this.multiSwitchTarget.groups.active.state ) {
					$this.stop().slideDown( params );
				} else {
					$this.stop().slideUp( params );
				}
			});
		});
	}
};

components.animate = {
	selector: '[data-animate]',
	styles: './components/animate/animate.css',
	script: './components/current-device/current-device.min.js',
	init: function ( nodes ) {
		if ( window.xMode || device.macos() ) {
			nodes.forEach( function ( node ) {
				let params = parseJSON( node.getAttribute( 'data-animate' ) );
				node.classList.add( 'animated', params.class );
			});
		} else {
			let observer = new IntersectionObserver( function ( entries, observer ) {
				entries.forEach( function ( entry ) {
					let
						node = entry.target,
						params = parseJSON( node.getAttribute( 'data-animate' ) );

					if ( params.delay ) node.style.animationDelay = params.delay;
					if ( params.duration ) node.style.animationDuration = params.duration;

					if ( entry.isIntersecting ) {
						node.classList.add( 'animated', params.class );
						observer.unobserve( node );
					}
				});
			}, {
				threshold: .5
			});

			nodes.forEach( function ( node ) {
				observer.observe( node );
			});
		}
	}
};

components.lightgallery = {
	selector: '[data-lightgallery]',
	styles: './components/lightgallery/lightgallery.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/lightgallery/lightgallery.min.js',
		'./components/util/util.min.js'
	],
	init: function ( nodes ) {
		if ( !window.xMode ) {
			nodes.forEach( function ( node ) {
				node = $( node );
				let
					defaults = {
						thumbnail: true,
						selector: '.lightgallery-item',
						youtubePlayerParams: {
							modestbranding: 1,
							showinfo: 0,
							rel: 0,
							controls: 0
						},
						vimeoPlayerParams: {
							byline : 0,
							portrait : 0,
							color : 'A90707'
						}
					},
					options = parseJSON( node.attr( 'data-lightgallery' ) );

				node.lightGallery( Util.merge( [ defaults, options ] ) );
			});
		}
	}
};

components.video = {
	selector: '.video',
	styles: './components/video/video.css'
};

components.logo = {
	selector: '.logo',
	styles: './components/logo/logo.css'
};

components.thumbnailUpShadow = {
	selector: '.thumbnail-up-shadow',
	styles: './components/thumbnail-up-shadow/thumbnail-up-shadow.css'
};

components.blogArticle = {
	selector: '.blog-article',
	styles: './components/blog-article/blog-article.css'
};

components.post = {
	selector: '.post',
	styles: './components/post/post.css'
};

components.postMeta = {
	selector: '.post-meta',
	styles: './components/post-meta/post-meta.css'
};

components.postShare = {
	selector: '.post-share',
	styles: './components/post-share/post-share.css'
};

components.intro = {
	selector: '.intro',
	styles: './components/intro/intro.css'
};

components.rights = {
	selector: '.rights',
	styles: './components/rights/rights.css'
};

components.gmap = {
	selector: '.google-map',
		styles: './components/google-map/google-map.css',
		script: [
		'//maps.google.com/maps/api/js?key=AIzaSyAja8QNd9DOcDkSXw81zPUnhEOzWGeBbnc&libraries=geometry,places&v=quarterly',
		'./components/google-map/google-map.js'
	],
	init: function ( nodes ) {
		let promises = [];

		nodes.forEach( function ( node ) {
			let
				defaults = {
					node: node,
					center: { lat: 0, lng: 0 },
					zoom: 4,
				},
				params = parseJSON( node.getAttribute( 'data-settings' ) ),
				sMap = new SimpleGoogleMap( Object.assign( defaults, params ) );

			promises.push( new Promise ( function ( resolve ) {
				sMap.map.addListener( 'tilesloaded', resolve );
			}) );
		});

		return Promise.all( promises );
	}
};

components.gmapMarkerInfo = {
	selector: '[data-marker-info]',
	dependencies: 'gmap',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			node.addEventListener( 'click', function () {
				let
					params = parseJSON( this.getAttribute( 'data-marker-info' ) ),
					map = document.querySelector( params.mapId ).simpleGoogleMap;

				map.showInfo( params.markerId );
			});
		});
	}
};

components.parallax = {
	selector: '.parallax',
	styles: './components/parallax/parallax.css',
	script: './components/parallax/parallax.js',
	dependencies: 'currentDevice',
	init: function ( nodes ) {
		if ( !window.xMode ) {
			parallax({
				useBgPos: false,
				useTransform3d: false,
				oninit: function ( layer ) {
					setTimeout( function () { layer.resize(); }, 500 );
				}
			});
		}
	}
};

components.hashTab = {
	selector: '.hash-tab-wrap',
	styles: './components/hash-tab/hash-tab.css',
	init: function ( nodes ) {
		nodes.forEach( function ( wrap ) {
			let onHashchange = function () {
				let
					matches = location.hash.match( /tab=([^&]+)/i ),
					value = decodeURIComponent( matches && matches[1] ),
					activeTab = wrap.querySelector( '.hash-tab.active' ),
					newTab = wrap.querySelector( '.hash-tab[href*="#tab='+ value +'"]' ),
					activePage = wrap.querySelector( '.hash-page.active' ),
					newPage = wrap.querySelector( '.hash-page[data-page="'+ value +'"]' );

				if ( newTab ) {
					if ( activeTab ) activeTab.classList.remove( 'active' );
					if ( activePage ) activePage.classList.remove( 'active' );
					newTab.classList.add( 'active' );
					newPage.classList.add( 'active' );
				}
			};

			onHashchange();
			window.addEventListener( 'hashchange', onHashchange );
		});
	}
};

components.menuItem = {
	selector: '.menu-item',
	styles: './components/menu-item/menu-item.css'
};

components.pageHeading = {
	selector: '.page-heading-section',
	styles: './components/page-heading/page-heading.css'
};

components.list = {
	selector: '.list',
	styles: [
		'./components/list/list.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.toTop = {
	selector: 'html',
	styles: './components/to-top/to-top.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function () {
		if ( !window.xMode ) {
			let node = document.createElement( 'div' );
			node.className = 'to-top int-arrow-up';
			document.body.appendChild( node );

			node.addEventListener( 'mousedown', function () {
				this.classList.add( 'active' );

				$( 'html, body' ).stop().animate( { scrollTop:0 }, 500, 'swing', (function () {
					this.classList.remove( 'active' );
				}).bind( this ));
			});

			document.addEventListener( 'scroll', function () {
				if ( window.scrollY > window.innerHeight ) node.classList.add( 'show' );
				else node.classList.remove( 'show' );
			});
		}
	}
};

components.charAnimation = {
	selector: '.char-animation',
	script: './components/char-animation/char-animation.js',
	styles: './components/char-animation/char-animation.css',
	init: function ( nodes ) {
		let observer = new IntersectionObserver( function ( entries, observer ) {
			entries.forEach( function ( entry ) {
				let node = entry.target;

				if ( entry.isIntersecting ) {
					node.charAnimation.start();
					observer.unobserve( node );
				}
			});
		}, {
			threshold: .2
		});

		nodes.forEach( function ( node ) {
			if ( !window.xMode ) {
				new CharAnimation( node );
				observer.observe( node );
			}
		});
	}
};

components.videoIntro = {
	selector: '.video-intro',
	styles: './components/video-intro/video-intro.css',
	script: './components/video-intro/video-intro.js',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			introVideo( node, function ( frame, progress ) {
				frame.style.opacity = -4 * Math.pow( progress - .5, 2) + 1;
				frame.style.transform = 'scale('+ ( 0.5 + progress ) +')';
			});
		});
	}
};


/**
 * Wrapper to eliminate json errors
 * @param {string} str - JSON string
 * @returns {object} - parsed or empty object
 */
function parseJSON ( str ) {
	try {
		if ( str )  return JSON.parse( str );
		else return {};
	} catch ( error ) {
		return {};
	}
}


// Main
window.addEventListener( 'load', function () {
	new ZemezCore({
		components: components,
		observeDOM: window.xMode
	});
});
