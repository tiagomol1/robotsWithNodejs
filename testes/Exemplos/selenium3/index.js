const {Builder, By, Key, Util} = require('selenium-webdriver');
const Excel = require('exceljs')

async function execute(){
    
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://127.0.0.1/!faculdade/selenium/");

    var workbook = new Excel.Workbook(); 
    workbook.xlsx.readFile('teste.xlsx')
        .then(async function() {

            var worksheet = workbook.getWorksheet();

            const rowXlsx = [];
            let columnXlsx = [];

            for (let row = 2; row <= worksheet.rowCount; row++) {
                
                for(let column = 1; column <= worksheet.columnCount; column++){
                    columnXlsx.push(worksheet.getRow(row).getCell(column).value);
                }
                rowXlsx.push(columnXlsx);
                columnXlsx = [];
            }

            for (let i = 0; i < rowXlsx.length; i++) {
                await await driver.findElement(By.id("Name")).clear();
                await driver.findElement(By.id("CollegeCourse")).clear();
                await driver.findElement(By.id("Semester")).clear();
                await driver.findElement(By.id("Name")).sendKeys(rowXlsx[i][0], Key.RETURN);
                await driver.findElement(By.id("CollegeCourse")).sendKeys(rowXlsx[i][1], Key.RETURN);
                await driver.findElement(By.id("Semester")).sendKeys(rowXlsx[i][2], Key.RETURN);
                await driver.findElement(By.tagName("button")).click();
            }

            // worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            //   console.log("Row " + rowNumber + " = " + row.values);
            // });

        });

}

execute();