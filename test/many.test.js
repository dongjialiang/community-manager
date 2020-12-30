const { chromium, webkit, firefox } = require('playwright');

const manager_lists = [
  { name: '管理商铺活动信息', link: 'businessActivity' },
  { name: '管理投诉', link: 'complaint' },
  { name: '管理生活服务', link: 'lifeService' },
  { name: '管理停车信息', link: 'park' },
  { name: '管理物业通知', link: 'propertyNotice' },
  { name: '管理出入登记信息', link: 'register' },
  { name: '管理报修', link: 'repair' },
  { name: '管理用户信息', link: 'usermanager' },
];

const testCommon = async (page, manager_list) => {
  // Click //a[normalize-space(.)='${manager_list.name}']
  await Promise.all([
    page.waitForNavigation(
      /*{ url: `http://localhost:3000/#/${manager_list.link}` }*/),
    page.click(`//a[normalize-space(.)='${manager_list.name}']`)
  ]);

  // Click text="创建一行新数据"
  await page.click('text=" +"');

  // Click //div[@class="list-body"][3]/span
  await page.click('//div[@class="list-body"][3]/span');
  await page.fill('//div[@class="list-body"][3]/span', '123');

  // Click text="创建"
  await page.click('//div[@class="list-body"][last()]/span');
  await page.click('//button[normalize-space(.)=\'确定\']');

  // Click //div[@class="list-body"][3]/span
  await page.click('//div[@class="list-body"][3]/span');
  await page.fill('//div[@class="list-body"][3]/span', '456');

  // Click text="更新"
  await page.click('//div[@class="list-body"][last()]/span');
  await page.click('//button[normalize-space(.)=\'确定\']');

  // Click text="全选"
  await page.click('//div[@class="tool"]/input[@type="checkbox"]');

  // Click text="取消全选"
  await page.click('//div[@class="tool"]/input[@type="checkbox"]');

  // Click text="选中"
  await page.click('//div[@class="list-body"][1]/input[@type="checkbox"]');

  // Click text="删除"
  await page.click('text=" 🗑"');
  await page.click('//button[normalize-space(.)=\'确定\']');

  return;
};

const adminTest = async (page, adminCommand, randomStr) => {
  // Click input[placeholder="输入管理员账户名"]
  await page.click('input[placeholder="输入管理员账户名"]');

  // Fill input[placeholder="输入管理员账户名"]
  await page.fill('input[placeholder="输入管理员账户名"]', randomStr);

  // Click input[placeholder="输入密码"]
  await page.click('input[placeholder="输入密码"]');

  // Fill input[placeholder="输入密码"]
  await page.fill('input[placeholder="输入密码"]', 'll');

  // Press Tab
  await page.press('input[placeholder="输入密码"]', 'Tab');

  // Fill input[placeholder="输入地址"]
  await page.fill('input[placeholder="输入地址"]', 'zs');

  // Click //button[normalize-space(.)='中山大学新华学院广东省东莞市麻涌镇沿江西一路7号']
  await page.click('//button[normalize-space(.)=\'中山大学新华学院广东省东莞市麻涌镇沿江西一路7号\']');

  // Click text="${adminCommand}"
  await page.click(`text="${adminCommand}"`);

  // Click //button[normalize-space(.)='确定']
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/#/home' }*/),
    page.click('//button[normalize-space(.)=\'确定\']')
  ]);

  return;
};

const manyTest = async (browserName) => {
  const browser = await { chromium, webkit, firefox }[browserName].launch({
    headless: false
  });

  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click text=/.*注册.*/
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/#/login' }*/),
    page.click('text=/.*注册.*/')
  ]);

  const randomStr = Math.random().toString(36).slice(-6);

  await adminTest(page, '注册', randomStr);

  // Go to http://localhost:3000/#/login
  await page.goto('http://localhost:3000/#/login');

  await adminTest(page, '登录', randomStr);

  for (const manager_list of manager_lists) {
    await testCommon(page, manager_list);
  }

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
};
const browsersName = ['chromium', 'webkit', 'firefox'];
(async () => {
  for (const browserName of browsersName) {
    await manyTest(browserName);
  }
})();
