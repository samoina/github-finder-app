# Frontend Mentor - Github Finder App solution

This solution is inspired by the [Github Finder challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
    - [Creating dark and light themes](#creating-dark-and-light-themes)
    - [Using grid areas in the tablet design](#using-grid-areas-in-the-tablet-design)
    - [Prefers-color-scheme](#prefers-color-scheme)
  - [Continued Development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- Have the correct color scheme chosen for them based on their computer preferences.

### Screenshot

![]()

### Links

- Solution URL: [Github Repo](https://github.com/samoina/github-finder-app)
- Live Site URL: [Netlify Link](https://samoina-github-finder-app.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript
- BEM naming convention

### What I learned

#### Creating dark and light themes

I am going to expound a little on this because I phave never quite made the time to really understand how to toggle light/dark themes in Javascript until this challenge.

The first thing I noticed on the Frontend Mentor Challenge Page of this solution was the need to create a dark and light option for the user. I was not sure how to integrate this style-wise. Would I create a seperate style-sheet for the dark theme? OR would the styles come in twos for the CSS selectors? Here's what I am learning.

1. There should be a default theme that users get on the first visit, usually the light theme.
2. There should be a way to switch between themes, usually made possible by clicking a button or icon.
3. With toggling classes, I would need to add two classes to the body. I then proceed to style as I normally would with the 'default/light theme'. This is then followed by creating a class set to use as the dark mode.
4. The styles under the dark theme will be descendants of the same parent class.
5. Using Javascript, we then get to toggle to switch the theme by getting the button and adding and event listener for every click. This was my approach:

```html
<body class="light-theme || dark-theme">
	<button class="btn">Toggle the Theme</button>
	<h1>Just a Title</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur a
		dignissimos impedit. Voluptate, qui facere?
	</p>
	<a href="#">Test Link</a>

	<script src="app.js"></script>
</body>
```

```css
body {
	background: #f6f8ff;
	color: #222731;
}

body.dark-theme {
	background: #222731;
	color: #f6f8ff;
}

body a {
	color: #f74646;
}

body.dark-theme a {
	color: #0079ff;
}
```

```javascript
document.querySelector('.btn').addEventListener('click', function () {
	document.body.classList.toggle('dark-theme');
});
```

#### Prefers-color-scheme

CSS provides a media feature called `prefers-color-scheme` that detects a user's system preference, and if set to dark, the website defaults to dark mode. I feel like the best approach is this one that allows one to respect the user's preference by default, but still allows them to toggle themes. Here was how I did it.

1. I created three CSS files since I felt it would be better to have a separation of concerns.
   (i) style.css contains the styling that's common regardless of the theme
   (ii) light-theme.css contains styling that only applies to the light theme
   (iii) dark-theme.css contains styling that only applies to the dark theme

2. In my index.html file, I added the style.css file first as my base stylesheet. Remember, CSS stands for Cascading Style Sheets.I then added a second link for the theme file, but without adding its attribute as this would be established depending on the user's preference / manual toggling.

Here's that code snippet, as well as the div that I'll be clicking on to toggle the themes. My approach was to have two divs with the same class, one that indicates LIGHT - so that when clicked, it switches to light-theme and vice versa. In light theme, the LIGHT + sun icon is hidden, and the DARK + moon icon is shown and vice versa.

```html
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" id="theme-style" href="" />

<body>
	...
	<div>
		<div class="header__toggle header__toggle--light">
			<p><b>LIGHT</b></p>
			<img
				src="./assets/images/icon-sun.svg"
				alt="Icon to toggle to light mode"
			/>
		</div>

		<div class="header__toggle header__toggle--dark">
			<p><b>DARK</b></p>
			<img
				src="./assets/images/icon-moon.svg"
				alt="Icon to toggle to dark mode"
			/>
		</div>
	</div>
	...
</body>
```

3. On my app.js file, i added some code that would wait for the DOM to load and then execute as follows. In this code, I get both divs with their classes using querySelectorAll, and then check to see what the user's OS preferences are using the `window.matchMedia()` method. With this method, if the user's preference matches, it returns a boolean (true).

I also added a function `setTheme()` that takes in one parameter, a boolean, to set the theme. If the theme is dark, set the `href` attribute to the dark-theme.css URL, and if false to indicate the URL of the light-theme CSS file. I then invoked the `setTheme()` and passed an argument, the boolean that I got earlier from the `window.matchMedia()` method - to set the initial theme depending on the user's OS settings.

I also needed to find a way to allow the user to manually toggle the theme. In my code, I assigned the same class to the two divs containing the icons. I would need to use `querySelectorAll` to get a NodeList that I can loop over to tatget each of the divs - initially, I used just the querySelector, but this only toggled the theme once because the Event Listener was only added to the first element with the class.

I loop through the Nodelist and for each div, I add an Event Listener. In its function, i first check the `href` of the present theme, and pcheck whether it includes 'dark' for the dark theme. This will give me a boolean, so since I am toggling to change the theme, i invoke the `setTheme` function and set it to the opposite of the initial boolean.

The last bit of my code allows one to listen to changes in the user's system preference and update the theme accordingly. Below is the code snippet I used, that combines 'prefers-color-scheme' with some dynamic Javascript for manual toggling.

```javascript
/* THIS IS CODE TO TOGGLE THE THEME */
//wait for the DOM to load before exevuting the JS code
document.addEventListener('DOMContentLoaded', function () {
	const toggleDivs = document.querySelectorAll('.header__toggle');
	const themeStyleLink = document.getElementById('theme-style');

	// Check user's preference for dark or light theme initially. use the window.matchMedia() method to check the 'prefers-color-scheme' mQuery, and if it matches, it returns a boolean- true, which is then stored in the variable
	const prefersDarkTheme = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;

	// Function to set the theme
	const setTheme = (isDark) => {
		if (isDark) {
			themeStyleLink.href = 'dark-theme.css';
		} else {
			themeStyleLink.href = 'light-theme.css';
		}
	};

	//initial theme based on user's preference, a boolean is passed in
	setTheme(prefersDarkTheme);

	//allow manual toggling.when div is clicked. get the current url of the theme-specific CSS file, and check if it contains dark. if it contains dark, then isDarkTheme is set to true.

	toggleDivs.forEach((toggleDiv) => {
		toggleDiv.addEventListener('click', function () {
			const currentTheme = themeStyleLink.getAttribute('href');
			const isDarkTheme = currentTheme.includes('dark');

			setTheme(!isDarkTheme);
		});
	});

	// Listen for changes in user's preference and update the theme
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', function (ev) {
			setTheme(ev.matches);
		});
});
```

#### Using grid areas in the tablet design

I needed to rearrange the order of some of the information from the Github profile. (ie location, twitter handle, link and company). To achieve this, I set the display to grid, and created two columns, each 1fr. I then created 4 template areas and named them accordingly:
'location twitter'
'link company'

and then set the grid area to the specific section of the profile. I am also learning that if I want to have an empty cell, this would be represented by a "."

Here is the code snippet for how I did this:

```css
.profile__div {
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'location twitter'
		'link company';
}

.profile__info--location {
	grid-area: location;
}

.profile__info--twitter {
	grid-area: twitter;
}

.profile__info--link {
	grid-area: link;
}

.profile__info--company {
	grid-area: company;
}
```

### Continued Development

Looking to do this project in ReactJS as well to hone the skills I have learned.

### Useful resources

- [A Complete Guide to Dark Mode on CSS Tricks](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) - I found this resource incredibly helpful because it outlined 4 ways to go about it and answered the very questions I had at the onset of this project.

- [MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) was resourceful in explaining how the code can detect the user's system preference and use that to show the default preference.

- [Salma Alam-Naylor's post on light/dark mode theme toggle](https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f) provided insights and allowed me to actually provide an option as I; had thought of leaving the theme up to the user's system preferences.

## Author

- Website - [Samoina Lives](https://samoinalives.wordpress.com/)
- Frontend Mentor - [Samoina](https://www.frontendmentor.io/profile/samoina)
- Twitter - [Samoina](https://www.twitter.com/samoina)
