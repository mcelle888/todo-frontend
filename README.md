# To Do App 📝
![CI](https://github.com/<mcelle888>/<todo-frontend>/actions/workflows/ci.yml/badge.svg)

A simple react to do list application to help organise your tasks for the day!

![Screenshot](/src/assets/todo.png)

Link to backend: [Backend Repo](https://github.com/mcelle888/todo-backend)


## Key features
- Ability to create, update and delete lists and list items
- Ability to cross out completed items
- Testing for each component

## Tech stack
React | TypeScript | SCSS

## Future Additions & Improvements
- Add toast notification for user feedback
- Sort and filtering system
- Pagination
- Deployment


## Change log

01/06/2024 {Bugfix and breaking down/modularising components}
- Fixed an bug where clicking checkbox was not updating done property and showing linethough list items. 
- Modularised List Card component to smaller parts. Added ListItem and Button components.

03/06/2024 {Changes to state management and testing}
- Refactored state management in LandingPage (Item modal and List modal state is now managed together)

04/06/2024 {Added testing}
- Added testing to all components, pages and services using react testing library and vitest