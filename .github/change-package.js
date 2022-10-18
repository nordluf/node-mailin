'use strict';
// Do not forget to run `npm config set access public` before first local publish
// Allow read-and-write permissons for Github Actions: repo->settings->actions->general
const fs = require('fs');
const packageFile = JSON.parse(fs.readFileSync('./package.json'));
const name = process.env['GITHUB_REPOSITORY']?.split('/');
if (!name?.[1]) {
    console.log('Empty GITHUB_REPOSITORY env variable');
    process.exit(1);
}
packageFile.name = '@umpacken/' + name[1];
if (packageFile.repository?.type === 'git') {
    packageFile.repository.url = 'git://github.com/' + process.env['GITHUB_REPOSITORY'] + '.git';
}

fs.writeFileSync('./package.json', JSON.stringify(packageFile, null, 2));
