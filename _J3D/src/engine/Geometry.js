/**
    Creates a new Geometry

    @class A gemeotry is the basic class to define 3d shapes - solid and paritcles alike.
 */
J3D.Geometry = function(){
    this.renderMode = J3D.RENDER_AS_OPAQUE;
    this.arrays = [];
    this.arraysByName = {};
    this.elements = null;
    this.hasElements = false;
    this.size = 0;
}

J3D.Geometry.prototype.setTransparency = function(transparency, srcFactor, dstFactor) {
    if(!transparency) {
        this.renderMode = J3D.RENDER_AS_OPAQUE;
    } else {
        this.renderMode = J3D.RENDER_AS_TRANSPARENT;
        this.srcFactor = srcFactor;
        this.dstFactor = dstFactor;
    }
}

J3D.Geometry.prototype.addArray = function(name, data, itemSize, type, usage) {
    if(!type) type = gl.FLOAT;
    if(!usage) usage = gl.STATIC_DRAW;
    var vbo = new J3D.Geometry.Attribute(name, data, itemSize, type, usage, gl.ARRAY_BUFFER);
    this.arrays.push(vbo);
    this.arraysByName[name] = vbo;
    this.size = vbo.size;
    return vbo;
}

J3D.Geometry.prototype.replaceArray = function(vbo, data) {
    vbo.data = data;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, vbo.usage);
}

J3D.Geometry.prototype.addElement = function(data, type, usage) {
    if(!type) type = gl.UNSIGNED_SHORT;
    if(!usage) usage = gl.STATIC_DRAW;
    this.elements = new J3D.Geometry.Attribute("", data, 0, type, usage, gl.ELEMENT_ARRAY_BUFFER);
    this.hasElements = true;
}

J3D.Geometry.Attribute = function(name, data, itemSize, type, usage, target) {
    this.name = name;
    this.data = data;
    this.usage = usage;
	
    this.buffer = gl.createBuffer();
    gl.bindBuffer(target, this.buffer);
    gl.bufferData(target, data, usage);
	
    this.size = (itemSize > 0) ? data.length / itemSize : data.length;
    this.itemSize = itemSize;
    this.type = type;
}
