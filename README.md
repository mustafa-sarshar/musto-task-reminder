# Musto Task Reminder

- A web-application for saving and documenting daily tasks.

## OBJECTIVES

- Using Angular framework, build a web-application that works smoothly with Firebase Real Time database and is responsive on all devices.

## VISIT THE WEBSITE [😎🔗](https://mustafa-sarshar.github.io/musto-task-reminder/#/welcome)

### SCREENSHOTS

<table width="100%" style="overflow:auto">
  <tr>
    <th width="25%" style="text-align:center;">Welcome Page</th>
    <th width="25%" style="text-align:center;">Sign up</th>
    <th width="25%" style="text-align:center;">Login</th>
    <th width="25%" style="text-align:center;">Tasks Page</th>
  </tr>
  <tr>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-1.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-2.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-3.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-4.png?raw=true"/></td>
  </tr>

</table>

<table width="100%" style="overflow:auto">
  <tr>
    <th width="25%" style="text-align:center;">Task Reminders</th>
    <th width="25%" style="text-align:center;">View Options</th>
    <th width="25%" style="text-align:center;">Add Task</th>
    <th width="25%" style="text-align:center;">Edit Task</th>
     
  </tr>
  <tr>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-5.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-6.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-7.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-8.png?raw=true"/></td>
  </tr>
  
</table>

<table width="100%" style="overflow:auto">
  <tr>    
    <th width="25%" style="text-align:center;">Task Features</th>
    <th width="25%" style="text-align:center;">Task Details</th>
    <th width="25%" style="text-align:center;">User Profile</th>
    <th width="25%" style="text-align:center;">Menu Options</th>
  </tr>
  <tr>    
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-9.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-10.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-11.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-task-reminder/blob/main/docs/assets/images/musto-task-reminder-12.png?raw=true"/></td>
  </tr>
  
</table>

## THE 5 W’s

- Who — A person who would like to securely save and document daily tasks and never forget them by getting informed via task reminders.
- What — A single-page, responsive web application built using Angular, with routing and several interface views.
- When — Users will be able to use the app whenever they want to save, read, edit and check their daily tasks.
- Where — The app will be hosted online. It is responsive and can therefore be used anywhere and on any device, giving all users an equal experience.
- Why — The more our life gets professional, the more vital it is to complete our daily tasks on time as well as documenting them for further evaluations. The app will demonstrate my Angular skills and my ability to create straightforward documentation for other developers and employers.

## USER STORIES

- As a user, I want to be able to add, edit, update and delete my daily tasks.
- As a user, I want to be able to set reminders for each task to get notified about the task based on its deadline.
- As a user, I want to be able to create a profile so I can save my own daily tasks.
- As a user, I want to have access to my data in all platforms and devices.
- As a user, I want to install the app on my devices (mobile, tablet, computer, ...), without the need to open the browser each time I want to use it.

## KEY FEATURES

- The app should display a welcome view where users will be able to either log in to the system or register themselves by creating a user account.
- Once authenticated, the user should be able to see all the tasks saved as well as use all the features of the app.
- Upon clicking on a particular task, user should be able to select any of the options, including completing the task, getting its details, editing it or deleting it.
- Each task may include useful information as follows:
  - Title
  - Group
  - Deadline
  - Reminder
  - Description
  - Completion
  - Some useful links for more help, such as a link to a website, or to an image, or a video, or even a voice file available online.

## TECHNICAL REQUIREMENTS

- The application must be written in Angular (version 9 or later).
- The application must contain user registration and login forms.
- The development requires the latest version of Node.js and npm package.
- The user interface of the application must be designed using Angular Material.
- To store the data on cloud, Google Firebase Real Time Database will be used via RESFul APIs.
- To make the app perform fast and efficiently, it must follow the lazy loading approach and divided into multiple modules.
- To serve versatile users worldwide, it must be compatible with different languages, such as English and German.
- To make it accessible globally, it must be hosted on a web-sever, such as GitHub Pages.
- The application's codebase must contain comments using Typedoc.
- The project must contain technical documentation using JSDoc.

## TECHNOLOGIES USED

- Angular +15
- Angular Material Design
- Ngx-Translate
- Google Firebase Real Time Database
- Google Firebase Authentication (Email/Password)
- Progressive Web Application (PWA)

## DEVELOPMENT SERVER

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## CODE SCAFFOLDING

- During **development** phase as well as prior to **production** phase, you may set the environmental variables based on your **Firebase Read Time Database configurations**. Please create a **.env.ts** file in the root directory and add the following environment variables into it as follow:

  ```
  export const FIREBASE_URL = "BACKEND_URL_OF_YOUR_FIREBASE_REAL_TIME_DATABASE";
  export const FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY_FOR_YOUR_APP";
  export const FIREBASE_COLLECTION_USERS = "USER_COLLECTION_NAME_IN_FIREBASE_REAL_TIME_DATABASE";
  ```

- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## BUILD

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## RUNNING UNIT TESTS

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## RUNNING END-TO-END TESTS

- Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## FURTHER HELP

- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## MATERIALS:

- App icons are downloaded from [flaticon.com](https://www.flaticon.com/free-icons/task) created by Freepik - Flaticon (accessed on 03.27.2023)
- Welcome page animation is downloaded from [giphy.com](https://giphy.com/gifs/love-i-you-chippythedog-AIPvjOCQ6Gvg9Ll6uR) created by Chippy The Dog (accessed on 03.27.2023)
