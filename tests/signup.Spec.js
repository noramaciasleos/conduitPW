import { test, expect } from "@playwright/test"; 
import { SignupPage } from "../pages/signupPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com");
  await page.waitForLoadState('load');
  
});
// caso de prueba 1: Registro de un nuevo usuario con datos válidos
test('should register a new user', async ({ page }) => {
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page);  // Crear una instancia de la página de registro
  await signupPage.registerNewUser('nmacias', 'nmacias.leos@gmail.com', 'nora1234$');   // Llamar al método de la instancia de la clase
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();

});

// caso de prueba 1: Registro de un nuevo usuario con email invalido

test('should not register with an invalid email', async ({ page }) => {
  const signUpButton = await page.locator('a[routerlink="/register"]');
  await signUpButton.click();
  const signupPage = new SignupPage(page); 
  await signupPage.registerNewUser('nmacias', 'invalid-email', 'nora1234$'); // Email inválido  // Simular un registro con correo electrónico inválido
  const signUpBtn = page.locator('button:has-text("Sign up")');
  await signUpBtn.click();

});

// Caso de prueba: nombre de usuario ya registrado
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


// caso de prueba email ya utilizado antes 
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


// escenarios alternativos  , sigup escenario negativo, invalid emai: mensaje de error 
// post test cases funcionalidades , apoyar  chat gpt, 
// subir codigo a repo github para retro