import { expect } from "@playwright/test";
export class SignupPage{
constructor(page){
    this.page=page;
}

 // Método que registra un nuevo usuario usando parámetros
 async registerNewUser(username = 'nmacias', email = 'nmacias.leos@gmail.com', password = 'nora1234$') {
  const usernameInput = this.page.locator('input[placeholder="Username"]');
  await usernameInput.fill(username);
  await expect(usernameInput).toHaveValue(username); // Validación de que se llenó correctamente

  const userEmail = this.page.locator('input[placeholder="Email"]');
  await userEmail.fill(email);
  await expect(userEmail).toHaveValue(email); // Validación de email

  const userPassword = this.page.locator('input[placeholder="Password"]');
  await userPassword.fill(password);
  await expect(userPassword).toHaveValue(password); // Validación de contraseña
}
}
/* async registerNewUser() {
  
  const usernameInput = this.page.locator('input[placeholder="Username"]');
  await usernameInput.fill('nmacias');
  await expect(usernameInput).toHaveValue('nmacias')
  const userEmail = this.page.locator('input[placeholder="Email"]');
  await userEmail.fill('nmacias.leos@gmail.com');
  await expect(userEmail).toHaveValue('nmacias.leos@gmail.com')
  const userPassword = this.page.locator('input[placeholder="Password"]');
  await userPassword.fill('nora1234$');
  await expect(userPassword).toHaveValue('nora1234$')
  } */

