# Review Questions

## What is Node.js?
-a runtime environment used to execute JS applications outside of a browser

## What is Express?
-a backend framework for the Node.js server, similar to how React worked for frontend projects

## Mention two parts of Express that you learned about this week.
1)it's lightweight and unopinionated, which means it doesn't have an excessive amount of weight and doesn't restrict programmers' design choices, but is extremely customizable with middleware and other importable packages
2)it abstracts away a lot of common tasks to make our code less verbose and more sensible

## What is Middleware?
-middleware is an array of functions that can either change, cancel, delete, or perform customer functions onto a request before getting a response back to the client

## What is a Resource?
-in RESTful API environments, resources are typically sets of data or some functions that are accessible via a unique URI. they can have multiple representations and are managed via HTTP methods

## What can the API return to help clients know if a request was successful?
-status code of 200

## How can we partition our application into sub-applications?
-Express routers to make each sub-application concerned with only one type or family of functionality

## What is express.json() and why do we need it?
-a built-in express middleware that allows us to read the JSON data from the request object's body