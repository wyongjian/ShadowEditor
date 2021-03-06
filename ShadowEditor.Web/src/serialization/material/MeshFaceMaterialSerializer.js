import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * MeshFaceMaterialSerializer
 * @author tengge / https://github.com/tengge1
 */
function MeshFaceMaterialSerializer() {
    BaseSerializer.call(this);
}

MeshFaceMaterialSerializer.prototype = Object.create(BaseSerializer.prototype);
MeshFaceMaterialSerializer.prototype.constructor = MeshFaceMaterialSerializer;

MeshFaceMaterialSerializer.prototype.toJSON = function (obj) {
    return MaterialSerializer.prototype.toJSON.call(this, obj);
};

MeshFaceMaterialSerializer.prototype.fromJSON = function (json, parent) {
    var obj = parent === undefined ? new THREE.MeshFaceMaterial() : parent;

    MaterialSerializer.prototype.fromJSON.call(this, json, obj);

    return obj;
};

export default MeshFaceMaterialSerializer;