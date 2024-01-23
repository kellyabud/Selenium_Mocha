const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');


describe('Testes de Login', () => {
  it('Deve logar quando usar credenciais válidas', async () => {
    //Abrir o navegador 
    const driver = await new Builder().forBrowser('firefox').build();
    //Acesso o site
    await driver.get('https://edu.ultima.school/lgn/');
    //Digito o usuário
    await driver.findElement(By.id('user_login')).sendKeys('email');
    //Digito a senha
    await driver.findElement(By.id('user_pass')).sendKeys('senha');
    //Clico no botão conecte-se
    await driver.findElement(By.id('wp-submit')).click();
    //Valido que entrei
    const element = await driver.findElement(By.xpath('//*[@id="post-10"]/header/h1[contains(text(), "Meus cursos")]'));
    assert.ok(await element.isDisplayed(), 'O elemento "Meus cursos" não está visível.');
    //Fechar janela
    await driver.quit();
  });
  });

    
it('Deve falhar ao tentar fazer login com campos em branco', async () => {
  // Abrir o navegador
  const driver = await new Builder().forBrowser('firefox').build();
  await driver.get('https://edu.ultima.school/lgn/');

  // Deixe os campos de e-mail e senha em branco
  await driver.findElement(By.id('user_login')).sendKeys('');
  await driver.findElement(By.id('user_pass')).sendKeys('');

  // Clicar no botão conecte-se
  await driver.findElement(By.id('wp-submit')).click();

  // Aguarde até que uma mensagem de erro seja exibida 
  await driver.findElement(By.id('login_error'));

  // Verificar se a mensagem de erro está presente 
  const mensagemErro = await driver.findElement(By.id('login_error')).getText();
  assert.strictEqual(mensagemErro, 'Error: The username field is empty.\nError: The password field is empty.');
  //Fechar janela
  await driver.quit();


});

it('Deve falhar ao tentar fazer login com credenciais inválidas', async () => {
  // Abrir o navegador
  const driver = await new Builder().forBrowser('firefox').build();
  await driver.get('https://edu.ultima.school/lgn/');

  // Insira um e-mail inválido 
  await driver.findElement(By.id('user_login')).sendKeys('emailinválido');
  await driver.findElement(By.id('user_pass')).sendKeys('senha');

  // Clicar no botão conecte-se
  await driver.findElement(By.id('wp-submit')).click();

  // Aguarde até que uma mensagem de erro seja exibida 
  await driver.findElement(By.id('login_error'));

  // Verificar se a mensagem de erro está presente 
  const mensagemErro = await driver.findElement(By.id('login_error')).getText();
  assert.strictEqual(mensagemErro, 'Unknown email address. Check again or try your username.');
  //Fechar janela
  await driver.quit();

});





