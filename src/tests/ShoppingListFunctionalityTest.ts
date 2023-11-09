import { Selector } from 'testcafe';

fixture `ShoppingList Functionality Test`
    .page `http://localhost:5173/`; 

test('Add Item with Details and Move to Pantry', async t => {
    // Log in using username and password
    const emailInput = Selector('input[type="text"]');
    const passwordInput = Selector('input[type="password"]');
    const logInButton = Selector('button').withText('Log in');

    await t
        .typeText(emailInput, 'jonfreyr450@gmail.com')
        .typeText(passwordInput, 'melludolgur')
        .click(logInButton);

    // Wait for the user to log in
    await t.wait(1000);

    // Click the "Shopping List" button
    const shoppingListButton = Selector('button').withText('Shopping List');
    await t.click(shoppingListButton);

    // Add an item with details
    const itemNameInput = Selector('input').withAttribute('placeholder', 'Enter item name')
    const itemQuantityInput = Selector('#quantity')
    const itemUnitInput = Selector('#unit')
    const itemStoreInput = Selector('#store')
    const addItemButton = Selector('#submitItem')

    await t
        .typeText(itemNameInput, 'New Item')
        .typeText(itemQuantityInput, '2')  
        .typeText(itemUnitInput, 'pcs')    
        .typeText(itemStoreInput, 'Grocery Store') 
        .click(addItemButton);

    // Check the item that triggers the "move to pantry" action
    const itemToMove = Selector('.move-to-pantry');

    // Check if the item is not in the pantry
    const pantryItem = itemToMove.parent().parent();  

    // Click the item to move it to the pantry
    await t
        .click(itemToMove)
        .expect(pantryItem.exists).ok(); 
    // Verify that the item is in the pantry

});
