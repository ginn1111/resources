# SOLID

## Single Responsibility Principle (SRP)
- A component just responsible for one thing.
- Ex: a hook use responsible for a specific thing.

## Open/Closed Principle (OCP)
- Components should be open for extension but closed for modification.
- This principle make the code base do not change frequently. (do not test a tested component again and again)

- Ex: Instead of modification tested hook (add new function). We create a new hook, which uses the previous hook and add new function in there.

## Liskov Substitution Principle (LSP)
- The derived class must not change the behavior of the base class. 

- Ex: I has a Bike class like this 

```ts
class Bike {
  turnOnEngine() {
    // do something
  }

  run() {
    // do something
  }
}

class Bicyle extends Bike {
  turnOnEngine() {
    // this class do not have engine -> violate the LSP
  }
} 
```

## Interface Segregation Principle (ISP)

- We should create multiple interfaces with specific functionality, instead of a large interface.

## Dependency Inversion Principle (DIP)

- The high-level module do not depend on the lower-level module. Both depend on the abstraction.

Ex: 

```ts
class Email {
  send() {
    // do something
  }
}

class Notifier {
  mail: Gmail  // depend on instance of Gmail

  // rest code...
}

// =========================
interface Notifier {
  send()
}

class Notifier {
  notifier: Notifier // depend on abstraction
  // rest code...
}

class Email extends Notifier {
  send() {
    // do something with Email method
  }
}

class SMS extends Notifier {
  send() {
    // do something with SMS method
  }
}


const emailNotifier = new Notifier(new Email())
const smsNotifier = new Notifier(new SMS())
```
```

