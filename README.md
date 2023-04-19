# Chingu Board - Voyage 43 - Team 45 💪

 Chingu Board was built by four software engineers over a six-week Chingu Voyage.

# Badges
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/chingu-voyages/v43-tier3-team-45?style=plastic)
![GitHub repo size](https://img.shields.io/github/repo-size/chingu-voyages/v43-tier3-team-45?style=plastic)

# Description
Chingu Board is an task and bug tracker that helps users create, track and fix issues efficiently.  

The app consists of :

###### Login page  
* User can login or sign up. 

###### Profile pages  
* User can view their account settings: avatar, name, email 
* User can edit their avatar or name on the update profile page. 

###### Navbar 
* Team dropdown displays team avatars associated with a particular project. 
* Logout button
* A clickable user avatar which directs the user to their profile page.

###### Sidebar
* Displays project names

###### Kanban Board
* Visually displays issues at various stages of the agile process. The kanban uses cards to represent issue items and columns to represent each stage of the process

###### Edit or Create Issue Modal
* Displays in front of and deactivates all other page content. 
* Edit issue type, add or remove team members, add issue description, add comments. 

# Technologies used in the project
* Java Spring Boot 
* React
* TailwindCSS
* Redux
* MongoDB
* AWS S3 bucket for hosting images
* Backend is deployed on Raleway
* Frontend is deployed on Vercel

# File Structure
```
main
│   README.md                               # Explains this respository
|   LICENSE.md                              # Details of this project's MIT license
│   .gitignore                              # Files to be ignored by git
|   .python-version                         # Python version used to build the project
|   .env                                    # Environmental variables for API key and URL
|   requirements.txt                        # Requirements for Python dependencies to install using pip
│
└───app
    │   __init__.py                         # The Python init file that runs upon executing "flask run"
    │
    └───static
    |   └───fonts
    |   |   |   flux-regular.otf            # The same font style used by Python (free to use)
    |   |
    |   └───img
    |   |   |   (all images for website)    # Various images used in the project
    |   |
    |   └───scripts
    |   |   |   maps.js                     # Script that loads the Google Maps API into the DO
    |   |
    |   └───styles
    |   |   |   main.css                   # Custom styles for all pages
    └───templates
        |___ globaComps 
              | footer.html                # Displays copyright and social links
              | nav.html                   # Responsive navigation menu
        |___ landingPage
              | aboutMe.html               # Template that displays about me information
              | education.html             # Template that displays education section  
              | hero.html                  # Template that hero section  
        |   experience.html                # Template for the experience page
        |   hobbies.html                   # Template for that displays the hobbies page
        |   locations.html                 # Template that displays the Google Map
        |   pageOverlay.html               # Template for overlays in other pages
        |   landingPage.html               # Template that displays the landingPage
 ```       

## Installation
Using the command line, clone the repo on your machine
```
git clone <remote url copied from Github>
cd <repo directory name>

Make sure you have node and npm installed
``

## Usage

Create a .env file using the example.env template (make a copy using the variables inside of the template)

Start flask development server
```bash
$ export FLASK_ENV=development
$ flask run
```

You should get a response like this in the terminal:
```
❯ flask run
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

You'll now be able to access the website at `localhost:5000` or `127.0.0.1:5000` in the browser! 

*Note: The portfolio site will only work on your local machine while you have it running inside of your terminal. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# Visuals
![LoginPage-1](https://user-images.githubusercontent.com/20806815/232965690-39d5be04-6d8f-4e4e-a7f7-7193ec669e30.png"-<img width="1728" alt="login page")

![HobbiesPage-2](https://user-images.githubusercontent.com/20806815/192337012-5314882b-5066-4e2d-b4d7-27b222833d10.png)
![WortExperiencePage-3](https://user-images.githubusercontent.com/20806815/192337103-869debca-0153-4ccc-83a7-bee08c21158f.png)

# Inspiration
https://www.figma.com/file/xvevtcKbVCcdJ2yi86aov3/portfolio-page?node-id=0%3A1
# Chingu Board

Your project's `readme` is as important to success as your code. For 
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point - 
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

 mvn spring-boot:run
 
 npm run dev
 
 brief overview of what project is see README guide
 
 list out dependencies
 
 put a link to the live site

Optional Todo list
contributors
tech/stack used
running the client locally 
npm install
npm run dev
