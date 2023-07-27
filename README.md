# Frontend Mentor - Order summary card solution

This solution is inspired by the [Github Finder challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
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
- Live Site URL: [Netlify Link]()

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

I took some time to look at the `background` CSS Property as 1 was wondering how to incorporate both the mobile & desktop patterns provided in the images folder.

I used `background-size: contain` so that the image does not stretch or get cropped, and then set `background-repeat: no-repeat` to avoid tiling. This way, the spaces not covered by a background image are filled with the background-color property which I provided to give the desired outcome.

```css
body {
	background-color: var(--pale-blue);
	background-image: url(./images/pattern-background-mobile.svg);
	background-size: contain;
	background-position: top;
	background-repeat: no-repeat;
}
```

### Useful resources

- [Mozilla Docs on background in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/background) - This helped me to better understand the `background` property in CSS.

## Author

- Website - [Samoina Lives](https://samoinalives.wordpress.com/)
- Frontend Mentor - [Samoina](https://www.frontendmentor.io/profile/samoina)
- Twitter - [Samoina](https://www.twitter.com/samoina)
