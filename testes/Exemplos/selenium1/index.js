const {Builder, By, Key, Until} = require("selenium-webdriver");

//esse código simula a abertura de um app que seria o browser Firefox, pesquisando pelo link do google e dando um envio no input com o texto
//Selenium para que o google procure

async function example(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
    await driver.findElement(By.name("q"))
}

example();