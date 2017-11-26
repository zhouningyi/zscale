#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

//公用方法
function verionPlus(version) {
	var ns = version.split('.');
	var n = ns[2];
	n = parseInt(n, 10);
	if (n >= 99) process.exit('版本号超过100');
	ns[2] = n + 1;
	return ns.join('.');
}

function writeFile(pth, json) {
	fs.writeFileSync(pth, JSON.stringify(json, null, 2), 'utf8');
}

let name;
function updatePkg() {
	var pkgUrl = path.join(__dirname, './../package.json');
	var pkg = fs.readFileSync(pkgUrl);
	pkg = JSON.parse(pkg);
	name = pkg.name;

	pkg.version = verionPlus(pkg.version);
	writeFile(pkgUrl, pkg);
	console.log('package.json已更新, 开始发布...');
}

function publish(){
	cp.execSync('npm publish --registry=https://registry.npmjs.org');
	console.log('已发布npm, 开始同步cnpm...');
	cp.execSync(`cnpm sync ${name}`);
	process.exit();
}

updatePkg();
publish();

