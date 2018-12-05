
window.onload=function init() {
const canvas=document.querySelector('canvas');
const gl =canvas.getContext('webgl');

if(!gl){alert("lel");}

//alert("doin gud");

/*
vertex data
create buffer on gpu
load our vertex data into the buffer
create vertex shader
create fragment shader 
create program 
attach those shaders to program 
enable vertex attributes 
draw
*/

const vertexData=[
	0,1,0,
	1,-1,0,
	-1,-1,0,
	
];

const colorData = [
	-0.2,-0.5,1,  //color1
	0.2,1,0,
	0.5,1,1
	];


const positionBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);


const colorBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colorData),gl.STATIC_DRAW);
 
 
const vertexShader=gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader,`
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying  vec3 vColor;
void main() {
vColor=color;
gl_Position=vec4(position,1);
}
`);


gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader,`
precision mediump float;
varying  vec3 vColor;
void main (){
gl_FragColor = vec4(vColor,1);
}`);

gl.compileShader(fragmentShader);

const program=gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragmentShader);

gl.linkProgram(program);

if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
		alert( "Shader program failed to link!" );
		return -1;
	}


const PL =gl.getAttribLocation(program,`position`);//position location
gl.enableVertexAttribArray(PL);
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.vertexAttribPointer(PL,3,gl.FLOAT,false,0,0 );

const PC=gl.getAttribLocation(program,`color`);//position location
gl.enableVertexAttribArray(PC);
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.vertexAttribPointer(PC,3,gl.FLOAT,false,0,0 );

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES,0,3);


};





