var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "gl-canvas" );
	gl = canvas.getContext("webgl"); // WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	// Three Vertices

	var vertices = new Float32Array(
		[ -1  ,  0,
			 0.5,  1,
			 0.8, -1	]);

	//  Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	//  Load, compile, and link shaders
	var vertShdr;
	var fragShdr;

	var vertElem = document.getElementById( "vertex-shader" );
	if ( !vertElem ) {
		alert( "Unable to load the vertex shader!" );
	  return -1;
	}
	else {
		vertShdr = gl.createShader( gl.VERTEX_SHADER );
	  gl.shaderSource( vertShdr, vertElem.text );
	  gl.compileShader( vertShdr );
	  if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
			alert( "Vertex shader failed to compile!" );
	    return -1;
		}
	}

	var fragElem = document.getElementById( "fragment-shader" );
	if ( !fragElem ) {
		alert( "Unable to load fragment shader!" );
	  return -1;
	}
	else {
		fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
	  gl.shaderSource( fragShdr, fragElem.text );
	  gl.compileShader( fragShdr );
	  if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
			alert( "Fragment shader failed to compile!" );
	    return -1;
		}
	}
	var program = gl.createProgram();
	gl.attachShader( program, vertShdr );
	gl.attachShader( program, fragShdr );
	gl.linkProgram( program );

	if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
		alert( "Shader program failed to link!" );
		return -1;
	}

	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	render();
};

function render() {
   gl.clear( gl.COLOR_BUFFER_BIT );
   gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
