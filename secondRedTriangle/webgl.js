
window.onload=function init() {
const canvas=document.querySelector('canvas');
const gl =canvas.getContext('webgl');

if(!gl){alert("lel");}

alert("doin gud");

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

const buffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);


const vertexShader=gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader,`
attribute vec3 position;
void main() {
gl_Position=vec4(position,1);
}
`);


gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader,`
void main (){
gl_FragColor = vec4(1,0,0,1);
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
gl.vertexAttribPointer(PL,3,gl.FLOAT,false,0,0 );

gl.useProgram(program);

gl.drawArrays(gl.TRIANGLES,0,3);


};





