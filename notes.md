# Testing Concepts & Notes

## Test Doubles

Test doubles are objects used in place of real dependencies during testing. They help isolate the unit under test by controlling or observing interactions with external dependencies.

### Types of Test Doubles

#### 1. Dummy Objects
- **Definition**: Objects passed around but never actually used
- **Purpose**: Fill parameter lists when the method signature requires them
- **Example**: Passing `null` or an empty object when a parameter is required but not used in the test

```typescript
// Dummy - passed but not used
test('processes order', () => {
  const dummyLogger = {} as Logger; // Never actually called
  const processor = new OrderProcessor(dummyLogger);
  // ...
});
```

#### 2. Fakes
- **Definition**: Working implementations with shortcuts (simpler than production)
- **Purpose**: Replace expensive or complex operations with lightweight alternatives
- **Example**: In-memory database instead of real database

```typescript
// Fake - working but simplified implementation
class FakeUserRepository {
  private users = new Map<string, User>();
  
  async save(user: User) {
    this.users.set(user.id, user);
  }
  
  async findById(id: string) {
    return this.users.get(id);
  }
}
```

#### 3. Stubs
- **Definition**: Provide predetermined responses to calls
- **Purpose**: Control what the dependency returns to guide test execution
- **Example**: API client that always returns specific test data

```typescript
// Stub - returns predetermined responses
const userServiceStub = {
  getUser: vi.fn().mockReturnValue({ id: '1', name: 'John' }),
  updateUser: vi.fn().mockResolvedValue(true)
};
```

#### 4. Spies
- **Definition**: Record information about how they were called
- **Purpose**: Verify interactions while still allowing real functionality
- **Example**: Wrapping a real object to observe method calls

```typescript
// Spy - records calls but delegates to real implementation
test('logs error when validation fails', () => {
  const loggerSpy = vi.spyOn(console, 'error');
  
  validateInput(''); // Should trigger error logging
  
  expect(loggerSpy).toHaveBeenCalledWith('Validation failed');
});
```

#### 5. Mocks
- **Definition**: Pre-programmed with expectations of calls they will receive
- **Purpose**: Verify behavior and interactions, often fail tests if expectations aren't met
- **Example**: Expecting specific method calls with specific parameters

```typescript
// Mock - has expectations about how it should be used
test('sends welcome email to new users', () => {
  const emailMock = vi.fn();
  const userService = new UserService(emailMock);
  
  userService.createUser({ email: 'test@example.com', name: 'John' });
  
  // Mock expectation - must be called exactly once with these args
  expect(emailMock).toHaveBeenCalledOnce();
  expect(emailMock).toHaveBeenCalledWith('test@example.com', 'Welcome!');
});
```

## Key Differences

| Type | Returns Data | Records Calls | Has Expectations | Real Implementation |
|------|-------------|---------------|------------------|-------------------|
| **Dummy** | No | No | No | No |
| **Fake** | Yes | No | No | Simplified |
| **Stub** | Yes | No | No | No |
| **Spy** | Yes | Yes | No | Yes (wrapped) |
| **Mock** | Yes | Yes | Yes | No |

## When to Use Each

- **Dummy**: When you need to pass something but it won't be used
- **Fake**: When you need working functionality but want to avoid complexity/cost
- **Stub**: When you need to control return values to test specific scenarios
- **Spy**: When you want to observe interactions with real objects
- **Mock**: When the interaction itself is what you're testing

## Common Testing Patterns

### State vs Behavior Testing

**State Testing**: Verify the system is in the correct state after operations
```typescript
test('user is created with correct properties', () => {
  const user = new User('John', 'john@example.com');
  expect(user.name).toBe('John');
  expect(user.email).toBe('john@example.com');
});
```

**Behavior Testing**: Verify the correct interactions happened
```typescript
test('sends notification when user is created', () => {
  const notificationSpy = vi.fn();
  const userService = new UserService(notificationSpy);
  
  userService.createUser({ name: 'John' });
  
  expect(notificationSpy).toHaveBeenCalled();
});
```

### Test Structure (AAA Pattern)

- **Arrange**: Set up test data and dependencies
- **Act**: Execute the behavior being tested
- **Assert**: Verify the expected outcome

```typescript
test('calculates total with tax', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];
  const taxRate = 0.1;
  
  // Act
  const total = calculateTotal(items, taxRate);
  
  // Assert
  expect(total).toBe(33); // (10 + 20) * 1.1
});
``` 