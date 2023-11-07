import { Selector } from 'testcafe';

fixture `Register Form Visibility Test`
    .page `http://localhost:5173npm/`;

test('Register Form Shows When Register Button is Clicked', async t => {
    const registerButton = Selector('.clickable-text').withText('Register');
    const registerForm = Selector('UserRegister'); // replace with your actual register form selector

    // Check if the register form is not visible
    await t.expect(registerForm.visible).notOk();

    // Click the register button
    await t.click(registerButton);

    // Check if the register form is visible
    await t.expect(registerForm.visible).ok();
});
