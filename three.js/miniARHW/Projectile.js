function computeProjectile(distance) {
	let L = distance.length;
	let theta = Math.asin(L*g/v/v)/2;
	//console.log (L*g/v/v)
	if (L*g/v/v > 1) {
		//$('#msg').text ('too far to hit');
	} else {
		//$('#msg').text ('reachable')
	}
	markerHiro.children[0].children[1].rotation.z = -(Math.PI/2 - theta);
	return theta;
}
function makeProjectile () {
	let cTheta = Math.cos(theta);
	let sTheta = Math.sin(theta);
	let a = -g/2/v/v/cTheta/cTheta;
	let b = v*v/g*cTheta*sTheta;
	let c = v*v/2/g*sTheta*sTheta;
	return makeParabola (a, b, c);
}

function makeParabola (a, b, c) {
	let xRange = Math.sqrt(-a*c)*2/a;
	const N = 20;
	let dx = xRange/20;

	let points = [];
	let x0 = b - xRange/2;
	for (let i = 0; i <= N; i++) {
		xi = x0 + i*dx;
		yi = a*(xi-b)*(xi-b) + c;
		points.push (new THREE.Vector3(xi,yi,0));
	}

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'line', new THREE.Float32BufferAttribute( points, 1 ) );
	let parabola = new THREE.Line (geometry, new THREE.LineDashedMaterial({color:'cyan'}));
	//parabola.computeVertexNormals();
	parabola.computeLineDistances();	// required for LineDashedMaterial
	return parabola;
  
}