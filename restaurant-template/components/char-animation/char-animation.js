( function () {
	function CharAnimation ( node, delay ) {
		this.node = node;
		this.delay = delay || 6;
		this.node.charAnimation = this;

		this.node.innerHTML = this.node.innerText.split(' ').map( ( word ) => {
			return `<span class="char-animation-word">${ word.split('').map( ( char ) => {
				return `<span class="char">${char}</span>`;
			}).join('') }</span>`;
		}).join(' ');

		this.chars = this.node.querySelectorAll( '.char' );
		this.chars.forEach( ( node, i ) => node.style.animationDelay = `${i * this.delay}ms` );
	}

	CharAnimation.prototype.start = function () {
		this.chars.forEach( ( node ) => node.classList.add( 'animated' ) );
	};

	CharAnimation.prototype.reset = function () {
		this.chars.forEach( ( node ) => node.classList.remove( 'animated' ) );
	};

	if ( typeof( window.CharAnimation ) === 'undefined' ) {
		window.CharAnimation = CharAnimation;
	} else {
		throw new Error( 'CharAnimation variable occupied' );
	}
})();
