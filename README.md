# odin-calculator
Calculator project for Fundamentals course of The Odin Project.

I wanted to implement order-of-operations and parentheses, and doing it as a state machine seemed like a pain, so I dug deep into my memory of computer science courses from 25-30 years ago, along with some newfound asynchronous and object-oriented techniques, and tried a top-down parser.  Of course, there's an easier way, and that way is the Shunting yard algorithm.

How does it work?  Values and operators are stored on two separate stacks.  Whenever a new operator button is pressed:
* Push the current value to a value stack.
* Check the operator stack.
  * If it's empty or if there is a lower-precedence operator or same-precedence (for left-to-right), push the current operator.
  * If there is a same-precedence (for right-to-left) or higher-precedence operator, pop the operator and its two values, and push the result, then push the     current operator.

Currently on the ToDo list are:
* Switch to Shunting yard algorithm???
  This algorithm is driven by the input data, rather than driven by the parser, alleviating the need for a buffer.
* Make it work repeatedly
* Decimal input values
* Powers
* Keyboard shortcuts
* Scientific notation
