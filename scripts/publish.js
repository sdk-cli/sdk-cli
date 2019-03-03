
const execa = require('execa');
const inquirer = require('inquirer');
const semver = require('semver');
const currentVersion = require('../lerna.json').version;

async function publish() {
  console.log(`当前版本号：${currentVersion}`);

  const { type } = await inquirer.prompt([{
    name: 'type',
    message: '版本变更(patch/minor/major)',
    type: 'input',
  }]);
  const version = semver.inc(currentVersion, type);

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `确认版本号 "${version}" (y/n): `,
    type: 'input',
  }]);

  if (!['y', 'yes'].includes(yes.trim().toLowerCase())) {
    console.log('终止发布');
    return;
  }

  await (
    require.resolve('lerna/cli'),
    ['publish', version, '--force-publish'],
    { stdio: 'inherit' }
  );

  await execa('git', ['add', '-A'], { stdio: 'inherit' });
  await execa('git', ['commit', '-m', `${version}`], { stdio: 'inherit' });
}

publish().catch((err) => {
  console.error(err);
  process.exit(1);
});
