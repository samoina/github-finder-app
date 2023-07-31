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
- Mobile-first workflow
- Vanilla Javascript
- BEM naming convention

### What I learned

#### Creating dark and light themes

The first thing I noticed on the Frontend Mentor Challenge Page of this solution was the need to create a dark and light option for the user. I was not sure how to integrate this style-wise. Would I create a seperate style-sheet for the dark theme? OR would the styles come in twos for othe CSS selectors? Here's what I am learning.

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

CSS provides a media feature called `prefers-color-scheme` that detect's a user's system preference, and if set to dark, the website defaults to dark mode. I feel like the best approach is this one that allows one to respect the user's preference by default, but still allows them to toggle themes.

### Continued Development

### Useful resources

- [A Complete Guide to Dark Mode on CSS Tricks](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) - I found this resource incredibly helpful because it outlined 4 ways to go about it and answered the very questions I had at the onset of this project.

- [MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) was resourceful in explaining how the code can detect the user's system preference and use that to show the default preference.

## Author

- Website - [Samoina Lives](https://samoinalives.wordpress.com/)
- Frontend Mentor - [Samoina](https://www.frontendmentor.io/profile/samoina)
- Twitter - [Samoina](https://www.twitter.com/samoina)
