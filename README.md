A React Catalog management System built along the lines of an eCommerce Application with cart addition features.

--Items are loaded through an API call with page parameter.
--Server side Pagination takes place in MUI Data Grid.
--Cart feature - Items can be added to cart by clicking on Add to Cart from grid line item.
--If an item is already existing in cart, the count of that specific item increases by 1. The item itself is not 
--Repeated, a key "qty" keeps getting incremented for the same item.
--Item count can be increased by using the + and - buttons in the cart as well.
--If the item count becomes 0 after decreasing, the item is removed from cart.
--Cart is persisted in local storage
--Cart gets refreshed only after checkout button is clicked.
--In grid, items can be drilled down by clicking on the View details link
--Details page is implemented
--React Router is used to navigate to details page, and the gtin key of each item is passed as url parameter along with page to get the details of the selected item to show in the details page
--Searching by search field, category dropdown and sorting by price features are included.


