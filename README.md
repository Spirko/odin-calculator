# odin-calculator
Calculator project for Fundamentals course of The Odin Project.

I wanted to implement order-of-operations and parentheses, and doing it as a state machine seemed like a pain, so I dug deep into my memory of computer science courses from 25-30 years ago, along with some newfound asynchronous and object-oriented techniques, and did the following:

* A top-down parser (basically recursive descent)
  * `expr := term { '+' term | '−' term }*`
  * `term := factor { '*' factor | '/' factor }*`
  * `factor := number | '(' expr ')'`
  * `number := { digit }*`
* An asynchronous buffer - This is because constantly switching the event listeners was cumbersome.  Plus, it's more natural in a top-down parser for the parser to ask for tokens, rather than have the data trigger the parser.  So:
  * The mouse (and ToDo keyboard) events push entries to a buffer array.
  * The parser shifts items off the buffer aray asynchronously via a promise.  If there is no data, the promise is resolved by the next item pushed to the buffer.
  * A class to encapsulate the operations, buffer, and the promise(s) awaiting fulfillment.
  
Currently on the ToDo list are:
* Make it work repeatedly
* Decimal input values
* Powers
* Keyboard shortcuts
* Scientific notation
