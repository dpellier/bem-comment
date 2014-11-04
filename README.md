Bem-comment
=========

A node module that read through some SASS files that follow BEM syntax to automatically add full name class comment above each classes.
Make the file much more readable to know the final classes generated.

## Installation

```shell
  npm install bem-content --save
```

## Usage

```shell
  node bem-content <src_file_1> <src_file_2> ...
```

## Example

```css
   /* before */
   .button {
       &__cancel {
           ....
       }

       &--active {
           ....
       }
   }
```

```css
   /* after */
   // button
   .button {
       // button__cancel
       &__cancel {
           ....
       }

       // button--active
       &--active {
           ....
       }
   }
```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
