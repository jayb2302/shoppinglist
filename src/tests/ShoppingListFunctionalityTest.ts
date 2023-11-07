import { Selector } from 'testcafe';

fixture `Shopping List`
    .page `http://localhost:5173/`;

test('Shopping List Component Works', async t => {
    const shoppingListWrapper = Selector('.shoppingListWrapper');
    const addItemForm = Selector('form');
    const itemNameInput = addItemForm.find('#itemName');
    const quantityInput = addItemForm.find('#quantity');
    const submitButton = addItemForm.find('button[type="submit"]');
    const itemCard = Selector('.itemCard');
    const listItem = itemCard.find('li');
    const checkbox = listItem.find('.check');
    const minusButton = listItem.find('.minus');
    const plusButton = listItem.find('.plus');
    const deleteButton = listItem.find('.delete');

    // Check if the shopping list wrapper exists
    await t.expect(shoppingListWrapper.exists).ok();

    // Check if the add item form exists
    await t.expect(addItemForm.exists).ok();

    // Check if the item name input field exists
    await t.expect(itemNameInput.exists).ok();

    // Check if the quantity input field exists
    await t.expect(quantityInput.exists).ok();

    // Check if the submit button exists
    await t.expect(submitButton.exists).ok();

    // Check if the item card exists
    await t.expect(itemCard.exists).ok();

    // Check if the list item exists
    await t.expect(listItem.exists).ok();

    // Check if the checkbox exists and is not checked
    await t.expect(checkbox.exists).ok();
    await t.expect(checkbox.checked).notOk();

    // Check if the minus button exists
    await t.expect(minusButton.exists).ok();

    // Check if the plus button exists
    await t.expect(plusButton.exists).ok();

    // Check if the delete button exists
    await t.expect(deleteButton.exists).ok();
});
