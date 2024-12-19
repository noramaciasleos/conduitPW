import { test, expect } from "@playwright/test"; 
import { SignupPage } from "../pages/signupPage.js";
const { faker } = require('@faker-js/faker');

let randomUsername;
let randomEmail;
let randomPassword;

test.beforeEach(async ({ page }) => {
  // Asignamos nuevos valores dentro de beforeEach
  randomUsername = faker.internet.userName();  // Cada test tendrá un nuevo username
  randomEmail = faker.internet.email();        // Cada test tendrá un nuevo email
  randomPassword = faker.internet.password();  // Cada test tendrá un nuevo password
  
  await page.goto("https://conduit.bondaracademy.com");
  await page.waitForLoadState('load');
});


// caso de prueba 1: Registro de un nuevo usuario con datos válidos
test('should register a new user', async ({ page }) => {
 
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page);  // Crear una instancia de la página de registro
  await signupPage.registerNewUser(randomUsername, randomEmail, randomPassword);   // Llamar al método de la instancia de la clase
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();
  const loggedInUser = page.locator(`a[href="/profile/${randomUsername}"]`);
  await expect(loggedInUser).toHaveText(randomUsername); 

  // validar si fue exitoso , despues del click validar algun elemento en el home page,
  // validar el user logeado con el que fue creado, URL ,

});

// caso de prueba 2: Registro de un nuevo usuario con email invalido

test('should not register with an invalid email', async ({ page }) => {
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page); 
  await signupPage.registerNewUser('nmacias55', 'invalid-emailss', 'nora1234$'); // Email inválido  // Simular un registro con correo electrónico inválido
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();
    // Verificar que se muestra un mensaje de error
    const errorMessage = page.locator('.error-messages');
    await expect(errorMessage).toContainText('invalid email address');

});


// Caso de prueba 3: nombre de usuario ya registrado
test('should not allow registration with an already used username', async ({ page }) => {
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page); 
  await signupPage.registerNewUser('nmacias', 'newemail@example.com', 'newpassword123$'); // Usando un nombre de usuario ya registrado
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();

  // Verificar que se muestra un mensaje de error
  const errorMessage = page.locator('.error-messages');
  await expect(errorMessage).toContainText('username has already been taken');
});


// caso de prueba 4: donde el email ya ha sido utilizado antes 
test('should not allow registration with an already used email address', async ({ page }) => {
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page); 
  await signupPage.registerNewUser('nmacias10', 'nmacias.leos@gmail.com', 'newpassword123$'); // Usando un nombre de usuario ya registrado
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();

  // Verificar que se muestra un mensaje de error
  const errorMessage = page.locator('.error-messages');
  await expect(errorMessage).toContainText('email has already been taken');
});


// investigar faker jss libreria que genera datos de manera aleatoria , generar email, user,etc
// antes de invocar metodo register , fakers 

// escenarios alternativos  , sigup escenario negativo, invalid emai: mensaje de error 
// post test cases funcionalidades , apoyar  chat gpt, 
// subir codigo a repo github para retro
