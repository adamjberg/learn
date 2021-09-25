## Pre-Requisties

[Hello World HTML Page](/posts/hello-world-html-page)

[Create Skeleton React App](/posts/create-skeleton-app)

## User Stories

1. As a user, I am able to add a task
2. As a user, I am able to mark a task complete
3. As a user, I am able to edit a task
4. As a user, I am able to delete a task
5. As a user, my tasks are persisted across sessions

## Design

How this looks is not a focus of this tutorial.  Instead, we'll focus on getting the necessary components to display the appropriate information. You are welcome to experiment with different styling along the way.

### Task Input

We will using a [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element to accept the body of the task.

### Submit Button

We will using a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element to trigger the creation of the task


## Initial Setup

### Use [Create React App](https://create-react-app.dev/docs/getting-started/#creating-a-typescript-app) to Generate a React Typescript Template

```
mkdir task-app
cd task-app
npx create-react-app fe --template typescript
```

## 1. As a user, I am able to add a task



