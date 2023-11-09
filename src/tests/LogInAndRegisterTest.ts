import { Selector } from 'testcafe';

fixture `Shopping App Test`
    .page `http://localhost:5173/`

    test('Click Register Button to Show Register Modal', async t => {
        // Click the "Register" button
        const registerButton = Selector('#Register')
        await t.click(registerButton);
    
        // Add assertions to verify the registration modal is visible
        const registerModal = Selector('div').withText('Sign Up Now!')
        await t.expect(registerModal.visible).ok()
    });
    
    test('User Sign In', async t => {
       
        // Add assertions to verify the sign-in modal is visible
        const signInModal = Selector('div').withText('Log in')
        await t.expect(signInModal.visible).ok()
    
        // Type the email and password
        const emailInput = Selector('input[type="text"]');
        const passwordInput = Selector('input[type="password"]');
        const logInButton = Selector('button').withText('Log in');
    
        await t
            .typeText(emailInput, 'jonfreyr450@gmail.com')
            .typeText(passwordInput, 'melludolgur')
            .click(logInButton);
    });
    
    
    
