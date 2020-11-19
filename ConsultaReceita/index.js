const {Builder, By, Key, until} = require('selenium-webdriver');
const robot = require('robotjs');
const fs = require('fs');

async function start(){

    robot.setKeyboardDelay(800);
    robot.setMouseDelay(800)
    let driver = await new Builder().forBrowser("firefox").build();
    const data = new Date();
    const mesNumber = data.getMonth();
    const mesText = ["Nenhum", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


    await driver.get('https://nfem.joinville.sc.gov.br/login.aspx');
    await driver.findElement(By.id('conteudo_botao_usuario_autorizado')).click();
    await driver.findElement(By.id('conteudo_documento')).sendKeys('CPF', Key.RETURN);
    await driver.findElement(By.id('conteudo_documento_usuario')).sendKeys('CNPJ', Key.RETURN);
    await driver.findElement(By.id('conteudo_senha')).sendKeys('PASS', Key.RETURN);
    await driver.findElement(By.id('conteudo_botao')).click();
    await driver.get('https://nfem.joinville.sc.gov.br/contador/selecionar_cliente.aspx');

    var opcoes = await driver.executeScript(buscaOpcoes);  
    var listaopcoes = opcoes;
    var quantOpcoes = opcoes.length;

    for(i = 0; await i <= quantOpcoes; i++){
        
        try{
            await driver.findElement(By.className('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left ui-autocomplete-input')).clear();
            await driver.findElement(By.className('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left ui-autocomplete-input')).sendKeys(listaopcoes[i]);
            
            await robot.keyTap('down');
            await robot.keyTap('enter');    

            await driver.sleep(3000);

            await driver.findElement(By.id('conteudo_botao_confirmacao')).click();
        
            await driver.get('https://nfem.joinville.sc.gov.br/relatorios/retorno_xml_nfe_recebidas.aspx?relatorio_cliente=1');

            await driver.findElement(By.id('conteudo_filtro_mes')).click();

            await robot.typeString(mesText[mesNumber]);
            await robot.keyTap('enter');
            
            await driver.findElement(By.id('conteudo_Button1')).click();
            
            await driver.sleep(2000);
            if(i == 0){
                await robot.keyTap('down');        
            }
            await robot.keyTap('enter');

            await driver.sleep(3000);
            //await SucessoEnvio(listaopcoes[0]);

            await driver.get('https://nfem.joinville.sc.gov.br/contador/selecionar_cliente.aspx');


        }
        catch(err){
            console.log(`Deu erro no cliente ${listaopcoes[i]}`);
            i--;
            
            await driver.get('https://nfem.joinville.sc.gov.br/contador/selecionar_cliente.aspx');
        }
    }
}


async function buscaOpcoes(){
    opc = await document.getElementById('conteudo_clientes_comboautocomplete').children;

    var listaOpc = [];    

    for(i = 1; i < opc.length-2; i++){  
        listaOpc.push(opc[i].text);
    }
    
    return await listaOpc;
}

start();