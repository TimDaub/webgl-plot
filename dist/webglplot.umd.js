!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).webglPlot={})}(this,function(t){function e(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var i=function(){this.scaleX=1,this.scaleY=1,this.offsetX=0,this.offsetY=0,this.loop=!1,this._vbuffer=0,this._prog=0,this._coord=0,this.visible=!0,this.intensity=1},o=function(t){function i(e,i){var o;return(o=t.call(this)||this).webglNumPoints=i,o.numPoints=i,o.color=e,o.xy=new Float32Array(2*o.webglNumPoints),o}e(i,t);var o=i.prototype;return o.setX=function(t,e){this.xy[2*t]=e},o.setY=function(t,e){this.xy[2*t+1]=e},o.getX=function(t){return this.xy[2*t]},o.getY=function(t){return this.xy[2*t+1]},o.lineSpaceX=function(t,e){for(var i=0;i<this.numPoints;i++)this.setX(i,t+e*i)},o.constY=function(t){for(var e=0;e<this.numPoints;e++)this.setY(e,t)},o.shiftAdd=function(t){for(var e=t.length,i=0;i<this.numPoints-e;i++)this.setY(i,this.getY(i+e));for(var o=0;o<e;o++)this.setY(o+this.numPoints-e,t[o])},i}(i),n=function(t){function i(e,i){var o;return(o=t.call(this)||this).webglNumPoints=2*i,o.numPoints=i,o.color=e,o.xy=new Float32Array(2*o.webglNumPoints),o}e(i,t);var o=i.prototype;return o.setY=function(t,e){this.xy[4*t+1]=e,this.xy[4*t+3]=e},o.getX=function(t){return this.xy[4*t]},o.getY=function(t){return this.xy[4*t+1]},o.lineSpaceX=function(t,e){for(var i=0;i<this.numPoints;i++)this.xy[4*i]=t+i*e,this.xy[4*i+2]=t+(i*e+e)},o.constY=function(t){for(var e=0;e<this.numPoints;e++)this.setY(e,t)},o.shiftAdd=function(t){for(var e=t.length,i=0;i<this.numPoints-e;i++)this.setY(i,this.getY(i+e));for(var o=0;o<e;o++)this.setY(o+this.numPoints-e,t[o])},i}(i),r=function(t){function i(e,i){var o;return(o=t.call(this)||this).webglNumPoints=i,o.numPoints=i,o.color=e,o.intenisty=1,o.xy=new Float32Array(2*o.webglNumPoints),o._vbuffer=0,o._prog=0,o._coord=0,o.visible=!0,o.offsetTheta=0,o}e(i,t);var o=i.prototype;return o.setRtheta=function(t,e,i){var o=i*Math.cos(2*Math.PI*(e+this.offsetTheta)/360),n=i*Math.sin(2*Math.PI*(e+this.offsetTheta)/360);this.setX(t,o),this.setY(t,n)},o.getTheta=function(t){return 0},o.getR=function(t){return Math.sqrt(Math.pow(this.getX(t),2)+Math.pow(this.getY(t),2))},o.setX=function(t,e){this.xy[2*t]=e},o.setY=function(t,e){this.xy[2*t+1]=e},o.getX=function(t){return this.xy[2*t]},o.getY=function(t){return this.xy[2*t+1]},i}(i),s=function(){function t(t){var e=window.devicePixelRatio||1;t.width=t.clientWidth*e,t.height=t.clientHeight*e;var i=t.getContext("webgl",{antialias:!0,transparent:!1});this.lines=[],this.webgl=i,this.gScaleX=1,this.gScaleY=1,this.gXYratio=1,this.gOffsetX=0,this.gOffsetY=0,i.enable(i.DEPTH_TEST),i.clear(i.COLOR_BUFFER_BIT||i.DEPTH_BUFFER_BIT),i.viewport(0,0,t.width,t.height)}var e=t.prototype;return e.update=function(){var t=this,e=this.webgl;this.lines.forEach(function(i){if(i.visible){e.useProgram(i._prog);var o=e.getUniformLocation(i._prog,"uscale");e.uniformMatrix2fv(o,!1,new Float32Array([i.scaleX*t.gScaleX,0,0,i.scaleY*t.gScaleY*t.gXYratio]));var n=e.getUniformLocation(i._prog,"uoffset");e.uniform2fv(n,new Float32Array([i.offsetX+t.gOffsetX,i.offsetY+t.gOffsetY]));var r=e.getUniformLocation(i._prog,"uColor");e.uniform4fv(r,[i.color.r,i.color.g,i.color.b,i.color.a]),e.bufferData(e.ARRAY_BUFFER,i.xy,e.STREAM_DRAW),e.drawArrays(i.loop?e.LINE_LOOP:e.LINE_STRIP,0,i.webglNumPoints)}})},e.clear=function(){this.webgl.clear(this.webgl.COLOR_BUFFER_BIT||this.webgl.DEPTH_BUFFER_BIT)},e.addLine=function(t){t._vbuffer=this.webgl.createBuffer(),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,t._vbuffer),this.webgl.bufferData(this.webgl.ARRAY_BUFFER,t.xy,this.webgl.STREAM_DRAW);var e=this.webgl.createShader(this.webgl.VERTEX_SHADER);this.webgl.shaderSource(e,"\n      attribute vec2 coordinates;\n      uniform mat2 uscale;\n      uniform vec2 uoffset;\n\n      void main(void) {\n         gl_Position = vec4(uscale*coordinates + uoffset, 0.0, 1.0);\n      }"),this.webgl.compileShader(e);var i=this.webgl.createShader(this.webgl.FRAGMENT_SHADER);this.webgl.shaderSource(i,"\n         precision mediump float;\n         uniform highp vec4 uColor;\n         void main(void) {\n            gl_FragColor =  uColor;\n         }"),this.webgl.compileShader(i),t._prog=this.webgl.createProgram(),this.webgl.attachShader(t._prog,e),this.webgl.attachShader(t._prog,i),this.webgl.linkProgram(t._prog),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,t._vbuffer),t._coord=this.webgl.getAttribLocation(t._prog,"coordinates"),this.webgl.vertexAttribPointer(t._coord,2,this.webgl.FLOAT,!1,0,0),this.webgl.enableVertexAttribArray(t._coord),this.lines.push(t)},e.removeLine=function(t){},e.viewport=function(t,e,i,o){this.webgl.viewport(t,e,i,o)},t}();t.ColorRGBA=function(t,e,i,o){this.r=t,this.g=e,this.b=i,this.a=o},t.WebglLine=o,t.WebglPolar=r,t.WebglStep=n,t.default=s});
//# sourceMappingURL=webglplot.umd.js.map