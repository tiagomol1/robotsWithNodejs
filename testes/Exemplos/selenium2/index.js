const {Builder, By, Key, Util} = require('selenium-webdriver');


async function example(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://127.0.0.1/!faculdade/selenium/");
    await driver.findElement(By.id("Name")).sendKeys("Pedro Demczuk", Key.RETURN);
    await driver.findElement(By.id("CollegeCourse")).sendKeys("P&D", Key.RETURN);
    await driver.findElement(By.id("Semester")).sendKeys("2º", Key.RETURN);
    await driver.findElement(By.tagName("button")).click();
}

example();

//está é a regra