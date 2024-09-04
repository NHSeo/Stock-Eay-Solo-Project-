STOCK EASY
Noah Seo

Application Overview
The application developed here is a stock level control for the restaurant; this application will help you clearly visualize how much of the required products are available. It will also provide immediate notices on the dashboard for verification when stock levels fall below a pre-set value. This way, restaurant managers can achieve more efficient inventory management while significantly reducing the amount of time required to maintain perfect management.

Application Features
1.1 Log-in (Landing page)


User can do either Log in or Register option
If the user already has an account, they can log in with the username and password.
If the user does not already have an account, they can start the process of creating a new account by registering.
After successfully logging in, the user was redirected to the dashboard page.


1.2 Register
	



Users can create a new account by entering a username and password.
Redirect to the login screen upon successful account creation.
Also, add a back button to allow users to return to the login page.
Username and password fields are required.



2. Dashboard


Users can access essential information through graphs and charts.
Display the ten most frequently used items in a graph (Using D3.js)
Show items that have fallen below a pre-set threshold (low stock)
Navigate to the add item and item list pages from the sidebar.
STRETCH GOAL: Daily Average Consumption


3. Add Item



Add a new item by entering NAME, NOTE, CATEGORY, and QUANTITY.
Recently added items are displayed in a chart at the bottom.
When you click on the category dropdown, you can choose from a list of pre-defined categories.
Based on the unit setting feature for quantity, you can determine the volume or amount for each product.
Users can conveniently apply changes at any time using the edit and delete buttons.


4. Item List



View all items in stock categorized by type.
All items can be viewed on a single page with simple mouse scrolling.
Users can conveniently apply changes at any time using the edit and delete buttons.
STRETCH GOAL: Add a search bar to search for items by NAME or NOTE.



Browsers
The application will fully support Chrome. All other browsers or versions not listed below are considered out of scope.

Browser Name
Mobile or Desktop?
Version
Chrome
Desktop
96.x


Technologies
Node
Express
React, Redux, Sagas
Passport w/ Local Authentication
Postgresql
Heroku
